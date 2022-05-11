import { randomUUID } from 'crypto';

import { prisma } from '../../../../database/prismaClient';
import { DeliverymanDelivery } from '../../dtos/DeliverimanDelivery';
import { Deliveryman } from '../../dtos/Deliveryman';
import { ICreateDeleverymanDTO } from '../../dtos/ICreateDeleverymanDTO';
import { IDeliverymansRepository } from '../IDeliverymansRepository';

class PrismaDeliverymansRepository implements IDeliverymansRepository {
  async create({
    name,
    email,
    username,
    password,
  }: ICreateDeleverymanDTO): Promise<Deliveryman> {
    return prisma.deliveryman.create({
      data: {
        id: randomUUID(),
        name,
        email,
        username,
        password,
      },
    });
  }

  async findById(id: string): Promise<Deliveryman | null> {
    return prisma.deliveryman.findUnique({
      where: {
        id,
      },
    });
  }

  async findByIdWithDeliveries(
    id: string,
  ): Promise<DeliverymanDelivery | null> {
    return prisma.deliveryman.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        deliveries: true,
      },
    });
  }

  async findByEmail(email: string): Promise<Deliveryman | null> {
    return prisma.deliveryman.findFirst({
      where: {
        email: {
          mode: 'insensitive',
          equals: email,
        },
      },
    });
  }

  async findByUsername(username: string): Promise<Deliveryman | null> {
    return prisma.deliveryman.findFirst({
      where: {
        username: {
          mode: 'insensitive',
          equals: username,
        },
      },
    });
  }

  async findByEmailWithSensitiveCase(
    email: string,
  ): Promise<Deliveryman | null> {
    return prisma.deliveryman.findFirst({
      where: {
        email,
      },
    });
  }

  async findByUsernameWithSensitiveCase(
    username: string,
  ): Promise<Deliveryman | null> {
    return prisma.deliveryman.findFirst({
      where: {
        username,
      },
    });
  }
}

export const prismaDeliverymansRepository = new PrismaDeliverymansRepository();
