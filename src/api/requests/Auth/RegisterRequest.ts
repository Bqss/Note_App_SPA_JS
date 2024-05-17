import { isUnique } from '@base/decorators/validation-rules/IsUnique';
import { isSame } from '@base/decorators/validation-rules/isSame';
import { IsNotEmpty, IsEmail, IsString, MinLength, MaxLength, isString, Matches, matches } from 'class-validator';

export class RegisterRequest {
  @MaxLength(20)
  @MinLength(2)
  @IsString()
  @IsNotEmpty()
  @isUnique('users', 'username')
  username: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @isUnique('users', 'email')
  email: string;

  @MinLength(8)
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsString()
  @isSame('password')
  password_confirmation: string;

}
