import { User } from '@prisma/client'
import { prisma } from '../../../../database/prismaClient'
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO'
import { IUsersRepository } from '../IUsersRepository'
import { randomUUID } from 'crypto'

class PrismaUsersRepository implements IUsersRepository {
  async create ({ name, email, username, password }: ICreateUserDTO): Promise<User> {
    const user = await prisma.user.create({
      data: {
        id: randomUUID(),
        name,
        email,
        username,
        password
      }
    })

    return user
  }

  async findByEmail (email: string): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: {
        email: {
          mode: 'insensitive',
          equals: email
        }
      }
    })

    return user
  }

  async findByUsername (username: string): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: {
        username: {
          mode: 'insensitive',
          equals: username
        }
      }
    })

    return user
  }
}

export const prismaUsersRepository = new PrismaUsersRepository()
