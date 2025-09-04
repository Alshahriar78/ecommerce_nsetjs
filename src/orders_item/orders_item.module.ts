import { Module } from '@nestjs/common';
import { OrdersItemService } from './orders_item.service';
import { OrdersItemController } from './orders_item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersItem } from './entities/orders_item.entity';

@Module({
  imports:[TypeOrmModule.forFeature([OrdersItem])],
  controllers: [OrdersItemController],
  providers: [OrdersItemService],
  exports:[TypeOrmModule]
})
export class OrdersItemModule {}
