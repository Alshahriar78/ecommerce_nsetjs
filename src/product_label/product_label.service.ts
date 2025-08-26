import { Injectable } from '@nestjs/common';
import { CreateProductLabelDto } from './dto/create-product_label.dto';
import { UpdateProductLabelDto } from './dto/update-product_label.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductLabel } from './entities/product_label.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductLabelService {

  constructor(
    @InjectRepository(ProductLabel)
    private readonly productLabelRepository: Repository<ProductLabel>
  ) { }


  async create(createProductLabelDto: CreateProductLabelDto) {
    const data = this.productLabelRepository.create(createProductLabelDto)
    return await this.productLabelRepository.save(data);
  }

  async findAll() {
    return await this.productLabelRepository.find();
  }

  async findOne(id: number) {
    return await this.productLabelRepository.findOneBy({ id });
  }

  async update(id: number, updateProductLabelDto: UpdateProductLabelDto) {
    const find: any = await this.findOne(id);
    const data = this.productLabelRepository.merge(find, updateProductLabelDto)
    return await this.productLabelRepository.save(data);
  }

  async remove(id: number) {
    const find: any = await this.findOne(id);
    return await this.productLabelRepository.remove(find);
  }
}
