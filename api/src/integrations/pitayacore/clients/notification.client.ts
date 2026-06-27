import { Injectable } from '@nestjs/common';
import { PitayaCoreService } from '../pitayacore.service';

@Injectable()
export class NotificationClient {
  constructor(private pitayaCoreService: PitayaCoreService) {}

  async send(userId: string, title: string, body: string, data?: any): Promise<any> {
    return this.pitayaCoreService.post('/notifications/send', { userId, title, body, data });
  }

  async sendBulk(userIds: string[], title: string, body: string, data?: any): Promise<any> {
    return this.pitayaCoreService.post('/notifications/send-bulk', { userIds, title, body, data });
  }
}
