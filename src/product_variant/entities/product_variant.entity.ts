import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, } from 'typeorm';
import { Product } from 'src/product/entities/product.entity';
import { ProductLabel } from 'src/product_label/entities/product_label.entity';
import { ProductColor } from 'src/product_color/entities/product_color.entity';
import { OrdersItem } from 'src/orders_item/entities/orders_item.entity';
import { Wishlist } from 'src/wishlist/entities/wishlist.entity';

@Entity('product_variant')
export class ProductVariant {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int', default: 0 })
    quantity: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 , default: 0.00})
    price: number;


    @ManyToOne(() => Product, (product) => product.variants, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'product_id' })
    product: Product;

    @ManyToOne(() => ProductLabel, (label) => label.variants, { nullable: true })
    @JoinColumn({ name: 'label_id' })
    label?: ProductLabel | null;

    @ManyToOne(() => ProductColor, (color) => color.variants, { nullable: true })
    @JoinColumn({ name: 'color_id' })
    color?: ProductColor | null;

    @OneToMany(()=>OrdersItem,(items)=>items.stock)
    orders_items:OrdersItem[];

    @OneToMany(()=> Wishlist,(wishList)=>wishList.productVariant)
    wishLists:Wishlist[];
}
