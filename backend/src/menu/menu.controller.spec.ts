// import { Test, TestingModule } from '@nestjs/testing';
// import { getRepositoryToken } from '@nestjs/typeorm';
// import { MenuController } from './menu.controller';
// import { Menu } from './menu.entity';
// import { MenuRepository } from './menu.repository';
// import { MenuService } from './menu.service';

// describe('MenuController', () => {
//   let controller: MenuController;
//   let service: MenuService;
//   let repo: MenuRepository;

//   const result = {
//     name: "coke",
//     category: "drink",
//     topping: [
//       {
//         name: "น้ำแข็ง",
//         option: "option",
//         choice: [
//           "yes",
//           "no"
//         ]
//       },
//       {
//         name: "เย็น",
//         option: "option",
//         choice: [
//           "yes",
//           "no"
//         ]
//       }
//     ],
//     average_time: null,
//     id: "1731a1a0-24d2-4b68-82d2-1ffc2d047aa8"
//   }

//   const mockCreateMenuDto = {
//     name: "coke",
//     topping: [{ name: "น้ำแข็ง", option: "option" }, { name: "เย็น", option: "option" }],
//     category: "drink"
//   }

//   const mockUpdateToppingDto = {
//     topping: [{ name: "น้ำแข็ง", option: "option" }, { name: "เย็น", option: "option" }]
//   }


//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [MenuController],
//       providers: [MenuService, MenuRepository, {
//         provide: getRepositoryToken(MenuRepository),
//         useValue: {
//           createMenu: jest.fn().mockResolvedValue(result),
//           getMenu: jest.fn().mockResolvedValue([result]),
//           addTopping: jest.fn().mockResolvedValue(result),
//         },
//       }],
//     }).compile();
//     service = module.get<MenuService>(MenuService);
//     controller = module.get<MenuController>(MenuController);
//     repo = module.get<MenuRepository>(getRepositoryToken(MenuRepository));
//   });

//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//   });

//   describe('createMenu', () => {
//     it('should return Menu Entity', async () => {
//       const spyCreateMenu = jest.spyOn(service, 'createMenu');
//       const createMenu = await controller.createMenu(mockCreateMenuDto)
//       expect(spyCreateMenu).toBeCalled();
//       expect(spyCreateMenu).toBeCalledWith(mockCreateMenuDto);
//       expect(createMenu).toMatchObject(result)
//     });
//   });

//   describe('getMenu', () => {
//     it('should return menu', async () => {
//       const spyGetMenu = jest.spyOn(service, 'getMenu')
//       const getMenu = await controller.getMenu();
//       expect(spyGetMenu).toBeCalled()
//       expect(getMenu).toEqual([result]);
//     });
//   });

//   describe('addTopping', () => {
//     it('should return menu', async () => {
//       const spyAddTopping = jest.spyOn(service, 'addTopping')
//       const addTopping = await controller.addTopping("1731a1a0-24d2-4b68-82d2-1ffc2d047aa8", mockUpdateToppingDto);
//       expect(spyAddTopping).toBeCalled()
//       expect(spyAddTopping).toBeCalledWith(mockUpdateToppingDto, "1731a1a0-24d2-4b68-82d2-1ffc2d047aa8")
//       expect(addTopping).toEqual(result);
//     });
//   });
// })
