import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SensorsService } from './sensors.service';
import { SensorResponseDto } from './dto/sensor-response.dto';
import { SensorDetailResponseDto } from './dto/sensor-detail-response.dto';

@ApiTags('sensors')
@Controller('sensors')
export class SensorsController {
  constructor(private readonly sensorsService: SensorsService) { }

  @Get()
  @ApiOperation({ summary: 'Get all sensors' })
  @ApiResponse({ status: 200, description: 'Successful response', type: SensorResponseDto })
  async findAll(): Promise<SensorResponseDto> {
    const sensors = await this.sensorsService.findAll();
    return { data: sensors };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get data about a particular sensor' })
  @ApiResponse({ status: 200, description: 'Successful response', type: SensorDetailResponseDto })
  async findOne(@Param('id') id: string): Promise<SensorDetailResponseDto> {
    const sensor = await this.sensorsService.findOne(id);
    return {
      sensor_id: sensor.id,
      type: sensor.type,
      data: sensor.data.map(d => ({
        recorded_at: d.recorded_at.toISOString(),
        value: d.value,
      })),
    };
  }
}