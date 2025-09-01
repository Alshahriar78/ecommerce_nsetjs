import { Order } from "src/orders/entities/order.entity";
import { UsersRole } from "src/users_role/entities/users_role.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Users {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    name: string

    @Column()
    password: string;

    @Column()
    phone: string;

    @Column()
    address: string;

    @Column()
    is_active: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => UsersRole, (role) => role.user)
    @JoinColumn()
    role: UsersRole;

    @OneToMany(()=>Order,(order)=>order.user)
    orders:Order[];
}

