import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Sensor } from './sensor.entity';

@Entity()
export class SensorData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('datetime')
  recorded_at: Date;

  @Column()
  value: string;

  @ManyToOne(() => Sensor, (sensor) => sensor.data)
  sensor: Sensor;
}
