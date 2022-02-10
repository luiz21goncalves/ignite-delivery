import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { User } from '../dtos/User';

export type IUsersRepository = {
  create(data: ICreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
};
