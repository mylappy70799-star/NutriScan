import React, { useState } from 'react';
import { ActiveTab, UserProfile } from '../types';
import { NutriScanLogo } from './NutriScanLogo';

interface TopAppBarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  userProfile: UserProfile;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({
  activeTab,
  setActiveTab,
  userProfile,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <header
        id="top-app-bar"
        className="bg-surface shadow-sm fixed top-0 w-full z-40 flex items-center justify-between px-4 sm:px-6 h-16 max-w-[1200px] mx-auto left-0 right-0 border-b border-surface-container"
      >
        {/* Menu Toggle */}
        <button
          id="menu-drawer-toggle"
          onClick={() => setDrawerOpen(true)}
          className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity active:scale-95 cursor-pointer p-1.5 rounded-lg hover:bg-surface-container-low"
          aria-label="Open menu"
        >
          <span className="material-symbols-outlined text-[26px]">menu</span>
        </button>

        {/* Center Brand Title */}
        <div
          onClick={() => setActiveTab('capture')}
          className="flex items-center gap-2 cursor-pointer select-none"
        >
          <NutriScanLogo size={28} />
          <h1 className="text-2xl font-bold text-primary tracking-tight font-sans">
            NutriScan
          </h1>
        </div>

        {/* Right User Avatar */}
        <button
          id="profile-header-button"
          onClick={() => setActiveTab('settings')}
          className="flex items-center hover:opacity-85 transition-opacity active:scale-95 cursor-pointer rounded-full p-0.5 ring-2 ring-primary/20 hover:ring-primary/40"
          aria-label="View user profile"
          title={`${userProfile.name} - ${userProfile.membership}`}
        >
          <div className="w-8 h-8 rounded-full overflow-hidden bg-surface-container-high border border-outline-variant">
            <img
              src={userProfile.avatarUrl}
              alt={userProfile.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </button>
      </header>

      {/* Side Drawer Overlay */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex animate-fade-in"
          onClick={() => setDrawerOpen(false)}
        >
          <div
            className="w-72 sm:w-80 bg-surface-container-lowest h-full shadow-2xl p-6 flex flex-col justify-between border-r border-surface-container transform transition-transform"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-surface-container">
                <div className="flex items-center gap-2">
                  <NutriScanLogo size={32} showText={true} />
                </div>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="p-1.5 rounded-full hover:bg-surface-container text-on-surface-variant cursor-pointer"
                  aria-label="Close menu"
                >
                  <span className="material-symbols-outlined text-xl">close</span>
                </button>
              </div>

              {/* User Mini Card */}
              <div
                onClick={() => {
                  setActiveTab('settings');
                  setDrawerOpen(false);
                }}
                className="my-5 p-3 rounded-xl bg-surface-container-low border border-surface-variant flex items-center gap-3 cursor-pointer hover:bg-surface-container transition-colors"
              >
                <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-primary-container shrink-0">
                  <img
                    src={userProfile.avatarUrl}
                    alt={userProfile.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="overflow-hidden">
                  <h4 className="font-semibold text-on-surface text-sm truncate">
                    {userProfile.name}
                  </h4>
                  <p className="text-xs text-on-surface-variant truncate">
                    {userProfile.role}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="bg-primary-container/20 text-primary text-[10px] font-semibold px-2 py-0.5 rounded-full">
                      Level {userProfile.level}
                    </span>
                    <span className="text-[10px] text-tertiary-container font-semibold flex items-center">
                      🔥 {userProfile.streakDays}d Streak
                    </span>
                  </div>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="space-y-1 font-medium">
                <button
                  onClick={() => {
                    setActiveTab('capture');
                    setDrawerOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors text-left ${
                    activeTab === 'capture'
                      ? 'bg-primary-container text-on-primary-container font-semibold'
                      : 'text-on-surface-variant hover:bg-surface-container'
                  }`}
                >
                  <span className={`material-symbols-outlined ${activeTab === 'capture' ? 'fill-1' : ''}`}>
                    photo_camera
                  </span>
                  <span>Capture & Scan</span>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('insights');
                    setDrawerOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors text-left ${
                    activeTab === 'insights'
                      ? 'bg-primary-container text-on-primary-container font-semibold'
                      : 'text-on-surface-variant hover:bg-surface-container'
                  }`}
                >
                  <span className={`material-symbols-outlined ${activeTab === 'insights' ? 'fill-1' : ''}`}>
                    dashboard
                  </span>
                  <span>Insights & Balance</span>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('logs');
                    setDrawerOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors text-left ${
                    activeTab === 'logs'
                      ? 'bg-primary-container text-on-primary-container font-semibold'
                      : 'text-on-surface-variant hover:bg-surface-container'
                  }`}
                >
                  <span className={`material-symbols-outlined ${activeTab === 'logs' ? 'fill-1' : ''}`}>
                    history
                  </span>
                  <span>Logs & Trends</span>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('settings');
                    setDrawerOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors text-left ${
                    activeTab === 'settings'
                      ? 'bg-primary-container text-on-primary-container font-semibold'
                      : 'text-on-surface-variant hover:bg-surface-container'
                  }`}
                >
                  <span className={`material-symbols-outlined ${activeTab === 'settings' ? 'fill-1' : ''}`}>
                    person
                  </span>
                  <span>Settings & Profile</span>
                </button>
              </div>
            </div>

            {/* Bottom Drawer info */}
            <div className="pt-4 border-t border-surface-container text-xs text-on-surface-variant">
              <div className="flex items-center justify-between text-on-surface-variant/80">
                <span>NutriScan App</span>
                <span className="bg-surface-container px-2 py-0.5 rounded text-[10px]">v2.4</span>
              </div>
              <p className="mt-1 text-[11px] text-outline">
                Precision AI nutritional analysis
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
