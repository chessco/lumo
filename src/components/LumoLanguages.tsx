import React, { useState, useEffect } from "react";
import { Profile, VocabWord } from "../types";
import { SPANISH_VOCAB } from "../data";
import { Languages, Volume2, Sparkles, AlertCircle, ArrowLeft, RefreshCw, CheckCircle2 } from "lucide-react";

interface LumoLanguagesProps {
  profile: Profile;
  onEarnReward: (stars: number, stardust: number, completedVocabCategory: string) => void;
  onBack: () => void;
}

interface CardItem {
  id: string;
  word: string;
  lang: "es" | "en";
  matchId: string;
  emoji?: string;
}

export const LumoLanguages: React.FC<LumoLanguagesProps> = ({ profile, onEarnReward, onBack }) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  // Card matching game states
  const [cards, setCards] = useState<CardItem[]>([]);
  const [selectedCards, setSelectedCards] = useState<CardItem[]>([]);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [gameComplete, setGameComplete] = useState(false);
  const [starsEarned, setStarsEarned] = useState(0);

  // Load and shuffle cards on starting a category
  const startMatchingGame = (categoryName: string) => {
    setActiveCategory(categoryName);
    setGameComplete(false);
    setSelectedCards([]);
    setMatchedIds([]);
    setStarsEarned(0);

    const vocabList = SPANISH_VOCAB[categoryName] || [];
    
    // Create dual matching cards (Spanish and English versions)
    const spanishCards: CardItem[] = vocabList.map(v => ({
      id: `${v.id}-es`,
      word: v.foreignWord,
      lang: "es",
      matchId: v.id,
      emoji: v.themeEmoji
    }));

    const englishCards: CardItem[] = vocabList.map(v => ({
      id: `${v.id}-en`,
      word: v.nativeWord,
      lang: "en",
      matchId: v.id
    }));

    // Shuffle cards helper
    const combined = [...spanishCards, ...englishCards];
    const shuffled = combined.sort(() => Math.random() - 0.5);
    setCards(shuffled);
  };

  const handleCardClick = (card: CardItem) => {
    // Ignore if already matched or currently 2 selected
    if (matchedIds.includes(card.id) || selectedCards.length >= 2) return;
    // Ignore if clicking the exact same card
    if (selectedCards.some(s => s.id === card.id)) return;

    const newSelected = [...selectedCards, card];
    setSelectedCards(newSelected);

    // Audio cue
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.frequency.setValueAtTime(card.lang === "es" ? 330 : 440, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.1);
    } catch(err){}

    if (newSelected.length === 2) {
      const [first, second] = newSelected;
      
      // Match check
      if (first.matchId === second.matchId && first.lang !== second.lang) {
        // Success match!
        setTimeout(() => {
          setMatchedIds(prev => [...prev, first.id, second.id]);
          setSelectedCards([]);
          setStarsEarned(prev => prev + 10);

          // Success audio chirp
          try {
            const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.frequency.setValueAtTime(523.25, audioCtx.currentTime);
            gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
            gain.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);
            osc.start();
            osc.stop(audioCtx.currentTime + 0.2);
          } catch(err){}
        }, 600);
      } else {
        // Mis-match reset
        setTimeout(() => {
          setSelectedCards([]);
        }, 1200);
      }
    }
  };

  // Detect game completed
  useEffect(() => {
    if (cards.length > 0 && matchedIds.length === cards.length && !gameComplete) {
      setGameComplete(true);
      if (activeCategory) {
        onEarnReward(starsEarned + 25, 10, activeCategory);
      }
    }
  }, [matchedIds, cards]);

  const speakVocabWord = (wordText: string) => {
    // Fallback simple chime sound
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.frequency.setValueAtTime(440, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, audioCtx.currentTime + 0.4);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.4);
    } catch(e){}
  };

  return (
    <div id="lumo-languages-container" className="max-w-5xl mx-auto px-4 py-6">
      
      {/* Navigation Headers */}
      <div className="flex justify-between items-center mb-8 bg-white p-5 rounded-3xl shadow-sm border border-slate-100">
        <button
          onClick={activeCategory ? () => setActiveCategory(null) : onBack}
          className="px-4 py-2 text-sm font-semibold bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full flex items-center gap-2 transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> {activeCategory ? "Exit Game" : "Back to Dashboard"}
        </button>

        <div className="flex items-center gap-1.5 bg-purple-50 text-purple-700 px-4 py-1.5 rounded-full font-bold text-sm">
          <span>🌍</span> Mastered Categories: {profile.completedVocab.length} / {Object.keys(SPANISH_VOCAB).length}
        </div>
      </div>

      {!activeCategory ? (
        // 1. Language Islands Selection Directory
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold font-display text-slate-800">Spanish Sea Islands</h1>
              <p className="text-slate-500">Practice matching English words with their Spanish translation peers!</p>
            </div>
            <div className="p-3 bg-purple-100 text-purple-600 rounded-2xl">
              <Languages className="w-8 h-8" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.keys(SPANISH_VOCAB).map((catName) => {
              const completed = profile.completedVocab.includes(catName);
              const items = SPANISH_VOCAB[catName];
              
              const catEmojis: Record<string, string> = {
                Fruits: "🍎",
                Animals: "🐱",
                Colors: "🟣"
              };

              return (
                <div
                  key={catName}
                  className="bg-white p-6 rounded-3xl border-2 border-slate-100 hover:border-purple-400 hover:-translate-y-1 transition-all flex flex-col justify-between shadow-sm group"
                >
                  <div className="space-y-3">
                    <div className="text-5xl p-4 bg-purple-50/50 rounded-2xl group-hover:scale-105 transition-transform inline-block animate-wiggle-slow">
                      {catEmojis[catName] || "🏝️"}
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">{catName} Island</h3>
                    <p className="text-slate-500 text-sm">
                      Learn {items.length} words including: {items.slice(0, 3).map(i => i.foreignWord).join(", ")}...
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-50">
                    <span className="text-xs text-slate-400 font-semibold">
                      🎁 +50 Star payout bonus
                    </span>

                    <button
                      onClick={() => startMatchingGame(catName)}
                      className={`px-5 py-2 rounded-full font-semibold text-sm transition-all shadow-sm ${
                        completed 
                          ? "bg-slate-100 hover:bg-slate-200 text-slate-600" 
                          : "bg-purple-500 hover:bg-purple-600 text-white hover:shadow-md"
                      }`}
                    >
                      {completed ? "Practice Again" : "Dock at Island"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        // 2. Active Card Matching game
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Cards grid canvas */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Card Match Challenge</h2>
                  <p className="text-slate-400 text-xs">Match the English word to its Spanish buddy!</p>
                </div>
                <div className="text-xs bg-purple-50 text-purple-600 font-bold px-3.5 py-1.5 rounded-full">
                  Progress: {matchedIds.length / 2} / {cards.length / 2} Pairs matched
                </div>
              </div>

              {!gameComplete ? (
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                  {cards.map((card) => {
                    const isMatched = matchedIds.includes(card.id);
                    const isSelected = selectedCards.some(s => s.id === card.id);
                    
                    return (
                      <button
                        key={card.id}
                        disabled={isMatched}
                        onClick={() => handleCardClick(card)}
                        className={`aspect-[3/4] rounded-2xl border-2 p-3 flex flex-col items-center justify-center text-center transition-all duration-300 relative ${
                          isMatched
                            ? "border-emerald-200 bg-emerald-50 text-emerald-600 opacity-60 pointer-events-none scale-95"
                            : isSelected
                            ? "border-purple-400 bg-purple-50 text-purple-700 shadow-md scale-105"
                            : "border-slate-100 bg-slate-50 hover:border-slate-300 text-slate-700 hover:bg-white cursor-pointer hover:shadow-sm"
                        }`}
                      >
                        {isMatched && (
                          <div className="absolute top-2 right-2 text-emerald-500">
                            <CheckCircle2 className="w-4.5 h-4.5" />
                          </div>
                        )}

                        {card.emoji && (
                          <span className="text-4xl mb-2 block animate-wiggle-slow">
                            {card.emoji}
                          </span>
                        )}

                        <span className={`font-bold tracking-wide ${card.lang === "es" ? "text-slate-800" : "text-slate-600"}`}>
                          {card.word}
                        </span>

                        <span className="text-[9px] font-bold text-slate-400 tracking-wider uppercase mt-1">
                          {card.lang === "es" ? "SPANISH" : "ENGLISH"}
                        </span>
                      </button>
                    );
                  })}
                </div>
              ) : (
                // Success Game Completion Banner
                <div className="flex flex-col items-center justify-center py-10 text-center space-y-4 animate-fadeIn">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center text-3xl shadow">
                    🎉
                  </div>
                  <h2 className="text-3xl font-bold font-display text-slate-800">Island Completed!</h2>
                  <p className="text-slate-500 text-sm max-w-sm">
                    Stellar match work! You paired all vocabulary words perfectly on <strong>{activeCategory} Island</strong>!
                  </p>

                  <div className="bg-amber-500 text-white px-5 py-2.5 rounded-full flex items-center gap-2 font-bold shadow animate-bounce text-sm">
                    <Sparkles className="w-5 h-5" /> Awarded +50 Stars & +10 Stardust!
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => startMatchingGame(activeCategory)}
                      className="px-5 py-2.5 rounded-full border-2 border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold text-xs flex items-center gap-1 transition-all"
                    >
                      <RefreshCw className="w-4 h-4" /> Replay Game
                    </button>
                    <button
                      onClick={() => setActiveCategory(null)}
                      className="px-5 py-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs shadow transition-all"
                    >
                      Return to Islands
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Side: Dictionary Showcase */}
          <div className="lg:col-span-4 bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <span>📖</span> Island Dictionary
            </h3>
            <p className="text-slate-400 text-xs">Hear individual translations and practice vocal peaks:</p>

            <div className="space-y-3">
              {(SPANISH_VOCAB[activeCategory] || []).map((v) => {
                const alreadyMatched = matchedIds.some(m => m.includes(v.id));
                return (
                  <div
                    key={v.id}
                    className={`p-3 rounded-2xl border border-slate-100 flex items-center justify-between ${
                      alreadyMatched ? "bg-emerald-50/20 border-emerald-100" : "bg-slate-50/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{v.themeEmoji}</span>
                      <div>
                        <p className="font-bold text-slate-800 text-sm leading-tight">
                          {v.foreignWord} <span className="text-slate-400 font-normal">({v.nativeWord})</span>
                        </p>
                        <p className="text-[10px] text-purple-600 font-mono font-medium mt-0.5">
                          Pronounced: {v.pronunciation}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => speakVocabWord(v.foreignWord)}
                      className="p-1.5 bg-white hover:bg-indigo-50 hover:text-indigo-600 rounded-xl border border-slate-200/60 transition-colors"
                      title="Hear translation audio"
                    >
                      <Volume2 className="w-4 h-4 text-slate-500" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
