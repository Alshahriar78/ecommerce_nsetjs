import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { UsersModule } from 'src/users/users.module';
import { ProductModule } from 'src/product/product.module';
import { OrdersItemModule } from 'src/orders_item/orders_item.module';
import { ProductColorModule } from 'src/product_color/product_color.module';
import { ProductLabelModule } from 'src/product_label/product_label.module';
import { ProductVariantModule } from 'src/product_variant/product_variant.module';

@Module({
  imports:[TypeOrmModule.forFeature([Order]),UsersModule,ProductModule,OrdersItemModule,ProductColorModule,ProductLabelModule,ProductVariantModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
