import { Product } from "src/product/entities/product.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('file')
export class ProductImage {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    filename: string;

    @Column()
    path:string;

    @ManyToOne(()=>Product,(product)=>product.images,{ onDelete: 'CASCADE' })
    @JoinColumn({ name: 'product_id' })
    product:Product;
}
