import { Request, Response } from 'express';

import { bcryptHashProvider } from '../../../../providers/HashProvider/implementations/BCryptHashProvider';
import { prismaUsersRepository } from '../../repositories/implementations/PrismaUsersRepository';
import { CreateUserUseCase } from './CreateUserUseCase';

export class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, username, password } = request.body;

    const createUserUseCase = new CreateUserUseCase(
      prismaUsersRepository,
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
