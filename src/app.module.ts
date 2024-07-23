import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { SensorsModule } from './sensors/sensors.module';
import { AppDataSource } from './data-source';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(AppDataSource.options),
    SensorsModule,
  ],
})
export class AppModule { }
