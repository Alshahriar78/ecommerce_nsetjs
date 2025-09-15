import { IsNotEmpty, IsNumber, IsOptional, IsPositive } from 'class-validator';

export class OrderItemDto {
  @IsNotEmpty()
  @IsPositive()
  product_varient_id: number;

  @IsNotEmpty()
  @IsPositive()
  quantity: number;
}
