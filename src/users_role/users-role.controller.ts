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
        const data = await this.usersRoleService.gettAllUsersRole();
        return data;
    }

    @Post()
    async createUserRole(@Body() createUsersRoleDto: CreateUsersRoleDto, @Res({ passthrough: true }) res: Response) {
        const data = await this.usersRoleService.createUsersRole(createUsersRoleDto)
        return data;
    }


    @Get(':id')
    async findById(@Param('id') id: number, @Res({ passthrough: true }) res: Response) {
        let roleId :number = Number(id)
        const getUserRoleData = await this.usersRoleService.findById(roleId);
        return getUserRoleData
    }


    @Patch(':id')
    async updateUserRoleById(@Param('id') id: number,
        @Body() updateUsersRoleDto: UpdateUsersRoleDto) {
        const updatedData = await this.usersRoleService.updateUsersRoleById(id, updateUsersRoleDto)
        return updatedData;
    }



    @Delete(':id')
    async removeProduct(@Param('id') id: number) {
        const data = await this.usersRoleService.removeUserRole(id);
        return data
    }
}