import { PartialType } from '@nestjs/mapped-types';
import { CreateProductLabelDto } from './create-product_label.dto';

export class UpdateProductLabelDto extends PartialType(CreateProductLabelDto) {}
