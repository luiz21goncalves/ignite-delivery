import { AppError } from '../../../../errors/AppError';

export class FindAllDeliveriesError extends AppError {
  constructor() {
    super('User not found.');
  }
}
