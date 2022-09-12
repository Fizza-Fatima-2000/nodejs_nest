/* eslint-disable prettier/prettier */
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthDTO } from './dto/auth.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt'
import { use } from 'passport';
@EntityRepository(User)
export class UserRepository extends Repository<User>{
    async createUser(authdto: AuthDTO): Promise<void> {
        const { username, password } = authdto;

        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(password, salt)

        const user_create = await this.create({ username, password: hash });
        try {
            await this.save(user_create)
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException("user already exit")


            }
            else {
                throw new InternalServerErrorException();
            }


        }
        console.log(user_create)

    }

}
