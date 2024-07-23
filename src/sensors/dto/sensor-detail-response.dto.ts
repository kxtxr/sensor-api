import { ApiProperty } from '@nestjs/swagger';
import { SensorDataDto } from './sensor-data.dto';

export class SensorDetailResponseDto {
  @ApiProperty({ example: 'ue8383' })
  sensor_id: string;

  @ApiProperty({ example: 'temperature' })
  type: string;

  @ApiProperty({ type: [SensorDataDto] })
  data: SensorDataDto[];
}