import { Module } from '@nestjs/common';
import { SpeechService } from './speech.service';
import { SpeechController } from './speech.controller';
import { ExercisesService } from './exercises.service';
import { PhonemesService } from './phonemes.service';

@Module({
  controllers: [SpeechController],
  providers: [
    SpeechService,
    ExercisesService,
    PhonemesService,
  ],
  exports: [
    SpeechService,
    ExercisesService,
    PhonemesService,
  ],
})
export class SpeechModule {}
