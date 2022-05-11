import { Delivery } from '../../deliveries/dtos/Delivery';

export type Deliveryman = {
  id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
  deliveries?: Delivery[];
};
