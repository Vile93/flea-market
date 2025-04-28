import { Controller, Get, Post, Body, Param, Delete, Put, Req, ParseIntPipe } from '@nestjs/common';
import { OfferService } from './offer.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { Roles } from 'src/common/decorators/role.decorator';
import { Role } from '@prisma/client';
import { Request } from 'express';
import { FindOfferDto } from 'src/offer/dto/find-offer.dto';

@Controller('offers')
export class OfferController {
    constructor(private readonly offerService: OfferService) {}

    @Roles(Role.USER)
    @Post()
    create(@Body() createOfferDto: CreateOfferDto, @Req() req: Request) {
        return this.offerService.create(createOfferDto, req.user.payload);
    }

    @Get()
    findAll(@Body() findOfferDto: FindOfferDto) {
        return this.offerService.findAll(findOfferDto);
    }

    @Get(':id')
    findById(@Param('id', ParseIntPipe) id: number) {
        return this.offerService.findById(id);
    }

    @Roles(Role.ROOT, Role.ADMIN, Role.USER)
    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateOfferDto: UpdateOfferDto, @Req() req: Request) {
        return this.offerService.update(id, req.user.payload, updateOfferDto);
    }

    @Roles(Role.ROOT, Role.ADMIN, Role.USER)
    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
        return this.offerService.delete(id, req.user.payload);
    }
}
