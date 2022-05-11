import { Request, Response } from 'express';

import { prismaUsersRepository } from '../../repositories/implementations/PrismaUsersRepository';
import { FindAllDeliveriesUseCase } from './FindAllDeliveriesUseCase';

export class FindAllDeliveriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const findAllDeliveriesUseCase = new FindAllDeliveriesUseCase(
      prismaUsersRepository,
    );

    const user = await findAllDeliveriesUseCase.execute(id);

    return response.json(user);
  }
}
