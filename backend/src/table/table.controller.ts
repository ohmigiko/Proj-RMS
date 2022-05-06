import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/auth/role.enum';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { CreateTableDto } from './dto/createTable.dto';
import { EditTableDto } from './dto/editTable.dto';
import { Table } from './table.entity';
import { TableService } from './table.service';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('table')
export class TableController {
    constructor(private tableService: TableService) { }

    @Roles(Role.Admin)
    @Post()
    createTable(@Body() createTableDto: CreateTableDto): Promise<Table> {
        return this.tableService.createTable(createTableDto);
    }

    @Get()
    getTableData(): Promise<Table[]> {
        return this.tableService.getTableData()
    }

    @Roles(Role.Admin)
    @Get('/admin')
    getTableDataforAdmin(): Promise<Table[]> {
        return this.tableService.getTableDataforAdmin()
    }

    @Get('/:id')
    getOneTable(@Param('id') id: string): Promise<Table> {
        return this.tableService.getOneTable(id)
    }

    @Roles(Role.Admin)
    @Delete('/:id')
    deleteTable(@Param('id') id: string) {
        return this.tableService.deleteTable(id)
    }

    @Roles(Role.Admin)
    @Delete('/:id')
    undeleteTable(@Param('id') id: string) {
        return this.tableService.undeleteTable(id)
    }

    @Roles(Role.Admin)
    @Patch('/:id')
    editTable(@Param('id') id: string, @Body() editTableDto: EditTableDto) {
        return this.tableService.editTable(id, editTableDto)
    }
}
