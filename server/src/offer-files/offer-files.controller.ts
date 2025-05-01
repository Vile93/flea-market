import { Controller, Param, ParseIntPipe, Post, Req, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { OfferFilesService } from './offer-files.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('offer-files')
@UseGuards(JwtAuthGuard)
@UseInterceptors(
    FileFieldsInterceptor([
        {
            name: 'images',
            maxCount: 8,
        },
    ]),
)
export class OfferFilesController {
    constructor(private readonly offerFilesService: OfferFilesService) {}

    @Post(':offerId')
    create(
        @Param('offerId', ParseIntPipe) offerId: number,
        @UploadedFiles() files: { images?: Express.Multer.File[] },
        @Req() req: Request,
    ) {
        return this.offerFilesService.create(offerId, req.user.payload, files);
    }
}
