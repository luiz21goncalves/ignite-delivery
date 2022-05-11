import { Request, Response } from 'express';

import { prismaDeliverymansRepository } from '../../../deliveryman/repositories/implementations/PrismaDeliverymansRepository';
import { prismaDeliveriesRepository } from '../../repositories/implementations/PrismaDeliveriesRepository';
import { UpdateCompletedDeliveryUseCase } from './UpdateCompletedDeliveryUseCase';

export class UpdateCompletedDeliveryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: deliveryman_id } = request.deliveryman;
    const { id: delivery_id } = request.params;

    const updateCompletedDeliveryUseCase = new UpdateCompletedDeliveryUseCase(
      prismaDeliveriesRepository,
      prismaDeliverymansRepository,
    );

    const delivery = await updateCompletedDeliveryUseCase.execute({
      delivery_id,
      deliveryman_id,
    });

    return response.json(delivery);
  }
}
