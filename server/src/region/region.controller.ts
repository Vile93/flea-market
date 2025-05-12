import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { RegionService } from './region.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { FindRegionDto } from './dto/find-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { Roles } from 'src/common/decorators/role.decorator';
import { Role } from '@prisma/client';

@Controller('regions')
@Roles(Role.ROOT, Role.ADMIN)
export class RegionController {
    constructor(private readonly regionService: RegionService) {}
    @Post()
    create(@Body() createRegionDto: CreateRegionDto) {
        return this.regionService.create(createRegionDto);
    }

    @Get()
    findAll(@Query() findRegionDto: FindRegionDto) {
        return this.regionService.findAll(findRegionDto.data);
    }

    @Get(':id')
    findById(@Param('id', ParseIntPipe) id: number) {
        return this.regionService.findById(id);
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateRegionDto: UpdateRegionDto) {
        return this.regionService.update(id, updateRegionDto);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.regionService.delete(id);
    }
}
