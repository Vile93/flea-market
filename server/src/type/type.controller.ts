import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { TypeService } from './type.service';
import { CreateTypeDto } from './dto/create-type.dto';
import { FindTypeDto } from './dto/find-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { Roles } from 'src/common/decorators/role.decorator';
import { Role } from '@prisma/client';

@Controller('types')
@Roles(Role.ROOT, Role.ADMIN)
export class TypeController {
    constructor(private readonly typeService: TypeService) {}
    @Post()
    create(@Body() createTypeDto: CreateTypeDto) {
        return this.typeService.create(createTypeDto);
    }

    @Get()
    findAll(@Query() findTypeDto: FindTypeDto) {
        return this.typeService.findAll(findTypeDto);
    }

    @Get(':id')
    findById(@Param('id', ParseIntPipe) id: number) {
        return this.typeService.findById(id);
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateTypeDto: UpdateTypeDto) {
        return this.typeService.update(id, updateTypeDto);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.typeService.delete(id);
    }
}
