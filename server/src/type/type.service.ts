import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { toObj } from 'src/common/utils/to-obj.utils';
import { TypeRepositoryService } from './type-repository.service';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { FindTypeDto } from './dto/find-type.dto';

@Injectable()
export class TypeService {
    constructor(private readonly typeRepository: TypeRepositoryService) {}
    async create(createTypeDto: CreateTypeDto) {
        const type = await this.typeRepository.find({ name_category_id: createTypeDto });
        if (type) {
            throw new ConflictException('A type with this name already exists');
        }
        return this.typeRepository.create({
            category_ref: { connect: { id: createTypeDto.category_id } },
            name: createTypeDto.name,
        });
    }

    async findAll(findTypeDto: FindTypeDto) {
        const { orderDirection, orderField, searchField, searchValue, skip, take } = findTypeDto;
        return this.typeRepository.findAll(
            toObj({
                skip,
                take,
                orderBy: {
                    [orderField as string]: orderDirection,
                },
                where: {
                    [searchField as string]: searchValue,
                },
            }),
        );
    }

    async findById(id: number) {
        const type = await this.typeRepository.find({ id });
        if (!type) {
            throw new NotFoundException();
        }
        return type;
    }

    async update(id: number, updateTypeDto: UpdateTypeDto) {
        const type = await this.typeRepository.find({ id });
        if (type) {
            throw new ConflictException('A type with this name already exists');
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
