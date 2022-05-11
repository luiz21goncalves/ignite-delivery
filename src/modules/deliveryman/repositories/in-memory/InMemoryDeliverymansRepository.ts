import { randomUUID } from 'crypto';

import { DeliverymanDelivery } from '../../dtos/DeliverimanDelivery';
import { Deliveryman } from '../../dtos/Deliveryman';
import { ICreateDeleverymanDTO } from '../../dtos/ICreateDeleverymanDTO';
import { IDeliverymansRepository } from '../IDeliverymansRepository';

export class InMemoryDeliverymansRepository implements IDeliverymansRepository {
  private deliverymans: Deliveryman[];

  constructor() {
    this.deliverymans = [];
  }

  async create({
    name,
    password,
    email,
    username,
  }: ICreateDeleverymanDTO): Promise<Deliveryman> {
    const deliveryman = {
      id: randomUUID(),
      name,
      email,
      password,
      username,
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.deliverymans.push(deliveryman);

    return deliveryman;
  }

  async findById(id: string): Promise<Deliveryman | null> {
    const deliveryman = this.deliverymans.find(
      (findUser) => findUser.id === id,
    );

    return deliveryman || null;
  }

  async findByIdWithDeliveries(
    id: string,
  ): Promise<DeliverymanDelivery | null> {
    const deliveryman = this.deliverymans.find(
      (findDeliveryman) => findDeliveryman.id === id,
    );

    const formattedUser = deliveryman
      ? {
          id: deliveryman.id,
          name: deliveryman.name,
          email: deliveryman.email,
          deliveries: deliveryman.deliveries || [],
        }
      : null;

    return formattedUser || null;
  }

  async findByEmail(email: string): Promise<Deliveryman | null> {
    const deliveryman = this.deliverymans.find(
      (findUser) => findUser.email.toLowerCase() === email.toLowerCase(),
    );

    return deliveryman || null;
  }

  async findByUsername(username: string): Promise<Deliveryman | null> {
    const deliveryman = this.deliverymans.find(
      (findUser) => findUser.username.toLowerCase() === username.toLowerCase(),
    );

    return deliveryman || null;
  }

  async findByEmailWithSensitiveCase(
    email: string,
  ): Promise<Deliveryman | null> {
    const deliveryman = this.deliverymans.find(
      (findUser) => findUser.email === email,
    );

    return deliveryman || null;
  }

  async findByUsernameWithSensitiveCase(
    username: string,
  ): Promise<Deliveryman | null> {
    const deliveryman = this.deliverymans.find(
      (findUser) => findUser.username === username,
    );

    return deliveryman || null;
  }
}
