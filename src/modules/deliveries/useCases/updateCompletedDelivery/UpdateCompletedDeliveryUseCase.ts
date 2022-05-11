import { IDeliverymansRepository } from '../../../deliveryman/repositories/IDeliverymansRepository';
import { Delivery } from '../../dtos/Delivery';
import { IDeliveriesRepository } from '../../repositories/IDeliveriesRepository';

type Request = {
  delivery_id: string;
  deliveryman_id: string;
};

export class UpdateCompletedDeliveryUseCase {
  constructor(
    private readonly delivereisRepository: IDeliveriesRepository,
    private readonly deliverymansRepository: IDeliverymansRepository,
  ) {}

  async execute({ delivery_id, deliveryman_id }: Request): Promise<Delivery> {
    const deliveryman = await this.deliverymansRepository.findById(
      deliveryman_id,
    );

    if (!deliveryman) {
      throw new Error('Deliveryman not found');
    }

    const delivery = await this.delivereisRepository.findById(delivery_id);

    if (!delivery) {
      throw new Error('Delivery not found');
    }

    if (delivery.deliveryman_id !== deliveryman_id) {
      throw new Error('Deliveryman not match');
    }

    delivery.status = 'completed';

    return this.delivereisRepository.update(delivery);
  }
}
