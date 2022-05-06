import { EntityRepository, Repository } from "typeorm";
import { CreateUserDto } from "./dto/createUser.dto";
import { EditUserDto } from "./dto/editUser.dto";
import { User } from "./user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const { role, name, id } = createUserDto
        const user = this.create({
            role,
            name,
            id,
            date_create: new Date,
            date_last_edit: new Date,
            deleted: false
        })
        await this.save(user)
        return user
    }

    async deleteUser(id: string) {
        const user = await this.findOne({ where: { id: id } })
        console.log(user)
        user.deleted = true
        return this.update(id, user)

    }

    async undeleteUser(id: string) {
        const user = await this.findOne({ where: { id: id } })
        console.log(user)
        user.deleted = false
        return this.update(id, user)

    }

    async getUsers(): Promise<User[]> {
        return this.find()
    }

    async getUser(id: string): Promise<User> {
        return this.findOne({ where: { id } })
    }

    async editUser(id: string, editUserDto: EditUserDto): Promise<User> {
        const user = await this.findOne({ where: { id } })
        const { name, role, id: new_id } = editUserDto
        user.name = name
        user.role = role
        user.id = new_id
        this.update(id, user)
        return user
    }
}
