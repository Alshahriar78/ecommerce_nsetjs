import { Injectable, UseGuards } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { DataSource, Repository } from 'typeorm';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';


@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly dataSource: DataSource
  ) { }

  @UseGuards(AuthGuard,RolesGuard)
  @Roles('ADMIN')
  async create(createProductDto: CreateProductDto) {
    const data = this.productRepository.create(createProductDto);
    return this.productRepository.save(data);
  }

  async findAll(name?: string, limit?: number, skip?: number, brand?: string) {
    skip = Number(skip) || 0;
    limit = Number(limit) || 10;
    const result = this.productRepository
      .createQueryBuilder("product")
      .innerJoin('product.variants','pv')
      .leftJoin('pv.label','pl')
      .leftJoin('pv.color','pc')
      .leftJoin('product.brand','b')
      .leftJoin('product.category','c')
      .select([
        'product.id as ID',
        "pv.stock AS Quantity",
        "product.name AS ProductName",
        "pv.price AS ProductPrice",
        "pc.value as Color",
        "pc.hex_value as HexColorCode",
        "pl.value as Label",
        "b.name  as Brand",
        'c.name as Category'
        
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
        .innerJoin('p.variants','pv')
        .leftJoin('p.brand', 'b')
        .leftJoin('p.category', 'c')
        .leftJoin("pv.color", "pc")
        .leftJoin("pv.label", "pl")
        
        .select([
          "p.id as Id",
          "pv.stock as AvailableQuantity",
          "pv.price as Price",
          "p.name AS ProductName",

          "b.name AS brandName",
          "c.name AS categoryName",
          "pc.value AS colorValue",
          "pc.hex_value AS ColorHexValue",
          "pl.value AS labelValue",
        ])
        .where("p.id = :id", { id: id }).getRawMany()
    return results;
  }


  async findProduct(id: number) {
    return await this.productRepository.findOneBy({ id: id })
  }



  async update(id: number, updateProductDto: UpdateProductDto) {
    const find: any = await this.productRepository.findOneByOrFail({id})
    if(!find){
      return `Product Not Found`
    }
    const data = this.productRepository.merge(find, updateProductDto)
    return this.productRepository.save(data)
  }

  async remove(id: number) {
    const find: any = await this.productRepository.findOneByOrFail({id})
    console.log(find)
    if(!find){
      return `Product Not Found`
    }
    return this.productRepository.remove(find);
  }
}
