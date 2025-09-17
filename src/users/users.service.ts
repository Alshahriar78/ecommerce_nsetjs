import { Injectable, NotFoundException, UseGuards } from "@nestjs/common";
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
        const { role: roleEntity, password, ...userData } = createUsersDto;
        const saltRounds = 10;
        const pass = await bcrypt.hash(password, saltRounds);
        const role = roleEntity
            ? await this.userRoleRepository.findOne({ where: { id: roleEntity } })
            : await this.userRoleRepository.findOne({ where: { id: 3 } });
        if (!role) {
            throw new Error('Default role not found');
        }
        const createData = this.usersRepository.create({ ...userData, role, password: pass })
        return await this.usersRepository.save(createData);
    }

    async getAllUsers(
        name?: string,
        phone?: string
    ) {
        const data = this.usersRepository
            .createQueryBuilder("user")
            .leftJoin("user.role", "role")
            .leftJoin("user.orders", "order")
            .leftJoin("order.oreder_items", "items")
            .leftJoin(`items.stock`, 'stocks')
            .leftJoin(`stocks.color`, 'color')
            .leftJoin(`stocks.label`, 'label')
            .select(
                [
                    //users table
                    "user.id as ID",
                    "user.name as Name",
                    "user.email as Email",
                    "user.phone as Phone",
                    "user.address as Address",

                    //users_role table
                    "role.name As role",

                    //order table
                    "order.id as OrderId",
                    "order.district as ShippingAddress",
                    "order.created_at as OrderDate",
                    "order.total_price PayableMoney",
                    "order.status as OrderStatus",

                    //orders_item table
                    "items.name as ProductName",
                    `items.quantity as Quantity`,
                    `items.price as ProductPrice`,

                    //product_color table
                    `color.value as ProductColor`,

                    //product_label table
                    `label.value as ProductLabel`
                ]
            )

        if (name) {
            data.where("user.name LIKE :name", { name: `%${name}%` })
        }
        if (phone) {
            data.andWhere("user.phone LIKE :phone", { phone: `%+88${phone}%` })
        }

        const rows = await data.getRawMany();
        const usersMap = new Map<number, any>();
        for (const row of rows) {
            if (!usersMap.has(row.ID)) {
                usersMap.set(row.ID, {
                    ID: row.ID,
                    Name: row.Name,
                    Email: row.Email,
                    Phone: row.Phone,
                    Address: row.Address,
                    Role: row.role,
                    orders: [],
                });
            }

            const user = usersMap.get(row.ID);

            if (row.OrderId) {
                let order = user.orders.find(o => o.OrderId === row.OrderId);
                if (!order) {
                    order = {
                        OrderId: row.OrderId,
                        ShippingAddress: row.ShippingAddress,
                        OrderDate: row.OrderDate,
                        PayableMoney: row.PayableMoney,
                        OrderStatus: row.OrderStatus,
                        items: [],
                    };
                    user.orders.push(order);
                }

                if (row.ProductName) {
                    order.items.push({
                        ProductName: row.ProductName,
                        Quantity: row.Quantity,
                        ProductTotalPrice: row.ProductPrice,
                        Color: row.ProductColor,
                        Label: row.ProductLabel,
                    });
                }
            }
        }

        return Array.from(usersMap.values());
    }


    // User Get By User Id
    async getUsersById(id: number) {


        const rows = await this.usersRepository
            .createQueryBuilder("user")
            .leftJoin("user.role", "role")
            .leftJoin("user.orders", "order")
            .leftJoin("order.oreder_items", "items")
            .leftJoin(`items.stock`, 'stocks')
            .leftJoin(`stocks.color`, 'color')
            .leftJoin(`stocks.label`, 'label')
            .select(
                [
                    // users table
                    "user.id as ID",
                    "user.name as Name",
                    "user.email as Email",
                    "user.phone as Phone",
                    "user.address as Address",

                    //users_role Table
                    "role.name as role",

                    //order table
                    "order.id as OrderId",
                    "order.created_at as OrderDate",
                    "order.district as ShippingAddress",
                    "order.total_price PayableMoney",
                    "order.status as OrderStatus",

                    //orders_item table
                    "items.name as ProductName",
                    `items.quantity as Quantity`,
                    `items.price as ProductPrice`,

                    //product_color table
                    `color.value as ProductColor`,

                    //product_label table
                    `label.value as ProductLabel`

                ]
            )
            .where("user.id = :id", { id: `${id}` })
            .getRawMany();

        if (!rows.length) return `User not Found`;

        const user = {
            ID: rows[0].ID,
            Name: rows[0].Name,
            Email: rows[0].Email,
            Phone: rows[0].Phone,
            Role: rows[0].role,
            Address: rows[0].Address,
            orders: [] as any[],
        };

        for (const row of rows) {
            if (row.OrderId) {
                let order = user.orders.find(o => o.OrderId === row.OrderId);
                if (!order) {
                    order = {
                        OrderId: row.OrderId,
                        ShippingAddress: row.ShippingAddress,
                        OrderDate: row.OrderDate,
                        PayableMoney: row.PayableMoney,
                        OrderStatus: row.OrderStatus,
                        items: [],
                    };
                    user.orders.push(order);
                }
                if (row.ProductName) {
                    order.items.push({
                        ProductName: row.ProductName,
                        Quantity: row.Quantity,
                        ProductPrice: row.ProductPrice,
                        Color: row.ProductColor,
                        Label: row.ProductLabel,
                    });
                }
            }
        }
        return user;
    }


    async updateUsersById(id: number, updateUsersDto: UpdateUsersDto) {
        const findUsers: any = await this.getUsersById(id);
        const updateWithoutRoll = { ...updateUsersDto, role: findUsers.role }
        const updateData = this.usersRepository.merge(findUsers, updateWithoutRoll)
        return await this.usersRepository.save(updateData);
    }

    async deleteUsersById(id: number) {
        const deleteUser: any = await this.usersRepository.findBy({ id });
        if (!deleteUser) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        await this.usersRepository.remove(deleteUser);
        return deleteUser;
    }

    async findByEmail(email: string): Promise<Users | null> {
        const user = this.usersRepository.findOne({ where: { email: email } })
        return user;
    }
}