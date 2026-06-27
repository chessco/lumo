import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class PitayaCoreService {
  private readonly logger = new Logger(PitayaCoreService.name);
  private readonly httpClient: AxiosInstance;
  private readonly baseUrl: string;
  private readonly apiKey: string;

  constructor(private configService: ConfigService) {
    this.baseUrl = this.configService.get<string>('PITAYACORE_URL', 'https://pitayacore-api.pitayacode.io');
    this.apiKey = this.configService.get<string>('INTERNAL_API_KEY', 'pitaya_internal_secret_2026');

    this.httpClient = axios.create({
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey,
      },
      timeout: 30000,
    });

    this.httpClient.interceptors.response.use(
      (response) => response,
      (error) => {
        this.logger.error(`PitayaCore API error: ${error.message}`, error.stack);
        throw error;
      },
    );
  }

  async get<T>(path: string, params?: any): Promise<T> {
    const response = await this.httpClient.get<T>(path, { params });
    return response.data;
  }

  async post<T>(path: string, data?: any): Promise<T> {
    const response = await this.httpClient.post<T>(path, data);
    return response.data;
  }

  async put<T>(path: string, data?: any): Promise<T> {
    const response = await this.httpClient.put<T>(path, data);
    return response.data;
  }

  async delete<T>(path: string): Promise<T> {
    const response = await this.httpClient.delete<T>(path);
    return response.data;
  }
}
