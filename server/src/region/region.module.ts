import { Module } from '@nestjs/common';
import { RegionService } from './region.service';
import { RegionController } from './region.controller';
import { RegionRepositoryService } from './region-repository.service';

@Module({
    exports: [RegionRepositoryService],
    controllers: [RegionController],
    providers: [RegionService, RegionRepositoryService],
})
export class RegionModule {}
