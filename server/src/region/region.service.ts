import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { RegionRepositoryService } from './region-repository.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { LocationRepositoryService } from 'src/location/location-repository.service';
import { FindOpts } from 'src/common/types/find-opts.interface';

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
            throw new NotFoundException('Location with this id not found');
        }
        return this.regionRepository.create({
            location_ref: { connect: { id: location_id } },
            name,
        });
    }

    async findAll(findOpts: FindOpts) {
        const totalCount = await this.regionRepository.count(findOpts.where);
        const regions = await this.regionRepository.findAll(findOpts);
        return { totalCount, data: regions };
    }

    async findById(id: number) {
        const region = await this.regionRepository.find({ id });
        if (!region) {
            throw new NotFoundException();
        }
        return region;
    }

    async update(id: number, updateRegionDto: UpdateRegionDto) {
        const region = await this.regionRepository.find({
            id,
        });
        const { location_id, name } = updateRegionDto;
        if (!region) {
            throw new NotFoundException('Region with this id not found');
        }
        if (location_id && name) {
            const region = await this.regionRepository.find({
                name_location_id: { location_id, name },
            });
            if (region) {
                throw new ConflictException('A region with this name already exists in this location');
            }
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
