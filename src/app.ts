import 'dotenv/config';
import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';

import { routes } from './routes';
import { errorHandler } from './middlewares/errorHandler';
import swaggerFile from '../swagger/v1/swagger.json';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use('/docs/v1', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(errorHandler);

export { app };
