import React from 'react';
import { Moon, Sun, Wifi, Volume2, Battery } from 'lucide-react';

interface QuickSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

const QuickSettings: React.FC<QuickSettingsProps> = ({
  isOpen,
  onClose,
  isDarkMode,
  onToggleDarkMode,
}) => {
  if (!isOpen) return null;

  const modeClasses = isDarkMode ? 'window-dark' : 'window-light';
  const hoverClasses = isDarkMode ? 'hover:bg-white/10' : 'hover:bg-gray-100';
  const textClasses = isDarkMode ? 'text-gray-400' : 'text-gray-600';

  return (
    <>
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 backdrop-animation"
        onClick={onClose}
      />
      <div className={`fixed bottom-12 right-4 w-80 rounded-lg ${modeClasses} shadow-2xl z-50 overflow-hidden quick-settings-animation`}>
        <div className="p-4">
          <div className="grid grid-cols-3 gap-2 mb-4">
            <button className={`flex flex-col items-center gap-2 p-3 rounded-lg ${hoverClasses} transition-all duration-200`}>
              <div className="p-2 rounded-lg bg-blue-500/20">
                <Wifi className="w-5 h-5 text-blue-400" />
              </div>
              <span className="text-xs">Wi-Fi</span>
            </button>
            <button className={`flex flex-col items-center gap-2 p-3 rounded-lg ${hoverClasses} transition-all duration-200`}>
              <div className="p-2 rounded-lg bg-green-500/20">
                <Volume2 className="w-5 h-5 text-green-400" />
              </div>
              <span className="text-xs">Sound</span>
            </button>
            <button className={`flex flex-col items-center gap-2 p-3 rounded-lg ${hoverClasses} transition-all duration-200`}>
              <div className="p-2 rounded-lg bg-yellow-500/20">
                <Battery className="w-5 h-5 text-yellow-400" />
              </div>
              <span className="text-xs">Battery</span>
            </button>
          </div>

          <div className={`flex items-center justify-between p-3 rounded-lg ${hoverClasses} transition-all duration-200`}>
            <div className="flex items-center gap-3">
              {isDarkMode ? (
                <Moon className="w-5 h-5 text-blue-400" />
              ) : (
                <Sun className="w-5 h-5 text-yellow-400" />
              )}
              <span>Dark Mode</span>
            </div>
            <button
              onClick={onToggleDarkMode}
              className={`w-11 h-6 rounded-full transition-colors duration-200 ${
                isDarkMode ? 'bg-cyan-500' : 'bg-gray-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transform transition-transform duration-200 ${
                  isDarkMode ? 'translate-x-6' : 'translate-x-0.5'
                } shadow-md`}
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuickSettings;