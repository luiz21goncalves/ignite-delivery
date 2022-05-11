import { Request, Response } from 'express';

import { prismaDeliverymansRepository } from '../../repositories/implementations/PrismaDeliverymansRepository';
import { FindAllDeliveriesUseCase } from './FindAllDeliveriesUseCase';

export class FindAllDeliveriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.deliveryman;

    const findAllDeliveriesUseCase = new FindAllDeliveriesUseCase(
      prismaDeliverymansRepository,
    );

    const deliveryman = await findAllDeliveriesUseCase.execute(id);

    return response.json(deliveryman);
  }
}
