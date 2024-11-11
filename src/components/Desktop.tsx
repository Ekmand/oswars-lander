import React from 'react';
import { Terminal, Users, Trophy, FileText, Power, Settings } from 'lucide-react';
import DesktopIcon from './DesktopIcon';

interface DesktopProps {
  setActiveWindow: (window: string) => void;
}

const Desktop: React.FC<DesktopProps> = ({ setActiveWindow }) => {
  const icons = [
    { id: 'welcome', label: 'Welcome', icon: <Power className="w-6 h-6" /> },
    { id: 'teams', label: 'Teams', icon: <Users className="w-6 h-6" /> },
    { id: 'rules', label: 'Rules', icon: <FileText className="w-6 h-6" /> },
    { id: 'standings', label: 'Standings', icon: <Trophy className="w-6 h-6" /> },
    { id: 'terminal', label: 'Terminal', icon: <Terminal className="w-6 h-6" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-6 h-6" /> },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 p-4 desktop-icons">
      {icons.map((icon) => (
        <DesktopIcon
          key={icon.id}
          icon={icon.icon}
          label={icon.label}
          onClick={() => setActiveWindow(icon.id)}
        />
      ))}
    </div>
  );
};

export default Desktop;