import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { ChildEntity, Repository } from 'typeorm';
import { Users } from 'src/users/entities/users.entities';
import { Product } from 'src/product/entities/product.entity';
import { OrdersItem } from 'src/orders_item/entities/orders_item.entity';

@Injectable()
export class OrdersService {

  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(OrdersItem)
    private readonly orderItemRepository: Repository<OrdersItem>
  ) { }
  async create(createOrderDto: CreateOrderDto) {
    const user = await this.usersRepository.findOneByOrFail({ id: createOrderDto.userId })
    console.log(user)
    const order = this.orderRepository.create({
      userName: createOrderDto.userName,
      phone: createOrderDto.phone,
      note: createOrderDto.note,
      address: createOrderDto.shipingAddress,
      status: "Pending",
      user: user,
      total_price: 0
    })
    const ordersaving = await this.orderRepository.save(order)
    console.log("User Find From order dto", user)
    let price = 0;
    for (let i = 0; i < createOrderDto.items.length; i++) {
      const product = await this.productRepository.findOneByOrFail({ id: createOrderDto.items[i].productId })
      price += (product.price * createOrderDto.items[i].quantity);
      const orderItem = this.orderItemRepository.create({
        name: product.name,
        quantity: createOrderDto.items[i].quantity,
        price: product.price * createOrderDto.items[i].quantity,
        product: product,
        order: order
      })
      await this.orderItemRepository.save(orderItem)
    }
    const newOrder = this.orderRepository.create({
      total_price: price,
    })
    console.log(ordersaving.id, 'Update Object', newOrder)
    const data = await this.update(ordersaving.id, newOrder);
    return data;
  }


  async findAll() {
   
    const data = await this.orderRepository
    .createQueryBuilder('order')
      .leftJoin('order.user', 'user') 
      .leftJoin('order.oreder_items', 'order_items') 
      .select([
        `order.id as OrderId`,
        'order.userName as Name',
         `order.phone as Phone`,
         `order.total_price as Price`,
         `order.status as DeliveryStatus`,
         `user.created_at as OrderPlacedTime`,
         `user.email as OrderEmail`,
         `order_items.name as ProductName`,
          `order_items.quantity as Quantity`,
          `order_items.price as ProductIndivitualPrice`,     
      ])
      .getRawMany();

    return data;
  }

  async findOne(id: number) {
    return await this.orderRepository.findOneBy({ id });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const find: any = await this.findOne(id);
    const data = this.orderRepository.merge(find, updateOrderDto)
    return await this.orderRepository.save(data)
  }

  async remove(id: number) {
    const find: any = await this.findOne(id);
    return await this.orderRepository.remove(find)
  }
}
