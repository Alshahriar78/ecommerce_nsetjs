import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) { }

  async create(createProductDto: CreateProductDto) {
    
    const data =  this.productRepository.create(createProductDto);
    return this.productRepository.save(data);
  }

  async findAll() {
    return await this.productRepository.find() ;
  }

  async findOne(id: number) {
    return await this.productRepository.findOneBy({id});
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const find:any = await this.findOne(id);
    const data =  this.productRepository.merge(find,updateProductDto)
    return this.productRepository.save(data)
  }

  async remove(id: number) {
      const find:any = await this.findOne(id);
    return this.productRepository.remove(find);
  }
}
