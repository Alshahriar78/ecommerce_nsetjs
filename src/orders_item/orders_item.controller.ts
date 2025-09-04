import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { OrdersItemService } from './orders_item.service';
import { CreateOrdersItemDto } from './dto/create-orders_item.dto';
import { UpdateOrdersItemDto } from './dto/update-orders_item.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('orders-item')
export class OrdersItemController {
  constructor(private readonly ordersItemService: OrdersItemService) {}

  // @UseGuards(AuthGuard,RolesGuard)
  // @Roles('ADMIN','CUSTOMER')
  // @Post()
  // create() {
  //   return this.ordersItemService.create(createOrdersItemDto);
  // }

  @Get()
  findAll() {
    return this.ordersItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersItemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrdersItemDto: UpdateOrdersItemDto) {
    return this.ordersItemService.update(+id, updateOrdersItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersItemService.remove(+id);
  }
}
