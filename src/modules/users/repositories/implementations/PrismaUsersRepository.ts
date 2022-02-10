import { User } from '@prisma/client';
import { randomUUID } from 'crypto';

import { prisma } from '../../../../database/prismaClient';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { IUsersRepository } from '../IUsersRepository';

class PrismaUsersRepository implements IUsersRepository {
  async create({
    name,
    email,
    username,
    password,
  }: ICreateUserDTO): Promise<User> {
    return prisma.user.create({
      data: {
        id: randomUUID(),
        name,
        email,
        username,
        password,
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findFirst({
      where: {
        email: {
          mode: 'insensitive',
          equals: email,
        },
      },
    });
  }

  async findByUsername(username: string): Promise<User | null> {
    return prisma.user.findFirst({
      where: {
        username: {
          mode: 'insensitive',
          equals: username,
        },
      },
    });
  }

  async findByEmailWithSensitiveCase(email: string): Promise<User | null> {
    return prisma.user.findFirst({
      where: {
        email,
      },
    });
  }

  async findByUsernameWithSensitiveCase(
    username: string,
  ): Promise<User | null> {
    return prisma.user.findFirst({
      where: {
        username,
      },
    });
  }
}

export const prismaUsersRepository = new PrismaUsersRepository();
