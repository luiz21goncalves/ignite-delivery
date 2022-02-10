import { Joi } from 'celebrate';
import { sign } from 'jsonwebtoken';

import { jwt } from '../../../../config/auth';
import { IHashProvider } from '../../../../providers/HashProvider/dtos/IHashProvider';
import { IAuthenticateUserDTO } from '../../dtos/IAuthenticateUserDTO';
import { User } from '../../dtos/User';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { AuthenticateUserError } from './AuthenticateUserError';

type AuthenticateResponse = {
  user: Omit<User, 'password'>;
  token: string;
};

export class AuthenticateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private hashProvider: IHashProvider,
  ) {}

  async execute({
    email_or_username,
    password,
  }: IAuthenticateUserDTO): Promise<AuthenticateResponse> {
    const isUsername = Boolean(
      Joi.string().email().validate(email_or_username).error,
    );
    const isEmail = !isUsername;

    let user: User | null = null;

    if (isEmail) {
      user = await this.usersRepository.findByEmailWithSensitiveCase(
        email_or_username,
      );
    }

    if (isUsername) {
      user = await this.usersRepository.findByUsernameWithSensitiveCase(
        email_or_username,
      );
    }

    if (!user) {
      throw new AuthenticateUserError();
    }

    const passwordMatch = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatch) {
      throw new AuthenticateUserError();
    }

    const { expiresIn, secret } = jwt;
    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        username: user.username,
        created_at: user.created_at,
        updated_at: user.updated_at,
      },
    };
  }
}
