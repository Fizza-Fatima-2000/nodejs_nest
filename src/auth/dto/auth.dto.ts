/* eslint-disable prettier/prettier */
import { IsString, MaxLength, MinLength } from "class-validator";
export class AuthDTO {
  @IsString()
  @MinLength(2)
  @MaxLength(8)
  username: string ;
  @IsString()
  @MinLength(2)
  @MaxLength(8)
  password: string ;
}