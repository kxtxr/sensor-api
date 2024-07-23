import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Sensor } from '../../sensors/entities/sensor.entity';
import { SensorData } from '../../sensors/entities/sensor-data.entity';
import faker from 'faker';

export default class CreateSensors implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const sensorTypes = [
      'temperature',
      'humidity',
      'pressure',
      'light',
      'motion',
    ];

    for (const type of sensorTypes) {
      const sensor = await connection
        .createQueryBuilder()
        .insert()
        .into(Sensor)
        .values({
          type: type,
        })
        .execute();

      const sensorId = sensor.identifiers[0].id;

      // Generate 100 data points for each sensor
      const sensorData = Array(100)
        .fill(null)
        .map(() => ({
          recorded_at: faker.date.between('2023-01-01', '2024-07-23'),
          value: this.generateRealisticValue(type),
          sensor: { id: sensorId },
        }));

      await connection
        .createQueryBuilder()
        .insert()
        .into(SensorData)
        .values(sensorData)
        .execute();
    }
  }

  private generateRealisticValue(sensorType: string): string {
    switch (sensorType) {
      case 'temperature':
        return faker.datatype
          .number({ min: -10, max: 40, precision: 0.1 })
          .toString();
      case 'humidity':
        return faker.datatype
          .number({ min: 0, max: 100, precision: 0.1 })
          .toString();
      case 'pressure':
        return faker.datatype
          .number({ min: 950, max: 1050, precision: 0.1 })
          .toString();
      case 'light':
        return faker.datatype
          .number({ min: 0, max: 1000, precision: 1 })
          .toString();
      case 'motion':
        return faker.datatype.boolean() ? '1' : '0';
      default:
        return '0';
    }
  }
}
