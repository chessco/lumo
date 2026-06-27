import React from "react";
import { Profile } from "../types";
import { 
  Sparkles, Star, Award, Compass, Mic, BookOpen, Languages, 
  ChevronRight, ArrowRight, Palette, Trophy, LogOut
} from "lucide-react";
import { AvatarRenderer } from "./AvatarCreator";

interface DashboardProps {
  profile: Profile;
  onNavigate: (screen: "dashboard" | "world" | "speak" | "stories" | "languages" | "shop" | "trophies" | "avatar") => void;
  onLogout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ profile, onNavigate, onLogout }) => {
  
  // Daily goal calculation
  const dailyGoalStars = 50;
  const currentDailyStars = Math.min(profile.learningMinutesToday * 3, dailyGoalStars); // simulated
  const dailyProgressPercent = Math.round((currentDailyStars / dailyGoalStars) * 100);

  return (
    <div id="lumo-dashboard-container" className="max-w-5xl mx-auto px-4 py-6 space-y-8">
      
      {/* 1. Header Hero Card */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden">
        
        {/* Ambient background blob */}
        <div className="absolute -left-10 -top-10 w-40 h-40 bg-brand-sky/15 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute right-0 bottom-0 w-36 h-36 bg-brand-purple/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center gap-5 relative z-10 w-full md:w-auto">
          <AvatarRenderer config={profile.avatar} size="lg" className="w-20 h-20 border-brand-secondary" />
          <div className="space-y-1">
            <h1 className="text-3xl font-bold font-display text-slate-800">Hi, {profile.name}!</h1>
            <p className="text-slate-500 text-sm flex items-center gap-1">
              <span>🚀</span> Level {profile.level} Language Explorer
            </p>
          </div>
        </div>

        {/* Level & Points Summary */}
        <div className="flex gap-4 items-center bg-slate-50 p-4 rounded-3xl border border-slate-100/60 relative z-10 w-full md:w-auto justify-around">
          
          <div className="flex items-center gap-2">
            <div className="text-3xl">⭐</div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase leading-none">Stars</p>
              <p className="text-lg font-mono font-bold text-amber-600">{profile.stars}</p>
            </div>
          </div>

          <div className="h-8 w-px bg-slate-200" />

          <div className="flex items-center gap-2">
            <div className="text-3xl">✨</div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase leading-none">Stardust</p>
              <p className="text-lg font-mono font-bold text-brand-purple">{profile.stardust}</p>
            </div>
          </div>

          <div className="h-8 w-px bg-slate-200" />

          <button
            onClick={onLogout}
            className="p-2 hover:bg-slate-200 rounded-2xl text-slate-400 hover:text-rose-500 transition-colors"
            title="Log out / Switch Explorer"
          >
            <LogOut className="w-5 h-5" />
          </button>

        </div>
      </div>

      {/* 2. Daily Mission & Recommendations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Daily Mission Card */}
        <div className="md:col-span-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between min-h-[190px]">
          <div>
            <span className="text-[10px] bg-amber-50 text-amber-600 font-bold border border-amber-200 px-2.5 py-1 rounded-full uppercase tracking-wider">
              ⭐ Daily Mission
            </span>
            <h3 className="text-lg font-bold text-slate-800 mt-3.5 mb-1">Star Catcher</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Complete interactive games and stories today to secure 50 Stars!
            </p>
          </div>

          <div className="space-y-2 pt-4">
            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden border border-slate-200/40">
              <div className="bg-gradient-to-r from-amber-400 to-amber-500 h-full rounded-full transition-all duration-500" style={{ width: `${dailyProgressPercent}%` }} />
            </div>
            <div className="flex justify-between text-xs font-bold text-slate-500">
              <span>{dailyProgressPercent}% Completed</span>
              <span className="font-mono text-amber-600">{currentDailyStars} / {dailyGoalStars} ⭐</span>
            </div>
          </div>
        </div>

        {/* Recommended Activity Card */}
        <div className="md:col-span-8 bg-gradient-to-r from-brand-sky/10 via-brand-purple/5 to-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-6 min-h-[190px] relative">
          
          <div className="space-y-2 text-left">
            <span className="text-[10px] bg-brand-purple text-white font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
              🔥 Recommended Quest
            </span>
            <h3 className="text-xl font-bold font-display text-slate-800 pt-1.5">The Brave Little Star</h3>
            <p className="text-slate-500 text-sm max-w-md leading-relaxed">
              Twinkle the fallen star is lost in a purple grass field! Help Twinkle find the path back to the Golden Cloud!
            </p>
          </div>

          <button
            onClick={() => onNavigate("stories")}
            className="w-full sm:w-auto shrink-0 px-6 py-3 bg-brand-primary text-white font-bold rounded-full shadow-md hover:bg-rose-500 hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            Start Reading <ArrowRight className="w-4.5 h-4.5" />
          </button>
        </div>

      </div>

      {/* 3. Quick Access Portals Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Quick Portal Gates</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          
          {/* Lumo World Shortcut */}
          <button
            onClick={() => onNavigate("world")}
            className="bg-white p-5 rounded-3xl border-2 border-slate-100 hover:border-sky-400 hover:-translate-y-1 transition-all text-center flex flex-col items-center group shadow-sm hover:shadow"
          >
            <div className="text-5xl p-4 bg-sky-50 rounded-2xl mb-4 group-hover:scale-105 transition-transform animate-wiggle-slow">
              🗺️
            </div>
            <h3 className="font-bold text-slate-800 text-sm">Lumo World</h3>
            <p className="text-slate-400 text-[10px] mt-1 font-semibold">Adventure Map</p>
          </button>

          {/* Lumo Speak Shortcut */}
          <button
            onClick={() => onNavigate("speak")}
            className="bg-white p-5 rounded-3xl border-2 border-slate-100 hover:border-emerald-400 hover:-translate-y-1 transition-all text-center flex flex-col items-center group shadow-sm hover:shadow"
          >
            <div className="text-5xl p-4 bg-emerald-50 rounded-2xl mb-4 group-hover:scale-105 transition-transform animate-wiggle-slow">
              🎤
            </div>
            <h3 className="font-bold text-slate-800 text-sm">Lumo Speak</h3>
            <p className="text-slate-400 text-[10px] mt-1 font-semibold">Phonetics Practice</p>
          </button>

          {/* Lumo Read Shortcut */}
          <button
            onClick={() => onNavigate("stories")}
            className="bg-white p-5 rounded-3xl border-2 border-slate-100 hover:border-blue-400 hover:-translate-y-1 transition-all text-center flex flex-col items-center group shadow-sm hover:shadow"
          >
            <div className="text-5xl p-4 bg-blue-50 rounded-2xl mb-4 group-hover:scale-105 transition-transform animate-wiggle-slow">
              📚
            </div>
            <h3 className="font-bold text-slate-800 text-sm">Lumo Stories</h3>
            <p className="text-slate-400 text-[10px] mt-1 font-semibold">Interactive Books</p>
          </button>

          {/* Lumo Languages Shortcut */}
          <button
            onClick={() => onNavigate("languages")}
            className="bg-white p-5 rounded-3xl border-2 border-slate-100 hover:border-purple-400 hover:-translate-y-1 transition-all text-center flex flex-col items-center group shadow-sm hover:shadow"
          >
            <div className="text-5xl p-4 bg-purple-50 rounded-2xl mb-4 group-hover:scale-105 transition-transform animate-wiggle-slow">
              🌍
            </div>
            <h3 className="font-bold text-slate-800 text-sm">Lumo Languages</h3>
            <p className="text-slate-400 text-[10px] mt-1 font-semibold">Vocabulary Cards</p>
          </button>

        </div>
      </div>

      {/* 4. Side Companion Floating Dialog widget */}
      <div className="bg-slate-100/50 border border-slate-100/60 p-5 rounded-3xl flex flex-col sm:flex-row items-center gap-5 shadow-inner">
        <div className="text-6xl animate-float shrink-0 select-none">🦉</div>
        <div className="text-left space-y-1">
          <h4 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
            Lumi floating companion <span className="text-[10px] bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full font-bold">ONLINE</span>
          </h4>
          <p className="text-xs text-slate-500 leading-relaxed leading-normal">
            "Hoot hoot! You're doing amazing, {profile.name}! Try visiting the <strong>Echo Valley</strong> to practice pronouncing 'Butterfly' and unlock another star medal!"
          </p>
        </div>
      </div>

    </div>
  );
};
