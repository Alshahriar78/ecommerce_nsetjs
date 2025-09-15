import { Order } from "src/orders/entities/order.entity";
import { Product } from "src/product/entities/product.entity";
import { ProductColor } from "src/product_color/entities/product_color.entity";
import { ProductLabel } from "src/product_label/entities/product_label.entity";
import { ProductVariant } from "src/product_variant/entities/product_variant.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class 

OrdersItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    quantity: number;

    @Column()
    price: number;

    @Column({ type: 'date', default: () => 'GETDATE()' })
    created_at: Date;

    @Column({ type: 'date', default: () => 'GETDATE()' })
    updated_at: Date;

    @ManyToOne(() => Order, (order) => order.oreder_items, { onDelete: "CASCADE" })
    order: Order;

    @ManyToOne(() => Product, (product) => product.orders_items)
    @JoinColumn({ name: 'stock_id' })
    stock: ProductVariant;

    
}


// , { onDelete: 'CASCADE' }