import { Delivery } from '../dtos/Delivery';
import { ICreateDeliveryDTO } from '../dtos/ICreateDeliveryDTO';

export type IDeliveriesRepository = {
  create(data: ICreateDeliveryDTO): Promise<Delivery>;
};
