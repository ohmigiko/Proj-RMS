import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/auth/role.enum';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Category } from './category.entity';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { EditCategoryDto } from './dto/editCategory.dto';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('category')
export class CategoryController {
    constructor(public categoryService: CategoryService) { }

    @Roles(Role.Admin)
    @Post()
    createCategory(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
        console.log('a')
        return this.categoryService.createCategory(createCategoryDto)
    }

    @Get()
    getCategorys(): Promise<Category[]> {
        console.log('a')
        return this.categoryService.getCategorys()
    }

    @Roles(Role.Admin)
    @Get('/admin')
    getCategorysforAdmin(): Promise<Category[]> {
        return this.categoryService.getCategorysforAdmin()
    }

    @Get('/:id')
    getCategory(@Param('id') id: string): Promise<Category> {
        return this.categoryService.getCategory(id)
    }

    @Roles(Role.Admin)
    @Delete('/:id')
    deleteCategory(@Param('id') id: string) {
        return this.categoryService.deleteCategory(id)
    }

    @Roles(Role.Admin)
    @Patch('/undelete/:id')
    undeleteCategory(@Param('id') id: string) {
        return this.categoryService.undeleteCategory(id)
    }

    @Patch('/:id')
    editCategory(@Param('id') id: string, @Body() editCategoryDto: EditCategoryDto): Promise<Category> {
        return this.categoryService.editCategory(id, editCategoryDto)
    }
}
