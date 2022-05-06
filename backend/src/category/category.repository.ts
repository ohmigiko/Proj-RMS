import { Menu } from "src/menu/menu.entity"
import { EntityRepository, Repository } from "typeorm"
import { Category } from "./category.entity"
import { CreateCategoryDto } from "./dto/createCategory.dto"
import { EditCategoryDto } from "./dto/editCategory.dto"

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {

    async createCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
        const { name } = createCategoryDto
        const category = this.create({
            name,
            date_create: new Date,
            date_last_edit: new Date,
            deleted: false
        })
        await this.save(category)
        return category
    }

    async getCategorys(): Promise<Category[]> {
        // return this.find({ relations: ['menu', 'menu.preset'], where: { deleted: false } })
        // return this.createQueryBuilder("category").where("category.deleted = false").leftJoinAndSelect("category.menu", "menu").where("menu.deleted = false").leftJoin('menu.preset', 'preset').getMany()
        return this.createQueryBuilder("category").where("category.deleted = :catdeleted", { catdeleted: false }).leftJoinAndSelect("category.menu", "menu", "menu.deleted = :menudeleted", { menudeleted: false }).leftJoinAndSelect("menu.preset", "preset").getMany()
    }

    async getCategorysforAdmin(): Promise<Category[]> {
        // return this.find({ relations: ['menu', 'menu.preset'], where: { deleted: false } })
        // return this.createQueryBuilder("category").where("category.deleted = false").leftJoinAndSelect("category.menu", "menu").where("menu.deleted = false").leftJoin('menu.preset', 'preset').getMany()
        return this.createQueryBuilder("category").leftJoinAndSelect("category.menu", "menu").leftJoinAndSelect("menu.preset", "preset").getMany()
    }

    async getCategory(id: string): Promise<Category> {
        return this.findOne(id)
    }

    async deleteCategory(id: string) {
        const category = await this.findOne({ where: { id: id } })
        category.deleted = true
        return this.update(id, category)
    }

    async undeleteCategory(id: string) {
        const category = await this.findOne({ where: { id: id } })
        category.deleted = false
        return this.update(id, category)
    }

    async editCategory(id: string, editCategoryDto: EditCategoryDto): Promise<Category> {
        const { name } = editCategoryDto
        const category = await this.findOne({ where: { id } })
        category.name = name
        this.update(id, category)
        return category
    }
}