import { PartialType } from '@nestjs/mapped-types';
import { CreateProductColorDto } from './create-product_color.dto';

export class UpdateProductColorDto extends PartialType(CreateProductColorDto) {}
