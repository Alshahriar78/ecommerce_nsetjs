import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Product } from 'src/product/entities/product.entity';
import { ProductLabel } from 'src/product_label/entities/product_label.entity';
import { ProductColor } from 'src/product_color/entities/product_color.entity';

@Entity('product_variant')
export class ProductVariant {
    @PrimaryGeneratedColumn()
    id: number;


    @ManyToOne(() => Product, (product) => product.variants, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'product_id' })
    product: Product;

    @ManyToOne(() => ProductLabel, (label) => label.variants,{nullable:true})
    @JoinColumn({name:'label_id'})
    label?: ProductLabel | null;

    @ManyToOne(() => ProductColor, (color) => color.variants,{nullable:true})
    @JoinColumn({ name: 'color_id' })
    color?: ProductColor | null;

    @Column({ type: 'int' })
    stock: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number;
}
