import { Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { LocationRepositoryService } from 'src/location/location-repository.service';
import { FindOpts } from 'src/common/types/find-opts.interface';

@Injectable()
export class LocationService {
    constructor(private readonly locationRepository: LocationRepositoryService) {}
    async create(createLocationDto: CreateLocationDto) {
        return this.locationRepository.create(createLocationDto);
    }

    async findAll(findOpts: FindOpts) {
        return this.locationRepository.findAll(findOpts);
    }

    async findById(id: number) {
        return this.locationRepository.find({ id });
    }

    async update(id: number, updateLocationDto: UpdateLocationDto) {
        return this.locationRepository.update({ where: { id }, data: updateLocationDto });
    }

    async delete(id: number) {
        return this.locationRepository.delete({ id });
    }
}
