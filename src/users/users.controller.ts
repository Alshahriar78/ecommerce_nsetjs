import { Body, Controller, Get, Post, Res, HttpStatus, Param, HttpException, Patch, Delete } from "@nestjs/common";
import { CreateUsersDto } from "./dto/create-users.dto";
import { UsersService } from "./users.service";
import type { Response } from "express";
import { UpdateUsersDto } from "./dto/update-users.dto";

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) { }



    @Post()
    async createUser(@Body() createUsersDto: CreateUsersDto, @Res({ passthrough: true }) res: Response) {
        try {
            const createUser = await this.usersService.createUsers(createUsersDto)
            res.status(HttpStatus.CREATED)
            return {
                success: true,
                message: `Create  User    Successfully`,
                Create_User_Data: createUser
            };
        } catch (error) {
            return {
                success: false,
                message: error.message,
            };
        }
    }

    @Get()
    async getAllUser() {
        try {
            const getAllUserData = await this.usersService.getAllUsers();
            return {
                success: true,
                message: `Get All  User    Successfully`,
                Create_User_Data: getAllUserData
            };
        } catch (error) {
            return {
                success: false,
                message: error.message,
            }
        }

    }

    @Get(':id')
    async getUserById(@Param('id') id: number) {
        try {
            
            const getUser = await this.usersService.getUsersById(+id);
            return {
                success: true,
                message: `Get User By ${id} Successfully`,
                Create_User_Data: getUser
            };
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: `Users With ${id} is Not in the server`,
            }, HttpStatus.NOT_FOUND, {
                cause: error
            });
        }
    }

    @Patch(':id')
    async updateUserById(@Param('id') id :number, @Body() updateUsersDto: UpdateUsersDto){
        try {
            const updateUserData = await this.usersService.updateUsersById(+id,updateUsersDto)
            return {
                success: true,
                message: `Get User By ${id} Successfully`,
                Create_User_Data: updateUserData
            };

        } catch (error) {
            return {
                success: false,
                message: error.message,
            }
        }
    }

    @Delete(':id')
    async deleteUserById(@Param('id') id:number){
        try {
            const deleteUserData = await this.usersService.deleteUsersById(+id)
            return {
                success: true,
                message: `Delete User By ${id} Successfully`,
                Create_User_Data: deleteUserData
            };
        } catch (error) {
            return {
                success: false,
                message: error.message,
            }
        }
    }
}