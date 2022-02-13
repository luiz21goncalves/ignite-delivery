import { Deliveryman } from '../dtos/Deliveryman';
import { ICreateDeleverymanDTO } from '../dtos/ICreateDeleverymanDTO';

export type IDeliverymansRepository = {
  create(data: ICreateDeleverymanDTO): Promise<Deliveryman>;
  findByEmail(email: string): Promise<Deliveryman | null>;
  findByUsername(username: string): Promise<Deliveryman | null>;
  findByEmailWithSensitiveCase(email: string): Promise<Deliveryman | null>;
  findByUsernameWithSensitiveCase(
    username: string,
  ): Promise<Deliveryman | null>;
};
