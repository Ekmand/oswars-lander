import React, { useState } from 'react';
import { Terminal, Users, Trophy, FileText, Power, Search, Wifi, Volume2, Battery } from 'lucide-react';
import StartMenu from './StartMenu';
import QuickSettings from './QuickSettings';

interface TaskbarProps {
  activeWindow: string | null;
  setActiveWindow: (window: string | null) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

const Taskbar: React.FC<TaskbarProps> = ({
  activeWindow,
  setActiveWindow,
  isDarkMode,
  onToggleDarkMode,
}) => {
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [isQuickSettingsOpen, setIsQuickSettingsOpen] = useState(false);

  const modeClasses = isDarkMode 
    ? 'bg-gray-900/30 border-white/10' 
    : 'bg-white/30 border-gray-200/30';
  const textClasses = isDarkMode ? 'text-gray-300' : 'text-gray-700';
  const hoverClasses = isDarkMode ? 'hover:bg-white/10' : 'hover:bg-gray-200/20';
  const activeClasses = isDarkMode ? 'bg-white/15 text-white' : 'bg-black/10 text-black';

  const apps = [
    { id: 'welcome', icon: <Power className="w-5 h-5" />, label: 'Welcome' },
    { id: 'teams', icon: <Users className="w-5 h-5" />, label: 'Teams' },
    { id: 'rules', icon: <FileText className="w-5 h-5" />, label: 'Rules' },
    { id: 'standings', icon: <Trophy className="w-5 h-5" />, label: 'Standings' },
    { id: 'terminal', icon: <Terminal className="w-5 h-5" />, label: 'Terminal' },
  ];

  return (
    <>
      <StartMenu
        isOpen={isStartMenuOpen}
        onClose={() => setIsStartMenuOpen(false)}
        isDarkMode={isDarkMode}
        setActiveWindow={setActiveWindow}
      />
      <QuickSettings
        isOpen={isQuickSettingsOpen}
        onClose={() => setIsQuickSettingsOpen(false)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={onToggleDarkMode}
      />

      <div className={`h-12 ${modeClasses} backdrop-blur-md border-t px-4 flex items-center fixed bottom-0 left-0 right-0 transition-colors duration-200`}>
        <div className="absolute left-4">
          <button
            onClick={() => setIsStartMenuOpen(!isStartMenuOpen)}
            className={`p-2 rounded-lg ${hoverClasses} transition-colors`}
          >
            <Power className="w-5 h-5 text-cyan-400" />
          </button>
        </div>

        <div className="flex-1 flex justify-center gap-1">
          <button className={`p-2 rounded-lg ${hoverClasses} transition-colors`}>
            <Search className={`w-5 h-5 ${textClasses}`} />
          </button>
          {apps.map((app) => (
            <button
              key={app.id}
              onClick={() => setActiveWindow(app.id === activeWindow ? null : app.id)}
              className={`p-2 rounded-lg transition-all duration-200 ${
                activeWindow === app.id
                  ? `${activeClasses} scale-95`
                  : `${hoverClasses} ${textClasses}`
              }`}
            >
              {app.icon}
              {activeWindow === app.id && (
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cyan-400" />
              )}
            </button>
          ))}
        </div>

        <div className="absolute right-4 flex items-center gap-4">
          <div className="flex items-center gap-3">
            <button className={`p-1.5 ${hoverClasses} rounded-lg transition-colors ${textClasses}`}>
              <Wifi className="w-4 h-4" />
            </button>
            <button className={`p-1.5 ${hoverClasses} rounded-lg transition-colors ${textClasses}`}>
              <Volume2 className="w-4 h-4" />
            </button>
            <button className={`p-1.5 ${hoverClasses} rounded-lg transition-colors ${textClasses}`}>
              <Battery className="w-4 h-4" />
            </button>
          </div>
          <button
            onClick={() => setIsQuickSettingsOpen(!isQuickSettingsOpen)}
            className={`text-sm ${textClasses} hover:text-current transition-colors min-w-[60px] text-shadow-sm`}
          >
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </button>
        </div>
      </div>
    </>
  );
};

export default Taskbar;