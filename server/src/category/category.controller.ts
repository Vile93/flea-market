import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, Query, Put } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { FindCategoryDto } from './dto/find-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Roles } from 'src/common/decorators/role.decorator';
import { Role } from '@prisma/client';

@Controller('categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Roles(Role.ROOT, Role.ADMIN)
    @Post()
    create(@Body() createCategoryDto: CreateCategoryDto) {
        return this.categoryService.create(createCategoryDto);
    }

    @Roles(Role.ROOT, Role.ADMIN)
    @Get()
    findAll(@Query() findCategoryDto: FindCategoryDto) {
        return this.categoryService.findAll(findCategoryDto.data);
    }

    @Get('nested')
    findAllWithNested() {
        return this.categoryService.findAllWithNested();
    }

    @Roles(Role.ROOT, Role.ADMIN)
    @Get(':id')
    findById(@Param('id', ParseIntPipe) id: number) {
        return this.categoryService.findById(id);
    }

    @Roles(Role.ROOT, Role.ADMIN)
    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateCategoryDto: UpdateCategoryDto) {
        return this.categoryService.update(id, updateCategoryDto);
    }

    @Roles(Role.ROOT, Role.ADMIN)
    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.categoryService.delete(id);
    }
}
