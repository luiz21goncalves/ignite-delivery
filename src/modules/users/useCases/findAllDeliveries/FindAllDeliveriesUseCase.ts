import { IUsersRepository } from '../../repositories/IUsersRepository';
import { FindAllDeliveriesError } from './FindAllDeliveriesError';

export class FindAllDeliveriesUseCase {
  constructor(private readonly usersRepository: IUsersRepository) {}

  async execute(user_id: string) {
    const user = await this.usersRepository.findByIdWithDeliveries(user_id);

    if (!user) {
      throw new FindAllDeliveriesError();
    }

    return user;
  }
}
