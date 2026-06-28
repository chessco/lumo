import { lazy } from 'react';

// Lazy load pages for better performance
// Onboarding
const WelcomePage = lazy(() => import('@/features/onboarding/pages/WelcomePage'));
const ChooseExplorerPage = lazy(() => import('@/features/onboarding/pages/ChooseExplorerPage'));
const CreateExplorerPage = lazy(() => import('@/features/onboarding/pages/CreateExplorerPage'));

// Child Experience
const LumoHomePage = lazy(() => import('@/features/dashboard/pages/LumoHomePage'));
const DailyAdventurePage = lazy(() => import('@/features/daily-adventure/pages/DailyAdventurePage'));

// Speech
const SpeakSelectPage = lazy(() => import('@/features/speech/pages/SpeakSelectPage'));
const SpeakSessionPage = lazy(() => import('@/features/speech/pages/SpeakSessionPage'));
const SpeakResultsPage = lazy(() => import('@/features/speech/pages/SpeakResultsPage'));

// Stories
const StorySelectPage = lazy(() => import('@/features/stories/pages/StorySelectPage'));
const StoryReaderPage = lazy(() => import('@/features/stories/pages/StoryReaderPage'));

// Languages
const LanguageSelectPage = lazy(() => import('@/features/languages/pages/LanguageSelectPage'));
const LanguagePracticePage = lazy(() => import('@/features/languages/pages/LanguagePracticePage'));

// World
const LumoWorldPage = lazy(() => import('@/features/world/pages/LumoWorldPage'));
const TrophyRoomPage = lazy(() => import('@/features/world/pages/TrophyRoomPage'));
const InventoryPage = lazy(() => import('@/features/world/pages/InventoryPage'));
const AvatarPage = lazy(() => import('@/features/world/pages/AvatarPage'));

// Shop
const MagicShopPage = lazy(() => import('@/features/shop/pages/MagicShopPage'));

// Parents
const ParentDashboardPage = lazy(() => import('@/features/parents/pages/ParentDashboardPage'));
const ChildrenPage = lazy(() => import('@/features/parents/pages/ChildrenPage'));
const ProgressPage = lazy(() => import('@/features/parents/pages/ProgressPage'));
const ReportsPage = lazy(() => import('@/features/parents/pages/ReportsPage'));
const SettingsPage = lazy(() => import('@/features/parents/pages/SettingsPage'));

// Public
const LoginPage = lazy(() => import('@/pages/LoginPage'));
const HomePage = lazy(() => import('@/pages/HomePage'));

// Route definitions
export const routes = {
  // Public
  public: [
    { path: '/', element: HomePage },
    { path: '/login', element: LoginPage },
  ],
  
  // Onboarding
  onboarding: [
    { path: '/welcome', element: WelcomePage },
    { path: '/onboarding/choose', element: ChooseExplorerPage },
    { path: '/onboarding/create', element: CreateExplorerPage },
  ],
  
  // Child Experience
  child: [
    { path: '/app', element: LumoHomePage },
    { path: '/app/daily-adventure', element: DailyAdventurePage },
    { path: '/app/speak', element: SpeakSelectPage },
    { path: '/app/speak/session/:id', element: SpeakSessionPage },
    { path: '/app/speak/results/:id', element: SpeakResultsPage },
    { path: '/app/stories', element: StorySelectPage },
    { path: '/app/stories/read/:id', element: StoryReaderPage },
    { path: '/app/languages', element: LanguageSelectPage },
    { path: '/app/languages/:languageId', element: LanguagePracticePage },
    { path: '/app/world', element: LumoWorldPage },
    { path: '/app/world/trophies', element: TrophyRoomPage },
    { path: '/app/world/inventory', element: InventoryPage },
    { path: '/app/world/avatar', element: AvatarPage },
    { path: '/app/shop', element: MagicShopPage },
  ],
  
  // Parent Experience
  parent: [
    { path: '/parent/dashboard', element: ParentDashboardPage },
    { path: '/parent/children', element: ChildrenPage },
    { path: '/parent/progress', element: ProgressPage },
    { path: '/parent/progress/:childId', element: ProgressPage },
    { path: '/parent/reports', element: ReportsPage },
    { path: '/parent/reports/:childId', element: ReportsPage },
    { path: '/parent/settings', element: SettingsPage },
  ],
};

export default routes;
