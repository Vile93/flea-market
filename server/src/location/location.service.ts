import { Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { LocationRepositoryService } from 'src/location/location-repository.service';
import { FindLocationDto } from 'src/location/dto/find-location.dto';
import { toObj } from 'src/common/utils/toObj.utils';

@Injectable()
export class LocationService {
    constructor(private readonly locationRepository: LocationRepositoryService) {}
    create(createLocationDto: CreateLocationDto) {
        return this.locationRepository.create(createLocationDto);
    }

    findAll(findLocationDto: FindLocationDto) {
        const { orderDirection, orderField, searchField, searchValue, skip, take } = findLocationDto;
        return this.locationRepository.findAll(
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
