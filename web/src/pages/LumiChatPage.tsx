import React, { useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { 
  ArrowLeft, 
  Send, 
  Mic, 
  MicOff, 
  Image, 
  Smile, 
  Star,
  Sparkles
} from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'lumi';
  timestamp: Date;
  emotion?: string;
}

const lumiResponses = [
  '¡Hola! ¿En qué puedo ayudarte hoy? 🌟',
  '¡Qué alegría verte! ¿Quieres practicar algún fonema? 🎀',
  '¡Excelente pregunta! Voy a ayudarte a entenderlo mejor. ✨',
  '¡Muy bien! Estás progresando muy rápido. ¡Sigue así! 🎉',
  '¡No te preocupes! La práctica hace al maestro. ¡Inténtalo de nuevo! 💪',
  '¡Wow! Esa fue una pronunciación excelente. ¡Eres muy talentoso! ⭐',
  '¡Me encanta tu entusiasmo! Vamos a seguir aprendiendo juntos. 🌈',
  '¡Fantástico! Cada día mejoras más. ¡Estoy muy orgullosa de ti! 🎊',
];

export default function LumiChatPage() {
  const { childId } = useParams();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '¡Hola! Soy Lumi, tu amiga de aprendizaje. 🌟 ¿En qué puedo ayudarte hoy?',
      sender: 'lumi',
      timestamp: new Date(),
      emotion: 'happy',
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const randomResponse = lumiResponses[Math.floor(Math.random() * lumiResponses.length)];
      const lumiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        sender: 'lumi',
        timestamp: new Date(),
        emotion: 'happy',
      };

      setMessages(prev => [...prev, lumiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      toast({
        title: 'Grabación detenida',
        description: 'Tu mensaje de voz ha sido enviado.',
      });
    } else {
      setIsRecording(true);
      toast({
        title: 'Grabando...',
        description: 'Presiona de nuevo para detener.',
      });
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to={`/children/${childId}`}>
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-lumo-primary/10 flex items-center justify-center">
            <Sparkles className="h-6 w-6 text-lumo-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Chat con Lumi</h1>
            <p className="text-gray-600">Tu compañero de aprendizaje IA</p>
          </div>
        </div>
      </div>

      {/* Chat container */}
      <Card className="lumo-card h-[600px] flex flex-col">
        <CardHeader className="border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-lumo-primary/10 flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-lumo-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">Lumi</CardTitle>
              <CardDescription className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                En línea
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        {/* Messages area */}
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-2xl p-4 ${
                  message.sender === 'user'
                    ? 'bg-lumo-primary text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                {message.sender === 'lumi' && (
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-4 w-4 text-lumo-primary" />
                    <span className="font-semibold text-sm">Lumi</span>
                  </div>
                )}
                <p className="text-sm">{message.text}</p>
                <p className={`text-xs mt-2 ${
                  message.sender === 'user' ? 'text-white/70' : 'text-gray-500'
                }`}>
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-2xl p-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-lumo-primary" />
                  <span className="font-semibold text-sm">Lumi</span>
                </div>
                <div className="flex gap-1 mt-2">
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </CardContent>

        {/* Input area */}
        <div className="border-t p-4">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className={isRecording ? 'text-red-500 animate-pulse' : 'text-gray-500'}
              onClick={toggleRecording}
            >
              {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </Button>
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Escribe un mensaje..."
              disabled={isLoading}
              className="flex-1 lumo-input"
            />
            <Button
              className="lumo-button"
              size="icon"
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="lumo-card-hover cursor-pointer" onClick={() => setInputMessage('¿Qué ejercicios puedo practicar hoy?')}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Star className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Ejercicios</p>
                <p className="text-sm text-gray-600">Pregunta por ejercicios</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lumo-card-hover cursor-pointer" onClick={() => setInputMessage('¿Cómo mejoro mi pronunciación?')}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Consejos</p>
                <p className="text-sm text-gray-600">Obtén consejos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lumo-card-hover cursor-pointer" onClick={() => setInputMessage('¡Quiero celebrar mi progreso!')}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                <Star className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Celebrar</p>
                <p className="text-sm text-gray-600">Celebra tus logros</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
