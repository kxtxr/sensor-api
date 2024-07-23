import { ApiProperty } from '@nestjs/swagger';

export class SensorDataDto {
  @ApiProperty({ example: '2024-06-12T17:16:25.897Z' })
  recorded_at: string;

  @ApiProperty({ example: '67' })
  value: string;
}