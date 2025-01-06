import { Module, Logger } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const dbURL = configService.get<string>('MONGODB_URI');
        const logger = new Logger('MongoDB');

        return {
          uri: dbURL,
          connectionFactory: (connection) => {
            connection.on('connected', () => {
              logger.log('✅ MongoDB is connected');
            });
            connection.on('disconnected', () => {
              logger.warn('⚠️ MongoDB disconnected!');
            });
            connection.on('error', (error) => {
              logger.error('❌ MongoDB connection failed!', error);
            });
            return connection;
          },
        };
      },
    }),
  ],
})
export class DatabaseModule {}
