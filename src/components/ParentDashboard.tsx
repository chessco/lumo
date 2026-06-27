import React, { useState } from "react";
import { Profile, ActivityLog } from "../types";
import { MOCK_ACTIVITY_LOGS, PARENT_PIN_CHALLENGES } from "../data";
import { 
  Lock, BookOpen, Clock, Award, Star, Settings, UserPlus, 
  Sparkles, RefreshCw, ChevronRight, HelpCircle, DownloadCloud, Trash2
} from "lucide-react";
import { AvatarRenderer } from "./AvatarCreator";

interface ParentDashboardProps {
  profiles: Profile[];
  currentProfile: Profile;
  onClose: () => void;
  onUpdateProfiles: (updated: Profile[]) => void;
  onSelectProfile: (profileId: string) => void;
}

export const ParentDashboard: React.FC<ParentDashboardProps> = ({ 
  profiles, 
  currentProfile, 
  onClose,
  onUpdateProfiles,
  onSelectProfile
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinChallenge, setPinChallenge] = useState(() => {
    const randomIndex = Math.floor(Math.random() * PARENT_PIN_CHALLENGES.length);
    return PARENT_PIN_CHALLENGES[randomIndex];
  });
  const [parentCodeInput, setParentCodeInput] = useState("");
  const [authError, setAuthError] = useState("");
  
  // Custom states inside Parent View
  const [activeTab, setActiveTab] = useState<"overview" | "profiles" | "curriculum">("overview");
  const [selectedKidId, setSelectedKidId] = useState<string>(currentProfile.id);
  const [newKidName, setNewKidName] = useState("");
  const [editingKidDifficulty, setEditingKidDifficulty] = useState<Record<string, string>>({
    leo: "Intermediate",
    mia: "Advanced"
  });

  const selectedKid = profiles.find(p => p.id === selectedKidId) || currentProfile;

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    const numericAnswer = parseInt(parentCodeInput);
    if (numericAnswer === pinChallenge.answer) {
      setIsAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError("Oops! That's not quite right. Please try again!");
      // Roll a new challenge
      const randomIndex = Math.floor(Math.random() * PARENT_PIN_CHALLENGES.length);
      setPinChallenge(PARENT_PIN_CHALLENGES[randomIndex]);
      setParentCodeInput("");
    }
  };

  const handleAddProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKidName.trim()) return;

    const newId = newKidName.toLowerCase().replace(/\s+/g, "-");
    const newProfile: Profile = {
      id: newId,
      name: newKidName,
      level: 1,
      stars: 50,
      stardust: 10,
      avatar: {
        hair: "curly",
        eyes: "curious",
        outfit: "tshirt",
        accessory: "none",
        hairColor: "#5C6BC0",
        skinColor: "#FFE082",
        outfitColor: "#26A69A"
      },
      unlockedItems: [],
      completedStories: [],
      completedSpeak: [],
      completedVocab: [],
      badges: ["avatar-maker"],
      learningMinutesToday: 0,
      totalLearningMinutes: 0,
      isCustomProfile: true
    };

    const updated = [...profiles, newProfile];
    onUpdateProfiles(updated);
    setNewKidName("");
    setSelectedKidId(newProfile.id);
    setEditingKidDifficulty(prev => ({ ...prev, [newId]: "Beginner" }));
  };

  const handleDeleteProfile = (id: string) => {
    if (profiles.length <= 1) {
      alert("You need to keep at least one profile!");
      return;
    }
    const updated = profiles.filter(p => p.id !== id);
    onUpdateProfiles(updated);
    if (selectedKidId === id) {
      setSelectedKidId(updated[0].id);
    }
  };

  const handleRewardBonus = (id: string, starsBonus: number) => {
    const updated = profiles.map(p => {
      if (p.id === id) {
        return {
          ...p,
          stars: p.stars + starsBonus,
          stardust: p.stardust + Math.floor(starsBonus / 5)
        };
      }
      return p;
    });
    onUpdateProfiles(updated);
  };

  const handleDownloadReport = () => {
    alert(`Downloading Weekly Progress Report for ${selectedKid.name}... (Simulated PDF download successfully started)`);
  };

  // Render Lock screen first to ensure security gate
  if (!isAuthenticated) {
    return (
      <div id="parent-lock-gate" className="min-h-[500px] flex items-center justify-center p-6 bg-slate-50">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-lg border border-slate-100 text-center">
          <div className="mx-auto w-16 h-16 bg-amber-100 text-amber-500 rounded-2xl flex items-center justify-center mb-6">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold font-display text-slate-800 mb-2">Parental Security Gate</h2>
          <p className="text-slate-500 text-sm mb-6">
            Lumo keeps settings safe for grown-ups. Please solve this simple puzzle to enter the dashboard:
          </p>

          <form onSubmit={handleUnlock} className="space-y-5">
            <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl">
              <span className="text-3xl font-bold text-slate-800 font-mono tracking-wider">{pinChallenge.question}</span>
            </div>

            <div>
              <input
                type="number"
                value={parentCodeInput}
                onChange={(e) => setParentCodeInput(e.target.value)}
                placeholder="Enter answer"
                className="w-full text-center py-3.5 px-4 rounded-2xl border-2 border-slate-200 focus:border-indigo-400 focus:outline-none font-mono text-xl"
                autoFocus
              />
              {authError && <p className="text-rose-500 text-xs mt-2 font-medium">{authError}</p>}
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="w-1/2 py-3 bg-slate-100 text-slate-600 font-semibold rounded-full hover:bg-slate-200 transition-colors"
              >
                Go Back
              </button>
              <button
                type="submit"
                className="w-1/2 py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-full shadow-md hover:shadow-lg transition-all"
              >
                Unlock
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Calculate metrics for current kid
  const currentKidAccuracy = Math.round(
    MOCK_ACTIVITY_LOGS.reduce((acc, log) => acc + log.accuracy, 0) / MOCK_ACTIVITY_LOGS.length
  );
  const totalKidVocabulary = selectedKid.completedVocab.length * 5 + selectedKid.completedSpeak.length;

  return (
    <div id="parent-dashboard-core" className="max-w-6xl mx-auto px-4 py-6">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-4">
          <div className="p-3.5 bg-indigo-50 text-indigo-500 rounded-2xl">
            <Settings className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold font-display text-slate-800">Hello, Sarah!</h1>
            <p className="text-slate-500 text-sm">Welcome to Lumo Parents. Monitor progress and customize curriculum.</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Active Child selector dropdown */}
          <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-2xl border border-slate-100">
            <span className="text-xs font-semibold text-slate-500">Explorer:</span>
            <select 
              value={selectedKidId} 
              onChange={(e) => setSelectedKidId(e.target.value)}
              className="font-bold text-slate-800 bg-transparent border-none focus:outline-none cursor-pointer"
            >
              {profiles.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-full bg-slate-800 text-white font-semibold hover:bg-slate-700 shadow transition-all text-sm"
          >
            Back to Kid's World
          </button>
        </div>
      </div>

      {/* Tabs Menu */}
      <div className="flex space-x-1 mb-8 bg-slate-200/60 p-1 rounded-2xl w-fit">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            activeTab === "overview" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-600 hover:text-slate-900"
          }`}
        >
          Learning Overview
        </button>
        <button
          onClick={() => setActiveTab("profiles")}
          className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            activeTab === "profiles" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-600 hover:text-slate-900"
          }`}
        >
          Manage Profiles ({profiles.length})
        </button>
        <button
          onClick={() => setActiveTab("curriculum")}
          className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            activeTab === "curriculum" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-600 hover:text-slate-900"
          }`}
        >
          Curriculum & Levels
        </button>
      </div>

      {/* Overview Content */}
      {activeTab === "overview" && (
        <div className="space-y-8 animate-fadeIn">
          
          {/* Top Quick Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            
            <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
              <div className="p-3 bg-sky-50 text-sky-500 rounded-2xl">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-semibold">Total Learning Time</p>
                <p className="text-2xl font-bold font-mono text-slate-800">{selectedKid.totalLearningMinutes} mins</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
              <div className="p-3 bg-emerald-50 text-emerald-500 rounded-2xl">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-semibold">Words Mastered</p>
                <p className="text-2xl font-bold font-mono text-slate-800">{totalKidVocabulary} words</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
              <div className="p-3 bg-purple-50 text-purple-500 rounded-2xl">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-semibold">Pronunciation Accuracy</p>
                <p className="text-2xl font-bold font-mono text-slate-800">{currentKidAccuracy}%</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
              <div className="p-3 bg-amber-50 text-amber-500 rounded-2xl">
                <Star className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-semibold">Star Points Balance</p>
                <p className="text-2xl font-bold font-mono text-amber-600">{selectedKid.stars} ⭐</p>
              </div>
            </div>

          </div>

          {/* Interactive Chart & Tips Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Visual Progress Chart */}
            <div className="lg:col-span-8 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Weekly Engagement</h3>
                  <p className="text-slate-400 text-xs">Minutes spent learning day-by-day</p>
                </div>
                <button
                  onClick={handleDownloadReport}
                  className="px-3.5 py-2 text-xs font-semibold bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-xl flex items-center gap-1.5 transition-colors"
                >
                  <DownloadCloud className="w-4 h-4" /> Download Report
                </button>
              </div>

              {/* HAND-CRAFTED HIGH FIDELITY SVG CHART (guarantees seamless compilation) */}
              <div className="h-64 relative w-full bg-slate-50/50 p-4 rounded-2xl border border-slate-100 flex flex-col justify-between">
                
                {/* Visual Chart Bars and Lines */}
                <div className="relative flex-1 flex items-end justify-between px-6 pt-6">
                  
                  {/* Grid Lines */}
                  <div className="absolute left-0 right-0 top-1/4 border-t border-slate-100 pointer-events-none" />
                  <div className="absolute left-0 right-0 top-2/4 border-t border-slate-100 pointer-events-none" />
                  <div className="absolute left-0 right-0 top-3/4 border-t border-slate-100 pointer-events-none" />

                  {MOCK_ACTIVITY_LOGS.map((log, index) => {
                    const heightPercent = `${(log.minutes / 30) * 100}%`;
                    return (
                      <div key={index} className="flex flex-col items-center group relative z-10 w-1/12">
                        
                        {/* Interactive Tooltip */}
                        <div className="absolute bottom-full mb-2 bg-slate-800 text-white text-[10px] font-mono px-2 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-20 whitespace-nowrap">
                          {log.minutes} mins | {log.accuracy}% accuracy
                        </div>

                        {/* Sparkle/Glow if high performance */}
                        {log.minutes >= 20 && (
                          <div className="w-2 h-2 rounded-full bg-amber-400 animate-ping absolute -top-4" />
                        )}

                        {/* Bar */}
                        <div
                          className="w-7 rounded-t-lg bg-gradient-to-t from-indigo-500 to-sky-400 group-hover:from-indigo-600 group-hover:to-sky-500 transition-all duration-300"
                          style={{ height: heightPercent }}
                        />
                      </div>
                    );
                  })}
                </div>

                {/* Day Labels */}
                <div className="flex justify-between px-6 border-t border-slate-100 pt-2">
                  {MOCK_ACTIVITY_LOGS.map((log, idx) => (
                    <span key={idx} className="text-xs font-bold text-slate-400 w-1/12 text-center">
                      {log.date}
                    </span>
                  ))}
                </div>

              </div>

              <div className="flex items-center justify-between mt-4 text-xs text-slate-400 bg-slate-50 p-3 rounded-xl border border-slate-100/60">
                <span className="flex items-center gap-1">🔴 Target daily limit: 15 minutes</span>
                <span>🔥 Peak day: Saturday (25 minutes)</span>
              </div>
            </div>

            {/* Smart Recommendations / Tips */}
            <div className="lg:col-span-4 bg-gradient-to-br from-indigo-900 to-slate-900 p-6 rounded-3xl text-white relative overflow-hidden shadow-md flex flex-col justify-between">
              {/* Floating orb */}
              <div className="absolute w-44 h-44 rounded-full bg-brand-primary/20 -top-12 -right-12 blur-2xl" />

              <div>
                <span className="text-xs bg-white/10 px-3 py-1 rounded-full text-brand-secondary font-bold uppercase tracking-wider flex items-center gap-1.5 w-fit mb-5">
                  <Sparkles className="w-3.5 h-3.5 text-brand-secondary" /> AI Learning Advisor
                </span>
                
                <h3 className="text-lg font-bold font-display mb-3">Lumo Advisory for {selectedKid.name}</h3>
                
                <div className="space-y-4 text-indigo-200 text-sm">
                  <div className="bg-white/5 p-3.5 rounded-2xl border border-white/5">
                    <p className="font-semibold text-white text-xs mb-1">🎯 Vocab Focus Detected</p>
                    <p className="text-[12px] leading-relaxed">
                      {selectedKid.name} has practiced {selectedKid.completedVocab.length} vocabulary categories. To enhance recall, try playing card matching today!
                    </p>
                  </div>
                  
                  <div className="bg-white/5 p-3.5 rounded-2xl border border-white/5">
                    <p className="font-semibold text-white text-xs mb-1">💡 Companion Suggestion</p>
                    <p className="text-[12px] leading-relaxed">
                      Lumi floating companion suggests reading <strong>"Lumi's Forest Flight"</strong> to earn up to 40 additional star points!
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 mt-5">
                <p className="text-[11px] text-slate-400 italic">Recommendations update dynamically based on lesson accuracy.</p>
              </div>

            </div>

          </div>

          {/* Daily Logs Table */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Detailed Daily Engagement</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-bold">
                    <th className="py-3 px-4">Day</th>
                    <th className="py-3 px-4">Learning Duration</th>
                    <th className="py-3 px-4">Vocabulary Practiced</th>
                    <th className="py-3 px-4">Oral Accuracy</th>
                    <th className="py-3 px-4">Progress Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-slate-600">
                  {MOCK_ACTIVITY_LOGS.map((log, index) => (
                    <tr key={index} className="hover:bg-slate-50/50">
                      <td className="py-3.5 px-4 font-bold text-slate-800">{log.date}</td>
                      <td className="py-3.5 px-4 font-mono font-medium">{log.minutes} mins</td>
                      <td className="py-3.5 px-4 font-mono font-medium">{log.wordsPracticed} words</td>
                      <td className="py-3.5 px-4 font-mono font-medium">
                        <span className={`px-2 py-0.5 rounded-lg text-xs font-semibold ${
                          log.accuracy >= 90 ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-sky-50 text-sky-600"
                        }`}>
                          {log.accuracy}%
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="text-xs text-slate-400">
                          {log.minutes >= 15 ? "✅ Goal Completed" : "⏳ Partial Session"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* Profiles Tab Content */}
      {activeTab === "profiles" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fadeIn">
          
          {/* Left Side: Create New Profile Form */}
          <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-indigo-500" /> New Explorer Profile
            </h3>

            <form onSubmit={handleAddProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Child's Name</label>
                <input
                  type="text"
                  value={newKidName}
                  onChange={(e) => setNewKidName(e.target.value)}
                  placeholder="e.g. Samuel"
                  className="w-full py-2.5 px-4 rounded-xl border border-slate-200 focus:border-indigo-400 focus:outline-none font-semibold text-slate-800"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-brand-primary text-white font-semibold rounded-full shadow-md hover:bg-rose-500 transition-all flex items-center justify-center gap-2"
              >
                Create Account
              </button>
            </form>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs text-slate-400 leading-relaxed">
              New accounts start at Level 1 with 50 Stars bonus, so they can immediately unlock a couple of custom items.
            </div>
          </div>

          {/* Right Side: Profiles List */}
          <div className="lg:col-span-8 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-slate-800">Existing Explorer Profiles</h3>

            <div className="space-y-4">
              {profiles.map((profile) => (
                <div 
                  key={profile.id} 
                  className={`p-4 rounded-3xl border-2 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all ${
                    selectedKidId === profile.id ? "border-indigo-500 bg-indigo-50/10" : "border-slate-100 bg-slate-50/50"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <AvatarRenderer config={profile.avatar} size="sm" animate={false} />
                    <div>
                      <h4 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                        {profile.name}
                        {profile.id === currentProfile.id && (
                          <span className="text-[10px] bg-indigo-500 text-white px-2 py-0.5 rounded-full font-semibold">
                            ACTIVE
                          </span>
                        )}
                      </h4>
                      <p className="text-xs text-slate-400">
                        Level {profile.level} • {profile.stars} Stars • {profile.stardust} Stardust
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleRewardBonus(profile.id, 50)}
                      className="px-3 py-1.5 text-xs font-semibold bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200 rounded-xl flex items-center gap-1 transition-colors"
                      title="Reward 50 Stars for great chores or behavior!"
                    >
                      +50 Stars Bonus ⭐
                    </button>

                    <button
                      onClick={() => onSelectProfile(profile.id)}
                      className="px-3 py-1.5 text-xs font-semibold bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-xl"
                    >
                      Login
                    </button>

                    <button
                      onClick={() => handleDeleteProfile(profile.id)}
                      className="p-2 text-slate-400 hover:text-rose-500 rounded-xl transition-colors"
                      title="Delete profile"
                    >
                      <Trash2 className="w-4.5 h-4.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* Curriculum Tab Content */}
      {activeTab === "curriculum" && (
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6 animate-fadeIn">
          
          <div className="flex justify-between items-center pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-lg font-bold text-slate-800">Lumo Learning Pathways</h3>
              <p className="text-slate-500 text-xs">Configure vocabulary difficulty and oral speaking tolerances</p>
            </div>
            <div className="text-xs font-bold text-indigo-500 bg-indigo-50 px-3.5 py-1.5 rounded-full">
              K-3 Early Education Aligned
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            
            <div className="space-y-4">
              <h4 className="font-bold text-md text-slate-800">1. Adjust Explorer Level</h4>
              
              {profiles.map(p => (
                <div key={p.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <AvatarRenderer config={p.avatar} size="sm" animate={false} className="w-10 h-10 border-none" />
                    <div>
                      <p className="font-bold text-sm text-slate-700">{p.name}</p>
                      <p className="text-xs text-slate-400">Level {p.level} explorer</p>
                    </div>
                  </div>

                  <select
                    value={editingKidDifficulty[p.id] || "Beginner"}
                    onChange={(e) => setEditingKidDifficulty(prev => ({ ...prev, [p.id]: e.target.value }))}
                    className="font-semibold text-xs text-slate-700 bg-white border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none"
                  >
                    <option value="Beginner">Beginner (3-4 yrs)</option>
                    <option value="Intermediate">Intermediate (5-6 yrs)</option>
                    <option value="Advanced">Advanced (7-8 yrs)</option>
                  </select>
                </div>
              ))}
            </div>

            <div className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-100">
              <h4 className="font-bold text-md text-slate-800 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-500" /> Speech Pronunciation Guide
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Configure oral practice strictness. Lower limits help pre-readers feel successful with encouraging phonetic reviews.
              </p>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-500 mb-1">
                    <span>Acoustic Matching Sensitivity</span>
                    <span className="text-indigo-600">Adaptive (Encouraging)</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-indigo-500 h-full w-2/3" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-500 mb-1">
                    <span>Accent Model Focus</span>
                    <span className="text-indigo-600">US English K-12</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-indigo-500 h-full w-4/5" />
                  </div>
                </div>
              </div>

              <div className="p-3 bg-white border border-slate-100 rounded-xl text-[11px] text-slate-400">
                <strong>Parent Tip:</strong> If your child is struggling with sounds like 'R' or 'Th', keep sensitivity set to "Adaptive" to build their confidence!
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
