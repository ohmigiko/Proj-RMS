// import { Test, TestingModule } from "@nestjs/testing";
// import { getRepositoryToken } from "@nestjs/typeorm";
// import { MenuRepository } from "./menu.repository";
// import { MenuService } from "./menu.service";

// describe('MenuService', () => {
//     let service: MenuService;
//     let repo: MenuRepository;

//     const result = {
//         name: "coke",
//         category: "drink",
//         topping: [
//             {
//                 name: "น้ำแข็ง",
//                 option: "option",
//                 choice: [
//                     "yes",
//                     "no"
//                 ]
//             },
//             {
//                 name: "เย็น",
//                 option: "option",
//                 choice: [
//                     "yes",
//                     "no"
//                 ]
//             }
//         ],
//         average_time: null,
//         id: "1731a1a0-24d2-4b68-82d2-1ffc2d047aa8"
//     }

//     const mockCreateMenuDto = {
//         name: "coke",
//         topping: [{ name: "น้ำแข็ง", option: "option" }, { name: "เย็น", option: "option" }],
//         category: "drink"
//     }

//     const mockUpdateToppingDto = {
//         topping: [{ name: "น้ำแข็ง", option: "option" }, { name: "เย็น", option: "option" }]
//     }

//     beforeEach(async () => {
//         const module: TestingModule = await Test.createTestingModule({
//             providers: [
//                 MenuRepository,
//                 MenuService,
//                 {
//                     provide: getRepositoryToken(MenuRepository),
//                     useValue: {
//                         createMenu: jest.fn().mockResolvedValue(result),
//                         getMenu: jest.fn().mockResolvedValue([result]),
//                         addTopping: jest.fn().mockResolvedValue(result),
//                     },
//                 }
//             ],
//         }).compile();
//         service = module.get<MenuService>(MenuService);
//         repo = module.get<MenuRepository>(getRepositoryToken(MenuRepository));
//     });

//     it('MenuService - should be defined', () => {
//         expect(service).toBeDefined();
//     });

//     describe('createMenu', () => {
//         it('should return menu', async () => {
//             const spyCreateMenu = jest.spyOn(repo, 'createMenu')
//             const createMenu = await service.createMenu(mockCreateMenuDto);
//             expect(spyCreateMenu).toBeCalled()
//             expect(spyCreateMenu).toBeCalledWith(mockCreateMenuDto)
//             expect(createMenu).toEqual(result);
//         });
//     });

//     describe('getMenu', () => {
//         it('should return menu', async () => {
//             const spyGetMenu = jest.spyOn(repo, 'getMenu')
//             const getMenu = await service.getMenu();
//             expect(spyGetMenu).toBeCalled()
//             expect(getMenu).toEqual([result]);
//         });
//     });

//     describe('addTopping', () => {
//         it('should return menu', async () => {
//             const spyAddTopping = jest.spyOn(repo, 'addTopping')
//             const addTopping = await service.addTopping(mockUpdateToppingDto, "1731a1a0-24d2-4b68-82d2-1ffc2d047aa8");
//             expect(spyAddTopping).toBeCalled()
//             expect(spyAddTopping).toBeCalledWith(mockUpdateToppingDto, "1731a1a0-24d2-4b68-82d2-1ffc2d047aa8")
//             expect(addTopping).toEqual(result);
//         });
//     });
// });