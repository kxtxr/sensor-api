import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SensorsController } from './sensors.controller';
import { SensorsService } from './sensors.service';
import { Sensor } from './entities/sensor.entity';
import { SensorData } from './entities/sensor-data.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sensor, SensorData])],
  controllers: [SensorsController],
  providers: [SensorsService],
})
export class SensorsModule { }