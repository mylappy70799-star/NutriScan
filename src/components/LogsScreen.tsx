import React, { useState } from 'react';
import { Meal, DayIntake } from '../types';
import { EXTRA_HISTORY_MEALS } from '../data/initialData';

interface LogsScreenProps {
  meals: Meal[];
  weeklyIntake: DayIntake[];
  onSelectMealForView?: (meal: Meal) => void;
}

export const LogsScreen: React.FC<LogsScreenProps> = ({
  meals,
  weeklyIntake,
  onSelectMealForView,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [allMeals, setAllMeals] = useState<Meal[]>(meals);
  const [historyLoaded, setHistoryLoaded] = useState(false);
  const [activeHoveredDay, setActiveHoveredDay] = useState<DayIntake | null>(null);

  // Sync when prop meals change (e.g. user logged a new meal)
  React.useEffect(() => {
    setAllMeals((prev) => {
      const existingIds = new Set(prev.map((m) => m.id));
      const newlyAdded = meals.filter((m) => !existingIds.has(m.id));
      return [...newlyAdded, ...prev];
    });
  }, [meals]);

  const handleLoadMore = () => {
    if (historyLoaded) return;
    setAllMeals((prev) => [...prev, ...EXTRA_HISTORY_MEALS]);
    setHistoryLoaded(true);
  };

  // Filter meals
  const filteredMeals = allMeals.filter((meal) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Breakfast') return meal.category === 'Breakfast';
    if (activeFilter === 'Lunch') return meal.category === 'Lunch';
    if (activeFilter === 'Dinner') return meal.category === 'Dinner';
    if (activeFilter === 'High Protein') return meal.tags.some((t) => t.toLowerCase().includes('protein'));
    if (activeFilter === 'Low Carb') return meal.tags.some((t) => t.toLowerCase().includes('low carb'));
    return true;
  });

  // Group meals by date
  const todayMeals = filteredMeals.filter((m) => m.dateKey === 'today');
  const yesterdayMeals = filteredMeals.filter((m) => m.dateKey === 'yesterday');
  const earlierMeals = filteredMeals.filter((m) => m.dateKey === 'earlier');

  // Calculate daily average
  const totalWeeklyCalories = weeklyIntake.reduce((acc, curr) => acc + curr.calories, 0);
  const averageDailyCalories = Math.round(totalWeeklyCalories / weeklyIntake.length);
  const dailyGoal = 2400;

  return (
    <div id="logs-screen-container" className="w-full flex flex-col animate-fade-in space-y-6">
      {/* Header Section */}
      <section className="pt-2">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight mb-1">
          Logs & Trends
        </h2>
        <p className="text-base text-on-surface-variant">
          Track your weekly progress and meal history.
        </p>
      </section>

      {/* Trends Bento Box: Weekly Caloric Intake */}
      <section className="w-full">
        <div
          id="weekly-caloric-intake-card"
          className="bg-surface-container-lowest shadow-[0px_4px_24px_rgba(0,0,0,0.06)] rounded-2xl p-5 sm:p-6 border border-surface-variant/80 relative overflow-hidden"
        >
          {/* Header Row */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg text-on-surface">
              Weekly Caloric Intake
            </h3>
            <div className="flex items-center gap-1.5 bg-surface-container-high text-primary px-3 py-1 rounded-full text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
              <span>Last 7 Days</span>
            </div>
          </div>

          {/* Caloric Bar Chart */}
          <div className="relative h-48 w-full flex items-end justify-between gap-2 sm:gap-4 mt-6 pt-6">
            {/* Horizontal guide lines */}
            <div className="w-full h-full absolute inset-0 flex flex-col justify-between pointer-events-none opacity-25">
              <div className="border-b border-outline-variant w-full h-0"></div>
              <div className="border-b border-outline-variant w-full h-0"></div>
              <div className="border-b border-outline-variant w-full h-0"></div>
              <div className="border-b border-outline-variant w-full h-0"></div>
            </div>

            {/* Bars for Mon - Sun */}
            {weeklyIntake.map((item) => {
              const maxScale = 2800;
              const heightPercent = Math.min(100, Math.round((item.calories / maxScale) * 100));
              const isSelected = activeHoveredDay?.day === item.day;

              return (
                <div
                  key={item.day}
                  onMouseEnter={() => setActiveHoveredDay(item)}
                  onMouseLeave={() => setActiveHoveredDay(null)}
                  onClick={() => setActiveHoveredDay(item)}
                  className="flex flex-col items-center gap-2 z-10 group relative flex-1 cursor-pointer h-full justify-end"
                >
                  {/* Tooltip on hover/click */}
                  {isSelected && (
                    <div className="absolute -top-10 bg-on-surface text-surface text-[11px] font-semibold py-1 px-2.5 rounded-md shadow-lg pointer-events-none whitespace-nowrap z-20 animate-fade-in">
                      {item.day}: {item.calories} kcal
                    </div>
                  )}

                  {/* Bar */}
                  <div
                    className="w-full flex items-end justify-center"
                    style={{ height: '100%' }}
                  >
                    <div
                      className={`w-full rounded-t-md transition-all duration-300 ${
                        item.isPeak
                          ? 'bg-gradient-to-t from-primary to-secondary shadow-sm ring-1 ring-primary/30'
                          : 'bg-surface-variant group-hover:bg-primary-container'
                      }`}
                      style={{ height: `${heightPercent}%` }}
                    />
                  </div>

                  {/* Label */}
                  <span
                    className={`text-xs font-semibold ${
                      item.isPeak
                        ? 'text-primary font-bold'
                        : 'text-on-surface-variant group-hover:text-on-surface'
                    }`}
                  >
                    {item.day}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Average Daily vs Goal */}
          <div className="mt-6 pt-4 border-t border-surface-container flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-on-surface-variant">Average Daily</p>
              <p className="text-xl sm:text-2xl font-bold text-primary tracking-tight">
                {averageDailyCalories.toLocaleString()} kcal
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs sm:text-sm text-on-surface-variant">Goal</p>
              <p className="text-xl sm:text-2xl font-bold text-on-surface tracking-tight">
                {dailyGoal.toLocaleString()} kcal
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Meals Feed */}
      <section className="space-y-4">
        {/* Header & Filter */}
        <div className="flex justify-between items-center relative">
          <h3 className="text-xl font-bold text-on-surface">Recent Meals</h3>
          <div className="relative">
            <button
              id="btn-filter-meals"
              onClick={() => setFilterMenuOpen(!filterMenuOpen)}
              className="text-primary font-semibold text-sm flex items-center gap-1 hover:opacity-80 transition-opacity bg-surface-container-low px-3 py-1.5 rounded-full border border-surface-variant cursor-pointer"
            >
              <span>{activeFilter === 'All' ? 'Filter' : activeFilter}</span>
              <span className="material-symbols-outlined text-[18px]">
                filter_list
              </span>
            </button>

            {/* Filter Dropdown */}
            {filterMenuOpen && (
              <div
                className="absolute right-0 top-10 mt-1 w-44 bg-surface-container-lowest rounded-xl shadow-xl border border-surface-variant p-1.5 z-30 animate-scale-up"
                onClick={() => setFilterMenuOpen(false)}
              >
                {['All', 'Breakfast', 'Lunch', 'Dinner', 'High Protein', 'Low Carb'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`w-full text-left px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                      activeFilter === filter
                        ? 'bg-primary text-on-primary'
                        : 'text-on-surface hover:bg-surface-container'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Meal List Grouped by Dates */}
        <div className="space-y-4">
          {/* Today Divider */}
          {todayMeals.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-3">
                Today, Oct 26
              </h4>
              <div className="space-y-3">
                {todayMeals.map((meal) => (
                  <MealCard
                    key={meal.id}
                    meal={meal}
                    onSelect={onSelectMealForView}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Yesterday Divider */}
          {yesterdayMeals.length > 0 && (
            <div className="pt-2">
              <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-3">
                Yesterday, Oct 25
              </h4>
              <div className="space-y-3">
                {yesterdayMeals.map((meal) => (
                  <MealCard
                    key={meal.id}
                    meal={meal}
                    onSelect={onSelectMealForView}
                    isYesterday={true}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Earlier Divider (if loaded) */}
          {earlierMeals.length > 0 && (
            <div className="pt-2">
              <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-3">
                Earlier This Week
              </h4>
              <div className="space-y-3">
                {earlierMeals.map((meal) => (
                  <MealCard
                    key={meal.id}
                    meal={meal}
                    onSelect={onSelectMealForView}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Load More History Button */}
        <div className="flex justify-center pt-4 pb-4">
          <button
            id="btn-load-more-history"
            onClick={handleLoadMore}
            disabled={historyLoaded}
            className={`font-semibold text-sm px-6 py-2.5 rounded-full transition-colors cursor-pointer ${
              historyLoaded
                ? 'bg-surface-container text-on-surface-variant/60 cursor-default'
                : 'bg-surface-container-high text-primary hover:bg-surface-variant active:scale-95'
            }`}
          >
            {historyLoaded ? 'All Recent History Loaded' : 'Load More History'}
          </button>
        </div>
      </section>
    </div>
  );
};

// Subcomponent: MealCard matching Screen 2 structure
interface MealCardProps {
  meal: Meal;
  onSelect?: (meal: Meal) => void;
  isYesterday?: boolean;
}

const MealCard: React.FC<MealCardProps> = ({ meal, onSelect, isYesterday }) => {
  return (
    <article
      onClick={() => onSelect?.(meal)}
      className={`bg-surface-container-lowest rounded-2xl shadow-[0px_4px_20px_rgba(0,0,0,0.05)] overflow-hidden flex flex-row group hover:shadow-lg transition-all border border-surface-variant cursor-pointer ${
        isYesterday ? 'opacity-95' : ''
      }`}
    >
      {/* Thumbnail */}
      <div className="w-28 sm:w-32 h-28 sm:h-32 flex-shrink-0 overflow-hidden bg-surface-container">
        <img
          src={meal.imageUrl}
          alt={meal.imageAlt || meal.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4 flex flex-col justify-between flex-grow min-w-0">
        <div>
          {/* Header & Timestamp */}
          <div className="flex justify-between items-start mb-1">
            <h5 className="font-bold text-on-surface text-base sm:text-lg leading-tight truncate mr-2">
              {meal.name}
            </h5>
            <span className="text-on-surface-variant font-medium text-xs whitespace-nowrap">
              {meal.time}
            </span>
          </div>

          {/* Chips */}
          <div className="flex flex-wrap gap-1.5 mt-1.5">
            {meal.tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-[#eff4ff] text-primary px-2.5 py-0.5 rounded-full font-semibold text-[11px]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Calories & Macros Footer */}
        <div className="flex justify-between items-end mt-2 pt-2 border-t border-surface-variant/80">
          <div>
            <p className="font-bold text-primary text-base sm:text-lg">
              {meal.calories} kcal
            </p>
          </div>
          <div className="flex gap-3 text-on-surface-variant font-medium text-xs sm:text-sm">
            <span>P: {meal.protein}g</span>
            <span>C: {meal.carbs}g</span>
            <span>F: {meal.fats}g</span>
          </div>
        </div>
      </div>
    </article>
  );
};
