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

  @OneToMany(() => ProductVariant, (variant) => variant.color)
  variants: ProductVariant[];

}