import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../../common/database/database.service';
import { getTenantId } from '../../common/tenant/tenant.middleware';

@Injectable()
export class ChildrenService {
  constructor(private databaseService: DatabaseService) {}

  async create(data: {
    firstName: string;
    lastName?: string;
    dateOfBirth?: Date;
    avatar?: string;
    parentId?: string;
    teacherId?: string;
    preferences?: any;
  }) {
    const tenantId = getTenantId();
    
    return this.databaseService.child.create({
      data: {
        ...data,
        tenant_id: tenantId,
      },
    });
  }

  async findAll() {
    const tenantId = getTenantId();
    
    return this.databaseService.child.findMany({
      where: {
        tenant_id: tenantId,
        isActive: true,
      },
      include: {
        parent: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
        teacher: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });
  }

  async findById(id: string) {
    const tenantId = getTenantId();
    
    const child = await this.databaseService.child.findFirst({
      where: {
        id,
        tenant_id: tenantId,
        isActive: true,
      },
      include: {
        parent: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
        teacher: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
        speechSessions: {
          orderBy: { startedAt: 'desc' },
          take: 10,
        },
        speechProgress: {
          orderBy: { date: 'desc' },
          take: 30,
        },
        speechRewards: true,
      },
    });

    if (!child) {
      throw new NotFoundException(`Child with ID ${id} not found`);
    }

    return child;
  }

  async findByParent(parentId: string) {
    const tenantId = getTenantId();
    
    return this.databaseService.child.findMany({
      where: {
        tenant_id: tenantId,
        parentId,
        isActive: true,
      },
      include: {
        speechProgress: {
          orderBy: { date: 'desc' },
          take: 1,
        },
      },
    });
  }

  async findByTeacher(teacherId: string) {
    const tenantId = getTenantId();
    
    return this.databaseService.child.findMany({
      where: {
        tenant_id: tenantId,
        teacherId,
        isActive: true,
      },
      include: {
        parent: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
        speechProgress: {
          orderBy: { date: 'desc' },
          take: 1,
        },
      },
    });
  }

  async assignTeacher(childId: string, teacherId: string) {
    const tenantId = getTenantId();
    
    const child = await this.databaseService.child.findFirst({
      where: {
        id: childId,
        tenant_id: tenantId,
      },
    });

    if (!child) {
      throw new NotFoundException(`Child with ID ${childId} not found`);
    }

    return this.databaseService.child.update({
      where: { id: childId },
      data: { teacherId },
    });
  }

  async update(id: string, data: {
    firstName?: string;
    lastName?: string;
    dateOfBirth?: Date;
    avatar?: string;
    preferences?: any;
  }) {
    const tenantId = getTenantId();
    
    const child = await this.databaseService.child.findFirst({
      where: {
        id,
        tenant_id: tenantId,
      },
    });

    if (!child) {
      throw new NotFoundException(`Child with ID ${id} not found`);
    }

    return this.databaseService.child.update({
      where: { id },
      data,
    });
  }

  async deactivate(id: string) {
    const tenantId = getTenantId();
    
    const child = await this.databaseService.child.findFirst({
      where: {
        id,
        tenant_id: tenantId,
      },
    });

    if (!child) {
      throw new NotFoundException(`Child with ID ${id} not found`);
    }

    return this.databaseService.child.update({
      where: { id },
      data: { isActive: false },
    });
  }
}
