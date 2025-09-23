import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductVariantDto } from './dto/create-product_variant.dto';
import { UpdateProductVariantDto } from './dto/update-product_variant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductVariant } from './entities/product_variant.entity';
import { Repository } from 'typeorm';
import { Product } from 'src/product/entities/product.entity';
import { error } from 'console';
import { ProductColor } from 'src/product_color/entities/product_color.entity';
import { ProductLabel } from 'src/product_label/entities/product_label.entity';
import { OrdersItem } from 'src/orders_item/entities/orders_item.entity';

@Injectable()
export class ProductVariantService {
  constructor(
    @InjectRepository(ProductVariant)
    private readonly productVarientRepository: Repository<ProductVariant>,
    @InjectRepository(Product)
    private readonly productrepository: Repository<Product>,
    @InjectRepository(ProductColor)
    private readonly productColorRepository: Repository<ProductColor>,
    @InjectRepository(ProductLabel)
    private readonly productLabelRepository: Repository<ProductLabel>,
    @InjectRepository(OrdersItem)
    private readonly orderItemsRepository: Repository<OrdersItem>
  ) { }
  async create(createProductVariantDto: CreateProductVariantDto) {
    const product1 = await this.productrepository
      .createQueryBuilder("p")
      .where("p.id = :id", { id: createProductVariantDto.product_id.id })
      .getOne();

    const data = this.productVarientRepository.create({
      price: createProductVariantDto.price,
      color: createProductVariantDto.color_id,
      product: createProductVariantDto.product_id,
      quantity: createProductVariantDto.stock,
      label: createProductVariantDto.label_id

    })
    console.log(data.product)
    return await this.productVarientRepository.save(data);

  }

  async findAll() {
    const data = await this.productVarientRepository.createQueryBuilder('pv')
      .getRawMany();
    if (!data) {
      return 'Something Error'
    }
    console.log(data)
    return data
  }

  async findOne(id: number) {
    const data = this.productVarientRepository.createQueryBuilder('pv')
      .where('pv.id = :id', { id: id })
    if (!data) {
      return `Not Found in this Id ${id}`
    }
    return await data.getRawOne();
  }

  async update(id: number, updateProductVariantDto: UpdateProductVariantDto) {
    const data = await this.productVarientRepository.findOneBy({ id: id })
    if (!data) {
      return `Not Found in this Id ${id}`
    }

    const updateData = this.productVarientRepository.merge(data, {
      price: updateProductVariantDto.price,
      quantity: updateProductVariantDto.stock,
      product: updateProductVariantDto.product_id,
      color: updateProductVariantDto.color_id,
      label: updateProductVariantDto.label_id
    });
    return await this.productVarientRepository.save(updateData);
  }

  async remove(id: number) {
    const data = await this.productVarientRepository.findOneBy({ id: id })
    if (!data) {
      return `Not Found in this Id ${id}`
    }
    return await this.productVarientRepository.remove(data);
  }

  async topFiveExpensiveProducts() {
    const topProducts = await this.productVarientRepository
      .createQueryBuilder("pv")
      .innerJoin("pv.product", "p")
      .leftJoin("pv.color", "pc")
      .leftJoin("pv.label", "pl")
      .select([
        "p.name AS ProductName",
        "pv.price AS Price",
        "pc.value AS Color",
        'pl.value AS Label'
      ])
      .orderBy("pv.price", "DESC")
      .getRawMany();
      const data = topProducts.slice(0,5)

    return data ;
  }

  async topSellingProducts() {

    const topProducts = await this.orderItemsRepository
      .createQueryBuilder("oi")
      .innerJoin("oi.stock", "pv")
      .innerJoin("pv.product", "p")
      .leftJoin("pv.color", "pc")
      .leftJoin("pv.label", "pl")
      .select([
        "p.name AS ProductName",
        "SUM(oi.quantity) AS TotalSold",
        "pv.price AS UnitPrice",
        "pc.value AS Color",
        "pl.value AS Label"
      ])
      .groupBy("p.name")
      .addGroupBy("pv.price")
      .addGroupBy("pc.value")
      .addGroupBy("pl.value")
      .orderBy("TotalSold", "DESC")
      .getRawMany();

    return topProducts;
  }

  async notSellingProducts() {
    const products = await this.productVarientRepository
      .createQueryBuilder("pv")
      .innerJoin("pv.product", "p")
      .leftJoin("pv.color", "pc")
      .leftJoin("pv.label", "pl")
      .select([
        "pv.id AS Id",
        "p.name AS ProductName",
        "pv.price AS Price",
        "pc.value AS Color",
        "pl.value AS Label",
      ])
      .where(qb => {
        const subQuery = qb.subQuery()
          .select("oi.stock_id")
          .from("orders_item", "oi")
          .getQuery();
        return "pv.id NOT IN " + subQuery;
      })
      .getRawMany();
    return products;
  }


  async highestReveneuFromProducts() {
    const revenueData = await this.orderItemsRepository
      .createQueryBuilder("oi")
      .innerJoin("oi.stock", "pv")
      .innerJoin("pv.product", "p")
      .leftJoin("pv.color", "pc")
      .leftJoin("pv.label", "pl")
      .select("p.name", "ProductName")
      .addSelect("SUM(oi.quantity * oi.price)", "Revenue")
      .addSelect("pc.value", "Color")
      .addSelect("pl.value", "Label")
      .groupBy("p.name")
      .addGroupBy("pc.value")
      .addGroupBy("pl.value")
      .orderBy("Revenue", "DESC")
      .getRawMany();

    return revenueData;
  }
}
