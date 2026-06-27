import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../../common/database/database.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ParentsService {
  constructor(private databaseService: DatabaseService) {}

  async create(data: { email: string; password: string; firstName?: string; lastName?: string; phone?: string }) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    
    return this.databaseService.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
  }

  async findAll() {
    return this.databaseService.user.findMany({
      where: { isActive: true },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        avatar: true,
        isActive: true,
        createdAt: true,
      },
    });
  }

  async findById(id: string) {
    const user = await this.databaseService.user.findUnique({
      where: { id },
      include: {
        memberships: {
          include: {
            organization: true,
            role: true,
          },
        },
        children: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async findByEmail(email: string) {
    return this.databaseService.user.findUnique({
      where: { email },
    });
  }

  async update(id: string, data: { firstName?: string; lastName?: string; phone?: string; avatar?: string }) {
    return this.databaseService.user.update({
      where: { id },
      data,
    });
  }

  async changePassword(id: string, newPassword: string) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    return this.databaseService.user.update({
      where: { id },
      data: { password: hashedPassword },
    });
  }

  async deactivate(id: string) {
    return this.databaseService.user.update({
      where: { id },
      data: { isActive: false },
    });
  }
}
