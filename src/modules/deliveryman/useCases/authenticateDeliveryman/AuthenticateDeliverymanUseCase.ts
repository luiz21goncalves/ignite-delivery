import { Joi } from 'celebrate';
import { sign } from 'jsonwebtoken';

import { jwt } from '../../../../config/auth';
import { IHashProvider } from '../../../../providers/HashProvider/dtos/IHashProvider';
import { IAuthenticateDeliverymanDTO } from '../../dtos/IAuthenticateDeliverymanDTO';
import { Deliveryman } from '../../dtos/Deliveryman';
import { IDeliverymansRepository } from '../../repositories/IDeliverymansRepository';
import { AuthenticateDeliverymanError } from './AuthenticateDeliverymanError';

type AuthenticateDeliverymanResponse = {
  deliveryman: Omit<Deliveryman, 'password'>;
  token: string;
};

export class AuthenticateDeliverymanUseCase {
  constructor(
    private usersRepository: IDeliverymansRepository,
    private hashProvider: IHashProvider,
  ) {}

  async execute({
    email_or_username,
    password,
  }: IAuthenticateDeliverymanDTO): Promise<AuthenticateDeliverymanResponse> {
    const isUsername = Boolean(
      Joi.string().email().validate(email_or_username).error,
    );
    const isEmail = !isUsername;

    let deliveryman: Deliveryman | null = null;

    if (isEmail) {
      deliveryman = await this.usersRepository.findByEmailWithSensitiveCase(
        email_or_username,
      );
    }

    if (isUsername) {
      deliveryman = await this.usersRepository.findByUsernameWithSensitiveCase(
        email_or_username,
      );
    }

    if (!deliveryman) {
      throw new AuthenticateDeliverymanError();
    }

    const passwordMatch = await this.hashProvider.compareHash(
      password,
      deliveryman.password,
    );

    if (!passwordMatch) {
      throw new AuthenticateDeliverymanError();
    }

    const { DELIVERYMAN_SECRET, DELIVERYMAN_EXPIRES_IN } = jwt;
    const token = sign({}, DELIVERYMAN_SECRET, {
      subject: deliveryman.id,
      expiresIn: DELIVERYMAN_EXPIRES_IN,
    });

    return {
      token,
      deliveryman: {
        id: deliveryman.id,
        name: deliveryman.name,
        email: deliveryman.email,
        username: deliveryman.username,
        created_at: deliveryman.created_at,
        updated_at: deliveryman.updated_at,
      },
    };
  }
}
