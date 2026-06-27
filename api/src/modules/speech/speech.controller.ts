import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { SpeechService } from './speech.service';
import { ExercisesService } from './exercises.service';
import { PhonemesService } from './phonemes.service';
import { AuthGuard } from '../../common/guards/auth.guard';
import { TenantOwnershipGuard } from '../../common/guards/tenant-ownership.guard';

@ApiTags('Speech')
@Controller('speech')
@UseGuards(AuthGuard, TenantOwnershipGuard)
export class SpeechController {
  constructor(
    private speechService: SpeechService,
    private exercisesService: ExercisesService,
    private phonemesService: PhonemesService,
  ) {}

  // ===========================================
  // SESSION ENDPOINTS
  // ===========================================

  @Post('sessions')
  @ApiOperation({ summary: 'Start a new speech session' })
  @ApiResponse({ status: 201, description: 'Session started successfully' })
  async startSession(@Body() body: { childId: string; exerciseId?: string }) {
    return this.speechService.startSession(body.childId, body.exerciseId);
  }

  @Put('sessions/:id/end')
  @ApiOperation({ summary: 'End a speech session' })
  @ApiResponse({ status: 200, description: 'Session ended successfully' })
  async endSession(@Param('id') id: string) {
    return this.speechService.endSession(id);
  }

  @Get('sessions/:id')
  @ApiOperation({ summary: 'Get session details' })
  @ApiResponse({ status: 200, description: 'Session details' })
  async getSession(@Param('id') id: string) {
    return this.speechService.getSession(id);
  }

  @Get('sessions/child/:childId')
  @ApiOperation({ summary: 'Get sessions by child' })
  @ApiResponse({ status: 200, description: 'List of sessions' })
  async getSessionsByChild(@Param('childId') childId: string, @Query('limit') limit?: number) {
    return this.speechService.getSessionsByChild(childId, limit);
  }

  @Post('sessions/:id/phoneme-attempt')
  @ApiOperation({ summary: 'Record a phoneme attempt' })
  @ApiResponse({ status: 201, description: 'Phoneme attempt recorded' })
  async recordPhonemeAttempt(
    @Param('id') sessionId: string,
    @Body() body: { phonemeId: string; audioUrl: string },
  ) {
    return this.speechService.recordPhonemeAttempt(sessionId, body.phonemeId, body.audioUrl);
  }

  @Post('sessions/:id/audio')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload audio recording' })
  @ApiResponse({ status: 201, description: 'Audio uploaded successfully' })
  async uploadAudio(
    @Param('id') sessionId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.speechService.uploadAudioRecording(sessionId, file.buffer, file.originalname);
  }

  // ===========================================
  // EXERCISE ENDPOINTS
  // ===========================================

  @Post('exercises')
  @ApiOperation({ summary: 'Create a new exercise' })
  @ApiResponse({ status: 201, description: 'Exercise created successfully' })
  async createExercise(@Body() body: {
    name: string;
    description?: string;
    difficulty?: string;
    category?: string;
    targetPhonemes?: string[];
    content?: any;
  }) {
    return this.exercisesService.create(body);
  }

  @Get('exercises')
  @ApiOperation({ summary: 'Get all exercises' })
  @ApiResponse({ status: 200, description: 'List of exercises' })
  async getExercises(@Query('difficulty') difficulty?: string, @Query('category') category?: string) {
    return this.exercisesService.findAll({ difficulty, category });
  }

  @Get('exercises/:id')
  @ApiOperation({ summary: 'Get exercise by ID' })
  @ApiResponse({ status: 200, description: 'Exercise details' })
  async getExercise(@Param('id') id: string) {
    return this.exercisesService.findById(id);
  }

  @Put('exercises/:id')
  @ApiOperation({ summary: 'Update exercise' })
  @ApiResponse({ status: 200, description: 'Exercise updated successfully' })
  async updateExercise(@Param('id') id: string, @Body() body: {
    name?: string;
    description?: string;
    difficulty?: string;
    category?: string;
    targetPhonemes?: string[];
    content?: any;
  }) {
    return this.exercisesService.update(id, body);
  }

  @Delete('exercises/:id')
  @ApiOperation({ summary: 'Deactivate exercise' })
  @ApiResponse({ status: 200, description: 'Exercise deactivated successfully' })
  async deactivateExercise(@Param('id') id: string) {
    return this.exercisesService.deactivate(id);
  }

  // ===========================================
  // PHONEME ENDPOINTS
  // ===========================================

  @Post('phonemes')
  @ApiOperation({ summary: 'Create a new phoneme' })
  @ApiResponse({ status: 201, description: 'Phoneme created successfully' })
  async createPhoneme(@Body() body: {
    symbol: string;
    name: string;
    language?: string;
    examples?: string[];
    audioUrl?: string;
  }) {
    return this.phonemesService.create(body);
  }

  @Get('phonemes')
  @ApiOperation({ summary: 'Get all phonemes' })
  @ApiResponse({ status: 200, description: 'List of phonemes' })
  async getPhonemes(@Query('language') language?: string) {
    return this.phonemesService.findAll(language);
  }

  @Get('phonemes/:id')
  @ApiOperation({ summary: 'Get phoneme by ID' })
  @ApiResponse({ status: 200, description: 'Phoneme details' })
  async getPhoneme(@Param('id') id: string) {
    return this.phonemesService.findById(id);
  }

  @Put('phonemes/:id')
  @ApiOperation({ summary: 'Update phoneme' })
  @ApiResponse({ status: 200, description: 'Phoneme updated successfully' })
  async updatePhoneme(@Param('id') id: string, @Body() body: {
    name?: string;
    examples?: string[];
    audioUrl?: string;
  }) {
    return this.phonemesService.update(id, body);
  }

  @Delete('phonemes/:id')
  @ApiOperation({ summary: 'Delete phoneme' })
  @ApiResponse({ status: 200, description: 'Phoneme deleted successfully' })
  async deletePhoneme(@Param('id') id: string) {
    return this.phonemesService.delete(id);
  }

}
