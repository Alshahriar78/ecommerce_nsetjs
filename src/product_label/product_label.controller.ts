import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, UseFilters, UseInterceptors } from '@nestjs/common';
import { ProductLabelService } from './product_label.service';
import { CreateProductLabelDto } from './dto/create-product_label.dto';
import { UpdateProductLabelDto } from './dto/update-product_label.dto';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { ResponseInterceptor } from 'src/common/interceptors/response.interceptor';



@Controller('product-label')
export class ProductLabelController {
  constructor(private readonly productLabelService: ProductLabelService) { }

  @Post()
  async create(@Body() createProductLabelDto: CreateProductLabelDto) {
    return await this.productLabelService.create(createProductLabelDto);
  }

  @Get()
  async findAll() {
    return await this.productLabelService.findAll();
  }


  @Get(':id')
  async findOne(@Param('id') id: string) {
   return await this.productLabelService.findOne(+id)
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductLabelDto: UpdateProductLabelDto) {
    return this.productLabelService.update(+id, updateProductLabelDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.productLabelService.remove(+id);
  }
}
