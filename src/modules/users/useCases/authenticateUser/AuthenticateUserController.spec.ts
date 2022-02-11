/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import supertest from 'supertest';

import { app } from '../../../../app';
import { bcryptHashProvider } from '../../../../providers/HashProvider/implementations/BCryptHashProvider';
import { prismaUsersRepository } from '../../repositories/implementations/PrismaUsersRepository';

describe('AuthenticateUserController', () => {
  beforeAll(async () => {
    const password = await bcryptHashProvider.generateHash('password');

    await prismaUsersRepository.create({
      name: 'Dahlia Barton',
      email: 'dahlia.barton@eamil.com',
      username: 'dahlia.barton',
      password,
    });
  });

  it('should be able to authenticate user with email', async () => {
    const { body, statusCode } = await supertest(app).post('/session').send({
      email_or_username: 'dahlia.barton@eamil.com',
      password: 'password',
    });

    expect(statusCode).toEqual(200);
    expect(body.user).not.toHaveProperty('password');
    expect(body).toMatchObject({
      token: expect.any(String),
      user: {
        id: expect.any(String),
        name: 'Dahlia Barton',
        email: 'dahlia.barton@eamil.com',
        username: 'dahlia.barton',
        created_at: expect.any(String),
        updated_at: expect.any(String),
      },
    });
  });

  it('should be able to authenticate user with username', async () => {
    const { body, statusCode } = await supertest(app).post('/session').send({
      email_or_username: 'dahlia.barton',
      password: 'password',
    });

    expect(statusCode).toEqual(200);
    expect(body.user).not.toHaveProperty('password');
    expect(body).toMatchObject({
      token: expect.any(String),
      user: {
        id: expect.any(String),
        name: 'Dahlia Barton',
        email: 'dahlia.barton@eamil.com',
        username: 'dahlia.barton',
        created_at: expect.any(String),
        updated_at: expect.any(String),
      },
    });
  });

  it('should not be able to authenticate user with wrong password', async () => {
    const { body, statusCode } = await supertest(app).post('/session').send({
      email_or_username: 'dahlia.barton',
      password: 'wrong-password',
    });

    expect(statusCode).toEqual(401);
    expect(body).toMatchObject({
      statusCode: 401,
      message: 'Email/username or password invalid!',
    });
  });

  it('should not be able to authenticate when there is no user', async () => {
    const { body, statusCode } = await supertest(app).post('/session').send({
      email_or_username: 'montana_wyman48',
      password: 'wrong-password',
    });

    expect(statusCode).toEqual(401);
    expect(body).toMatchObject({
      statusCode: 401,
      message: 'Email/username or password invalid!',
    });
  });
});
