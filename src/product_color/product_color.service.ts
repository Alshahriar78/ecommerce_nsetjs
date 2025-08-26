import { Injectable } from '@nestjs/common';
import { CreateProductColorDto } from './dto/create-product_color.dto';
import { UpdateProductColorDto } from './dto/update-product_color.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductColor } from './entities/product_color.entity';
import { Repository } from 'typeorm';


@Injectable()

export class ProductColorService {

  constructor(
    @InjectRepository(ProductColor)
    private readonly colorRepository : Repository<ProductColor>
  ){}


  async create(createProductColorDto: CreateProductColorDto) {
    const data = this.colorRepository.create(createProductColorDto)
    return await this.colorRepository.save(data);
  }

  async findAll() {
    return await this.colorRepository.find();
  }

  async findOne(id: number) {
    return await this.colorRepository.findOneBy({id});
  }

  async update(id: number, updateProductColorDto: UpdateProductColorDto) {
    const find:any  = await this.findOne(id);
    const data = this.colorRepository.merge(find,updateProductColorDto);
    return await this.colorRepository.save(data)
  }

  async remove(id: number) {
    const find:any  = await this.findOne(id);
    return await this.colorRepository.remove(find);
  }
}
