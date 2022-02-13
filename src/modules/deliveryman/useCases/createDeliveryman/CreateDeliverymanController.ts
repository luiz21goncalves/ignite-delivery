import { Request, Response } from 'express';

import { bcryptHashProvider } from '../../../../providers/HashProvider/implementations/BCryptHashProvider';
import { prismaDeliverymansRepository } from '../../repositories/implementations/PrismaDeliverymansRepository';
import { CreateDeliverymanUseCase } from './CreateDeliverymanUseCase';

export class CreateDeliverymanController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, username, password } = request.body;

    const createUserUseCase = new CreateDeliverymanUseCase(
      prismaDeliverymansRepository,
      bcryptHashProvider,
    );

    const user = await createUserUseCase.execute({
      name,
      email,
      username,
      password,
    });

    return response.status(201).json(user);
  }
}
