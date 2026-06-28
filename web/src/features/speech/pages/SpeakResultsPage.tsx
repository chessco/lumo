import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PageHeader from '@/components/shared/PageHeader';
import ProgressRing from '@/components/shared/ProgressRing';
import XPBadge from '@/components/shared/XPBadge';

export default function SpeakResultsPage() {
  const { t } = useTranslation();

  // Mock results - in real app this would come from API
  const results = {
    score: 85,
    xpEarned: 50,
    phonemesCompleted: 5,
    bestPhoneme: 'a',
    improvement: '+12%',
  };

  return (
    <div className="p-4 md:p-6 max-w-md mx-auto">
      <PageHeader 
        title={t('speech.title')}
        subtitle="Session Complete!"
        backTo="/app/speak"
        icon="emoji_events"
      />

      {/* Score Circle */}
      <div className="text-center mb-8">
        <div className="inline-block p-6 bg-white rounded-3xl shadow-lg border-2 border-purple-100">
          <ProgressRing 
            progress={results.score} 
            size={120} 
            strokeWidth={12}
            color="#8B5CF6"
          />
        </div>
        <h2 className="text-2xl font-black text-gray-800 mt-4">
          {results.score >= 90 ? 'Excellent!' : results.score >= 70 ? 'Great Job!' : 'Good Try!'}
        </h2>
        <p className="text-gray-500 font-medium">You completed {results.phonemesCompleted} phonemes</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-4 rounded-2xl border-2 border-gray-100 text-center">
          <XPBadge xp={results.xpEarned} size="lg" />
          <p className="text-xs text-gray-500 mt-2 font-medium">XP Earned</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border-2 border-gray-100 text-center">
          <div className="text-2xl font-black text-green-500">{results.improvement}</div>
          <p className="text-xs text-gray-500 mt-2 font-medium">Improvement</p>
        </div>
      </div>

      {/* Best Phoneme */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-2xl mb-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-3xl font-black text-purple-600 shadow-sm">
            {results.bestPhoneme}
          </div>
          <div>
            <p className="font-bold text-gray-800">Best Phoneme</p>
            <p className="text-sm text-gray-500">Your most accurate sound</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-3">
        <Link
          to="/app/speak"
          className="block w-full py-4 bg-purple-600 text-white rounded-2xl font-bold text-center hover:bg-purple-700 transition-colors shadow-md"
        >
          Practice Again
        </Link>
        <Link
          to="/app"
          className="block w-full py-4 bg-gray-100 text-gray-700 rounded-2xl font-bold text-center hover:bg-gray-200 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
