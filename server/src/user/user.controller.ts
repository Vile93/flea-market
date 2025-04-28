import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    Param,
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
import { FindCategoryDto } from 'src/category/dto/find-category.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { FindUserDto } from 'src/user/dto/find-user.dto';

@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor, FileInterceptor('logo'))
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    @Roles(Role.ROOT)
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @Roles(Role.ROOT, Role.ADMIN)
    @Get()
    findAll(@Query() findUserDto: FindUserDto) {
        return this.userService.findAll(findUserDto);
    }

    @Get('profile')
    profile(@Req() req: Request) {
        return this.userService.profile(req.user.payload);
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
        @UploadedFile() logo: Express.Multer.File,
    ) {
        return this.userService.updateUserByAdmin(id, logo, updateUserDto);
    }

    @Roles(Role.ROOT, Role.ADMIN)
    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.userService.delete(id);
    }
}
