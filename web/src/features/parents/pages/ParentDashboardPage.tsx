import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PageHeader from '@/components/shared/PageHeader';

export default function ParentDashboardPage() {
  const { t } = useTranslation();
  const [activeChart, setActiveChart] = useState<'vocabulary' | 'speech'>('vocabulary');
  
  useEffect(() => {
    const bars = document.querySelectorAll('.progress-fill') as NodeListOf<HTMLElement>;
    bars.forEach(bar => {
      const targetWidth = bar.style.width;
      bar.style.width = '0%';
      setTimeout(() => {
        bar.style.width = targetWidth;
      }, 300);
    });
  }, []);

  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <PageHeader 
        title={t('dashboard.welcome', { name: 'Sarah' })}
        subtitle={t('dashboard.subtitle')}
        icon="dashboard"
      />

      {/* Child Selector */}
      <div className="flex items-center gap-4 bg-white p-3 rounded-2xl shadow-sm border border-gray-100 mb-8">
        <button className="flex items-center gap-3 px-4 py-2 bg-purple-50 text-purple-700 rounded-full font-bold">
          <div className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center text-lg">👧</div>
          Sofía
        </button>
        <button className="flex items-center gap-3 px-4 py-2 text-gray-500 hover:bg-gray-50 rounded-full font-bold">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-lg">👦</div>
          Mateo
        </button>
        <Link to="/parent/children" className="w-10 h-10 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-full text-gray-400 hover:border-purple-400 hover:text-purple-600 transition-colors">
          <span className="material-symbols-outlined text-xl">add</span>
        </Link>
      </div>

      {/* Top Metrics */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border-2 border-gray-100 shadow-sm hover:shadow-md transition-all">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-500 flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">schedule</span>
            </div>
            <span className="text-xs font-bold text-green-700 bg-green-100 px-3 py-1 rounded-full">+12%</span>
          </div>
          <p className="text-gray-400 text-xs font-bold mb-1 uppercase tracking-wider">{t('dashboard.totalTime')}</p>
          <h3 className="text-3xl font-black text-gray-800">12h 45m</h3>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border-2 border-gray-100 shadow-sm hover:shadow-md transition-all">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-500 flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">auto_stories</span>
            </div>
            <span className="text-xs font-bold text-green-700 bg-green-100 px-3 py-1 rounded-full">+48</span>
          </div>
          <p className="text-gray-400 text-xs font-bold mb-1 uppercase tracking-wider">{t('dashboard.wordsMastered')}</p>
          <h3 className="text-3xl font-black text-gray-800">342</h3>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border-2 border-gray-100 shadow-sm hover:shadow-md transition-all">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">record_voice_over</span>
            </div>
            <span className="text-xs font-bold text-purple-700 bg-purple-100 px-3 py-1 rounded-full">Top 5%</span>
          </div>
          <p className="text-gray-400 text-xs font-bold mb-1 uppercase tracking-wider">{t('dashboard.pronunciationAccuracy')}</p>
          <h3 className="text-3xl font-black text-gray-800">89%</h3>
        </div>
      </section>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Weekly Chart */}
        <div className="bg-white p-6 rounded-2xl border-2 border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-xl font-black text-gray-800">{t('dashboard.weeklyProgress')}</h4>
            <div className="flex gap-2">
              <button 
                onClick={() => setActiveChart('vocabulary')}
                className={`px-4 py-2 rounded-full text-sm font-bold border-2 transition-colors ${
                  activeChart === 'vocabulary' 
                    ? 'bg-purple-100 text-purple-700 border-purple-200' 
                    : 'text-gray-500 hover:bg-gray-100 border-transparent'
                }`}
              >
                {t('dashboard.vocabulary')}
              </button>
              <button 
                onClick={() => setActiveChart('speech')}
                className={`px-4 py-2 rounded-full text-sm font-bold border-2 transition-colors ${
                  activeChart === 'speech' 
                    ? 'bg-purple-100 text-purple-700 border-purple-200' 
                    : 'text-gray-500 hover:bg-gray-100 border-transparent'
                }`}
              >
                {t('dashboard.speech')}
              </button>
            </div>
          </div>
          <div className="h-48 flex items-end justify-around gap-2">
            {activeChart === 'vocabulary' ? (
              <>
                <div className="flex-1 bg-purple-100 rounded-t-lg" style={{height: '40%'}} />
                <div className="flex-1 bg-purple-100 rounded-t-lg" style={{height: '60%'}} />
                <div className="flex-1 bg-purple-100 rounded-t-lg" style={{height: '55%'}} />
                <div className="flex-1 bg-purple-200 rounded-t-lg" style={{height: '85%'}} />
                <div className="flex-1 bg-purple-100 rounded-t-lg" style={{height: '70%'}} />
                <div className="flex-1 bg-gradient-to-t from-purple-400 to-purple-600 rounded-t-lg" style={{height: '95%'}} />
                <div className="flex-1 bg-purple-100 rounded-t-lg" style={{height: '65%'}} />
              </>
            ) : (
              <>
                <div className="flex-1 bg-blue-100 rounded-t-lg" style={{height: '30%'}} />
                <div className="flex-1 bg-blue-100 rounded-t-lg" style={{height: '50%'}} />
                <div className="flex-1 bg-blue-100 rounded-t-lg" style={{height: '45%'}} />
                <div className="flex-1 bg-blue-200 rounded-t-lg" style={{height: '75%'}} />
                <div className="flex-1 bg-blue-100 rounded-t-lg" style={{height: '60%'}} />
                <div className="flex-1 bg-gradient-to-t from-blue-400 to-blue-600 rounded-t-lg" style={{height: '90%'}} />
                <div className="flex-1 bg-blue-100 rounded-t-lg" style={{height: '55%'}} />
              </>
            )}
          </div>
          <div className="flex justify-around mt-4">
            {['dashboard.weekdays.mon', 'dashboard.weekdays.tue', 'dashboard.weekdays.wed', 'dashboard.weekdays.thu', 'dashboard.weekdays.fri', 'dashboard.weekdays.sat', 'dashboard.weekdays.sun'].map((day) => (
              <span key={day} className="text-xs font-bold text-gray-400 uppercase">{t(day)}</span>
            ))}
          </div>
        </div>

        {/* Lumi Tips */}
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-2xl border-2 border-purple-100 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-purple-500">auto_awesome</span>
            </div>
            <h4 className="text-xl font-black text-gray-800">{t('dashboard.lumiTips.title')}</h4>
          </div>
          <div className="space-y-3">
            <div className="p-3 bg-white rounded-xl shadow-sm border border-gray-100 flex gap-3">
              <div className="w-8 h-8 shrink-0 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-lg">record_voice_over</span>
              </div>
              <div>
                <p className="font-bold text-gray-800 text-sm">{t('dashboard.lumiTips.focusR')}</p>
                <p className="text-xs text-gray-500">{t('dashboard.lumiTips.focusRDesc')}</p>
              </div>
            </div>
            <div className="p-3 bg-white rounded-xl shadow-sm border border-gray-100 flex gap-3">
              <div className="w-8 h-8 shrink-0 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-lg">rocket_launch</span>
              </div>
              <div>
                <p className="font-bold text-gray-800 text-sm">{t('dashboard.lumiTips.milestone')}</p>
                <p className="text-xs text-gray-500">{t('dashboard.lumiTips.milestoneDesc')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white p-6 rounded-2xl border-2 border-gray-100 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h5 className="font-bold text-lg text-gray-800">{t('dashboard.curriculumProgress')}</h5>
          <span className="text-purple-600 font-bold bg-purple-50 px-4 py-1 rounded-full text-sm border-2 border-purple-100">Level 4</span>
        </div>
        <div className="h-6 bg-gray-100 rounded-full overflow-hidden relative shadow-inner">
          <div className="h-full rounded-full bg-gradient-to-r from-purple-400 to-blue-500 transition-all duration-1000 progress-fill" style={{width: '72%'}} />
          <div className="absolute inset-0 flex items-center justify-center text-xs font-black text-white mix-blend-overlay">72%</div>
        </div>
      </div>
    </div>
  );
}
