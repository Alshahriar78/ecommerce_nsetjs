import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "./entities/users.entities";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { UsersRoleModule } from "src/users_role/users-role.module";

@Module({
    imports:[TypeOrmModule.forFeature([Users]),UsersRoleModule],
    controllers:[UsersController],
    providers:[UsersService],
    exports:[UsersService, TypeOrmModule]
})
export class UsersModule{}