import { Injectable } from '@nestjs/common';
import { PitayaCoreService } from '../pitayacore.service';

@Injectable()
export class KnowledgeClient {
  constructor(private pitayaCoreService: PitayaCoreService) {}

  async search(query: string, tenantId: string): Promise<any> {
    return this.pitayaCoreService.get('/knowledge/search', { query, tenantId });
  }

  async getDocument(documentId: string): Promise<any> {
    return this.pitayaCoreService.get(`/knowledge/${documentId}`);
  }

  async listDocuments(tenantId: string): Promise<any> {
    return this.pitayaCoreService.get('/knowledge', { tenantId });
  }
}
