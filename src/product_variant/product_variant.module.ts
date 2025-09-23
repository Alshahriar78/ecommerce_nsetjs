import { Module } from '@nestjs/common';
import { ProductVariantService } from './product_variant.service';
import { ProductVariantController } from './product_variant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductVariant } from './entities/product_variant.entity';
import { ProductModule } from 'src/product/product.module';
import { ProductColorModule } from 'src/product_color/product_color.module';
import { ProductLabelModule } from 'src/product_label/product_label.module';
import { OrdersItemModule } from 'src/orders_item/orders_item.module';

@Module({
  imports:[TypeOrmModule.forFeature([ProductVariant]),ProductModule,ProductColorModule,ProductLabelModule,OrdersItemModule],
  controllers: [ProductVariantController],
  providers: [ProductVariantService],
  exports:[TypeOrmModule]
})
export class ProductVariantModule {}
