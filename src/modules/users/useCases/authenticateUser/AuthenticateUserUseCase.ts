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
    emailOrUsername,
    password,
  }: IAuthenticateUserDTO): Promise<AuthenticateResponse> {
    const isUsername = Boolean(
      Joi.string().email().validate(emailOrUsername).error,
    );
    const isEmail = !isUsername;

    let user: User | null = null;

    if (isEmail) {
      user = await this.usersRepository.findByEmailWithSensitiveCase(
        emailOrUsername,
      );
    }

    if (isUsername) {
      user = await this.usersRepository.findByUsernameWithSensitiveCase(
        emailOrUsername,
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
