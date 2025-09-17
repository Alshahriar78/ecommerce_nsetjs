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
    private readonly productLabelRepository: Repository<ProductLabel>
  ) { }
  async create(createProductVariantDto: CreateProductVariantDto) {
    const product1 = await this.productrepository.findOneBy({id:createProductVariantDto.product_id.id})
    const data = this.productVarientRepository.create({
      price:createProductVariantDto.price,
      color:createProductVariantDto.color_id,
      product:createProductVariantDto.product_id,
      quantity:createProductVariantDto.stock,
      label:createProductVariantDto.label_id

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
    .where('pv.id = :id',{id:id})
    if(!data){
      return `Not Found in this Id ${id}`
    }
    return  await data.getRawOne();
  }

  async update(id: number, updateProductVariantDto: UpdateProductVariantDto) {
    const data = await this.productVarientRepository.findOneBy({ id: id })
    if (!data) {
      return `Not Found in this Id ${id}`
    }

    const updateData = this.productVarientRepository.merge(data, {
      price:updateProductVariantDto.price,
      quantity:updateProductVariantDto.stock,
      product:updateProductVariantDto.product_id,
      color:updateProductVariantDto.color_id,
      label:updateProductVariantDto.label_id
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
}
