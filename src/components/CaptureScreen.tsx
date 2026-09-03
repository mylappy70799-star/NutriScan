import React, { useState } from 'react';
import { Meal } from '../types';
import { ScanModal } from './ScanModal';

interface CaptureScreenProps {
  currentMeal: Meal;
  setCurrentMeal: (meal: Meal) => void;
  onAddToLog: (meal: Meal) => void;
  onNavigateToLogs: () => void;
}

export const CaptureScreen: React.FC<CaptureScreenProps> = ({
  currentMeal,
  setCurrentMeal,
  onAddToLog,
  onNavigateToLogs,
}) => {
  const [isScanModalOpen, setIsScanModalOpen] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  // Dynamic calculations for progress rings and bars
  // Circumference for r=40 is 2 * PI * 40 = 251.32
  const CIRCUMFERENCE = 251.2;

  // Protein calculation (e.g. 45g target 50g -> 90%)
  const proteinPercent = Math.min(100, Math.max(10, (currentMeal.protein / 50) * 100));
  const proteinOffset = CIRCUMFERENCE - (CIRCUMFERENCE * proteinPercent) / 100;

  // Fiber calculation (e.g. 12g target 15g -> 80%)
  const fiberPercent = Math.min(100, Math.max(10, ((currentMeal.fiber || 10) / 15) * 100));
  const fiberOffset = CIRCUMFERENCE - (CIRCUMFERENCE * fiberPercent) / 100;

  // Fats progress percentage (e.g. 18g out of 40g -> 45%)
  const fatsPercent = Math.min(100, Math.max(15, (currentMeal.fats / 40) * 100));

  // Sodium progress percentage (e.g. 320mg out of 1000mg -> 32%)
  const sodiumPercent = Math.min(100, Math.max(15, ((currentMeal.sodium || 320) / 1000) * 100));

  const handleAddMeal = () => {
    onAddToLog(currentMeal);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
    }, 2500);
  };

  return (
    <div id="capture-screen-container" className="w-full flex flex-col gap-6 animate-fade-in">
      {/* Nutritional Card: Image Header & Core Metrics */}
      <section
        id="meal-result-card"
        className="w-full bg-surface-container-lowest rounded-2xl shadow-[0px_4px_24px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col md:flex-row border border-surface-variant/70"
      >
        {/* Meal Photo Container */}
        <div className="relative h-64 md:h-auto md:w-1/2 md:min-h-[320px] overflow-hidden bg-surface-container">
          <img
            src={currentMeal.imageUrl}
            alt={currentMeal.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            referrerPolicy="no-referrer"
          />
          {/* Quick Rescan Overlay Button */}
          <button
            onClick={() => setIsScanModalOpen(true)}
            className="absolute bottom-3 right-3 bg-black/60 hover:bg-black/80 text-white text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
            title="Scan different food"
          >
            <span className="material-symbols-outlined text-[16px]">flip_camera_ios</span>
            <span>Switch Photo</span>
          </button>
        </div>

        {/* Core Metrics & Info */}
        <div className="p-6 md:p-8 flex flex-col justify-center items-center text-center md:w-1/2 md:items-start md:text-left gap-4">
          <div className="w-full">
            <span
              id="scan-status-badge"
              className="inline-flex items-center gap-1.5 bg-surface-container-high text-on-surface-variant font-semibold text-xs tracking-wider px-3.5 py-1 rounded-full mb-2 uppercase"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              {currentMeal.statusText || 'Scan Successful'}
            </span>
            <h2
              id="meal-title"
              className="text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight"
            >
              {currentMeal.name}
            </h2>
          </div>

          {/* Calorie Display */}
          <div className="my-1 flex flex-col items-center md:items-start">
            <div
              id="meal-calories-display"
              className="text-5xl font-extrabold text-primary tracking-tighter"
            >
              {currentMeal.calories}
            </div>
            <div className="text-base font-medium text-on-surface-variant">
              Total Calories
            </div>
          </div>

          {/* Chips / Tags */}
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {currentMeal.tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-surface-container text-on-secondary-container font-semibold text-xs px-3.5 py-1.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Insights Bento Grid */}
      <section
        id="nutrition-bento-grid"
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full"
      >
        {/* Protein: High (Donut Chart) */}
        <div
          id="bento-card-protein"
          className="bg-surface-container-lowest rounded-2xl p-4 sm:p-5 shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-surface-variant/60 flex flex-col items-center justify-center gap-2 hover:border-primary-container transition-all"
        >
          <h3 className="font-semibold text-sm text-on-surface-variant w-full text-left">
            Protein
          </h3>
          <div className="relative w-24 h-24 flex items-center justify-center my-1">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              {/* Background Track */}
              <circle
                className="stroke-surface-container-low"
                cx="50"
                cy="50"
                fill="transparent"
                r="40"
                stroke="#eff4ff"
                strokeWidth="12"
              />
              {/* Animated Progress Fill */}
              <circle
                className="progress-ring-circle stroke-primary-container"
                cx="50"
                cy="50"
                fill="transparent"
                r="40"
                stroke="#22c55e"
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={proteinOffset}
                strokeLinecap="round"
                strokeWidth="12"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-xl font-bold text-on-surface">
                {currentMeal.protein}g
              </span>
            </div>
          </div>
          <span className="text-sm font-semibold text-primary">
            {currentMeal.proteinLevel || 'High'}
          </span>
        </div>

        {/* Fats: Moderate (Bar Chart) */}
        <div
          id="bento-card-fats"
          className="bg-surface-container-lowest rounded-2xl p-4 sm:p-5 shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-surface-variant/60 flex flex-col justify-between gap-2 hover:border-tertiary-container transition-all"
        >
          <h3 className="font-semibold text-sm text-on-surface-variant">Fats</h3>
          <div className="text-2xl sm:text-3xl font-bold text-on-surface my-1">
            {currentMeal.fats}g
          </div>
          <div className="w-full h-3 bg-surface-container-low rounded-full overflow-hidden">
            <div
              className="h-full bg-tertiary-container rounded-full transition-all duration-700"
              style={{ width: `${fatsPercent}%` }}
            />
          </div>
          <span className="text-sm font-medium text-on-surface-variant">
            {currentMeal.fatsLevel || 'Moderate'}
          </span>
        </div>

        {/* Sodium: Low (Bar Chart) */}
        <div
          id="bento-card-sodium"
          className="bg-surface-container-lowest rounded-2xl p-4 sm:p-5 shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-surface-variant/60 flex flex-col justify-between gap-2 hover:border-secondary-container transition-all"
        >
          <h3 className="font-semibold text-sm text-on-surface-variant">Sodium</h3>
          <div className="text-2xl sm:text-3xl font-bold text-on-surface my-1">
            {currentMeal.sodium || 320}mg
          </div>
          <div className="w-full h-3 bg-surface-container-low rounded-full overflow-hidden">
            <div
              className="h-full bg-secondary-container rounded-full transition-all duration-700"
              style={{ width: `${sodiumPercent}%` }}
            />
          </div>
          <span className="text-sm font-semibold text-primary">
            {currentMeal.sodiumLevel || 'Low'}
          </span>
        </div>

        {/* Fiber: High (Donut Chart) */}
        <div
          id="bento-card-fiber"
          className="bg-surface-container-lowest rounded-2xl p-4 sm:p-5 shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-surface-variant/60 flex flex-col items-center justify-center gap-2 hover:border-primary transition-all"
        >
          <h3 className="font-semibold text-sm text-on-surface-variant w-full text-left">
            Fiber
          </h3>
          <div className="relative w-24 h-24 flex items-center justify-center my-1">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              {/* Background Track */}
              <circle
                className="stroke-surface-container-low"
                cx="50"
                cy="50"
                fill="transparent"
                r="40"
                stroke="#eff4ff"
                strokeWidth="12"
              />
              {/* Animated Progress Fill */}
              <circle
                className="progress-ring-circle stroke-primary"
                cx="50"
                cy="50"
                fill="transparent"
                r="40"
                stroke="#006e2f"
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={fiberOffset}
                strokeLinecap="round"
                strokeWidth="12"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-xl font-bold text-on-surface">
                {currentMeal.fiber || 12}g
              </span>
            </div>
          </div>
          <span className="text-sm font-semibold text-primary">
            {currentMeal.fiberLevel || 'High'}
          </span>
        </div>
      </section>

      {/* Action Buttons Area */}
      <section
        id="capture-actions"
        className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2"
      >
        <button
          id="btn-add-to-log"
          onClick={handleAddMeal}
          className={`flex-1 font-semibold text-base py-4 px-6 rounded-full shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer ${
            justAdded
              ? 'bg-[#22c55e] text-white'
              : 'bg-primary text-on-primary hover:bg-[#005a26]'
          }`}
        >
          <span className="material-symbols-outlined text-2xl">
            {justAdded ? 'check_circle' : 'add_circle'}
          </span>
          <span>{justAdded ? 'Added to Today’s Log!' : 'Add to Log'}</span>
        </button>

        <button
          id="btn-retake-photo"
          onClick={() => setIsScanModalOpen(true)}
          className="flex-1 bg-surface-container border border-outline-variant text-primary font-semibold text-base py-4 px-6 rounded-full hover:bg-surface-variant transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
        >
          <span className="material-symbols-outlined text-2xl">replay</span>
          <span>Retake Photo</span>
        </button>
      </section>

      {/* Added to Log Success Banner with Shortcut */}
      {justAdded && (
        <div className="p-4 bg-primary-container/20 border border-primary-container rounded-2xl flex items-center justify-between animate-scale-up">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-2xl">
              verified
            </span>
            <div>
              <p className="text-sm font-bold text-primary">
                "{currentMeal.name}" logged successfully!
              </p>
              <p className="text-xs text-on-surface-variant">
                +{currentMeal.calories} kcal added to today's intake
              </p>
            </div>
          </div>
          <button
            onClick={onNavigateToLogs}
            className="text-xs font-bold text-primary underline hover:text-[#005a26] cursor-pointer"
          >
            View Logs &rarr;
          </button>
        </div>
      )}

      {/* Scanner & Food Retake Modal */}
      <ScanModal
        isOpen={isScanModalOpen}
        onClose={() => setIsScanModalOpen(false)}
        onScanComplete={(newMeal) => {
          setCurrentMeal(newMeal);
        }}
      />
    </div>
  );
};
