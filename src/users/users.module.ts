import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "./entities/users.entities";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { UsersRoleModule } from "src/users_role/users-role.module";
import { OrdersModule } from "src/orders/orders.module";
import { Order } from "src/orders/entities/order.entity";

@Module({
    imports:[TypeOrmModule.forFeature([Users,Order]),UsersRoleModule],
    controllers:[UsersController],
    providers:[UsersService],
    exports:[UsersService, TypeOrmModule]
})
export class UsersModule{}