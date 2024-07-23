import { ApiProperty } from '@nestjs/swagger';
import { SensorDto } from './sensor.dto';

export class SensorResponseDto {
  @ApiProperty({ type: [SensorDto] })
  data: SensorDto[];
}