import { AppError } from '../../../../errors/AppError';

export namespace CreateDeliveryError {
  export class UserNotFound extends AppError {
    constructor() {
      super('User not found.');
    }
  }

  export class DeliverymanNotFound extends AppError {
    constructor() {
      super('Deliveryman not found.');
    }
  }
}
