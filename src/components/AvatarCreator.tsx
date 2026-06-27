import React, { useState } from "react";
import { AvatarConfig, Profile } from "../types";
import { Sparkles, Palette, Crown, Smile, Scissors, Shirt, CheckCircle } from "lucide-react";
import { motion } from "motion/react";

interface AvatarCreatorProps {
  profile: Profile;
  onSave: (updatedAvatar: AvatarConfig) => void;
  onBack: () => void;
}

// Reusable Layered Custom Avatar Renderer
export const AvatarRenderer: React.FC<{
  config: AvatarConfig;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  animate?: boolean;
}> = ({ config, size = "md", className = "", animate = true }) => {
  const sizeClasses = {
    sm: "w-14 h-14",
    md: "w-28 h-28",
    lg: "w-44 h-44",
    xl: "w-64 h-64"
  };

  const currentSize = sizeClasses[size];

  // Helper colors for default skin/hair/outfit
  const skinColor = config.skinColor || "#FFE082";
  const hairColor = config.hairColor || "#EC407A";
  const outfitColor = config.outfitColor || "#29B6F6";

  return (
    <div
      id="avatar-container"
      className={`relative rounded-full border-4 border-white shadow-lg bg-gradient-to-b from-sky-100 to-indigo-100 overflow-visible flex items-center justify-center ${currentSize} ${className} ${
        animate ? "animate-wiggle-slow" : ""
      }`}
    >
      {/* Outer Glow / Sparkles for Accessories */}
      {config.accessory === "star-crown" && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30 pointer-events-none text-amber-400 text-lg drop-shadow">
          👑
        </div>
      )}
      {config.accessory === "space-helmet" && (
        <div className="absolute -top-1 w-[110%] h-[110%] rounded-full border-2 border-brand-sky/60 bg-brand-sky/10 z-30 pointer-events-none" />
      )}

      {/* Avatar Wrapper */}
      <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden rounded-full">
        
        {/* BACKGROUND EFFECT FOR SPECIES / EXTRA ASSETS */}
        {config.outfit === "dino-onesie" && (
          <div className="absolute top-1 w-5/6 h-5/6 bg-emerald-500 rounded-full opacity-20 -z-10" />
        )}

        {/* 1. BODY / NECK */}
        <div 
          className="absolute bottom-4 w-12 h-8 rounded-full z-10 transition-colors duration-300"
          style={{ backgroundColor: skinColor }}
        />

        {/* 2. BASE FACE / HEAD */}
        <div
          className="absolute w-2/3 h-2/3 rounded-full top-[18%] z-10 shadow-inner flex items-center justify-center transition-colors duration-300"
          style={{ backgroundColor: skinColor }}
        >
          {/* 3. EYES */}
          <div className="absolute top-[38%] left-0 right-0 flex justify-around px-4 z-20">
            {config.eyes === "happy" && (
              <>
                <span className="text-xl font-bold text-indigo-900 select-none">^</span>
                <span className="text-xl font-bold text-indigo-900 select-none">^</span>
              </>
            )}
            {config.eyes === "sparkle" && (
              <>
                <span className="text-lg animate-pulse select-none">✨</span>
                <span className="text-lg animate-pulse select-none">✨</span>
              </>
            )}
            {config.eyes === "curious" && (
              <>
                <div className="w-4 h-4 bg-slate-900 rounded-full flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-white rounded-full -mt-1 -ml-1" />
                </div>
                <div className="w-4 h-4 bg-slate-900 rounded-full flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-white rounded-full -mt-1 -ml-1" />
                </div>
              </>
            )}
            {config.eyes === "wink" && (
              <>
                <span className="text-lg font-bold text-indigo-900 select-none">⌒</span>
                <div className="w-4 h-4 bg-slate-900 rounded-full flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-white rounded-full -mt-1 -ml-1" />
                </div>
              </>
            )}
          </div>

          {/* 4. CHEEKS (Blush) */}
          <div className="absolute top-[52%] left-0 right-0 flex justify-between px-3 z-15 opacity-60">
            <div className="w-3 h-1.5 bg-rose-400 rounded-full" />
            <div className="w-3 h-1.5 bg-rose-400 rounded-full" />
          </div>

          {/* 5. MOUTH */}
          <div className="absolute top-[55%] z-20 flex justify-center">
            <div className="w-6 h-3 border-b-4 border-indigo-950 rounded-b-full bg-transparent" />
          </div>
        </div>

        {/* 6. HAIR LAYER (Tucked around head) */}
        <div className="absolute top-[6%] left-0 right-0 flex justify-center z-25 pointer-events-none">
          {config.hair === "spiky" && (
            <div className="flex space-x-0.5 -mt-2">
              <div className="w-5 h-8 rounded-t-full rotate-[-20deg]" style={{ backgroundColor: hairColor }} />
              <div className="w-6 h-10 rounded-t-full" style={{ backgroundColor: hairColor }} />
              <div className="w-5 h-8 rounded-t-full rotate-[20deg]" style={{ backgroundColor: hairColor }} />
            </div>
          )}
          {config.hair === "pigtails" && (
            <div className="relative w-full flex justify-between px-2 -mt-1">
              <div className="w-6 h-6 rounded-full -ml-1 animate-bounce" style={{ backgroundColor: hairColor }} />
              <div className="w-16 h-5 rounded-full absolute left-1/2 -translate-x-1/2 top-2" style={{ backgroundColor: hairColor }} />
              <div className="w-6 h-6 rounded-full -mr-1 animate-bounce" style={{ backgroundColor: hairColor }} />
            </div>
          )}
          {config.hair === "curly" && (
            <div className="flex space-x-1 -mt-1">
              <div className="w-5 h-5 rounded-full" style={{ backgroundColor: hairColor }} />
              <div className="w-5 h-5 rounded-full" style={{ backgroundColor: hairColor }} />
              <div className="w-5 h-5 rounded-full" style={{ backgroundColor: hairColor }} />
              <div className="w-5 h-5 rounded-full" style={{ backgroundColor: hairColor }} />
            </div>
          )}
          {config.hair === "swoop" && (
            <div 
              className="w-20 h-6 rounded-tl-full rounded-br-full rotate-[-10deg] -mt-1" 
              style={{ backgroundColor: hairColor }} 
            />
          )}
        </div>

        {/* 7. OUTFIT / CLOTHES */}
        <div className="absolute bottom-0 w-4/5 h-1/3 z-20 flex justify-center">
          {config.outfit === "tshirt" && (
            <div 
              className="w-full h-full rounded-t-2xl relative flex justify-center border-t border-white"
              style={{ backgroundColor: outfitColor }}
            >
              {/* V Neck */}
              <div className="w-6 h-3 bg-amber-100 rounded-b-md absolute top-0" style={{ backgroundColor: skinColor }} />
            </div>
          )}
          {config.outfit === "sweater" && (
            <div 
              className="w-full h-full rounded-t-2xl relative flex flex-col items-center border-t-2 border-white/40"
              style={{ backgroundColor: outfitColor }}
            >
              {/* Cozy neck roll */}
              <div className="w-14 h-3 rounded-full -mt-1 shadow" style={{ backgroundColor: outfitColor }} />
            </div>
          )}
          {config.outfit === "star-cape" && (
            <div 
              className="w-full h-full rounded-t-2xl relative flex justify-center border-t border-amber-300"
              style={{ backgroundColor: "#312E81" }} // Deep indigo wizard/space background
            >
              <div className="absolute top-1 text-xs text-amber-300 animate-pulse">⭐</div>
            </div>
          )}
          {config.outfit === "dino-onesie" && (
            <div 
              className="w-full h-full rounded-t-2xl relative flex justify-center border-t border-emerald-600"
              style={{ backgroundColor: "#10B981" }} // Emerald green onesie
            >
              {/* Spikes on chest */}
              <div className="absolute top-1 flex space-x-1">
                <div className="w-2 h-2 bg-amber-400 rotate-45" />
                <div className="w-2 h-2 bg-amber-400 rotate-45" />
              </div>
            </div>
          )}
        </div>

        {/* PET COMPANION FLOATING NEXT TO AVATAR */}
        {config.accessory === "phoenix-pet" && (
          <div className="absolute bottom-0 right-1 z-30 text-xl animate-float">
            🐣
          </div>
        )}
      </div>

      {/* Floating Sparkles around standard layout */}
      <div className="absolute top-2 right-1 text-yellow-400 text-xs animate-pulse">⭐</div>
      <div className="absolute bottom-4 left-0 text-yellow-300 text-sm animate-pulse delay-700">⭐</div>
    </div>
  );
};

export const AvatarCreator: React.FC<AvatarCreatorProps> = ({ profile, onSave, onBack }) => {
  const [hair, setHair] = useState<string>(profile.avatar.hair);
  const [eyes, setEyes] = useState<string>(profile.avatar.eyes);
  const [outfit, setOutfit] = useState<string>(profile.avatar.outfit);
  const [accessory, setAccessory] = useState<string>(profile.avatar.accessory);

  const [hairColor, setHairColor] = useState<string>(profile.avatar.hairColor);
  const [skinColor, setSkinColor] = useState<string>(profile.avatar.skinColor);
  const [outfitColor, setOutfitColor] = useState<string>(profile.avatar.outfitColor);

  const [savedSuccess, setSavedSuccess] = useState(false);

  // Lists of options available
  const hairOptions = [
    { id: "spiky", label: "Spiky Active", icon: Scissors },
    { id: "pigtails", label: "Double Buns", icon: Scissors },
    { id: "curly", label: "Super Curly", icon: Scissors },
    { id: "swoop", label: "Swoop Wave", icon: Scissors }
  ];

  const eyesOptions = [
    { id: "happy", label: "Happy Spark", icon: Smile },
    { id: "sparkle", label: "Star Gazers", icon: Smile },
    { id: "curious", label: "Mega Circular", icon: Smile },
    { id: "wink", label: "Playful Wink", icon: Smile }
  ];

  const outfitOptions = [
    { id: "tshirt", label: "Sporty Tee", icon: Shirt },
    { id: "sweater", label: "Cozy Fleece", icon: Shirt },
    { id: "star-cape", label: "Nebula Cape", icon: Shirt },
    { id: "dino-onesie", label: "Dino Hoodie", icon: Shirt }
  ];

  // Colors palettes
  const hairColors = ["#FFA726", "#EC407A", "#26A69A", "#81C784", "#5C6BC0", "#8D6E63", "#263238", "#FFD54F"];
  const skinColors = ["#FFE082", "#FFD54F", "#F5CBA7", "#D35400", "#FFCCBC", "#E0AC69", "#C68B59", "#8D5524"];
  const outfitColors = ["#29B6F6", "#AB47BC", "#26A69A", "#EF5350", "#D4AC0D", "#78909C", "#263238", "#EC407A"];

  const accessoriesOptions = [
    { id: "none", label: "None", emoji: "❌" },
    { id: "star-crown", label: "Dream Crown", emoji: "👑" },
    { id: "space-helmet", label: "Space Visor", emoji: "👨‍🚀" },
    { id: "pink-shades", label: "Hero Glasses", emoji: "🕶️" },
    { id: "phoenix-pet", label: "Pip the Phoenix", emoji: "🐥" }
  ];

  const currentAvatarConfig: AvatarConfig = {
    hair,
    eyes,
    outfit,
    accessory,
    hairColor,
    skinColor,
    outfitColor
  };

  const handleSave = () => {
    onSave(currentAvatarConfig);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onBack();
    }, 1500);
  };

  return (
    <div id="avatar-creator" className="max-w-4xl mx-auto px-4 py-6">
      
      {/* Title Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-rose-100 rounded-2xl text-rose-500">
            <Palette className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold font-display text-slate-800">Design your Hero!</h1>
            <p className="text-slate-500">Create your unique explorer avatar to journey through Lumo World.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onBack}
            className="px-5 py-2.5 rounded-full border-2 border-slate-200 text-slate-600 hover:bg-slate-50 font-medium transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2.5 rounded-full bg-brand-primary text-white font-medium hover:bg-rose-500 shadow-md hover:shadow-lg transition-all flex items-center gap-2"
          >
            <CheckCircle className="w-5 h-5" /> Ready to Explore!
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="mb-6 p-4 bg-emerald-500 text-white rounded-2xl flex items-center justify-center gap-2 font-medium shadow animate-bounce">
          <Sparkles className="w-5 h-5" /> Saved successfully! Your avatar is updated!
        </div>
      )}

      {/* Workshop Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Avatar Preview Studio */}
        <div className="lg:col-span-5 bg-gradient-to-tr from-sky-400 to-indigo-500 p-8 rounded-3xl shadow-xl flex flex-col items-center justify-center text-white min-h-[420px] relative overflow-hidden">
          {/* Decorative ambient rays */}
          <div className="absolute w-96 h-96 rounded-full bg-white/10 -top-10 -left-10 blur-xl pointer-events-none" />
          <div className="absolute w-72 h-72 rounded-full bg-indigo-600/30 -bottom-20 -right-10 blur-xl pointer-events-none" />

          <h2 className="text-lg font-display tracking-widest text-white/80 uppercase mb-8 flex items-center gap-1.5 bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-amber-300 animate-spin" /> Live Studio Preview
          </h2>

          <AvatarRenderer config={currentAvatarConfig} size="xl" className="scale-110 mb-8 border-white/50" />

          <div className="text-center">
            <p className="text-2xl font-bold font-display text-white">{profile.name}</p>
            <p className="text-indigo-100 text-sm">Level {profile.level} Explorer</p>
          </div>
        </div>

        {/* Right Side: Options Controls */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-6">
          
          {/* Hair Selection */}
          <div>
            <h3 className="text-md font-bold text-slate-800 flex items-center gap-2 mb-3">
              <Scissors className="w-4.5 h-4.5 text-brand-primary" /> 1. Hair Style
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {hairOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setHair(opt.id)}
                  className={`p-3 rounded-2xl border-2 text-sm font-medium transition-all ${
                    hair === opt.id
                      ? "border-brand-primary bg-rose-50 text-brand-primary"
                      : "border-slate-100 hover:border-slate-300 text-slate-600"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            {/* Hair Colors */}
            <div className="flex flex-wrap gap-2.5 mt-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              {hairColors.map((color) => (
                <button
                  key={color}
                  onClick={() => setHairColor(color)}
                  className={`w-8 h-8 rounded-full border-2 transition-transform ${
                    hairColor === color ? "border-slate-800 scale-110 shadow-sm" : "border-white"
                  }`}
                  style={{ backgroundColor: color }}
                  title="Choose Hair Color"
                />
              ))}
            </div>
          </div>

          {/* Eyes Selection */}
          <div>
            <h3 className="text-md font-bold text-slate-800 flex items-center gap-2 mb-3">
              <Smile className="w-4.5 h-4.5 text-brand-secondary" /> 2. Eye Expression
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {eyesOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setEyes(opt.id)}
                  className={`p-3 rounded-2xl border-2 text-sm font-medium transition-all ${
                    eyes === opt.id
                      ? "border-brand-secondary bg-amber-50/50 text-brand-secondary"
                      : "border-slate-100 hover:border-slate-300 text-slate-600"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Skin Colors Selection */}
          <div>
            <h3 className="text-md font-bold text-slate-800 flex items-center gap-2 mb-3">
              <Palette className="w-4.5 h-4.5 text-brand-accent" /> 3. Explorer Tone
            </h3>
            <div className="flex flex-wrap gap-2.5 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              {skinColors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSkinColor(color)}
                  className={`w-8 h-8 rounded-full border-2 transition-transform ${
                    skinColor === color ? "border-slate-800 scale-110 shadow-sm" : "border-white"
                  }`}
                  style={{ backgroundColor: color }}
                  title="Choose Skin Tone"
                />
              ))}
            </div>
          </div>

          {/* Outfits Selection */}
          <div>
            <h3 className="text-md font-bold text-slate-800 flex items-center gap-2 mb-3">
              <Shirt className="w-4.5 h-4.5 text-brand-sky" /> 4. Outfit Style
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {outfitOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setOutfit(opt.id)}
                  className={`p-3 rounded-2xl border-2 text-sm font-medium transition-all ${
                    outfit === opt.id
                      ? "border-brand-sky bg-sky-50 text-brand-sky"
                      : "border-slate-100 hover:border-slate-300 text-slate-600"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            {/* Outfit Colors */}
            <div className="flex flex-wrap gap-2.5 mt-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              {outfitColors.map((color) => (
                <button
                  key={color}
                  onClick={() => setOutfitColor(color)}
                  className={`w-8 h-8 rounded-full border-2 transition-transform ${
                    outfitColor === color ? "border-slate-800 scale-110 shadow-sm" : "border-white"
                  }`}
                  style={{ backgroundColor: color }}
                  title="Choose Outfit Color"
                />
              ))}
            </div>
          </div>

          {/* Accessories Selection */}
          <div>
            <h3 className="text-md font-bold text-slate-800 flex items-center gap-2 mb-3">
              <Crown className="w-4.5 h-4.5 text-brand-purple" /> 5. Magic Badge / Companion
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {accessoriesOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setAccessory(opt.id)}
                  className={`p-2.5 rounded-2xl border-2 flex flex-col items-center text-xs font-semibold gap-1.5 transition-all ${
                    accessory === opt.id
                      ? "border-brand-purple bg-purple-50 text-brand-purple"
                      : "border-slate-100 hover:border-slate-300 text-slate-600"
                  }`}
                >
                  <span className="text-2xl">{opt.emoji}</span>
                  <span className="text-center truncate w-full">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
