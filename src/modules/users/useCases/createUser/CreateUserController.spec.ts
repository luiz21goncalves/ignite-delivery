/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import supertest from 'supertest'

import { app } from '../../../../app'
import { bcryptHashProvider } from '../../../../providers/HashProvider/implementations/BCryptHashProvider'
import { prismaUsersRepository } from '../../repositories/implementations/PrismaUsersRepository'
import { CreateUserError } from './CreateUserError'
import { CreateUserUseCase } from './CreateUserUseCase'

const createUserUseCase = new CreateUserUseCase(
  prismaUsersRepository,
  bcryptHashProvider
)

describe('CreateUserController', () => {
  it('should be able to create new client', async () => {
    const { body, statusCode } = await supertest(app).post('/users').send({
      name: 'John Doe',
      email: 'john.doe@email.com',
      username: 'john.doe',
      password: 'strong_password'
    })

    expect(statusCode).toEqual(201)
    expect(body).not.toHaveProperty('password')
    expect(body).toMatchObject({
      id: expect.any(String),
      name: 'John Doe',
      email: 'john.doe@email.com',
      username: 'john.doe',
      created_at: expect.any(String),
      updated_at: expect.any(String)
    })
  })

  it('should not be able to create new client with email sabe another', async () => {
    await createUserUseCase.execute({
      name: 'Charlotte Koelpin',
      email: 'Duplicate@email.com',
      username: 'charlotte.koelpin',
      password: 'strong_password'
    })

    const { body, statusCode } = await supertest(app).post('/users').send({
      name: 'Elias Jacobs',
      email: 'duplicate@email.com',
      username: 'elias.jscobs',
      password: 'strong_password'
    })

    expect(statusCode).toEqual(400)
    expect(body).toMatchObject(new CreateUserError.EmailInUse())
  })

  it('should not be able to create new client with username sabe another', async () => {
    await createUserUseCase.execute({
      name: 'Maia Wuckert',
      email: 'main.wuckert@email.com',
      username: 'duplicate',
      password: 'strong_password'
    })

    const { body, statusCode } = await supertest(app).post('/users').send({
      name: 'Nikita Kuvalis',
      email: 'nikita.kuvalis@email.com',
      username: 'duplicate',
      password: 'strong_password'
    })

    expect(statusCode).toEqual(400)
    expect(body).toMatchObject(new CreateUserError.UsernameInUse())
  })
})
