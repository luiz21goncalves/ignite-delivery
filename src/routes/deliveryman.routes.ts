import { Router } from 'express';

import { ensureAuthenticateDeliveryman } from '../middlewares/ensureAuthenticateDeliveryman';
import { AuthenticateDeliverymanCotroller } from '../modules/deliveryman/useCases/authenticateDeliveryman/AuthenticateDeliverymanCotroller';
import { validationWhenAuthenticateDeliveryman } from '../modules/deliveryman/useCases/authenticateDeliveryman/validation';
import { CreateDeliverymanController } from '../modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController';
import { validationWhenCreateDeliveryman } from '../modules/deliveryman/useCases/createDeliveryman/validation';
import { FindAllDeliveriesController } from '../modules/deliveryman/useCases/findAllDeliveries/FindAllDeliveriesController';

const deliverymanRoutes = Router();

const createDeliveryManController = new CreateDeliverymanController();
const authenticateDeliverymanController = new AuthenticateDeliverymanCotroller();
const findAllDeliveriesController = new FindAllDeliveriesController();

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

deliverymanRoutes.get(
  '/deliveries',
  ensureAuthenticateDeliveryman,
  findAllDeliveriesController.handle,
);

export { deliverymanRoutes };
