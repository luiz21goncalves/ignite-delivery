import { InMemoryDeliveriesRepository } from '../../repositories/in-memory/InMemoryDeliveriesRepository';
import { FindAllDeliveriesReceivedUseCase } from './FindAllDeliveriesReceivedUseCase';

let sut: FindAllDeliveriesReceivedUseCase;
let inMemoryDeliveriesRepository: InMemoryDeliveriesRepository;

describe('FindAllDeliveriesReceivedUseCase', () => {
  beforeEach(() => {
    inMemoryDeliveriesRepository = new InMemoryDeliveriesRepository();
    sut = new FindAllDeliveriesReceivedUseCase(inMemoryDeliveriesRepository);
  });

  it('should be able to list all deliveries with status equals received', async () => {
    await inMemoryDeliveriesRepository.create({
      item_name: 'Handmade Granite Computer',
      status: 'received',
      user_id: 'user_id',
    });

    await inMemoryDeliveriesRepository.create({
      item_name: 'Unbranded Cotton Tuna',
      status: 'received',
      user_id: 'user_id',
    });

    await inMemoryDeliveriesRepository.create({
      item_name: 'Generic Soft Chicken',
      status: 'in_progress',
      user_id: 'user_id',
      deliveryman_id: 'deliveryman_id',
    });

    await inMemoryDeliveriesRepository.create({
      item_name: 'Refined Wooden Chicken',
      status: 'finished',
      user_id: 'user_id',
      deliveryman_id: 'deliveryman_id',
    });

    const deliveries = await sut.execute();

    expect(deliveries).toHaveLength(2);
    expect(deliveries).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          item_name: 'Handmade Granite Computer',
          status: 'received',
          user_id: 'user_id',
        }),
        expect.objectContaining({
          item_name: 'Unbranded Cotton Tuna',
          status: 'received',
          user_id: 'user_id',
        }),
      ]),
    );
  });
});
