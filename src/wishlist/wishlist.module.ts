import { Module } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { WishlistController } from './wishlist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { UsersModule } from 'src/users/users.module';
import { ProductVariantModule } from 'src/product_variant/product_variant.module';

@Module({
  imports:[TypeOrmModule.forFeature([Wishlist]),UsersModule,ProductVariantModule],
  controllers: [WishlistController],
  providers: [WishlistService],
})
export class WishlistModule {}
