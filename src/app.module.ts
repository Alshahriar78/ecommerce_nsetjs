import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRole } from './users_role/entities/users_role.entity';
import { UsersRoleModule } from './users_role/users-role.module';
import { UsersModule } from './users/users.module';
import { Users } from './users/entities/users.entities';
import { BrandModule } from './brand/brand.module';
import { Brand } from './brand/entities/brand.entity';
import { CategoryModule } from './category/category.module';
import { Category } from './category/entities/category.entity';
import { ProductModule } from './product/product.module';
import { Product } from './product/entities/product.entity';
import { ProductLabelModule } from './product_label/product_label.module';
import { ProductLabel } from './product_label/entities/product_label.entity';
import { ProductColorModule } from './product_color/product_color.module';
import { ProductColor } from './product_color/entities/product_color.entity';
import { ProductImageModule } from './product_image/product_image.module';
import { ProductImage } from './product_image/entities/product_image.entity';
import { OrdersModule } from './orders/orders.module';
import { Order } from './orders/entities/order.entity';
import { OrdersItemModule } from './orders_item/orders_item.module';
import { OrdersItem } from './orders_item/entities/orders_item.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type:'mssql',
    host: 'SOUROVPC',
    port: 1433,
    username:'sa',
    password:'alshahoriar123@@',
    database:'ecommerce',
    entities:[UsersRole,Users,Brand,Category,Product,ProductLabel,ProductColor,ProductImage,Order,OrdersItem],
    synchronize:true,
    options: {
        encrypt: true,
        trustServerCertificate: true,
      }
  }),UsersRoleModule,UsersModule, BrandModule, CategoryModule, ProductModule, ProductLabelModule, ProductColorModule, ProductImageModule, OrdersModule, OrdersItemModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
