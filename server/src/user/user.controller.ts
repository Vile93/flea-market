import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    FileTypeValidator,
    Get,
    MaxFileSizeValidator,
    Param,
    ParseFilePipe,
    ParseIntPipe,
    Post,
    Put,
    Query,
    Req,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { Roles } from 'src/common/decorators/role.decorator';
import { Role } from '@prisma/client';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { FindUserDto } from 'src/user/dto/find-user.dto';
import { UpdateUserProfileDto } from 'src/user/dto/update-user-profile.dto';
import { MAX_ALLOW_FILE_SIZE } from 'src/common/constants';

@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    @Roles(Role.ROOT)
    create(@Body() createUserDto: CreateUserDto, @Req() req: Request) {
        return this.userService.create(createUserDto, req.user.payload);
    }

    @Roles(Role.ROOT, Role.ADMIN)
    @Get()
    findAll(@Query() findUserDto: FindUserDto) {
        return this.userService.findAll(findUserDto.data);
    }

    @Get('profile')
    profile(@Req() req: Request) {
        return this.userService.profile(req.user.payload);
    }

    @Put('profile')
    updateProfile(@Req() req: Request, @Body() updateUserProfileDto: UpdateUserProfileDto) {
        return this.userService.updateProfile(req.user.payload, updateUserProfileDto);
    }

    @Post('avatar')
    @UseInterceptors(FileInterceptor('avatar'))
    createAvatar(
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
        return this.userService.createAvatar(image);
    }

    @Get('offers')
    findUserOffers(@Req() req: Request) {
        return this.userService.findUserOffers(req.user.payload);
    }

    @Delete('offers/:offerId')
    deleteUserOffer(@Param('offerId', ParseIntPipe) offerId: number, @Req() req: Request) {
        console.log(req.user.payload);
        return this.userService.deleteUserOffer(offerId, req.user.payload);
    }

    @Roles(Role.ROOT, Role.ADMIN)
    @Get(':id')
    findById(@Param('id', ParseIntPipe) id: number) {
        return this.userService.findById(id);
    }

    @Roles(Role.USER)
    @Put()
    updateUserProfile(
        @Body() updateUserDto: UpdateUserDto,
        @Req() req: Request,
        @UploadedFile() logo: Express.Multer.File,
    ) {
        return this.userService.updateUserProfile(req.user.payload, logo, updateUserDto);
    }

    @Roles(Role.ROOT, Role.ADMIN)
    @Put(':id')
    updateUserByAdmin(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUserDto: UpdateUserDto,
        @Req() req: Request,
        @UploadedFile() logo: Express.Multer.File,
    ) {
        return this.userService.updateUserByAdmin(id, logo, req.user.payload, updateUserDto);
    }

    @Roles(Role.ROOT, Role.ADMIN)
    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
        return this.userService.delete(id, req.user.payload);
    }
}
