/**
 * @jest-environment ./prisma/prisma-environment-jest
 */
import supertest from 'supertest';

import { app } from '../../../../app';
import { AuthenticationError } from '../../../../errors/AuthenticationError';
import { bcryptHashProvider } from '../../../../providers/HashProvider/implementations/BCryptHashProvider';
import { prismaDeliverymansRepository } from '../../../deliveryman/repositories/implementations/PrismaDeliverymansRepository';
import { AuthenticateDeliverymanUseCase } from '../../../deliveryman/useCases/authenticateDeliveryman/AuthenticateDeliverymanUseCase';
import { User } from '../../../users/dtos/User';
import { prismaUsersRepository } from '../../../users/repositories/implementations/PrismaUsersRepository';
import { prismaDeliveriesRepository } from '../../repositories/implementations/PrismaDeliveriesRepository';

let user: User;
let deliveryman_token: string;

describe('FindAllDeliveriesReceivedController', () => {
  beforeAll(async () => {
    const password = await bcryptHashProvider.generateHash('_kaUS9gNA_aij3d');

    user = await prismaUsersRepository.create({
      name: 'Aliya Bailey',
      email: 'aliat.bailay@email.com',
      username: 'aliay_bailay',
      password,
    });

    await prismaDeliverymansRepository.create({
      name: 'Ignacio Stamm',
      email: 'ignacio.stam@email.com',
      username: 'ignacio_stam',
      password,
    });

    const authenticateDeliverymanUseCase = new AuthenticateDeliverymanUseCase(
      prismaDeliverymansRepository,
      bcryptHashProvider,
    );

    const { token } = await authenticateDeliverymanUseCase.execute({
      email_or_username: 'ignacio.stam@email.com',
      password: '_kaUS9gNA_aij3d',
    });

    deliveryman_token = token;
  });

  it('should be able to list all deliveries with status equals received', async () => {
    await prismaDeliveriesRepository.create({
      item_name: 'Handmade Granite Computer',
      status: 'received',
      user_id: user.id,
    });

    await prismaDeliveriesRepository.create({
      item_name: 'Unbranded Cotton Tuna',
      status: 'received',
      user_id: user.id,
    });

    await prismaDeliveriesRepository.create({
      item_name: 'Generic Soft Chicken',
      status: 'in_progress',
      user_id: user.id,
    });

    await prismaDeliveriesRepository.create({
      item_name: 'Refined Wooden Chicken',
      status: 'finished',
      user_id: user.id,
    });

    const { statusCode, body } = await supertest(app)
      .get('/deliveries/received')
      .set({
        Authorization: `Bearer ${deliveryman_token}`,
      });

    expect(statusCode).toEqual(200);
    expect(body).toHaveLength(2);
    expect(body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          item_name: 'Handmade Granite Computer',
          status: 'received',
          user_id: user.id,
        }),
        expect.objectContaining({
          item_name: 'Unbranded Cotton Tuna',
          status: 'received',
          user_id: user.id,
        }),
      ]),
    );
  });

  it('should not be able to list all deliveries with status equals received without authenticated deliveryman', async () => {
    const { statusCode, body } = await supertest(app).get(
      '/deliveries/received',
    );

    expect(statusCode).toEqual(401);
    expect(body).toEqual(new AuthenticationError.TokenMissing());
  });
});
