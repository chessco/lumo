import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function DashboardPage() {
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
    <div className="bg-surface overflow-x-hidden min-h-screen text-on-surface">
      {/* Parent Dashboard Sidebar */}
      <aside className="hidden md:flex flex-col h-screen fixed left-0 top-0 w-80 bg-surface-container-low border-r border-outline-variant z-50 py-lg px-md">
        <div className="mb-xl px-2">
          <h1 className="text-headline-lg font-headline-lg text-secondary">Lumo</h1>
          <p className="text-on-surface-variant font-body-md">Parent Dashboard</p>
        </div>
        <div className="flex-grow space-y-sm">
          {/* Active Tab: Overview */}
          <Link className="flex items-center gap-md p-md rounded-lg text-secondary font-bold border-r-4 border-secondary bg-secondary-fixed transition-all" to="/dashboard">
            <span className="material-symbols-outlined">dashboard</span>
            <span className="text-body-md font-body-md">Overview</span>
          </Link>
          <Link className="flex items-center gap-md p-md rounded-lg text-on-surface-variant hover:bg-surface-variant transition-all" to="/children">
            <span className="material-symbols-outlined">group</span>
            <span className="text-body-md font-body-md">Children</span>
          </Link>
          <a className="flex items-center gap-md p-md rounded-lg text-on-surface-variant hover:bg-surface-variant transition-all" href="#">
            <span className="material-symbols-outlined">settings</span>
            <span className="text-body-md font-body-md">Settings</span>
          </a>
        </div>
        <div className="mt-auto p-md bg-surface-container-high rounded-xl">
          <div className="flex items-center gap-sm mb-md">
            <img className="w-12 h-12 rounded-full object-cover" alt="Sarah Mitchell" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDePetzi2fi-EJX5jJMjCqDMa9D1_EqlQEvs7w8HpkXbGHcbNFniYpvyRgfFWIheUS-rXSw2AmfQHVLFc7cJn1ncjKBt1w6CIQinGq7P-6iFaxdUPavxTjdj_bWLr3uWgEMC4DygmW-y7Vq00RZnxMiEcKwH3ZfLdoXNFpcQzG9bAdKGSFqZQKfoKFXTu_zCW2ggrwFzL_3PI2Oi-wKihRGKMVIAwGjbkaQ-Sr-HIEF95dfOeh6edmMuLG4eNdv8WxN-81hUSsG"/>
            <div>
              <p className="font-bold text-on-surface">Sarah Mitchell</p>
              <p className="text-xs text-on-surface-variant">Lumo Gold Member</p>
            </div>
          </div>
          <Link to="/" className="w-full flex justify-center py-sm bg-secondary text-white rounded-lg font-bold hover:scale-105 active:scale-95 transition-all">
            Learning Mode
          </Link>
        </div>
      </aside>

      {/* Main Content Canvas */}
      <main className="md:ml-80 min-h-screen p-margin-mobile md:p-margin-desktop">
        {/* Header & Profile Switcher */}
        <header className="flex flex-col md:flex-row justify-between items-start md:flex-wrap md:items-center gap-md mb-xl">
          <div>
            <h2 className="text-headline-xl font-headline-xl text-primary mb-xs">Hello, Sarah!</h2>
            <p className="text-body-lg font-body-lg text-on-surface-variant">Here's how Leo is progressing this week.</p>
          </div>
          <div className="flex items-center gap-md bg-surface-container-highest p-sm rounded-full">
            <button className="flex items-center gap-sm px-md py-xs bg-surface-container-lowest rounded-full shadow-sm">
              <img className="w-8 h-8 rounded-full" alt="Leo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-Te9jLIieUMdUZK_maaXI5jhay2BICUt-2l-UT1daywdK_npvHC4p0xxwCuHg6yY4ZEjSHdasav_VozKY7I9BmcGGhzYmU59NgxTL9fm8vLvpg8eptZ3_jzXD9UjjQGqi1H1wfk2jNJrGu1EPh2wiK-6Y1xffwj-l4A4naMVqFM0PROqITg0ntuQW8cLuVfGG6Gw5pzsQquaQb4Oep2cs2_Z6frcyAdY8W740i7_FcGjQZhljrbppSEhlaVr5RNRgGMqrnYpF"/>
              <span className="font-bold text-on-surface">Leo</span>
            </button>
            <button className="opacity-50 hover:opacity-100 transition-opacity">
              <img className="w-8 h-8 rounded-full grayscale" alt="Mia" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCeuq5g8hdKgWNYYF3p93x2iBzmlzRh4LFzpsxxWy2AgetVPum8aN_7kBbWVx2h6dMfAdKaRIlnlXb8-Z_cTXIrrjvHoBWo4xMe1xZYlZttCeqbToVzUMaQiu-vTmn1Ef2r5ro8KYgedUDAe8CM6f9NBqivsXm_Oc9VjNrRQWEY8SlA_HaxbtAmyqqdUSIq6HR3OzmE1RPxJN4jAm-6oXlawv0V7Fwt6cBu4dVNVCZ3goS-onO7H5KM6Y9N3VccHxy0m7TbKWs_"/>
            </button>
            <Link to="/children" className="w-8 h-8 flex items-center justify-center border-2 border-dashed border-outline-variant rounded-full text-outline hover:border-primary hover:text-primary transition-colors decoration-transparent">
              <span className="material-symbols-outlined text-sm">add</span>
            </Link>
          </div>
        </header>

        {/* Top Metrics */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-md mb-xl">
          <div className="glass-card p-lg rounded-lg border-b-4 border-[#E6A645]">
            <div className="flex justify-between items-start mb-md">
              <span className="material-symbols-outlined text-primary text-4xl">schedule</span>
              <span className="text-xs font-bold text-tertiary bg-tertiary-fixed px-sm py-xs rounded-full">+12%</span>
            </div>
            <p className="text-on-surface-variant font-label-caps mb-xs uppercase">Total Learning Time</p>
            <h3 className="text-headline-lg font-headline-lg">12h 45m</h3>
          </div>
          <div className="glass-card p-lg rounded-lg border-b-4 border-secondary-container">
            <div className="flex justify-between items-start mb-md">
              <span className="material-symbols-outlined text-secondary text-4xl">auto_stories</span>
              <span className="text-xs font-bold text-tertiary bg-tertiary-fixed px-sm py-xs rounded-full">+48</span>
            </div>
            <p className="text-on-surface-variant font-label-caps mb-xs uppercase">Words Mastered</p>
            <h3 className="text-headline-lg font-headline-lg">342</h3>
          </div>
          <div className="glass-card p-lg rounded-lg border-b-4 border-tertiary">
            <div className="flex justify-between items-start mb-md">
              <span className="material-symbols-outlined text-tertiary text-4xl">record_voice_over</span>
              <span className="text-xs font-bold text-tertiary bg-tertiary-fixed px-sm py-xs rounded-full">Top 5%</span>
            </div>
            <p className="text-on-surface-variant font-label-caps mb-xs uppercase">Pronunciation Accuracy</p>
            <h3 className="text-headline-lg font-headline-lg">89%</h3>
          </div>
        </section>

        {/* Main Insights Bento */}
        <div className="grid grid-cols-12 gap-md">
          {/* Weekly Growth Chart */}
          <div className="col-span-12 lg:col-span-8 glass-card p-lg rounded-lg min-h-[400px] flex flex-col">
            <div className="flex justify-between items-center mb-xl">
              <h4 className="text-headline-lg font-headline-lg text-on-surface">Weekly Progress</h4>
              <div className="flex gap-sm">
                <button className="px-md py-xs bg-primary-fixed text-on-primary-fixed-variant rounded-full text-sm font-bold">Vocabulary</button>
                <button className="px-md py-xs hover:bg-surface-variant rounded-full text-sm font-bold transition-colors">Speech</button>
              </div>
            </div>
            <div className="flex-grow flex items-end justify-between gap-md relative">
              {/* Fake Chart Visualization */}
              <div className="w-full h-full absolute inset-0 flex items-end justify-around pb-8 px-4">
                <div className="w-12 bg-primary-container/40 rounded-t-lg relative" style={{height: '40%'}}>
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 font-bold text-primary">4h</div>
                </div>
                <div className="w-12 bg-primary-container/40 rounded-t-lg relative" style={{height: '60%'}}>
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 font-bold text-primary">6h</div>
                </div>
                <div className="w-12 bg-primary-container/40 rounded-t-lg relative" style={{height: '55%'}}>
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 font-bold text-primary">5.5h</div>
                </div>
                <div className="w-12 bg-primary-container/40 rounded-t-lg relative" style={{height: '85%'}}>
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 font-bold text-primary">9h</div>
                </div>
                <div className="w-12 bg-primary-container/40 rounded-t-lg relative" style={{height: '70%'}}>
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 font-bold text-primary">7h</div>
                </div>
                <div className="w-12 bg-primary-container rounded-t-lg relative shadow-lg" style={{height: '95%'}}>
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 font-bold text-primary">10h</div>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 animate-bounce">
                    <span className="material-symbols-outlined text-secondary text-3xl">star</span>
                  </div>
                </div>
                <div className="w-12 bg-primary-container/40 rounded-t-lg relative" style={{height: '65%'}}>
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 font-bold text-primary">6.5h</div>
                </div>
              </div>
            </div>
            <div className="flex justify-around mt-md border-t border-outline-variant pt-md">
              <span className="text-label-caps text-on-surface-variant">Mon</span>
              <span className="text-label-caps text-on-surface-variant">Tue</span>
              <span className="text-label-caps text-on-surface-variant">Wed</span>
              <span className="text-label-caps text-on-surface-variant">Thu</span>
              <span className="text-label-caps text-on-surface-variant">Fri</span>
              <span className="text-label-caps text-primary font-bold">Sat</span>
              <span className="text-label-caps text-on-surface-variant">Sun</span>
            </div>
          </div>

          {/* Lumo Recommendations */}
          <div className="col-span-12 lg:col-span-4 glass-card p-lg rounded-lg flex flex-col bg-gradient-to-br from-surface-container to-white">
            <div className="flex items-center gap-md mb-lg">
              <div className="p-sm bg-primary-fixed rounded-xl">
                <span className="material-symbols-outlined text-primary">auto_awesome</span>
              </div>
              <h4 className="text-headline-lg font-headline-lg">Lumo Tips</h4>
            </div>
            <div className="space-y-md flex-grow">
              <div className="p-md bg-white rounded-xl shadow-sm border border-outline-variant/30 flex gap-md">
                <span className="material-symbols-outlined text-secondary">record_voice_over</span>
                <div>
                  <p className="font-bold text-on-surface mb-1">Focus on 'R' Sounds</p>
                  <p className="text-sm text-on-surface-variant">Leo had some trouble with "Rabbit" and "Rocket" today.</p>
                </div>
              </div>
              <div className="p-md bg-white rounded-xl shadow-sm border border-outline-variant/30 flex gap-md">
                <span className="material-symbols-outlined text-tertiary">rocket_launch</span>
                <div>
                  <p className="font-bold text-on-surface mb-1">New Milestone Near!</p>
                  <p className="text-sm text-on-surface-variant">Only 5 more animal names to unlock the "Zoo Explorer" badge.</p>
                </div>
              </div>
              <div className="p-md bg-white rounded-xl shadow-sm border border-outline-variant/30 flex gap-md">
                <span className="material-symbols-outlined text-primary">bedtime</span>
                <div>
                  <p className="font-bold text-on-surface mb-1">Evening Reading</p>
                  <p className="text-sm text-on-surface-variant">"The Starry Night" is 80% complete. A great choice for bedtime!</p>
                </div>
              </div>
            </div>
            <button className="mt-lg w-full py-md bg-surface-container-highest text-primary font-bold rounded-xl active:scale-95 transition-all flex items-center justify-center gap-md">
              <span>Unlock Practice Games</span>
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>

          {/* Secondary Stats / Progress Bars */}
          <div className="col-span-12 glass-card p-lg rounded-lg flex flex-col md:flex-row gap-xl items-center">
            <div className="flex-grow w-full">
              <div className="flex justify-between items-center mb-sm">
                <h5 className="font-headline-lg text-on-surface">Curriculum Progress</h5>
                <span className="text-secondary font-bold">Level 4: Advanced Narrator</span>
              </div>
              <div className="h-6 bg-surface-container rounded-full overflow-hidden relative">
                <div className="h-full rounded-full bg-gradient-to-r from-primary-container to-primary transition-all duration-1000 progress-fill" style={{width: '72%'}}></div>
                <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white mix-blend-overlay">72% Completed</div>
              </div>
            </div>
            <div className="shrink-0">
              <button className="flex items-center gap-md px-xl py-lg bg-primary text-white font-bold rounded-xl active:scale-95 transition-all shadow-lg border-b-4 border-[#633f00]">
                <span className="material-symbols-outlined">download</span>
                <span>Download Weekly Report</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Nav for Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-surface-container-highest rounded-t-xl shadow-lg flex justify-around items-end pb-safe px-4 h-24">
        <Link className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full p-3 mb-2 transform -translate-y-2 border-b-4 border-primary" to="/dashboard">
          <span className="material-symbols-outlined">dashboard</span>
        </Link>
        <Link className="flex flex-col items-center justify-center text-outline p-2 mb-2 hover:bg-surface-variant rounded-full" to="/children">
          <span className="material-symbols-outlined">group</span>
        </Link>
        <a className="flex flex-col items-center justify-center text-outline p-2 mb-2 hover:bg-surface-variant rounded-full" href="#">
          <span className="material-symbols-outlined">settings</span>
        </a>
      </nav>
    </div>
  );
}
