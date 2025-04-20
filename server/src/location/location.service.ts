import { Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { LocationRepositoryService } from 'src/location/location-repository.service';
import { FindLocationDto } from 'src/location/dto/find-location.dto';

@Injectable()
export class LocationService {
    constructor(private readonly locationRepository: LocationRepositoryService) {}
    create(createLocationDto: CreateLocationDto) {
        return this.locationRepository.create(createLocationDto);
    }

    findAll(findLocationDto: FindLocationDto) {
        return this.locationRepository.findAll(findLocationDto);
    }

    findById(id: number) {
        return this.locationRepository.find({ id });
    }

    update(id: number, updateLocationDto: UpdateLocationDto) {
        return this.locationRepository.update({ where: { id }, data: updateLocationDto });
    }

    delete(id: number) {
        return this.locationRepository.delete({ id });
    }
}
