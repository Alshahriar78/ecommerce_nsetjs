import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {

  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>
  ){}


  async create(createOrderDto: CreateOrderDto) {
    const data =  this.orderRepository.create(createOrderDto)
    return await this.orderRepository.save(data);
  }

  async findAll() {
    return await this.orderRepository.find();
  }

  async findOne(id: number) {
    return await this.orderRepository.findOneBy({id});
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const find:any =  await this.findOne(id);
    const data = this.orderRepository.merge(find,updateOrderDto)
  }

  async remove(id: number) {
    const find:any =  await this.findOne(id);
    return await this.orderRepository.remove(find)
  }
}
