import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { OrderController } from "./order.controller";
import { OrderRepository } from "./order.repository";
import { OrderService } from "./order.service";

describe('OrderController', () => {
  let controller: OrderController;
  let service: OrderService;
  let repo: OrderRepository;

  const result = {

  }

  const mockCreateOrderDto = {
    category: "drink",
    queue_id: "12345",
    menu_id: "12345",
    topping: [{ name: "น้ำแข็ง", choice: "มี" }, { name: "เย็น", choice: "มี" }]
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [OrderService, OrderRepository, {
        provide: getRepositoryToken(OrderRepository),
        useValue: {
          createOrder: jest.fn().mockResolvedValue(result),
          updateOrderStatus: jest.fn().mockResolvedValue([result]),
          updateOrderEdit: jest.fn().mockResolvedValue(result),
          deleteOrder: jest.fn().mockResolvedValue(null),
          getOrder: jest.fn().mockResolvedValue(result)
        },
      }],
    }).compile();
    service = module.get<OrderService>(OrderService);
    controller = module.get<OrderController>(OrderController);
    repo = module.get<OrderRepository>(getRepositoryToken(OrderRepository));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // describe('createOrder', () => {
  //   it('should return Order Entity', async () => {
  //     const spyCreateOrder = jest.spyOn(service, 'createOrder');
  //     const createOrder = await controller.createOrder(mockCreateOrderDto)
  //     expect(spyCreateOrder).toBeCalled();
  //     expect(spyCreateOrder).toBeCalledWith(mockCreateOrderDto);
  //     expect(createOrder).toMatchObject(result)
  //   });
  // });

})
