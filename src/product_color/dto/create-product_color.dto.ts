import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Product } from "src/product/entities/product.entity";


export class CreateProductColorDto {
    @IsString()
    value: string;

    @IsString()
    hex_value: string;
}
