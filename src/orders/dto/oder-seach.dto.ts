import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive, IsString, Min } from 'class-validator';



export class OrderSeachDto {
 
  @IsOptional()
  userId:number;
  
  @IsOptional()
  name: string;

  @IsOptional()
 
  @Min(0)
  skip:number;

  @IsOptional()
  limit: number;

  @IsOptional()
  phone:string;

  @IsOptional()
  price:number;

  @IsOptional()
  status:string;


}