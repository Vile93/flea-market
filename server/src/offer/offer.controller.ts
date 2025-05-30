import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Put,
    Req,
    ParseIntPipe,
    UseInterceptors,
    UploadedFile,
    ParseFilePipe,
    FileTypeValidator,
    UseGuards,
    Query,
} from '@nestjs/common';
import { OfferService } from './offer.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { Roles } from 'src/common/decorators/role.decorator';
import { Role } from '@prisma/client';
import { Request } from 'express';
import { FindOfferDto } from 'src/offer/dto/find-offer.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MaxFileSizeValidator } from '@nestjs/common';
import { MAX_ALLOW_FILE_SIZE } from 'src/common/constants';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { FindModerateOfferDto } from 'src/offer/dto/find-moderate-offer.dto';
import { UpdateModerateOfferDto } from 'src/offer/dto/update-moderate-offer.dto';

@Controller('offers')
export class OfferController {
    constructor(private readonly offerService: OfferService) {}

    @Roles(Role.USER)
    @Post()
    create(@Body() createOfferDto: CreateOfferDto, @Req() req: Request) {
        return this.offerService.create(createOfferDto, req.user.payload);
    }

    @Get('categories-and-locations')
    findCategoriesAndLocations() {
        return this.offerService.findCategoriesAndLocations();
    }

    @UseGuards(JwtAuthGuard)
    @Post('image')
    @UseInterceptors(FileInterceptor('image'))
    createImage(
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({
                        maxSize: MAX_ALLOW_FILE_SIZE,
                        message: 'File size exceeded',
                    }),
                    new FileTypeValidator({ fileType: /^image/ }),
                ],
            }),
        )
        image: Express.Multer.File,
    ) {
        return this.offerService.createImage(image);
    }

    @Get()
    findAll(@Query() findOfferDto: FindOfferDto) {
        return this.offerService.findAll(findOfferDto);
    }

    @Roles(Role.MODERATOR)
    @Get('moderate')
    findAllWithModerate(@Query() findModerateOfferDto: FindModerateOfferDto) {
        return this.offerService.findAllWithModerate(findModerateOfferDto.data);
    }

    @Get(':id')
    findById(@Param('id', ParseIntPipe) id: number) {
        return this.offerService.findById(id);
    }

    @Roles(Role.MODERATOR)
    @Get(':id/moderate')
    findModerateOffer(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
        return this.offerService.findByIdModerateOffer(id, req.user.payload);
    }

    @Put(':id/moderate')
    updateModerateOffer(@Param('id', ParseIntPipe) id: number, @Body() updateModerateOfferDto: UpdateModerateOfferDto) {
        return this.offerService.updateModerateOffer(id, updateModerateOfferDto);
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
