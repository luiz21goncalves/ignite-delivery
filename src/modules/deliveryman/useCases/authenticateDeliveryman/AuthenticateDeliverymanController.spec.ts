/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import supertest from 'supertest';

import { app } from '../../../../app';
import { bcryptHashProvider } from '../../../../providers/HashProvider/implementations/BCryptHashProvider';
import { prismaDeliverymansRepository } from '../../repositories/implementations/PrismaDeliverymansRepository';

describe('AuthenticateDeliverymanController', () => {
  beforeAll(async () => {
    const password = await bcryptHashProvider.generateHash('password');

    await prismaDeliverymansRepository.create({
      name: 'Laura Lubowitz',
      email: 'laura.labowitz@eamil.com',
      username: 'laura.labowitz',
      password,
    });
  });

  it('should be able to authenticate deliveryman with email', async () => {
    const { body, statusCode } = await supertest(app)
      .post('/deliverymans/session')
      .send({
        email_or_username: 'laura.labowitz@eamil.com',
        password: 'password',
      });

    expect(statusCode).toEqual(200);
    expect(body.deliveryman).not.toHaveProperty('password');
    expect(body).toMatchObject({
      token: expect.any(String),
      deliveryman: {
        id: expect.any(String),
        name: 'Laura Lubowitz',
        email: 'laura.labowitz@eamil.com',
        username: 'laura.labowitz',
        created_at: expect.any(String),
        updated_at: expect.any(String),
      },
    });
  });

  it('should be able to authenticate deliveryman with username', async () => {
    const { body, statusCode } = await supertest(app)
      .post('/deliverymans/session')
      .send({
        email_or_username: 'laura.labowitz',
        password: 'password',
      });

    expect(statusCode).toEqual(200);
    expect(body.deliveryman).not.toHaveProperty('password');
    expect(body).toMatchObject({
      token: expect.any(String),
      deliveryman: {
        id: expect.any(String),
        name: 'Laura Lubowitz',
        email: 'laura.labowitz@eamil.com',
        username: 'laura.labowitz',
        created_at: expect.any(String),
        updated_at: expect.any(String),
      },
    });
  });

  it('should not be able to authenticate deliveryman with wrong password', async () => {
    const { body, statusCode } = await supertest(app)
      .post('/deliverymans/session')
      .send({
        email_or_username: 'laura.labowitz',
        password: 'wrong-password',
      });

    expect(statusCode).toEqual(401);
    expect(body).toMatchObject({
      statusCode: 401,
      message: 'Email/username or password invalid!',
    });
  });

  it('should not be able to authenticate when there is no user', async () => {
    const { body, statusCode } = await supertest(app)
      .post('/deliverymans/session')
      .send({
        email_or_username: 'montana_wyman48',
        password: 'wrong-password',
      });

    expect(statusCode).toEqual(401);
    expect(body).toMatchObject({
      statusCode: 401,
      message: 'Email/username or password invalid!',
    });
  });

  it('should not be able to authenticate deliveryman with invalid fields', async () => {
    const { body, statusCode } = await supertest(app)
      .post('/deliverymans/session')
      .send({
        email: 'laura.labowitz@eamil.com',
        password: 'password',
      });

    expect(statusCode).toEqual(400);
    expect(body).toMatchObject({
      statusCode: 400,
      key: 'validation.failed',
      messages: [
        {
          error: '"email_or_username" is required',
          field: 'email_or_username',
        },
        { error: '"email" is not allowed', field: 'email' },
      ],
    });
  });
});
