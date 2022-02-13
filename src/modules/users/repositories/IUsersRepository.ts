import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { User } from '../dtos/User';

export type IUsersRepository = {
  create(data: ICreateUserDTO): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
  findByEmailWithSensitiveCase(email: string): Promise<User | null>;
  findByUsernameWithSensitiveCase(username: string): Promise<User | null>;
};
