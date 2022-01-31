import { Request, Response } from 'express'
import { prismaUsersRepository } from '../../repositories/implementations/PrismaUsersRepository'
import { CreateClientUseCase } from './CreateClientUseCase'

export class CreateClientController {
  async handle (request: Request, response: Response): Promise<Response> {
    const { name, email, username, password } = request.body

    const createClientUseCase = new CreateClientUseCase(prismaUsersRepository)

    const user = await createClientUseCase.execute({
      name,
      email,
      username,
      password
    })

    return response.status(201).json(user)
  }
}
