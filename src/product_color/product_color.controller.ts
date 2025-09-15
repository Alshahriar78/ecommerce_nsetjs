import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters, UseGuards } from '@nestjs/common';
import { ProductColorService } from './product_color.service';
import { CreateProductColorDto } from './dto/create-product_color.dto';
import { UpdateProductColorDto } from './dto/update-product_color.dto';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@UseFilters(HttpExceptionFilter)
@Controller('product-color')
export class ProductColorController {
  constructor(private readonly productColorService: ProductColorService) {}

  @UseGuards(AuthGuard,RolesGuard)
  @Roles("ADMIN")
  @Post()
  async create(@Body() createProductColorDto: CreateProductColorDto) {
    return this.productColorService.create(createProductColorDto);
  }

  @Get()
  async findAll() {
    return this.productColorService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.productColorService.findOne(+id)
    // console.log(data)
    // if(data== null) throw new Error(`Color not found with this ${id}`);
    return await this.productColorService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductColorDto: UpdateProductColorDto) {
    return this.productColorService.update(+id, updateProductColorDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.productColorService.remove(+id);
  }
}
