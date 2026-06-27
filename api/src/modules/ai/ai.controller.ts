import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AIService } from './ai.service';
import { AuthGuard } from '../../common/guards/auth.guard';
import { TenantOwnershipGuard } from '../../common/guards/tenant-ownership.guard';

@ApiTags('AI AI Companion')
@Controller('ai')
@UseGuards(AuthGuard, TenantOwnershipGuard)
export class AIController {
  constructor(private aiService: AIService) {}

  @Post('greet')
  @ApiOperation({ summary: 'Get a greeting from AI' })
  @ApiResponse({ status: 200, description: 'Greeting message' })
  async greet(@Body() body: { childName: string }) {
    return this.aiService.greet(body.childName);
  }

  @Post('explain-exercise')
  @ApiOperation({ summary: 'Get exercise explanation from AI' })
  @ApiResponse({ status: 200, description: 'Exercise explanation' })
  async explainExercise(@Body() body: { exerciseName: string; exerciseDescription: string }) {
    return this.aiService.explainExercise(body.exerciseName, body.exerciseDescription);
  }

  @Post('celebrate')
  @ApiOperation({ summary: 'Get celebration message from AI' })
  @ApiResponse({ status: 200, description: 'Celebration message' })
  async celebrate(@Body() body: { childName: string; achievement: string }) {
    return this.aiService.celebrateProgress(body.childName, body.achievement);
  }

  @Post('encourage')
  @ApiOperation({ summary: 'Get encouragement from AI' })
  @ApiResponse({ status: 200, description: 'Encouragement message' })
  async encourage(@Body() body: { childName: string; phoneme: string }) {
    return this.aiService.encourageRepetition(body.childName, body.phoneme);
  }

  @Post('feedback')
  @ApiOperation({ summary: 'Get positive feedback from AI' })
  @ApiResponse({ status: 200, description: 'Feedback message' })
  async feedback(@Body() body: { childName: string; score: number }) {
    return this.aiService.providePositiveFeedback(body.childName, body.score);
  }

  @Post('chat/:childId')
  @ApiOperation({ summary: 'Chat with AI' })
  @ApiResponse({ status: 200, description: 'Chat response' })
  async chat(@Param('childId') childId: string, @Body() body: { message: string }) {
    return this.aiService.chat(childId, body.message);
  }

  @Get('personality')
  @ApiOperation({ summary: 'Get AI personality details' })
  @ApiResponse({ status: 200, description: 'Personality information' })
  async getPersonality() {
    return this.aiService.getPersonality();
  }
}
