import React, { useState, useEffect } from 'react';
import { Terminal, Cpu, Users, Trophy, Clock, Power, FileText, Settings } from 'lucide-react';
import Taskbar from './components/Taskbar';
import Window from './components/Window';
import TeamCard from './components/TeamCard';
import TeamsPage from './components/TeamsPage';
import RulesPage from './components/RulesPage';
import StandingsPage from './components/StandingsPage';
import SettingsApp from './components/SettingsApp';

function App() {
  const [activeWindow, setActiveWindow] = useState<string | null>('welcome');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('isDarkMode');
    return saved ? JSON.parse(saved) : true;
  });
  const [wallpaper, setWallpaper] = useState(() => {
    const saved = localStorage.getItem('wallpaper');
    return saved || 'mountains';
  });

  // Persist theme and wallpaper preferences
  useEffect(() => {
    localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
    localStorage.setItem('wallpaper', wallpaper);
    
    // Update system theme
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode, wallpaper]);

  const teams = [
    {
      name: "Team Red",
      logo: <Terminal className="w-12 h-12 text-red-500" />,
      description: "Specializing in low-level optimization and kernel development",
      members: ["Ada Chen", "Ray Kumar", "Sarah Smith"],
      color: "red",
      score: 85
    },
    {
      name: "Team Blue",
      logo: <Cpu className="w-12 h-12 text-blue-500" />,
      description: "Pushing boundaries with quantum computing integration",
      members: ["David Lee", "Maria Garcia", "James Wilson"],
      color: "blue",
      score: 92
    },
    {
      name: "Team Magenta",
      logo: <Users className="w-12 h-12 text-purple-500" />,
      description: "Focused on revolutionary user experience and interface design",
      members: ["Emma Brown", "Alex Turner", "Michael Ross"],
      color: "purple",
      score: 88
    },
    {
      name: "Team Green",
      logo: <Trophy className="w-12 h-12 text-green-500" />,
      description: "Pioneering next-gen system architecture",
      members: ["John Doe", "Lisa Wang", "Carlos Rodriguez"],
      color: "green",
      score: 90
    }
  ];

  const handleThemeToggle = () => {
    setIsDarkMode(prev => !prev);
  };

  const handleWallpaperChange = (newWallpaper: string) => {
    setWallpaper(newWallpaper);
  };

  return (
    <div className={`h-screen wallpaper-${wallpaper} overflow-hidden flex flex-col ${isDarkMode ? 'dark' : ''}`}>
      <div className="flex-1 relative">
        {activeWindow === 'welcome' && (
          <Window
            title="Welcome to OS Wars"
            onClose={() => setActiveWindow(null)}
            icon={<Power className="w-4 h-4" />}
            isDarkMode={isDarkMode}
          >
            <div className="p-6 max-w-2xl">
              <h1 className="text-4xl font-bold mb-4 text-cyan-400">OS Wars 2024</h1>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
                Welcome to the ultimate operating system development competition where four elite teams compete to create the next generation of operating systems.
              </p>
              <div className={`${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100/50'} frosted p-4 rounded-lg mb-6`}>
                <h2 className="text-xl font-semibold mb-2 text-cyan-400">Competition Timeline</h2>
                <div className={`flex items-center gap-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <Clock className="w-4 h-4" />
                  <span>Finals: December 15th, 2024</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {teams.map((team) => (
                  <TeamCard key={team.name} {...team} isDarkMode={isDarkMode} />
                ))}
              </div>
            </div>
          </Window>
        )}

        {activeWindow === 'teams' && (
          <Window
            title="Teams"
            onClose={() => setActiveWindow(null)}
            icon={<Users className="w-4 h-4" />}
            isDarkMode={isDarkMode}
          >
            <TeamsPage teams={teams} isDarkMode={isDarkMode} />
          </Window>
        )}

        {activeWindow === 'rules' && (
          <Window
            title="Competition Rules"
            onClose={() => setActiveWindow(null)}
            icon={<FileText className="w-4 h-4" />}
            isDarkMode={isDarkMode}
          >
            <RulesPage isDarkMode={isDarkMode} />
          </Window>
        )}

        {activeWindow === 'standings' && (
          <Window
            title="Current Standings"
            onClose={() => setActiveWindow(null)}
            icon={<Trophy className="w-4 h-4" />}
            isDarkMode={isDarkMode}
          >
            <StandingsPage teams={teams} isDarkMode={isDarkMode} />
          </Window>
        )}

        {activeWindow === 'settings' && (
          <Window
            title="Settings"
            onClose={() => setActiveWindow(null)}
            icon={<Settings className="w-4 h-4" />}
            isDarkMode={isDarkMode}
          >
            <SettingsApp
              isDarkMode={isDarkMode}
              onToggleDarkMode={handleThemeToggle}
              wallpaper={wallpaper}
              onChangeWallpaper={handleWallpaperChange}
            />
          </Window>
        )}
      </div>
      <Taskbar
        activeWindow={activeWindow}
        setActiveWindow={setActiveWindow}
        isDarkMode={isDarkMode}
        onToggleDarkMode={handleThemeToggle}
      />
    </div>
  );
}

export default App;