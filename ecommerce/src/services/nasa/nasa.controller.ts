import { Controller, Get } from '@nestjs/common';
import { NasaService } from './nasa.service';

@Controller('nasa')
export class NasaController {
  constructor(private readonly nasaService: NasaService) {}

  @Get('apod')
  async getAstronomyPhotoOfTheDay() {
    try {
      const data = await this.nasaService.getAstronomyPhotoOfTheDay();
      return data;
    } catch (error) {
      return {
        message: 'Error fetching astronomy photo of the day',
        error: error.message,
      };
    }
  }
}
