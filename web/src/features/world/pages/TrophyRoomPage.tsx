import { useTranslation } from 'react-i18next';
import PageHeader from '@/components/shared/PageHeader';

const trophies = [
  { id: '1', name: 'First Steps', description: 'Complete your first session', icon: '🎯', earned: true, date: '2026-06-01' },
  { id: '2', name: '3 Day Streak', description: 'Practice 3 days in a row', icon: '🔥', earned: true, date: '2026-06-03' },
  { id: '3', name: 'Level 5', description: 'Reach level 5', icon: '⭐', earned: true, date: '2026-06-20' },
  { id: '4', name: '10 Sessions', description: 'Complete 10 practice sessions', icon: '📚', earned: true, date: '2026-06-15' },
  { id: '5', name: 'Perfect Score', description: 'Get 100% on an exercise', icon: '💯', earned: true, date: '2026-06-10' },
  { id: '6', name: 'Vowel Master', description: 'Master all vowels', icon: '🏅', earned: true, date: '2026-06-08' },
  { id: '7', name: '7 Day Streak', description: 'Practice 7 days in a row', icon: '🔥', earned: false, progress: 5, total: 7 },
  { id: '8', name: '50 Sessions', description: 'Complete 50 sessions', icon: '📚', earned: false, progress: 45, total: 50 },
  { id: '9', name: 'Level 10', description: 'Reach level 10', icon: '⭐', earned: false, progress: 5, total: 10 },
];

export default function TrophyRoomPage() {
  const { t } = useTranslation();

  const earnedTrophies = trophies.filter(t => t.earned);
  const lockedTrophies = trophies.filter(t => !t.earned);

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto">
      <PageHeader 
        title="Trophy Room"
        subtitle={`${earnedTrophies.length} trophies earned`}
        backTo="/app/world"
        icon="emoji_events"
      />

      {/* Earned Trophies */}
      <div className="mb-8">
        <h3 className="font-bold text-lg mb-4 text-gray-800">Earned Trophies</h3>
        <div className="grid grid-cols-3 gap-3">
          {earnedTrophies.map((trophy) => (
            <div key={trophy.id} className="bg-white rounded-2xl border-2 border-yellow-200 p-4 text-center shadow-sm">
              <div className="text-3xl mb-2">{trophy.icon}</div>
              <h4 className="font-bold text-sm text-gray-800">{trophy.name}</h4>
              <p className="text-xs text-gray-500 mt-1">{trophy.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Locked Trophies */}
      <div>
        <h3 className="font-bold text-lg mb-4 text-gray-800">Locked Trophies</h3>
        <div className="grid grid-cols-3 gap-3">
          {lockedTrophies.map((trophy) => (
            <div key={trophy.id} className="bg-gray-50 rounded-2xl border-2 border-gray-200 p-4 text-center opacity-60">
              <div className="text-3xl mb-2 grayscale">{trophy.icon}</div>
              <h4 className="font-bold text-sm text-gray-600">{trophy.name}</h4>
              <p className="text-xs text-gray-400 mt-1">{trophy.description}</p>
              {trophy.progress !== undefined && (
                <div className="mt-2">
                  <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-purple-400 rounded-full"
                      style={{ width: `${(trophy.progress / trophy.total!) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{trophy.progress}/{trophy.total}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
