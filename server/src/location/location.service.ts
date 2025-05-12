import { ConflictException, Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { LocationRepositoryService } from 'src/location/location-repository.service';
import { FindOpts } from 'src/common/types/find-opts.interface';

@Injectable()
export class LocationService {
    constructor(private readonly locationRepository: LocationRepositoryService) {}
    async create(createLocationDto: CreateLocationDto) {
        const location = await this.locationRepository.find({ name: createLocationDto.name });
        if (location) {
            throw new ConflictException('A location with this name already exists');
        }
        return this.locationRepository.create(createLocationDto);
    }

    async findAll(findOpts: FindOpts) {
        const totalCount = await this.locationRepository.count(findOpts.where ?? {});
        const locations = await this.locationRepository.findAll(findOpts);
        return {
            totalCount,
            data: locations,
        };
    }

    async findById(id: number) {
        return this.locationRepository.find({ id });
    }

    async update(id: number, updateLocationDto: UpdateLocationDto) {
        const location = await this.locationRepository.find({ name: updateLocationDto.name });
        if (location) {
            throw new ConflictException('A location with this name already exists');
        }
        return this.locationRepository.update({ where: { id }, data: updateLocationDto });
    }

    async delete(id: number) {
        return this.locationRepository.delete({ id });
    }
}
