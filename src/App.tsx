/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ActiveTab, Meal, DayIntake, DailyTargets, DietaryPreferences, Badge, UserProfile } from './types';
import {
  INITIAL_SCANNED_MEAL,
  INITIAL_MEALS,
  INITIAL_WEEKLY_INTAKE,
  INITIAL_DAILY_TARGETS,
  INITIAL_DIETARY_PREFERENCES,
  INITIAL_BADGES,
  INITIAL_USER_PROFILE,
} from './data/initialData';
import { TopAppBar } from './components/TopAppBar';
import { BottomNavBar } from './components/BottomNavBar';
import { CaptureScreen } from './components/CaptureScreen';
import { LogsScreen } from './components/LogsScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { InsightsScreen } from './components/InsightsScreen';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('capture');
  const [currentMeal, setCurrentMeal] = useState<Meal>(INITIAL_SCANNED_MEAL);
  const [meals, setMeals] = useState<Meal[]>(INITIAL_MEALS);
  const [weeklyIntake, setWeeklyIntake] = useState<DayIntake[]>(INITIAL_WEEKLY_INTAKE);
  const [dailyTargets, setDailyTargets] = useState<DailyTargets>(INITIAL_DAILY_TARGETS);
  const [dietaryPreferences, setDietaryPreferences] = useState<DietaryPreferences>(
    INITIAL_DIETARY_PREFERENCES
  );
  const [badges, setBadges] = useState<Badge[]>(INITIAL_BADGES);
  const [userProfile, setUserProfile] = useState<UserProfile>(INITIAL_USER_PROFILE);

  // Add currently scanned meal to active log
  const handleAddToLog = (newMeal: Meal) => {
    const mealEntry: Meal = {
      ...newMeal,
      id: `meal-logged-${Date.now()}`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: 'Today, Oct 26',
      dateKey: 'today',
    };

    setMeals((prev) => [mealEntry, ...prev]);

    // Update today's calories in weekly intake
    setWeeklyIntake((prev) =>
      prev.map((item) => {
        if (item.day === 'Sun') {
          return {
            ...item,
            calories: item.calories + newMeal.calories,
          };
        }
        return item;
      })
    );
  };

  // Switch to capture view to examine any historical meal
  const handleSelectMealForView = (meal: Meal) => {
    setCurrentMeal(meal);
    setActiveTab('capture');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-on-background flex flex-col font-sans antialiased selection:bg-primary selection:text-white">
      {/* Top Application Bar */}
      <TopAppBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userProfile={userProfile}
      />

      {/* Main Content Area */}
      <main className="flex-grow pt-20 pb-28 md:pb-24 px-4 sm:px-6 max-w-[1200px] mx-auto w-full">
        {activeTab === 'capture' && (
          <CaptureScreen
            currentMeal={currentMeal}
            setCurrentMeal={setCurrentMeal}
            onAddToLog={handleAddToLog}
            onNavigateToLogs={() => setActiveTab('logs')}
          />
        )}

        {activeTab === 'logs' && (
          <LogsScreen
            meals={meals}
            weeklyIntake={weeklyIntake}
            onSelectMealForView={handleSelectMealForView}
          />
        )}

        {activeTab === 'settings' && (
          <SettingsScreen
            userProfile={userProfile}
            setUserProfile={setUserProfile}
            dailyTargets={dailyTargets}
            setDailyTargets={setDailyTargets}
            dietaryPreferences={dietaryPreferences}
            setDietaryPreferences={setDietaryPreferences}
            badges={badges}
          />
        )}

        {activeTab === 'insights' && (
          <InsightsScreen
            dailyTargets={dailyTargets}
            dietaryPreferences={dietaryPreferences}
          />
        )}
      </main>

      {/* Fixed Bottom Navigation Bar */}
      <BottomNavBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
