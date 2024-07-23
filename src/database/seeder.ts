import { DataSource } from 'typeorm';
import { Sensor } from '../sensors/entities/sensor.entity';
import { SensorData } from '../sensors/entities/sensor-data.entity';
import { faker } from '@faker-js/faker';

async function seed() {
  const AppDataSource = new DataSource({
    // eslint-disable-next-line prettier/prettier
    type: "sqlite",
    database: 'database.sqlite',
    entities: [Sensor, SensorData],
    synchronize: true, // Set to true for initial setup
    logging: false,
  });

  await AppDataSource.initialize();

  const sensorRepository = AppDataSource.getRepository(Sensor);
  const sensorDataRepository = AppDataSource.getRepository(SensorData);

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
    await sensorRepository.save(sensor);

    const sensorData = Array(100)
      .fill(null)
      .map(() => {
        const data = new SensorData();
        data.recorded_at = faker.date.between('2023-01-01', '2024-07-23');
        data.value = generateRealisticValue(type);
        data.sensor = sensor;
        return data;
      });

    await sensorDataRepository.save(sensorData);
  }

  await AppDataSource.destroy();
  console.log('Seeding completed');
}

function generateRealisticValue(sensorType: string): string {
  switch (sensorType) {
    case 'temperature':
      return faker.datatype
        .number({ min: -10, max: 40, precision: 0.1 })
        .toFixed(1);
    case 'humidity':
      return faker.datatype
        .number({ min: 0, max: 100, precision: 0.1 })
        .toFixed(1);
    case 'pressure':
      return faker.datatype
        .number({ min: 950, max: 1050, precision: 0.1 })
        .toFixed(1);
    case 'light':
      return faker.datatype
        .number({ min: 0, max: 1000, precision: 1 })
        .toFixed(0);
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
