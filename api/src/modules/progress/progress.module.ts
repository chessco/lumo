import { Module } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { ProgressController } from './progress.controller';

@Module({
  controllers: [ProgressController]
})
export class ProgressModule {}
