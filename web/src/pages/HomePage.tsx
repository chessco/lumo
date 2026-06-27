import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const [lang, setLang] = React.useState('en');

  useEffect(() => {
    const particleContainer = document.getElementById('particle-container');
    if (!particleContainer) return;

    function createParticle() {
      const particle = document.createElement('div');
      const size = Math.random() * 8 + 4;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const duration = Math.random() * 2 + 2;
      
      particle.className = 'absolute bg-primary-fixed-dim rounded-full blur-[1px] opacity-0';
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${x}%`;
      particle.style.top = `${y}%`;
      
      particleContainer?.appendChild(particle);
      
      particle.animate([
          { opacity: 0, transform: 'scale(0) translateY(0)' },
          { opacity: 0.8, transform: 'scale(1) translateY(-20px)' },
          { opacity: 0, transform: 'scale(0) translateY(-40px)' }
      ], {
          duration: duration * 1000,
          easing: 'ease-out'
      }).onfinish = () => particle.remove();
    }

    const intervalId = setInterval(createParticle, 300);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-blue-50 via-white to-purple-50 font-sans">
      {/* Magical Background Elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none opacity-50">
        <span className="material-symbols-outlined cloud text-white text-[120px]" style={{top: '10%', left: '-10%', animationDuration: '45s'}}>cloud</span>
        <span className="material-symbols-outlined cloud text-white text-[80px]" style={{top: '25%', left: '-20%', animationDuration: '60s'}}>cloud</span>
        <span className="material-symbols-outlined cloud text-white text-[100px]" style={{top: '60%', left: '-15%', animationDuration: '50s'}}>cloud</span>
        <span className="material-symbols-outlined cloud text-white text-[140px]" style={{top: '80%', left: '-25%', animationDuration: '40s'}}>cloud</span>
        <span className="material-symbols-outlined star text-yellow-400 text-2xl absolute" style={{top: '15%', left: '10%', animationDelay: '0.5s'}}>grade</span>
        <span className="material-symbols-outlined star text-yellow-400 text-xl absolute" style={{top: '40%', left: '85%', animationDelay: '1.2s'}}>grade</span>
        <span className="material-symbols-outlined star text-yellow-400 text-3xl absolute" style={{top: '75%', left: '15%', animationDelay: '2s'}}>star</span>
        <span className="material-symbols-outlined star text-yellow-400 text-xl absolute" style={{top: '20%', left: '70%', animationDelay: '0.1s'}}>star</span>
        <span className="material-symbols-outlined star text-yellow-400 text-2xl absolute" style={{top: '85%', left: '80%', animationDelay: '1.5s'}}>grade</span>
        <span className="material-symbols-outlined star text-yellow-400 text-lg absolute" style={{top: '50%', left: '5%', animationDelay: '0.8s'}}>grade</span>
      </div>

      {/* Top AppBar */}
      <header className="fixed top-0 left-0 w-full flex justify-between items-center px-6 py-4 md:px-12 z-40 bg-white/50 backdrop-blur-sm border-b border-white/20">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-orange-500 text-4xl" style={{fontVariationSettings: "'FILL' 1"}}>local_fire_department</span>
          <span className="text-3xl font-black text-gray-800 tracking-tight">Lumo</span>
        </div>
        <div className="bg-white rounded-full p-1 flex gap-1 shadow-sm border-2 border-blue-100">
          <button 
            className={`px-4 py-2 rounded-full font-bold transition-all flex items-center gap-2 ${lang === 'en' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:bg-gray-100'}`}
            onClick={() => setLang('en')}
          >
            🇺🇸 EN
          </button>
          <button 
            className={`px-4 py-2 rounded-full font-bold transition-all flex items-center gap-2 ${lang === 'es' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:bg-gray-100'}`}
            onClick={() => setLang('es')}
          >
            🇪🇸 ES
          </button>
        </div>
      </header>

      {/* Hero Content Canvas */}
      <main className="relative z-10 w-full max-w-4xl px-6 flex flex-col items-center text-center space-y-8 mt-24">
        <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
          <div className="absolute inset-0 bg-blue-200/40 rounded-full blur-3xl"></div>
          <img 
            className="relative z-20 w-full h-full object-contain animate-[float-clouds_6s_ease-in-out_infinite]" 
            alt="Lumi Character" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4T8SVbT6g-uuXohU9yTCE6sycZ8kleeB5OOKBpsHaefQjb87KM2MZ8ua-G0yrqoJCnEnh21lQYLYo_eZIEzdA0_d7S1UiwLDFoJ62NVrDE5lH1j21GjiFkq_kgjilac_-zP2qG2cWGO5zDT8FMlwogcykuPipi06pG1DRYYRB9gteA3Ychp4jKSt_C6WfGX71M4ZPGA06lY9XFD8XSxStznSoBtzb1Jf2VvCyli0VRihdSjY-2L-59Ps-bFHDcktzsDiSM3B5"
          />
          <div className="absolute inset-0 pointer-events-none" id="particle-container"></div>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-black text-gray-800 leading-tight tracking-tight">
            ¿Listo para explorar, <br/><span className="text-blue-600">pequeña estrella?</span> 🌟
          </h1>
          <p className="text-lg md:text-xl font-medium text-gray-500 max-w-lg mx-auto">
            Únete a Lumi en un viaje mágico a través de historias, mundos y juegos diseñados solo para ti.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 w-full max-w-md md:max-w-none md:justify-center pt-6">
          <Link to="/login" className="w-full md:w-auto">
            <button className="btn-3d bg-blue-500 hover:bg-blue-600 text-white font-bold text-xl py-5 px-8 rounded-full flex items-center justify-center gap-3 w-full">
              <span className="material-symbols-outlined text-3xl font-bold" style={{fontVariationSettings: "'FILL' 1"}}>rocket_launch</span>
              ¡Empezar mi aventura!
            </button>
          </Link>
          <Link to="/login" className="w-full md:w-auto">
            <button className="btn-3d bg-purple-500 hover:bg-purple-600 text-white font-bold text-xl py-5 px-8 rounded-full flex items-center justify-center gap-3 w-full">
              <span className="material-symbols-outlined text-3xl font-bold">supervisor_account</span>
              Panel de Padres
            </button>
          </Link>
        </div>

        <a className="inline-flex pt-8 font-bold text-gray-400 hover:text-blue-500 transition-colors items-center gap-2" href="#">
          <span className="material-symbols-outlined text-xl">info</span>
          Cómo Lumo ayuda a crecer a tu hijo
        </a>
      </main>

      {/* Interactive Floor (Visual Grounding) */}
      <div className="fixed bottom-0 left-0 w-full h-24 bg-gradient-to-t from-surface-container to-transparent z-0"></div>
    </div>
  );
}
