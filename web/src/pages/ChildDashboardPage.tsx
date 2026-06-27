import React from 'react';
import { Link } from 'react-router-dom';

export default function ChildDashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-200 via-gray-100 to-blue-50 font-sans p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Top Header - Lumi Chat Bubble */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-blue-900 shrink-0 relative">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-200 via-blue-900 to-black"></div>
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSuNP2sXpWx8OrdaD_EFwF9hV7ZHuiij8thGdHMFTrIPlcElbZT3XirkIq4dRKpR7SST-NM-5B7bGwXGCqV3mSS0qfSfUbu8U53csokF1XOfgCos1h6lHCxGU3P-yE-YiL4TGWr8zi3l3-ryNr4pJOoP-zG9ca_rMFCPM9NCX2PFqxk0ZBu2kr1RnnE6wPmE950VwC_CKmwhrWKt1bcdQOEp9X_RUaHIRSqfXK88T4N9kCaG-gtQgMvWQ_A54azUsPXreu50MT" 
              alt="Lumi"
              className="w-full h-full object-cover mix-blend-screen brightness-125"
            />
          </div>
          <div className="bg-white rounded-[32px] md:rounded-bl-none p-6 md:p-8 shadow-sm relative max-w-md">
            <div className="hidden md:block absolute -bottom-4 left-0 w-8 h-8 bg-white" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}></div>
            <p className="text-xl md:text-2xl font-medium text-gray-800">
              Hi Alex! Ready for a new story adventure today?
            </p>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Daily Mission */}
          <div className="lg:col-span-4 bg-[#FFF5EB] rounded-[32px] p-8 shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-[#6B4C9A] font-bold text-sm tracking-wider mb-2 uppercase">Daily Mission</p>
                <h3 className="text-3xl font-black text-gray-900 tracking-tight">Star Catcher</h3>
              </div>
              <div className="w-12 h-12 bg-[#8B5CF6] rounded-full flex items-center justify-center text-white shadow-sm shrink-0">
                <span className="material-symbols-outlined text-2xl" style={{fontVariationSettings: "'FILL' 1"}}>auto_awesome</span>
              </div>
            </div>
            
            <p className="text-gray-600 font-medium mb-10 text-lg">
              Earn 50 stars by reading one story to Lumi!
            </p>
            
            <div className="space-y-4">
              <div className="flex justify-between text-sm font-bold text-gray-500">
                <span>Progress</span>
                <span>15 / 50</span>
              </div>
              <div className="h-4 bg-[#E5D5C5] rounded-full overflow-hidden relative">
                <div className="h-full bg-gradient-to-r from-[#FBBF24] to-[#F59E0B] rounded-full" style={{ width: '30%' }}></div>
                <div className="absolute top-0 left-[30%] w-2 h-4 bg-white/50 -ml-1"></div>
              </div>
              <div className="flex gap-2 pt-2">
                <div className="w-10 h-10 rounded-full bg-[#FBBF24] flex items-center justify-center text-orange-700 shadow-sm">
                  <span className="material-symbols-outlined text-xl" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#E5D5C5] flex items-center justify-center text-orange-200">
                  <span className="material-symbols-outlined text-xl" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#E5D5C5] flex items-center justify-center text-orange-200">
                  <span className="material-symbols-outlined text-xl" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recommended Activity */}
          <div className="lg:col-span-8 bg-[#D6D1C9] rounded-[40px] p-8 md:p-10 border-2 border-dashed border-[#F59E0B] flex flex-col md:flex-row gap-8 items-center relative overflow-hidden">
            <div className="flex-1 z-10">
              <span className="bg-[#926017] text-white text-sm font-black px-4 py-1.5 rounded-full uppercase tracking-wider mb-6 inline-block">
                Recommended
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight mb-4">
                The Brave Little<br/>Toaster
              </h2>
              <p className="text-gray-700 font-medium text-lg mb-10 max-w-sm">
                A speaking exercise: Help Lumi pronounce tricky words as we explore the kitchen kingdom!
              </p>
              
              <Link to="/speech/session/default" className="inline-flex bg-[#926017] hover:bg-[#784f13] text-white px-8 py-4 rounded-full font-black text-lg items-center gap-3 transition-transform active:scale-95 shadow-lg decoration-transparent">
                Start Reading
                <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>play_arrow</span>
              </Link>
            </div>
            <div className="w-full md:w-64 h-64 md:h-80 rounded-[32px] overflow-hidden shadow-2xl z-10 shrink-0 border-4 border-white/20">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCyjeRmDZdD5TK7bwPUBZTvvW5dcotvliy1-FBYTbr8Kcf_KL77ks8FGyW5_0V9NMDUNBMRim9qHFvEGqE4cnUY7hQsP8D-w6Sw7paqcyoAjWpUPNmI8qxhj4-i9QEebmQowEZ5ZQypX4bM4OoOk7Qn8mARDReak03rfRmjPFouM0Lc4XNdV7wRbq_2inqyn-D5KxvOQ9GR71kUUHa57h7LMwd4hAkxgUiUWx8gbzW3KKPcSSlBZqiQFITgy28w-67j9OWnD19" 
                alt="Story Thumbnail" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Bottom Actions Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 pt-4">
          <Link to="/speech/session/child1" className="bg-[#FFF5EB] hover:bg-[#ffe8d6] transition-colors p-6 rounded-[32px] flex flex-col items-center justify-center gap-4 group decoration-transparent">
            <div className="w-20 h-20 bg-[#E9D5FF] text-[#9333EA] rounded-[24px] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-4xl" style={{fontVariationSettings: "'FILL' 1"}}>mic</span>
            </div>
            <span className="font-bold text-gray-800">Lumo Speak</span>
          </Link>
          
          <Link to="/exercises" className="bg-[#FFF5EB] hover:bg-[#ffe8d6] transition-colors p-6 rounded-[32px] flex flex-col items-center justify-center gap-4 group decoration-transparent">
            <div className="w-20 h-20 bg-[#FDE68A] text-[#B45309] rounded-[24px] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-4xl" style={{fontVariationSettings: "'FILL' 1"}}>menu_book</span>
            </div>
            <span className="font-bold text-gray-800">Lumo Read</span>
          </Link>
          
          <Link to="/languages" className="bg-[#FFF5EB] hover:bg-[#ffe8d6] transition-colors p-6 rounded-[32px] flex flex-col items-center justify-center gap-4 group decoration-transparent">
            <div className="w-20 h-20 bg-[#A7F3D0] text-[#059669] rounded-[24px] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-4xl" style={{fontVariationSettings: "'FILL' 1"}}>public</span>
            </div>
            <span className="font-bold text-gray-800">Lumo Languages</span>
          </Link>
          
          <Link to="/stories" className="bg-[#FFF5EB] hover:bg-[#ffe8d6] transition-colors p-6 rounded-[32px] flex flex-col items-center justify-center gap-4 group decoration-transparent">
            <div className="w-20 h-20 bg-[#C4B5FD] text-[#5B21B6] rounded-[24px] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-4xl" style={{fontVariationSettings: "'FILL' 1"}}>auto_awesome</span>
            </div>
            <span className="font-bold text-gray-800">Lumo Stories</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
