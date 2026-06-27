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
    <div className="space-y-8 bg-gradient-to-b from-purple-50 to-white min-h-screen p-6 rounded-3xl">
      {/* Header */}
      <div className="flex items-center gap-4 bg-white p-6 rounded-3xl shadow-sm border-2 border-purple-100">
        <Link to="/children">
          <Button variant="ghost" size="icon" className="hover:bg-purple-100 rounded-full h-12 w-12">
            <ArrowLeft className="h-6 w-6 text-purple-700" />
          </Button>
        </Link>
        <div>
          <h1 className="text-4xl font-black text-gray-800 tracking-tight">Sesión de Práctica 🎤</h1>
          <p className="text-gray-500 mt-2 font-medium text-lg">Mejora tu pronunciación con Lumi</p>
        </div>
      </div>

      {!selectedExercise ? (
        /* Exercise selection */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exercises.map((exercise) => (
            <Card 
              key={exercise.id} 
              className="rounded-3xl border-2 border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white cursor-pointer group"
              onClick={() => setSelectedExercise(exercise.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Volume2 className="h-8 w-8 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-gray-800">{exercise.name}</h3>
                    <span className={`text-xs px-3 py-1.5 rounded-full font-bold ${
                      exercise.difficulty === 'beginner' ? 'bg-green-100 text-green-700' :
                      exercise.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {exercise.difficulty === 'beginner' ? 'Principiante' :
                       exercise.difficulty === 'intermediate' ? 'Intermedio' : 'Avanzado'}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 font-medium">{exercise.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        /* Recording interface */
        <div className="max-w-3xl mx-auto">
          <Card className="rounded-3xl border-4 border-lumo-primary shadow-xl overflow-hidden">
            <CardHeader className="text-center bg-purple-50 pb-8 pt-8">
              <CardTitle className="text-3xl font-black text-gray-800">
                Practica el fonema: <span className="text-lumo-primary text-6xl block mt-4 drop-shadow-md">{phonemes[currentPhoneme]}</span>
              </CardTitle>
              <CardDescription className="text-lg font-medium mt-4">
                Di el sonido "{phonemes[currentPhoneme]}" en voz alta
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-10 pt-8 pb-10">
              {/* Phoneme progress */}
              <div className="flex justify-center gap-3">
                {phonemes.map((phoneme, index) => (
                  <div
                    key={phoneme}
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-2xl transition-all duration-500 ${
                      index === currentPhoneme
                        ? 'bg-lumo-primary text-white scale-125 shadow-lg shadow-purple-200'
                        : index < currentPhoneme
                        ? 'bg-green-400 text-white shadow-inner'
                        : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    {phoneme}
                  </div>
                ))}
              </div>

              {/* Recording controls */}
              <div className="flex justify-center gap-6">
                {!isRecording && !audioBlob && (
                  <Button
                    size="xl"
                    className="bg-lumo-primary hover:bg-lumo-primary/90 btn-3d w-32 h-32 rounded-[2rem] flex flex-col items-center justify-center gap-2"
                    onClick={startRecording}
                  >
                    <Mic className="h-12 w-12 text-white" />
                    <span className="text-white font-bold text-lg">Grabar</span>
                  </Button>
                )}

                {isRecording && (
                  <Button
                    size="xl"
                    variant="destructive"
                    className="w-32 h-32 rounded-[2rem] animate-pulse flex flex-col items-center justify-center gap-2 shadow-xl shadow-red-200"
                    onClick={stopRecording}
                  >
                    <Square className="h-12 w-12" />
                    <span className="font-bold text-lg">Detener</span>
                  </Button>
                )}

                {audioBlob && (
                  <>
                    {!isPlaying ? (
                      <Button
                        size="xl"
                        className="bg-green-500 hover:bg-green-600 btn-3d w-32 h-32 rounded-[2rem] flex flex-col items-center justify-center gap-2"
                        onClick={playAudio}
                      >
                        <Play className="h-12 w-12 text-white ml-2" />
                        <span className="text-white font-bold text-lg">Escuchar</span>
                      </Button>
                    ) : (
                      <Button
                        size="xl"
                        variant="outline"
                        className="w-32 h-32 rounded-[2rem] border-4 border-gray-200 text-gray-600 flex flex-col items-center justify-center gap-2"
                        onClick={pauseAudio}
                      >
                        <Pause className="h-12 w-12" />
                        <span className="font-bold text-lg">Pausar</span>
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
              <div className="flex justify-center gap-4 mt-8">
                {audioBlob && (
                  <>
                    <Button
                      variant="outline"
                      className="rounded-2xl h-14 px-6 border-2 border-gray-200 text-gray-600 font-bold hover:bg-gray-50"
                      onClick={resetRecording}
                    >
                      <RotateCcw className="mr-2 h-5 w-5" />
                      Intentar de nuevo
                    </Button>
                    {currentPhoneme < phonemes.length - 1 ? (
                      <Button
                        className="bg-lumo-primary text-white hover:bg-lumo-primary/90 btn-3d rounded-2xl h-14 px-8 font-bold text-lg"
                        onClick={nextPhoneme}
                      >
                        Siguiente fonema
                      </Button>
                    ) : (
                      <Link to="/children">
                        <Button className="bg-green-500 text-white hover:bg-green-600 btn-3d rounded-2xl h-14 px-8 font-bold text-lg">
                          <CheckCircle className="mr-2 h-6 w-6" />
                          ¡Completar sesión!
                        </Button>
                      </Link>
                    )}
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Lumi encouragement */}
          <Card className="mt-8 rounded-3xl bg-gradient-to-r from-purple-100 via-pink-50 to-orange-50 border-0 shadow-lg lumi-container">
            <CardContent className="p-8">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-white shadow-inner flex items-center justify-center text-4xl">
                  🌟
                </div>
                <div>
                  <h3 className="font-black text-2xl text-purple-900">Lumi dice:</h3>
                  <p className="text-purple-700 mt-2 font-medium text-lg leading-relaxed">
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
