import { IsNotEmpty, IsString } from "@nestjs/class-validator";


export class CreateUsersRoleDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsString()
    description: string;
}