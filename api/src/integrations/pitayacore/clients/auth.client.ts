import { Injectable } from '@nestjs/common';
import { PitayaCoreService } from '../pitayacore.service';

@Injectable()
export class AuthClient {
  constructor(private pitayaCoreService: PitayaCoreService) {}

  async validateToken(token: string): Promise<any> {
    return this.pitayaCoreService.post('/auth/validate', { token });
  }

  async getUser(userId: string): Promise<any> {
    return this.pitayaCoreService.get(`/auth/users/${userId}`);
  }

  async getUsersByTenant(tenantId: string): Promise<any> {
    return this.pitayaCoreService.get('/auth/users', { tenantId });
  }
}
