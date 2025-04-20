import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe, Query } from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Roles } from 'src/common/decorators/role.decorator';
import { Role } from '@prisma/client';
import { FindLocationDto } from 'src/location/dto/find-location.dto';

@Controller('locations')
@Roles(Role.ADMIN, Role.ROOT)
export class LocationController {
    constructor(private readonly locationService: LocationService) {}

    @Post()
    create(@Body() createLocationDto: CreateLocationDto) {
        console.log(createLocationDto);
        return this.locationService.create(createLocationDto);
    }

    @Get()
    findAll(@Query() findLocationDto: FindLocationDto) {
        console.log(findLocationDto);
        return this.locationService.findAll(findLocationDto);
    }

    @Get(':id')
    findById(@Param('id', ParseIntPipe) id: number) {
        return this.locationService.findById(id);
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateLocationDto: UpdateLocationDto) {
        console.log(updateLocationDto);
        return this.locationService.update(id, updateLocationDto);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.locationService.delete(id);
    }
}
