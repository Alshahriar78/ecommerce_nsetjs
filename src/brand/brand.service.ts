import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from './entities/brand.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BrandService {

  constructor(
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>
  ) { }

  async create(createBrandDto: CreateBrandDto) {
    const category = this.brandRepository.createQueryBuilder('b').where('b.name = :name', { name: createBrandDto.name })
    const data = await category.getOne();
    if (data) {
      throw new NotFoundException(`${createBrandDto.name} Category already exists`);
    }
    const createBrandData = this.brandRepository.create(createBrandDto);
    return await this.brandRepository.save(createBrandData)
  }

  async findAll() {
    return await this.brandRepository.find();
  }

  async findOne(id: number) {
    return await this.brandRepository.findOneBy({ id });
  }

  async update(id: number, updateBrandDto: UpdateBrandDto) {
    const findUser: any = await this.findOne(id)
    if (!findUser) {
      throw new NotFoundException(`Brand with id ${id} not found`);
    }
    const updateUser = this.brandRepository.merge(findUser, updateBrandDto)
    return await this.brandRepository.save(updateUser)
  }

  async remove(id: number) {
     const findUser: any = await this.findOne(id)
    if (!findUser) {
      throw new NotFoundException(`Brand with id ${id} not found`);
    }
    return await this.brandRepository.remove(findUser) ;
  }
}
