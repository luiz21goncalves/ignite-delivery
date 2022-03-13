import { Router } from 'express';

import { ensureAuthenticate } from '../middlewares/ensureAuthenticate';
import { CreateDeliveryController } from '../modules/deliveries/useCases/createDelivery/CreateDeliveryController';
import { validationWhenCreateDelivery } from '../modules/deliveries/useCases/createDelivery/validation';
import { FindAllDeliveriesReceivedController } from '../modules/deliveries/useCases/findAllDeliveriesReceived/FindAllDeliveriesReceivedController';

const deliveryRoutes = Router();

const createDeliveryController = new CreateDeliveryController();
const findAllDeliveriesReceivedController = new FindAllDeliveriesReceivedController();

deliveryRoutes.get('/received', findAllDeliveriesReceivedController.handle);

deliveryRoutes.post(
  '/',
  ensureAuthenticate,
  validationWhenCreateDelivery,
  createDeliveryController.handle,
);

export { deliveryRoutes };
