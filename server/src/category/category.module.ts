import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { CategoryRepositoryService } from './category-repository.service';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepositoryService],
})
export class CategoryModule {}
