import { InMemoryHashProvider } from '../../../../providers/HashProvider/in-memory/InMemoryHashProvider';
import { InMemoryDeliverymansRepository } from '../../repositories/in-memory/InMemoryDeliverymansRepository';
import { AuthenticateDeliverymanError } from './AuthenticateDeliverymanError';
import { AuthenticateDeliverymanUseCase } from './AuthenticateDeliverymanUseCase';

let sut: AuthenticateDeliverymanUseCase;
let inMemoryDeliverymansRepository: InMemoryDeliverymansRepository;
let inMemoryHashProvider: InMemoryHashProvider;

describe('AuthenticateDeliverymanUseCase', () => {
  beforeEach(async () => {
    inMemoryDeliverymansRepository = new InMemoryDeliverymansRepository();
    inMemoryHashProvider = new InMemoryHashProvider();
    sut = new AuthenticateDeliverymanUseCase(
      inMemoryDeliverymansRepository,
      inMemoryHashProvider,
    );

    await inMemoryDeliverymansRepository.create({
      name: 'Bernice Terry',
      email: 'bernice.terry@email.com',
      password: 'password',
      username: 'bernice_terry',
    });
  });

  it('should be able to authenticate deliveryman with email', async () => {
    const response = await sut.execute({
      email_or_username: 'bernice.terry@email.com',
      password: 'password',
    });

    expect(response.deliveryman).not.toHaveProperty('password');
    expect(response).toMatchObject({
      token: expect.any(String),
      deliveryman: {
        id: expect.any(String),
        name: 'Bernice Terry',
        email: 'bernice.terry@email.com',
        username: 'bernice_terry',
        created_at: expect.any(Date),
        updated_at: expect.any(Date),
      },
    });
  });

  it('should be able to authenticate deliveryman with username', async () => {
    const response = await sut.execute({
      email_or_username: 'bernice_terry',
      password: 'password',
    });

    expect(response.deliveryman).not.toHaveProperty('password');
    expect(response).toMatchObject({
      token: expect.any(String),
      deliveryman: {
        id: expect.any(String),
        name: 'Bernice Terry',
        email: 'bernice.terry@email.com',
        username: 'bernice_terry',
        created_at: expect.any(Date),
        updated_at: expect.any(Date),
      },
    });
  });

  it('should not be able to authenticate deliveryman not found by username', async () => {
    await expect(
      sut.execute({
        email_or_username: 'missouri_farrell',
        password: 'password',
      }),
    ).rejects.toEqual(new AuthenticateDeliverymanError());
  });

  it('should not be able to authenticate deliveryman not found by email', async () => {
    await expect(
      sut.execute({
        email_or_username: 'sedrick_corwin96@hotmail.com',
        password: 'password',
      }),
    ).rejects.toEqual(new AuthenticateDeliverymanError());
  });

  it('should not be able to authenticate deliveryman by email with incorrect case', async () => {
    await expect(
      sut.execute({
        email_or_username: 'Bernice.Terry@email.com',
        password: 'password',
      }),
    ).rejects.toEqual(new AuthenticateDeliverymanError());
  });

  it('should not be able to authenticate deliveryman by username with incorrect case', async () => {
    await expect(
      sut.execute({
        email_or_username: 'Bernice_Terry',
        password: 'password',
      }),
    ).rejects.toEqual(new AuthenticateDeliverymanError());
  });

  it('should not be able to authenticate deliveryman with wrong password', async () => {
    await expect(
      sut.execute({
        email_or_username: 'bernice.terry@email.com',
        password: 'wrong-password',
      }),
    ).rejects.toEqual(new AuthenticateDeliverymanError());

    await expect(
      sut.execute({
        email_or_username: 'bernice_terry',
        password: 'wrong-password',
      }),
    ).rejects.toEqual(new AuthenticateDeliverymanError());
  });
});
