import { IsString, IsEmail, IsBoolean, IsOptional, IsDate, IsArray } from '@nestjs/class-validator';
import { UsersRole } from 'src/users_role/entities/users_role.entity';


export class CreateUsersDto {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  password: string;

  @IsString()
  phone: string;

  @IsString()
  address: string;

  @IsBoolean()
  is_active: boolean;


  @IsArray()
  @IsOptional()
  userRole: UsersRole[];
}
