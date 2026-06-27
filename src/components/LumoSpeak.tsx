import React, { useState, useEffect } from "react";
import { Profile, SpeakWord } from "../types";
import { SPEAK_WORDS } from "../data";
import { Mic, Volume2, Sparkles, Smile, MessageCircle, RefreshCw, Trophy, ArrowLeft, ChevronRight } from "lucide-react";

interface LumoSpeakProps {
  profile: Profile;
  onEarnReward: (stars: number, stardust: number, completedSpeakId: string) => void;
  onBack: () => void;
}

export const LumoSpeak: React.FC<LumoSpeakProps> = ({ profile, onEarnReward, onBack }) => {
  const [selectedWord, setSelectedWord] = useState<SpeakWord>(SPEAK_WORDS[0]);
  const [isRecording, setIsRecording] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<{
    score: number;
    feedback: string;
    unlockedStar: boolean;
  } | null>(null);

  // Stop recording or evaluation if active word changes
  useEffect(() => {
    setEvaluationResult(null);
    setIsRecording(false);
    setIsEvaluating(false);
  }, [selectedWord]);

  const playWordAudio = () => {
    if (audioPlaying) return;
    setAudioPlaying(true);
    
    // Simulate playing audio using a simple browser synth tone so kids hear a lovely chime
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Nice ascending learning tone
      const playTone = (freq: number, start: number, duration: number) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.15, start);
        gain.gain.exponentialRampToValueAtTime(0.01, start + duration);
        osc.start(start);
        osc.stop(start + duration);
      };

      playTone(523.25, audioCtx.currentTime, 0.25); // C5
      setTimeout(() => {
        playTone(659.25, audioCtx.currentTime, 0.25); // E5
      }, 150);
      setTimeout(() => {
        playTone(783.99, audioCtx.currentTime, 0.4);  // G5
      }, 300);
    } catch (e) {
      console.log("Audio API not supported or user gesture required first");
    }

    setTimeout(() => {
      setAudioPlaying(false);
    }, 1200);
  };

  const handleStartRecording = () => {
    setEvaluationResult(null);
    setIsRecording(true);
    
    // Play a short record tick sound
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.frequency.setValueAtTime(330, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.1);
    } catch(err){}
  };

  const handleStopRecording = () => {
    if (!isRecording) return;
    setIsRecording(false);
    setIsEvaluating(true);

    // Simulate sound analysis for 2 seconds
    setTimeout(() => {
      setIsEvaluating(false);
      const isAlreadyCompleted = profile.completedSpeak.includes(selectedWord.id);
      
      // Randomize kid score slightly to simulate dynamic AI speech alignment
      const score = Math.floor(Math.random() * 15) + 85; // 85% to 99%
      let feedback = "";
      let unlockedStar = false;

      if (score >= 95) {
        feedback = `OUTSTANDING! You sounded exactly like a native speaker! High-frequency alignment is perfect.`;
        unlockedStar = !isAlreadyCompleted;
      } else if (score >= 90) {
        feedback = `WONDERFUL! Great volume and phonetic delivery. Your mouth shape is exactly correct!`;
        unlockedStar = !isAlreadyCompleted;
      } else {
        feedback = `Almost there! Your 'L' sound was spectacular. Let's practice releasing the final syllable together!`;
        unlockedStar = !isAlreadyCompleted;
      }

      setEvaluationResult({
        score,
        feedback,
        unlockedStar
      });

      if (unlockedStar) {
        onEarnReward(15, 5, selectedWord.id);
        // Play success chime
        try {
          const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
          const playSuccess = (freq: number, start: number, duration: number) => {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.frequency.setValueAtTime(freq, start);
            gain.gain.setValueAtTime(0.2, start);
            gain.gain.exponentialRampToValueAtTime(0.01, start + duration);
            osc.start(start);
            osc.stop(start + duration);
          };
          playSuccess(523.25, audioCtx.currentTime, 0.2);
          setTimeout(() => playSuccess(659.25, audioCtx.currentTime, 0.2), 100);
          setTimeout(() => playSuccess(783.99, audioCtx.currentTime, 0.2), 200);
          setTimeout(() => playSuccess(1046.50, audioCtx.currentTime, 0.4), 300); // C6!
        } catch(e){}
      }
    }, 2000);
  };

  return (
    <div id="lumo-speak-container" className="max-w-5xl mx-auto px-4 py-6">
      
      {/* Upper Navigation Row */}
      <div className="flex justify-between items-center mb-8 bg-white p-5 rounded-3xl shadow-sm border border-slate-100">
        <button
          onClick={onBack}
          className="px-4 py-2 text-sm font-semibold bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full flex items-center gap-2 transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </button>

        <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-full font-bold text-sm">
          <span>🎤</span> Oral Accuracy: {profile.completedSpeak.length > 0 ? "92%" : "N/A"}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Words Directory */}
        <div className="lg:col-span-4 bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-slate-800">Choose a Word</h2>
          <p className="text-slate-400 text-xs">Pick an oral challenge to practice pronunciation</p>
          
          <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
            {SPEAK_WORDS.map((w) => {
              const completed = profile.completedSpeak.includes(w.id);
              const isSelected = selectedWord.id === w.id;
              
              const levelColors = {
                Easy: "bg-emerald-50 text-emerald-600 border-emerald-100",
                Medium: "bg-amber-50 text-amber-600 border-amber-100",
                Hard: "bg-rose-50 text-rose-600 border-rose-100"
              };

              return (
                <button
                  key={w.id}
                  onClick={() => setSelectedWord(w)}
                  className={`w-full p-3.5 rounded-2xl border-2 flex items-center justify-between text-left transition-all ${
                    isSelected 
                      ? "border-emerald-400 bg-emerald-50/10 shadow-sm" 
                      : "border-slate-50 hover:border-slate-200 hover:bg-slate-50/30"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl animate-wiggle-slow">{w.iconEmoji}</span>
                    <div>
                      <h4 className="font-bold text-slate-800 text-md leading-tight">{w.word}</h4>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md border mt-1 inline-block ${levelColors[w.difficulty]}`}>
                        {w.difficulty}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {completed && (
                      <span className="text-xs bg-emerald-100 text-emerald-600 font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                        🏆 Starred
                      </span>
                    )}
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side: Visual Speaking Lab */}
        <div className="lg:col-span-8 bg-gradient-to-b from-indigo-50 to-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6">
          
          {/* Practice Card Showcase */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100/60 shadow-inner flex flex-col items-center justify-center text-center py-10 relative">
            
            {profile.completedSpeak.includes(selectedWord.id) && (
              <span className="absolute top-4 right-4 bg-amber-50 text-amber-600 border border-amber-200 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                ⭐ Star Points Claimed (+15 Stars)
              </span>
            )}

            <div className="text-7xl mb-4 p-5 bg-slate-50 rounded-full border border-slate-100/40 animate-wiggle-slow">
              {selectedWord.iconEmoji}
            </div>

            <h1 className="text-4xl font-bold font-display text-slate-800 tracking-wide">{selectedWord.word}</h1>
            <p className="text-indigo-400 font-mono font-bold tracking-widest text-sm mt-1 uppercase">
              Phonetic: [{selectedWord.phonetics}]
            </p>

            {/* Play Pronunciation Audio */}
            <button
              onClick={playWordAudio}
              disabled={audioPlaying}
              className={`mt-4 px-4 py-2 text-xs font-semibold rounded-full border-2 transition-all flex items-center gap-1.5 ${
                audioPlaying 
                  ? "bg-slate-100 text-slate-400 border-slate-200 animate-pulse" 
                  : "bg-indigo-50 border-indigo-100 text-indigo-600 hover:bg-indigo-100"
              }`}
            >
              <Volume2 className="w-4 h-4" /> {audioPlaying ? "Playing correct audio..." : "Hear Native Audio"}
            </button>
          </div>

          {/* Interactive Mic Station */}
          <div className="bg-slate-50 border border-slate-100 p-6 rounded-3xl flex flex-col items-center justify-center min-h-[160px] text-center relative overflow-hidden">
            
            {/* Active Soundwave animation during recording */}
            {isRecording && (
              <div className="absolute inset-x-0 bottom-0 top-0 bg-emerald-500/5 flex items-center justify-center gap-1 z-0">
                {Array.from({ length: 15 }).map((_, idx) => {
                  const randomDelay = `${Math.random() * 0.8}s`;
                  const randomHeight = `${Math.floor(Math.random() * 40) + 10}px`;
                  return (
                    <div 
                      key={idx} 
                      className="w-1 bg-emerald-400 rounded-full transition-all animate-pulse"
                      style={{ height: randomHeight, animationDelay: randomDelay }}
                    />
                  );
                })}
              </div>
            )}

            {/* Evaluation Processing state */}
            {isEvaluating && (
              <div className="flex flex-col items-center gap-3 z-10">
                <RefreshCw className="w-10 h-10 text-emerald-500 animate-spin" />
                <p className="font-bold text-slate-700 animate-pulse">Lumo AI is matching your vocal waves...</p>
                <p className="text-slate-400 text-xs">Analyzing frequency peaks and syllable duration...</p>
              </div>
            )}

            {!isEvaluating && !evaluationResult && (
              <div className="flex flex-col items-center justify-center z-10 w-full">
                <p className="text-sm font-semibold text-slate-500 mb-4">
                  {isRecording ? "Listening... Tap mic when finished speaking!" : "Your turn! Tap to start speaking:"}
                </p>

                {isRecording ? (
                  <button
                    onClick={handleStopRecording}
                    className="w-20 h-20 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-lg hover:bg-rose-600 transition-transform scale-110 relative"
                  >
                    <div className="absolute inset-0 rounded-full bg-rose-500 animate-ping opacity-20 pointer-events-none" />
                    <span className="text-xs font-bold uppercase tracking-widest">STOP</span>
                  </button>
                ) : (
                  <button
                    onClick={handleStartRecording}
                    className="w-20 h-20 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95"
                  >
                    <Mic className="w-10 h-10" />
                  </button>
                )}
              </div>
            )}

            {/* Evaluation Result Output */}
            {evaluationResult && (
              <div className="flex flex-col items-center z-10 text-center space-y-4 w-full animate-fadeIn">
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xl font-bold font-mono">
                    {evaluationResult.score}%
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-left">Acoustic Score</p>
                    <p className="text-xs text-slate-400 text-left">F1 Syllabic Balance match</p>
                  </div>
                </div>

                <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-sm text-sm text-slate-600 text-left leading-relaxed flex gap-3 items-start max-w-lg">
                  <span className="text-2xl mt-0.5">🦉</span>
                  <div>
                    <p className="font-semibold text-slate-800">Lumi floating companion says:</p>
                    <p className="text-xs text-slate-500 mt-1">{evaluationResult.feedback}</p>
                  </div>
                </div>

                {evaluationResult.unlockedStar && (
                  <div className="bg-amber-500 text-white px-5 py-2.5 rounded-full flex items-center gap-2 font-bold shadow animate-bounce text-sm">
                    <Sparkles className="w-5 h-5" /> Awarded +15 Stars & +5 Stardust!
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    onClick={handleStartRecording}
                    className="px-5 py-2 text-xs font-bold bg-indigo-50 text-indigo-600 rounded-full hover:bg-indigo-100 transition-colors"
                  >
                    Try Again
                  </button>
                  <button
                    onClick={() => setEvaluationResult(null)}
                    className="px-5 py-2 text-xs font-bold bg-slate-800 text-white rounded-full hover:bg-slate-700 transition-colors"
                  >
                    Keep Word
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Phonetic Mouth Guide Panel */}
          <div className="bg-slate-100/50 border border-slate-100 p-5 rounded-3xl flex gap-4 items-start">
            <div className="p-2.5 bg-indigo-100 text-indigo-600 rounded-2xl text-2xl">
              👅
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm mb-1">Mouth & Tongue Guide</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {selectedWord.mouthGuide}
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
