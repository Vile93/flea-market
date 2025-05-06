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

@Controller('offers')
export class OfferController {
    constructor(private readonly offerService: OfferService) {}

    @Roles(Role.USER)
    @Post()
    create(@Body() createOfferDto: CreateOfferDto, @Req() req: Request) {
        return this.offerService.create(createOfferDto, req.user.payload);
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
