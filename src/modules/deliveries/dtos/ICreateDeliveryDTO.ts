export type ICreateDeliveryDTO = {
  item_name: string;
  user_id: string;
  deliveryman_id?: string;
  status: 'received' | 'in_progress' | 'completed';
};
