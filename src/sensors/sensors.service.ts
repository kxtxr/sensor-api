import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sensor } from './entities/sensor.entity';
import { SensorData } from './entities/sensor-data.entity';

@Injectable()
export class SensorsService {
  constructor(
    @InjectRepository(Sensor)
    private sensorsRepository: Repository<Sensor>,
    @InjectRepository(SensorData)
    private sensorDataRepository: Repository<SensorData>,
  ) { }

  async findAll(): Promise<Sensor[]> {
    return this.sensorsRepository.find();
  }

  async findOne(id: string): Promise<Sensor> {
    return this.sensorsRepository.findOne({
      where: { id },
      relations: ['data'],
    });
  }
}