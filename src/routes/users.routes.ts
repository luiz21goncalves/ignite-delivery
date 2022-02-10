import { Router } from 'express';

import { CreateUserController } from '../modules/users/useCases/createUser/CreateUserController';
import { validationWhenCreateUser } from '../modules/users/useCases/createUser/validation';

const userRoutes = Router();
const createUserController = new CreateUserController();

userRoutes.post('/', validationWhenCreateUser, createUserController.handle);

export { userRoutes };
