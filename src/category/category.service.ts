import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { EntityNotFoundError, Repository } from 'typeorm';

@Injectable()
export class CategoryService {

  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ) { }

  async create(createCategoryDto: CreateCategoryDto) {
    const category = this.categoryRepository.createQueryBuilder('c').where('c.name = :name', { name: createCategoryDto.name })
    const data = await category.getOne();
    if (data) {
      throw new NotFoundException(`${createCategoryDto.name} Category already exists`);
    }
    const createData = this.categoryRepository.create(createCategoryDto)
    return this.categoryRepository.save(createData);
  }

  async findAll() {
    return await this.categoryRepository.find();
  }

  async findOne(id: number) {
    return await this.categoryRepository.findOneBy({ id })
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const find: any = await this.findOne(id);
    const updateData = await this.categoryRepository.merge(find, updateCategoryDto)
    return await this.categoryRepository.save(updateData);
  }

  async remove(id: number) {
    const find: any = await this.findOne(id);
    return await this.categoryRepository.remove(find);
  }
}
