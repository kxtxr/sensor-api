import { NestFactory } from '@nestjs/core';
import { getConnectionOptions, createConnection } from 'typeorm';
import { AppModule } from '../app.module';
import { Sensor } from '../sensors/entities/sensor.entity';
import { SensorData } from '../sensors/entities/sensor-data.entity';
import { faker } from '@faker-js/faker';

async function seed() {
  const app = await NestFactory.create(AppModule);

  // Get the connection options from ormconfig
  const connectionOptions = await getConnectionOptions();

  // Create a new connection with entities explicitly specified
  const connection = await createConnection({
    ...connectionOptions,
    synchronize: true,
    entities: [Sensor, SensorData],
  });

  const sensorTypes = [
    'temperature',
    'humidity',
    'pressure',
    'light',
    'motion',
  ];

  for (const type of sensorTypes) {
    const sensor = new Sensor();
    sensor.type = type;
    await connection.manager.save(sensor);

    const sensorData = Array(100)
      .fill(null)
      .map(() => {
        const data = new SensorData();
        data.recorded_at = faker.date.between(
          '2023-01-01T00:00:00.000Z',
          '2024-07-23T00:00:00.000Z',
        );
        data.value = generateRealisticValue(type);
        data.sensor = sensor;
        return data;
      });

    await connection.manager.save(sensorData);
  }

  console.log('Seeding complete!');
  await connection.close();
  await app.close();
}

function generateRealisticValue(sensorType: string): string {
  switch (sensorType) {
    case 'temperature':
      return faker.number
        .float({ min: -10, max: 40, precision: 0.1 })
        .toFixed(1);
    case 'humidity':
      return faker.number
        .float({ min: 0, max: 100, precision: 0.1 })
        .toFixed(1);
    case 'pressure':
      return faker.number
        .float({ min: 950, max: 1050, precision: 0.1 })
        .toFixed(1);
    case 'light':
      return faker.number.int({ min: 0, max: 1000 }).toString();
    case 'motion':
      return faker.datatype.boolean() ? '1' : '0';
    default:
      return '0';
  }
}

seed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Seeding failed!', error);
    process.exit(1);
  });
