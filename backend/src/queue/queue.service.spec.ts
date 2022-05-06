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

  }

  const mockCreateMenuDto = {
    name: "coke",
    topping: [{ name: "น้ำแข็ง", option: "option" }, { name: "เย็น", option: "option" }],
    category: "drink"
  }

  const mockUpdateToppingDto = {
    topping: [{ name: "น้ำแข็ง", option: "option" }, { name: "เย็น", option: "option" }]
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

})
