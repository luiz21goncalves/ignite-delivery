import { celebrate, Joi, Segments } from 'celebrate';

export const validationWhenAuthenticateDeliveryman = celebrate(
  {
    [Segments.BODY]: {
      password: Joi.string().required(),
      email_or_username: Joi.string().required(),
    },
  },
  { abortEarly: false },
);
