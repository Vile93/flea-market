import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { TypeRepositoryService } from './type-repository.service';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { FindOpts } from 'src/common/types/find-opts.interface';
import { CategoryRepositoryService } from 'src/category/category-repository.service';

@Injectable()
export class TypeService {
    constructor(
        private readonly typeRepository: TypeRepositoryService,
        private readonly categoryRepository: CategoryRepositoryService,
    ) {}
    async create(createTypeDto: CreateTypeDto) {
        const { name, category_id } = createTypeDto;
        const category = await this.categoryRepository.find({ id: category_id });
        if (!category) {
            throw new NotFoundException('Category not found');
        }
        const type = await this.typeRepository.find({ name_category_id: { name, category_id } });
        if (type) {
            throw new ConflictException('A type with this name already exists');
        }
        return this.typeRepository.create({
            category_ref: { connect: { id: createTypeDto.category_id } },
            name: createTypeDto.name,
        });
    }

    async findAll(findOpts: FindOpts) {
        const count = await this.typeRepository.count(findOpts.where);
        const types = await this.typeRepository.findAll(findOpts);
        return { count, data: types };
    }

    async findById(id: number) {
        const type = await this.typeRepository.find({ id });
        if (!type) {
            throw new NotFoundException();
        }
        return type;
    }

    async update(id: number, updateTypeDto: UpdateTypeDto) {
        const { name, category_id } = updateTypeDto;
        const category = await this.categoryRepository.find({ id: category_id });
        if (!category) {
            throw new NotFoundException('Category not found');
        }
        if (name && category_id) {
            const type = await this.typeRepository.find({ name_category_id: { name, category_id } });
            if (type) {
                throw new ConflictException('A type with this name already exists');
            }
        }
        return this.typeRepository.update({ where: { id }, data: updateTypeDto });
    }

    async delete(id: number) {
        const type = await this.typeRepository.find({ id });
        if (!type) {
            throw new NotFoundException();
        }
        return this.typeRepository.delete({ id });
    }
}
