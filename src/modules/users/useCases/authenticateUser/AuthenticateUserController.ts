import { Request, Response } from 'express';

import { bcryptHashProvider } from '../../../../providers/HashProvider/implementations/BCryptHashProvider';
import { prismaUsersRepository } from '../../repositories/implementations/PrismaUsersRepository';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

export class AuthenticateUserCotroller {
  async handle(request: Request, response: Response): Promise<Response> {
    const { password, email_or_username } = request.body;

    const authenticateUserUseCase = new AuthenticateUserUseCase(
      prismaUsersRepository,
      bcryptHashProvider,
    );
    const { token, user } = await authenticateUserUseCase.execute({
      email_or_username,
      password,
    });

    return response.json({ token, user });
  }
}
