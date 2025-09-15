import { IsNotEmpty, IsNumber, IsPositive, IsOptional } from 'class-validator';
import { Product } from 'src/product/entities/product.entity';
import { ProductColor } from 'src/product_color/entities/product_color.entity';
import { ProductLabel } from 'src/product_label/entities/product_label.entity';

export class CreateProductVariantDto {
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    product_id: Product;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    label_id: ProductLabel;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    color_id: ProductColor;

    @IsNotEmpty()
    @IsNumber()
    stock: number;

    @IsNotEmpty()
    @IsNumber({ maxDecimalPlaces: 2 })
    @IsPositive()
    price: number;
}


