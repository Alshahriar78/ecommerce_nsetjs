import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
import { Users } from 'src/users/entities/users.entities';

export class CreateOrderDto {
    @IsNotEmpty()
    @IsString()
    user_name: string;

    @IsNotEmpty()
    @IsString()
    phone: string;

    @IsString()
    note: string;

    @IsNotEmpty()
    @IsNumber()
    total_price: number;

    @IsNotEmpty()
    @IsString()
    status: string;

    @IsNotEmpty()
    @IsString()
    address: string;

    @IsNotEmpty()
    @IsNumber()
    user: Users;
}

