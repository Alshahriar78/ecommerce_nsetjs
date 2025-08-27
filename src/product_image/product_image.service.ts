import { Injectable } from '@nestjs/common';
import { CreateProductImageDto } from './dto/create-product_image.dto';
import { UpdateProductImageDto } from './dto/update-product_image.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductImage } from './entities/product_image.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductImageService {

  constructor(
    @InjectRepository(ProductImage)
    private readonly imageRepositoy : Repository<ProductImage>
  ){}


  async create(createProductImageDto: CreateProductImageDto) {
    const data = this.imageRepositoy.create(createProductImageDto)
    return await this.imageRepositoy.save(data) ;
  }

  async findAll() {
    return await this.imageRepositoy.find()
  }

  async findOne(id: number) {
    return await this.imageRepositoy.findOneBy({id});
  }

  async update(id: number, updateProductImageDto: UpdateProductImageDto) {
    const find : any = await this.findOne(id);
    const data = this.imageRepositoy.merge(find,updateProductImageDto)
    return await this.imageRepositoy.save(data)
  }

  async remove(id: number) {
     const find : any = await this.findOne(id);
     return await this.imageRepositoy.remove(find)
  }
}
