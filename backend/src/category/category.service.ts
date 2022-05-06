import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { CategoryRepository } from './category.repository';
import { EditCategoryDto } from './dto/editCategory.dto';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(CategoryRepository)
        public categoryRepository: CategoryRepository,
    ) { }

    createCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
        console.log(createCategoryDto)
        return this.categoryRepository.createCategory(createCategoryDto)
    }

    getCategorys(): Promise<Category[]> {
        return this.categoryRepository.getCategorys()
    }

    getCategorysforAdmin(): Promise<Category[]> {
        return this.categoryRepository.getCategorysforAdmin()
    }

    getCategory(id: string): Promise<Category> {
        return this.categoryRepository.getCategory(id)
    }

    deleteCategory(id: string) {
        return this.categoryRepository.deleteCategory(id)
    }

    undeleteCategory(id: string) {
        return this.categoryRepository.undeleteCategory(id)
    }

    editCategory(id: string, editCategoryDto: EditCategoryDto): Promise<Category> {
        return this.categoryRepository.editCategory(id, editCategoryDto)
    }
}
