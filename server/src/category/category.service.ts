import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryRepositoryService } from './category-repository.service';
import { FindCategoryDto } from './dto/find-category.dto';

@Injectable()
export class CategoryService {
    constructor(private readonly categoryRepository: CategoryRepositoryService) {}
    async create(createCategoryDto: CreateCategoryDto) {
        const category = await this.categoryRepository.find(createCategoryDto);
        if (category) {
            throw new ConflictException('A category with this name already exists');
        }
        return this.categoryRepository.create(createCategoryDto);
    }

    async findAll(findCategoryDto: FindCategoryDto) {
        console.log(findCategoryDto);
        const totalCount = await this.categoryRepository.count(findCategoryDto.data.where ?? {});
        const categories = await this.categoryRepository.findAll(findCategoryDto.data);
        return {
            totalCount,
            data: categories,
        };
    }

    async findById(id: number) {
        const category = await this.categoryRepository.find({ id });
        if (!category) {
            throw new NotFoundException();
        }
        return category;
    }

    async update(id: number, updateCategoryDto: UpdateCategoryDto) {
        const category = await this.categoryRepository.find({ id });
        if (category) {
            throw new ConflictException('A category with this name already exists');
        }
        return this.categoryRepository.update({ where: { id }, data: updateCategoryDto });
    }

    async delete(id: number) {
        const category = await this.categoryRepository.find({ id });
        if (!category) {
            throw new NotFoundException();
        }
        return this.categoryRepository.delete({ id });
    }
}
