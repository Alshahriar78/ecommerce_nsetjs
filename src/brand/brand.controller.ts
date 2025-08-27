import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { error } from 'console';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) { }

  @Post()
  async create(@Body() createBrandDto: CreateBrandDto) {
    return await this.brandService.create(createBrandDto);
  }

  @Public()
  @Get()
  async findAll() {
    return await this.brandService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return  await this.brandService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto) {
    try {
      const updatedData = await this.brandService.update(+id, updateBrandDto);
      return {
        success: true,
        message: `Update   Brand id ${id}- By Admin Successfully`,
        Get_Brand_Data: updatedData
      }
    } catch (error) {
      return {
        success: false,
        message: error.message,
      }
    }
    
  }

  @Delete(':id')
  remove(@Param('id') id: string, error) {
    try {
      const deleteBrandData = this.brandService.remove(+id);
      return {
        success: true,
        message: `DELETE   Brand id ${id}- By Admin Successfully`,
        Get_Brand_Data: deleteBrandData
      }
    } catch (error) {
      return {
        success: false,
        message: error.message,
      }
    }
    
  }
}
