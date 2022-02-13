import { IDeliverymansRepository } from '../../../deliveryman/repositories/IDeliverymansRepository';
import { IUsersRepository } from '../../../users/repositories/IUsersRepository';
import { Delivery } from '../../dtos/Delivery';
import { ICreateDeliveryDTO } from '../../dtos/ICreateDeliveryDTO';
import { IDeliveriesRepository } from '../../repositories/IDeliveriesRepository';
import { CreateDeliveryError } from './CreateDeliveryError';

export class CreateDeliveryUseCase {
  constructor(
    private deliveriesRepository: IDeliveriesRepository,
    private usersRepository: IUsersRepository,
    private deliverymansRepository: IDeliverymansRepository,
  ) {}

  async execute({
    item_name,
    status,
    user_id,
    deliveryman_id,
  }: ICreateDeliveryDTO): Promise<Delivery> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new CreateDeliveryError.UserNotFound();
    }

    if (deliveryman_id) {
      const deliveryman = await this.deliverymansRepository.findById(
        deliveryman_id,
      );

      if (!deliveryman) {
        throw new CreateDeliveryError.DeliverymanNotFound();
      }
    }

    return this.deliveriesRepository.create({
      item_name,
      status,
      user_id,
      deliveryman_id,
    });
  }
}
