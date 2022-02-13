import { Router } from 'express';

import { userRoutes } from './users.routes';

const routes = Router();

routes.get('/', (_, response) => response.json({ message: 'Hello World' }));

routes.use('/users', userRoutes);

export { routes };
