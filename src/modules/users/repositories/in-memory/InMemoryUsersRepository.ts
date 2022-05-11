import { randomUUID } from 'crypto';

import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { User } from '../../dtos/User';
import { UserDelivery } from '../../dtos/UserDelivery';
import { IUsersRepository } from '../IUsersRepository';

export class InMemoryUsersRepository implements IUsersRepository {
  private users: User[];

  constructor() {
    this.users = [];
  }

  async create({
    name,
    password,
    email,
    username,
  }: ICreateUserDTO): Promise<User> {
    const user = {
      id: randomUUID(),
      name,
      email,
      password,
      username,
      created_at: new Date(),
      updated_at: new Date(),
      deliveries: [],
    };

    this.users.push(user);

    return user;
  }

  async findById(id: string): Promise<User | null> {
    const user = this.users.find((findUser) => findUser.id === id);

    return user || null;
  }

  async findByIdWithDeliveries(id: string): Promise<UserDelivery | null> {
    const user = this.users.find((findUser) => findUser.id === id);

    const formattedUser = user
      ? {
          id: user.id,
          name: user.name,
          email: user.email,
          deliveries: user.deliveries || [],
        }
      : null;

    return formattedUser || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find(
      (findUser) => findUser.email.toLowerCase() === email.toLowerCase(),
    );

    return user || null;
  }

  async findByUsername(username: string): Promise<User | null> {
    const user = this.users.find(
      (findUser) => findUser.username.toLowerCase() === username.toLowerCase(),
    );

    return user || null;
  }

  async findByEmailWithSensitiveCase(email: string): Promise<User | null> {
    const user = this.users.find((findUser) => findUser.email === email);

    return user || null;
  }

  async findByUsernameWithSensitiveCase(
    username: string,
  ): Promise<User | null> {
    const user = this.users.find((findUser) => findUser.username === username);

    return user || null;
  }
}
