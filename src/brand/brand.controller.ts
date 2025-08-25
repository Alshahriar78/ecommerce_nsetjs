import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { error } from 'console';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) { }

  @Post()
  async create(@Body() createBrandDto: CreateBrandDto) {
    try {
      const createBrandData = await this.brandService.create(createBrandDto);
      return {

        success: true,
        message: `Brand Created By Admin Successfully`,
        Create_Brand_Data: createBrandData

      }
    } catch (error) {
      return {
        success: false,
        message: error.message,
      }
    }

  }

  @Get()
  async findAll() {
    try {
      const getAllBrandData = await this.brandService.findAll();
      return {

        success: true,
        message: `Get All Brand  By Admin Successfully`,
        Get_All_Brand_Data: getAllBrandData

      }
    } catch (error) {
      return {
        success: false,
        message: error.message,
      }
    }

  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const getBrnadById = await this.brandService.findOne(+id);
      return {
        success: true,
        message: `Get  Brand id ${id}- By Admin Successfully`,
        Get_Brand_Data: getBrnadById

      }
    } catch (error) {
      return {
        success: false,
        message: error.message,
      }
    }

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
