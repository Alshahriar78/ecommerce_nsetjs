import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductVariantService } from './product_variant.service';
import { CreateProductVariantDto } from './dto/create-product_variant.dto';
import { UpdateProductVariantDto } from './dto/update-product_variant.dto';

@Controller('product-details')
export class ProductVariantController {
  constructor(private readonly productVariantService: ProductVariantService) { }

  @Post()
  create(@Body() createProductVariantDto: CreateProductVariantDto) {
    return this.productVariantService.create(createProductVariantDto);
  }

  @Get()
  findAll() {
    return this.productVariantService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productVariantService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductVariantDto: UpdateProductVariantDto) {
    return this.productVariantService.update(+id, updateProductVariantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productVariantService.remove(+id);
  }

  @Get('top-five/most-expensive-product')
  async topFiveExpensiveProduct() {
    const data = await this.productVariantService.topFiveExpensiveProducts();
    return data;
  }

  @Get('top/selling-product')
  async topSellingProduct() {
    const data = await this.productVariantService.topSellingProducts();
    return data;
  }

  @Get('not/selling-product')
  async notSellingProduct() {
    const data = await this.productVariantService.notSellingProducts()
    return data;

  }

  @Get('top/revenue-from-product')
  async topReveneuFromProduct(){
    const data = await this.productVariantService.highestReveneuFromProducts()
    return data;
  }

}
