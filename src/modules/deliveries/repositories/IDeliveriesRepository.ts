import { Delivery } from '../dtos/Delivery';
import { ICreateDeliveryDTO } from '../dtos/ICreateDeliveryDTO';

export type IDeliveriesRepository = {
  create(data: ICreateDeliveryDTO): Promise<Delivery>;
  findAllReceived(): Promise<Delivery[]>;
  findById(id: string): Promise<Delivery | null>;
  update(data: Delivery): Promise<Delivery>;
};
