import React, { useState } from 'react';
import { UserProfile, DailyTargets, DietaryPreferences, Badge } from '../types';

interface SettingsScreenProps {
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  dailyTargets: DailyTargets;
  setDailyTargets: React.Dispatch<React.SetStateAction<DailyTargets>>;
  dietaryPreferences: DietaryPreferences;
  setDietaryPreferences: React.Dispatch<React.SetStateAction<DietaryPreferences>>;
  badges: Badge[];
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  userProfile,
  dailyTargets,
  setDailyTargets,
  dietaryPreferences,
  setDietaryPreferences,
  badges,
}) => {
  const [isEditingTargets, setIsEditingTargets] = useState(false);
  const [tempTargets, setTempTargets] = useState<DailyTargets>(dailyTargets);
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  const [saveToast, setSaveToast] = useState(false);

  const handleSaveTargets = () => {
    setDailyTargets(tempTargets);
    setIsEditingTargets(false);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2000);
  };

  const handleTogglePreference = (key: keyof DietaryPreferences) => {
    setDietaryPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div
      id="settings-screen-container"
      className="w-full flex flex-col space-y-6 animate-fade-in"
    >
      {/* Save Notification Toast */}
      {saveToast && (
        <div className="fixed top-20 right-4 z-50 bg-primary text-on-primary px-4 py-2.5 rounded-full shadow-lg text-xs font-bold flex items-center gap-2 animate-scale-up">
          <span className="material-symbols-outlined text-base">check</span>
          Daily targets updated successfully!
        </div>
      )}

      {/* Main Grid: Responsive matching the layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (Desktop) / Top Section: Profile Overview & Badges */}
        <section className="lg:col-span-4 flex flex-col gap-6">
          {/* Profile Overview Bento Box */}
          <div
            id="profile-card"
            className="bg-surface-container-lowest rounded-2xl shadow-[0px_4px_24px_rgba(0,0,0,0.06)] p-6 flex flex-col items-center text-center relative overflow-hidden border border-surface-variant/80"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-container/10 via-transparent to-transparent pointer-events-none"></div>

            {/* Avatar */}
            <div className="h-24 w-24 rounded-full overflow-hidden border-4 border-surface shadow-md mb-3 relative z-10 bg-surface-container">
              <img
                src={userProfile.avatarUrl}
                alt={userProfile.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <h2 className="text-xl font-bold text-on-surface relative z-10">
              {userProfile.name}
            </h2>
            <p className="text-sm text-on-surface-variant relative z-10 mt-0.5">
              {userProfile.role}
            </p>

            {/* Level & Membership Chips */}
            <div className="mt-4 flex gap-2 relative z-10">
              <span className="bg-surface-container-low text-primary font-semibold text-xs px-3.5 py-1 rounded-full border border-surface-variant">
                Level {userProfile.level}
              </span>
              <span className="bg-surface-container-low text-primary font-semibold text-xs px-3.5 py-1 rounded-full border border-surface-variant">
                {userProfile.membership}
              </span>
            </div>
          </div>

          {/* Badges Earned Bento Box */}
          <div
            id="badges-card"
            className="bg-surface-container-lowest rounded-2xl shadow-[0px_4px_24px_rgba(0,0,0,0.06)] p-6 border border-surface-variant/80 flex-1"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-sm text-on-surface">Badges Earned</h3>
              <span className="text-[11px] font-semibold text-on-surface-variant">
                3 of 4 Unlocked
              </span>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-4 gap-2 text-center">
              {badges.map((badge) => (
                <button
                  key={badge.id}
                  onClick={() => setSelectedBadge(badge)}
                  className={`flex flex-col items-center cursor-pointer group transition-transform active:scale-95 ${
                    badge.isLocked ? 'opacity-40 grayscale' : ''
                  }`}
                  title={`${badge.name}: ${badge.description}`}
                >
                  <div
                    className={`h-12 w-12 rounded-full flex items-center justify-center mb-1.5 transition-all group-hover:scale-105 ${
                      badge.isLocked
                        ? 'bg-surface-variant text-on-surface-variant border border-dashed border-outline'
                        : ''
                    }`}
                    style={
                      !badge.isLocked
                        ? { backgroundColor: badge.bgColor, color: badge.color }
                        : undefined
                    }
                  >
                    <span
                      className={`material-symbols-outlined text-2xl ${
                        !badge.isLocked ? 'fill-1' : ''
                      }`}
                    >
                      {badge.icon}
                    </span>
                  </div>
                  <span className="text-[10px] font-semibold leading-tight text-on-surface-variant text-center">
                    {badge.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Right Column (Desktop) / Main Body: Daily Targets & Preferences */}
        <section className="lg:col-span-8 flex flex-col gap-6">
          {/* Daily Targets Bento */}
          <div
            id="daily-targets-card"
            className="bg-surface-container-lowest rounded-2xl shadow-[0px_4px_24px_rgba(0,0,0,0.06)] p-6 border border-surface-variant/80"
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-2xl">
                  track_changes
                </span>
                <span>Daily Targets</span>
              </h3>
              <button
                id="btn-edit-targets"
                onClick={() => {
                  if (isEditingTargets) {
                    handleSaveTargets();
                  } else {
                    setTempTargets(dailyTargets);
                    setIsEditingTargets(true);
                  }
                }}
                className="text-primary font-bold text-sm hover:underline cursor-pointer px-3 py-1 rounded-lg hover:bg-surface-container-low transition-colors"
              >
                {isEditingTargets ? 'Done' : 'Edit'}
              </button>
            </div>

            {/* Target 4 Grid Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Calories Target */}
              <div className="bg-surface p-4 rounded-xl border border-surface-variant flex flex-col justify-between">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-xs sm:text-sm text-on-surface-variant">
                    Calories
                  </span>
                  <span className="material-symbols-outlined text-tertiary-container text-lg">
                    local_dining
                  </span>
                </div>
                {isEditingTargets ? (
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      type="number"
                      value={tempTargets.calories}
                      onChange={(e) =>
                        setTempTargets({ ...tempTargets, calories: Number(e.target.value) })
                      }
                      className="w-28 p-1.5 text-xl font-bold bg-white border border-primary rounded-lg text-on-surface"
                    />
                    <span className="text-xs font-semibold text-on-surface-variant">kcal</span>
                  </div>
                ) : (
                  <div className="flex items-end gap-1.5">
                    <span className="text-3xl sm:text-4xl font-extrabold text-on-surface tracking-tight">
                      {dailyTargets.calories.toLocaleString()}
                    </span>
                    <span className="text-sm font-medium text-on-surface-variant mb-1">
                      kcal
                    </span>
                  </div>
                )}
              </div>

              {/* Protein Target */}
              <div className="bg-surface p-4 rounded-xl border border-surface-variant flex flex-col justify-between">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-xs sm:text-sm text-on-surface-variant">
                    Protein
                  </span>
                  <span className="material-symbols-outlined text-primary-container text-lg">
                    fitness_center
                  </span>
                </div>
                {isEditingTargets ? (
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      type="number"
                      value={tempTargets.protein}
                      onChange={(e) =>
                        setTempTargets({ ...tempTargets, protein: Number(e.target.value) })
                      }
                      className="w-24 p-1.5 text-xl font-bold bg-white border border-primary rounded-lg text-on-surface"
                    />
                    <span className="text-xs font-semibold text-on-surface-variant">g</span>
                  </div>
                ) : (
                  <div className="flex items-end gap-1.5">
                    <span className="text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
                      {dailyTargets.protein}
                    </span>
                    <span className="text-sm font-medium text-on-surface-variant mb-1">g</span>
                  </div>
                )}
              </div>

              {/* Carbs Target */}
              <div className="bg-surface p-4 rounded-xl border border-surface-variant flex flex-col justify-between">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-xs sm:text-sm text-on-surface-variant">
                    Carbs
                  </span>
                  <span className="material-symbols-outlined text-secondary-container text-lg">
                    grain
                  </span>
                </div>
                {isEditingTargets ? (
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      type="number"
                      value={tempTargets.carbs}
                      onChange={(e) =>
                        setTempTargets({ ...tempTargets, carbs: Number(e.target.value) })
                      }
                      className="w-24 p-1.5 text-xl font-bold bg-white border border-primary rounded-lg text-on-surface"
                    />
                    <span className="text-xs font-semibold text-on-surface-variant">g</span>
                  </div>
                ) : (
                  <div className="flex items-end gap-1.5">
                    <span className="text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
                      {dailyTargets.carbs}
                    </span>
                    <span className="text-sm font-medium text-on-surface-variant mb-1">g</span>
                  </div>
                )}
              </div>

              {/* Fats Target */}
              <div className="bg-surface p-4 rounded-xl border border-surface-variant flex flex-col justify-between">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-xs sm:text-sm text-on-surface-variant">
                    Fats
                  </span>
                  <span className="material-symbols-outlined text-outline text-lg">
                    opacity
                  </span>
                </div>
                {isEditingTargets ? (
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      type="number"
                      value={tempTargets.fats}
                      onChange={(e) =>
                        setTempTargets({ ...tempTargets, fats: Number(e.target.value) })
                      }
                      className="w-24 p-1.5 text-xl font-bold bg-white border border-primary rounded-lg text-on-surface"
                    />
                    <span className="text-xs font-semibold text-on-surface-variant">g</span>
                  </div>
                ) : (
                  <div className="flex items-end gap-1.5">
                    <span className="text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
                      {dailyTargets.fats}
                    </span>
                    <span className="text-sm font-medium text-on-surface-variant mb-1">g</span>
                  </div>
                )}
              </div>
            </div>

            {isEditingTargets && (
              <div className="mt-4 flex justify-end gap-2 pt-3 border-t border-surface-variant">
                <button
                  onClick={() => setIsEditingTargets(false)}
                  className="px-4 py-1.5 rounded-full text-xs font-semibold text-on-surface-variant hover:bg-surface-container"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveTargets}
                  className="px-5 py-1.5 rounded-full text-xs font-bold bg-primary text-on-primary shadow-sm hover:opacity-90"
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>

          {/* Dietary Preferences Bento */}
          <div
            id="dietary-preferences-card"
            className="bg-surface-container-lowest rounded-2xl shadow-[0px_4px_24px_rgba(0,0,0,0.06)] p-6 border border-surface-variant/80"
          >
            <h3 className="text-lg font-bold text-on-surface mb-5 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-2xl">
                restaurant_menu
              </span>
              <span>Dietary Preferences</span>
            </h3>

            <div className="flex flex-col divide-y divide-surface-variant">
              {/* Toggle 1: High Protein */}
              <div
                onClick={() => handleTogglePreference('highProtein')}
                className="py-3.5 px-2 rounded-xl hover:bg-surface-container-low transition-colors cursor-pointer flex items-center justify-between"
              >
                <div className="pr-4">
                  <span className="block font-bold text-sm text-on-surface">
                    High Protein
                  </span>
                  <span className="block text-xs text-on-surface-variant mt-0.5">
                    Prioritize protein-rich meal suggestions.
                  </span>
                </div>
                {/* Switch Graphic */}
                <div
                  className={`w-12 h-6 rounded-full transition-colors relative flex items-center p-0.5 cursor-pointer shrink-0 ${
                    dietaryPreferences.highProtein
                      ? 'bg-primary'
                      : 'bg-surface-variant border border-outline-variant'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform flex items-center justify-center ${
                      dietaryPreferences.highProtein ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  >
                    {dietaryPreferences.highProtein && (
                      <span className="material-symbols-outlined text-primary text-[14px] font-bold">
                        check
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Toggle 2: Low Sodium */}
              <div
                onClick={() => handleTogglePreference('lowSodium')}
                className="py-3.5 px-2 rounded-xl hover:bg-surface-container-low transition-colors cursor-pointer flex items-center justify-between"
              >
                <div className="pr-4">
                  <span className="block font-bold text-sm text-on-surface">
                    Low Sodium
                  </span>
                  <span className="block text-xs text-on-surface-variant mt-0.5">
                    Filter out meals high in salt content.
                  </span>
                </div>
                {/* Switch Graphic */}
                <div
                  className={`w-12 h-6 rounded-full transition-colors relative flex items-center p-0.5 cursor-pointer shrink-0 ${
                    dietaryPreferences.lowSodium
                      ? 'bg-primary'
                      : 'bg-surface-variant border border-outline-variant'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform flex items-center justify-center ${
                      dietaryPreferences.lowSodium ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  >
                    {dietaryPreferences.lowSodium && (
                      <span className="material-symbols-outlined text-primary text-[14px] font-bold">
                        check
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Toggle 3: Vegetarian */}
              <div
                onClick={() => handleTogglePreference('vegetarian')}
                className="py-3.5 px-2 rounded-xl hover:bg-surface-container-low transition-colors cursor-pointer flex items-center justify-between"
              >
                <div className="pr-4">
                  <span className="block font-bold text-sm text-on-surface">
                    Vegetarian
                  </span>
                  <span className="block text-xs text-on-surface-variant mt-0.5">
                    Exclude meat and poultry from recommendations.
                  </span>
                </div>
                {/* Switch Graphic */}
                <div
                  className={`w-12 h-6 rounded-full transition-colors relative flex items-center p-0.5 cursor-pointer shrink-0 ${
                    dietaryPreferences.vegetarian
                      ? 'bg-primary'
                      : 'bg-surface-variant border border-outline-variant'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform flex items-center justify-center ${
                      dietaryPreferences.vegetarian ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  >
                    {dietaryPreferences.vegetarian && (
                      <span className="material-symbols-outlined text-primary text-[14px] font-bold">
                        check
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Badge Detail Dialog */}
      {selectedBadge && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedBadge(null)}
        >
          <div
            className="bg-surface-container-lowest rounded-2xl max-w-sm w-full p-6 text-center shadow-2xl border border-surface-container animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4"
              style={{
                backgroundColor: selectedBadge.bgColor,
                color: selectedBadge.color,
              }}
            >
              <span className="material-symbols-outlined text-3xl">
                {selectedBadge.icon}
              </span>
            </div>
            <h4 className="text-xl font-bold text-on-surface">{selectedBadge.name}</h4>
            <p className="text-xs font-semibold text-primary mt-1">
              {selectedBadge.isLocked ? 'Locked Achievement' : `Unlocked on ${selectedBadge.unlockedAt}`}
            </p>
            <p className="text-sm text-on-surface-variant mt-3 leading-relaxed">
              {selectedBadge.description}
            </p>
            <button
              onClick={() => setSelectedBadge(null)}
              className="mt-6 w-full py-2.5 bg-primary text-on-primary rounded-full font-bold text-sm hover:opacity-90 cursor-pointer"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
