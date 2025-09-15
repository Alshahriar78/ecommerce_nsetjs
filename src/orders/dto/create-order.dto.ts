import { Type } from 'class-transformer';
import { IsString, IsNumber, IsNotEmpty, ValidateNested, ArrayMinSize } from 'class-validator';
import { Users } from 'src/users/entities/users.entities';
import { OrderItemDto } from './order-item.dto';

export class CreateOrderDto {
    @IsString()
    userName: string;

    @IsString()
    phone: string;

    @IsString()
    district: string;

    @IsString()
    area: string;


    @IsString()
    note: string;


    @IsNotEmpty()
    @IsNumber()
    userId: number;

    @ValidateNested({ each: true })
    @Type(() => OrderItemDto)
    @ArrayMinSize(1)
    items: OrderItemDto[];
}
