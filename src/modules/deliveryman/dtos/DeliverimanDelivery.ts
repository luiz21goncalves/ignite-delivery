import { Delivery } from '../../deliveries/dtos/Delivery';

export type DeliverymanDelivery = {
  id: string;
  name: string;
  email: string;
  deliveries: Delivery[];
};
