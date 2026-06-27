import React, { useState } from "react";
import { Profile } from "../types";
import { Compass, Sparkles, BookOpen, Mic, Languages, Trophy, ShieldAlert, ShoppingBag, MapPin } from "lucide-react";
import { AvatarRenderer } from "./AvatarCreator";

interface WorldMapProps {
  profile: Profile;
  onNavigate: (screen: "dashboard" | "speak" | "stories" | "languages" | "shop" | "trophies" | "avatar") => void;
}

export const WorldMap: React.FC<WorldMapProps> = ({ profile, onNavigate }) => {
  const [hoveredIsland, setHoveredIsland] = useState<string | null>(null);

  // Determine unlock status
  const mountainUnlocked = profile.level >= 5;

  return (
    <div id="lumo-world-map" className="max-w-5xl mx-auto px-4 py-6">
      
      {/* Upper Info Row */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-sky-100 text-sky-500 rounded-2xl">
            <Compass className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold font-display text-slate-800">Lumo World Map</h1>
            <p className="text-slate-500">Pick an island destination to begin an exciting educational quest!</p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100/60 font-semibold text-sm">
          <span>🚩</span>
          <p className="text-slate-600">Active Location: <span className="text-indigo-600 font-bold">Whispering Meadows</span></p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: INTERACTIVE SVG MAP VIEWPORT */}
        <div className="lg:col-span-8 bg-gradient-to-tr from-sky-300 via-sky-200 to-emerald-100 p-4 rounded-3xl shadow-lg border-4 border-white relative min-h-[480px] overflow-hidden flex flex-col justify-between">
          
          {/* Animated decorative waves in the SVG background */}
          <div className="absolute top-1/4 left-1/3 text-4xl select-none animate-bounce-slow opacity-20 pointer-events-none">⛵</div>
          <div className="absolute bottom-1/4 right-1/4 text-4xl select-none animate-float opacity-25 pointer-events-none">🐬</div>
          <div className="absolute top-8 right-12 text-5xl select-none opacity-20 pointer-events-none">⛅</div>

          {/* Dotted Pathways SVG connecting locations */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
            {/* Path: Home (150, 300) -> Speak (350, 160) */}
            <path d="M 150 300 Q 250 210 350 160" fill="none" stroke="#64748B" strokeWidth="4" strokeDasharray="8 8" className="opacity-40" />
            {/* Path: Speak (350, 160) -> Stories (550, 240) */}
            <path d="M 350 160 Q 450 180 550 240" fill="none" stroke="#64748B" strokeWidth="4" strokeDasharray="8 8" className="opacity-40" />
            {/* Path: Stories (550, 240) -> Languages (450, 380) */}
            <path d="M 550 240 Q 510 320 450 380" fill="none" stroke="#64748B" strokeWidth="4" strokeDasharray="8 8" className="opacity-40" />
            {/* Path: Languages (450, 380) -> Home (150, 300) */}
            <path d="M 450 380 Q 280 360 150 300" fill="none" stroke="#64748B" strokeWidth="4" strokeDasharray="8 8" className="opacity-40" />
            {/* Path: Stories (550, 240) -> Mountain (700, 120) */}
            <path d="M 550 240 Q 640 180 700 120" fill="none" stroke="#64748B" strokeWidth="4" strokeDasharray="8 8" className="opacity-40" />
          </svg>

          {/* ACTIVE MAP PINS */}
          <div className="relative w-full h-[400px] z-10">
            
            {/* Destination 1: Central Home (150, 300) */}
            <button
              onClick={() => onNavigate("dashboard")}
              onMouseEnter={() => setHoveredIsland("Meadows (Main Hub)")}
              onMouseLeave={() => setHoveredIsland(null)}
              className="absolute left-[15%] top-[65%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group transition-transform hover:scale-115"
            >
              <div className="w-12 h-12 rounded-full bg-indigo-500 border-4 border-white text-white flex items-center justify-center shadow-lg animate-bounce">
                🏡
              </div>
              <span className="mt-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-700 shadow-sm border border-slate-100">
                Lumo Home
              </span>
            </button>

            {/* Destination 2: Echo Valley - Speak Module (350, 160) */}
            <button
              onClick={() => onNavigate("speak")}
              onMouseEnter={() => setHoveredIsland("Echo Valley (Speaking Practice)")}
              onMouseLeave={() => setHoveredIsland(null)}
              className="absolute left-[38%] top-[30%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group transition-transform hover:scale-115"
            >
              <div className="w-12 h-12 rounded-full bg-emerald-500 border-4 border-white text-white flex items-center justify-center shadow-lg hover:shadow-emerald-200">
                <Mic className="w-5 h-5" />
              </div>
              <span className="mt-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-700 shadow-sm border border-slate-100">
                Echo Valley
              </span>
            </button>

            {/* Destination 3: Story Sea - Read stories (550, 240) */}
            <button
              onClick={() => onNavigate("stories")}
              onMouseEnter={() => setHoveredIsland("Story Sea (Interactive Books)")}
              onMouseLeave={() => setHoveredIsland(null)}
              className="absolute left-[62%] top-[45%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group transition-transform hover:scale-115"
            >
              <div className="w-12 h-12 rounded-full bg-blue-500 border-4 border-white text-white flex items-center justify-center shadow-lg hover:shadow-blue-200">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="mt-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-700 shadow-sm border border-slate-100">
                Story Sea
              </span>
            </button>

            {/* Destination 4: Spanish Language Island (450, 380) */}
            <button
              onClick={() => onNavigate("languages")}
              onMouseEnter={() => setHoveredIsland("Spanish Sea (Language Vocab)")}
              onMouseLeave={() => setHoveredIsland(null)}
              className="absolute left-[50%] top-[78%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group transition-transform hover:scale-115"
            >
              <div className="w-12 h-12 rounded-full bg-purple-500 border-4 border-white text-white flex items-center justify-center shadow-lg hover:shadow-purple-200">
                <Languages className="w-5 h-5" />
              </div>
              <span className="mt-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-700 shadow-sm border border-slate-100">
                Spanish Island
              </span>
            </button>

            {/* Destination 5: Mystery Mountain (700, 120) - LOCKED UNTIL LVL 5 */}
            <div
              onMouseEnter={() => setHoveredIsland(mountainUnlocked ? "Mystery Mountain" : "Locked (Requires Level 5!)")}
              onMouseLeave={() => setHoveredIsland(null)}
              className="absolute left-[80%] top-[25%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group"
            >
              <button
                disabled={!mountainUnlocked}
                onClick={() => onNavigate("shop")} // Or specific mountain event
                className={`w-14 h-14 rounded-full border-4 border-white flex items-center justify-center shadow-lg transition-transform hover:scale-110 ${
                  mountainUnlocked ? "bg-amber-500 text-white" : "bg-slate-400 text-slate-200 cursor-not-allowed"
                }`}
              >
                {mountainUnlocked ? "⛰️" : "🔒"}
              </button>
              <span className="mt-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-700 shadow-sm border border-slate-100 flex items-center gap-1">
                Mystery Mountain
                {!mountainUnlocked && <span className="text-[10px] text-amber-500 font-extrabold">Lv5</span>}
              </span>
            </div>

            {/* PLOP AVATAR VISUALLY ON HOME LOCATION IN MAP */}
            <div className="absolute left-[15%] top-[50%] -translate-x-1/2 pointer-events-none z-20">
              <AvatarRenderer config={profile.avatar} size="sm" animate={true} className="w-12 h-12 shadow-md border-2 border-amber-300" />
            </div>

          </div>

          {/* Live Hover Info Strip */}
          <div className="bg-slate-900/80 backdrop-blur-md text-white p-3.5 rounded-2xl flex justify-between items-center z-10 font-medium text-xs border border-white/10">
            <span>🗺️ Hovering: <span className="text-brand-secondary font-bold">{hoveredIsland || "Open Sea"}</span></span>
            <span>⭐ Unlock rate: 100% active</span>
          </div>

        </div>

        {/* Right Side: Lumi Companion Dialogue Station */}
        <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6">
          
          {/* Owl Companion box */}
          <div className="bg-gradient-to-tr from-brand-purple to-indigo-700 p-5 rounded-2xl text-white relative overflow-hidden flex flex-col items-center text-center">
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/10 rounded-full blur-xl" />
            
            <div className="text-6xl animate-float mb-4">🦉</div>
            
            <h3 className="font-bold font-display text-md mb-2">Lumi's Companion advice</h3>
            
            <div className="bg-white/10 border border-white/10 p-3 rounded-xl text-xs text-indigo-100 leading-relaxed text-left w-full">
              {!mountainUnlocked ? (
                <p>Hoot hoot! You are currently at Level {profile.level}. Keep exploring <strong>Story Sea</strong> and earning stars to reach <strong>Level 5</strong> and unlock the foggy Mystery Mountain peak!</p>
              ) : (
                <p>Spectacular hoot! Mystery Mountain is unlocked! Visit the peak or check the Rewards Shop to customize outfits.</p>
              )}
            </div>
          </div>

          {/* Quick Menu shortcuts */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-800">Quick Portal Gates</h3>
            
            <button
              onClick={() => onNavigate("shop")}
              className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between text-left text-xs font-semibold text-slate-600 hover:bg-slate-100/60 transition-all"
            >
              <div className="flex items-center gap-2.5">
                <span className="p-2 bg-amber-50 text-amber-600 rounded-xl">🛒</span>
                <span>Magic Rewards Shop</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => onNavigate("trophies")}
              className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between text-left text-xs font-semibold text-slate-600 hover:bg-slate-100/60 transition-all"
            >
              <div className="flex items-center gap-2.5">
                <span className="p-2 bg-purple-50 text-purple-600 rounded-xl">🏅</span>
                <span>My Badges & Trophies</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => onNavigate("avatar")}
              className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between text-left text-xs font-semibold text-slate-600 hover:bg-slate-100/60 transition-all"
            >
              <div className="flex items-center gap-2.5">
                <span className="p-2 bg-rose-50 text-rose-600 rounded-xl">🎨</span>
                <span>Customize Explorer Avatar</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};

// Simple ChevronRight utility for shortcuts
const ChevronRight: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
);
