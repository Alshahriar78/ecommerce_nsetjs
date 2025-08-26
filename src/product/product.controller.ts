import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    try {
      const data = await this.productService.create(createProductDto);
      return {
        success: true,
        message: `Product creted By Admin Successfully`,
        Create_User_Data: data
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      }
    }

  }

  @Get()
  async findAll() {
      return await this.productService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {

    try {
      const data =  this.productService.findOne(+id);
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
