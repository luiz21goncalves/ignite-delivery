import { Router } from 'express'

import { CreateUserController } from '../modules/users/useCases/createUser/CreateUserController'

const routes = Router()

const createUserController = new CreateUserController()

routes.get('/', (_, response) => response.json({ message: 'Hello World' }))

routes.post('/users', createUserController.handle)

export { routes }
