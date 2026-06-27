import { Profile, Badge, ShopItem, Story, SpeakWord, VocabWord, ActivityLog } from "./types";

export const INITIAL_PROFILES: Profile[] = [
  {
    id: "leo",
    name: "Leo",
    level: 4,
    stars: 1250,
    stardust: 350,
    avatar: {
      hair: "spiky",
      eyes: "happy",
      outfit: "tshirt",
      accessory: "none",
      hairColor: "#FFA726", // Orange
      skinColor: "#FFD54F", // Warm Yellow
      outfitColor: "#29B6F6" // Cyan Blue
    },
    unlockedItems: ["star-cape", "space-helmet"],
    completedStories: ["brave-star"],
    completedSpeak: ["butterfly", "rainbow"],
    completedVocab: ["Fruits"],
    badges: ["super-speaker", "avatar-maker"],
    learningMinutesToday: 15,
    totalLearningMinutes: 125,
    isCustomProfile: false
  },
  {
    id: "mia",
    name: "Mia",
    level: 7,
    stars: 2400,
    stardust: 850,
    avatar: {
      hair: "pigtails",
      eyes: "sparkle",
      outfit: "sweater",
      accessory: "star-crown",
      hairColor: "#EC407A", // Pink
      skinColor: "#FFE082", // Cream
      outfitColor: "#AB47BC" // Purple
    },
    unlockedItems: ["star-crown", "phoenix-pet", "wizard-robes"],
    completedStories: ["brave-star", "lumi-flight"],
    completedSpeak: ["butterfly", "rainbow", "dinosaur", "sunshine"],
    completedVocab: ["Fruits", "Animals"],
    badges: ["super-speaker", "story-master", "avatar-maker", "star-catcher"],
    learningMinutesToday: 25,
    totalLearningMinutes: 340,
    isCustomProfile: false
  }
];

export const BADGES: Badge[] = [
  {
    id: "super-speaker",
    name: "Super Speaker",
    description: "Complete your first pronunciation practice in Lumo Speak",
    iconName: "Mic",
    category: "speak",
    color: "bg-emerald-100 text-emerald-700 border-emerald-300"
  },
  {
    id: "story-master",
    name: "Story Master",
    description: "Complete an interactive story and make critical choices",
    iconName: "BookOpen",
    category: "read",
    color: "bg-blue-100 text-blue-700 border-blue-300"
  },
  {
    id: "word-wizard",
    name: "Word Wizard",
    description: "Match all flashcards in any category in Spanish Sea",
    iconName: "Languages",
    category: "languages",
    color: "bg-purple-100 text-purple-700 border-purple-300"
  },
  {
    id: "star-catcher",
    name: "Star Catcher",
    description: "Collect over 1,500 lifetime starlight points",
    iconName: "Star",
    category: "general",
    color: "bg-amber-100 text-amber-700 border-amber-300"
  },
  {
    id: "avatar-maker",
    name: "Avatar Artist",
    description: "Design a unique custom character in the Avatar Creator",
    iconName: "Palette",
    category: "general",
    color: "bg-rose-100 text-rose-700 border-rose-300"
  },
  {
    id: "world-traveler",
    name: "World Explorer",
    description: "Visit all islands on the interactive adventure map",
    iconName: "Compass",
    category: "general",
    color: "bg-indigo-100 text-indigo-700 border-indigo-300"
  }
];

export const SHOP_ITEMS: ShopItem[] = [
  {
    id: "star-cape",
    name: "Starlight Cape",
    category: "outfit",
    cost: 50,
    assetType: "outfit",
    value: "star-cape",
    iconEmoji: "🧥"
  },
  {
    id: "phoenix-pet",
    name: "Pip the Phoenix",
    category: "pet",
    cost: 120,
    assetType: "pet",
    value: "phoenix-pet",
    iconEmoji: "🐥"
  },
  {
    id: "star-crown",
    name: "Dreamlight Crown",
    category: "accessory",
    cost: 75,
    assetType: "accessory",
    value: "star-crown",
    iconEmoji: "👑"
  },
  {
    id: "dino-onesie",
    name: "Dino Explorer Onesie",
    category: "outfit",
    cost: 100,
    assetType: "outfit",
    value: "dino-onesie",
    iconEmoji: "🦖"
  },
  {
    id: "space-helmet",
    name: "Astronaut Helmet",
    category: "accessory",
    cost: 90,
    assetType: "accessory",
    value: "space-helmet",
    iconEmoji: "👨‍🚀"
  },
  {
    id: "wizard-robes",
    name: "Wizard Robes",
    category: "outfit",
    cost: 85,
    assetType: "outfit",
    value: "wizard-robes",
    iconEmoji: "🧙"
  },
  {
    id: "pink-shades",
    name: "Hero Shades",
    category: "accessory",
    cost: 40,
    assetType: "accessory",
    value: "pink-shades",
    iconEmoji: "🕶️"
  }
];

export const STORIES: Story[] = [
  {
    id: "brave-star",
    title: "The Brave Little Star",
    description: "Help a tiny fallen star find its way back to the sparkling Golden Cloud!",
    category: "Space Adventure",
    readingTime: "3 min",
    starsReward: 30,
    coverEmoji: "⭐",
    startStepId: "step1",
    steps: {
      step1: {
        id: "step1",
        text: "Deep in the dark blue sky, a tiny star named Twinkle slipped and tumbled downward! Crash! It landed gently in a soft field of purple grass. 'Oh no!' Twinkle cried, 'I'm so far from home! Which way is the Golden Cloud?'",
        audioDuration: 5,
        sceneryEmoji: "🌌",
        choices: [
          { text: "Ask the Wise Owl for directions", nextStepId: "step2_owl", starsBonus: 5 },
          { text: "Follow the glowing butterfly trail", nextStepId: "step2_butterfly", starsBonus: 5 }
        ]
      },
      step2_owl: {
        id: "step2_owl",
        text: "Twinkle wobbled over to a tall tree. Up on a branch sat Professor Hoot! 'Whooo's there?' he hooted kindly. 'The Golden Cloud lies high atop Mystery Mountain! Take the path of the Echo Stones.'",
        audioDuration: 6,
        sceneryEmoji: "🦉",
        choices: [
          { text: "Climb the Mountain alone", nextStepId: "step3_mountain", starsBonus: 10 },
          { text: "Ask Hoot to fly you halfway there", nextStepId: "step3_flying", starsBonus: 5 }
        ]
      },
      step2_butterfly: {
        id: "step2_butterfly",
        text: "Twinkle skipped behind a family of shimmering crystal butterflies. They danced ahead, laughing softly! They led Twinkle right to the base of Mystery Mountain. But the sky is starting to get cloudy!",
        audioDuration: 6,
        sceneryEmoji: "🦋",
        choices: [
          { text: "Use your starshine to light up the path", nextStepId: "step3_mountain", starsBonus: 10 },
          { text: "Wait under a mushroom leaf for cover", nextStepId: "step3_mushroom", starsBonus: 5 }
        ]
      },
      step3_mountain: {
        id: "step3_mountain",
        text: "Up and up they went! The climb was steep, but Twinkle shone bright, lighting every step. Suddenly, a big cloud blockaded the peak! 'I can clear the cloud!' Twinkle shouted. 'Focus all your star-energy!'",
        audioDuration: 5,
        sceneryEmoji: "⛰️",
        choices: [
          { text: "Spin around in a star-tornado!", nextStepId: "step_end_success", starsBonus: 15 },
          { text: "Sing a bright lullaby to melt the cloud", nextStepId: "step_end_success", starsBonus: 15 }
        ]
      },
      step3_flying: {
        id: "step3_flying",
        text: "Twinkle held on tight to Hoot's soft feathers! Swoosh! They soared through the starry night. But a gust of wind made Hoot wobble. 'Hold on tight!' Hoot cried. They landed on a rocky ledge.",
        audioDuration: 6,
        sceneryEmoji: "💨",
        choices: [
          { text: "Jump up to the final cloud", nextStepId: "step_end_success", starsBonus: 15 }
        ]
      },
      step3_mushroom: {
        id: "step3_mushroom",
        text: "Twinkle huddled snug under a massive purple mushroom. While waiting, Twinkle discovered a hidden geode that glowed with stardust! When the rain stopped, the summit was clear.",
        audioDuration: 5,
        sceneryEmoji: "🍄",
        choices: [
          { text: "Float up to the peak", nextStepId: "step_end_success", starsBonus: 15 }
        ]
      },
      step_end_success: {
        id: "step_end_success",
        text: "SPLATTER OF LIGHTS! Twinkle jumped with all their might and touched the fluffy, golden edge. Instantly, Twinkle felt a warm surge of magic, lifting up to shine in the sky forever! You helped Twinkle make it home!",
        audioDuration: 7,
        sceneryEmoji: "🌈",
        choices: null
      }
    }
  },
  {
    id: "lumi-flight",
    title: "Lumi's Forest Flight",
    description: "Swoop, swoop! Journey with Lumi the Owl companion on a search for the magic berries.",
    category: "Nature Quest",
    readingTime: "4 min",
    starsReward: 40,
    coverEmoji: "🦉",
    startStepId: "step1",
    steps: {
      step1: {
        id: "step1",
        text: "Lumi woke up with a loud rumble in their belly! 'Oh, I crave the sweet Sparkle Berries that grow near the river!' Lumi said. But the forest is thick, and the map is upside down!",
        audioDuration: 5,
        sceneryEmoji: "🌲",
        choices: [
          { text: "Fly high above the treetops to look", nextStepId: "step2_sky", starsBonus: 5 },
          { text: "Glide quietly through the hollow trunks", nextStepId: "step2_trunk", starsBonus: 5 }
        ]
      },
      step2_sky: {
        id: "step2_sky",
        text: "High up, the wind was tickly! Lumi saw the shiny blue river winding through the green trees. But a giant playful balloon floated nearby. 'Pop it!' chirped a squirrel on a leaf.",
        audioDuration: 6,
        sceneryEmoji: "🎈",
        choices: [
          { text: "Land on the balloon and bounce!", nextStepId: "step3_river", starsBonus: 10 },
          { text: "Ignore it and swoop towards the water", nextStepId: "step3_river", starsBonus: 5 }
        ]
      },
      step2_trunk: {
        id: "step2_trunk",
        text: "Rustle, rustle! Lumi peeked into a cozy tree trunk. Inside, three tiny baby badgers were singing a silly song. They were looking for their lost shiny button!",
        audioDuration: 6,
        sceneryEmoji: "🦡",
        choices: [
          { text: "Help them find the button under the moss", nextStepId: "step3_badgers_happy", starsBonus: 15 },
          { text: "Give them a glowing stardust speck", nextStepId: "step3_badgers_happy", starsBonus: 10 }
        ]
      },
      step3_badgers_happy: {
        id: "step3_badgers_happy",
        text: "The badger pups squealed with delight! To thank Lumi, they pointed their tiny paws. 'The Sparkle Berries are right behind that whispering bush!'",
        audioDuration: 5,
        sceneryEmoji: "🌿",
        choices: [
          { text: "Push through the whispering leaves", nextStepId: "step_end", starsBonus: 10 }
        ]
      },
      step3_river: {
        id: "step3_river",
        text: "Lumi sailed down to the river bank. There, in a splash of warm sunlight, sat a massive bush loaded with bright, glowing purple Sparkle Berries! But a lazy frog is sleeping on them.",
        audioDuration: 5,
        sceneryEmoji: "🐸",
        choices: [
          { text: "Sing a morning frog wake-up call", nextStepId: "step_end", starsBonus: 10 },
          { text: "Tickle the frog's toe with a grass blade", nextStepId: "step_end", starsBonus: 10 }
        ]
      },
      step_end: {
        id: "step_end",
        text: "YUM! The berries tasted like sparkling honey and bubblegum. Lumi's belly was full, and their wings glowed with a magical purple hue. 'That was the best adventure ever!' Lumi hooted.",
        audioDuration: 5,
        sceneryEmoji: "🥳",
        choices: null
      }
    }
  }
];

export const SPEAK_WORDS: SpeakWord[] = [
  {
    id: "butterfly",
    word: "Butterfly",
    phonetics: "BUT-er-fly",
    mouthGuide: "Press your lips together gently, then release them quickly to make the 'B' puff of air. Smile wide on the 'fly' part!",
    difficulty: "Easy",
    iconEmoji: "🦋"
  },
  {
    id: "rainbow",
    word: "Rainbow",
    phonetics: "RAYN-boh",
    mouthGuide: "Make a round shape with your lips like you're going to whistle, curl your tongue back for the 'R' sound, then say 'bow' like a ribbon!",
    difficulty: "Medium",
    iconEmoji: "🌈"
  },
  {
    id: "dinosaur",
    word: "Dinosaur",
    phonetics: "DY-nuh-sawr",
    mouthGuide: "Tap the tip of your tongue behind your top teeth to say 'Dy', relax your mouth for 'nuh', and then finish with a roaring 'sawr'!",
    difficulty: "Hard",
    iconEmoji: "🦖"
  },
  {
    id: "sunshine",
    word: "Sunshine",
    phonetics: "SUN-shyn",
    mouthGuide: "Smile wide and blow air smoothly through your teeth for 'Sun', and then round your lips for the soft 'sh' in 'shine'!",
    difficulty: "Easy",
    iconEmoji: "☀️"
  },
  {
    id: "adventure",
    word: "Adventure",
    phonetics: "ad-VEN-chur",
    mouthGuide: "Say 'ad', then put a strong voice on 'VEN', and bite your lower lip slightly for the 'chur' ending. Ready, set, go!",
    difficulty: "Hard",
    iconEmoji: "🧭"
  },
  {
    id: "treasure",
    word: "Treasure",
    phonetics: "TREH-zher",
    mouthGuide: "Start with a quick 'Tr' tap, then make a humming vibrating sound in the middle like a buzzing bee ('zher')!",
    difficulty: "Medium",
    iconEmoji: "🏴‍☠️"
  }
];

export const SPANISH_VOCAB: Record<string, VocabWord[]> = {
  Fruits: [
    { id: "v1", foreignWord: "Manzana", nativeWord: "Apple", pronunciation: "mahn-SAH-nah", themeEmoji: "🍎" },
    { id: "v2", foreignWord: "Plátano", nativeWord: "Banana", pronunciation: "PLAH-tah-noh", themeEmoji: "🍌" },
    { id: "v3", foreignWord: "Uvas", nativeWord: "Grapes", pronunciation: "OO-bahs", themeEmoji: "🍇" },
    { id: "v4", foreignWord: "Naranja", nativeWord: "Orange", pronunciation: "nah-RAHN-hah", themeEmoji: "🍊" },
    { id: "v5", foreignWord: "Fresa", nativeWord: "Strawberry", pronunciation: "FREH-sah", themeEmoji: "🍓" }
  ],
  Animals: [
    { id: "v6", foreignWord: "Perro", nativeWord: "Dog", pronunciation: "PEHR-roh", themeEmoji: "🐶" },
    { id: "v7", foreignWord: "Gato", nativeWord: "Cat", pronunciation: "GAH-toh", themeEmoji: "🐱" },
    { id: "v8", foreignWord: "Pájaro", nativeWord: "Bird", pronunciation: "PAH-hah-roh", themeEmoji: "🐦" },
    { id: "v9", foreignWord: "Pez", nativeWord: "Fish", pronunciation: "PEHTH", themeEmoji: "🐟" },
    { id: "v10", foreignWord: "León", nativeWord: "Lion", pronunciation: "leh-OHN", themeEmoji: "🦁" }
  ],
  Colors: [
    { id: "v11", foreignWord: "Rojo", nativeWord: "Red", pronunciation: "ROH-hoh", themeEmoji: "🔴" },
    { id: "v12", foreignWord: "Azul", nativeWord: "Blue", pronunciation: "ah-SOOL", themeEmoji: "🔵" },
    { id: "v13", foreignWord: "Verde", nativeWord: "Green", pronunciation: "BEHR-deh", themeEmoji: "🟢" },
    { id: "v14", foreignWord: "Amarillo", nativeWord: "Yellow", pronunciation: "ah-mah-REE-yoh", themeEmoji: "🟡" },
    { id: "v15", foreignWord: "Morado", nativeWord: "Purple", pronunciation: "moh-RAH-doh", themeEmoji: "🟣" }
  ]
};

export const MOCK_ACTIVITY_LOGS: ActivityLog[] = [
  { date: "Mon", minutes: 12, wordsPracticed: 4, accuracy: 85 },
  { date: "Tue", minutes: 18, wordsPracticed: 6, accuracy: 90 },
  { date: "Wed", minutes: 15, wordsPracticed: 5, accuracy: 88 },
  { date: "Thu", minutes: 22, wordsPracticed: 8, accuracy: 92 },
  { date: "Fri", minutes: 10, wordsPracticed: 3, accuracy: 80 },
  { date: "Sat", minutes: 25, wordsPracticed: 10, accuracy: 95 },
  { date: "Sun", minutes: 20, wordsPracticed: 7, accuracy: 89 }
];

export const PARENT_PIN_CHALLENGES = [
  { question: "7 x 8 = ?", answer: 56 },
  { question: "12 + 25 = ?", answer: 37 },
  { question: "9 x 6 = ?", answer: 54 },
  { question: "45 - 18 = ?", answer: 27 },
  { question: "8 x 9 = ?", answer: 72 }
];
