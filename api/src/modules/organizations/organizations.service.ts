import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../../common/database/database.service';

@Injectable()
export class OrganizationsService {
  constructor(private databaseService: DatabaseService) {}

  async create(data: { name: string; slug: string; email?: string; phone?: string; address?: string }) {
    return this.databaseService.organization.create({
      data,
    });
  }

  async findAll() {
    return this.databaseService.organization.findMany({
      where: { isActive: true },
    });
  }

  async findById(id: string) {
    const organization = await this.databaseService.organization.findUnique({
      where: { id },
      include: {
        users: {
          include: {
            user: true,
            role: true,
          },
        },
        children: true,
      },
    });

    if (!organization) {
      throw new NotFoundException(`Organization with ID ${id} not found`);
    }

    return organization;
  }

  async findBySlug(slug: string) {
    const organization = await this.databaseService.organization.findUnique({
      where: { slug },
      include: {
        users: {
          include: {
            user: true,
            role: true,
          },
        },
        children: true,
      },
    });

    if (!organization) {
      throw new NotFoundException(`Organization with slug ${slug} not found`);
    }

    return organization;
  }

  async update(id: string, data: { name?: string; email?: string; phone?: string; address?: string; logo?: string }) {
    return this.databaseService.organization.update({
      where: { id },
      data,
    });
  }

  async deactivate(id: string) {
    return this.databaseService.organization.update({
      where: { id },
      data: { isActive: false },
    });
  }
}
