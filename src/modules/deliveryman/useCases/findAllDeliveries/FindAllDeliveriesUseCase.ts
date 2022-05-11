import { IDeliverymansRepository } from '../../repositories/IDeliverymansRepository';
import { FindAllDeliveriesError } from './FindAllDeliveriesError';

export class FindAllDeliveriesUseCase {
  constructor(
    private readonly deliverymansRepository: IDeliverymansRepository,
  ) {}

  async execute(deliveryman_id: string) {
    const deliveryman = await this.deliverymansRepository.findByIdWithDeliveries(
      deliveryman_id,
    );

    if (!deliveryman) {
      throw new FindAllDeliveriesError();
    }

    return deliveryman;
  }
}
