import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { toObj } from 'src/common/utils/to-obj.utils';
import { RegionRepositoryService } from './region-repository.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { FindRegionDto } from './dto/find-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { LocationRepositoryService } from 'src/location/location-repository.service';

@Injectable()
export class RegionService {
    constructor(
        private readonly regionRepository: RegionRepositoryService,
        private readonly locationRepository: LocationRepositoryService,
    ) {}
    async create(createRegionDto: CreateRegionDto) {
        const { location_id, name } = createRegionDto;
        const region = await this.regionRepository.find({ name_location_id: { location_id, name } });
        if (region) {
            throw new ConflictException('A region with this name already exists in this location');
        }
        const location = await this.locationRepository.find({ id: location_id });
        if (!location) {
            throw new NotFoundException();
        }
        return this.regionRepository.create({
            location_ref: { connect: { id: location_id } },
            name,
        });
    }

    async findAll(findRegionDto: FindRegionDto) {
        const { orderDirection, orderField, searchField, searchValue, skip, take } = findRegionDto;
        return this.regionRepository.findAll(
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
        const region = await this.regionRepository.find({ id });
        if (!region) {
            throw new NotFoundException();
        }
        return region;
    }

    async update(id: number, updateRegionDto: UpdateRegionDto) {
        const region = await this.regionRepository.find({ id });
        if (region) {
            throw new ConflictException('A region with this name already exists in this location');
        }
        return this.regionRepository.update({ where: { id }, data: updateRegionDto });
    }

    async delete(id: number) {
        const region = await this.regionRepository.find({ id });
        if (!region) {
            throw new NotFoundException();
        }
        return this.regionRepository.delete({ id });
    }
}
