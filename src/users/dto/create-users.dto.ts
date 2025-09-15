import { IsString, IsEmail, IsBoolean, IsOptional, IsDate, IsArray } from '@nestjs/class-validator';
import { IsNotEmpty, IsNumber,  IsPhoneNumber, Matches, MaxLength, MinLength } from 'class-validator';
import { UsersRole } from 'src/users_role/entities/users_role.entity';
import { Unique } from 'typeorm';


export class CreateUsersDto {

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please provide a valid email address.' })
  email: string;

  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(50)
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/, {
    message: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
  })
  password: string;

  @IsNotEmpty({ message: 'Phone number is required' })
  @Matches(/^(?:\+8801[3-9]\d{8}|01[3-9]\d{8})$/, {
    message: 'Phone number must be a valid Bangladeshi number',
  })
  phone: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsBoolean()
  is_active: boolean;


  @IsNumber()
  @IsOptional()
  role: number;
}
