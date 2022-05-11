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

  async findAllReceived(): Promise<Delivery[]> {
    return this.deliveryes.filter(
      (delivery) =>
        delivery.status === 'received' && delivery.deliveryman_id === null,
    );
  }

  async findById(id: string): Promise<Delivery | null> {
    const delivery = this.deliveryes.find(
      (findDelivery) => findDelivery.id === id,
    );

    return delivery || null;
  }

  async update(delivery: Delivery): Promise<Delivery> {
    const deliveryIndex = this.deliveryes.findIndex(
      (findDelivery) => findDelivery.id === delivery.id,
    );

    const updatedDelivery = {
      ...delivery,
      updated_at: new Date(),
      status: 'finished',
    };

    this.deliveryes[deliveryIndex] = updatedDelivery;

    return updatedDelivery;
  }
}
