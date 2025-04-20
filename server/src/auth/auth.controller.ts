import { Body, ClassSerializerInterceptor, Controller, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from '../common/guards/local-auth.guard';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { Request } from 'express';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Req() req: Request) {
        return this.authService.loginUser(req.user);
    }

    @Post('register')
    async register(@Body() authRegisterDto: AuthRegisterDto) {
        return this.authService.registerUser(authRegisterDto);
    }

    @Post('logout')
    async logout() {}
}
