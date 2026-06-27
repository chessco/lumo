import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { DatabaseModule } from './common/database/database.module';
import { TenantMiddleware } from './common/tenant/tenant.middleware';
import { AuthModule } from './modules/auth/auth.module';
import { OrganizationsModule } from './modules/organizations/organizations.module';
import { ParentsModule } from './modules/parents/parents.module';
import { ChildrenModule } from './modules/children/children.module';
import { SpeechModule } from './modules/speech/speech.module';
import { PitayaCoreModule } from './integrations/pitayacore/pitayacore.module';
import { AIModule } from './modules/ai/ai.module';
import { ReadingModule } from './modules/reading/reading.module';
import { LanguagesModule } from './modules/languages/languages.module';
import { StoriesModule } from './modules/stories/stories.module';
import { RewardsModule } from './modules/rewards/rewards.module';
import { ProgressModule } from './modules/progress/progress.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100,
      },
    ]),
    DatabaseModule,
    AuthModule,
    OrganizationsModule,
    ParentsModule,
    ChildrenModule,
    SpeechModule,
    PitayaCoreModule,
    AIModule,
    ReadingModule,
    LanguagesModule,
    StoriesModule,
    RewardsModule,
    ProgressModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TenantMiddleware).forRoutes('*');
  }
}
