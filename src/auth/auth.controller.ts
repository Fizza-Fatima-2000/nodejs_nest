/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authservice: AuthService
    ) { }

    @Post('/signup')
    for_Signup(@Body() authdto: AuthDTO): Promise<void> {
        return this.authservice.for_Signup(authdto)
    }
    @Post('/signin')
    for_Signin(@Body() authdto: AuthDTO): Promise<{ accessToken: string }> {
        return this.authservice.for_Signin(authdto)
    }
@Post('/for_auth')
@UseGuards(AuthGuard())
test(@Req() req){
console.log(req);
}
}