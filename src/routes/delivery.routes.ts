import { Router } from 'express';

import { ensureAuthenticateClient } from '../middlewares/ensureAuthenticateClient';
import { ensureAuthenticateDeliveryman } from '../middlewares/ensureAuthenticateDeliveryman';
import { CreateDeliveryController } from '../modules/deliveries/useCases/createDelivery/CreateDeliveryController';
import { validationWhenCreateDelivery } from '../modules/deliveries/useCases/createDelivery/validation';
import { FindAllDeliveriesReceivedController } from '../modules/deliveries/useCases/findAllDeliveriesReceived/FindAllDeliveriesReceivedController';
import { UpdateCompletedDeliveryController } from '../modules/deliveries/useCases/updateCompletedDelivery/UpdateCompletedDeliveryControler';

const deliveryRoutes = Router();

const createDeliveryController = new CreateDeliveryController();
const findAllDeliveriesReceivedController = new FindAllDeliveriesReceivedController();
const updateCompletedDeliveryController = new UpdateCompletedDeliveryController();

deliveryRoutes.get(
  '/received',
  ensureAuthenticateDeliveryman,
  findAllDeliveriesReceivedController.handle,
);

deliveryRoutes.post(
  '/',
  ensureAuthenticateClient,
  validationWhenCreateDelivery,
  createDeliveryController.handle,
);

deliveryRoutes.put(
  '/:id/completed',
  ensureAuthenticateDeliveryman,
  updateCompletedDeliveryController.handle,
);

export { deliveryRoutes };
