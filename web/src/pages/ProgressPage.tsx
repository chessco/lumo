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
    <div className="space-y-8 bg-gradient-to-b from-blue-50 via-white to-orange-50 min-h-screen p-6 rounded-3xl">
      {/* Header */}
      <div className="flex items-center gap-4 bg-white p-6 rounded-3xl shadow-sm border-2 border-blue-100">
        <Link to={`/children/${childId}`}>
          <Button variant="ghost" size="icon" className="hover:bg-blue-100 rounded-full h-12 w-12">
            <ArrowLeft className="h-6 w-6 text-blue-700" />
          </Button>
        </Link>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-4xl shadow-inner border-2 border-blue-200">
            {progressData.child.avatar}
          </div>
          <div>
            <h1 className="text-4xl font-black text-gray-800 tracking-tight">
              Progreso de {progressData.child.firstName} 🚀
            </h1>
            <p className="text-gray-500 mt-1 font-medium text-lg">Historial de aprendizaje y estadísticas</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="rounded-3xl border-2 border-yellow-200 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-yellow-50 group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-md font-bold text-yellow-600 uppercase tracking-wider">Nivel</p>
                <p className="text-5xl font-black text-gray-800 mt-1">{progressData.stats.currentLevel}</p>
              </div>
              <div className="w-16 h-16 rounded-2xl bg-yellow-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-inner">
                <Star className="h-8 w-8 text-yellow-500 fill-yellow-500" />
              </div>
            </div>
            <div className="mt-6">
              <div className="w-full bg-yellow-200/50 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-yellow-400 h-3 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${experiencePercentage}%` }}
                />
              </div>
              <p className="text-sm text-yellow-700 mt-2 font-bold text-right">
                {progressData.stats.currentExperience}/{progressData.stats.experienceToNextLevel} XP
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-2 border-orange-200 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-orange-50 group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-md font-bold text-orange-600 uppercase tracking-wider">Racha</p>
                <p className="text-5xl font-black text-gray-800 mt-1">{progressData.stats.currentStreak}</p>
              </div>
              <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-inner">
                <Flame className="h-8 w-8 text-orange-500 fill-orange-500" />
              </div>
            </div>
            <p className="text-md text-orange-700 mt-6 font-bold">días consecutivos 🔥</p>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-2 border-blue-200 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-blue-50 group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-md font-bold text-blue-600 uppercase tracking-wider">Sesiones</p>
                <p className="text-5xl font-black text-gray-800 mt-1">{progressData.stats.totalSessions}</p>
              </div>
              <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-inner">
                <Clock className="h-8 w-8 text-blue-500" />
              </div>
            </div>
            <p className="text-md text-blue-700 mt-6 font-bold">
              {formatDuration(progressData.stats.totalDuration)} en total ⏱️
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-2 border-green-200 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-green-50 group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-md font-bold text-green-600 uppercase tracking-wider">Puntuación</p>
                <p className="text-5xl font-black text-gray-800 mt-1">{progressData.stats.averageScore}%</p>
              </div>
              <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-inner">
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
            </div>
            <p className="text-md text-green-700 mt-6 font-bold">promedio global 📈</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Weekly progress chart */}
        <Card className="rounded-3xl border-2 border-indigo-100 shadow-md bg-white">
          <CardHeader className="bg-indigo-50/50 rounded-t-3xl border-b-2 border-indigo-50">
            <CardTitle className="flex items-center gap-3 text-2xl font-black text-gray-800">
              <div className="p-2 bg-indigo-100 rounded-xl">
                <Calendar className="h-6 w-6 text-indigo-600" />
              </div>
              Progreso Semanal
            </CardTitle>
            <CardDescription className="text-md font-medium mt-2">
              Actividad de los últimos 7 días
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-5">
              {progressData.dailyProgress.map((day, index) => (
                <div key={index} className="flex items-center gap-4 group">
                  <div className="w-24 font-bold text-gray-500 group-hover:text-indigo-600 transition-colors">
                    {new Date(day.date).toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric' })}
                  </div>
                  <div className="flex-1">
                    <div className="w-full bg-gray-100 rounded-full h-8 overflow-hidden shadow-inner">
                      <div
                        className="bg-indigo-500 h-8 rounded-full flex items-center justify-end pr-3 transition-all duration-1000 ease-out"
                        style={{ width: `${(day.score / 100) * 100}%` }}
                      >
                        <span className="text-sm text-white font-black">{day.score}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-20 text-right font-bold text-gray-600">
                    {day.sessions} ses.
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Phoneme progress */}
        <Card className="rounded-3xl border-2 border-purple-100 shadow-md bg-white">
          <CardHeader className="bg-purple-50/50 rounded-t-3xl border-b-2 border-purple-50">
            <CardTitle className="flex items-center gap-3 text-2xl font-black text-gray-800">
              <div className="p-2 bg-purple-100 rounded-xl">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
              Progreso por Fonema
            </CardTitle>
            <CardDescription className="text-md font-medium mt-2">
              Puntuación promedio por sonido
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-5">
              {progressData.phonemeProgress.map((phoneme, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center font-black text-2xl text-purple-700 shadow-inner">
                    {phoneme.phoneme}
                  </div>
                  <div className="flex-1">
                    <div className="w-full bg-gray-100 rounded-full h-6 overflow-hidden shadow-inner">
                      <div
                        className={`h-6 rounded-full transition-all duration-1000 ease-out ${
                          phoneme.score >= 90 ? 'bg-green-500' :
                          phoneme.score >= 70 ? 'bg-blue-500' :
                          phoneme.score >= 50 ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${phoneme.score}%` }}
                      />
                    </div>
                  </div>
                  <div className="w-20 text-right">
                    <p className="text-lg font-black text-gray-800">{phoneme.score}%</p>
                    <p className="text-xs text-gray-500 font-bold">{phoneme.attempts} int.</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Achievements */}
      <Card className="rounded-3xl border-2 border-orange-100 shadow-xl overflow-hidden bg-white">
        <CardHeader className="bg-orange-50/50 pb-6 pt-6">
          <CardTitle className="flex items-center gap-3 text-2xl font-black text-gray-800">
            <div className="p-2 bg-orange-100 rounded-xl">
              <Award className="h-6 w-6 text-orange-500" />
            </div>
            Logros Recientes 🏆
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-4 p-5 bg-yellow-50/80 border-2 border-yellow-100 rounded-2xl hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center text-3xl shadow-sm border border-yellow-100">
                🎯
              </div>
              <div>
                <p className="font-bold text-gray-800 text-lg">Primera Sesión</p>
                <p className="text-md text-gray-500 font-medium">Completada</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-5 bg-orange-50/80 border-2 border-orange-100 rounded-2xl hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center text-3xl shadow-sm border border-orange-100">
                🔥
              </div>
              <div>
                <p className="font-bold text-gray-800 text-lg">3 Días Seguidos</p>
                <p className="text-md text-gray-500 font-medium">Racha activa</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-5 bg-purple-50/80 border-2 border-purple-100 rounded-2xl hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center text-3xl shadow-sm border border-purple-100">
                ⭐
              </div>
              <div>
                <p className="font-bold text-gray-800 text-lg">Nivel 5</p>
                <p className="text-md text-gray-500 font-medium">Alcanzado</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-5 bg-blue-50/80 border-2 border-blue-100 rounded-2xl hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center text-3xl shadow-sm border border-blue-100">
                📚
              </div>
              <div>
                <p className="font-bold text-gray-800 text-lg">10 Sesiones</p>
                <p className="text-md text-gray-500 font-medium">Completadas</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
