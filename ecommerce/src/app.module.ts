import { Module } from '@nestjs/common';
import { ProductsModule } from './services/products/products.module';
import { ConfigModule, ConfigService } from '@nestjs/config'; 
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    ProductsModule, 
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
