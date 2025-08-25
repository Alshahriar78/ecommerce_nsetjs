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

@Module({
  imports: [TypeOrmModule.forRoot({
    type:'mssql',
    host: 'SOUROVPC',
    port: 1433,
    username:'sa',
    password:'alshahoriar123@@',
    database:'ecommerce',
    entities:[UsersRole,Users,Brand,Category,Product],
    synchronize:true,
    options: {
        encrypt: true,
        trustServerCertificate: true,
      }
  }),UsersRoleModule,UsersModule, BrandModule, CategoryModule, ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
