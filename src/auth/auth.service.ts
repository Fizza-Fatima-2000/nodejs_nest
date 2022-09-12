/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthDTO } from './dto/auth.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt.payload';
@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(UserRepository)
        private userrepository: UserRepository ,
        private jwtService : JwtService,
    ) { }


    async for_Signup(authdto: AuthDTO): Promise<void> {
        return this.userrepository.createUser(authdto);
    }

    async for_Signin(authdto: AuthDTO): Promise<{accessToken : string} > {
        const { username, password } = authdto;
        const user = await this.userrepository.findOne({ username });
        if (user && (await bcrypt.compare(password, user.password))) {
           const payload : JwtPayload ={username , password};
           const accessToken : string  = await this.jwtService.sign(payload);
           return { accessToken } ;
        }
else {
            throw new UnauthorizedException(" please check again")
        }
    }
}
