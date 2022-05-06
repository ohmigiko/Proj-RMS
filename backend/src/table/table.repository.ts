import { EntityRepository, Repository } from "typeorm";
import { CreateTableDto } from "./dto/createTable.dto";
import { EditTableDto } from "./dto/editTable.dto";
import { Table } from "./table.entity";

@EntityRepository(Table)
export class TableRepository extends Repository<Table> {
    async createTable(createTableDto: CreateTableDto): Promise<Table> {
        const { name } = createTableDto
        const table = this.create({
            name,
            date_create: new Date,
            date_last_edit: new Date,
            deleted: false
        })
        await this.save(table)
        return table
    }

    async getTableData(): Promise<Table[]> {
        return this.find({
            relations: ['queue'], where: { deleted: false }
        });
    }

    async getTableDataforAdmin(): Promise<Table[]> {
        return this.find({
            relations: ['queue']
        });
    }

    async getOneTable(id: string): Promise<Table> {
        return this.findOne(id, {
            relations: ['queue', 'queue.order']
        });
    }

    async deleteTable(id: string) {
        const table = await this.findOne({ where: { id: id } })
        table.deleted = true
        return this.update(id, table)
    }

    async undeleteTable(id: string) {
        const table = await this.findOne({ where: { id: id } })
        table.deleted = false
        return this.update(id, table)
    }

    async editTable(id: string, editTableDto: EditTableDto) {
        const table = await this.findOne({ where: { id: id } })
        const { name } = editTableDto
        table.name = name
        this.update(id, table)
        return table
    }
}
