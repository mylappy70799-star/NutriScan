import { Meal, DayIntake, DailyTargets, DietaryPreferences, Badge, UserProfile } from '../types';

export const INITIAL_SCANNED_MEAL: Meal = {
  id: 'scan-current',
  name: 'Grilled Chicken Salad',
  time: '1:15 PM',
  date: 'Today, Oct 26',
  dateKey: 'today',
  imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBsbIHSWGbc1Cp4CxWHIrfYscMSDOebUSYRyvG87O5kXM9Bt2DoijiwkSogni1U-23saVPMhz37piQljfX94y2Wa47C4AdAINLGm-Ogb6hlb1dJi7hccD4ZaTTYcBmzu_3INdDQJZCVA8X3i1tfepAgbKmfdqzEpEH3Y5E5iS7anro8aIE6lWHNuhRXIr8ig2Ek-tPMr0ftXjObaLhjUr0bzwg3buK8fAcNaOQTXbNBhie2bx_mcrRs',
  imageAlt: 'Grilled Chicken Salad with avocado, tomatoes, greens and grilled chicken',
  calories: 420,
  protein: 45,
  proteinLevel: 'High',
  fats: 18,
  fatsLevel: 'Moderate',
  sodium: 320,
  sodiumLevel: 'Low',
  fiber: 12,
  fiberLevel: 'High',
  carbs: 14,
  carbsLevel: 'Low',
  category: 'Lunch',
  tags: ['High Protein', 'Low Carb'],
  statusText: 'Scan Successful'
};

export const INITIAL_MEALS: Meal[] = [
  {
    id: 'meal-1',
    name: 'Avocado Quinoa Bowl',
    time: '12:30 PM',
    date: 'Today, Oct 26',
    dateKey: 'today',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmEiHD5oirsSi698wrNtCvXyhJcuhyIHjSN7ot1lldiJTBIFhqSz-cxedz2TCGE0flFqPoPwEMtJwqNSNL1oFwPO50ljfzk_vOqAJcNLe4Lv5tFqfZsiB6aC1CBvvlhuEOWlpqnY80UrHswqAkJU3X9t9DjVqqd6JvyP8Mt8UuWJpWscaRcG_BJj6ZbLsl7DCPcQTprHUEwbnfuBHO6BhKNJYNIio63UZaNIGX2Dvg891LuAMpEVXk',
    imageAlt: 'Healthy grain bowl with quinoa, avocado, sweet potato and egg',
    calories: 650,
    protein: 24,
    carbs: 52,
    fats: 22,
    sodium: 410,
    fiber: 9,
    category: 'Lunch',
    tags: ['Lunch', 'High Protein']
  },
  {
    id: 'meal-2',
    name: 'Green Protein Smoothie',
    time: '8:15 AM',
    date: 'Today, Oct 26',
    dateKey: 'today',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGv8OdsR8vFJenrRkNIJnIfIFhzrF8vUpQ0D9v40Ca0aX4Tej3sorBzYa4IT341yOb3X6Gf7YAEmdnFKJqWNzVSjX_zMLcZ7BS9FKRgMK016vN8cXpKeEwf1FSX8EZqyzzAhYcQjhmk9bsb-WXMdKUxYxhqZ3v9bCuyFy2MBRoiIupWBmzH2OluE6eMt6hx9ansva31_GN28tl2uQDBloEA4a5D_9AqhUkJzB0YK7r_EjXLDOWYt-A',
    imageAlt: 'Frothy green smoothie in glass jar',
    calories: 320,
    protein: 30,
    carbs: 35,
    fats: 5,
    sodium: 180,
    fiber: 6,
    category: 'Breakfast',
    tags: ['Breakfast']
  },
  {
    id: 'meal-3',
    name: 'Grilled Salmon & Asparagus',
    time: '7:45 PM',
    date: 'Yesterday, Oct 25',
    dateKey: 'yesterday',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCUdZV8pyux7eu0GJY73OsixVh0jlbK0KRc3mFNGdMTMLwQX2qVqEt3TuvcFXOTcBEw8hmbkd_u2rl_fyc-N8btP9Ezt63C8yuuiNgd-BJab35M01F1FjfIEZxDRkB65pwBwwmXBY2gnOKSGPScYAwiycIyL6vmbS-USeOlQU2KZh0SZO6BaVh6i227F5zROCgGnW2-wZ65KPbvJZS_9XhwTj4JI0_RuND2Ms7LAinzLYeLYhhXAiy2',
    imageAlt: 'Grilled salmon fillet with green asparagus spears',
    calories: 540,
    protein: 42,
    carbs: 12,
    fats: 28,
    sodium: 380,
    fiber: 5,
    category: 'Dinner',
    tags: ['Dinner', 'Low Carb']
  }
];

export const EXTRA_HISTORY_MEALS: Meal[] = [
  {
    id: 'meal-4',
    name: 'Mediterranean Falafel Bowl',
    time: '1:00 PM',
    date: 'Wednesday, Oct 24',
    dateKey: 'earlier',
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',
    imageAlt: 'Crispy falafel with tahini and fresh cucumber salad',
    calories: 490,
    protein: 20,
    carbs: 58,
    fats: 19,
    sodium: 490,
    fiber: 11,
    category: 'Lunch',
    tags: ['Lunch', 'Vegetarian', 'High Fiber']
  },
  {
    id: 'meal-5',
    name: 'Greek Yogurt & Berry Parfait',
    time: '7:30 AM',
    date: 'Wednesday, Oct 24',
    dateKey: 'earlier',
    imageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80',
    imageAlt: 'Greek yogurt parfait with fresh blueberries and granola',
    calories: 280,
    protein: 22,
    carbs: 34,
    fats: 4,
    sodium: 120,
    fiber: 7,
    category: 'Breakfast',
    tags: ['Breakfast', 'High Protein']
  },
  {
    id: 'meal-6',
    name: 'Grass-Fed Ribeye with Roasted Broccoli',
    time: '8:10 PM',
    date: 'Tuesday, Oct 23',
    dateKey: 'earlier',
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
    imageAlt: 'Grilled steak with tender steamed broccoli florets',
    calories: 680,
    protein: 54,
    carbs: 9,
    fats: 46,
    sodium: 520,
    fiber: 4,
    category: 'Dinner',
    tags: ['Dinner', 'Keto', 'High Protein']
  }
];

export const SAMPLE_SCAN_PRESETS: Meal[] = [
  INITIAL_SCANNED_MEAL,
  {
    id: 'sample-quinoa',
    name: 'Avocado Quinoa Power Bowl',
    time: '12:30 PM',
    date: 'Today, Oct 26',
    dateKey: 'today',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmEiHD5oirsSi698wrNtCvXyhJcuhyIHjSN7ot1lldiJTBIFhqSz-cxedz2TCGE0flFqPoPwEMtJwqNSNL1oFwPO50ljfzk_vOqAJcNLe4Lv5tFqfZsiB6aC1CBvvlhuEOWlpqnY80UrHswqAkJU3X9t9DjVqqd6JvyP8Mt8UuWJpWscaRcG_BJj6ZbLsl7DCPcQTprHUEwbnfuBHO6BhKNJYNIio63UZaNIGX2Dvg891LuAMpEVXk',
    calories: 650,
    protein: 24,
    proteinLevel: 'Moderate',
    carbs: 52,
    carbsLevel: 'Moderate',
    fats: 22,
    fatsLevel: 'Moderate',
    sodium: 410,
    sodiumLevel: 'Moderate',
    fiber: 9,
    fiberLevel: 'High',
    category: 'Lunch',
    tags: ['Superfood', 'Vegetarian', 'Plant Power'],
    statusText: 'Scan Successful'
  },
  {
    id: 'sample-smoothie',
    name: 'Super Green Protein Shake',
    time: '8:15 AM',
    date: 'Today, Oct 26',
    dateKey: 'today',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGv8OdsR8vFJenrRkNIJnIfIFhzrF8vUpQ0D9v40Ca0aX4Tej3sorBzYa4IT341yOb3X6Gf7YAEmdnFKJqWNzVSjX_zMLcZ7BS9FKRgMK016vN8cXpKeEwf1FSX8EZqyzzAhYcQjhmk9bsb-WXMdKUxYxhqZ3v9bCuyFy2MBRoiIupWBmzH2OluE6eMt6hx9ansva31_GN28tl2uQDBloEA4a5D_9AqhUkJzB0YK7r_EjXLDOWYt-A',
    calories: 320,
    protein: 30,
    proteinLevel: 'High',
    carbs: 35,
    carbsLevel: 'Moderate',
    fats: 5,
    fatsLevel: 'Low',
    sodium: 180,
    sodiumLevel: 'Low',
    fiber: 8,
    fiberLevel: 'High',
    category: 'Breakfast',
    tags: ['Breakfast', 'Hydration', 'High Protein'],
    statusText: 'Scan Successful'
  },
  {
    id: 'sample-salmon',
    name: 'Atlantic Salmon & Asparagus',
    time: '7:45 PM',
    date: 'Yesterday, Oct 25',
    dateKey: 'yesterday',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCUdZV8pyux7eu0GJY73OsixVh0jlbK0KRc3mFNGdMTMLwQX2qVqEt3TuvcFXOTcBEw8hmbkd_u2rl_fyc-N8btP9Ezt63C8yuuiNgd-BJab35M01F1FjfIEZxDRkB65pwBwwmXBY2gnOKSGPScYAwiycIyL6vmbS-USeOlQU2KZh0SZO6BaVh6i227F5zROCgGnW2-wZ65KPbvJZS_9XhwTj4JI0_RuND2Ms7LAinzLYeLYhhXAiy2',
    calories: 540,
    protein: 42,
    proteinLevel: 'High',
    carbs: 12,
    carbsLevel: 'Low',
    fats: 28,
    fatsLevel: 'Moderate',
    sodium: 380,
    sodiumLevel: 'Low',
    fiber: 5,
    fiberLevel: 'Moderate',
    category: 'Dinner',
    tags: ['Omega-3', 'Low Carb', 'Heart Healthy'],
    statusText: 'Scan Successful'
  }
];

export const INITIAL_WEEKLY_INTAKE: DayIntake[] = [
  { day: 'Mon', fullDate: 'Oct 20', calories: 1850 },
  { day: 'Tue', fullDate: 'Oct 21', calories: 2200 },
  { day: 'Wed', fullDate: 'Oct 22', calories: 1980 },
  { day: 'Thu', fullDate: 'Oct 23', calories: 2420, isPeak: true },
  { day: 'Fri', fullDate: 'Oct 24', calories: 2310 },
  { day: 'Sat', fullDate: 'Oct 25', calories: 1750 },
  { day: 'Sun', fullDate: 'Oct 26', calories: 1940 }
];

export const INITIAL_DAILY_TARGETS: DailyTargets = {
  calories: 2200,
  protein: 150,
  carbs: 250,
  fats: 65
};

export const INITIAL_DIETARY_PREFERENCES: DietaryPreferences = {
  highProtein: true,
  lowSodium: false,
  vegetarian: false,
  glutenFree: false,
  dairyFree: false
};

export const INITIAL_BADGES: Badge[] = [
  {
    id: 'badge-1',
    name: '7 Day Streak',
    icon: 'local_fire_department',
    color: '#ff8e4d',
    bgColor: 'rgba(255, 142, 77, 0.2)',
    isLocked: false,
    description: 'Logged meals for 7 consecutive days without interruption.',
    unlockedAt: 'Oct 24, 2026'
  },
  {
    id: 'badge-2',
    name: 'Plant Power',
    icon: 'eco',
    color: '#22c55e',
    bgColor: 'rgba(34, 197, 94, 0.2)',
    isLocked: false,
    description: 'Ate at least 5 different plant-based whole foods in a single day.',
    unlockedAt: 'Oct 22, 2026'
  },
  {
    id: 'badge-3',
    name: 'Hydrated',
    icon: 'water_drop',
    color: '#4edea3',
    bgColor: 'rgba(78, 222, 163, 0.2)',
    isLocked: false,
    description: 'Reached daily hydration target of 8+ glasses of water.',
    unlockedAt: 'Oct 25, 2026'
  },
  {
    id: 'badge-4',
    name: 'Macro Master',
    icon: 'lock',
    color: '#6d7b6c',
    bgColor: 'rgba(109, 123, 108, 0.15)',
    isLocked: true,
    description: 'Hit within 5% of all 3 macronutrient targets for 5 straight days.'
  }
];

export const INITIAL_USER_PROFILE: UserProfile = {
  name: 'Alex Johnson',
  role: 'Wellness Enthusiast',
  level: 12,
  membership: 'Pro Member',
  avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFzWaklWmRI57eVrxQYxY9TyWtRepfX9i_8-J0Iuq6_AaLu7RezgnQITUAraJcLcikInSKwM_b5ZdKis1NyOw0fN3_Wkm3yngDxOFOSUn1R6lnT2_IvQVFSvA478TTZeLRKaF4EWoZL1GgjWOvU0K4n8BtXSySS09i71-6gBdi-XOnapKQaxT0XH0IStVtlnVfhlnY4W8CzXDFuHFxRVqFOjefhVY4wV0f3IVM_vOKFJr135yJ2mB7',
  streakDays: 7
};
