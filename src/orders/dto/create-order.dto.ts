import { Type } from 'class-transformer';
import { IsString, IsNumber, IsNotEmpty, ValidateNested, ArrayMinSize } from 'class-validator';
import { Users } from 'src/users/entities/users.entities';
import { OrderItemDto } from './order-item.dto';

export class CreateOrderDto {
    @IsString()
    // @IsNotEmpty()
    userName:string;
    
    @IsString()
    // @IsNotEmpty()
    phone:string;

     @IsString()
    // @IsNotEmpty()
    shipingAddress:string;
    

    @IsString()
    note: string;


    @IsNotEmpty()
    @IsNumber()
    userId: number;

    @ValidateNested({each:true})
    @Type(()=> OrderItemDto)
    @ArrayMinSize(1)
    items : OrderItemDto[];
}
