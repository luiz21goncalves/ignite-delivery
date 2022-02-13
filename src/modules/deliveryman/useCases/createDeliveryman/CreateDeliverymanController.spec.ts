/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import supertest from 'supertest';

import { app } from '../../../../app';
import { bcryptHashProvider } from '../../../../providers/HashProvider/implementations/BCryptHashProvider';
import { prismaDeliverymansRepository } from '../../repositories/implementations/PrismaDeliverymansRepository';
import { CreateDeliverymanError } from './CreateDeliverymanError';
import { CreateDeliverymanUseCase } from './CreateDeliverymanUseCase';

const createUserUseCase = new CreateDeliverymanUseCase(
  prismaDeliverymansRepository,
  bcryptHashProvider,
);

describe('CreateUserController', () => {
  it('should be able to create new deliveryman', async () => {
    const { body, statusCode } = await supertest(app)
      .post('/deliverymans')
      .send({
        name: 'John Doe',
        email: 'john.doe@email.com',
        username: 'john.doe',
        password: 'strong_password',
      });

    expect(statusCode).toEqual(201);
    expect(body).not.toHaveProperty('password');
    expect(body).toMatchObject({
      id: expect.any(String),
      name: 'John Doe',
      email: 'john.doe@email.com',
      username: 'john.doe',
      created_at: expect.any(String),
      updated_at: expect.any(String),
    });
  });

  it('should not be able to create new deliveryman with email sabe another', async () => {
    await createUserUseCase.execute({
      name: 'Charlotte Koelpin',
      email: 'Duplicate@email.com',
      username: 'charlotte.koelpin',
      password: 'strong_password',
    });

    const { body, statusCode } = await supertest(app)
      .post('/deliverymans')
      .send({
        name: 'Elias Jacobs',
        email: 'duplicate@email.com',
        username: 'elias.jscobs',
        password: 'strong_password',
      });

    expect(statusCode).toEqual(400);
    expect(body).toMatchObject(new CreateDeliverymanError.EmailInUse());
  });

  it('should not be able to create new deliveryman with username sabe another', async () => {
    await createUserUseCase.execute({
      name: 'Maia Wuckert',
      email: 'main.wuckert@email.com',
      username: 'duplicate',
      password: 'strong_password',
    });

    const { body, statusCode } = await supertest(app)
      .post('/deliverymans')
      .send({
        name: 'Nikita Kuvalis',
        email: 'nikita.kuvalis@email.com',
        username: 'duplicate',
        password: 'strong_password',
      });

    expect(statusCode).toEqual(400);
    expect(body).toMatchObject(new CreateDeliverymanError.UsernameInUse());
  });

  it('should not be able to create deliveryman with invalid fields', async () => {
    const { body, statusCode } = await supertest(app)
      .post('/deliverymans')
      .send({
        email: 'nikita.kuvalis@email.com',
        password: 'strong_password',
      });

    expect(statusCode).toEqual(400);
    expect(body).toMatchObject({
      statusCode: 400,
      key: 'validation.failed',
      messages: [
        { error: '"name" is required', field: 'name' },
        { error: '"username" is required', field: 'username' },
      ],
    });
  });
});
