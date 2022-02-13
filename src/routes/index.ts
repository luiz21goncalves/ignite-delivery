import { Router } from 'express';

import { deliverymanRoutes } from './deliveryman.routes';
import { userRoutes } from './users.routes';

const routes = Router();

routes.get('/', (_, response) => response.json({ message: 'Hello World' }));

routes.use('/users', userRoutes);
routes.use('/deliverymans', deliverymanRoutes);

export { routes };
