import { useState, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PageHeader from '@/components/shared/PageHeader';
import RewardAnimation from '@/components/shared/RewardAnimation';

const exercises = [
  { id: '1', name: 'Vocales Básicas', description: 'Practica la pronunciación de las vocales A, E, I, O, U', difficulty: 'beginner', icon: '🔤' },
  { id: '2', name: 'Sonidos de Animales', description: 'Aprende a pronunciar los nombres de animales', difficulty: 'beginner', icon: '🐾' },
  { id: '3', name: 'Palabras con P', description: 'Practica palabras que empiezan con P', difficulty: 'intermediate', icon: '📝' },
];

const phonemes = ['a', 'e', 'i', 'o', 'u'];

export default function SpeakSessionPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [currentPhoneme, setCurrentPhoneme] = useState(0);
  const [showReward, setShowReward] = useState(false);
  const [completedCount, setCompletedCount] = useState(0);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const exercise = exercises.find(e => e.id === id) || exercises[0];

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
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        
        // Simulate AI scoring
        setTimeout(() => {
          const randomScore = Math.floor(Math.random() * 30) + 70;
          setScore(randomScore);
          setFeedback(randomScore >= 80 
            ? '¡Excelente pronunciación! Sigue así.' 
            : '¡Buen intento! Intenta repetirlo una vez más.'
          );
          if (randomScore >= 70) {
            setCompletedCount(prev => prev + 1);
          }
        }, 1500);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Microphone error:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const resetRecording = () => {
    setAudioUrl(null);
    setScore(null);
    setFeedback(null);
  };

  const nextPhoneme = () => {
    if (currentPhoneme < phonemes.length - 1) {
      setCurrentPhoneme(currentPhoneme + 1);
      resetRecording();
    } else {
      setShowReward(true);
      setTimeout(() => navigate('/app/speak/results/1'), 2000);
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
    <div className="p-4 md:p-6 max-w-2xl mx-auto">
      {showReward && <RewardAnimation type="xp" amount={50} onComplete={() => setShowReward(false)} />}
      
      <PageHeader 
        title={exercise.name}
        subtitle={`${t('speech.phoneme')} ${currentPhoneme + 1}/${phonemes.length}`}
        backTo="/app/speak"
        icon="mic"
      />

      {/* Phoneme Display */}
      <Card className="mb-6 border-2 border-purple-200">
        <CardHeader className="text-center bg-purple-50">
          <div className="text-8xl font-black text-purple-600 mb-4">
            {phonemes[currentPhoneme]}
          </div>
          <p className="text-gray-600 font-medium">
            {t('speech.repeat')}: "{phonemes[currentPhoneme]}"
          </p>
        </CardHeader>
      </Card>

      {/* Phoneme Progress */}
      <div className="flex justify-center gap-2 mb-6">
        {phonemes.map((phoneme, index) => (
          <div
            key={phoneme}
            className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg transition-all ${
              index === currentPhoneme
                ? 'bg-purple-600 text-white scale-110 shadow-lg'
                : index < currentPhoneme
                ? 'bg-green-400 text-white'
                : 'bg-gray-100 text-gray-400'
            }`}
          >
            {phoneme}
          </div>
        ))}
      </div>

      {/* Recording Controls */}
      <div className="flex justify-center gap-4 mb-6">
        {!isRecording && !audioUrl && (
          <button
            onClick={startRecording}
            className="w-24 h-24 rounded-3xl bg-purple-600 text-white flex flex-col items-center justify-center gap-1 hover:bg-purple-700 transition-colors shadow-lg active:scale-95"
          >
            <span className="material-symbols-outlined text-4xl">mic</span>
            <span className="text-xs font-bold">{t('speech.recording')}</span>
          </button>
        )}

        {isRecording && (
          <button
            onClick={stopRecording}
            className="w-24 h-24 rounded-3xl bg-red-500 text-white flex flex-col items-center justify-center gap-1 animate-pulse shadow-lg"
          >
            <span className="material-symbols-outlined text-4xl">stop</span>
            <span className="text-xs font-bold">Stop</span>
          </button>
        )}

        {audioUrl && !score && (
          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mx-auto mb-2 animate-pulse">
              <span className="material-symbols-outlined text-blue-600 text-3xl">hourglass_empty</span>
            </div>
            <p className="text-sm text-gray-500 font-medium">Analyzing...</p>
          </div>
        )}
      </div>

      {/* Score Display */}
      {score !== null && (
        <Card className="mb-6 border-2 border-gray-100">
          <CardContent className="p-6 text-center">
            <div className="text-5xl mb-3">{getScoreEmoji(score)}</div>
            <div className={`text-4xl font-black ${getScoreColor(score)}`}>{score}%</div>
            <p className="text-gray-600 mt-2 font-medium">{feedback}</p>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      {audioUrl && (
        <div className="flex justify-center gap-3">
          <button
            onClick={resetRecording}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-2xl font-bold hover:bg-gray-200 transition-colors"
          >
            <span className="material-symbols-outlined mr-2">refresh</span>
            {t('speech.tryAgain')}
          </button>
          {score !== null && (
            <button
              onClick={nextPhoneme}
              className="px-6 py-3 bg-purple-600 text-white rounded-2xl font-bold hover:bg-purple-700 transition-colors shadow-md"
            >
              {currentPhoneme < phonemes.length - 1 ? t('speech.next') : t('speech.completed')}
              <span className="material-symbols-outlined ml-2">arrow_forward</span>
            </button>
          )}
        </div>
      )}

      {/* Lumi Encouragement */}
      <Card className="mt-6 bg-gradient-to-r from-purple-50 to-blue-50 border-0">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-2xl shadow-sm">
              🌟
            </div>
            <div>
              <p className="font-bold text-purple-800 text-sm">Lumi dice:</p>
              <p className="text-purple-600 text-sm">
                {score === null
                  ? '¡Presiona el micrófono y di el sonido!'
                  : score >= 80
                  ? '¡Increíble! Sigue así.'
                  : '¡Muy bien! La práctica hace al maestro.'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
