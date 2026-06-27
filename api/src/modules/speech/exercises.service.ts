import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../../common/database/database.service';
import { getTenantId } from '../../common/tenant/tenant.middleware';

@Injectable()
export class ExercisesService {
  constructor(private databaseService: DatabaseService) {}

  async create(data: {
    name: string;
    description?: string;
    difficulty?: string;
    category?: string;
    targetPhonemes?: string[];
    content?: any;
  }) {
    const tenantId = getTenantId();
    
    return this.databaseService.speechExercise.create({
      data: {
        ...data,
        tenant_id: tenantId,
        targetPhonemes: data.targetPhonemes ? JSON.stringify(data.targetPhonemes) : null,
      },
    });
  }

  async findAll(filters?: { difficulty?: string; category?: string }) {
    const tenantId = getTenantId();
    
    return this.databaseService.speechExercise.findMany({
      where: {
        tenant_id: tenantId,
        isActive: true,
        ...filters,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string) {
    const exercise = await this.databaseService.speechExercise.findUnique({
      where: { id },
      include: {
        sessions: {
          orderBy: { startedAt: 'desc' },
          take: 10,
        },
      },
    });

    if (!exercise) {
      throw new NotFoundException(`Exercise with ID ${id} not found`);
    }

    return exercise;
  }

  async update(id: string, data: {
    name?: string;
    description?: string;
    difficulty?: string;
    category?: string;
    targetPhonemes?: string[];
    content?: any;
  }) {
    const tenantId = getTenantId();
    
    const exercise = await this.databaseService.speechExercise.findFirst({
      where: {
        id,
        tenant_id: tenantId,
      },
    });

    if (!exercise) {
      throw new NotFoundException(`Exercise with ID ${id} not found`);
    }

    return this.databaseService.speechExercise.update({
      where: { id },
      data: {
        ...data,
        targetPhonemes: data.targetPhonemes ? JSON.stringify(data.targetPhonemes) : undefined,
      },
    });
  }

  async deactivate(id: string) {
    const tenantId = getTenantId();
    
    const exercise = await this.databaseService.speechExercise.findFirst({
      where: {
        id,
        tenant_id: tenantId,
      },
    });

    if (!exercise) {
      throw new NotFoundException(`Exercise with ID ${id} not found`);
    }

    return this.databaseService.speechExercise.update({
      where: { id },
      data: { isActive: false },
    });
  }
}
