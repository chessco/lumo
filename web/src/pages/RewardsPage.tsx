import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, 
  Award, 
  Star, 
  Flame, 
  Target, 
  BookOpen, 
  Mic, 
  Calendar,
  Trophy
} from 'lucide-react';

const rewardsData = {
  child: {
    id: '1',
    firstName: 'Sofía',
    lastName: 'García',
    avatar: '👧',
    level: 5,
    experience: 450,
  },
  badges: [
    { id: '1', name: 'Primera Sesión', description: 'Completó su primera sesión de práctica', icon: '🎯', earnedAt: '2026-06-01', type: 'milestone' },
    { id: '2', name: '3 Días Seguidos', description: 'Practicó 3 días consecutivos', icon: '🔥', earnedAt: '2026-06-03', type: 'streak' },
    { id: '3', name: 'Nivel 5', description: 'Alcanzó el nivel 5', icon: '⭐', earnedAt: '2026-06-20', type: 'level' },
    { id: '4', name: '10 Sesiones', description: 'Completó 10 sesiones de práctica', icon: '📚', earnedAt: '2026-06-15', type: 'milestone' },
    { id: '5', name: 'Puntuación Perfecta', description: 'Obtuvo 100% en un ejercicio', icon: '💯', earnedAt: '2026-06-10', type: 'achievement' },
    { id: '6', name: 'Maestro de Vocales', description: 'Dominó todas las vocales', icon: '🏅', earnedAt: '2026-06-08', type: 'achievement' },
  ],
  milestones: [
    { id: '1', name: 'Primera Semana', description: 'Completar 7 días de práctica', icon: '📅', progress: 7, total: 7, completed: true },
    { id: '2', name: '50 Sesiones', description: 'Completar 50 sesiones de práctica', icon: '🎯', progress: 45, total: 50, completed: false },
    { id: '3', name: 'Nivel 10', description: 'Alcanzar el nivel 10', icon: '🏆', progress: 5, total: 10, completed: false },
    { id: '4', name: '7 Días de Racha', description: 'Mantener una racha de 7 días', icon: '🔥', progress: 7, total: 7, completed: true },
  ],
  leaderboard: [
    { rank: 1, name: 'Sofía', level: 5, experience: 450, streak: 7 },
    { rank: 2, name: 'Carlos', level: 4, experience: 380, streak: 5 },
    { rank: 3, name: 'María', level: 4, experience: 350, streak: 3 },
    { rank: 4, name: 'Juan', level: 2, experience: 150, streak: 1 },
    { rank: 5, name: 'Ana', level: 2, experience: 120, streak: 2 },
  ],
};

export default function RewardsPage() {
  const { childId } = useParams();

  const getBadgeTypeColor = (type: string) => {
    switch (type) {
      case 'milestone': return 'bg-blue-100 text-blue-700';
      case 'streak': return 'bg-orange-100 text-orange-700';
      case 'level': return 'bg-purple-100 text-purple-700';
      case 'achievement': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getBadgeTypeLabel = (type: string) => {
    switch (type) {
      case 'milestone': return 'Hito';
      case 'streak': return 'Racha';
      case 'level': return 'Nivel';
      case 'achievement': return 'Logro';
      default: return type;
    }
  };

  return (
    <div className="space-y-8 bg-gradient-to-b from-yellow-50 via-white to-orange-50 min-h-screen p-6 rounded-3xl">
      {/* Header */}
      <div className="flex items-center gap-4 bg-white p-6 rounded-3xl shadow-sm border-2 border-yellow-100">
        <Link to={`/children/${childId}`}>
          <Button variant="ghost" size="icon" className="hover:bg-yellow-100 rounded-full h-12 w-12">
            <ArrowLeft className="h-6 w-6 text-yellow-700" />
          </Button>
        </Link>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center text-4xl shadow-inner border-2 border-yellow-200">
            {rewardsData.child.avatar}
          </div>
          <div>
            <h1 className="text-4xl font-black text-gray-800 tracking-tight">
              Recompensas de {rewardsData.child.firstName} 🏆
            </h1>
            <p className="text-gray-500 mt-1 font-medium text-lg">Logros y premios obtenidos</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="rounded-3xl border-2 border-yellow-200 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-yellow-50 group">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 rounded-2xl bg-yellow-100 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-inner">
              <Trophy className="h-10 w-10 text-yellow-600" />
            </div>
            <p className="text-5xl font-black text-gray-800">{rewardsData.badges.length}</p>
            <p className="text-md font-bold text-yellow-600 mt-2 uppercase tracking-wider">Insignias obtenidas</p>
          </CardContent>
        </Card>
        <Card className="rounded-3xl border-2 border-purple-200 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-purple-50 group">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 rounded-2xl bg-purple-100 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-inner">
              <Star className="h-10 w-10 text-purple-600" />
            </div>
            <p className="text-5xl font-black text-gray-800">Nivel {rewardsData.child.level}</p>
            <p className="text-md font-bold text-purple-600 mt-2 uppercase tracking-wider">{rewardsData.child.experience} XP</p>
          </CardContent>
        </Card>
        <Card className="rounded-3xl border-2 border-orange-200 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-orange-50 group">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 rounded-2xl bg-orange-100 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-inner">
              <Flame className="h-10 w-10 text-orange-600" />
            </div>
            <p className="text-5xl font-black text-gray-800">
              {rewardsData.milestones.filter(m => m.completed).length}
            </p>
            <p className="text-md font-bold text-orange-600 mt-2 uppercase tracking-wider">Hitos completados</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Badges */}
        <Card className="rounded-3xl border-2 border-yellow-200 shadow-md bg-white">
          <CardHeader className="bg-yellow-50/50 rounded-t-3xl border-b-2 border-yellow-100 pb-6 pt-6">
            <CardTitle className="flex items-center gap-3 text-2xl font-black text-gray-800">
              <div className="p-2 bg-yellow-100 rounded-xl">
                <Award className="h-6 w-6 text-yellow-600" />
              </div>
              Insignias
            </CardTitle>
            <CardDescription className="text-md font-medium mt-2">
              Insignias obtenidas por logros
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {rewardsData.badges.map((badge) => (
                <div key={badge.id} className="flex items-center gap-4 p-5 bg-gray-50 rounded-2xl border-2 border-gray-100 hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-yellow-100 flex items-center justify-center text-3xl">
                    {badge.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-900">{badge.name}</p>
                    <p className="text-xs text-gray-500 font-medium leading-tight mt-1 mb-2">{badge.description}</p>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded-full font-bold ${getBadgeTypeColor(badge.type)}`}>
                        {getBadgeTypeLabel(badge.type)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Milestones */}
        <Card className="rounded-3xl border-2 border-blue-200 shadow-md bg-white">
          <CardHeader className="bg-blue-50/50 rounded-t-3xl border-b-2 border-blue-100 pb-6 pt-6">
            <CardTitle className="flex items-center gap-3 text-2xl font-black text-gray-800">
              <div className="p-2 bg-blue-100 rounded-xl">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
              Hitos
            </CardTitle>
            <CardDescription className="text-md font-medium mt-2">
              Progreso hacia objetivos
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-5">
              {rewardsData.milestones.map((milestone) => (
                <div key={milestone.id} className="p-5 bg-gray-50 rounded-2xl border-2 border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-sm border ${
                      milestone.completed ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'
                    }`}>
                      {milestone.icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-900">{milestone.name}</p>
                      <p className="text-sm text-gray-500 font-medium">{milestone.description}</p>
                    </div>
                    {milestone.completed && (
                      <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center shadow-md">
                        <span className="text-white font-bold">✓</span>
                      </div>
                    )}
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4 shadow-inner overflow-hidden">
                    <div
                      className={`h-4 rounded-full transition-all duration-1000 ease-out ${
                        milestone.completed ? 'bg-green-500' : 'bg-lumo-primary'
                      }`}
                      style={{ width: `${(milestone.progress / milestone.total) * 100}%` }}
                    />
                  </div>
                  <p className="text-sm font-bold text-gray-500 mt-2 text-right">
                    {milestone.progress}/{milestone.total}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Leaderboard */}
      <Card className="rounded-3xl border-2 border-yellow-200 shadow-xl overflow-hidden bg-white">
        <CardHeader className="bg-yellow-50/50 pb-6 pt-6">
          <CardTitle className="flex items-center gap-3 text-2xl font-black text-gray-800">
            <div className="p-2 bg-yellow-100 rounded-xl">
              <Trophy className="h-6 w-6 text-yellow-600" />
            </div>
            Tabla de Clasificación ⭐
          </CardTitle>
          <CardDescription className="text-md font-medium mt-2">
            Ranking de niños por nivel y experiencia
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {rewardsData.leaderboard.map((child, index) => (
              <div key={index} className={`flex items-center gap-5 p-5 rounded-2xl transition-all hover:scale-[1.01] border-2 ${
                index === 0 ? 'bg-yellow-50/80 border-yellow-200 shadow-sm' :
                index === 1 ? 'bg-gray-50/80 border-gray-200 shadow-sm' :
                index === 2 ? 'bg-orange-50/80 border-orange-200 shadow-sm' :
                'bg-white border-transparent hover:border-gray-100'
              }`}>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl shadow-inner ${
                  index === 0 ? 'bg-yellow-100 text-yellow-600' :
                  index === 1 ? 'bg-gray-200 text-gray-600' :
                  index === 2 ? 'bg-orange-100 text-orange-600' :
                  'bg-gray-100 text-gray-400'
                }`}>
                  #{child.rank}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900 text-lg">{child.name}</p>
                  <p className="text-sm font-medium text-gray-500">Nivel {child.level}</p>
                </div>
                <div className="text-right">
                  <p className="font-black text-lg text-lumo-primary">{child.experience} XP</p>
                  <p className="text-sm font-bold text-orange-500">{child.streak} días 🔥</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
