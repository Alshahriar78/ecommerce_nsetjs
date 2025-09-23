import { IsNotEmpty, IsString, IsInt } from "class-validator";
import { Product } from "src/product/entities/product.entity";

export class CreateProductLabelDto {
  @IsNotEmpty()
  @IsString()
  value: string;

 
}

