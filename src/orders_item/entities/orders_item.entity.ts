import { Order } from "src/orders/entities/order.entity";
import { Product } from "src/product/entities/product.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class OrdersItem {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    quantity:number;

    @Column()
    price:number;
    
    @Column({ type: 'date', default: () => 'GETDATE()' })
    created_at: Date;

    @Column({ type: 'date', default: () => 'GETDATE()' })
    updated_at: Date;

    @ManyToOne(()=>Order,(order)=>order.oreder_items)
    order: Order;

    @ManyToOne(()=>Product,(product)=>product.orders_items)
    product:Product;

}
