export interface AvatarConfig {
  hair: string;
  eyes: string;
  outfit: string;
  accessory: string;
  hairColor: string;
  skinColor: string;
  outfitColor: string;
}

export interface Profile {
  id: string;
  name: string;
  level: number;
  stars: number;
  stardust: number;
  avatar: AvatarConfig;
  unlockedItems: string[]; // List of ShopItem IDs
  completedStories: string[]; // List of completed story IDs
  completedSpeak: string[]; // List of completed speak words
  completedVocab: string[]; // List of completed vocabulary categories
  badges: string[]; // List of Badge IDs
  learningMinutesToday: number;
  totalLearningMinutes: number;
  isCustomProfile: boolean;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  iconName: string; // lucide icon name or emoji
  category: "speak" | "read" | "languages" | "general";
  color: string;
}

export interface ShopItem {
  id: string;
  name: string;
  category: "outfit" | "decor" | "pet" | "accessory";
  cost: number;
  assetType: "hair" | "accessory" | "outfit" | "eyes" | "pet";
  value: string; // identifier in customization options
  iconEmoji: string;
}

export interface StoryChoice {
  text: string;
  nextStepId: string | null; // null represents the end of the story
  starsBonus?: number;
}

export interface StoryStep {
  id: string;
  text: string;
  audioDuration: number; // simulated duration in seconds
  choices: StoryChoice[] | null;
  sceneryEmoji: string;
}

export interface Story {
  id: string;
  title: string;
  description: string;
  category: string;
  readingTime: string;
  starsReward: number;
  coverEmoji: string;
  steps: Record<string, StoryStep>;
  startStepId: string;
}

export interface VocabWord {
  id: string;
  foreignWord: string; // e.g. "Manzana"
  nativeWord: string; // e.g. "Apple"
  pronunciation: string; // e.g. "mahn-SAH-nah"
  themeEmoji: string; // 🍎
}

export interface SpeakWord {
  id: string;
  word: string;
  phonetics: string;
  mouthGuide: string;
  difficulty: "Easy" | "Medium" | "Hard";
  iconEmoji: string;
}

export interface ActivityLog {
  date: string;
  minutes: number;
  wordsPracticed: number;
  accuracy: number;
}
