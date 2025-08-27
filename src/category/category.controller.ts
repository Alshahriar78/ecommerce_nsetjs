import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {

     try {
      const createBrandData = await this.categoryService.create(createCategoryDto);
      return {

        success: true,
        message: `Category Created By Admin Successfully`,
        Create_Brand_Data: createBrandData

      }
    } catch (error) {
      return {
        success: false,
        message: error.message,
      }
    }
  }

  @Public()
  @Get()
  async findAll() {
   return await this.categoryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const data= await this.categoryService.findOne(+id);
      if(data=== null){
        return{
          message: `Get Category id ${id}  Not Found`,
        }
      }
      return {
        success: true,
        message: `Get Category id ${id} By Admin Successfully`,
        Get_Category_Data_By_Id:data

      }
    } catch (error) {
      return {
        success: false,
        message: error.message,
      }
    }
    
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    try {
      const data = this.categoryService.update(+id, updateCategoryDto);
      if(data=== null){
        return{
          message: `Get Category id ${id}  Not Found`,
        }
      }
      return {
        success: true,
        message: `Get Category id ${id} By Admin Successfully`,
        Get_Category_Data_By_Id:data

      }
    } catch (error) {
      return {
        success: false,
        message: error.message,
      }
    }
    
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      const data = this.categoryService.remove(+id);
    if(data=== null){
        return{
          message: `Get Category id ${id}  Not Found`,
        }
      }
      return {
        success: true,
        message: `Get Category id ${id} By Admin Successfully`,
        Get_Category_Data_By_Id:data

      }
    } catch (error) {
      return {
        success: false,
        message: error.message,
      }
    }
    
  }
}
