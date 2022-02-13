import { randomUUID } from 'crypto';

import { Delivery } from '../../dtos/Delivery';
import { ICreateDeliveryDTO } from '../../dtos/ICreateDeliveryDTO';
import { IDeliveriesRepository } from '../IDeliveriesRepository';

export class InMemoryDeliveriesRepository implements IDeliveriesRepository {
  private deliveryes: Delivery[];

  constructor() {
    this.deliveryes = [];
  }

  async create({
    item_name,
    status,
    user_id,
    deliveryman_id,
  }: ICreateDeliveryDTO): Promise<Delivery> {
    const delivery = {
      id: randomUUID(),
      item_name,
      status,
      user_id,
      deliveryman_id: deliveryman_id || null,
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.deliveryes.push(delivery);

    return delivery;
  }
}
