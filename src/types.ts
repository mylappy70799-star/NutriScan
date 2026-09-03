export interface Meal {
  id: string;
  name: string;
  time: string;
  date: string; // e.g. "Today, Oct 26" or "Yesterday, Oct 25"
  dateKey: 'today' | 'yesterday' | 'earlier';
  imageUrl: string;
  imageAlt?: string;
  calories: number;
  protein: number; // in grams
  proteinLevel?: 'High' | 'Moderate' | 'Low';
  carbs: number; // in grams
  carbsLevel?: 'High' | 'Moderate' | 'Low';
  fats: number; // in grams
  fatsLevel?: 'High' | 'Moderate' | 'Low';
  sodium: number; // in mg
  sodiumLevel?: 'High' | 'Moderate' | 'Low';
  fiber: number; // in grams
  fiberLevel?: 'High' | 'Moderate' | 'Low';
  category: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
  tags: string[];
  statusText?: string;
}

export interface DayIntake {
  day: string; // "Mon", "Tue", etc.
  fullDate: string;
  calories: number;
  isPeak?: boolean;
}

export interface DailyTargets {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

export interface DietaryPreferences {
  highProtein: boolean;
  lowSodium: boolean;
  vegetarian: boolean;
  glutenFree?: boolean;
  dairyFree?: boolean;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  color: string;
  bgColor: string;
  isLocked: boolean;
  description: string;
  unlockedAt?: string;
}

export interface UserProfile {
  name: string;
  role: string;
  level: number;
  membership: string;
  avatarUrl: string;
  streakDays: number;
}

export type ActiveTab = 'capture' | 'insights' | 'logs' | 'settings';
