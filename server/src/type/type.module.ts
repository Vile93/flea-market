import { Module } from '@nestjs/common';
import { TypeService } from './type.service';
import { TypeController } from './type.controller';
import { TypeRepositoryService } from './type-repository.service';

@Module({
    exports: [TypeRepositoryService],
    controllers: [TypeController],
    providers: [TypeService, TypeRepositoryService],
})
export class TypeModule {}
