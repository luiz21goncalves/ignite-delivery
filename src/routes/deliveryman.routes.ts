import { Router } from 'express';

import { CreateDeliverymanController } from '../modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController';
import { validationWhenCreateDeliveryman } from '../modules/deliveryman/useCases/createDeliveryman/validation';

const deliverymanRoutes = Router();

const createDeliveryManController = new CreateDeliverymanController();

deliverymanRoutes.post(
  '/',
  validationWhenCreateDeliveryman,
  createDeliveryManController.handle,
);

export { deliverymanRoutes };
