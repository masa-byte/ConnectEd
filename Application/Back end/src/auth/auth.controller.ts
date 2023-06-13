import { Body, Controller, Get, Post, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { AuthSignUpUserDto } from './dto/auth-sign-up-user.dto';
import { AuthSignInUserDto } from './dto/auth-sign-in-user.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post('signup')
    signUp(@Body() signUpDto: AuthSignUpUserDto) {
        return this.authService.signUp(signUpDto);
    }

    @Post('signin')
    signIn(@Body() signInDto: AuthSignInUserDto) {
        return this.authService.signIn(signInDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('guardtest')
    getUser(@Req() req : Request) {
        return req.user;
    }
}
