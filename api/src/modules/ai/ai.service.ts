import { Injectable, Logger } from '@nestjs/common';
import { AgentClient } from '../../integrations/pitayacore/clients/agent.client';
import { AiClient } from '../../integrations/pitayacore/clients/ai.client';
import { DatabaseService } from '../../common/database/database.service';
import { getTenantId } from '../../common/tenant/tenant.middleware';

@Injectable()
export class AIService {
  private readonly logger = new Logger(AIService.name);
  private readonly LUMI_AGENT_ID = 'ai';

  constructor(
    private agentClient: AgentClient,
    private aiClient: AiClient,
    private databaseService: DatabaseService,
  ) {}

  async greet(childName: string) {
    const greetings = [
      `¡Hola ${childName}! 🌟 Soy AI, tu amiga de aprendizaje. ¿Estás lista para practicar la pronunciación hoy?`,
      `¡Bienvenida ${childName}! ✨ Me alegra mucho verte. Vamos a mejorar tu pronunciación juntas. ¿Empezamos?`,
      `¡Hola ${childName}! 🎀 Soy AI y estoy aquí para ayudarte. ¿Qué tal si practicamos algunos sonidos divertidos?`,
      `¡${childName}! 🌈 Qué alegría que estés aquí. Hoy vamos a aprender cosas nuevas sobre cómo hablar mejor. ¿Lista?`,
    ];

    const randomIndex = Math.floor(Math.random() * greetings.length);
    return {
      message: greetings[randomIndex],
      audioUrl: null, // TODO: Generate audio greeting
      emotion: 'happy',
    };
  }

  async explainExercise(exerciseName: string, exerciseDescription: string) {
    const prompt = `You are AI, a friendly and encouraging AI companion for children. 
    Explain the exercise "${exerciseName}" to a child in a simple, fun, and encouraging way. 
    The exercise is about: ${exerciseDescription}
    Use simple language, emojis, and make it sound exciting. Keep it short (2-3 sentences max).`;

    const explanation = await this.aiClient.generateText(prompt);

    return {
      message: explanation,
      emotion: 'encouraging',
    };
  }

  async celebrateProgress(childName: string, achievement: string) {
    const celebrations = [
      `¡Increíble ${childName}! 🎉 ${achievement} ¡Eres una campeona!`,
      `¡Wow ${childName}! ⭐ ${achievement} ¡Sigue así!`,
      `¡Fantástico ${childName}! 🌟 ${achievement} ¡Estoy muy orgullosa de ti!`,
      `¡Excelente ${childName}! 🎊 ${achievement} ¡Cada día mejoras más!`,
    ];

    const randomIndex = Math.floor(Math.random() * celebrations.length);
    return {
      message: celebrations[randomIndex],
      emotion: 'celebrating',
    };
  }

  async encourageRepetition(childName: string, phoneme: string) {
    const encouragements = [
      `¡Muy bien ${childName}! 💪 Vamos a intentar decir "${phoneme}" una vez más. ¡Tú puedes!`,
      `¡Casi lo logras ${childName}! 🎯 Intentemos "${phoneme}" otra vez. ¡Cada intento te hace mejor!`,
      `¡Buen trabajo ${childName}! 🌈 Practiquemos "${phoneme}" un poco más. ¡La práctica hace al maestro!`,
      `¡Sigue intentando ${childName}! ✨ "${phoneme}" es un sonido difícil, pero tú puedes lograrlo.`,
    ];

    const randomIndex = Math.floor(Math.random() * encouragements.length);
    return {
      message: encouragements[randomIndex],
      emotion: 'encouraging',
    };
  }

  async providePositiveFeedback(childName: string, score: number) {
    let feedback: string;

    if (score >= 90) {
      feedback = `¡Perfecto ${childName}! 🌟 Tu pronunciación es excelente. ¡Sigue así!`;
    } else if (score >= 70) {
      feedback = `¡Muy bien ${childName}! 👍 Tu pronunciación es muy buena. ¡Sigue practicando!`;
    } else if (score >= 50) {
      feedback = `¡Buen trabajo ${childName}! 💪 Estás mejorando. ¡La práctica hace al maestro!`;
    } else {
      feedback = `¡No te rindas ${childName}! 🌈 Cada intento te acerca más al éxito. ¡Tú puedes!`;
    }

    return {
      message: feedback,
      emotion: score >= 70 ? 'happy' : 'encouraging',
    };
  }

  async chat(childId: string, message: string) {
    const child = await this.databaseService.child.findUnique({
      where: { id: childId },
    });

    if (!child) {
      throw new Error('Child not found');
    }

    const context = {
      childName: child.firstName,
      childAge: child.dateOfBirth
        ? Math.floor((Date.now() - child.dateOfBirth.getTime()) / (365.25 * 24 * 60 * 60 * 1000))
        : null,
      personality: {
        friendly: true,
        encouraging: true,
        patient: true,
        playful: true,
        educational: true,
        emotionallySafe: true,
      },
    };

    const systemPrompt = `You are AI, a friendly, encouraging, patient, playful, educational, and emotionally safe AI companion for children. 
    You are helping ${context.childName}${context.childAge ? ` who is ${context.childAge} years old` : ''} improve their speech and pronunciation.
    Always be positive, supportive, and use age-appropriate language. Use emojis to make conversations fun.
    Keep responses short and engaging. Never be critical or negative.`;

    const response = await this.agentClient.chat(this.LUMI_AGENT_ID, message, {
      systemPrompt,
      childId,
      childName: context.childName,
    });

    return {
      message: response.message || response,
      emotion: 'friendly',
    };
  }

  async getPersonality() {
    return {
      name: 'AI',
      traits: [
        'friendly',
        'encouraging',
        'patient',
        'playful',
        'educational',
        'emotionally safe',
      ],
      capabilities: [
        'greet children',
        'explain exercises',
        'celebrate progress',
        'encourage repetition',
        'provide positive feedback',
      ],
      avatar: '🌟',
    };
  }
}
