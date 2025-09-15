import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { ChildEntity, Repository } from 'typeorm';
import { Users } from 'src/users/entities/users.entities';
import { Product } from 'src/product/entities/product.entity';
import { OrdersItem } from 'src/orders_item/entities/orders_item.entity';
import { OrderSeachDto } from './dto/oder-seach.dto';
import { ProductColor } from 'src/product_color/entities/product_color.entity';
import { ProductLabel } from 'src/product_label/entities/product_label.entity';
import { ProductVariant } from 'src/product_variant/entities/product_variant.entity';

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
    private readonly orderItemRepository: Repository<OrdersItem>,
    @InjectRepository(ProductColor)
    private readonly colorRepository: Repository<ProductColor>,
    @InjectRepository(ProductLabel)
    private readonly labelRepository: Repository<ProductLabel>,
    @InjectRepository(ProductVariant)
    private readonly stockProduct : Repository<ProductVariant>
  ) { }
  async create(createOrderDto: CreateOrderDto) {
    // checking Product Stcok 
    for(let i=0; i< createOrderDto.items.length;i++){
       const product = await this.stockProduct.findOneByOrFail({ id: createOrderDto.items[i].product_varient_id })
       
       if(product.stock<createOrderDto.items[i].quantity){
        return `Product Stock Available ${product.stock}` ;
       }
    }    
    const user = await this.usersRepository.findOneByOrFail({ id: createOrderDto.userId })
    const order = this.orderRepository.create({
      userName: createOrderDto.userName,
      phone: createOrderDto.phone,
      note: createOrderDto.note,
      district: createOrderDto.district,
      status: "Pending",
      user: user,
      total_price: 0
    })
    const ordersaving = await this.orderRepository.save(order)
    let price = 0;
    for (let i = 0; i < createOrderDto.items.length; i++) {
      const product = await this.productRepository.findOneByOrFail({ id: createOrderDto.items[i].product_varient_id })
      // price += (product.price * createOrderDto.items[i].quantity);
      const orderItem = this.orderItemRepository.create({
        name: product.name,
        quantity: createOrderDto.items[i].quantity,
        // price: product.price * createOrderDto.items[i].quantity,
        product: product,
        order: order,
        // color: productColor,
        label: ProductLabel
      })
      await this.orderItemRepository.save(orderItem)
      // update quantity after order placed
      //  product.quantity -= createOrderDto.items[i].quantity;
       await this.productRepository.save(product);
    }
    const newOrder = this.orderRepository.create({
      total_price: price,
    })
    const searchOrder = await this.orderRepository.findOneByOrFail({ id: ordersaving.id })
    const data = this.orderRepository.merge(searchOrder, newOrder);
    const finalData = this.orderRepository.save(data)

    return finalData;
  }


  async findAll(paginationDto?: OrderSeachDto) {
    let userId = Number(paginationDto?.userId);
    let status: string | undefined = paginationDto?.status
    const data = this.orderRepository
      .createQueryBuilder('order')
      .leftJoin('order.user', 'user')
      .leftJoin('order.oreder_items', 'order_items')
      .leftJoin(`order_items.color`, 'color')
      .leftJoin(`order_items.label`, 'label')
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
        `color.value as ProductColor`,
        `label.value as ProductLabel`
      ])

    if (userId) {
      data.where("order.userId = :userId", { userId: `${userId}` })
    }
    if (status) {
      data.andWhere("order.status LIKE :status", { status: `%${status}%` })
    }
    const rows = await data.getRawMany();

    const groupedOrders: any[] = [];
    const map = new Map();
    for (const row of rows) {
      if (!map.has(row.OrderId)) {
        map.set(row.OrderId, {
          OrderId: row.OrderId,
          Name: row.Name,
          Phone: row.Phone,
          Price: row.Price,
          DeliveryStatus: row.DeliveryStatus,
          OrderPlacedTime: row.OrderPlacedTime,
          OrderEmail: row.OrderEmail,
          order_items: [],
        });
        groupedOrders.push(map.get(row.OrderId));
      }
      map.get(row.OrderId).order_items.push({
        ProductName: row.ProductName,
        Quantity: row.Quantity,
        ProductIndivitualPrice: row.ProductIndivitualPrice,
        Product_color: row.ProductColor,
        product_label: row.ProductLabel
      });
    }
    return groupedOrders;
  }


  async findOne(id: number, paginationDto?: OrderSeachDto) {
    let status: string | undefined = paginationDto?.status;
    const data = this.orderRepository
      .createQueryBuilder('order')
      .leftJoin('order.user', 'user')
      .leftJoin('order.oreder_items', 'order_items')
      .leftJoin(`order_items.color`, 'color')
      .leftJoin(`order_items.label`, 'label')
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
        `color.value as ProductColor`,
        `label.value as ProductLabel`
      ]).where("order.id = :id", { id: `${id}` })
    if (status) {
      data.andWhere("order.status LIKE :status", { status: `%${status}%` })
    }
    const rows = await data.getRawMany();
    console.log(rows)
    if (!rows || rows.length === 0) {
      return null;
    }
    const order = {
      OrderId: rows[0].OrderId,
      Name: rows[0].Name,
      Phone: rows[0].Phone,
      Price: rows[0].Price,
      DeliveryStatus: rows[0].DeliveryStatus,
      OrderPlacedTime: rows[0].OrderPlacedTime,
      OrderEmail: rows[0].OrderEmail,
      order_items: rows.map(r => ({
        ProductName: r.ProductName,
        Quantity: r.Quantity,
        ProductIndivitualPrice: r.ProductIndivitualPrice,
        Product_color: r.ProductColor,
        product_label: r.ProductLabel
      })),
    };

    return order;



  }
  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const find: any = await this.findOne(id);
    const data = this.orderRepository.merge(find, updateOrderDto)
    return await this.orderRepository.save(data)
  }

  async remove(id: number) {
    const order = await this.orderRepository.findOne({
      where: { id: id },
      // relations: ['oreder_items'], 
    });

    if (!order) throw new NotFoundException('Order not found');

    await this.orderRepository.remove(order);
    return { message: 'Order deleted successfully' };
  }
}
