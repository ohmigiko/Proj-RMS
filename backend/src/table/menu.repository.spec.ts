import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { MenuRepository } from "./menu.repository";

describe('MenuRepository', () => {
    let repo: MenuRepository;

    const result = {
        name: "coke",
        category: "drink",
        topping: [
            {
                name: "น้ำแข็ง",
                option: "option",
                choice: [
                    "yes",
                    "no"
                ]
            },
            {
                name: "เย็น",
                option: "option",
                choice: [
                    "yes",
                    "no"
                ]
            }
        ],
        average_time: null,
        id: "1731a1a0-24d2-4b68-82d2-1ffc2d047aa8"
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
            providers: [
                MenuRepository,
            ],
        }).compile();
        repo = module.get<MenuRepository>(MenuRepository);
    });

    it('MenuRepository - should be defined', () => {
        expect(repo).toBeDefined();
    });

    // describe('createMenu', () => {
    //     it('should return menu', async () => {
    //         // const spyCreate = jest.spyOn(repo, 'create')
    //         const createMenu = await repo.createMenu(mockCreateMenuDto);
    //         // expect(spyCreate).toBeCalled()
    //         // expect(spyCreate).toBeCalledWith(result)
    //         expect(createMenu).toEqual(result);
    //     });
    // });

    // describe('getMenu', () => {
    //     it('should return menu', async () => {
    //         // const spyFind = jest.spyOn(repo, 'find')
    //         const getMenu = await repo.getMenu();
    //         // expect(spyFind).toBeCalled()
    //         expect(getMenu).toEqual([result]);
    //     });
    // });

    // describe('addTopping', () => {
    //     it('should return menu', async () => {
    //         // const spyUpdate = jest.spyOn(repo, 'update')
    //         const addTopping = await repo.addTopping(mockUpdateToppingDto, "1731a1a0-24d2-4b68-82d2-1ffc2d047aa8");
    //         // expect(spyUpdate).toBeCalled()
    //         // expect(spyUpdate).toBeCalledWith(mockUpdateToppingDto, "1731a1a0-24d2-4b68-82d2-1ffc2d047aa8")
    //         expect(addTopping).toEqual(result);
    //     });
    // });
});