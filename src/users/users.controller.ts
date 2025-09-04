import { Body, Controller, Get, Post, Res, HttpStatus, Param, HttpException, Patch, Delete, Query, UseGuards } from "@nestjs/common";
import { CreateUsersDto } from "./dto/create-users.dto";
import { UsersService } from "./users.service";
import type { Response } from "express";
import { UpdateUsersDto } from "./dto/update-users.dto";
import { UserSearchDto } from "./dto/search-users.dto";
import { AuthGuard } from "src/auth/auth.guard";
import { RolesGuard } from "src/auth/roles.guard";

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) { }


    @Post()
    async createUser(@Body() createUsersDto: CreateUsersDto, @Res({ passthrough: true }) res: Response) {

        return await this.usersService.createUsers(createUsersDto)
    }

    @UseGuards(AuthGuard,RolesGuard)
    @Get()
    async getAllUser(@Query() userSeachDto?: UserSearchDto) {
        return await this.usersService
            .getAllUsers(
                userSeachDto?.name,
                userSeachDto?.phone
            );
    }

    
    @Get(':id')
    async getUserById(@Param('id') id: number) {
        return await this.usersService.getUsersById(id)
    }

    @Patch(':id')
    async updateUserById(@Param('id') id: number, @Body() updateUsersDto: UpdateUsersDto) {
        const updateUserData = await this.usersService.updateUsersById(id, updateUsersDto)
    }

    @Delete(':id')
    async deleteUserById(@Param('id') id: number) {
        const deleteUserData = await this.usersService.deleteUsersById(+id)
        return deleteUserData;
    }
}