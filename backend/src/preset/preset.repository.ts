import { Menu } from "src/menu/menu.entity";
import { User } from "src/user/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreatePresetDto } from "./dto/createPreset.dto";
import { GetPresetDto } from "./dto/getPreset.dto";
import { UpdatePresetEditDto } from "./dto/updatePresetEdit.dto";
import { Preset } from "./preset.entity";

@EntityRepository(Preset)
export class PresetRepository extends Repository<Preset> {

    async createPreset(createPresetDto: CreatePresetDto, user: User, menu: Menu) {
        const { category_id, menu_id, topping } = createPresetDto
        const time = new Date

        let topping_price = 0
        for (let i = 0; i < topping.length; i++) {
            topping_price += Number(topping[i]['choice']['price'])
        }
        const preset = this.create({
            menu_id: menu_id,
            category_id: category_id,
            topping: topping,
            price: Number(topping_price) + Number(menu.price),
            date_create: time,
            date_last_edit: time,
            estimated_time_min: menu.average_time_min,
            create_by: user.name
        })
        await this.save(preset)
        return preset
    }

    async getPreset(getPresetDto: GetPresetDto) {
        const { category_id } = getPresetDto
        return await this.find({ where: { category_id: category_id } })
    }

    async deletePreset(id: string) {
        return this.delete(id)
    }

    async editPreset(id: string, updatePresetEditDto: UpdatePresetEditDto, menu: Menu) {
        const { topping } = updatePresetEditDto
        const time = new Date
        let topping_price = 0
        for (let i = 0; i < topping.length; i++) {
            topping_price += Number(topping[i]['choice']['price'])
        }
        const preset = await this.findOne({ where: { id } })
        preset.topping = topping
        preset.price = Number(topping_price) + Number(menu.price)
        preset.date_last_edit = time
        await this.update(id, preset)
        return preset
    }
}
