import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Photo } from './photo/photo.entity';
import { PhotoModule } from './photo/photo.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '0.0.0.0',
      port: 5134,
      username: 'root',
      password: 'root',
      database: 'test',
      entities: [Photo],
      synchronize: true,
      autoLoadEntities: true,
      retryAttempts: 2,
      retryDelay: 1000,
    }),
    TypeOrmModule.forRoot({
      name: 'connection_2',
      type: 'postgres',
      host: '0.0.0.0',
      port: 5134,
      username: 'root',
      password: 'root',
      database: 'test',
      entities: [Photo],
      synchronize: true,
      autoLoadEntities: true,
      retryAttempts: 2,
      retryDelay: 1000,
    }),
    PhotoModule,
  ],
})
export class AppModule {}
