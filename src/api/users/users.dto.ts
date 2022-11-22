import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUrl,
  IsUUID,
  MinLength,
} from 'class-validator';

export class UserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @IsUrl()
  avatar: string;
}

export class UserPasswordDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @IsString()
  id: string;
}
