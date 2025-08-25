import { IsNotEmpty, IsString } from "@nestjs/class-validator";

export class CreateBrandDto {
    @IsString()
    @IsNotEmpty()
    name: string;
}
