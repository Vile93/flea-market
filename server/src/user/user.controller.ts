import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { Roles } from 'src/common/decorators/role.decorator';
import { Role } from '@prisma/client';
import { CreateCategoryDto } from 'src/category/dto/create-category.dto';
import { FindCategoryDto } from 'src/category/dto/find-category.dto';
import { UpdateCategoryDto } from 'src/category/dto/update-category.dto';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    /*  @Post()
    @Roles(Role.ROOT)
    create(@Body() createCategoryDto: CreateCategoryDto) {
        return this.userService.create(createCategoryDto);
    }

    @Get()
    findAll(@Query() findCategoryDto: FindCategoryDto) {
        return this.userService.findAll(findCategoryDto);
    }

    @Roles(Role.ROOT, Role.ADMIN)
    @Get(':id')
    findById(@Param('id', ParseIntPipe) id: number) {
        return this.userService.findById(id);
    }

    @Roles(Role.ROOT, Role.ADMIN)
    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateCategoryDto: UpdateCategoryDto) {
        return this.userService.update(id, updateCategoryDto);
    }

    @Roles(Role.ROOT, Role.ADMIN)
    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.userService.delete(id);
    } */
}
