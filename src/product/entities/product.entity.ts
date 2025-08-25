import { Brand } from "src/brand/entities/brand.entity";
import { Category } from "src/category/entities/category.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string

    @Column()
    price:number;

    @Column()
    quantity: number;

    @Column()
    description: string;

    @Column({ type: 'date', default: () => 'GETDATE()' })
    created_at: Date;

    @Column({ type: 'date', default: () => 'GETDATE()' })
    updated_at: Date;

    @ManyToOne(()=>Brand)
    @JoinColumn({ name: 'brand_id' })
    brand: Brand;

    @ManyToOne(()=>Category)
     @JoinColumn({ name: 'category_id' })
    category: Category;
}
