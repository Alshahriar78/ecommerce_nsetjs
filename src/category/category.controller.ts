import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Public } from 'src/auth/decorators/public.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { retry } from 'rxjs';

@Controller('category')
@UseGuards(AuthGuard, RolesGuard)
@Roles("Admin")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }


  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    const createBrandData = await this.categoryService.create(createCategoryDto);
    return createBrandData;
  }

  @Get()
  async findAll() {
    return await this.categoryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.categoryService.findOne(+id);
    if (!data) {
      return ` Category not found By this id ${id}`
    }
    return data;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    const data = this.categoryService.update(+id, updateCategoryDto);
    if (data === null) {
      return {
        message: ` Category Not Found By This id ${id}  `,
      }
    }
    return data;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {

    const data = this.categoryService.remove(+id);
    if (data === null) {
      return {
        message: `Get Category id ${id}  Not Found`,
      }
    }
    return data;
  }
}
