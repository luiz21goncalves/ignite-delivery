import { InMemoryHashProvider } from '../../../../providers/HashProvider/in-memory/InMemoryHashProvider';
import { InMemoryDeliverymansRepository } from '../../repositories/in-memory/InMemoryDeliverymansRepository';
import { CreateDeliverymanError } from './CreateDeliverymanError';
import { CreateDeliverymanUseCase } from './CreateDeliverymanUseCase';

let inMemoryDeliverymansRepository: InMemoryDeliverymansRepository;
let inMemoryHashProvider: InMemoryHashProvider;
let sut: CreateDeliverymanUseCase;

describe('CreateDeliverymanUseCase', () => {
  beforeEach(() => {
    inMemoryDeliverymansRepository = new InMemoryDeliverymansRepository();
    inMemoryHashProvider = new InMemoryHashProvider();
    sut = new CreateDeliverymanUseCase(
      inMemoryDeliverymansRepository,
      inMemoryHashProvider,
    );
  });

  it('should be able to create a new deliveryman', async () => {
    const user = await sut.execute({
      name: 'John Doe',
      email: 'john.doe@email.com',
      username: 'john_doe',
      password: 'strong_password',
    });

    expect(user).not.toHaveProperty('password');
    expect(user).toMatchObject({
      id: expect.any(String),
      name: 'John Doe',
      email: 'john.doe@email.com',
      username: 'john_doe',
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
    });
  });

  it('should not be able to create new deliveryman with email same another', async () => {
    await sut.execute({
      name: 'Jane Doe',
      email: 'duplicate@email.com',
      username: 'jane_doe',
      password: 'strong_password',
    });

    await expect(
      sut.execute({
        name: 'Jonny Doe',
        email: 'duplicate@email.com',
        username: 'jonny_doe',
        password: 'strong_password',
      }),
    ).rejects.toEqual(new CreateDeliverymanError.EmailInUse());
  });

  it('should not be able to create new deliveryman with email same another even with sensitive case', async () => {
    await sut.execute({
      name: 'Jane Doe',
      email: 'duplicate@email.com',
      username: 'jane_doe',
      password: 'strong_password',
    });

    await expect(
      sut.execute({
        name: 'Jonny Doe',
        email: 'DuplicatE@email.com',
        username: 'jonny_doe',
        password: 'strong_password',
      }),
    ).rejects.toEqual(new CreateDeliverymanError.EmailInUse());
  });

  it('should not be able to create new deliveryman with user same another', async () => {
    await sut.execute({
      name: 'Jane Doe',
      email: 'jane.doe@email.com',
      username: 'duplicate_username',
      password: 'strong_password',
    });

    await expect(
      sut.execute({
        name: 'Jonny Doe',
        email: 'jonny.doe@email.com',
        username: 'duplicate_username',
        password: 'strong_password',
      }),
    ).rejects.toEqual(new CreateDeliverymanError.UsernameInUse());
  });

  it('should not be able to create new deliveryman with username same another even with sensitive case', async () => {
    await sut.execute({
      name: 'Jane Doe',
      email: 'jane.doe@email.com',
      username: 'duplicate_username',
      password: 'strong_password',
    });

    await expect(
      sut.execute({
        name: 'Jonny Doe',
        email: 'jonny.doe@email.com',
        username: 'Duplicate_Username',
        password: 'strong_password',
      }),
    ).rejects.toEqual(new CreateDeliverymanError.UsernameInUse());
  });
});
