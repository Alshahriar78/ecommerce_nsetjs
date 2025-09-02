import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res } from "@nestjs/common";
import { CreateUsersRoleDto } from "./dto/create-users-role.dto";
import { UsersRoleService } from "./users-role.service";
import type { Response } from "express";
import { UpdateUsersRoleDto } from "./dto/update-users-role.dto";


@Controller('users-role')
export class UsersRoleController {

    constructor(private readonly usersRoleService: UsersRoleService) { }

    @Get()
    async getAllUserRole() {
        try {
            const data =  await this.usersRoleService.gettAllUsersRole();
            return{
                success: true,
                message: `Get All User Role   Successfully`,
                Get_All_UsersRole: data
            };
        } catch (error) {
             return {
                success: false,
                message: error.message,
            };
        }
        
    }

    @Post()
    async createUserRole(@Body() createUsersRoleDto: CreateUsersRoleDto, @Res({ passthrough: true }) res: Response) {
        try {
            const data = await this.usersRoleService.createUsersRole(createUsersRoleDto)
            res.status(HttpStatus.CREATED)
            return{
                success: true,
                message: `User Role Created  Successfully`,
                Create_UserRole: data
            };
        } catch (error) {
            return {
                success: false,
                message: error.message,
            };
        }
    }


    @Get(':id')
    async findById(@Param('id') id: number, @Res({ passthrough: true }) res: Response) {

        try {
            res.status(HttpStatus.OK);
            const getUserRoleData = await this.usersRoleService.findById(id);

            return {
                success: true,
                message: `User Role Get By ${id}   Successfully`,
                Get_DATA: getUserRoleData
            };
        } catch (error) {

            return {
                success: false,
                message: error.message,
            };
        }
    }


    @Patch(':id')
    async updateUserRoleById(@Param('id') id: number,
        @Body() updateUsersRoleDto: UpdateUsersRoleDto) {

        try {
            const updatedData = await this.usersRoleService.updateUsersRoleById(id, updateUsersRoleDto)
            return {
                success: true,
                message: 'User Role Updated Successfully',
                Updated_DATA: updatedData
            };
        } catch (error) {

            return {
                success: false,
                message: error.message,
            };
        }
    }



    @Delete(':id')
    async removeProduct(@Param('id') id: number) {
        try {
           const data = await this.usersRoleService.removeUserRole(id);
            return {
                success: true,
                message: `User Role Deleted Successfully`,
                Delete_UserRole:data
            }
        } catch (error) {
            return {
                success: false,
                message: error.message,
            };
        }
    }
}