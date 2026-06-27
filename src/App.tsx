import React, { useState, useEffect } from "react";
import { Profile, AvatarConfig } from "./types";
import { INITIAL_PROFILES } from "./data";
import { Welcome } from "./components/Welcome";
import { Dashboard } from "./components/Dashboard";
import { WorldMap } from "./components/WorldMap";
import { LumoSpeak } from "./components/LumoSpeak";
import { LumoStories } from "./components/LumoStories";
import { LumoLanguages } from "./components/LumoLanguages";
import { RewardShop } from "./components/RewardShop";
import { TrophyRoom } from "./components/TrophyRoom";
import { AvatarCreator } from "./components/AvatarCreator";
import { ParentDashboard } from "./components/ParentDashboard";
import { 
  Sparkles, Star, Award, Compass, Mic, BookOpen, Languages, 
  ShoppingBag, Settings, LayoutGrid, Palette, LogOut, ChevronRight
} from "lucide-react";

export default function App() {
  const [profiles, setProfiles] = useState<Profile[]>(() => {
    const saved = localStorage.getItem("lumo_profiles");
    return saved ? JSON.parse(saved) : INITIAL_PROFILES;
  });

  const [activeProfileId, setActiveProfileId] = useState<string | null>(() => {
    return localStorage.getItem("lumo_active_profile_id");
  });

  const [activeScreen, setActiveScreen] = useState<
    "dashboard" | "world" | "speak" | "stories" | "languages" | "shop" | "trophies" | "avatar" | "parent"
  >("dashboard");

  // Sync state changes to localStorage
  useEffect(() => {
    localStorage.setItem("lumo_profiles", JSON.stringify(profiles));
  }, [profiles]);

  useEffect(() => {
    if (activeProfileId) {
      localStorage.setItem("lumo_active_profile_id", activeProfileId);
    } else {
      localStorage.removeItem("lumo_active_profile_id");
    }
  }, [activeProfileId]);

  const activeProfile = profiles.find((p) => p.id === activeProfileId) || null;

  const handleSelectProfile = (profileId: string) => {
    setActiveProfileId(profileId);
    setActiveScreen("dashboard");
    
    // Play lovely chime
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.frequency.setValueAtTime(440, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.2);
    } catch(err){}
  };

  const handleLogout = () => {
    setActiveProfileId(null);
    setActiveScreen("dashboard");
  };

  // 1. Reward Earning Callback (e.g. from stories, speech, vocab island completion)
  const handleEarnReward = (starsGained: number, stardustGained: number, completedId: string) => {
    if (!activeProfileId) return;

    setProfiles((prev) =>
      prev.map((p) => {
        if (p.id === activeProfileId) {
          // Check if completion is already recorded
          const isStory = completedId.includes("brave") || completedId.includes("lumi-flight");
          const isSpeak = completedId.includes("butterfly") || completedId.includes("rainbow") || completedId.includes("dinosaur") || completedId.includes("sunshine") || completedId.includes("adventure") || completedId.includes("treasure");
          
          let completedStories = p.completedStories;
          let completedSpeak = p.completedSpeak;
          let completedVocab = p.completedVocab;
          let earnedBadges = [...p.badges];

          if (isStory) {
            if (!completedStories.includes(completedId)) {
              completedStories = [...completedStories, completedId];
              if (!earnedBadges.includes("story-master")) {
                earnedBadges.push("story-master");
              }
            }
          } else if (isSpeak) {
            if (!completedSpeak.includes(completedId)) {
              completedSpeak = [...completedSpeak, completedId];
              if (!earnedBadges.includes("super-speaker")) {
                earnedBadges.push("super-speaker");
              }
            }
          } else {
            // It's vocab island completion
            if (!completedVocab.includes(completedId)) {
              completedVocab = [...completedVocab, completedId];
              if (!earnedBadges.includes("word-wizard")) {
                earnedBadges.push("word-wizard");
              }
            }
          }

          // Check for Star Catcher Badge
          const nextStars = p.stars + starsGained;
          if (nextStars >= 1500 && !earnedBadges.includes("star-catcher")) {
            earnedBadges.push("star-catcher");
          }

          return {
            ...p,
            stars: nextStars,
            stardust: p.stardust + stardustGained,
            completedStories,
            completedSpeak,
            completedVocab,
            badges: earnedBadges,
            learningMinutesToday: p.learningMinutesToday + 5, // add 5 learning minutes
            totalLearningMinutes: p.totalLearningMinutes + 5
          };
        }
        return p;
      })
    );
  };

  // 2. Reward Shop Purchase handler
  const handleBuyItem = (itemId: string, cost: number) => {
    if (!activeProfileId) return;
    setProfiles((prev) =>
      prev.map((p) => {
        if (p.id === activeProfileId) {
          return {
            ...p,
            stars: Math.max(0, p.stars - cost),
            unlockedItems: [...p.unlockedItems, itemId]
          };
        }
        return p;
      })
    );
  };

  // 3. Equip Avatar item callback
  const handleEquipItem = (
    assetType: "hair" | "accessory" | "outfit" | "eyes" | "pet",
    value: string
  ) => {
    if (!activeProfileId) return;
    setProfiles((prev) =>
      prev.map((p) => {
        if (p.id === activeProfileId) {
          const updatedAvatar = { ...p.avatar };
          if (assetType === "hair") updatedAvatar.hair = value;
          if (assetType === "eyes") updatedAvatar.eyes = value;
          if (assetType === "outfit") updatedAvatar.outfit = value;
          if (assetType === "accessory" || assetType === "pet") {
            updatedAvatar.accessory = value;
          }

          let earnedBadges = [...p.badges];
          if (!earnedBadges.includes("avatar-maker")) {
            earnedBadges.push("avatar-maker");
          }

          return {
            ...p,
            avatar: updatedAvatar,
            badges: earnedBadges
          };
        }
        return p;
      })
    );
  };

  // 4. Save Avatar Config directly from creator panel
  const handleSaveAvatar = (newConfig: AvatarConfig) => {
    if (!activeProfileId) return;
    setProfiles((prev) =>
      prev.map((p) => {
        if (p.id === activeProfileId) {
          let earnedBadges = [...p.badges];
          if (!earnedBadges.includes("avatar-maker")) {
            earnedBadges.push("avatar-maker");
          }
          return {
            ...p,
            avatar: newConfig,
            badges: earnedBadges
          };
        }
        return p;
      })
    );
  };

  return (
    <div id="lumo-app-root" className="min-h-screen flex flex-col bg-[#F8FAFC] pb-12">
      
      {/* Dynamic Header overlay */}
      <header className="bg-white border-b border-slate-100 shadow-sm px-6 py-4 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          
          {/* Lumo Playful Logo */}
          <button
            onClick={() => setActiveScreen("dashboard")}
            className="flex items-center gap-2 text-left group cursor-pointer"
          >
            <div className="p-2 bg-brand-primary rounded-xl text-white font-display text-xl leading-none animate-wiggle-slow">
              🦉
            </div>
            <div>
              <span className="text-2xl font-black font-display text-slate-800 tracking-wider">LUMO</span>
              <span className="text-[10px] block font-mono font-bold text-slate-400 tracking-widest -mt-1 uppercase">
                Early Explorer Suite
              </span>
            </div>
          </button>

          {/* Navigation Overlay (only when child is active) */}
          {activeProfile && activeScreen !== "parent" && (
            <div className="hidden md:flex space-x-1.5 bg-slate-100/70 p-1 rounded-2xl border border-slate-200/40">
              <button
                onClick={() => setActiveScreen("dashboard")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeScreen === "dashboard" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" /> Dashboard
              </button>
              <button
                onClick={() => setActiveScreen("world")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeScreen === "world" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <Compass className="w-3.5 h-3.5" /> World Map
              </button>
              <button
                onClick={() => setActiveScreen("speak")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeScreen === "speak" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <Mic className="w-3.5 h-3.5" /> Speak Lab
              </button>
              <button
                onClick={() => setActiveScreen("stories")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeScreen === "stories" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" /> Read
              </button>
              <button
                onClick={() => setActiveScreen("languages")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeScreen === "languages" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <Languages className="w-3.5 h-3.5" /> Languages
              </button>
              <button
                onClick={() => setActiveScreen("shop")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeScreen === "shop" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5" /> Rewards Shop
              </button>
            </div>
          )}

          {/* Settings / Parent gate button */}
          {activeScreen !== "parent" && (
            <button
              onClick={() => setActiveScreen("parent")}
              className="px-4 py-2 rounded-full border-2 border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-800 font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <Settings className="w-4 h-4 text-slate-400" /> Grown-ups
            </button>
          )}

        </div>
      </header>

      {/* Main Screen Panel View Router */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 pt-8">
        {activeScreen === "parent" ? (
          <ParentDashboard
            profiles={profiles}
            currentProfile={activeProfile || profiles[0]}
            onClose={() => setActiveScreen("dashboard")}
            onUpdateProfiles={(updated) => setProfiles(updated)}
            onSelectProfile={handleSelectProfile}
          />
        ) : !activeProfile ? (
          <Welcome
            profiles={profiles}
            onSelectProfile={handleSelectProfile}
            onOpenParent={() => setActiveScreen("parent")}
          />
        ) : (
          (() => {
            switch (activeScreen) {
              case "dashboard":
                return (
                  <Dashboard
                    profile={activeProfile}
                    onNavigate={(screen) => setActiveScreen(screen)}
                    onLogout={handleLogout}
                  />
                );
              case "world":
                return (
                  <WorldMap
                    profile={activeProfile}
                    onNavigate={(screen) => setActiveScreen(screen)}
                  />
                );
              case "speak":
                return (
                  <LumoSpeak
                    profile={activeProfile}
                    onEarnReward={handleEarnReward}
                    onBack={() => setActiveScreen("dashboard")}
                  />
                );
              case "stories":
                return (
                  <LumoStories
                    profile={activeProfile}
                    onEarnReward={handleEarnReward}
                    onBack={() => setActiveScreen("dashboard")}
                  />
                );
              case "languages":
                return (
                  <LumoLanguages
                    profile={activeProfile}
                    onEarnReward={handleEarnReward}
                    onBack={() => setActiveScreen("dashboard")}
                  />
                );
              case "shop":
                return (
                  <RewardShop
                    profile={activeProfile}
                    onBuyItem={handleBuyItem}
                    onEquipItem={handleEquipItem}
                    onBack={() => setActiveScreen("dashboard")}
                  />
                );
              case "trophies":
                return (
                  <TrophyRoom
                    profile={activeProfile}
                    onBack={() => setActiveScreen("dashboard")}
                  />
                );
              case "avatar":
                return (
                  <AvatarCreator
                    profile={activeProfile}
                    onSave={handleSaveAvatar}
                    onBack={() => setActiveScreen("dashboard")}
                  />
                );
              default:
                return null;
            }
          })()
        )}
      </main>

      {/* Bottom Nav Bar helper on Mobile view */}
      {activeProfile && activeScreen !== "parent" && (
        <nav className="fixed bottom-0 inset-x-0 bg-white border-t border-slate-100 py-2.5 px-6 flex justify-around md:hidden shadow-lg z-30">
          <button
            onClick={() => setActiveScreen("dashboard")}
            className={`flex flex-col items-center gap-1 text-[10px] font-bold ${
              activeScreen === "dashboard" ? "text-indigo-600 font-extrabold" : "text-slate-400"
            }`}
          >
            <LayoutGrid className="w-5 h-5" />
            <span>Home</span>
          </button>
          <button
            onClick={() => setActiveScreen("world")}
            className={`flex flex-col items-center gap-1 text-[10px] font-bold ${
              activeScreen === "world" ? "text-indigo-600 font-extrabold" : "text-slate-400"
            }`}
          >
            <Compass className="w-5 h-5" />
            <span>Map</span>
          </button>
          <button
            onClick={() => setActiveScreen("speak")}
            className={`flex flex-col items-center gap-1 text-[10px] font-bold ${
              activeScreen === "speak" ? "text-indigo-600 font-extrabold" : "text-slate-400"
            }`}
          >
            <Mic className="w-5 h-5" />
            <span>Speak</span>
          </button>
          <button
            onClick={() => setActiveScreen("stories")}
            className={`flex flex-col items-center gap-1 text-[10px] font-bold ${
              activeScreen === "stories" ? "text-indigo-600 font-extrabold" : "text-slate-400"
            }`}
          >
            <BookOpen className="w-5 h-5" />
            <span>Read</span>
          </button>
          <button
            onClick={() => setActiveScreen("languages")}
            className={`flex flex-col items-center gap-1 text-[10px] font-bold ${
              activeScreen === "languages" ? "text-indigo-600 font-extrabold" : "text-slate-400"
            }`}
          >
            <Languages className="w-5 h-5" />
            <span>Languages</span>
          </button>
        </nav>
      )}

    </div>
  );
}
