import { Injectable, UseGuards } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "./entities/users.entities";
import { Repository } from "typeorm";
import { CreateUsersDto } from "./dto/create-users.dto";
import { UpdateUsersDto } from "./dto/update-users.dto";
import { UsersRole } from "src/users_role/entities/users_role.entity";
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>,
        @InjectRepository(UsersRole)
        private readonly userRoleRepository: Repository<UsersRole>,
    ) { }

    async createUsers(createUsersDto: CreateUsersDto) {
        const { role: roleEntity,password, ...userData } = createUsersDto;
        const saltRounds = 10;
        const pass = await bcrypt.hash(password,saltRounds);
        const role = roleEntity
            ? await this.userRoleRepository.findOne({ where: { id: roleEntity } })
            : await this.userRoleRepository.findOne({ where: { id: 3 } });
        if (!role) {
            throw new Error('Default role not found');
        }
        const createData = this.usersRepository.create({ ...userData, role,password:pass })
        return await this.usersRepository.save(createData);
    }

    @UseGuards()
    async getAllUsers(
        name?: string,
        phone?: string
    ) {
        const data = await this.usersRepository
            .createQueryBuilder("user")
            .leftJoin("user.role", "role")
            .leftJoin("user.orders", "order")
            .leftJoin("order.oreder_items", "items")
            .select(
                [
                    "user.id as ID",
                    "user.name as Name",
                    "user.email as Email",
                    "user.phone as Phone",
                    "user.address as Address",
                    "items.name as ProductName",
                    "order.address ShippingAddress",
                    "order.created_at as OderDate",
                    "order.total_price PayableMoney",
                    "order.status as OrderStatus"
                ]
            )
        if (name) {
            data.where("user.name LIKE :name", { name: `%${name}%` })
        }
        if (phone) {
            data.andWhere("user.phone LIKE :phone", { phone: `%+88${phone}%` })
        }

        return data.getRawMany();
    }

    async getUsersById(id: number) {
        const user = await this.usersRepository
        .createQueryBuilder("user")
            .leftJoin("user.role", "role")
            .leftJoin("user.orders", "order")
            .leftJoin("order.oreder_items", "items")
            .select(
                [
                    "user.id as ID",
                    "user.name as Name",
                    "user.email as Email",
                    "user.phone as Phone",
                    "user.address as Address",
                    "items.name as ProductName",
                    "order.address ShippingAddress",
                    "order.created_at as OderDate",
                    "order.total_price PayableMoney",
                    "order.status as OrderStatus"
                ]
            )
            .where("user.id = :id",{id: `${id}`})
            .getRawOne()
        return user;
    }

    async updateUsersById(id: number, updateUsersDto: UpdateUsersDto) {
        const findUsers: any = await this.getUsersById(id);
        const updateWithoutRoll = { ...updateUsersDto, role: findUsers.role }
        const updateData = this.usersRepository.merge(findUsers, updateWithoutRoll)
        return await this.usersRepository.save(updateData);
    }

    async deleteUsersById(id: number) {
        const deleteUser: any = await this.getUsersById(id);
        await this.usersRepository.remove(deleteUser);
        return deleteUser;
    }

    async findByEmail(email: string): Promise<Users | null> {
        const user = this.usersRepository.findOne({ where: { email: email } })
        return user;
    }
}