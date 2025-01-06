import { Module } from '@nestjs/common';
import { ProductsController } from './services/products/products.controller';
import { ProductsService } from './services/products/products.service';

@Module({
  imports: [],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class AppModule {}
