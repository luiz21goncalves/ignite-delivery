import { Request, Response } from 'express';

import { prismaDeliverymansRepository } from '../../../deliveryman/repositories/implementations/PrismaDeliverymansRepository';
import { prismaUsersRepository } from '../../../users/repositories/implementations/PrismaUsersRepository';
import { prismaDeliveriesRepository } from '../../repositories/implementations/PrismaDeliveriesRepository';
import { CreateDeliveryUseCase } from './CreateDeliveryUseCase';

export class CreateDeliveryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { item_name, deliveryman_id } = request.body;
    const user_id = request.user.id;

    const createDeliveryUseCase = new CreateDeliveryUseCase(
      prismaDeliveriesRepository,
      prismaUsersRepository,
      prismaDeliverymansRepository,
    );

    const delivery = await createDeliveryUseCase.execute({
      item_name,
      status: 'received',
      user_id,
      deliveryman_id,
    });

    return response.status(201).json(delivery);
  }
}
