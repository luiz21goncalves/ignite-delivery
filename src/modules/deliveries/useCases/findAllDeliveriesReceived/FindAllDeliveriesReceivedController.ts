import { Request, Response } from 'express';

import { prismaDeliveriesRepository } from '../../repositories/implementations/PrismaDeliveriesRepository';
import { FindAllDeliveriesReceivedUseCase } from './FindAllDeliveriesReceivedUseCase';

export class FindAllDeliveriesReceivedController {
  async handle(request: Request, response: Response): Promise<Response> {
    const findAllDeliveriesReceivedUseCase = new FindAllDeliveriesReceivedUseCase(
      prismaDeliveriesRepository,
    );

    const deliveries = await findAllDeliveriesReceivedUseCase.execute();

    return response.json(deliveries);
  }
}
