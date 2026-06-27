import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const missions = [
  {
    id: '1',
    type: 'speech',
    title: 'Practice R Sounds',
    description: 'Say 5 words with the R sound',
    icon: 'mic',
    completed: false,
    xp: 50,
    href: '/app/speak/session/1',
  },
  {
    id: '2',
    type: 'story',
    title: 'Read a Story',
    description: 'Read "The Magic Garden" story',
    icon: 'auto_stories',
    completed: false,
    xp: 75,
    href: '/app/stories/read/1',
  },
  {
    id: '3',
    type: 'language',
    title: 'Learn 3 English Words',
    description: 'Practice animal names in English',
    icon: 'translate',
    completed: false,
    xp: 50,
    href: '/app/languages',
  },
];

export default function DailyAdventurePage() {
  const { t } = useTranslation();

  const completedCount = missions.filter(m => m.completed).length;
  const totalXP = missions.reduce((sum, m) => sum + m.xp, 0);

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-md">
            <span className="material-symbols-outlined text-white text-2xl">auto_awesome</span>
          </div>
          <div>
            <h1 className="text-3xl font-black text-gray-800">Daily Adventure</h1>
            <p className="text-gray-500 font-medium">Complete all missions for bonus rewards!</p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8 p-5 bg-white rounded-2xl border-2 border-purple-100 shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <span className="font-bold text-gray-700">Today's Progress</span>
          <span className="text-sm font-bold text-purple-600">{completedCount}/{missions.length} missions</span>
        </div>
        <div className="h-4 bg-gray-100 rounded-full overflow-hidden shadow-inner">
          <div 
            className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-1000"
            style={{ width: `${(completedCount / missions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Missions */}
      <div className="space-y-4 mb-8">
        {missions.map((mission, index) => (
          <Link
            key={mission.id}
            to={mission.href}
            className={`block p-5 rounded-2xl border-2 transition-all duration-300 ${
              mission.completed
                ? 'bg-green-50 border-green-200'
                : 'bg-white border-gray-100 hover:border-purple-200 hover:shadow-md'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                mission.completed
                  ? 'bg-green-500'
                  : 'bg-purple-100'
              }`}>
                {mission.completed ? (
                  <span className="material-symbols-outlined text-white text-2xl">check</span>
                ) : (
                  <span className="material-symbols-outlined text-purple-600 text-2xl">{mission.icon}</span>
                )}
              </div>
              <div className="flex-1">
                <h3 className={`font-bold text-lg ${mission.completed ? 'text-green-700' : 'text-gray-800'}`}>
                  {mission.title}
                </h3>
                <p className={`text-sm font-medium ${mission.completed ? 'text-green-600' : 'text-gray-500'}`}>
                  {mission.description}
                </p>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                mission.completed
                  ? 'bg-green-100 text-green-700'
                  : 'bg-purple-100 text-purple-700'
              }`}>
                +{mission.xp} XP
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Reward Preview */}
      <div className="p-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl text-white shadow-xl">
        <div className="flex items-center gap-3 mb-3">
          <span className="material-symbols-outlined text-4xl">emoji_events</span>
          <div>
            <h2 className="text-2xl font-black">Completion Reward</h2>
            <p className="text-yellow-100 font-medium">Complete all missions to earn:</p>
          </div>
        </div>
        <div className="flex gap-4 mt-4">
          <div className="flex-1 p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
            <p className="text-3xl font-black">+{totalXP}</p>
            <p className="text-sm font-bold text-yellow-100">Bonus XP</p>
          </div>
          <div className="flex-1 p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
            <p className="text-3xl font-black">⭐</p>
            <p className="text-sm font-bold text-yellow-100">Star Crystal</p>
          </div>
        </div>
      </div>
    </div>
  );
}
