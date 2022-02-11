import { Router } from 'express';

import { authenticateRoutes } from './authenticate.routes';
import { userRoutes } from './users.routes';

const routes = Router();

routes.get('/', (_, response) => response.json({ message: 'Hello World' }));

routes.use('/users', userRoutes);
routes.use(authenticateRoutes);

export { routes };
