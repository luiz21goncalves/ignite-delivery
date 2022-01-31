import { Router } from 'express'

import { CreateClientController } from '../modules/clients/useCases/createClient/CreateClientController'

const routes = Router()

const createClientController = new CreateClientController()

routes.get('/', (_, response) => response.json({ message: 'Hello World' }))

routes.post('/users', createClientController.handle)

export { routes }
