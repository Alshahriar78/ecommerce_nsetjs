import { ProductVariant } from "src/product_variant/entities/product_variant.entity";
import { Users } from "src/users/entities/users.entities";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('wish_list')
export class Wishlist {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Users, (users) => users.wishLists)
    @JoinColumn({ name: 'userId' })
    user: Users;

    @ManyToOne(() => ProductVariant, (productVariant) => productVariant.wishLists)
    @JoinColumn({ name: 'productId' })
    productVariant: ProductVariant;

    @Column({type:'int', nullable:false})
    price:number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}
