import { ApiProperty } from '@nestjs/swagger';

export class SensorDto {
  @ApiProperty({ example: 'ue8383' })
  id: string;

  @ApiProperty({ example: 'temperature' })
  type: string;
}