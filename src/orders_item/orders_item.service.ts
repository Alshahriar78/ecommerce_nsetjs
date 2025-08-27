import { Injectable } from '@nestjs/common';
import { CreateOrdersItemDto } from './dto/create-orders_item.dto';
import { UpdateOrdersItemDto } from './dto/update-orders_item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrdersItem } from './entities/orders_item.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersItemService {

  constructor(
    @InjectRepository(OrdersItem)
    private readonly orderIremRepository: Repository<OrdersItem>
  ){}

  async create(createOrdersItemDto: CreateOrdersItemDto) {
    const data  = this.orderIremRepository.create(createOrdersItemDto)
    return await this.orderIremRepository.save(data) ;
  }

  async findAll() {
    return await this.orderIremRepository.find();
  }

  async findOne(id: number) {
    return await this.orderIremRepository.findOneBy({id});
  }

  async update(id: number, updateOrdersItemDto: UpdateOrdersItemDto) {
    const find:any = this.findOne(id);
    const data = this.orderIremRepository.merge(find,updateOrdersItemDto)
    return await this.orderIremRepository.save(data) ;
  }

  async remove(id: number) {
     const find:any = await this.findOne(id);
     return await this.orderIremRepository.remove(find) ;
  }
}
