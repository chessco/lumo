import React, { useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { 
  Mic, 
  MicOff, 
  Play, 
  Pause, 
  Square, 
  RotateCcw, 
  CheckCircle, 
  ArrowLeft,
  Volume2,
  Star
} from 'lucide-react';

const exercises = [
  { id: '1', name: 'Vocales Básicas', description: 'Practica la pronunciación de las vocales A, E, I, O, U', difficulty: 'beginner' },
  { id: '2', name: 'Sonidos de Animales', description: 'Aprende a pronunciar los nombres de animales', difficulty: 'beginner' },
  { id: '3', name: 'Palabras con P', description: 'Practica palabras que empiezan con P', difficulty: 'intermediate' },
];

export default function SpeechSessionPage() {
  const { childId } = useParams();
  const { toast } = useToast();
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [currentPhoneme, setCurrentPhoneme] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const phonemes = ['a', 'e', 'i', 'o', 'u'];

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioBlob(audioBlob);
        setAudioUrl(audioUrl);
        
        // Simulate AI scoring
        setTimeout(() => {
          const randomScore = Math.floor(Math.random() * 30) + 70;
          setScore(randomScore);
          setFeedback(randomScore >= 80 
            ? '¡Excelente pronunciación! Sigue así.' 
            : '¡Buen intento! Intenta repetirlo una vez más.'
          );
        }, 1500);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error de micrófono',
        description: 'No se pudo acceder al micrófono. Por favor, verifica los permisos.',
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const resetRecording = () => {
    setAudioBlob(null);
    setAudioUrl(null);
    setScore(null);
    setFeedback(null);
  };

  const nextPhoneme = () => {
    if (currentPhoneme < phonemes.length - 1) {
      setCurrentPhoneme(currentPhoneme + 1);
      resetRecording();
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-500';
    if (score >= 70) return 'text-blue-500';
    if (score >= 50) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreEmoji = (score: number) => {
    if (score >= 90) return '🌟';
    if (score >= 70) return '👍';
    if (score >= 50) return '💪';
    return '🌈';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/children">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sesión de Práctica</h1>
          <p className="text-gray-600">Mejora tu pronunciación con Lumi</p>
        </div>
      </div>

      {!selectedExercise ? (
        /* Exercise selection */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exercises.map((exercise) => (
            <Card 
              key={exercise.id} 
              className="lumo-card-hover cursor-pointer"
              onClick={() => setSelectedExercise(exercise.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-lumo-primary/10 flex items-center justify-center">
                    <Volume2 className="h-6 w-6 text-lumo-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{exercise.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      exercise.difficulty === 'beginner' ? 'bg-green-100 text-green-700' :
                      exercise.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {exercise.difficulty === 'beginner' ? 'Principiante' :
                       exercise.difficulty === 'intermediate' ? 'Intermedio' : 'Avanzado'}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{exercise.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        /* Recording interface */
        <div className="max-w-2xl mx-auto">
          <Card className="lumo-card">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">
                Practica el fonema: <span className="text-lumo-primary text-4xl">{phonemes[currentPhoneme]}</span>
              </CardTitle>
              <CardDescription>
                Di el sonido "{phonemes[currentPhoneme]}" en voz alta
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Phoneme progress */}
              <div className="flex justify-center gap-2">
                {phonemes.map((phoneme, index) => (
                  <div
                    key={phoneme}
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      index === currentPhoneme
                        ? 'bg-lumo-primary text-white'
                        : index < currentPhoneme
                        ? 'bg-green-100 text-green-600'
                        : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    {phoneme}
                  </div>
                ))}
              </div>

              {/* Recording controls */}
              <div className="flex justify-center gap-4">
                {!isRecording && !audioBlob && (
                  <Button
                    size="xl"
                    className="lumo-button w-20 h-20 rounded-full"
                    onClick={startRecording}
                  >
                    <Mic className="h-8 w-8" />
                  </Button>
                )}

                {isRecording && (
                  <Button
                    size="xl"
                    variant="destructive"
                    className="w-20 h-20 rounded-full animate-pulse"
                    onClick={stopRecording}
                  >
                    <Square className="h-8 w-8" />
                  </Button>
                )}

                {audioBlob && (
                  <>
                    {!isPlaying ? (
                      <Button
                        size="xl"
                        className="lumo-button w-20 h-20 rounded-full"
                        onClick={playAudio}
                      >
                        <Play className="h-8 w-8" />
                      </Button>
                    ) : (
                      <Button
                        size="xl"
                        variant="outline"
                        className="w-20 h-20 rounded-full"
                        onClick={pauseAudio}
                      >
                        <Pause className="h-8 w-8" />
                      </Button>
                    )}
                  </>
                )}
              </div>

              {/* Audio element */}
              {audioUrl && (
                <audio
                  ref={audioRef}
                  src={audioUrl}
                  onEnded={() => setIsPlaying(false)}
                />
              )}

              {/* Score and feedback */}
              {score !== null && (
                <div className="text-center space-y-4">
                  <div className="text-6xl">{getScoreEmoji(score)}</div>
                  <div className={`text-5xl font-bold ${getScoreColor(score)}`}>
                    {score}%
                  </div>
                  <p className="text-lg text-gray-600">{feedback}</p>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex justify-center gap-4">
                {audioBlob && (
                  <>
                    <Button
                      variant="outline"
                      className="lumo-button-secondary"
                      onClick={resetRecording}
                    >
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Intentar de nuevo
                    </Button>
                    {currentPhoneme < phonemes.length - 1 ? (
                      <Button
                        className="lumo-button"
                        onClick={nextPhoneme}
                      >
                        Siguiente fonema
                      </Button>
                    ) : (
                      <Link to="/children">
                        <Button className="lumo-button">
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Completar sesión
                        </Button>
                      </Link>
                    )}
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Lumi encouragement */}
          <Card className="mt-6 bg-gradient-to-r from-purple-50 to-pink-50">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-lumo-primary/10 flex items-center justify-center text-2xl">
                  🌟
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Lumi dice:</h3>
                  <p className="text-gray-600 mt-1">
                    {score === null
                      ? '¡Hola! Estoy aquí para ayudarte. Presiona el micrófono y di el sonido que ves arriba.'
                      : score >= 80
                      ? '¡Increíble! Tu pronunciación es excelente. ¡Sigue así!'
                      : '¡Muy bien! La práctica hace al maestro. ¡Inténtalo de nuevo!'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
