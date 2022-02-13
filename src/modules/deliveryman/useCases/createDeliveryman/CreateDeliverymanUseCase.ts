import { IHashProvider } from '../../../../providers/HashProvider/dtos/IHashProvider';
import { Deliveryman } from '../../dtos/Deliveryman';
import { ICreateDeleverymanDTO } from '../../dtos/ICreateDeleverymanDTO';
import { IDeliverymansRepository } from '../../repositories/IDeliverymansRepository';
import { CreateDeliverymanError } from './CreateDeliverymanError';

type CreateDeliverymanResponse = Omit<Deliveryman, 'password'>;

export class CreateDeliverymanUseCase {
  constructor(
    private deliverymansRepository: IDeliverymansRepository,
    private hashProvider: IHashProvider,
  ) {}

  async execute({
    name,
    username,
    email,
    password,
  }: ICreateDeleverymanDTO): Promise<CreateDeliverymanResponse> {
    const foundUserByEmail = await this.deliverymansRepository.findByEmail(
      email,
    );

    if (foundUserByEmail) {
      throw new CreateDeliverymanError.EmailInUse();
    }

    const foundUserByUserName = await this.deliverymansRepository.findByUsername(
      username,
    );

    if (foundUserByUserName) {
      throw new CreateDeliverymanError.UsernameInUse();
    }

    const hashPassword = await this.hashProvider.generateHash(password);

    const deliveryman = await this.deliverymansRepository.create({
      name,
      username,
      email,
      password: hashPassword,
    });

    return {
      id: deliveryman.id,
      name: deliveryman.name,
      email: deliveryman.email,
      username: deliveryman.username,
      created_at: deliveryman.created_at,
      updated_at: deliveryman.updated_at,
    };
  }
}
