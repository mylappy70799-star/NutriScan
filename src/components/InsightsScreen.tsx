import React, { useState } from 'react';
import { DailyTargets, DietaryPreferences } from '../types';

interface InsightsScreenProps {
  dailyTargets: DailyTargets;
  dietaryPreferences: DietaryPreferences;
}

export const InsightsScreen: React.FC<InsightsScreenProps> = ({
  dailyTargets,
  dietaryPreferences,
}) => {
  const [waterGlasses, setWaterGlasses] = useState(6);
  const waterTarget = 8;

  // Consumed today stats based on meals
  const consumedCalories = 1490;
  const remainingCalories = Math.max(0, dailyTargets.calories - consumedCalories);
  const calPercent = Math.min(100, Math.round((consumedCalories / dailyTargets.calories) * 100));

  const consumedProtein = 99; // g
  const consumedCarbs = 149; // g
  const consumedFats = 45; // g

  return (
    <div id="insights-screen-container" className="w-full flex flex-col space-y-6 animate-fade-in">
      {/* Header */}
      <section className="pt-2">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight mb-1">
          Nutritional Insights
        </h2>
        <p className="text-base text-on-surface-variant">
          Real-time balance, micronutrient targets, and AI dietary analysis.
        </p>
      </section>

      {/* Top Banner: Today's Calorie Budget */}
      <section className="w-full bg-surface-container-lowest rounded-2xl shadow-[0px_4px_24px_rgba(0,0,0,0.06)] p-6 border border-surface-variant/80">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex-1 text-center sm:text-left">
            <span className="bg-surface-container-high text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Today's Budget
            </span>
            <div className="mt-3 flex items-baseline justify-center sm:justify-start gap-2">
              <span className="text-4xl sm:text-5xl font-extrabold text-primary tracking-tight">
                {remainingCalories}
              </span>
              <span className="text-base font-semibold text-on-surface-variant">
                kcal remaining
              </span>
            </div>
            <p className="text-xs text-on-surface-variant mt-1">
              Consumed {consumedCalories} of {dailyTargets.calories} kcal goal ({calPercent}%)
            </p>

            {/* Calorie Bar */}
            <div className="w-full h-3 bg-surface-container-low rounded-full overflow-hidden mt-3">
              <div
                className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-700"
                style={{ width: `${calPercent}%` }}
              />
            </div>
          </div>

          {/* Quick Stats Pill Trio */}
          <div className="grid grid-cols-3 gap-3 w-full sm:w-auto">
            <div className="bg-surface p-3 rounded-xl border border-surface-variant text-center">
              <span className="text-[11px] font-semibold text-on-surface-variant block">Protein</span>
              <span className="text-lg font-bold text-on-surface">{consumedProtein}g</span>
              <span className="text-[10px] text-primary block font-medium">of {dailyTargets.protein}g</span>
            </div>
            <div className="bg-surface p-3 rounded-xl border border-surface-variant text-center">
              <span className="text-[11px] font-semibold text-on-surface-variant block">Carbs</span>
              <span className="text-lg font-bold text-on-surface">{consumedCarbs}g</span>
              <span className="text-[10px] text-secondary block font-medium">of {dailyTargets.carbs}g</span>
            </div>
            <div className="bg-surface p-3 rounded-xl border border-surface-variant text-center">
              <span className="text-[11px] font-semibold text-on-surface-variant block">Fats</span>
              <span className="text-lg font-bold text-on-surface">{consumedFats}g</span>
              <span className="text-[10px] text-tertiary-container block font-medium">of {dailyTargets.fats}g</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2-Column Bento: Macro Balance + Water Tracker */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Macro Distribution Donut / Proportions */}
        <div className="bg-surface-container-lowest rounded-2xl shadow-[0px_4px_24px_rgba(0,0,0,0.06)] p-6 border border-surface-variant/80">
          <h3 className="text-lg font-bold text-on-surface mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">pie_chart</span>
            Macronutrient Ratio
          </h3>

          <div className="flex items-center justify-around py-2">
            {/* Visual Donut */}
            <div className="relative w-32 h-32 flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="transparent"
                  stroke="#eff4ff"
                  strokeWidth="14"
                />
                {/* Protein Segment (35%) */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="transparent"
                  stroke="#22c55e"
                  strokeWidth="14"
                  strokeDasharray="238.7"
                  strokeDashoffset="75"
                  className="progress-ring-circle"
                />
                {/* Carbs Segment (45%) */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="transparent"
                  stroke="#6cf8bb"
                  strokeWidth="14"
                  strokeDasharray="238.7"
                  strokeDashoffset="140"
                  className="progress-ring-circle"
                />
              </svg>
              <div className="absolute text-center">
                <span className="text-xs text-on-surface-variant block font-medium">Balance</span>
                <span className="text-sm font-bold text-primary">Optimal</span>
              </div>
            </div>

            {/* Legend */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-primary-container"></span>
                <span className="font-semibold text-on-surface">Protein (30%)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-secondary-container"></span>
                <span className="font-semibold text-on-surface">Carbs (45%)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-tertiary-container"></span>
                <span className="font-semibold text-on-surface">Fats (25%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hydration Tracker */}
        <div className="bg-surface-container-lowest rounded-2xl shadow-[0px_4px_24px_rgba(0,0,0,0.06)] p-6 border border-surface-variant/80 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-bold text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-2xl">water_drop</span>
              Hydration Tracker
            </h3>
            <span className="text-xs font-bold text-secondary bg-surface-container-high px-3 py-1 rounded-full">
              {waterGlasses} / {waterTarget} Cups
            </span>
          </div>

          <p className="text-xs text-on-surface-variant mb-4">
            Tap a cup to log water intake. Proper hydration helps metabolic rate and nutrient absorption.
          </p>

          {/* Interactive Cups */}
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 mb-4">
            {Array.from({ length: waterTarget }).map((_, i) => (
              <button
                key={i}
                onClick={() => setWaterGlasses(i + 1)}
                className={`p-2 rounded-xl border flex flex-col items-center justify-center transition-all cursor-pointer active:scale-90 ${
                  i < waterGlasses
                    ? 'bg-secondary-container/20 border-secondary text-secondary shadow-xs'
                    : 'bg-surface border-surface-variant text-on-surface-variant/40 hover:border-secondary/40'
                }`}
                title={`Cup ${i + 1}`}
              >
                <span className={`material-symbols-outlined text-xl ${i < waterGlasses ? 'fill-1' : ''}`}>
                  local_drink
                </span>
                <span className="text-[9px] font-bold mt-0.5">{i + 1}</span>
              </button>
            ))}
          </div>

          <div className="flex justify-between items-center pt-2 border-t border-surface-container text-xs">
            <span className="text-on-surface-variant">Daily target: 2,000 ml</span>
            <button
              onClick={() => setWaterGlasses((prev) => Math.min(waterTarget, prev + 1))}
              className="font-bold text-secondary hover:underline cursor-pointer flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-sm">add</span> Add Cup
            </button>
          </div>
        </div>
      </section>

      {/* AI Nutrition Coach Advice */}
      <section className="w-full bg-surface-container-lowest rounded-2xl shadow-[0px_4px_24px_rgba(0,0,0,0.06)] p-6 border border-surface-variant/80">
        <div className="flex items-center gap-2 mb-4">
          <span className="material-symbols-outlined text-primary text-2xl">
            auto_awesome
          </span>
          <h3 className="text-lg font-bold text-on-surface">
            NutriScan AI Recommendations
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-surface-container-low border border-surface-variant flex gap-3">
            <span className="material-symbols-outlined text-primary text-2xl shrink-0 mt-0.5">
              check_circle
            </span>
            <div>
              <h4 className="text-sm font-bold text-on-surface">
                Excellent Protein Pace
              </h4>
              <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                You’re at 66% of your daily protein target with dinner still ahead. Your post-workout Grilled Chicken Salad provided an optimal 45g spike for lean muscle recovery.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-surface-container-low border border-surface-variant flex gap-3">
            <span className="material-symbols-outlined text-tertiary-container text-2xl shrink-0 mt-0.5">
              lightbulb
            </span>
            <div>
              <h4 className="text-sm font-bold text-on-surface">
                {dietaryPreferences.lowSodium ? 'Low Sodium Alert' : 'Fiber Goal Opportunity'}
              </h4>
              <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                {dietaryPreferences.lowSodium
                  ? 'Your meals today have averaged below 350mg sodium per serving, staying comfortably within your cardiovascular targets.'
                  : 'Add a handful of berries or steamed asparagus for dinner to comfortably reach your 28g daily dietary fiber recommendation.'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
