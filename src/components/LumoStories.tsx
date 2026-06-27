import React, { useState, useEffect } from "react";
import { Profile, Story, StoryStep } from "../types";
import { STORIES } from "../data";
import { BookOpen, Volume2, Sparkles, AlertCircle, ArrowLeft, RotateCcw, CheckCircle, HelpCircle } from "lucide-react";

interface LumoStoriesProps {
  profile: Profile;
  onEarnReward: (stars: number, stardust: number, completedStoryId: string) => void;
  onBack: () => void;
}

export const LumoStories: React.FC<LumoStoriesProps> = ({ profile, onEarnReward, onBack }) => {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [currentStepId, setCurrentStepId] = useState<string>("");
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [highlightWordIndex, setHighlightWordIndex] = useState<number>(-1);
  const [starsAccumulated, setStarsAccumulated] = useState<number>(0);
  const [isFinished, setIsFinished] = useState(false);

  const startStory = (story: Story) => {
    setSelectedStory(story);
    setCurrentStepId(story.startStepId);
    setStarsAccumulated(story.starsReward);
    setIsFinished(false);
    setIsPlayingAudio(false);
    setHighlightWordIndex(-1);
  };

  const currentStep: StoryStep | undefined = selectedStory?.steps[currentStepId];
  const wordsArray = currentStep?.text.split(" ") || [];

  // Simulate audio reading word highlighting
  useEffect(() => {
    let timer: any;
    if (isPlayingAudio && currentStep) {
      setHighlightWordIndex(0);
      const totalWords = wordsArray.length;
      const intervalMs = (currentStep.audioDuration * 1000) / totalWords;

      let currentWord = 0;
      timer = setInterval(() => {
        currentWord++;
        if (currentWord < totalWords) {
          setHighlightWordIndex(currentWord);
        } else {
          clearInterval(timer);
          setIsPlayingAudio(false);
          setHighlightWordIndex(-1);
        }
      }, intervalMs);
    } else {
      setHighlightWordIndex(-1);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlayingAudio, currentStepId]);

  const handleChoice = (nextStepId: string | null, starsBonus = 0) => {
    setIsPlayingAudio(false);
    setHighlightWordIndex(-1);
    setStarsAccumulated(prev => prev + starsBonus);

    if (nextStepId === null || nextStepId === "step_end_success" || nextStepId === "step_end") {
      // Completed the story!
      setIsFinished(true);
      if (selectedStory) {
        onEarnReward(starsAccumulated + starsBonus, 15, selectedStory.id);
      }
    } else {
      setCurrentStepId(nextStepId);
    }

    // Play a lovely navigation tick/chime
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.frequency.setValueAtTime(440, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.15);
    } catch(err){}
  };

  const toggleAudio = () => {
    setIsPlayingAudio(prev => !prev);
    if (!isPlayingAudio) {
      // Play a quick synth chime to start
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.3);
      } catch(err){}
    }
  };

  const handleReset = () => {
    if (selectedStory) {
      startStory(selectedStory);
    }
  };

  return (
    <div id="lumo-stories-container" className="max-w-5xl mx-auto px-4 py-6">
      
      {/* Upper navigation bar */}
      <div className="flex justify-between items-center mb-8 bg-white p-5 rounded-3xl shadow-sm border border-slate-100">
        <button
          onClick={selectedStory ? () => setSelectedStory(null) : onBack}
          className="px-4 py-2 text-sm font-semibold bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full flex items-center gap-2 transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> {selectedStory ? "Exit Story" : "Back to Dashboard"}
        </button>

        <div className="flex items-center gap-1.5 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full font-bold text-sm">
          <span>📚</span> Completed: {profile.completedStories.length} / {STORIES.length}
        </div>
      </div>

      {!selectedStory ? (
        // 1. Stories Directory Shelf
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h1 className="text-3xl font-bold font-display text-slate-800">Lumo Library Shelf</h1>
            <p className="text-slate-500">Pick an interactive adventure story and make key choices along the way!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {STORIES.map((story) => {
              const isCompleted = profile.completedStories.includes(story.id);
              return (
                <div
                  key={story.id}
                  className="bg-white p-6 rounded-3xl border-2 border-slate-100 hover:border-blue-400 hover:-translate-y-1 transition-all flex flex-col justify-between shadow-sm group"
                >
                  <div className="flex gap-4 items-start">
                    <div className="text-6xl p-5 bg-blue-50/50 rounded-2xl group-hover:scale-105 transition-transform animate-wiggle-slow">
                      {story.coverEmoji}
                    </div>
                    <div className="space-y-1.5">
                      <span className="text-[10px] bg-blue-50 text-blue-600 font-bold px-2.5 py-1 rounded-full border border-blue-100 uppercase">
                        {story.category}
                      </span>
                      <h3 className="text-xl font-bold text-slate-800 pt-1">{story.title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">{story.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-50">
                    <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
                      ⏳ {story.readingTime} read • ⭐ {story.starsReward} Stars
                    </span>

                    <button
                      onClick={() => startStory(story)}
                      className={`px-5 py-2 rounded-full font-semibold text-sm transition-all shadow-sm flex items-center gap-1.5 ${
                        isCompleted 
                          ? "bg-slate-100 hover:bg-slate-200 text-slate-600" 
                          : "bg-blue-500 hover:bg-blue-600 text-white hover:shadow-md"
                      }`}
                    >
                      {isCompleted ? "Read Again" : "Start Adventure"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        // 2. Active Story Viewport
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Visual Story Card */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Scenic canvas box */}
            <div className="bg-gradient-to-tr from-sky-400 to-indigo-500 p-8 rounded-3xl shadow-lg flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[220px]">
              {/* Decorative cloud */}
              <div className="absolute top-4 left-4 text-white/10 text-9xl font-bold select-none">☁️</div>
              
              <div className="text-7xl animate-bounce-slow relative z-10 p-4 bg-white/10 rounded-full backdrop-blur-sm shadow border border-white/10">
                {currentStep?.sceneryEmoji || selectedStory.coverEmoji}
              </div>
            </div>

            {/* Ebook Text block */}
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6 min-h-[240px] flex flex-col justify-between">
              
              {!isFinished ? (
                <>
                  {/* Reading Paragraph with optional highlight */}
                  <div className="text-xl md:text-2xl font-display text-slate-700 leading-relaxed font-medium">
                    {wordsArray.map((word, idx) => (
                      <span
                        key={idx}
                        className={`transition-all duration-150 inline-block mr-1.5 rounded-md px-1 ${
                          idx === highlightWordIndex
                            ? "bg-amber-100 text-amber-800 scale-105 shadow-sm font-bold border-b-2 border-amber-500"
                            : ""
                        }`}
                      >
                        {word}
                      </span>
                    ))}
                  </div>

                  {/* Audio Narrator Bar */}
                  <div className="flex justify-between items-center bg-slate-50 p-3 rounded-2xl border border-slate-100/50">
                    <span className="text-xs text-slate-400 font-semibold">
                      🔊 Storyteller read-aloud system
                    </span>
                    <button
                      onClick={toggleAudio}
                      className={`px-4 py-2 text-xs font-semibold rounded-full border transition-all flex items-center gap-1.5 ${
                        isPlayingAudio
                          ? "bg-amber-50 border-amber-200 text-amber-600 animate-pulse"
                          : "bg-indigo-50 border-indigo-100 text-indigo-600 hover:bg-indigo-100"
                      }`}
                    >
                      <Volume2 className="w-4 h-4" /> {isPlayingAudio ? "Stop Reading" : "Read Aloud"}
                    </button>
                  </div>
                </>
              ) : (
                // Story Completed banner
                <div className="flex flex-col items-center justify-center py-6 text-center space-y-4 animate-fadeIn">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center text-3xl shadow">
                    🏆
                  </div>
                  <h2 className="text-3xl font-bold font-display text-slate-800">Adventure Completed!</h2>
                  <p className="text-slate-500 text-sm max-w-md">
                    Incredible job! You successfully completed <strong>"{selectedStory.title}"</strong> and guided Twinkle to safety!
                  </p>

                  <div className="bg-amber-500 text-white px-5 py-2.5 rounded-full flex items-center gap-2 font-bold shadow animate-bounce text-sm">
                    <Sparkles className="w-5 h-5" /> Earned +{starsAccumulated} Stars!
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={handleReset}
                      className="px-5 py-2.5 rounded-full border-2 border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold text-xs flex items-center gap-1 transition-all"
                    >
                      <RotateCcw className="w-4 h-4" /> Read Again
                    </button>
                    <button
                      onClick={() => setSelectedStory(null)}
                      className="px-5 py-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs shadow transition-all"
                    >
                      Choose Another Story
                    </button>
                  </div>
                </div>
              )}

            </div>

          </div>

          {/* Right Side: Choices Decisions Station */}
          <div className="lg:col-span-4 bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-5">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <span>🧠</span> Choice Hub
            </h3>
            <p className="text-slate-400 text-xs">Help the hero decide what to do next to explore new paths!</p>

            {!isFinished && currentStep ? (
              <div className="space-y-3.5">
                {currentStep.choices && currentStep.choices.length > 0 ? (
                  currentStep.choices.map((choice, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleChoice(choice.nextStepId, choice.starsBonus)}
                      className="w-full p-4 rounded-2xl border-2 border-blue-100 hover:border-blue-400 hover:bg-blue-50/10 text-left text-sm font-semibold text-slate-700 transition-all shadow-sm flex flex-col gap-1 hover:translate-x-1 group"
                    >
                      <div className="flex justify-between items-start w-full">
                        <span className="text-slate-800 group-hover:text-blue-600">{choice.text}</span>
                        <span className="text-xs text-amber-500 font-bold shrink-0 ml-2">
                          +{choice.starsBonus || 5} ⭐
                        </span>
                      </div>
                    </button>
                  ))
                ) : (
                  // No choices means end step is reached
                  <button
                    onClick={() => handleChoice(null, 15)}
                    className="w-full p-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm transition-all shadow flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-5 h-5" /> Claim Story Reward!
                  </button>
                )}
              </div>
            ) : (
              <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl text-center text-xs text-slate-400 flex flex-col items-center gap-2 justify-center py-8">
                <span>📚</span>
                <span>Complete the story to view choice options!</span>
              </div>
            )}

            {/* Accumulated Reward Tracker */}
            {!isFinished && (
              <div className="bg-slate-50 border border-slate-100/60 p-4 rounded-2xl flex justify-between items-center text-xs font-semibold">
                <span className="text-slate-500">Starlight Reward Multiplier:</span>
                <span className="text-amber-600 font-bold text-sm flex items-center gap-1">
                  ⭐ {starsAccumulated} Stars
                </span>
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
};
