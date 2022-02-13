import { Router } from 'express';

import { AuthenticateDeliverymanCotroller } from '../modules/deliveryman/useCases/authenticateDeliveryman/AuthenticateDeliverymanCotroller';
import { validationWhenAuthenticateDeliveryman } from '../modules/deliveryman/useCases/authenticateDeliveryman/validation';
import { CreateDeliverymanController } from '../modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController';
import { validationWhenCreateDeliveryman } from '../modules/deliveryman/useCases/createDeliveryman/validation';

const deliverymanRoutes = Router();

const createDeliveryManController = new CreateDeliverymanController();
const authenticateDeliverymanController = new AuthenticateDeliverymanCotroller();

deliverymanRoutes.post(
  '/',
  validationWhenCreateDeliveryman,
  createDeliveryManController.handle,
);

deliverymanRoutes.post(
  '/session',
  validationWhenAuthenticateDeliveryman,
  authenticateDeliverymanController.handle,
);

export { deliverymanRoutes };
