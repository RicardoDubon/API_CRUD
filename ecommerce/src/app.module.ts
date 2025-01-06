import { Module } from '@nestjs/common';
import { ProductsModule } from './services/products/products.module';
import { ConfigModule, ConfigService } from '@nestjs/config'; 
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    ProductsModule, 
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
