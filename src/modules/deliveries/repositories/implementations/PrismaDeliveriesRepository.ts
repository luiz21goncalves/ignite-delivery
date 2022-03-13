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
}

export const prismaDeliveriesRepository = new PrismaDeliveriesRepository();
