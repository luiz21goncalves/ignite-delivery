import { AppError } from '../../../../errors/AppError';

export class AuthenticateDeliverymanError extends AppError {
  constructor() {
    super('Email/username or password invalid!', 401);
  }
}
