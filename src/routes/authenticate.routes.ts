import { Router } from 'express';

import { AuthenticateUserCotroller } from '../modules/users/useCases/authenticateUser/AuthenticateUserController';
import { validationWhenAutenticateUser } from '../modules/users/useCases/authenticateUser/validation';

const authenticateRoutes = Router();

const authenticateUserCotroller = new AuthenticateUserCotroller();

authenticateRoutes.post(
  '/session',
  validationWhenAutenticateUser,
  authenticateUserCotroller.handle,
);

export { authenticateRoutes };
