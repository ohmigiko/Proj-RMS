import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { QueueController } from './queue.controller';
import { QueueRepository } from './queue.repository';
import { QueueService } from './queue.service';

describe('queueController', () => {
  let controller: QueueController;
  let service: QueueService;
  let repo: QueueRepository;

  const result = {
    id: "1234567890",
    queue_num: "1",
    queue_group: "A",
  }

  const mockCreateQueueDto = {
    queue_group: "A",
    order_method: "dine-in"
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QueueController],
      providers: [QueueService, QueueRepository, {
        provide: getRepositoryToken(QueueRepository),
        useValue: {
          createMenu: jest.fn().mockResolvedValue(result),
          getMenu: jest.fn().mockResolvedValue([result]),
          addTopping: jest.fn().mockResolvedValue(result),
        },
      }],
    }).compile();
    service = module.get<QueueService>(QueueService);
    controller = module.get<QueueController>(QueueController);
    repo = module.get<QueueRepository>(getRepositoryToken(QueueRepository));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // describe('createQueue', () => {
  //   it('should return Queue Entity', async () => {
  //     const spyCreateQueue = jest.spyOn(service, 'createQueue');
  //     const createQueue = await controller.createQueue(mockCreateQueueDto)
  //     expect(spyCreateQueue).toBeCalled();
  //     expect(spyCreateQueue).toBeCalledWith(mockCreateQueueDto);
  //     expect(createQueue).toMatchObject(result)
  //   });
  // });
})
