import { Brand } from "src/brand/entities/brand.entity";
import { Category } from "src/category/entities/category.entity";
import { OrdersItem } from "src/orders_item/entities/orders_item.entity";
import { ProductColor } from "src/product_color/entities/product_color.entity";
import { ProductImage } from "src/product_image/entities/product_image.entity";
import { ProductLabel } from "src/product_label/entities/product_label.entity";
import { ProductVariant } from "src/product_variant/entities/product_variant.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string

  @Column()
  description: string;

  @Column({ type: 'date', default: () => 'GETDATE()' })
  created_at: Date;

  @Column({ type: 'date', default: () => 'GETDATE()' })
  updated_at: Date;

  @ManyToOne(() => Brand, (brand) => brand.product)
  @JoinColumn({ name: 'brand_id' })
  brand: Brand;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @OneToMany(() => ProductLabel, (label) => label.product, { cascade: true })
  labels: ProductLabel[];

  @OneToMany(() => ProductColor, (color) => color.product, { cascade: true })
  colors: ProductColor[];

  @OneToMany(() => ProductImage, (image) => image.product, { cascade: true })
  images: ProductImage[];

  @OneToMany(() => OrdersItem, (orderItem) => orderItem.product)
  orders_items: OrdersItem[];

  @OneToMany(() => ProductVariant, (variant) => variant.product)
  variants: ProductVariant[];
}

//, { cascade: true}