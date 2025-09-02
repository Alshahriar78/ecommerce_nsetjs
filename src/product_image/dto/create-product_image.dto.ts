import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Product } from "src/product/entities/product.entity";


export class CreateProductImageDto {

    @IsString()
    path: string;

    @IsString()
    filename: string;

    @IsNotEmpty()
    @IsNumber()
    product: Product;
}
