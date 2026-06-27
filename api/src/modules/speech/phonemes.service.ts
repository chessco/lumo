import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../../common/database/database.service';

@Injectable()
export class PhonemesService {
  constructor(private databaseService: DatabaseService) {}

  async create(data: {
    symbol: string;
    name: string;
    language?: string;
    examples?: string[];
    audioUrl?: string;
  }) {
    return this.databaseService.phoneme.create({
      data: {
        ...data,
        examples: data.examples ? JSON.stringify(data.examples) : null,
      },
    });
  }

  async findAll(language?: string) {
    return this.databaseService.phoneme.findMany({
      where: language ? { language } : undefined,
      orderBy: { symbol: 'asc' },
    });
  }

  async findById(id: string) {
    const phoneme = await this.databaseService.phoneme.findUnique({
      where: { id },
      include: {
        attempts: {
          orderBy: { attemptedAt: 'desc' },
          take: 20,
        },
      },
    });

    if (!phoneme) {
      throw new NotFoundException(`Phoneme with ID ${id} not found`);
    }

    return phoneme;
  }

  async findBySymbol(symbol: string) {
    return this.databaseService.phoneme.findUnique({
      where: { symbol },
    });
  }

  async update(id: string, data: {
    name?: string;
    examples?: string[];
    audioUrl?: string;
  }) {
    const phoneme = await this.databaseService.phoneme.findUnique({
      where: { id },
    });

    if (!phoneme) {
      throw new NotFoundException(`Phoneme with ID ${id} not found`);
    }

    return this.databaseService.phoneme.update({
      where: { id },
      data: {
        ...data,
        examples: data.examples ? JSON.stringify(data.examples) : undefined,
      },
    });
  }

  async delete(id: string) {
    const phoneme = await this.databaseService.phoneme.findUnique({
      where: { id },
    });

    if (!phoneme) {
      throw new NotFoundException(`Phoneme with ID ${id} not found`);
    }

    return this.databaseService.phoneme.delete({
      where: { id },
    });
  }
}
