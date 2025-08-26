import { Brand } from "src/brand/entities/brand.entity";
import { Category } from "src/category/entities/category.entity";
import { ProductColor } from "src/product_color/entities/product_color.entity";
import { ProductLabel } from "src/product_label/entities/product_label.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string

  @Column()
  price: number;

  @Column()
  quantity: number;

  @Column()
  description: string;

  @Column({ type: 'date', default: () => 'GETDATE()' })
  created_at: Date;

  @Column({ type: 'date', default: () => 'GETDATE()' })
  updated_at: Date;

  @ManyToOne(() => Brand)
  @JoinColumn({ name: 'brand_id' })
  brand: Brand;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @OneToMany(() => ProductLabel, (label) => label.product, { cascade: true })
  labels: ProductLabel[];

  @OneToMany(() => ProductColor, (color) => color.product)
  colors: ProductColor[];
}
