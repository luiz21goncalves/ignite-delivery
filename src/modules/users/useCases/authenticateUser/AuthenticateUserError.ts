import { AppError } from '../../../../errors/AppError';

export class AuthenticateUserError extends AppError {
  constructor() {
    super('Email/username or password invalid!', 401);
  }
}
