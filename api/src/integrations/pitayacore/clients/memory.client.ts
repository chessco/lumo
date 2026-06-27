import { Injectable } from '@nestjs/common';
import { PitayaCoreService } from '../pitayacore.service';

@Injectable()
export class MemoryClient {
  constructor(private pitayaCoreService: PitayaCoreService) {}

  async store(userId: string, key: string, value: any): Promise<any> {
    return this.pitayaCoreService.post('/memory/store', { userId, key, value });
  }

  async retrieve(userId: string, key: string): Promise<any> {
    return this.pitayaCoreService.get(`/memory/${userId}/${key}`);
  }

  async list(userId: string): Promise<any> {
    return this.pitayaCoreService.get(`/memory/${userId}`);
  }
}
