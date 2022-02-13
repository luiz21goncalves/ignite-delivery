import { Router } from 'express';

import { CreateDeliveryController } from '../modules/deliveries/useCases/createDelivery/CreateDeliveryController';
import { validationWhenCreateDelivery } from '../modules/deliveries/useCases/createDelivery/validation';

const deliveryRoutes = Router();

const createDeliveryController = new CreateDeliveryController();

deliveryRoutes.post(
  '/',
  validationWhenCreateDelivery,
  createDeliveryController.handle,
);

export { deliveryRoutes };
