import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from '../common/guards/local-auth.guard';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { Request, Response } from 'express';
import { setRefreshToCookie } from 'src/common/utils/set-refresh-to-cookie.utils';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
        const { refreshToken, accessToken } = await this.authService.login(req.user.info);
        setRefreshToCookie(res, refreshToken);
        return { token: accessToken };
    }

    @Post('register')
    async register(@Body() authRegisterDto: AuthRegisterDto, @Res({ passthrough: true }) res: Response) {
        const { refreshToken, accessToken } = await this.authService.register(authRegisterDto);
        setRefreshToCookie(res, refreshToken);
        return { token: accessToken };
    }

    @Post('logout')
    async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
        const token: string = req.cookies['refresh'];
        await this.authService.logout(token);
        res.clearCookie('refresh');
        res.send();
    }

    @Post('jwt')
    async jwt(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
        const token: string = req.cookies['refresh'];
        return this.authService.jwt(token, res);
    }
}
