import { Deliveryman } from '../../../deliveryman/dtos/Deliveryman';
import { InMemoryDeliverymansRepository } from '../../../deliveryman/repositories/in-memory/InMemoryDeliverymansRepository';
import { User } from '../../../users/dtos/User';
import { InMemoryUsersRepository } from '../../../users/repositories/in-memory/InMemoryUsersRepository';
import { InMemoryDeliveriesRepository } from '../../repositories/in-memory/InMemoryDeliveriesRepository';
import { CreateDeliveryError } from './CreateDeliveryError';
import { CreateDeliveryUseCase } from './CreateDeliveryUseCase';

let sut: CreateDeliveryUseCase;
let inMemoryDeliveriesRepository: InMemoryDeliveriesRepository;
let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryDeliverymansRepository: InMemoryDeliverymansRepository;
let user: User;
let deliveryman: Deliveryman;

describe('CreateDeliveryUseCase', () => {
  beforeEach(async () => {
    inMemoryDeliveriesRepository = new InMemoryDeliveriesRepository();
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryDeliverymansRepository = new InMemoryDeliverymansRepository();

    sut = new CreateDeliveryUseCase(
      inMemoryDeliveriesRepository,
      inMemoryUsersRepository,
      inMemoryDeliverymansRepository,
    );

    user = await inMemoryUsersRepository.create({
      name: 'Keira Thiel',
      email: 'keira.thiel@email.com',
      username: 'keira.thiel',
      password: 'password',
    });

    deliveryman = await inMemoryDeliverymansRepository.create({
      name: 'Heather Moore',
      email: 'heather.moore@email.com',
      username: 'heather.moore',
      password: 'password',
    });
  });

  it('should be able to create a new delivery', async () => {
    const delivery = await sut.execute({
      user_id: user.id,
      item_name: 'item_name',
      status: 'received',
    });

    expect(delivery).toMatchObject({
      id: expect.any(String),
      user_id: user.id,
      item_name: 'item_name',
      status: 'received',
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
    });
  });

  it('should be not able to create a new delivery without a valid user', async () => {
    await expect(
      sut.execute({
        item_name: 'item_name',
        status: 'received',
        user_id: 'invalid-user-id',
      }),
    ).rejects.toEqual(new CreateDeliveryError.UserNotFound());
  });

  it('should be able to create a new delivery with deliveryman id', async () => {
    const delivery = await sut.execute({
      user_id: user.id,
      item_name: 'item_name',
      status: 'received',
      deliveryman_id: deliveryman.id,
    });

    expect(delivery).toMatchObject({
      id: expect.any(String),
      user_id: user.id,
      item_name: 'item_name',
      status: 'received',
      deliveryman_id: deliveryman.id,
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
    });
  });

  it('should not be able to create a new delivery without a valid deliveryman', async () => {
    await expect(
      sut.execute({
        item_name: 'item_name',
        user_id: user.id,
        status: 'received',
        deliveryman_id: 'invalid-deliveryman-id',
      }),
    ).rejects.toEqual(new CreateDeliveryError.DeliverymanNotFound());
  });
});
