import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { SensorData } from './sensor-data.entity';

@Entity()
export class Sensor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: string;

  @OneToMany(() => SensorData, sensorData => sensorData.sensor)
  data: SensorData[];
}