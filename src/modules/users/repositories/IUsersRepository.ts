import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { User } from '../dtos/User';
import { UserDelivery } from '../dtos/UserDelivery';

export type IUsersRepository = {
  create(data: ICreateUserDTO): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByIdWithDeliveries(id: string): Promise<UserDelivery | null>;
  findByEmail(email: string): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
  findByEmailWithSensitiveCase(email: string): Promise<User | null>;
  findByUsernameWithSensitiveCase(username: string): Promise<User | null>;
};
