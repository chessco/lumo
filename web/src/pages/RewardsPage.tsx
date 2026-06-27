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
            {rewardsData.child.avatar}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Recompensas de {rewardsData.child.firstName}
            </h1>
            <p className="text-gray-600">Logros y premios obtenidos</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="lumo-card-hover">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center mx-auto mb-4">
              <Trophy className="h-8 w-8 text-yellow-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{rewardsData.badges.length}</p>
            <p className="text-sm text-gray-600">Insignias obtenidas</p>
          </CardContent>
        </Card>
        <Card className="lumo-card-hover">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
              <Star className="h-8 w-8 text-purple-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">Nivel {rewardsData.child.level}</p>
            <p className="text-sm text-gray-600">{rewardsData.child.experience} XP</p>
          </CardContent>
        </Card>
        <Card className="lumo-card-hover">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-4">
              <Flame className="h-8 w-8 text-orange-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {rewardsData.milestones.filter(m => m.completed).length}
            </p>
            <p className="text-sm text-gray-600">Hitos completados</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Badges */}
        <Card className="lumo-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-yellow-500" />
              Insignias
            </CardTitle>
            <CardDescription>
              Insignias obtenidas por logros
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {rewardsData.badges.map((badge) => (
                <div key={badge.id} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center text-2xl">
                    {badge.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{badge.name}</p>
                    <p className="text-sm text-gray-600">{badge.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-xs px-2 py-1 rounded-full ${getBadgeTypeColor(badge.type)}`}>
                        {getBadgeTypeLabel(badge.type)}
                      </span>
                      <span className="text-xs text-gray-500">{badge.earnedAt}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Milestones */}
        <Card className="lumo-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-500" />
              Hitos
            </CardTitle>
            <CardDescription>
              Progreso hacia objetivos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {rewardsData.milestones.map((milestone) => (
                <div key={milestone.id} className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${
                      milestone.completed ? 'bg-green-100' : 'bg-gray-100'
                    }`}>
                      {milestone.icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{milestone.name}</p>
                      <p className="text-sm text-gray-600">{milestone.description}</p>
                    </div>
                    {milestone.completed && (
                      <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full ${
                        milestone.completed ? 'bg-green-500' : 'bg-lumo-primary'
                      }`}
                      style={{ width: `${(milestone.progress / milestone.total) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1 text-right">
                    {milestone.progress}/{milestone.total}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Leaderboard */}
      <Card className="lumo-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Tabla de Clasificación
          </CardTitle>
          <CardDescription>
            Ranking de niños por nivel y experiencia
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {rewardsData.leaderboard.map((child, index) => (
              <div key={index} className={`flex items-center gap-4 p-4 rounded-xl ${
                index === 0 ? 'bg-yellow-50' :
                index === 1 ? 'bg-gray-50' :
                index === 2 ? 'bg-orange-50' :
                'bg-white'
              }`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  index === 0 ? 'bg-yellow-100 text-yellow-600' :
                  index === 1 ? 'bg-gray-100 text-gray-600' :
                  index === 2 ? 'bg-orange-100 text-orange-600' :
                  'bg-gray-100 text-gray-400'
                }`}>
                  {child.rank}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{child.name}</p>
                  <p className="text-sm text-gray-600">Nivel {child.level}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-lumo-primary">{child.experience} XP</p>
                  <p className="text-sm text-gray-500">{child.streak} días</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
