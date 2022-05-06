import { Controller, Post, UseGuards, Get, Body, Request, Options } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/user.entity';
import { AuthService } from './auth.service';
import { GetUser } from './decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('/login')
    async login(@Body() id: string) {
        console.log("login")
        return this.authService.login(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/profile')
    getProfile(@GetUser() user: User) {
        return this.authService.getProfile(user);
    }

    @Options('/login')
    test(@Body() id: string) {
        console.log(Body)
    }
}
