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
    <div className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden bg-surface">
      {/* Magical Background Elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <span className="material-symbols-outlined cloud text-white text-[120px]" style={{top: '10%', left: '-10%', animationDuration: '45s'}}>cloud</span>
        <span className="material-symbols-outlined cloud text-white text-[80px]" style={{top: '25%', left: '-20%', animationDuration: '60s'}}>cloud</span>
        <span className="material-symbols-outlined cloud text-white text-[100px]" style={{top: '60%', left: '-15%', animationDuration: '50s'}}>cloud</span>
        <span className="material-symbols-outlined cloud text-white text-[140px]" style={{top: '80%', left: '-25%', animationDuration: '40s'}}>cloud</span>
        <span className="material-symbols-outlined star text-2xl" style={{top: '15%', left: '10%', animationDelay: '0.5s'}}>grade</span>
        <span className="material-symbols-outlined star text-xl" style={{top: '40%', left: '85%', animationDelay: '1.2s'}}>grade</span>
        <span className="material-symbols-outlined star text-3xl" style={{top: '75%', left: '15%', animationDelay: '2s'}}>star</span>
        <span className="material-symbols-outlined star text-xl" style={{top: '20%', left: '70%', animationDelay: '0.1s'}}>star</span>
        <span className="material-symbols-outlined star text-2xl" style={{top: '85%', left: '80%', animationDelay: '1.5s'}}>grade</span>
        <span className="material-symbols-outlined star text-lg" style={{top: '50%', left: '5%', animationDelay: '0.8s'}}>grade</span>
      </div>

      {/* Top AppBar */}
      <header className="fixed top-0 left-0 w-full flex justify-between items-center px-margin-mobile py-sm md:px-margin-desktop z-40">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-4xl" style={{fontVariationSettings: "'FILL' 1"}}>local_fire_department</span>
          <span className="font-headline-lg-mobile text-headline-lg-mobile text-primary tracking-tight">Lumo</span>
        </div>
        <div className="bg-surface-container-high rounded-full p-1 flex gap-1 shadow-sm border border-outline-variant/30">
          <button 
            className={`px-4 py-1 rounded-full text-label-caps font-label-caps transition-all flex items-center gap-2 ${lang === 'en' ? 'lang-active' : 'text-on-surface-variant hover:bg-surface-variant'}`}
            onClick={() => setLang('en')}
          >
            🇺🇸 EN
          </button>
          <button 
            className={`px-4 py-1 rounded-full text-label-caps font-label-caps transition-all flex items-center gap-2 ${lang === 'es' ? 'lang-active' : 'text-on-surface-variant hover:bg-surface-variant'}`}
            onClick={() => setLang('es')}
          >
            🇪🇸 ES
          </button>
        </div>
      </header>

      {/* Hero Content Canvas */}
      <main className="relative z-10 w-full max-w-4xl px-margin-mobile flex flex-col items-center text-center space-y-lg mt-20">
        <div className="lumi-container relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
          <div className="absolute inset-0 bg-primary-container/30 rounded-full blur-3xl"></div>
          <img 
            className="relative z-20 w-full h-full object-contain" 
            alt="Lumi Character" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4T8SVbT6g-uuXohU9yTCE6sycZ8kleeB5OOKBpsHaefQjb87KM2MZ8ua-G0yrqoJCnEnh21lQYLYo_eZIEzdA0_d7S1UiwLDFoJ62NVrDE5lH1j21GjiFkq_kgjilac_-zP2qG2cWGO5zDT8FMlwogcykuPipi06pG1DRYYRB9gteA3Ychp4jKSt_C6WfGX71M4ZPGA06lY9XFD8XSxStznSoBtzb1Jf2VvCyli0VRihdSjY-2L-59Ps-bFHDcktzsDiSM3B5"
          />
          <div className="absolute inset-0 pointer-events-none" id="particle-container"></div>
        </div>

        <div className="space-y-sm">
          <h1 className="font-headline-xl text-headline-xl text-on-surface leading-tight">
            Ready to explore, <br/><span className="text-primary">little star?</span>
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg mx-auto">
            Join Lumi on a magical journey through stories, worlds, and games designed just for you.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-md w-full max-w-md md:max-w-none md:justify-center pt-md">
          <Link to="/login" className="w-full md:w-auto">
            <button className="btn-3d bg-primary text-on-primary font-interactive-text text-interactive-text py-md px-xl rounded-xl flex items-center justify-center gap-3 w-full">
              <span className="material-symbols-outlined text-3xl" style={{fontVariationSettings: "'FILL' 1"}}>rocket_launch</span>
              Start My Adventure
            </button>
          </Link>
          <Link to="/login" className="w-full md:w-auto">
            <button className="btn-secondary-3d bg-secondary text-on-secondary font-interactive-text text-interactive-text py-md px-xl rounded-xl flex items-center justify-center gap-3 w-full">
              <span className="material-symbols-outlined text-3xl">supervisor_account</span>
              Parent Login
            </button>
          </Link>
        </div>

        <a className="inline-flex pt-md text-outline font-label-caps text-label-caps hover:text-primary transition-colors items-center gap-2" href="#">
          <span className="material-symbols-outlined text-lg">info</span>
          How Lumo helps your child grow
        </a>
      </main>

      {/* Interactive Floor (Visual Grounding) */}
      <div className="fixed bottom-0 left-0 w-full h-24 bg-gradient-to-t from-surface-container to-transparent z-0"></div>
    </div>
  );
}
