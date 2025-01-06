import { Module } from '@nestjs/common';
import { ProductsModule } from './services/products/products.module';
import { ConfigModule, ConfigService } from '@nestjs/config'; 
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from './database/database.module';
import { NasaModule } from './services/nasa/nasa.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    ProductsModule, 
    NasaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
