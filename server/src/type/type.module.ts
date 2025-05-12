import { Module } from '@nestjs/common';
import { TypeService } from './type.service';
import { TypeController } from './type.controller';
import { TypeRepositoryService } from './type-repository.service';
import { CategoryModule } from 'src/category/category.module';
@Module({
    imports: [CategoryModule],
    exports: [TypeRepositoryService],
    controllers: [TypeController],
    providers: [TypeService, TypeRepositoryService],
})
export class TypeModule {}
