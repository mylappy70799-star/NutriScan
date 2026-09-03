import React from 'react';
import { ActiveTab } from '../types';

interface BottomNavBarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const navItems: { id: ActiveTab; label: string; icon: string }[] = [
    { id: 'capture', label: 'Capture', icon: 'photo_camera' },
    { id: 'insights', label: 'Insights', icon: 'dashboard' },
    { id: 'logs', label: 'Logs', icon: 'history' },
    { id: 'settings', label: 'Settings', icon: 'person' },
  ];

  return (
    <nav
      id="bottom-navigation-bar"
      className="fixed bottom-0 left-0 right-0 z-40 bg-surface-container-lowest shadow-[0px_-4px_24px_rgba(0,0,0,0.08)] border-t border-surface-container rounded-t-2xl max-w-lg md:max-w-xl mx-auto"
    >
      <div className="flex justify-around items-center px-4 py-2 pb-safe">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              id={`nav-tab-${item.id}`}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center transition-all duration-200 cursor-pointer active:scale-90 ${
                isActive
                  ? 'bg-primary-container text-on-primary-container font-semibold rounded-full px-5 py-1.5 shadow-xs'
                  : 'text-on-surface-variant hover:bg-surface-container-low px-4 py-1.5 rounded-full'
              }`}
            >
              <span
                className={`material-symbols-outlined text-[24px] ${
                  isActive ? 'fill-1' : ''
                }`}
              >
                {item.icon}
              </span>
              <span className="text-xs tracking-tight mt-0.5">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
