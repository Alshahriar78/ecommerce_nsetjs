import { Product } from "src/product/entities/product.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProductImage {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    url:string;

    @ManyToOne(()=>Product,(product)=>product.images)
    product:Product;
}
