import { Product } from "src/product/entities/product.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProductLabel {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    value: string;

    @ManyToOne (() => Product, (product) => product.labels, { onDelete: "CASCADE" })
    product: Product;
}
