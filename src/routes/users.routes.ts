import { Router } from 'express';

import { CreateUserController } from '../modules/users/useCases/createUser/CreateUserController';
import { validationWhenCreateUser } from '../modules/users/useCases/createUser/validation';
import { AuthenticateUserCotroller } from '../modules/users/useCases/authenticateUser/AuthenticateUserController';
import { validationWhenAuthenticateUser } from '../modules/users/useCases/authenticateUser/validation';

const userRoutes = Router();
const authenticateUserCotroller = new AuthenticateUserCotroller();
const createUserController = new CreateUserController();

userRoutes.post('/', validationWhenCreateUser, createUserController.handle);

userRoutes.post(
  '/session',
  validationWhenAuthenticateUser,
  authenticateUserCotroller.handle,
);

export { userRoutes };
