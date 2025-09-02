import { IsOptional, IsString } from "class-validator";

export class UserSearchDto{
    @IsOptional()
    @IsString()
    name:string;

    @IsOptional()
    @IsString()
    phone:string;


}