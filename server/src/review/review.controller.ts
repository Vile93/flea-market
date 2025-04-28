import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Req } from '@nestjs/common';
import { ReviewService } from './review.service';
import { Roles } from 'src/common/decorators/role.decorator';
import { Role } from '@prisma/client';
import { CreateReviewDto } from 'src/review/dto/create-review.dto';
import { Request } from 'express';
import { FindReviewDto } from 'src/review/dto/find-review-dto';
import { UpdateReviewDto } from 'src/review/dto/update-review.dto';

@Controller('reviews')
export class ReviewController {
    constructor(private readonly reviewService: ReviewService) {}

    @Roles(Role.USER)
    @Post()
    create(@Body() createReviewDto: CreateReviewDto, @Req() req: Request) {
        return this.reviewService.create(createReviewDto, req.user.payload);
    }

    @Get(':id')
    findById(@Param('id', ParseIntPipe) id: number) {
        return this.reviewService.findById(id);
    }

    @Get()
    findAll(@Query() findReviewDto: FindReviewDto) {
        console.log(findReviewDto);
        return this.reviewService.findAll(findReviewDto);
    }

    @Roles(Role.ROOT, Role.ADMIN)
    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.reviewService.delete(id);
    }

    @Roles(Role.USER)
    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Req() req: Request, @Body() updateReviewDto: UpdateReviewDto) {
        return this.reviewService.update(id, req.user.payload, updateReviewDto);
    }

    @Roles(Role.USER)
    @Put(':id/answer')
    updateAnswer() {}
}
