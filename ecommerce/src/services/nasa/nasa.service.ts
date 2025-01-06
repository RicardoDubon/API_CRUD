import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios'; 
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { NASA_API_URL } from 'src/utils/nasa.constants';

@Injectable()
export class NasaService {
  private readonly nasaApiKey: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.nasaApiKey = this.configService.get<string>('NASA_API_KEY');
  }

  async getAstronomyPhotoOfTheDay(): Promise<any> {
    const url = `${NASA_API_URL}?api_key=${this.nasaApiKey}`;
    try {
      const response: AxiosResponse = await this.httpService.get(url).toPromise();
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching NASA APOD: ${error.message}`);
    }
  }
}
