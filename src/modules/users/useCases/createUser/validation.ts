import { celebrate, Joi, Segments } from 'celebrate'

export const validationWhenCreateUser = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    username: Joi.string().required(),
    password: Joi.string().required()
  }
}, { abortEarly: false })
