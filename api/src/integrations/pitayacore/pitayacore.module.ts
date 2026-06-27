import { Global, Module } from '@nestjs/common';
import { PitayaCoreService } from './pitayacore.service';
import { AuthClient } from './clients/auth.client';
import { AiClient } from './clients/ai.client';
import { AgentClient } from './clients/agent.client';
import { MemoryClient } from './clients/memory.client';
import { MediaClient } from './clients/media.client';
import { NotificationClient } from './clients/notification.client';
import { KnowledgeClient } from './clients/knowledge.client';
import { FileClient } from './clients/file.client';
import { AuditClient } from './clients/audit.client';

@Global()
@Module({
  providers: [
    PitayaCoreService,
    AuthClient,
    AiClient,
    AgentClient,
    MemoryClient,
    MediaClient,
    NotificationClient,
    KnowledgeClient,
    FileClient,
    AuditClient,
  ],
  exports: [
    PitayaCoreService,
    AuthClient,
    AiClient,
    AgentClient,
    MemoryClient,
    MediaClient,
    NotificationClient,
    KnowledgeClient,
    FileClient,
    AuditClient,
  ],
})
export class PitayaCoreModule {}
