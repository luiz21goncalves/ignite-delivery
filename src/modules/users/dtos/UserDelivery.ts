import { Delivery } from '../../deliveries/dtos/Delivery';

export type UserDelivery = {
  id: string;
  name: string;
  email: string;
  deliveries: Delivery[];
};
