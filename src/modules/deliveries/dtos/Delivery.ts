export type Delivery = {
  id: string;
  item_name: string;
  user_id: string;
  deliveryman_id: string | null;
  status: string;
  created_at: Date;
  updated_at: Date;
};
