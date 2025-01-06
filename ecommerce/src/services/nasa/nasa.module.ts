import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { NasaService } from './nasa.service';
import { NasaController } from './nasa.controller';

@Module({
  imports: [
    HttpModule,
    ConfigModule,
  ],
  controllers: [NasaController],
  providers: [NasaService],
})
export class NasaModule {}
