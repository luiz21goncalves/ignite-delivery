import { InMemoryHashProvider } from '../../../../providers/HashProvider/in-memory/InMemoryHashProvider';
import { InMemoryUsersRepository } from '../../repositories/in-memory/InMemoryUsersRepository';
import { AuthenticateUserError } from './AuthenticateUserError';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let sut: AuthenticateUserUseCase;
let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryHashProvider: InMemoryHashProvider;

describe('AuthenticateUserUseCase', () => {
  beforeEach(async () => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryHashProvider = new InMemoryHashProvider();
    sut = new AuthenticateUserUseCase(
      inMemoryUsersRepository,
      inMemoryHashProvider,
    );

    await inMemoryUsersRepository.create({
      name: 'Bernice Terry',
      email: 'bernice.terry@email.com',
      password: 'password',
      username: 'bernice_terry',
    });
  });

  it('should be able to authenticate user with email', async () => {
    const response = await sut.execute({
      email_or_username: 'bernice.terry@email.com',
      password: 'password',
    });

    expect(response.user).not.toHaveProperty('password');
    expect(response).toMatchObject({
      token: expect.any(String),
      user: {
        id: expect.any(String),
        name: 'Bernice Terry',
        email: 'bernice.terry@email.com',
        username: 'bernice_terry',
        created_at: expect.any(Date),
        updated_at: expect.any(Date),
      },
    });
  });

  it('should be able to authenticate user with username', async () => {
    const response = await sut.execute({
      email_or_username: 'bernice_terry',
      password: 'password',
    });

    expect(response.user).not.toHaveProperty('password');
    expect(response).toMatchObject({
      token: expect.any(String),
      user: {
        id: expect.any(String),
        name: 'Bernice Terry',
        email: 'bernice.terry@email.com',
        username: 'bernice_terry',
        created_at: expect.any(Date),
        updated_at: expect.any(Date),
      },
    });
  });

  it('should not be able to authenticate user not found by username', async () => {
    await expect(
      sut.execute({
        email_or_username: 'missouri_farrell',
        password: 'password',
      }),
    ).rejects.toEqual(new AuthenticateUserError());
  });

  it('should not be able to authenticate user not found by email', async () => {
    await expect(
      sut.execute({
        email_or_username: 'sedrick_corwin96@hotmail.com',
        password: 'password',
      }),
    ).rejects.toEqual(new AuthenticateUserError());
  });

  it('should not be able to authenticate user by email with incorrect case', async () => {
    await expect(
      sut.execute({
        email_or_username: 'Bernice.Terry@email.com',
        password: 'password',
      }),
    ).rejects.toEqual(new AuthenticateUserError());
  });

  it('should not be able to authenticate user by username with incorrect case', async () => {
    await expect(
      sut.execute({
        email_or_username: 'Bernice_Terry',
        password: 'password',
      }),
    ).rejects.toEqual(new AuthenticateUserError());
  });

  it('should not be able to authenticate user with wrong password', async () => {
    await expect(
      sut.execute({
        email_or_username: 'bernice.terry@email.com',
        password: 'wrong-password',
      }),
    ).rejects.toEqual(new AuthenticateUserError());

    await expect(
      sut.execute({
        email_or_username: 'bernice_terry',
        password: 'wrong-password',
      }),
    ).rejects.toEqual(new AuthenticateUserError());
  });
});
