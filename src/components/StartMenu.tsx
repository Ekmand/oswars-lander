import React from 'react';
import { Search, Pin, Settings, Power, Clock, Terminal, Users, Trophy, FileText } from 'lucide-react';

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode?: boolean;
  setActiveWindow: (window: string) => void;
}

const StartMenu: React.FC<StartMenuProps> = ({ isOpen, onClose, isDarkMode = true, setActiveWindow }) => {
  if (!isOpen) return null;

  const modeClasses = isDarkMode ? 'window-dark' : 'window-light';
  const inputClasses = isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100/50';
  const textClasses = isDarkMode ? 'text-gray-400' : 'text-gray-600';
  const hoverClasses = isDarkMode ? 'hover:bg-white/10' : 'hover:bg-gray-100';
  const footerClasses = isDarkMode ? 'bg-gray-900/50 border-white/10' : 'bg-gray-100/50 border-gray-200';

  const apps = [
    { id: 'welcome', name: 'Welcome', icon: <Power className="w-6 h-6" /> },
    { id: 'teams', name: 'Teams', icon: <Users className="w-6 h-6" /> },
    { id: 'rules', name: 'Rules', icon: <FileText className="w-6 h-6" /> },
    { id: 'standings', name: 'Standings', icon: <Trophy className="w-6 h-6" /> },
    { id: 'terminal', name: 'Terminal', icon: <Terminal className="w-6 h-6" /> },
  ];

  const pinnedApps = [
    { id: 'settings', name: 'Settings', icon: <Settings className="w-6 h-6" /> },
    ...apps.slice(0, 3),
  ];

  const handleAppClick = (appId: string) => {
    setActiveWindow(appId);
    onClose();
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 backdrop-animation"
        onClick={onClose}
      />
      <div className={`fixed bottom-12 left-4 w-[640px] rounded-lg ${modeClasses} shadow-2xl z-50 overflow-hidden start-menu-animation`}>
        <div className="p-4">
          <div className="relative mb-4">
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${textClasses}`} />
            <input
              type="text"
              placeholder="Type to search"
              className={`w-full pl-10 pr-4 py-2 ${inputClasses} rounded-lg border ${isDarkMode ? 'border-white/10' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-colors`}
            />
          </div>

          <div className="mb-6">
            <h3 className={`flex items-center gap-2 text-sm font-medium ${textClasses} mb-3`}>
              <Pin className="w-4 h-4" /> Pinned
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {pinnedApps.map((app) => (
                <button
                  key={app.id}
                  onClick={() => handleAppClick(app.id)}
                  className={`flex items-center gap-3 p-3 rounded-lg ${hoverClasses} transition-all duration-200 group`}
                >
                  <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-200/50'} group-hover:bg-opacity-75 transition-colors`}>
                    {app.icon}
                  </div>
                  <span>{app.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className={`text-sm font-medium ${textClasses} mb-3`}>All apps</h3>
            <div className="grid grid-cols-3 gap-2">
              {apps.map((app) => (
                <button
                  key={app.id}
                  onClick={() => handleAppClick(app.id)}
                  className={`flex items-center gap-3 p-3 rounded-lg ${hoverClasses} transition-all duration-200 group`}
                >
                  <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-200/50'} group-hover:bg-opacity-75 transition-colors`}>
                    {app.icon}
                  </div>
                  <span>{app.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className={`mt-4 p-4 ${footerClasses} border-t`}>
          <button className={`flex items-center gap-2 text-sm ${textClasses} hover:text-current transition-colors`}>
            <Power className="w-4 h-4" />
            <span>Sign out</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default StartMenu;