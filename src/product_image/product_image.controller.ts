import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { ProductImageService } from './product_image.service';
import { CreateProductImageDto } from './dto/create-product_image.dto';
import { UpdateProductImageDto } from './dto/update-product_image.dto';
import { diskStorage } from 'multer'
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { CreateProductColorDto } from 'src/product_color/dto/create-product_color.dto';
import { ProductService } from 'src/product/product.service';
import { Product } from 'src/product/entities/product.entity';

@Controller('files')
export class ProductImageController {
  constructor(
    private readonly productImageService: ProductImageService,
    private readonly productService: ProductService
  ) { }

  @Post('upload/:productId')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const random = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
        return cb(null, `${random}${extname(file.originalname)}`)
      },
    }),
  }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Param('productId') productId: number) {
    const product = await this.productService.findProduct(productId);
    console.log(product)
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    const filePath = `/uploads/${file.filename}`;

    const createProductImageDto: CreateProductImageDto = {
      filename: file.filename,
      path: filePath,
      product: product
    };
    const savedFile = await this.productImageService.create(createProductImageDto)
    return {
      message: "File Uploaded Succesfully",
      data: savedFile
    }
  }

  @Get()
  findAll() {
    return this.productImageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productImageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductImageDto: UpdateProductImageDto) {
    return this.productImageService.update(+id, updateProductImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productImageService.remove(+id);
  }
}
