import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Public } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { ProductSeachDto } from './dto/product-search.dto';
@UseGuards(AuthGuard,RolesGuard)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Roles('ADMIN','CUSTOMER')
  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productService.create(createProductDto);
  }

  @Public()
  @Get()
  async findAll(@Query() productSeachDto?: ProductSeachDto) {
      return await this.productService.findAll(
        productSeachDto?.name,
        productSeachDto?.limit,
        productSeachDto?.skip,
        productSeachDto?.brand );
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.productService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    try {
      const data = this.productService.update(+id, updateProductDto);
      return {
        success: true,
        message: `Get All Product  By Admin Successfully`,
        Create_User_Data: data
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      }
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const data = this.productService.remove(+id);
      return {
        success: true,
        message: `Get All Product  By Admin Successfully`,
        Create_User_Data: data
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      }
    }
  }

}
