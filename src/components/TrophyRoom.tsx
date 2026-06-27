import React, { useState } from "react";
import { Profile, Badge } from "../types";
import { BADGES } from "../data";
import { Award, Star, Compass, ShieldAlert, Sparkles, X, ChevronRight } from "lucide-react";
import * as LucideIcons from "lucide-react";

interface TrophyRoomProps {
  profile: Profile;
  onBack: () => void;
}

export const TrophyRoom: React.FC<TrophyRoomProps> = ({ profile, onBack }) => {
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);

  // Helper to render Lucide Icons dynamically from name
  const renderBadgeIcon = (iconName: string, sizeClass = "w-8 h-8") => {
    // Falls back to Award if not found
    const IconComponent = (LucideIcons as any)[iconName] || Award;
    return <IconComponent className={sizeClass} />;
  };

  return (
    <div id="trophy-room-component" className="max-w-5xl mx-auto px-4 py-6">
      
      {/* Title Header banner */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-100 text-amber-500 rounded-2xl">
            <Award className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold font-display text-slate-800">Trophy & Badges Room</h1>
            <p className="text-slate-500">Celebrate your achievements, stardust points, and milestones!</p>
          </div>
        </div>

        <div className="flex gap-4 items-center bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100">
          <div className="flex items-center gap-1.5">
            <span className="text-xl">✨</span>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase leading-none">Stardust</p>
              <p className="text-sm font-mono font-bold text-slate-800">{profile.stardust}</p>
            </div>
          </div>
          <div className="h-6 w-px bg-slate-200" />
          <div className="flex items-center gap-1.5">
            <span className="text-xl">⭐</span>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase leading-none">Stars</p>
              <p className="text-sm font-mono font-bold text-amber-600">{profile.stars}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quest Banner */}
      <div className="bg-gradient-to-r from-brand-purple to-indigo-600 p-6 rounded-3xl text-white relative overflow-hidden mb-8 shadow">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/5 skew-x-12" />
        <div className="absolute right-8 top-1/2 -translate-y-1/2 text-5xl opacity-20 pointer-events-none">🛡️</div>
        
        <span className="text-xs font-bold uppercase tracking-widest bg-white/25 px-3 py-1 rounded-full text-brand-secondary">
          Active Special Quest
        </span>
        <h3 className="text-xl font-bold font-display mt-3 mb-1">Language Explorer Challenge</h3>
        <p className="text-indigo-100 text-sm max-w-xl">
          Complete matching games in 3 different Spanish Sea categories to unlock the golden <strong>Stardust Sovereign</strong> badge and +150 bonus Stars!
        </p>

        <div className="mt-4 flex items-center gap-3">
          <div className="flex-1 max-w-xs bg-black/20 h-2.5 rounded-full overflow-hidden">
            <div className="bg-brand-secondary h-full rounded-full" style={{ width: `${(profile.completedVocab.length / 3) * 100}%` }} />
          </div>
          <span className="text-xs font-semibold text-indigo-100">{profile.completedVocab.length} / 3 categories</span>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <span>🏅</span> Your Explorer Medallions
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
          {BADGES.map((badge) => {
            const isUnlocked = profile.badges.includes(badge.id);
            return (
              <button
                key={badge.id}
                onClick={() => setSelectedBadge(badge)}
                className={`flex flex-col items-center justify-between p-4 rounded-3xl border-2 transition-all relative ${
                  isUnlocked
                    ? "border-slate-100 hover:border-slate-300 hover:-translate-y-1 bg-slate-50/30"
                    : "border-slate-100 bg-slate-100/50 opacity-40 hover:opacity-60"
                }`}
              >
                {!isUnlocked && (
                  <div className="absolute top-2 right-2 text-slate-400" title="Locked">
                    🔒
                  </div>
                )}

                <div className={`p-4 rounded-2xl mb-4 border transition-transform ${
                  isUnlocked ? badge.color : "bg-slate-200 text-slate-400 border-slate-300"
                }`}>
                  {renderBadgeIcon(badge.iconName, "w-8 h-8")}
                </div>

                <div className="text-center w-full">
                  <p className="font-bold font-display text-sm text-slate-800 truncate leading-tight">
                    {badge.name}
                  </p>
                  <p className="text-[10px] text-slate-400 font-bold tracking-wider mt-1 uppercase">
                    {isUnlocked ? "UNLOCKED" : "LOCKED"}
                  </p>
                </div>
              </button>
            );
          })}

          {/* Locked Placeholders */}
          {Array.from({ length: 6 }).map((_, idx) => (
            <div 
              key={idx}
              className="flex flex-col items-center justify-center p-4 rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50/20 opacity-50"
            >
              <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 text-slate-300 text-xl font-bold">
                ?
              </div>
              <p className="text-xs text-slate-400 mt-3 font-semibold">Coming Soon</p>
            </div>
          ))}
        </div>
      </div>

      {/* Celebration / Detail Modal */}
      {selectedBadge && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative text-center border border-slate-100">
            <button
              onClick={() => setSelectedBadge(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-50 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Shine Effects */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-amber-400/20 rounded-full blur-xl pointer-events-none animate-pulse" />

            <div className={`mx-auto w-20 h-20 rounded-2xl flex items-center justify-center mb-6 border text-3xl shadow-md ${
              profile.badges.includes(selectedBadge.id) 
                ? selectedBadge.color 
                : "bg-slate-200 text-slate-400 border-slate-300"
            }`}>
              {renderBadgeIcon(selectedBadge.iconName, "w-10 h-10")}
            </div>

            <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${
              profile.badges.includes(selectedBadge.id)
                ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                : "bg-slate-100 text-slate-400 border-slate-200"
            }`}>
              {profile.badges.includes(selectedBadge.id) ? "✨ Unlocked Achievement" : "🔒 Quest Locked"}
            </span>

            <h3 className="text-2xl font-bold font-display text-slate-800 mt-4 mb-2">{selectedBadge.name}</h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-6 px-4">{selectedBadge.description}</p>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100/80 text-xs text-slate-500 flex flex-col gap-2">
              <div className="flex justify-between font-semibold">
                <span>Category:</span>
                <span className="capitalize text-slate-700">{selectedBadge.category} Explorer</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Value:</span>
                <span className="text-amber-600">+100 Starlight Stardust</span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={() => setSelectedBadge(null)}
                className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-full shadow-md hover:shadow-lg transition-all"
              >
                Keep Exploring!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Nav Spacer */}
      <div className="mt-12 text-center">
        <button
          onClick={onBack}
          className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-full shadow transition-all inline-flex items-center gap-2 text-sm"
        >
          Back to Dashboard
        </button>
      </div>

    </div>
  );
};
