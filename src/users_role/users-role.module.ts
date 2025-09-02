import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersRole } from "./entities/users_role.entity";
import { UsersRoleController } from "./users-role.controller";
import { UsersRoleService } from "./users-role.service";


@Module({
  imports: [TypeOrmModule.forFeature([UsersRole])],
  controllers: [UsersRoleController],
  providers: [UsersRoleService],
   exports: [UsersRoleService,TypeOrmModule],
})
export class UsersRoleModule{ }