import { Router } from 'express';

import { CreateUserController } from '../modules/users/useCases/createUser/CreateUserController';
import { validationWhenCreateUser } from '../modules/users/useCases/createUser/validation';
import { AuthenticateUserCotroller } from '../modules/users/useCases/authenticateUser/AuthenticateUserController';
import { validationWhenAuthenticateUser } from '../modules/users/useCases/authenticateUser/validation';
import { FindAllDeliveriesController } from '../modules/users/useCases/findAllDeliveries/FindAllDelivereisController';
import { ensureAuthenticateClient } from '../middlewares/ensureAuthenticateClient';

const userRoutes = Router();
const authenticateUserCotroller = new AuthenticateUserCotroller();
const createUserController = new CreateUserController();
const findAllDeliveriesController = new FindAllDeliveriesController();

userRoutes.post('/', validationWhenCreateUser, createUserController.handle);

userRoutes.post(
  '/session',
  validationWhenAuthenticateUser,
  authenticateUserCotroller.handle,
);

userRoutes.get(
  '/deliveries',
  ensureAuthenticateClient,
  findAllDeliveriesController.handle,
);

export { userRoutes };
