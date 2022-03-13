import { Router } from 'express';

import { ensureAuthenticateClient } from '../middlewares/ensureAuthenticateClient';
import { CreateDeliveryController } from '../modules/deliveries/useCases/createDelivery/CreateDeliveryController';
import { validationWhenCreateDelivery } from '../modules/deliveries/useCases/createDelivery/validation';
import { FindAllDeliveriesReceivedController } from '../modules/deliveries/useCases/findAllDeliveriesReceived/FindAllDeliveriesReceivedController';

const deliveryRoutes = Router();

const createDeliveryController = new CreateDeliveryController();
const findAllDeliveriesReceivedController = new FindAllDeliveriesReceivedController();

deliveryRoutes.get('/received', findAllDeliveriesReceivedController.handle);

deliveryRoutes.post(
  '/',
  ensureAuthenticateClient,
  validationWhenCreateDelivery,
  createDeliveryController.handle,
);

export { deliveryRoutes };
