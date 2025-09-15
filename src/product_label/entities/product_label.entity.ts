import { OrdersItem } from "src/orders_item/entities/orders_item.entity";
import { Product } from "src/product/entities/product.entity";
import { ProductVariant } from "src/product_variant/entities/product_variant.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProductLabel {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    value: string;

    @ManyToOne(() => Product, (product) => product.labels, { onDelete: "CASCADE" })
    @JoinColumn({ name: 'product_id' })
    product: Product;

    @OneToMany(() => OrdersItem, (orderItem) => orderItem.label)
    orders_items: OrdersItem[];

    @OneToMany(() => ProductVariant, (variant) => variant.label)
    variants: ProductVariant[];
}
// , { cascade: true }