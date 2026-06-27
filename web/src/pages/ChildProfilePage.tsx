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
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-purple-50 via-white to-orange-50 font-sans">
      {/* Atmospheric Floating Stars */}
      <div className="absolute inset-0 pointer-events-none opacity-50" id="star-field"></div>
      
      {/* Top AppBar */}
      <header className="flex justify-between items-center px-6 md:px-12 h-24 w-full z-50 relative">
        <div className="flex items-center gap-3">
          <span className="text-purple-600 font-black text-3xl tracking-tight">Lumo</span>
        </div>
        <div className="flex gap-4 items-center">
          <button className="w-12 h-12 rounded-full flex items-center justify-center text-gray-500 hover:bg-white hover:shadow-md transition-all active:scale-95 border-2 border-transparent hover:border-gray-200">
            <span className="material-symbols-outlined">settings</span>
          </button>
        </div>
      </header>
      
      {/* Main Content: Profile Selector Canvas */}
      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-6rem)] px-6 relative z-10 pb-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-purple-700 mb-3 tracking-tight">¿Quién aprenderá hoy? 🌟</h1>
          <p className="text-lg md:text-xl font-medium text-gray-500 max-w-md mx-auto">Elige el perfil de tu explorador para comenzar la aventura.</p>
        </div>
        
        {/* Profiles Bento/Grid Layout */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-12 w-full max-w-5xl">
          {/* Child 1: Leo */}
          <Link to="/child-dashboard" className="flex flex-col items-center group cursor-pointer decoration-transparent">
            <div className="relative">
              <div className="w-40 h-40 md:w-56 md:h-56 rounded-full border-[8px] border-white bg-blue-50 shadow-xl hover:shadow-[0_0_30px_10px_rgba(59,130,246,0.4)] transition-all duration-300 overflow-hidden hover:-translate-y-2">
                <img className="w-full h-full object-cover" alt="Leo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCyjeRmDZdD5TK7bwPUBZTvvW5dcotvliy1-FBYTbr8Kcf_KL77ks8FGyW5_0V9NMDUNBMRim9qHFvEGqE4cnUY7hQsP8D-w6Sw7paqcyoAjWpUPNmI8qxhj4-i9QEebmQowEZ5ZQypX4bM4OoOk7Qn8mARDReak03rfRmjPFouM0Lc4XNdV7wRbq_2inqyn-D5KxvOQ9GR71kUUHa57h7LMwd4hAkxgUiUWx8gbzW3KKPcSSlBZqiQFITgy28w-67j9OWnD19"/>
              </div>
              <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 rounded-full px-4 py-1 font-bold text-sm shadow-md border-2 border-white">NIVEL 4</div>
            </div>
            <span className="mt-6 text-2xl md:text-3xl font-black text-gray-800 group-hover:text-blue-600 transition-colors">Leo</span>
          </Link>
          
          {/* Child 2: Mia */}
          <Link to="/child-dashboard" className="flex flex-col items-center group cursor-pointer decoration-transparent">
            <div className="relative">
              <div className="w-40 h-40 md:w-56 md:h-56 rounded-full border-[8px] border-white bg-pink-50 shadow-xl hover:shadow-[0_0_30px_10px_rgba(236,72,153,0.4)] transition-all duration-300 overflow-hidden hover:-translate-y-2">
                <img className="w-full h-full object-cover" alt="Mia" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSuNP2sXpWx8OrdaD_EFwF9hV7ZHuiij8thGdHMFTrIPlcElbZT3XirkIq4dRKpR7SST-NM-5B7bGwXGCqV3mSS0qfSfUbu8U53csokF1XOfgCos1h6lHCxGU3P-yE-YiL4TGWr8zi3l3-ryNr4pJOoP-zG9ca_rMFCPM9NCX2PFqxk0ZBu2kr1RnnE6wPmE950VwC_CKmwhrWKt1bcdQOEp9X_RUaHIRSqfXK88T4N9kCaG-gtQgMvWQ_A54azUsPXreu50MT"/>
              </div>
              <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 rounded-full px-4 py-1 font-bold text-sm shadow-md border-2 border-white">NIVEL 7</div>
            </div>
            <span className="mt-6 text-2xl md:text-3xl font-black text-gray-800 group-hover:text-pink-600 transition-colors">Mia</span>
          </Link>
          
          {/* Add New Explorer Button */}
          <Link to="/children" className="flex flex-col items-center group cursor-pointer">
            <button className="w-40 h-40 md:w-56 md:h-56 rounded-full border-[6px] border-dashed border-purple-200 bg-white/50 flex flex-col items-center justify-center hover:bg-white hover:border-purple-400 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-2">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform mb-2 shadow-inner">
                <span className="material-symbols-outlined text-5xl font-bold">add</span>
              </div>
            </button>
            <span className="mt-6 text-xl md:text-2xl font-bold text-gray-400 group-hover:text-purple-600 transition-colors text-center leading-tight">Agregar Nuevo<br/>Explorador</span>
          </Link>
        </div>
        
        {/* Secondary CTA: Parent Mode */}
        <div className="mt-16">
          <Link to="/children" className="flex items-center gap-3 px-8 py-4 bg-gray-800 text-white rounded-full font-bold text-lg btn-3d hover:bg-gray-700">
            <span className="material-symbols-outlined">lock</span>
            Panel de Padres
          </Link>
        </div>
      </main>
    </div>
  );
}
