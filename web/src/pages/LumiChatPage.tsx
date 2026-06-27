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
    <div className="space-y-8 bg-gradient-to-b from-indigo-50 to-white min-h-screen p-6 rounded-3xl">
      {/* Header */}
      <div className="flex items-center gap-4 bg-white p-6 rounded-3xl shadow-sm border-2 border-indigo-100">
        <Link to={`/children/${childId}`}>
          <Button variant="ghost" size="icon" className="hover:bg-indigo-100 rounded-full h-12 w-12">
            <ArrowLeft className="h-6 w-6 text-indigo-700" />
          </Button>
        </Link>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center">
            <Sparkles className="h-8 w-8 text-indigo-600" />
          </div>
          <div>
            <h1 className="text-4xl font-black text-gray-800 tracking-tight">Chat con Lumi 🤖</h1>
            <p className="text-gray-500 mt-1 font-medium text-lg">Tu compañero de aprendizaje IA</p>
          </div>
        </div>
      </div>

      {/* Chat container */}
      <Card className="rounded-3xl border-4 border-indigo-100 shadow-xl h-[600px] flex flex-col overflow-hidden bg-white/80 backdrop-blur-sm">
        <CardHeader className="border-b-2 border-indigo-50 bg-white/90 pb-4 pt-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-lumo-primary/10 flex items-center justify-center lumi-container">
              <Sparkles className="h-6 w-6 text-lumo-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl font-black text-gray-800">Lumi</CardTitle>
              <CardDescription className="flex items-center gap-2 font-medium text-md mt-1">
                <span className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)] animate-pulse"></span>
                En línea y listo para jugar
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        {/* Messages area */}
        <CardContent className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[75%] rounded-3xl p-5 shadow-sm ${
                  message.sender === 'user'
                    ? 'bg-lumo-primary text-white rounded-br-sm'
                    : 'bg-white border-2 border-gray-100 text-gray-900 rounded-bl-sm'
                }`}
              >
                {message.sender === 'lumi' && (
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="h-5 w-5 text-lumo-primary" />
                    <span className="font-bold text-md text-lumo-primary">Lumi</span>
                  </div>
                )}
                <p className="text-lg font-medium leading-relaxed">{message.text}</p>
                <p className={`text-xs mt-3 font-bold ${
                  message.sender === 'user' ? 'text-white/80' : 'text-gray-400'
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
        <div className="border-t-2 border-indigo-50 p-6 bg-white">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className={`h-14 w-14 rounded-2xl transition-all ${isRecording ? 'bg-red-100 text-red-500 animate-pulse' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
              onClick={toggleRecording}
            >
              {isRecording ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
            </Button>
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Escribe un mensaje aquí..."
              disabled={isLoading}
              className="flex-1 h-14 rounded-2xl border-2 border-gray-200 text-lg shadow-sm px-6 bg-gray-50/50 focus:bg-white transition-colors"
            />
            <Button
              className="bg-lumo-primary text-white hover:bg-lumo-primary/90 btn-3d rounded-2xl h-14 w-14"
              size="icon"
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
            >
              <Send className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="rounded-3xl border-2 border-blue-100 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white cursor-pointer group" onClick={() => setInputMessage('¿Qué ejercicios puedo practicar hoy?')}>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Star className="h-7 w-7 text-blue-600" />
              </div>
              <div>
                <p className="font-bold text-xl text-gray-800">Ejercicios</p>
                <p className="text-md text-gray-500 font-medium">Pregunta por ejercicios</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-2 border-green-100 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white cursor-pointer group" onClick={() => setInputMessage('¿Cómo mejoro mi pronunciación?')}>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="h-7 w-7 text-green-600" />
              </div>
              <div>
                <p className="font-bold text-xl text-gray-800">Consejos</p>
                <p className="text-md text-gray-500 font-medium">Obtén consejos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-2 border-purple-100 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white cursor-pointer group" onClick={() => setInputMessage('¡Quiero celebrar mi progreso!')}>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Star className="h-7 w-7 text-purple-600" />
              </div>
              <div>
                <p className="font-bold text-xl text-gray-800">Celebrar</p>
                <p className="text-md text-gray-500 font-medium">Celebra tus logros</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
