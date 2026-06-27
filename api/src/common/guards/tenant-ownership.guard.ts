import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { getTenantId } from '../tenant/tenant.middleware';

@Injectable()
export class TenantOwnershipGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    
    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }

    const tenantId = getTenantId();
    
    // Check if user belongs to the tenant
    if (user.tenantId && user.tenantId !== tenantId) {
      throw new ForbiddenException('User does not belong to this tenant');
    }

    return true;
  }
}
