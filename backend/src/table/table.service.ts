import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTableDto } from './dto/createTable.dto';
import { EditTableDto } from './dto/editTable.dto';
import { Table } from './table.entity';
import { TableRepository } from './table.repository';

@Injectable()
export class TableService {
    constructor(
        @InjectRepository(TableRepository)
        public tableRepository: TableRepository,
    ) { }

    createTable(createTableDto: CreateTableDto): Promise<Table> {
        return this.tableRepository.createTable(createTableDto)
    }

    getTableData(): Promise<Table[]> {
        return this.tableRepository.getTableData()
    }

    getTableDataforAdmin(): Promise<Table[]> {
        return this.tableRepository.getTableDataforAdmin()
    }

    getOneTable(id: string): Promise<Table> {
        return this.tableRepository.getOneTable(id)
    }

    deleteTable(id: string) {
        return this.tableRepository.deleteTable(id)
    }

    undeleteTable(id: string) {
        return this.tableRepository.undeleteTable(id)
    }

    editTable(id: string, editTableDto: EditTableDto) {
        console.log(editTableDto)
        return this.tableRepository.editTable(id, editTableDto)
    }
}
