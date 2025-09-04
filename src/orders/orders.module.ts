import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { UsersModule } from 'src/users/users.module';
import { ProductModule } from 'src/product/product.module';
import { OrdersItemModule } from 'src/orders_item/orders_item.module';

@Module({
  imports:[TypeOrmModule.forFeature([Order]),UsersModule,ProductModule,OrdersItemModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
