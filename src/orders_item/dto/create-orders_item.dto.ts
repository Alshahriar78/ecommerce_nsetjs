import { IsInt, IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
import { Order } from 'src/orders/entities/order.entity';
import { Product } from 'src/product/entities/product.entity';


export class CreateOrdersItemDto {
 
  @IsString()
  @IsNotEmpty()
  name: string;

 
  @IsInt()
  @IsPositive()
  quantity: number;

 
  @IsNumber()
  @IsPositive()
  price: number;

  
  @IsNumber()
  order: Order;

  
  @IsNumber()
  product: Product;
}

