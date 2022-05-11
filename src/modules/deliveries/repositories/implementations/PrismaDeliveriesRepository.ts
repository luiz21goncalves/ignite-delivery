import { randomUUID } from 'crypto';

import { prisma } from '../../../../database/prismaClient';
import { Delivery } from '../../dtos/Delivery';
import { ICreateDeliveryDTO } from '../../dtos/ICreateDeliveryDTO';
import { IDeliveriesRepository } from '../IDeliveriesRepository';

class PrismaDeliveriesRepository implements IDeliveriesRepository {
  async create({
    item_name,
    status,
    user_id,
    deliveryman_id,
  }: ICreateDeliveryDTO): Promise<Delivery> {
    return prisma.deliveries.create({
      data: {
        id: randomUUID(),
        item_name,
        status,
        user_id,
        deliveryman_id,
      },
    });
  }

  async findAllReceived(): Promise<Delivery[]> {
    return prisma.deliveries.findMany({
      where: {
        status: {
          equals: 'received',
        },
        deliveryman_id: {
          equals: null,
        },
      },
    });
  }

  async findById(id: string): Promise<Delivery | null> {
    return prisma.deliveries.findUnique({
      where: {
        id,
      },
    });
  }

  async update({
    id,
    deliveryman_id,
    item_name,
    status,
    user_id,
  }: Delivery): Promise<Delivery> {
    await prisma.deliveries.updateMany({
      where: {
        id,
        deliveryman_id,
      },
      data: {
        item_name,
        status,
        user_id,
        deliveryman_id,
      },
    });

    const delivery = await prisma.deliveries.findUnique({
      where: {
        id,
      },
    });

    return delivery || ({} as Delivery);
  }
}

export const prismaDeliveriesRepository = new PrismaDeliveriesRepository();
