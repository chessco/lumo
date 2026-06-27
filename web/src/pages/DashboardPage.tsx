import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function DashboardPage() {
  const { t } = useTranslation();
  const [activeChart, setActiveChart] = useState<'vocabulary' | 'speech'>('vocabulary');
  useEffect(() => {
    // Simulating animation on page load for progress bars
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
    <div className="bg-gray-50 text-gray-800 font-sans p-6 md:p-10">

      {/* Header & Profile Switcher */}
        {/* Header & Profile Switcher */}
        <header className="flex flex-col md:flex-row justify-between items-start md:flex-wrap md:items-center gap-4 mb-10">
          <div>
            <h2 className="text-3xl font-black text-gray-800 mb-1">{t('dashboard.welcome', { name: 'Sarah' })} 👋</h2>
            <p className="text-gray-500 font-medium">{t('dashboard.subtitle')}</p>
          </div>
          <div className="flex items-center gap-4 bg-white p-2 rounded-full shadow-sm border border-gray-100">
            <button className="flex items-center gap-3 px-4 py-2 bg-blue-50 text-blue-700 rounded-full font-bold">
              <img className="w-8 h-8 rounded-full border-2 border-white shadow-sm" alt="Leo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-Te9jLIieUMdUZK_maaXI5jhay2BICUt-2l-UT1daywdK_npvHC4p0xxwCuHg6yY4ZEjSHdasav_VozKY7I9BmcGGhzYmU59NgxTL9fm8vLvpg8eptZ3_jzXD9UjjQGqi1H1wfk2jNJrGu1EPh2wiK-6Y1xffwj-l4A4naMVqFM0PROqITg0ntuQW8cLuVfGG6Gw5pzsQquaQb4Oep2cs2_Z6frcyAdY8W740i7_FcGjQZhljrbppSEhlaVr5RNRgGMqrnYpF"/>
              Leo
            </button>
            <button className="opacity-50 hover:opacity-100 transition-opacity p-1">
              <img className="w-8 h-8 rounded-full grayscale border-2 border-transparent" alt="Mia" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCeuq5g8hdKgWNYYF3p93x2iBzmlzRh4LFzpsxxWy2AgetVPum8aN_7kBbWVx2h6dMfAdKaRIlnlXb8-Z_cTXIrrjvHoBWo4xMe1xZYlZttCeqbToVzUMaQiu-vTmn1Ef2r5ro8KYgedUDAe8CM6f9NBqivsXm_Oc9VjNrRQWEY8SlA_HaxbtAmyqqdUSIq6HR3OzmE1RPxJN4jAm-6oXlawv0V7Fwt6cBu4dVNVCZ3goS-onO7H5KM6Y9N3VccHxy0m7TbKWs_"/>
            </button>
            <Link to="/children" className="w-10 h-10 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-full text-gray-400 hover:border-purple-400 hover:text-purple-600 transition-colors bg-gray-50 mr-2">
              <span className="material-symbols-outlined text-xl">add</span>
            </Link>
          </div>
        </header>

        {/* Top Metrics */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-3xl border-2 border-gray-100 shadow-sm border-b-8 group hover:-translate-y-1 transition-transform">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-500 flex items-center justify-center shadow-inner">
                <span className="material-symbols-outlined text-2xl">schedule</span>
              </div>
              <span className="text-xs font-bold text-green-700 bg-green-100 px-3 py-1 rounded-full">+12%</span>
            </div>
            <p className="text-gray-400 text-xs font-bold mb-1 uppercase tracking-wider">{t('dashboard.totalTime')}</p>
            <h3 className="text-3xl font-black text-gray-800">12h 45m</h3>
          </div>
          <div className="bg-white p-6 rounded-3xl border-2 border-gray-100 shadow-sm border-b-8 group hover:-translate-y-1 transition-transform">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-500 flex items-center justify-center shadow-inner">
                <span className="material-symbols-outlined text-2xl">auto_stories</span>
              </div>
              <span className="text-xs font-bold text-green-700 bg-green-100 px-3 py-1 rounded-full">+48</span>
            </div>
            <p className="text-gray-400 text-xs font-bold mb-1 uppercase tracking-wider">{t('dashboard.wordsMastered')}</p>
            <h3 className="text-3xl font-black text-gray-800">342</h3>
          </div>
          <div className="bg-white p-6 rounded-3xl border-2 border-gray-100 shadow-sm border-b-8 group hover:-translate-y-1 transition-transform">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center shadow-inner">
                <span className="material-symbols-outlined text-2xl">record_voice_over</span>
              </div>
              <span className="text-xs font-bold text-purple-700 bg-purple-100 px-3 py-1 rounded-full">Top 5%</span>
            </div>
            <p className="text-gray-400 text-xs font-bold mb-1 uppercase tracking-wider">{t('dashboard.pronunciationAccuracy')}</p>
            <h3 className="text-3xl font-black text-gray-800">89%</h3>
          </div>
        </section>

        {/* Main Insights Bento */}
        <div className="grid grid-cols-12 gap-6">
          {/* Weekly Growth Chart */}
          <div className="col-span-12 lg:col-span-8 bg-white p-8 rounded-3xl border-2 border-gray-100 shadow-sm min-h-[400px] flex flex-col">
            <div className="flex justify-between items-center mb-10">
              <h4 className="text-2xl font-black text-gray-800">{t('dashboard.weeklyProgress')}</h4>
              <div className="flex gap-2">
                <button 
                  onClick={() => setActiveChart('vocabulary')}
                  className={`px-4 py-2 rounded-full text-sm font-bold border-2 transition-colors ${
                    activeChart === 'vocabulary' 
                      ? 'bg-blue-100 text-blue-700 border-blue-200' 
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
            <div className="flex-grow flex items-end justify-between gap-4 relative">
              {/* Chart Visualization */}
              <div className="w-full h-full absolute inset-0 flex items-end justify-around pb-8 px-4">
                {activeChart === 'vocabulary' ? (
                  <>
                    <div className="w-12 bg-blue-100 rounded-t-2xl relative" style={{height: '40%'}}>
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold text-gray-400">4h</div>
                    </div>
                    <div className="w-12 bg-blue-100 rounded-t-2xl relative" style={{height: '60%'}}>
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold text-gray-400">6h</div>
                    </div>
                    <div className="w-12 bg-blue-100 rounded-t-2xl relative" style={{height: '55%'}}>
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold text-gray-400">5.5h</div>
                    </div>
                    <div className="w-12 bg-blue-200 rounded-t-2xl relative" style={{height: '85%'}}>
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold text-blue-600">9h</div>
                    </div>
                    <div className="w-12 bg-blue-100 rounded-t-2xl relative" style={{height: '70%'}}>
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold text-gray-400">7h</div>
                    </div>
                    <div className="w-12 bg-gradient-to-t from-blue-400 to-blue-600 rounded-t-2xl relative shadow-lg" style={{height: '95%'}}>
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold text-blue-600">10h</div>
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 animate-bounce">
                        <span className="material-symbols-outlined text-yellow-400 text-3xl" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                      </div>
                    </div>
                    <div className="w-12 bg-blue-100 rounded-t-2xl relative" style={{height: '65%'}}>
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold text-gray-400">6.5h</div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-12 bg-purple-100 rounded-t-2xl relative" style={{height: '30%'}}>
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold text-gray-400">72%</div>
                    </div>
                    <div className="w-12 bg-purple-100 rounded-t-2xl relative" style={{height: '50%'}}>
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold text-gray-400">78%</div>
                    </div>
                    <div className="w-12 bg-purple-100 rounded-t-2xl relative" style={{height: '45%'}}>
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold text-gray-400">75%</div>
                    </div>
                    <div className="w-12 bg-purple-200 rounded-t-2xl relative" style={{height: '75%'}}>
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold text-purple-600">88%</div>
                    </div>
                    <div className="w-12 bg-purple-100 rounded-t-2xl relative" style={{height: '60%'}}>
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold text-gray-400">82%</div>
                    </div>
                    <div className="w-12 bg-gradient-to-t from-purple-400 to-purple-600 rounded-t-2xl relative shadow-lg" style={{height: '90%'}}>
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold text-purple-600">92%</div>
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 animate-bounce">
                        <span className="material-symbols-outlined text-yellow-400 text-3xl" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                      </div>
                    </div>
                    <div className="w-12 bg-purple-100 rounded-t-2xl relative" style={{height: '55%'}}>
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold text-gray-400">80%</div>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="flex justify-around mt-6 border-t-2 border-gray-100 pt-6">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t('dashboard.weekdays.mon')}</span>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t('dashboard.weekdays.tue')}</span>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t('dashboard.weekdays.wed')}</span>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t('dashboard.weekdays.thu')}</span>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t('dashboard.weekdays.fri')}</span>
              <span className="text-xs font-black text-purple-600 bg-purple-100 px-3 py-1 rounded-full uppercase tracking-wider">{t('dashboard.weekdays.sat')}</span>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t('dashboard.weekdays.sun')}</span>
            </div>
          </div>

          {/* Lumo Recommendations */}
          <div className="col-span-12 lg:col-span-4 bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-3xl border-2 border-purple-100 shadow-sm flex flex-col">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-purple-500">
                <span className="material-symbols-outlined">auto_awesome</span>
              </div>
              <h4 className="text-2xl font-black text-gray-800">{t('dashboard.lumiTips.title')}</h4>
            </div>
            <div className="space-y-4 flex-grow">
              <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 flex gap-4">
                <div className="w-10 h-10 shrink-0 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl">record_voice_over</span>
                </div>
                <div>
                  <p className="font-bold text-gray-800 mb-1 text-sm">{t('dashboard.lumiTips.focusR')}</p>
                  <p className="text-xs text-gray-500 font-medium">{t('dashboard.lumiTips.focusRDesc')}</p>
                </div>
              </div>
              <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 flex gap-4">
                <div className="w-10 h-10 shrink-0 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl">rocket_launch</span>
                </div>
                <div>
                  <p className="font-bold text-gray-800 mb-1 text-sm">{t('dashboard.lumiTips.milestone')}</p>
                  <p className="text-xs text-gray-500 font-medium">{t('dashboard.lumiTips.milestoneDesc')}</p>
                </div>
              </div>
              <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 flex gap-4">
                <div className="w-10 h-10 shrink-0 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl">bedtime</span>
                </div>
                <div>
                  <p className="font-bold text-gray-800 mb-1 text-sm">{t('dashboard.lumiTips.eveningReading')}</p>
                  <p className="text-xs text-gray-500 font-medium">{t('dashboard.lumiTips.eveningReadingDesc')}</p>
                </div>
              </div>
            </div>
            <button className="mt-8 w-full py-4 bg-white border-2 border-gray-200 text-purple-600 font-bold rounded-2xl hover:bg-gray-50 active:scale-95 transition-all flex items-center justify-center gap-2">
              <span>{t('dashboard.lumiTips.unlockGames')}</span>
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>

          {/* Secondary Stats / Progress Bars */}
          <div className="col-span-12 bg-white p-8 rounded-3xl border-2 border-gray-100 shadow-sm flex flex-col md:flex-row gap-10 items-center">
            <div className="flex-grow w-full">
              <div className="flex justify-between items-center mb-4">
                <h5 className="font-bold text-lg text-gray-800">{t('dashboard.curriculumProgress')}</h5>
                <span className="text-purple-600 font-bold bg-purple-50 px-4 py-1 rounded-full text-sm border-2 border-purple-100">Level 4: Advanced Narrator</span>
              </div>
              <div className="h-8 bg-gray-100 rounded-full overflow-hidden relative shadow-inner">
                <div className="h-full rounded-full bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-1000 progress-fill" style={{width: '72%'}}></div>
                <div className="absolute inset-0 flex items-center justify-center text-xs font-black text-white mix-blend-overlay tracking-widest">72% COMPLETED</div>
              </div>
            </div>
            <div className="shrink-0 w-full md:w-auto">
              <button className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gray-800 text-white font-bold rounded-2xl active:scale-95 transition-all shadow-md btn-3d">
                <span className="material-symbols-outlined">download</span>
                <span>{t('dashboard.downloadReport')}</span>
              </button>
            </div>
          </div>
        </div>
    </div>
  );
}
