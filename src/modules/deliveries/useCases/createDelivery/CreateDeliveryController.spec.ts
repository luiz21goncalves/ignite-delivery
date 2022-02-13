/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import supertest from 'supertest';

import { app } from '../../../../app';
import { bcryptHashProvider } from '../../../../providers/HashProvider/implementations/BCryptHashProvider';
import { Deliveryman } from '../../../deliveryman/dtos/Deliveryman';
import { prismaDeliverymansRepository } from '../../../deliveryman/repositories/implementations/PrismaDeliverymansRepository';
import { User } from '../../../users/dtos/User';
import { prismaUsersRepository } from '../../../users/repositories/implementations/PrismaUsersRepository';
import { CreateDeliveryError } from './CreateDeliveryError';

let user: User;
let deliveryman: Deliveryman;

describe('CreateDeliveryController', () => {
  beforeAll(async () => {
    const password = await bcryptHashProvider.generateHash('password');

    user = await prismaUsersRepository.create({
      name: 'Zella Langosh',
      email: 'zella.langosh@email.com',
      username: 'zella.langosh',
      password,
    });

    deliveryman = await prismaDeliverymansRepository.create({
      name: 'Edmund Schuppe',
      email: 'edmund.schupper@email',
      username: 'edmund.schupper',
      password,
    });
  });

  it('should be able o create new delivery', async () => {
    const { body, statusCode } = await supertest(app).post('/deliveries').send({
      item_name: 'libero est quo',
      status: 'received',
      user_id: user.id,
      deliveryman_id: deliveryman.id,
    });

    expect(statusCode).toEqual(201);
    expect(body).toMatchObject({
      id: expect.any(String),
      item_name: 'libero est quo',
      status: 'received',
      user_id: user.id,
      deliveryman_id: deliveryman.id,
      created_at: expect.any(String),
      updated_at: expect.any(String),
    });
  });

  it('should be able o create new delivery without a valid user', async () => {
    const { body, statusCode } = await supertest(app).post('/deliveries').send({
      item_name: 'libero est quo',
      status: 'received',
      user_id: 'invalid-user-id',
    });

    expect(statusCode).toEqual(400);
    expect(body).toEqual(new CreateDeliveryError.UserNotFound());
  });

  it('should be able o create new delivery without a valid deliveryman', async () => {
    const { body, statusCode } = await supertest(app).post('/deliveries').send({
      item_name: 'libero est quo',
      status: 'received',
      user_id: user.id,
      deliveryman_id: 'invalid-deliveryman-id',
    });

    expect(statusCode).toEqual(400);
    expect(body).toEqual(new CreateDeliveryError.DeliverymanNotFound());
  });
});
