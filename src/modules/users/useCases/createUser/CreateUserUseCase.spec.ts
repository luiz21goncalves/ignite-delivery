import { InMemoryHashProvider } from '../../../../providers/HashProvider/in-memory/InMemoryHashProvider';
import { InMemoryUsersRepository } from '../../repositories/in-memory/InMemoryUsersRepository';
import { CreateUserError } from './CreateUserError';
import { CreateUserUseCase } from './CreateUserUseCase';

let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryHashProvider: InMemoryHashProvider;
let sut: CreateUserUseCase;

describe('CreateUserUseCase', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryHashProvider = new InMemoryHashProvider();
    sut = new CreateUserUseCase(inMemoryUsersRepository, inMemoryHashProvider);
  });

  it('should be able to create a new client', async () => {
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

  it('should not be able to create new user with email same another', async () => {
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
    ).rejects.toEqual(new CreateUserError.EmailInUse());
  });

  it('should not be able to create new user with email same another even with sensitive case', async () => {
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
    ).rejects.toEqual(new CreateUserError.EmailInUse());
  });

  it('should not be able to create new user with user same another', async () => {
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
    ).rejects.toEqual(new CreateUserError.UsernameInUse());
  });

  it('should not be able to create new user with username same another even with sensitive case', async () => {
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
    ).rejects.toEqual(new CreateUserError.UsernameInUse());
  });
});
