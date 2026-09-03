import React, { useState, useRef } from 'react';
import { Meal } from '../types';
import { SAMPLE_SCAN_PRESETS } from '../data/initialData';

interface ScanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScanComplete: (meal: Meal) => void;
}

export const ScanModal: React.FC<ScanModalProps> = ({
  isOpen,
  onClose,
  onScanComplete,
}) => {
  const [activeMode, setActiveMode] = useState<'presets' | 'upload' | 'camera'>('presets');
  const [isScanning, setIsScanning] = useState(false);
  const [uploadedPreview, setUploadedPreview] = useState<string | null>(null);
  const [cameraStreamActive, setCameraStreamActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // Start live camera
  const startCamera = async () => {
    setActiveMode('camera');
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setCameraStreamActive(true);
      }
    } catch (err) {
      console.warn('Camera access denied or unavailable:', err);
      setCameraError('Camera access not granted or unavailable in this view. You can choose a sample or upload a photo!');
      setCameraStreamActive(false);
    }
  };

  // Stop camera
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setCameraStreamActive(false);
  };

  const handleClose = () => {
    stopCamera();
    onClose();
  };

  // Trigger scanning animation
  const runScanSimulation = (mealData: Meal) => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      stopCamera();
      onScanComplete(mealData);
      onClose();
    }, 1200);
  };

  // Handle preset selection
  const handleSelectPreset = (preset: Meal) => {
    runScanSimulation({
      ...preset,
      id: `scan-${Date.now()}`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });
  };

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const url = event.target?.result as string;
      setUploadedPreview(url);

      // Create a custom detected meal from user image
      const randomCalories = Math.floor(Math.random() * 250) + 380;
      const customMeal: Meal = {
        id: `scan-user-${Date.now()}`,
        name: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ') || 'Fresh Meal Plate',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        date: 'Today, Oct 26',
        dateKey: 'today',
        imageUrl: url,
        calories: randomCalories,
        protein: Math.floor(randomCalories * 0.08),
        proteinLevel: 'High',
        carbs: Math.floor(randomCalories * 0.1),
        carbsLevel: 'Moderate',
        fats: Math.floor(randomCalories * 0.03),
        fatsLevel: 'Moderate',
        sodium: 290,
        sodiumLevel: 'Low',
        fiber: 8,
        fiberLevel: 'High',
        category: 'Lunch',
        tags: ['AI Analyzed', 'Custom Scan'],
        statusText: 'Scan Successful',
      };

      runScanSimulation(customMeal);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div
      id="scan-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={handleClose}
    >
      <div
        id="scan-modal-dialog"
        className="bg-surface-container-lowest rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl border border-surface-container animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-surface-container">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-2xl">
              photo_camera
            </span>
            <h3 className="font-bold text-on-surface text-lg">NutriScan Food Scanner</h3>
          </div>
          <button
            onClick={handleClose}
            className="p-1 rounded-full hover:bg-surface-container text-on-surface-variant cursor-pointer"
            aria-label="Close scanner"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex border-b border-surface-container bg-surface-container-low px-4 pt-2">
          <button
            onClick={() => {
              stopCamera();
              setActiveMode('presets');
            }}
            className={`flex-1 py-2 text-sm font-semibold border-b-2 text-center transition-colors cursor-pointer ${
              activeMode === 'presets'
                ? 'border-primary text-primary'
                : 'border-transparent text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Sample Meals
          </button>
          <button
            onClick={() => {
              stopCamera();
              setActiveMode('upload');
            }}
            className={`flex-1 py-2 text-sm font-semibold border-b-2 text-center transition-colors cursor-pointer ${
              activeMode === 'upload'
                ? 'border-primary text-primary'
                : 'border-transparent text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Upload Photo
          </button>
          <button
            onClick={startCamera}
            className={`flex-1 py-2 text-sm font-semibold border-b-2 text-center transition-colors cursor-pointer ${
              activeMode === 'camera'
                ? 'border-primary text-primary'
                : 'border-transparent text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Live Camera
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 max-h-[75vh] overflow-y-auto">
          {/* Scanning Animation Overlay */}
          {isScanning && (
            <div className="relative w-full h-56 rounded-xl bg-surface-container-high overflow-hidden flex flex-col items-center justify-center mb-4">
              <div className="absolute inset-0 bg-primary/10"></div>
              {/* Laser line */}
              <div className="absolute left-0 right-0 h-1 bg-primary-container shadow-[0_0_12px_#22c55e] animate-bounce top-1/2"></div>
              <span className="material-symbols-outlined text-primary text-5xl animate-spin mb-2">
                refresh
              </span>
              <p className="text-primary font-bold text-base tracking-wide animate-pulse">
                Analyzing Nutrients with NutriScan AI...
              </p>
              <p className="text-xs text-on-surface-variant mt-1">
                Estimating calories, proteins, lipids and sodium
              </p>
            </div>
          )}

          {/* Mode 1: Presets */}
          {!isScanning && activeMode === 'presets' && (
            <div className="space-y-3">
              <p className="text-xs text-on-surface-variant font-medium">
                Choose a sample meal to test instant scanning:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SAMPLE_SCAN_PRESETS.map((preset) => (
                  <div
                    key={preset.id}
                    onClick={() => handleSelectPreset(preset)}
                    className="group border border-surface-variant rounded-xl overflow-hidden cursor-pointer hover:border-primary hover:shadow-md transition-all bg-surface-container-lowest flex flex-row items-center p-2 gap-3"
                  >
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-surface-container shrink-0">
                      <img
                        src={preset.imageUrl}
                        alt={preset.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-on-surface text-sm truncate group-hover:text-primary transition-colors">
                        {preset.name}
                      </h4>
                      <p className="text-xs font-bold text-primary">
                        {preset.calories} kcal
                      </p>
                      <div className="flex gap-2 text-[10px] text-on-surface-variant mt-0.5">
                        <span>P: {preset.protein}g</span>
                        <span>F: {preset.fats}g</span>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-primary opacity-0 group-hover:opacity-100 transition-opacity pr-1">
                      arrow_forward_ios
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Mode 2: Upload */}
          {!isScanning && activeMode === 'upload' && (
            <div className="text-center py-4">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                id="food-photo-upload"
              />
              <label
                htmlFor="food-photo-upload"
                className="border-2 border-dashed border-outline-variant hover:border-primary rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer bg-surface-container-low hover:bg-surface-container transition-colors"
              >
                <div className="w-14 h-14 rounded-full bg-primary-container/20 text-primary flex items-center justify-center mb-3">
                  <span className="material-symbols-outlined text-3xl">add_a_photo</span>
                </div>
                <p className="font-semibold text-on-surface text-sm">
                  Click or drag food image here
                </p>
                <p className="text-xs text-on-surface-variant mt-1">
                  Supports JPG, PNG, WEBP (food plates, drinks, bowls)
                </p>
              </label>

              {uploadedPreview && (
                <div className="mt-4 p-2 rounded-xl bg-surface-container-low border border-surface-variant flex items-center gap-3">
                  <img
                    src={uploadedPreview}
                    alt="Preview"
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <span className="text-xs font-medium text-on-surface">Image uploaded</span>
                </div>
              )}
            </div>
          )}

          {/* Mode 3: Live Camera */}
          {!isScanning && activeMode === 'camera' && (
            <div className="flex flex-col items-center">
              {cameraError ? (
                <div className="p-4 bg-error-container/20 text-error rounded-xl text-center text-sm mb-3">
                  <p>{cameraError}</p>
                  <button
                    onClick={() => setActiveMode('presets')}
                    className="mt-3 px-4 py-1.5 bg-primary text-on-primary rounded-full text-xs font-semibold"
                  >
                    Use Sample Meals
                  </button>
                </div>
              ) : (
                <div className="relative w-full aspect-square max-h-72 rounded-xl overflow-hidden bg-black flex items-center justify-center">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />
                  {/* Camera reticle overlay */}
                  <div className="absolute inset-8 border-2 border-white/60 rounded-xl pointer-events-none flex items-center justify-center">
                    <div className="w-4 h-4 border-t-2 border-l-2 border-primary-container absolute top-0 left-0"></div>
                    <div className="w-4 h-4 border-t-2 border-r-2 border-primary-container absolute top-0 right-0"></div>
                    <div className="w-4 h-4 border-b-2 border-l-2 border-primary-container absolute bottom-0 left-0"></div>
                    <div className="w-4 h-4 border-b-2 border-r-2 border-primary-container absolute bottom-0 right-0"></div>
                    <span className="text-white/80 text-xs font-medium bg-black/40 px-2 py-1 rounded-md">
                      Align meal inside box
                    </span>
                  </div>
                </div>
              )}

              {cameraStreamActive && (
                <button
                  onClick={() => {
                    const preset = SAMPLE_SCAN_PRESETS[0];
                    runScanSimulation(preset);
                  }}
                  className="mt-4 px-6 py-3 bg-primary text-on-primary font-bold rounded-full shadow-lg hover:opacity-90 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined">camera</span>
                  Snap Photo
                </button>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 bg-surface-container-low border-t border-surface-container flex justify-between items-center text-xs text-on-surface-variant">
          <span>NutriScan Neural Vision</span>
          <button
            onClick={handleClose}
            className="hover:underline font-semibold text-primary cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
