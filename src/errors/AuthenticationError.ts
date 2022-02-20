import { AppError } from './AppError';

export namespace AuthenticationError {
  export class TokenMissing extends AppError {
    constructor() {
      super('Token missing', 401);
    }
  }

  export class InvalidToken extends AppError {
    constructor() {
      super('Invalid token', 401);
    }
  }
}
