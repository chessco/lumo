import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, 
  TrendingUp, 
  Clock, 
  Star, 
  Flame, 
  Calendar,
  BarChart3,
  Award
} from 'lucide-react';

const progressData = {
  child: {
    id: '1',
    firstName: 'Sofía',
    lastName: 'García',
    avatar: '👧',
  },
  stats: {
    totalSessions: 45,
    totalDuration: 1350,
    averageScore: 85,
    currentStreak: 7,
    currentLevel: 5,
    currentExperience: 450,
    experienceToNextLevel: 500,
  },
  dailyProgress: [
    { date: '2026-06-27', sessions: 2, duration: 30, score: 92 },
    { date: '2026-06-26', sessions: 1, duration: 20, score: 88 },
    { date: '2026-06-25', sessions: 1, duration: 15, score: 78 },
    { date: '2026-06-24', sessions: 2, duration: 25, score: 82 },
    { date: '2026-06-23', sessions: 1, duration: 20, score: 85 },
    { date: '2026-06-22', sessions: 1, duration: 15, score: 80 },
    { date: '2026-06-21', sessions: 2, duration: 30, score: 90 },
  ],
  phonemeProgress: [
    { phoneme: 'a', score: 95, attempts: 120 },
    { phoneme: 'e', score: 90, attempts: 115 },
    { phoneme: 'i', score: 88, attempts: 110 },
    { phoneme: 'o', score: 92, attempts: 118 },
    { phoneme: 'u', score: 85, attempts: 105 },
    { phoneme: 'p', score: 78, attempts: 80 },
    { phoneme: 'b', score: 75, attempts: 75 },
    { phoneme: 't', score: 82, attempts: 85 },
  ],
};

export default function ProgressPage() {
  const { childId } = useParams();

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const experiencePercentage = (progressData.stats.currentExperience / progressData.stats.experienceToNextLevel) * 100;

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
          <div className="w-12 h-12 rounded-full bg-lumo-primary/10 flex items-center justify-center text-2xl">
            {progressData.child.avatar}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Progreso de {progressData.child.firstName}
            </h1>
            <p className="text-gray-600">Historial de aprendizaje</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="lumo-card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Nivel</p>
                <p className="text-3xl font-bold text-gray-900">{progressData.stats.currentLevel}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-lumo-primary h-2 rounded-full transition-all duration-500"
                  style={{ width: `${experiencePercentage}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {progressData.stats.currentExperience}/{progressData.stats.experienceToNextLevel} XP
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="lumo-card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Racha</p>
                <p className="text-3xl font-bold text-orange-600">{progressData.stats.currentStreak}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                <Flame className="h-6 w-6 text-orange-600" />
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-4">días consecutivos</p>
          </CardContent>
        </Card>

        <Card className="lumo-card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Sesiones</p>
                <p className="text-3xl font-bold text-gray-900">{progressData.stats.totalSessions}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              {formatDuration(progressData.stats.totalDuration)} total
            </p>
          </CardContent>
        </Card>

        <Card className="lumo-card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Puntuación</p>
                <p className="text-3xl font-bold text-green-600">{progressData.stats.averageScore}%</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-4">promedio</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly progress chart */}
        <Card className="lumo-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-lumo-primary" />
              Progreso Semanal
            </CardTitle>
            <CardDescription>
              Actividad de los últimos 7 días
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {progressData.dailyProgress.map((day, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-20 text-sm text-gray-600">
                    {new Date(day.date).toLocaleDateString('es-ES', { weekday: 'short' })}
                  </div>
                  <div className="flex-1">
                    <div className="w-full bg-gray-100 rounded-full h-6">
                      <div
                        className="bg-lumo-primary h-6 rounded-full flex items-center justify-end pr-2"
                        style={{ width: `${(day.score / 100) * 100}%` }}
                      >
                        <span className="text-xs text-white font-medium">{day.score}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-16 text-right text-sm text-gray-600">
                    {day.sessions} ses.
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Phoneme progress */}
        <Card className="lumo-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-lumo-primary" />
              Progreso por Fonema
            </CardTitle>
            <CardDescription>
              Puntuación promedio por fonema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {progressData.phonemeProgress.map((phoneme, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-lumo-primary/10 flex items-center justify-center font-bold text-lumo-primary">
                    {phoneme.phoneme}
                  </div>
                  <div className="flex-1">
                    <div className="w-full bg-gray-100 rounded-full h-4">
                      <div
                        className={`h-4 rounded-full ${
                          phoneme.score >= 90 ? 'bg-green-500' :
                          phoneme.score >= 70 ? 'bg-blue-500' :
                          phoneme.score >= 50 ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${phoneme.score}%` }}
                      />
                    </div>
                  </div>
                  <div className="w-16 text-right">
                    <p className="text-sm font-semibold">{phoneme.score}%</p>
                    <p className="text-xs text-gray-500">{phoneme.attempts} int.</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Achievements */}
      <Card className="lumo-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-yellow-500" />
            Logros Recientes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 p-4 bg-yellow-50 rounded-xl">
              <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-xl">
                🎯
              </div>
              <div>
                <p className="font-medium text-gray-900">Primera Sesión</p>
                <p className="text-sm text-gray-600">Completada</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-xl">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-xl">
                🔥
              </div>
              <div>
                <p className="font-medium text-gray-900">3 Días Seguidos</p>
                <p className="text-sm text-gray-600">Racha activa</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-xl">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-xl">
                ⭐
              </div>
              <div>
                <p className="font-medium text-gray-900">Nivel 5</p>
                <p className="text-sm text-gray-600">Alcanzado</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-xl">
                📚
              </div>
              <div>
                <p className="font-medium text-gray-900">10 Sesiones</p>
                <p className="text-sm text-gray-600">Completadas</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
