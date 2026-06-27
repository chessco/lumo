import { Injectable } from '@nestjs/common';
import { PitayaCoreService } from '../pitayacore.service';

@Injectable()
export class AuditClient {
  constructor(private pitayaCoreService: PitayaCoreService) {}

  async log(action: string, userId: string, details: any): Promise<any> {
    return this.pitayaCoreService.post('/audit/log', { action, userId, details });
  }

  async getLogs(tenantId: string, filters?: any): Promise<any> {
    return this.pitayaCoreService.get('/audit/logs', { tenantId, ...filters });
  }
}
