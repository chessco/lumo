import React, { useState } from "react";
import { Profile } from "../types";
import { Lock, UserPlus, Sparkles, Smile, Compass } from "lucide-react";
import { AvatarRenderer } from "./AvatarCreator";

interface WelcomeProps {
  profiles: Profile[];
  onSelectProfile: (id: string) => void;
  onOpenParent: () => void;
}

export const Welcome: React.FC<WelcomeProps> = ({ profiles, onSelectProfile, onOpenParent }) => {
  return (
    <div id="lumo-welcome-gate" className="min-h-[500px] flex items-center justify-center p-4">
      <div className="max-w-4xl w-full text-center space-y-8">
        
        {/* Title logo area */}
        <div className="space-y-3">
          <div className="mx-auto w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center text-3xl animate-wiggle shadow-md">
            🦉
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold font-display text-slate-800 tracking-wide">
            Who's Learning Today?
          </h1>
          <p className="text-slate-500 text-sm md:text-md max-w-md mx-auto">
            Choose your explorer profile to enter Lumo World, earn star medals, and customise your look!
          </p>
        </div>

        {/* Explorer Profiles Grid */}
        <div className="flex flex-wrap items-center justify-center gap-8 py-6">
          {profiles.map((profile) => (
            <button
              key={profile.id}
              onClick={() => onSelectProfile(profile.id)}
              className="w-48 bg-white p-6 rounded-3xl border-2 border-slate-100 hover:border-indigo-400 hover:-translate-y-1.5 transition-all shadow-sm hover:shadow flex flex-col items-center gap-4 group"
            >
              <AvatarRenderer config={profile.avatar} size="md" animate={false} className="group-hover:animate-wiggle border-white" />
              
              <div className="text-center">
                <h3 className="font-bold text-xl text-slate-800 font-display truncate w-36">
                  {profile.name}
                </h3>
                <span className="text-[10px] bg-indigo-50 text-indigo-600 font-bold px-2.5 py-1 rounded-full uppercase mt-1.5 inline-block">
                  Level {profile.level}
                </span>
              </div>
            </button>
          ))}

          {/* Quick shortcut to parental portal */}
          <button
            onClick={onOpenParent}
            className="w-48 aspect-square rounded-3xl border-2 border-dashed border-slate-300 hover:border-slate-500 bg-slate-50/40 hover:bg-slate-50 text-slate-500 flex flex-col items-center justify-center gap-3 transition-all cursor-pointer p-4 hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-full bg-slate-200/50 flex items-center justify-center text-slate-400 text-2xl">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-sm text-slate-600">Add Explorer</p>
              <p className="text-[10px] text-slate-400 font-medium">via Parent Panel</p>
            </div>
          </button>
        </div>

        {/* Divider line */}
        <div className="w-32 h-1 bg-slate-200 mx-auto rounded-full" />

        {/* Parent lock login gate entry */}
        <div className="pt-2">
          <button
            onClick={onOpenParent}
            className="px-6 py-3 border-2 border-slate-200 hover:border-slate-300 text-slate-600 font-bold rounded-full text-xs shadow-sm hover:bg-slate-50 transition-all inline-flex items-center gap-2"
          >
            <Lock className="w-4 h-4 text-slate-400" /> Grown-ups Dashboard
          </button>
        </div>

      </div>
    </div>
  );
};
