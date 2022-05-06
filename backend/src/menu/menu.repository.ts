import { EntityRepository, Repository } from "typeorm"
import { UpdateToppingDto } from "./dto/updateToppingDto.dto"
import { CreateMenuDto } from "./dto/createMenu.dto"
import { Menu } from "./menu.entity"
import { Order } from "src/order/order.entity"
import { User } from "src/user/user.entity"
import { EditMenuDto } from "./dto/editMenu.dto"

@EntityRepository(Menu)
export class MenuRepository extends Repository<Menu> {
    async createMenu(createMenuDto: CreateMenuDto, user: User): Promise<Menu> {
        const { topping, name, category_id, price } = createMenuDto
        const menu = this.create({
            topping: topping,
            name,
            category_id,
            date_create: new Date,
            date_last_edit: new Date,
            ordered: 0,
            average_time_min: 15,
            price: price,
            create_by: user.name,
            deleted: false
        })
        await this.save(menu)
        return menu
    }

    async getMenus(): Promise<Menu[]> {
        return this.find({ where: { deleted: false } })
    }

    async getMenusforAdmin(): Promise<Menu[]> {
        return this.find()
    }

    async getMenusbyCategory(id: string): Promise<Menu[]> {
        return this.find({ where: { deleted: false, category_id: id } })
    }

    async getMenu(id: string): Promise<Menu> {
        return this.findOne({ where: { id: id, deleted: false }, relations: ['preset'] })
    }

    async addTopping(updateToppingDto: UpdateToppingDto, id: string): Promise<Menu> {
        const menu = await this.findOne({ where: { id: id } })
        const { topping } = updateToppingDto
        let new_topping = topping
        // for (let i = 0; i < new_topping.length; i++) {
        //     console.log(topping_choice[new_topping[i]["option"]])
        //     new_topping[i]["choice"] = topping_choice[new_topping[i]["option"]]
        // }
        menu.topping = new_topping
        menu.date_last_edit = new Date
        await this.update(id, menu)
        return menu
    }

    async menurecord(time: number, id: string): Promise<Menu> {
        const menu = await this.findOne(id)
        const new_ordered = menu.ordered + 1
        if (menu.ordered == 0) {
            menu.average_time_min = time
            menu.ordered = new_ordered
        }
        else {
            let total_time = menu.average_time_min * menu.ordered
            let new_average = ((total_time + time) / new_ordered)
            menu.average_time_min = Math.round(new_average)
            menu.ordered = new_ordered
        }
        await this.update(id, menu)
        return menu
    }

    async deleteMenu(id: string) {
        const menu = await this.findOne({ where: { id: id } })
        menu.deleted = true
        return this.update(id, menu)
    }

    async editMenu(id: string, editMenuDto: EditMenuDto): Promise<Menu> {
        const menu = await this.findOne({ where: { id: id } })
        const { name, price, } = editMenuDto
        menu.name = name
        menu.price = price
        menu.date_last_edit = new Date
        this.update(id, menu)
        return menu
    }
}
