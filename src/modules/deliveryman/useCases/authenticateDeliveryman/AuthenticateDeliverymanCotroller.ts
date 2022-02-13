import { Request, Response } from 'express';

import { bcryptHashProvider } from '../../../../providers/HashProvider/implementations/BCryptHashProvider';
import { prismaDeliverymansRepository } from '../../repositories/implementations/PrismaDeliverymansRepository';
import { AuthenticateDeliverymanUseCase } from './AuthenticateDeliverymanUseCase';

export class AuthenticateDeliverymanCotroller {
  async handle(request: Request, response: Response): Promise<Response> {
    const { password, email_or_username } = request.body;

    const authenticateDeliverymanUseCase = new AuthenticateDeliverymanUseCase(
      prismaDeliverymansRepository,
      bcryptHashProvider,
    );
    const { token, deliveryman } = await authenticateDeliverymanUseCase.execute(
      {
        email_or_username,
        password,
      },
    );

    return response.json({ token, deliveryman });
  }
}
