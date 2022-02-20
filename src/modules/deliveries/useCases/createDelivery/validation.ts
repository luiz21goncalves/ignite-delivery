import { celebrate, Joi, Segments } from 'celebrate';

export const validationWhenCreateDelivery = celebrate(
  {
    [Segments.BODY]: {
      item_name: Joi.string().required(),
      status: Joi.string().required(),
      deliveryman_id: Joi.string().optional(),
    },
  },
  { abortEarly: false },
);
