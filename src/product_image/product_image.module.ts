import { Module } from '@nestjs/common';
import { ProductImageService } from './product_image.service';
import { ProductImageController } from './product_image.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductImage } from './entities/product_image.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ProductImage])],
  controllers: [ProductImageController],
  providers: [ProductImageService],
})
export class ProductImageModule {}
