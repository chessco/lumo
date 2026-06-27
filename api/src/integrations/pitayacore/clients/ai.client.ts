import { Injectable } from '@nestjs/common';
import { PitayaCoreService } from '../pitayacore.service';

@Injectable()
export class AiClient {
  constructor(private pitayaCoreService: PitayaCoreService) {}

  async generateText(prompt: string, options?: any): Promise<any> {
    return this.pitayaCoreService.post('/ai/generate', { prompt, ...options });
  }

  async analyzeSpeech(audioUrl: string): Promise<any> {
    return this.pitayaCoreService.post('/ai/analyze-speech', { audioUrl });
  }

  async generateFeedback(score: number, context: any): Promise<any> {
    return this.pitayaCoreService.post('/ai/generate-feedback', { score, context });
  }
}
