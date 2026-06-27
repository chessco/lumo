import { Injectable } from '@nestjs/common';
import { PitayaCoreService } from '../pitayacore.service';

@Injectable()
export class AgentClient {
  constructor(private pitayaCoreService: PitayaCoreService) {}

  async chat(agentId: string, message: string, context?: any): Promise<any> {
    return this.pitayaCoreService.post(`/agents/${agentId}/chat`, { message, context });
  }

  async getAgent(agentId: string): Promise<any> {
    return this.pitayaCoreService.get(`/agents/${agentId}`);
  }

  async listAgents(tenantId: string): Promise<any> {
    return this.pitayaCoreService.get('/agents', { tenantId });
  }
}
