import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { UpdateToppingDto } from './dto/updateToppingDto.dto';
import { CreateMenuDto } from './dto/createMenu.dto';
import { Menu } from './menu.entity';
import { MenuService } from './menu.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorator';
import { User } from 'src/user/user.entity';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { EditMenuDto } from './dto/editMenu.dto';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('menu')
export class MenuController {
    constructor(public menuService: MenuService) { }

    @Roles(Role.Admin)
    @Post()
    createMenu(@Body() createMenuDto: CreateMenuDto, @GetUser() user: User): Promise<Menu> {
        return this.menuService.createMenu(createMenuDto, user)
    }

    @Get()
    getMenus(): Promise<Menu[]> {
        return this.menuService.getMenus()
    }

    @Roles(Role.Admin)
    @Get('/admin')
    getMenusforAdmin(): Promise<Menu[]> {
        return this.menuService.getMenusforAdmin()
    }

    @Get('/category/:id')
    getMenusbyCategory(@Param('id') id: string): Promise<Menu[]> {
        return this.menuService.getMenusbyCategory(id)
    }

    @Get('/:id')
    getMenu(@Param('id') id: string): Promise<Menu> {
        return this.menuService.getMenu(id)
    }

    @Roles(Role.Admin)
    @Patch('/topping/:id')
    addTopping(@Param('id') id: string, @Body() updateToppingDto: UpdateToppingDto): Promise<Menu> {
        console.log(updateToppingDto)
        return this.menuService.addTopping(updateToppingDto, id)
    }

    // @Post('/test')
    // test(@Body() createMenuDto: CreateMenuDto) {
    //     const { topping, name, category } = createMenuDto
    //     let new_topping = topping
    //     for (let i = 0; i < new_topping.length; i++) {
    //         console.log(topping_choice[new_topping[i]["option"]])
    //         new_topping[i]["choice"] = topping_choice[new_topping[i]["option"]]
    //     }
    //     // console.log(new_topping)
    //     return new_topping
    // }

    @Roles(Role.Admin)
    @Delete('/:id')
    deleteMenu(@Param('id') id: string) {
        return this.menuService.deleteMenu(id)
    }

    @Roles(Role.Admin)
    @Patch('/undelete/:id')
    undeleteMenu(@Param('id') id: string) {
        return this.menuService.undeleteMenu(id)
    }


    @Roles(Role.Admin)
    @Patch('/:id')
    editMenu(@Param('id') id: string, @Body() editMenuDto: EditMenuDto): Promise<Menu> {
        return this.menuService.editMenu(id, editMenuDto)
    }
}
