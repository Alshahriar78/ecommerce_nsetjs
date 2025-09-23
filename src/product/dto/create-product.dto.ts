import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min } from 'class-validator';
import { Brand } from 'src/brand/entities/brand.entity';
import { Category } from 'src/category/entities/category.entity';
import { IsNull } from 'typeorm';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsNumber()
  brand: Brand;

  @IsNotEmpty()
  @IsNumber()
  category: Category;
}






