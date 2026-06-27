// User types
export type UserRole = 'admin' | 'parent' | 'teacher' | 'child';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatar?: string;
}

// Child types
export interface Child {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  avatar?: string;
  level: number;
  experience: number;
  streak: number;
  parentId?: string;
  teacherId?: string;
}

// Speech types
export interface SpeechSession {
  id: string;
  childId: string;
  exerciseId?: string;
  startedAt: string;
  endedAt?: string;
  duration?: number;
  status: 'active' | 'completed' | 'abandoned';
}

export interface SpeechExercise {
  id: string;
  name: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
}

// Progress types
export interface SpeechProgress {
  id: string;
  childId: string;
  date: string;
  totalSessions: number;
  totalDuration: number;
  averageScore: number;
  streakDays: number;
  level: number;
  experience: number;
}

// Reward types
export interface Reward {
  id: string;
  type: 'badge' | 'achievement' | 'milestone';
  name: string;
  description: string;
  icon: string;
  earnedAt: string;
}

// Navigation types
export interface NavItem {
  name: string;
  href: string;
  icon: string;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

// Mission types (for Daily Adventure)
export interface Mission {
  id: string;
  type: 'speech' | 'story' | 'language';
  title: string;
  description: string;
  completed: boolean;
  reward: {
    xp: number;
    item?: string;
  };
}
