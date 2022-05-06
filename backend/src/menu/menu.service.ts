import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateToppingDto } from './dto/updateToppingDto.dto';
import { CreateMenuDto } from './dto/createMenu.dto';
import { Menu } from './menu.entity';
import { MenuRepository } from './menu.repository';
import { User } from 'src/user/user.entity';
import { EditMenuDto } from './dto/editMenu.dto';

@Injectable()
export class MenuService {
    constructor(
        @InjectRepository(MenuRepository)
        public menuRepository: MenuRepository,
    ) { }

    createMenu(createMenuDto: CreateMenuDto, user: User): Promise<Menu> {
        return this.menuRepository.createMenu(createMenuDto, user)
    }

    getMenus(): Promise<Menu[]> {
        return this.menuRepository.getMenus()
    }

    getMenusforAdmin(): Promise<Menu[]> {
        return this.menuRepository.getMenusforAdmin()
    }

    getMenusbyCategory(id: string): Promise<Menu[]> {
        return this.menuRepository.getMenusbyCategory(id)
    }

    getMenu(id: string): Promise<Menu> {
        return this.menuRepository.getMenu(id)
    }

    async addTopping(updateToppingDto: UpdateToppingDto, id: string): Promise<Menu> {
        const menu = await this.menuRepository.findOne({ where: { id: id } })
        const { topping } = updateToppingDto
        let new_topping = topping
        console.log(new_topping)
        // for (let i = 0; i < new_topping.length; i++) {
        //     console.log(topping_choice[new_topping[i]["option"]])
        //     new_topping[i]["choice"] = topping_choice[new_topping[i]["option"]]
        // }
        menu.topping = new_topping
        menu.date_last_edit = new Date
        await this.menuRepository.update(id, menu)
        return menu
        return this.menuRepository.addTopping(updateToppingDto, id)
    }

    menurecord(time: number, id: string): Promise<Menu> {
        return this.menuRepository.menurecord(time, id)
    }

    async deleteMenu(id: string) {
        const menu = await this.menuRepository.findOne({ where: { id } })
        console.log(menu)
        menu.deleted = true
        return this.menuRepository.update(id, menu)
    }

    async undeleteMenu(id: string) {
        const menu = await this.menuRepository.findOne({ where: { id } })
        menu.deleted = false
        return this.menuRepository.update(id, menu)
    }

    editMenu(id: string, editMenuDto: EditMenuDto): Promise<Menu> {
        return this.menuRepository.editMenu(id, editMenuDto)
    }
}
