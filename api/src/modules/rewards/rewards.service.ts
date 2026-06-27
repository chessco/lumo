import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../../common/database/database.service';
import { getTenantId } from '../../common/tenant/tenant.middleware';

@Injectable()
export class RewardsService {
  constructor(private databaseService: DatabaseService) {}

  async createReward(data: {
    childId: string;
    type: string;
    name: string;
    description?: string;
    icon?: string;
    metadata?: any;
  }) {
    const tenantId = getTenantId();
    
    return this.databaseService.speechReward.create({
      data: {
        ...data,
        tenant_id: tenantId,
      },
    });
  }

  async getRewardsByChild(childId: string) {
    const tenantId = getTenantId();
    
    return this.databaseService.speechReward.findMany({
      where: {
        childId,
        tenant_id: tenantId,
      },
      orderBy: { earnedAt: 'desc' },
    });
  }

  async checkAndAwardBadges(childId: string) {
    const tenantId = getTenantId();
    const newBadges: any[] = [];

    // Get child's progress
    const progress = await this.databaseService.speechProgress.findFirst({
      where: {
        childId,
        tenant_id: tenantId,
      },
      orderBy: { date: 'desc' },
    });

    if (!progress) return newBadges;

    // Get existing rewards
    const existingRewards = await this.databaseService.speechReward.findMany({
      where: { childId },
    });

    const existingBadgeNames = existingRewards.map(r => r.name);

    // Check for first session badge
    if (progress.totalSessions >= 1 && !existingBadgeNames.includes('First Steps')) {
      const badge = await this.createReward({
        childId,
        type: 'badge',
        name: 'First Steps',
        description: 'Completed your first speech session!',
        icon: '🎯',
      });
      newBadges.push(badge);
    }

    // Check for streak badges
    if (progress.streakDays >= 3 && !existingBadgeNames.includes('3-Day Streak')) {
      const badge = await this.createReward({
        childId,
        type: 'badge',
        name: '3-Day Streak',
        description: 'Practiced for 3 days in a row!',
        icon: '🔥',
      });
      newBadges.push(badge);
    }

    if (progress.streakDays >= 7 && !existingBadgeNames.includes('Week Warrior')) {
      const badge = await this.createReward({
        childId,
        type: 'badge',
        name: 'Week Warrior',
        description: 'Practiced for 7 days in a row!',
        icon: '⚡',
      });
      newBadges.push(badge);
    }

    // Check for level badges
    if (progress.level >= 5 && !existingBadgeNames.includes('Rising Star')) {
      const badge = await this.createReward({
        childId,
        type: 'badge',
        name: 'Rising Star',
        description: 'Reached level 5!',
        icon: '⭐',
      });
      newBadges.push(badge);
    }

    if (progress.level >= 10 && !existingBadgeNames.includes('Speech Champion')) {
      const badge = await this.createReward({
        childId,
        type: 'badge',
        name: 'Speech Champion',
        description: 'Reached level 10!',
        icon: '🏆',
      });
      newBadges.push(badge);
    }

    // Check for session count badges
    if (progress.totalSessions >= 10 && !existingBadgeNames.includes('Dedicated Learner')) {
      const badge = await this.createReward({
        childId,
        type: 'badge',
        name: 'Dedicated Learner',
        description: 'Completed 10 speech sessions!',
        icon: '📚',
      });
      newBadges.push(badge);
    }

    if (progress.totalSessions >= 50 && !existingBadgeNames.includes('Practice Master')) {
      const badge = await this.createReward({
        childId,
        type: 'badge',
        name: 'Practice Master',
        description: 'Completed 50 speech sessions!',
        icon: '🎓',
      });
      newBadges.push(badge);
    }

    return newBadges;
  }

  async deleteReward(id: string) {
    const reward = await this.databaseService.speechReward.findUnique({
      where: { id },
    });

    if (!reward) {
      throw new NotFoundException(`Reward with ID ${id} not found`);
    }

    return this.databaseService.speechReward.delete({
      where: { id },
    });
  }
}
