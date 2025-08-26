import { Module } from '@nestjs/common';
import { ProductLabelService } from './product_label.service';
import { ProductLabelController } from './product_label.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductLabel } from './entities/product_label.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ProductLabel])],
  controllers: [ProductLabelController],
  providers: [ProductLabelService],
})
export class ProductLabelModule {}
