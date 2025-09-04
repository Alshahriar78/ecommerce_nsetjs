import { OrdersItem } from "src/orders_item/entities/orders_item.entity";
import { Users } from "src/users/entities/users.entities";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable:true})
    userName: string;

    @Column({nullable:true})
    phone: string;

    @Column({nullable:true})
    note: string;

    @Column({nullable:true})
    total_price: number;

    @Column({nullable:true})
    status: string;

    @Column({nullable:true})
    address: string;

    @Column()
    userId:number;

    @Column({ type: 'date', default: () => 'GETDATE()' })
    created_at: Date;

    @Column({ type: 'date', default: () => 'GETDATE()' })
    updated_at: Date;

    @ManyToOne(() => Users, (user) => user.orders, { onDelete: "CASCADE" })
    @JoinColumn({name:'userId'})
    user: Users;

    @OneToMany(() => OrdersItem, (orederItem) => orederItem.order)
    oreder_items: OrdersItem[];

}
