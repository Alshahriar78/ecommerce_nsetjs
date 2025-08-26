import { Product } from "src/product/entities/product.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProductColor {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    value: string;

    @Column()
    hex_value: string

    @ManyToOne(() => Product, (product) => product.colors)
    product: Product;

}
