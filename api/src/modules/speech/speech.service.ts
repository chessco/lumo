import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { DatabaseService } from '../../common/database/database.service';
import { getTenantId } from '../../common/tenant/tenant.middleware';
import { AiClient } from '../../integrations/pitayacore/clients/ai.client';
import { MediaClient } from '../../integrations/pitayacore/clients/media.client';

@Injectable()
export class SpeechService {
  constructor(
    private databaseService: DatabaseService,
    private aiClient: AiClient,
    private mediaClient: MediaClient,
  ) {}

  async startSession(childId: string, exerciseId?: string) {
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

    return this.databaseService.speechSession.create({
      data: {
        childId,
        tenant_id: tenantId,
        exerciseId,
        status: 'active',
      },
      include: {
        exercise: true,
        child: true,
      },
    });
  }

  async endSession(sessionId: string) {
    const session = await this.databaseService.speechSession.findUnique({
      where: { id: sessionId },
    });

    if (!session) {
      throw new NotFoundException(`Session with ID ${sessionId} not found`);
    }

    if (session.status !== 'active') {
      throw new BadRequestException('Session is not active');
    }

    const duration = Math.floor(
      (new Date().getTime() - session.startedAt.getTime()) / 1000,
    );

    return this.databaseService.speechSession.update({
      where: { id: sessionId },
      data: {
        endedAt: new Date(),
        duration,
        status: 'completed',
      },
      include: {
        phonemeAttempts: true,
        audioRecordings: true,
      },
    });
  }

  async getSession(sessionId: string) {
    const session = await this.databaseService.speechSession.findUnique({
      where: { id: sessionId },
      include: {
        exercise: true,
        child: true,
        phonemeAttempts: {
          include: {
            phoneme: true,
          },
        },
        audioRecordings: true,
      },
    });

    if (!session) {
      throw new NotFoundException(`Session with ID ${sessionId} not found`);
    }

    return session;
  }

  async getSessionsByChild(childId: string, limit = 20) {
    const tenantId = getTenantId();
    
    return this.databaseService.speechSession.findMany({
      where: {
        childId,
        tenant_id: tenantId,
      },
      include: {
        exercise: true,
        phonemeAttempts: {
          include: {
            phoneme: true,
          },
        },
      },
      orderBy: { startedAt: 'desc' },
      take: limit,
    });
  }

  async recordPhonemeAttempt(sessionId: string, phonemeId: string, audioUrl: string) {
    const session = await this.databaseService.speechSession.findUnique({
      where: { id: sessionId },
    });

    if (!session) {
      throw new NotFoundException(`Session with ID ${sessionId} not found`);
    }

    if (session.status !== 'active') {
      throw new BadRequestException('Session is not active');
    }

    // Analyze pronunciation using AI
    const analysis = await this.aiClient.analyzeSpeech(audioUrl);
    
    const score = analysis.score || 0;
    const feedback = analysis.feedback || 'Keep practicing!';

    const attempt = await this.databaseService.phonemeAttempt.create({
      data: {
        sessionId,
        phonemeId,
        score,
        feedback,
        audioUrl,
      },
      include: {
        phoneme: true,
      },
    });

    return attempt;
  }

  async uploadAudioRecording(sessionId: string, file: Buffer, filename: string) {
    const session = await this.databaseService.speechSession.findUnique({
      where: { id: sessionId },
    });

    if (!session) {
      throw new NotFoundException(`Session with ID ${sessionId} not found`);
    }

    // Upload audio to PitayaCore media service
    const uploadResult = await this.mediaClient.uploadAudio(file, filename);
    
    const recording = await this.databaseService.audioRecording.create({
      data: {
        sessionId,
        childId: session.childId,
        fileUrl: uploadResult.url,
        mimeType: 'audio/webm',
        fileSize: file.length,
      },
    });

    return recording;
  }
}
