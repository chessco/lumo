import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PageHeader from '@/components/shared/PageHeader';
import ProgressRing from '@/components/shared/ProgressRing';

const childData = {
  id: '1',
  name: 'Sofía García',
  avatar: '👧',
  level: 5,
  experience: 450,
  streak: 7,
  totalSessions: 45,
  totalDuration: '12h 45m',
  averageScore: 85,
  weeklyProgress: [65, 70, 75, 80, 85, 82, 88],
};

export default function ProgressPage() {
  const { childId } = useParams();
  const { t } = useTranslation();

  return (
    <div className="p-4 md:p-6">
      <PageHeader 
        title={childData.name}
        subtitle={t('progress.title')}
        backTo="/parent/children"
        icon="trending_up"
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-2xl border-2 border-gray-100 text-center">
          <p className="text-2xl font-black text-purple-600">{childData.level}</p>
          <p className="text-xs text-gray-500 font-medium">{t('progress.level')}</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border-2 border-gray-100 text-center">
          <p className="text-2xl font-black text-orange-500">{childData.experience}</p>
          <p className="text-xs text-gray-500 font-medium">{t('progress.experience')}</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border-2 border-gray-100 text-center">
          <p className="text-2xl font-black text-red-500">🔥 {childData.streak}</p>
          <p className="text-xs text-gray-500 font-medium">{t('progress.streak')}</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border-2 border-gray-100 text-center">
          <p className="text-2xl font-black text-blue-500">{childData.averageScore}%</p>
          <p className="text-xs text-gray-500 font-medium">{t('progress.averageScore')}</p>
        </div>
      </div>

      {/* Progress Chart */}
      <div className="bg-white p-6 rounded-2xl border-2 border-gray-100 mb-6">
        <h3 className="font-bold text-lg mb-4">{t('progress.weekly')}</h3>
        <div className="h-48 flex items-end justify-around gap-2">
          {childData.weeklyProgress.map((value, index) => (
            <div key={index} className="flex-1 flex flex-col items-center gap-2">
              <div 
                className="w-full bg-gradient-to-t from-purple-500 to-blue-500 rounded-t-lg transition-all duration-1000"
                style={{ height: `${value}%` }}
              />
              <span className="text-xs text-gray-500">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Stats */}
      <div className="bg-white p-6 rounded-2xl border-2 border-gray-100">
        <h3 className="font-bold text-lg mb-4">Detailed Statistics</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
            <span className="text-gray-600 font-medium">{t('progress.totalSessions')}</span>
            <span className="font-bold text-gray-800">{childData.totalSessions}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
            <span className="text-gray-600 font-medium">{t('progress.totalTime')}</span>
            <span className="font-bold text-gray-800">{childData.totalDuration}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
            <span className="text-gray-600 font-medium">{t('progress.averageScore')}</span>
            <span className="font-bold text-gray-800">{childData.averageScore}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
