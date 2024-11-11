import React, { useState } from 'react';
import { 
  Palette, 
  Monitor, 
  Volume2, 
  Wifi, 
  Battery, 
  Bell, 
  Lock,
  Info,
  Languages,
  Clock,
  Search,
  Image,
  ChevronLeft
} from 'lucide-react';

interface SettingsAppProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  wallpaper: string;
  onChangeWallpaper: (wallpaper: string) => void;
}

const SettingsApp: React.FC<SettingsAppProps> = ({
  isDarkMode,
  onToggleDarkMode,
  wallpaper,
  onChangeWallpaper
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('personalization');
  const [searchQuery, setSearchQuery] = useState('');
  const [volume, setVolume] = useState(75);
  const [brightness, setBrightness] = useState(100);
  const [notifications, setNotifications] = useState(true);
  const [nightLight, setNightLight] = useState(false);

  const wallpapers = [
    { id: 'space', name: 'Space', preview: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?auto=format&fit=crop&w=200&q=80' },
    { id: 'mountains', name: 'Mountains', preview: isDarkMode 
      ? 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=200&q=80'
      : 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=200&q=80' },
    { id: 'ocean', name: 'Ocean', preview: isDarkMode
      ? 'https://images.unsplash.com/photo-1478359844494-1092259d93e4?auto=format&fit=crop&w=200&q=80'
      : 'https://images.unsplash.com/photo-1505144808419-1957a94ca61e?auto=format&fit=crop&w=200&q=80' },
    { id: 'forest', name: 'Forest', preview: isDarkMode
      ? 'https://images.unsplash.com/photo-1516214104703-d870798883c5?auto=format&fit=crop&w=200&q=80'
      : 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=200&q=80' },
  ];

  const categories = [
    { 
      id: 'personalization',
      name: 'Personalization',
      icon: <Palette className="w-6 h-6" />,
      description: 'Background, colors, themes'
    },
    {
      id: 'display',
      name: 'Display',
      icon: <Monitor className="w-6 h-6" />,
      description: 'Brightness, night light, resolution'
    },
    {
      id: 'sound',
      name: 'Sound',
      icon: <Volume2 className="w-6 h-6" />,
      description: 'Volume levels, sound devices'
    },
    {
      id: 'network',
      name: 'Network & Internet',
      icon: <Wifi className="w-6 h-6" />,
      description: 'Wi-Fi, airplane mode, VPN'
    },
    {
      id: 'battery',
      name: 'Battery',
      icon: <Battery className="w-6 h-6" />,
      description: 'Power usage, battery saver'
    },
    {
      id: 'notifications',
      name: 'Notifications',
      icon: <Bell className="w-6 h-6" />,
      description: 'App notifications, do not disturb'
    },
    {
      id: 'privacy',
      name: 'Privacy & Security',
      icon: <Lock className="w-6 h-6" />,
      description: 'Permissions, security settings'
    },
    {
      id: 'language',
      name: 'Time & Language',
      icon: <Languages className="w-6 h-6" />,
      description: 'Region, date, keyboard'
    },
    {
      id: 'about',
      name: 'System',
      icon: <Info className="w-6 h-6" />,
      description: 'System info, specifications'
    }
  ];

  const textClasses = isDarkMode ? 'text-gray-300' : 'text-gray-600';
  const hoverClasses = isDarkMode ? 'hover:bg-white/10' : 'hover:bg-gray-100';
  const borderClasses = isDarkMode ? 'border-white/10' : 'border-gray-200';
  const inputBgClasses = isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100/50';
  const sliderBgClasses = isDarkMode ? 'bg-gray-700' : 'bg-gray-200';
  const sliderFillClasses = isDarkMode ? 'bg-cyan-500' : 'bg-cyan-600';

  const filteredCategories = categories.filter(
    category => 
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderContent = () => {
    switch (activeCategory) {
      case 'personalization':
        return (
          <div className="space-y-6">
            {/* Wallpaper settings */}
            <div className={`p-6 rounded-lg border ${borderClasses} ${isDarkMode ? 'bg-gray-800/30' : 'bg-gray-50'}`}>
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-200/50'}`}>
                  <Image className="w-5 h-5 text-cyan-400" />
                </div>
                <h2 className="text-xl font-semibold">Wallpaper</h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {wallpapers.map((wp) => (
                  <button
                    key={wp.id}
                    onClick={() => onChangeWallpaper(wp.id)}
                    className={`relative rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      wallpaper === wp.id
                        ? 'border-cyan-500 ring-2 ring-cyan-500/50'
                        : `border-transparent ${hoverClasses}`
                    }`}
                  >
                    <img
                      src={wp.preview}
                      alt={wp.name}
                      className="w-full h-32 object-cover"
                    />
                    <div className={`absolute bottom-0 inset-x-0 p-2 ${isDarkMode ? 'bg-gray-900/80' : 'bg-white/80'} backdrop-blur-sm`}>
                      <span className="text-sm font-medium">{wp.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Theme settings */}
            <div className={`p-6 rounded-lg border ${borderClasses} ${isDarkMode ? 'bg-gray-800/30' : 'bg-gray-50'}`}>
              <h2 className="text-xl font-semibold mb-4">Theme</h2>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {isDarkMode ? (
                    <div className="p-2 rounded-lg bg-blue-500/20">
                      <Monitor className="w-5 h-5 text-blue-400" />
                    </div>
                  ) : (
                    <div className="p-2 rounded-lg bg-yellow-500/20">
                      <Monitor className="w-5 h-5 text-yellow-400" />
                    </div>
                  )}
                  <div>
                    <div className="font-medium">Appearance</div>
                    <div className={`text-sm ${textClasses}`}>
                      {isDarkMode ? 'Dark mode' : 'Light mode'}
                    </div>
                  </div>
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
        );

      case 'display':
        return (
          <div className="space-y-6">
            <div className={`p-6 rounded-lg border ${borderClasses} ${isDarkMode ? 'bg-gray-800/30' : 'bg-gray-50'}`}>
              <h2 className="text-xl font-semibold mb-6">Display Settings</h2>
              
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span>Brightness</span>
                    <span>{brightness}%</span>
                  </div>
                  <div className={`h-2 rounded-full ${sliderBgClasses} relative`}>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={brightness}
                      onChange={(e) => setBrightness(Number(e.target.value))}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div
                      className={`absolute h-full rounded-full ${sliderFillClasses}`}
                      style={{ width: `${brightness}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-200/50'}`}>
                      <Monitor className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <div className="font-medium">Night Light</div>
                      <div className={`text-sm ${textClasses}`}>Reduce blue light</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setNightLight(!nightLight)}
                    className={`w-11 h-6 rounded-full transition-colors duration-200 ${
                      nightLight ? 'bg-cyan-500' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white transform transition-transform duration-200 ${
                        nightLight ? 'translate-x-6' : 'translate-x-0.5'
                      } shadow-md`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'sound':
        return (
          <div className="space-y-6">
            <div className={`p-6 rounded-lg border ${borderClasses} ${isDarkMode ? 'bg-gray-800/30' : 'bg-gray-50'}`}>
              <h2 className="text-xl font-semibold mb-6">Sound Settings</h2>
              
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span>Master Volume</span>
                    <span>{volume}%</span>
                  </div>
                  <div className={`h-2 rounded-full ${sliderBgClasses} relative`}>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={volume}
                      onChange={(e) => setVolume(Number(e.target.value))}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div
                      className={`absolute h-full rounded-full ${sliderFillClasses}`}
                      style={{ width: `${volume}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <div className={`p-6 rounded-lg border ${borderClasses} ${isDarkMode ? 'bg-gray-800/30' : 'bg-gray-50'}`}>
              <h2 className="text-xl font-semibold mb-6">Notification Settings</h2>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-200/50'}`}>
                    <Bell className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <div className="font-medium">Notifications</div>
                    <div className={`text-sm ${textClasses}`}>Show notifications</div>
                  </div>
                </div>
                <button
                  onClick={() => setNotifications(!notifications)}
                  className={`w-11 h-6 rounded-full transition-colors duration-200 ${
                    notifications ? 'bg-cyan-500' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white transform transition-transform duration-200 ${
                      notifications ? 'translate-x-6' : 'translate-x-0.5'
                    } shadow-md`}
                  />
                </button>
              </div>
            </div>
          </div>
        );

      case 'about':
        return (
          <div className="space-y-6">
            <div className={`p-6 rounded-lg border ${borderClasses} ${isDarkMode ? 'bg-gray-800/30' : 'bg-gray-50'}`}>
              <h2 className="text-xl font-semibold mb-6">System Information</h2>
              <div className="space-y-4">
                <div>
                  <div className={`text-sm ${textClasses}`}>Device name</div>
                  <div className="font-medium">OS-WARS-PC</div>
                </div>
                <div>
                  <div className={`text-sm ${textClasses}`}>OS Version</div>
                  <div className="font-medium">OS Wars 2024</div>
                </div>
                <div>
                  <div className={`text-sm ${textClasses}`}>System type</div>
                  <div className="font-medium">64-bit operating system</div>
                </div>
                <div>
                  <div className={`text-sm ${textClasses}`}>Processor</div>
                  <div className="font-medium">WebContainer CPU @ 3.2 GHz</div>
                </div>
                <div>
                  <div className={`text-sm ${textClasses}`}>Memory</div>
                  <div className="font-medium">16 GB RAM</div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className={`p-6 rounded-lg border ${borderClasses} ${isDarkMode ? 'bg-gray-800/30' : 'bg-gray-50'}`}>
            <h2 className="text-xl font-semibold mb-4">
              {categories.find(c => c.id === activeCategory)?.name}
            </h2>
            <p className={textClasses}>This settings page is under construction.</p>
          </div>
        );
    }
  };

  return (
    <div className="h-full flex">
      {/* Sidebar */}
      <div className={`w-80 border-r ${borderClasses} p-4`}>
        <div className="relative mb-4">
          <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${textClasses}`} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Find a setting"
            className={`w-full pl-10 pr-4 py-2 ${inputBgClasses} rounded-lg border ${borderClasses} focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-colors`}
          />
        </div>
        <div className="space-y-1">
          {filteredCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 text-left ${
                activeCategory === category.id
                  ? isDarkMode
                    ? 'bg-white/10 text-white'
                    : 'bg-gray-100 text-black'
                  : hoverClasses
              }`}
            >
              <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-200/50'}`}>
                {category.icon}
              </div>
              <div>
                <div className="font-medium">{category.name}</div>
                <div className={`text-sm ${textClasses}`}>{category.description}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-8 overflow-auto">
        <div className="max-w-2xl">
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => setActiveCategory('personalization')}
              className={`p-2 rounded-lg ${hoverClasses} transition-colors`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h1 className="text-3xl font-bold">
              {categories.find(c => c.id === activeCategory)?.name}
            </h1>
          </div>

          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default SettingsApp;