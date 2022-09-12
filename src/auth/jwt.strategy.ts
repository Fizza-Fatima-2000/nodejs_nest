/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt"
import { JwtPayload } from "./jwt.payload";
import { User } from "./user.entity";
import { UserRepository } from "./user.repository"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserRepository)
        private userrepository: UserRepository,
    ) {
        super({
            secretOrKey: 'TopSecret50',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }
    async validate(payload: JwtPayload): Promise<User> {
        const { username } = payload
        const user: User = await this.userrepository.findOne({ username });
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }

}