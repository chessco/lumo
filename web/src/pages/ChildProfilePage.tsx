import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function ChildProfilePage() {
  useEffect(() => {
    // Generate floating stars
    const starField = document.getElementById('star-field');
    if (!starField) return;
    
    // Clear existing stars in case of re-render
    starField.innerHTML = '';
    
    const starIcons = ['star', 'sparkles', 'circle'];
    
    for (let i = 0; i < 20; i++) {
        const star = document.createElement('span');
        const icon = starIcons[Math.floor(Math.random() * starIcons.length)];
        star.className = 'material-symbols-outlined absolute floating-star text-primary/10';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.fontSize = (Math.random() * 20 + 10) + 'px';
        star.style.animationDelay = (Math.random() * 5) + 's';
        star.style.animationDuration = (Math.random() * 4 + 4) + 's';
        star.innerHTML = icon;
        if (Math.random() > 0.5) star.style.fontVariationSettings = "'FILL' 1";
        starField.appendChild(star);
    }
  }, []);

  return (
    <div className="bg-background text-on-surface font-body-lg min-h-screen relative overflow-hidden bg-[radial-gradient(circle_at_top_left,#fff8f4_0%,#fef1e5_50%,#e9ddff_100%)]">
      {/* Atmospheric Floating Stars */}
      <div className="absolute inset-0 pointer-events-none" id="star-field"></div>
      
      {/* Top AppBar (Brand Identity) */}
      <header className="flex justify-between items-center px-margin-mobile md:px-margin-desktop h-24 w-full z-50 relative">
        <div className="flex items-center gap-sm">
          <span className="text-primary font-headline-xl tracking-tight">Lumo</span>
        </div>
        <div className="flex gap-md items-center">
          <button className="w-12 h-12 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-variant transition-all active:scale-95 active:shadow-inner">
            <span className="material-symbols-outlined">settings</span>
          </button>
        </div>
      </header>
      
      {/* Main Content: Profile Selector Canvas */}
      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-6rem)] px-margin-mobile relative z-10 pb-xl">
        <div className="text-center mb-xl">
          <h1 className="font-headline-lg-mobile md:font-headline-lg text-primary mb-xs">Who's learning today?</h1>
          <p className="font-body-md text-on-surface-variant max-w-md mx-auto">Pick your explorer's profile to start the adventure.</p>
        </div>
        
        {/* Profiles Bento/Grid Layout */}
        <div className="flex flex-wrap justify-center gap-lg md:gap-xl w-full max-w-5xl">
          {/* Child 1: Leo */}
          <Link to="/dashboard" className="flex flex-col items-center group cursor-pointer decoration-transparent">
            <div className="relative">
              <div className="w-40 h-40 md:w-56 md:h-56 rounded-full border-[8px] border-surface-container-highest bg-surface-container shadow-lg hover:shadow-[0_0_30px_10px_rgba(255,184,77,0.4)] transition-all duration-300 overflow-hidden">
                <img className="w-full h-full object-cover" alt="Leo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCyjeRmDZdD5TK7bwPUBZTvvW5dcotvliy1-FBYTbr8Kcf_KL77ks8FGyW5_0V9NMDUNBMRim9qHFvEGqE4cnUY7hQsP8D-w6Sw7paqcyoAjWpUPNmI8qxhj4-i9QEebmQowEZ5ZQypX4bM4OoOk7Qn8mARDReak03rfRmjPFouM0Lc4XNdV7wRbq_2inqyn-D5KxvOQ9GR71kUUHa57h7LMwd4hAkxgUiUWx8gbzW3KKPcSSlBZqiQFITgy28w-67j9OWnD19"/>
              </div>
              <div className="absolute -top-2 -right-2 bg-tertiary text-on-tertiary rounded-full px-3 py-1 font-label-caps text-sm shadow-md">LVL 4</div>
            </div>
            <span className="mt-md font-headline-lg-mobile md:font-headline-lg text-on-surface group-hover:text-primary transition-colors">Leo</span>
          </Link>
          
          {/* Child 2: Mia */}
          <Link to="/dashboard" className="flex flex-col items-center group cursor-pointer decoration-transparent">
            <div className="relative">
              <div className="w-40 h-40 md:w-56 md:h-56 rounded-full border-[8px] border-surface-container-highest bg-surface-container shadow-lg hover:shadow-[0_0_30px_10px_rgba(255,184,77,0.4)] transition-all duration-300 overflow-hidden">
                <img className="w-full h-full object-cover" alt="Mia" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSuNP2sXpWx8OrdaD_EFwF9hV7ZHuiij8thGdHMFTrIPlcElbZT3XirkIq4dRKpR7SST-NM-5B7bGwXGCqV3mSS0qfSfUbu8U53csokF1XOfgCos1h6lHCxGU3P-yE-YiL4TGWr8zi3l3-ryNr4pJOoP-zG9ca_rMFCPM9NCX2PFqxk0ZBu2kr1RnnE6wPmE950VwC_CKmwhrWKt1bcdQOEp9X_RUaHIRSqfXK88T4N9kCaG-gtQgMvWQ_A54azUsPXreu50MT"/>
              </div>
              <div className="absolute -top-2 -right-2 bg-tertiary text-on-tertiary rounded-full px-3 py-1 font-label-caps text-sm shadow-md">LVL 7</div>
            </div>
            <span className="mt-md font-headline-lg-mobile md:font-headline-lg text-on-surface group-hover:text-primary transition-colors">Mia</span>
          </Link>
          
          {/* Add New Explorer Button */}
          <div className="flex flex-col items-center group cursor-pointer">
            <button className="w-40 h-40 md:w-56 md:h-56 rounded-full border-[8px] border-dashed border-outline-variant bg-surface-bright flex flex-col items-center justify-center hover:bg-white hover:border-primary transition-all duration-300 shadow-sm hover:shadow-md active:scale-95 active:shadow-inner">
              <div className="w-16 h-16 bg-primary-fixed rounded-full flex items-center justify-center text-primary group-hover:scale-110 transition-transform mb-sm">
                <span className="material-symbols-outlined text-4xl" style={{fontVariationSettings: "'wght' 700"}}>add</span>
              </div>
            </button>
            <span className="mt-md font-headline-lg-mobile md:font-headline-lg text-on-surface-variant group-hover:text-primary transition-colors text-center leading-tight">Add a New<br/>Explorer</span>
          </div>
        </div>
        
        {/* Secondary CTA: Parent Mode */}
        <div className="mt-xl">
          <button className="flex items-center gap-sm px-xl py-md bg-secondary text-on-secondary rounded-full font-interactive-text shadow-[0_8px_0_0_#5520b3] active:shadow-none active:translate-y-2 transition-all">
            <span className="material-symbols-outlined">lock</span>
            Parent Dashboard
          </button>
        </div>
      </main>
    </div>
  );
}
