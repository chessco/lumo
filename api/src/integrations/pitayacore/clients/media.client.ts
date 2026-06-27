import { Injectable } from '@nestjs/common';
import { PitayaCoreService } from '../pitayacore.service';

@Injectable()
export class MediaClient {
  constructor(private pitayaCoreService: PitayaCoreService) {}

  async uploadAudio(file: Buffer, filename: string): Promise<any> {
    return this.pitayaCoreService.post('/media/upload/audio', { file, filename });
  }

  async getAudioUrl(mediaId: string): Promise<any> {
    return this.pitayaCoreService.get(`/media/${mediaId}/url`);
  }

  async deleteMedia(mediaId: string): Promise<any> {
    return this.pitayaCoreService.delete(`/media/${mediaId}`);
  }
}
