import { Injectable, UseGuards } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { DataSource, Repository } from 'typeorm';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ProductVariant } from 'src/product_variant/entities/product_variant.entity';


@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) { }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('ADMIN')
  async create(createProductDto: CreateProductDto) {
    const data = this.productRepository.create(createProductDto);
    return this.productRepository.save(data);
  }

async findAll(name?: string, limit?: number, skip?: number, brand?: string) {
  limit = Number(limit) || 10;
  skip = Number(skip) || 0;

  let query = this.productRepository
    .createQueryBuilder("product")
    .innerJoin('product.variants', 'pv')
    .leftJoin('pv.label', 'pl')
    .leftJoin('pv.color', 'pc')
    .leftJoin('product.brand', 'b')
    .leftJoin('product.category', 'c')
    // .leftJoin('product.images', 'img')
    .select([
      'pv.id as ID',
      'product.id as ProductId',
      'pv.quantity AS Quantity',
      'product.name AS ProductName',
      'pv.price AS ProductPrice',
      'pc.value as Color',
      // 'img.path as ImageURL',
      'pc.hex_value as HexColorCode',
      'pl.value as Label',
      'b.name as Brand',
      'c.name as Category'
    ])
    .orderBy('product.id', 'ASC'); 

  if (name) {
    query = query.where('product.name LIKE :name', { name: `%${name}%` });
  }
  if (brand) {
    query = query.andWhere('b.name LIKE :brand', { brand: `%${brand}%` });
  }

  const allResults = await query.getRawMany();
  const paginatedResults = allResults.slice(skip, skip + limit);

  return paginatedResults;
}



  async findOne(id: number) {
    const results =
      await this.productRepository
        .createQueryBuilder("p")
        .innerJoin('p.variants', 'pv')
        .leftJoin('p.brand', 'b')
        .leftJoin('p.category', 'c')
        .leftJoin("pv.color", "pc")
        .leftJoin("pv.label", "pl")


        .select([
          "pv.id as Id",
          `p.id as ProductId`,
          "pv.quantity as AvailableQuantity",
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
   const product = await this.productRepository
  .createQueryBuilder("p")
  .where("p.id = :id", { id })
  .getOne();
   return  product
  }



  async update(id: number, updateProductDto: UpdateProductDto) {
    const find: any = await this.productRepository.findOneByOrFail({ id })
    if (!find) {
      return `Product Not Found`
    }
    const data = this.productRepository.merge(find, updateProductDto)
    return this.productRepository.save(data)
  }

  async remove(id: number) {
    const find: any = await this.productRepository.findOneByOrFail({ id })
    console.log(find)
    if (!find) {
      return `Product Not Found`
    }
    return this.productRepository.remove(find);
  }
}
