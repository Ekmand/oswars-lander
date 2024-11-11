import React from 'react';

interface DesktopIconProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ icon, label, onClick }) => {
  return (
    <div
      className="flex flex-col items-center gap-1 p-2 rounded hover:bg-white/10 cursor-pointer transition-colors w-20"
      onClick={onClick}
    >
      <div className="p-2 rounded-lg bg-gray-800/50 backdrop-blur-sm">
        {icon}
      </div>
      <span className="text-sm text-center text-white desktop-icon-text select-none">
        {label}
      </span>
    </div>
  );
};

export default DesktopIcon;