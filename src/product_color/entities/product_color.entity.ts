import { OrdersItem } from "src/orders_item/entities/orders_item.entity";
import { Product } from "src/product/entities/product.entity";
import { ProductVariant } from "src/product_variant/entities/product_variant.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProductColor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;

  @Column()
  hex_value: string

  @ManyToOne(() => Product, (product) => product.colors, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @OneToMany(() => OrdersItem, (orderItem) => orderItem.color)
  orders_items: OrdersItem[];

  @OneToMany(() => ProductVariant, (variant) => variant.color)
  variants: ProductVariant[];

}
//, { cascade: true}