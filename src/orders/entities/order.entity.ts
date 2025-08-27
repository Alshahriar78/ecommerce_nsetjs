import { OrdersItem } from "src/orders_item/entities/orders_item.entity";
import { Users } from "src/users/entities/users.entities";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_name: string;

    @Column()
    phone: string;

    @Column()
    note: string;

    @Column()
    total_price: number;

    @Column()
    status: string;

    @Column()
    address: string;

    @Column({ type: 'date', default: () => 'GETDATE()' })
    created_at: Date;

    @Column({ type: 'date', default: () => 'GETDATE()' })
    updated_at: Date;

    @ManyToOne(()=>Users,(user)=>user.orders)
    user:Users;

    @OneToMany(()=>OrdersItem,(orederItem)=>orederItem.order)
    oreder_items :OrdersItem[];

}
