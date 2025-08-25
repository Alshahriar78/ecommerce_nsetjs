import { IsNotEmpty, IsString } from "@nestjs/class-validator";

export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty()
    name: string
}
