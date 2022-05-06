import { Test, TestingModule } from '@nestjs/testing';
import { FoodDeliveryController } from './food-delivery.controller';

describe('FoodDeliveryController', () => {
  let controller: FoodDeliveryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FoodDeliveryController],
    }).compile();

    controller = module.get<FoodDeliveryController>(FoodDeliveryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
