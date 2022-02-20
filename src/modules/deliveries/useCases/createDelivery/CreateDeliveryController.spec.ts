/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import supertest from 'supertest';

import { app } from '../../../../app';
import { AuthenticationError } from '../../../../errors/AuthenticationError';
import { bcryptHashProvider } from '../../../../providers/HashProvider/implementations/BCryptHashProvider';
import { Deliveryman } from '../../../deliveryman/dtos/Deliveryman';
import { prismaDeliverymansRepository } from '../../../deliveryman/repositories/implementations/PrismaDeliverymansRepository';
import { User } from '../../../users/dtos/User';
import { prismaUsersRepository } from '../../../users/repositories/implementations/PrismaUsersRepository';
import { AuthenticateUserUseCase } from '../../../users/useCases/authenticateUser/AuthenticateUserUseCase';
import { CreateDeliveryError } from './CreateDeliveryError';

let user: User;
let deliveryman: Deliveryman;
let user_token: string;

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

    const authenticationUserUseCase = new AuthenticateUserUseCase(
      prismaUsersRepository,
      bcryptHashProvider,
    );

    const { token } = await authenticationUserUseCase.execute({
      email_or_username: 'zella.langosh',
      password: 'password',
    });

    user_token = token;
  });

  it('should be able o create new delivery', async () => {
    const { body, statusCode } = await supertest(app)
      .post('/deliveries')
      .set({
        Authorization: `Bearer ${user_token}`,
      })
      .send({
        item_name: 'libero est quo',
        status: 'received',
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

  it('should not be able to create new delivery without authenticated user', async () => {
    const { body, statusCode } = await supertest(app).post('/deliveries').send({
      item_name: 'libero est quo',
      status: 'received',
    });

    expect(statusCode).toEqual(401);
    expect(body).toEqual(new AuthenticationError.TokenMissing());
  });

  it('should not be able to create new delivery with invalid token', async () => {
    const { body, statusCode } = await supertest(app)
      .post('/deliveries')
      .set({
        Authorization: 'Bearer invalid-token',
      })
      .send({
        item_name: 'libero est quo',
        status: 'received',
      });

    expect(statusCode).toEqual(401);
    expect(body).toEqual(new AuthenticationError.InvalidToken());
  });

  it('should not be able to create new delivery with missing token', async () => {
    const { body, statusCode } = await supertest(app)
      .post('/deliveries')
      .set({
        Authorization: 'Bearer',
      })
      .send({
        item_name: 'libero est quo',
        status: 'received',
      });

    expect(statusCode).toEqual(401);
    expect(body).toEqual(new AuthenticationError.TokenMissing());
  });

  it('should not be able o create new delivery without a valid deliveryman', async () => {
    const { body, statusCode } = await supertest(app)
      .post('/deliveries')
      .set({
        Authorization: `Bearer ${user_token}`,
      })
      .send({
        item_name: 'libero est quo',
        status: 'received',
        deliveryman_id: 'invalid-deliveryman-id',
      });

    expect(statusCode).toEqual(400);
    expect(body).toEqual(new CreateDeliveryError.DeliverymanNotFound());
  });
});
