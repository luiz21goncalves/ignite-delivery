import { IDeliveriesRepository } from '../../repositories/IDeliveriesRepository';

export class FindAllDeliveriesReceivedUseCase {
  constructor(private deliveriesRepository: IDeliveriesRepository) {}

  async execute() {
    return this.deliveriesRepository.findAllReceived();
  }
}
