import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { DataSource, Repository } from 'typeorm';


@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly dataSource: DataSource
  ) { }

  async create(createProductDto: CreateProductDto) {

    const data = this.productRepository.create(createProductDto);
    return this.productRepository.save(data);
  }

  async findAll(name?: string, limit?: number, skip?: number, brand?: string) {
    skip = Number(skip) || 0;
    limit = Number(limit) || 10;
    const result = this.productRepository
      .createQueryBuilder("product")
      .leftJoin("product.brand", "b")
      .leftJoin("product.category", "c")
      .leftJoin("product.colors", "pc")
      .leftJoin("product.labels", "pl")
      .select([
        "product.quantity AS Quantity",
        "product.name AS ProductName",
        "product.price AS ProductPrice",
        "b.name AS BrandName",
        "c.name AS CategoryName",
        "pc.value AS AvailableColor",
        "pc.hex_value AS ColorHexValue",
        "pl.value AS LabelValue",
      ])
      .limit(limit)
      .offset(skip)
      .printSql()

    if (name) {
      result.where("product.name LIKE :name", { name: `%${name}%` })
    }
    if (brand) {
      result.andWhere("b.name LIKE :brand", { brand: `%${brand}%` })
    }
    return result.getRawMany();
  }



  async findOne(id: number) {
    const results =
      await this.productRepository
        .createQueryBuilder("p")
        .leftJoin('p.brand', 'b')
        .leftJoin('p.category', 'c')
        .leftJoin("p.colors", "pc")
        .leftJoin("p.labels", "pl")
        .leftJoin("p.orders_items", "orders")
        .select([
          "p.id",
          "p.quantity AS Quantity",
          "p.name AS ProductName",
          "p.price AS ProductPrice",
          "b.name AS brandName",
          "c.name AS categoryName",
          "pc.value AS colorValue",
          "pc.hex_value AS ColorHexValue",
          "pl.value AS labelValue",
          "orders.name AS orderItemName"
        ])
        .where("p.id = :id", { id: id }).getRawOne()
    return results;
  }



  async update(id: number, updateProductDto: UpdateProductDto) {
    const find: any = await this.findOne(id);
    const data = this.productRepository.merge(find, updateProductDto)
    return this.productRepository.save(data)
  }

  async remove(id: number) {
    const find: any = await this.findOne(id);
    return this.productRepository.remove(find);
  }
}
