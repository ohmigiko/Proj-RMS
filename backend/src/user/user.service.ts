import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/auth/role.enum';
import { CategoryService } from 'src/category/category.service';
import { MenuService } from 'src/menu/menu.service';
import { TableModule } from 'src/table/table.module';
import { TableService } from 'src/table/table.service';
import { CreateUserDto } from './dto/createUser.dto';
import { EditUserDto } from './dto/editUser.dto';
import { UserRepository } from './user.repository';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        public userRepository: UserRepository,
        private menuService: MenuService,
        private categoryService: CategoryService,
        private tableService: TableService
    ) { }

    // private readonly users = [
    //     {
    //         userId: 1,
    //         username: 'john',
    //         password: 'changeme',
    //     },
    //     {
    //         userId: 2,
    //         username: 'maria',
    //         password: 'guess',
    //     },
    // ];

    // async findOne(username: string): Promise<User | undefined> {
    //     return this.userRepository.find(user => user.username === username);
    // }

    createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.userRepository.createUser(createUserDto);
    }

    async init() {
        console.log('create user test')
        this.createUser({ id: "123456", name: "test", role: Role.Admin })
        this.createUser({ id: "111111", name: "test2", role: Role.Waiter })
        this.createUser({ id: "222222", name: "test3", role: Role.Chef })
        console.log('create table test')
        await this.tableService.createTable({ name: "A1_test" })
        await this.tableService.createTable({ name: "A2_test" })
        await this.tableService.createTable({ name: "B1_test" })
        await this.tableService.createTable({ name: "B2_test" })
        console.log('create category test')
        const category = await this.categoryService.createCategory({ name: "บะหมี่_test" })
        console.log('create menu test')
        const menu = await this.menuService.createMenu({
            "name": "บะหมี่_test",
            "topping": [
                {
                    "name": "หมูแดง",
                    "choice": [
                        { "name": "yes", "price": 2 },
                        { "name": "no", "price": 0 },
                        { "name": "extra", "price": 5 }
                    ],
                    "option": "option_with_extra"
                },
                {
                    "name": "หมูกรอบ",
                    "choice": [
                        { "name": "yes", "price": 2 },
                        { "name": "no", "price": 0 },
                        { "name": "extra", "price": 5 }
                    ],
                    "option": "option_with_extra"
                },
                {
                    "name": "เป็ด",
                    "choice": [
                        { "name": "yes", "price": 2 },
                        { "name": "no", "price": 0 },
                        { "name": "extra", "price": 5 }
                    ],
                    "option": "option_with_extra"
                },
                {
                    "name": "ปู",
                    "choice": [
                        { "name": "yes", "price": 2 },
                        { "name": "no", "price": 0 },
                        { "name": "extra", "price": 5 }
                    ],
                    "option": "option_with_extra"
                },
                {
                    "name": "เกี๊ยว",
                    "choice": [
                        { "name": "yes", "price": 2 },
                        { "name": "no", "price": 0 },
                        { "name": "extra", "price": 5 }
                    ],
                    "option": "option_with_extra"
                }
            ]
            ,
            "category_id": category.id,
            "price": 1,
        }, { id: "111111", name: "ad", role: Role.Admin, date_create: new Date, date_last_edit: new Date, deleted: false })
        const category_2 = await this.categoryService.createCategory({ name: "ข้าว_test" })
        const menu_2 = await this.menuService.createMenu({
            "name": "ข้าวผัด_test",
            "topping": [
                {
                    "name": "ปู",
                    "choice": [
                        { "name": "yes", "price": 2 },
                        { "name": "no", "price": 0 },
                        { "name": "extra", "price": 5 }
                    ],
                    "option": "option_with_extra"
                },
                {
                    "name": "เนื้อ",
                    "choice": [
                        { "name": "yes", "price": 2 },
                        { "name": "no", "price": 0 },
                        { "name": "extra", "price": 5 }
                    ],
                    "option": "option_with_extra"
                }
            ]
            ,
            "category_id": category_2.id,
            "price": 1
        }, { id: "111111", name: "ad", role: Role.Admin, date_create: new Date, date_last_edit: new Date, deleted: false })
        return null
    }

    deleteUser(id: string) {
        return this.userRepository.deleteUser(id)
    }

    undeleteUser(id: string) {
        return this.userRepository.undeleteUser(id)
    }

    getUsers(): Promise<User[]> {
        return this.userRepository.getUsers()
    }

    getUser(id: string): Promise<User> {
        return this.userRepository.getUser(id)
    }

    editUser(id: string, editUserDto: EditUserDto): Promise<User> {
        return this.userRepository.editUser(id, editUserDto)
    }
}