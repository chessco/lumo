import { Injectable } from '@nestjs/common';
import { PitayaCoreService } from '../pitayacore.service';

@Injectable()
export class FileClient {
  constructor(private pitayaCoreService: PitayaCoreService) {}

  async upload(file: Buffer, filename: string, mimeType: string): Promise<any> {
    return this.pitayaCoreService.post('/files/upload', { file, filename, mimeType });
  }

  async getUrl(fileId: string): Promise<any> {
    return this.pitayaCoreService.get(`/files/${fileId}/url`);
  }

  async delete(fileId: string): Promise<any> {
    return this.pitayaCoreService.delete(`/files/${fileId}`);
  }
}
