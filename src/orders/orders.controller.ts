import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ProductSeachDto } from 'src/product/dto/product-search.dto';
import { OrderSeachDto } from './dto/oder-seach.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    return await this.ordersService.create(createOrderDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin')
  @Get()
  findAll(@Query()paginationDto?:OrderSeachDto) {
    return this.ordersService.findAll(paginationDto);
  }

  
  @Get('order-by-district')
  async getOrderByDistrict(){
    const data = await this.ordersService.getOrderByDisctricts();
    return data;
  }

  @Get(':id')
  findOne(@Param('id') id: number,@Query() paginationDto?:OrderSeachDto) {
    return this.ordersService.findOne(id, paginationDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
