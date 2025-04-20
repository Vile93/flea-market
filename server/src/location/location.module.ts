import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { LocationRepositoryService } from './location-repository.service';

@Module({
    controllers: [LocationController],
    providers: [LocationService, LocationRepositoryService],
})
export class LocationModule {}
