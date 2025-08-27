import { IsNumber, IsString } from "class-validator";
import { Product } from "src/product/entities/product.entity";

export class CreateProductImageDto {

    @IsString()
    url:string;

    @IsNumber()
    product:Product;
}
