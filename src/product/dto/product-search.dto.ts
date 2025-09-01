import { Type } from 'class-transformer';
import { IsOptional, IsPositive, IsString, Min } from 'class-validator';



export class ProductSeachDto {
 
  @IsOptional()
  @IsString()
  brand:string;
  
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @Min(0)
  skip:number;

  @IsOptional()
  @IsPositive()
  limit: number;


}