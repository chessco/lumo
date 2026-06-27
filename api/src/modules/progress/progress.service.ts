import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../../common/database/database.service';
import { getTenantId } from '../../common/tenant/tenant.middleware';

@Injectable()
export class ProgressService {
  constructor(private databaseService: DatabaseService) {}

  async getProgress(childId: string) {
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

    const progress = await this.databaseService.speechProgress.findMany({
      where: { childId },
      orderBy: { date: 'desc' },
      take: 30,
    });

    const totalSessions = progress.reduce((sum, p) => sum + p.totalSessions, 0);
    const totalDuration = progress.reduce((sum, p) => sum + p.totalDuration, 0);
    const averageScore = progress.length > 0
      ? progress.reduce((sum, p) => sum + (p.averageScore || 0), 0) / progress.length
      : 0;

    const currentStreak = progress.length > 0 ? progress[0].streakDays : 0;
    const currentLevel = progress.length > 0 ? progress[0].level : 1;
    const currentExperience = progress.length > 0 ? progress[0].experience : 0;

    return {
      childId,
      totalSessions,
      totalDuration,
      averageScore: Math.round(averageScore * 100) / 100,
      currentStreak,
      currentLevel,
      currentExperience,
      dailyProgress: progress,
    };
  }

  async updateDailyProgress(childId: string, sessionDuration: number, sessionScore: number) {
    const tenantId = getTenantId();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existingProgress = await this.databaseService.speechProgress.findFirst({
      where: {
        childId,
        date: today,
      },
    });

    if (existingProgress) {
      const newTotalSessions = existingProgress.totalSessions + 1;
      const newTotalDuration = existingProgress.totalDuration + sessionDuration;
      const newAverageScore = existingProgress.averageScore
        ? (existingProgress.averageScore * existingProgress.totalSessions + sessionScore) / newTotalSessions
        : sessionScore;

      // Calculate streak
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayProgress = await this.databaseService.speechProgress.findFirst({
        where: {
          childId,
          date: yesterday,
        },
      });

      const newStreak = yesterdayProgress ? existingProgress.streakDays + 1 : 1;

      // Calculate level and experience
      const experienceGained = Math.floor(sessionScore / 10);
      const newExperience = existingProgress.experience + experienceGained;
      const newLevel = Math.floor(newExperience / 100) + 1;

      return this.databaseService.speechProgress.update({
        where: { id: existingProgress.id },
        data: {
          totalSessions: newTotalSessions,
          totalDuration: newTotalDuration,
          averageScore: newAverageScore,
          streakDays: newStreak,
          level: newLevel,
          experience: newExperience,
        },
      });
    } else {
      // Check streak from yesterday
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayProgress = await this.databaseService.speechProgress.findFirst({
        where: {
          childId,
          date: yesterday,
        },
      });

      const streak = yesterdayProgress ? yesterdayProgress.streakDays + 1 : 1;
      const experienceGained = Math.floor(sessionScore / 10);
      const level = Math.floor(experienceGained / 100) + 1;

      return this.databaseService.speechProgress.create({
        data: {
          childId,
          tenant_id: tenantId,
          date: today,
          totalSessions: 1,
          totalDuration: sessionDuration,
          averageScore: sessionScore,
          streakDays: streak,
          level,
          experience: experienceGained,
        },
      });
    }
  }

  async getLeaderboard(limit = 10) {
    const tenantId = getTenantId();
    
    const progress = await this.databaseService.speechProgress.findMany({
      where: {
        tenant_id: tenantId,
      },
      include: {
        child: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
      },
      orderBy: [
        { level: 'desc' },
        { experience: 'desc' },
      ],
      take: limit,
    });

    return progress.map((p, index) => ({
      rank: index + 1,
      child: p.child,
      level: p.level,
      experience: p.experience,
      streakDays: p.streakDays,
    }));
  }
}
