import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PageHeader from '@/components/shared/PageHeader';

export default function ReportsPage() {
  const { childId } = useParams();
  const { t } = useTranslation();

  return (
    <div className="p-4 md:p-6">
      <PageHeader 
        title={t('parent.reports')}
        subtitle="Detailed learning reports"
        backTo="/parent/children"
        icon="assessment"
      />

      {/* Report Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-2xl border-2 border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
              <span className="material-symbols-outlined text-blue-600">mic</span>
            </div>
            <h3 className="font-bold text-lg">Speech Progress</h3>
          </div>
          <p className="text-gray-500 text-sm mb-4">Weekly pronunciation improvement analysis</p>
          <div className="h-32 bg-gray-50 rounded-xl flex items-center justify-center">
            <span className="text-gray-400">Chart placeholder</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border-2 border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
              <span className="material-symbols-outlined text-green-600">auto_stories</span>
            </div>
            <h3 className="font-bold text-lg">Reading Progress</h3>
          </div>
          <p className="text-gray-500 text-sm mb-4">Stories completed and comprehension scores</p>
          <div className="h-32 bg-gray-50 rounded-xl flex items-center justify-center">
            <span className="text-gray-400">Chart placeholder</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border-2 border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
              <span className="material-symbols-outlined text-purple-600">schedule</span>
            </div>
            <h3 className="font-bold text-lg">Time Spent</h3>
          </div>
          <p className="text-gray-500 text-sm mb-4">Daily learning time distribution</p>
          <div className="h-32 bg-gray-50 rounded-xl flex items-center justify-center">
            <span className="text-gray-400">Chart placeholder</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border-2 border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
              <span className="material-symbols-outlined text-orange-600">emoji_events</span>
            </div>
            <h3 className="font-bold text-lg">Achievements</h3>
          </div>
          <p className="text-gray-500 text-sm mb-4">Badges and milestones earned</p>
          <div className="h-32 bg-gray-50 rounded-xl flex items-center justify-center">
            <span className="text-gray-400">Chart placeholder</span>
          </div>
        </div>
      </div>
    </div>
  );
}
