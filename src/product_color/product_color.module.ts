import { Module } from '@nestjs/common';
import { ProductColorService } from './product_color.service';
import { ProductColorController } from './product_color.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductColor } from './entities/product_color.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ProductColor])],
  controllers: [ProductColorController],
  providers: [ProductColorService],
  exports:[TypeOrmModule]
})
export class ProductColorModule {}
