/**
 * @jest-environment ./prisma/prisma-environment-jest
 */
import supertest from 'supertest';

import { app } from '../../../../app';
import { Deliveryman } from '../../../deliveryman/dtos/Deliveryman';
import { prismaDeliverymansRepository } from '../../../deliveryman/repositories/implementations/PrismaDeliverymansRepository';
import { User } from '../../../users/dtos/User';
import { prismaUsersRepository } from '../../../users/repositories/implementations/PrismaUsersRepository';
import { prismaDeliveriesRepository } from '../../repositories/implementations/PrismaDeliveriesRepository';

let user: User;
let deliveryman: Deliveryman;

describe('FindAllDeliveriesReceivedController', () => {
  beforeEach(async () => {
    user = await prismaUsersRepository.create({
      name: 'Aliya Bailey',
      email: 'aliat.bailay@email.com',
      username: 'aliay_bailay',
      password: 'oZRTs3rIXEbjlAZ',
    });

    deliveryman = await prismaDeliverymansRepository.create({
      name: 'Ignacio Stamm',
      email: 'ignacio.stam@email.com',
      username: 'ignacio_stam',
      password: '_kaUS9gNA_aij3d',
    });
  });

  it('should be able to list all deliveries with status equals received', async () => {
    await prismaDeliveriesRepository.create({
      item_name: 'Handmade Granite Computer',
      status: 'received',
      user_id: user.id,
      deliveryman_id: deliveryman.id,
    });

    await prismaDeliveriesRepository.create({
      item_name: 'Unbranded Cotton Tuna',
      status: 'received',
      user_id: user.id,
      deliveryman_id: deliveryman.id,
    });

    await prismaDeliveriesRepository.create({
      item_name: 'Generic Soft Chicken',
      status: 'in_progress',
      user_id: user.id,
      deliveryman_id: deliveryman.id,
    });

    await prismaDeliveriesRepository.create({
      item_name: 'Refined Wooden Chicken',
      status: 'finished',
      user_id: user.id,
      deliveryman_id: deliveryman.id,
    });

    const { statusCode, body } = await supertest(app).get(
      '/deliveries/received',
    );

    expect(statusCode).toEqual(200);
    expect(body).toHaveLength(2);
    expect(body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          item_name: 'Handmade Granite Computer',
          status: 'received',
          user_id: user.id,
          deliveryman_id: deliveryman.id,
        }),
        expect.objectContaining({
          item_name: 'Unbranded Cotton Tuna',
          status: 'received',
          user_id: user.id,
          deliveryman_id: deliveryman.id,
        }),
      ]),
    );
  });
});
