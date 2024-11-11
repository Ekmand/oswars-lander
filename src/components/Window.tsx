import React, { useState, useRef, useEffect } from 'react';
import { X, Minus, Maximize2, Minimize2 } from 'lucide-react';

interface WindowProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  icon?: React.ReactNode;
  isDarkMode?: boolean;
}

interface Position {
  x: number;
  y: number;
}

interface Size {
  width: number;
  height: number;
}

const Window: React.FC<WindowProps> = ({ title, children, onClose, icon, isDarkMode = true }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [position, setPosition] = useState<Position>({ x: 50, y: 50 });
  const [size, setSize] = useState<Size>({ width: 800, height: 600 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState<Position>({ x: 0, y: 0 });
  const [resizeEdge, setResizeEdge] = useState<string>('');
  
  const windowRef = useRef<HTMLDivElement>(null);
  const prevSize = useRef<Size>(size);
  const prevPosition = useRef<Position>(position);

  const modeClasses = isDarkMode ? 'window-dark' : 'window-light';
  const headerClasses = isDarkMode ? 'bg-gray-800/30' : 'bg-gray-100/80';
  const textClasses = isDarkMode ? 'text-white text-shadow-sm' : 'text-gray-900';
  const buttonHoverClasses = isDarkMode ? 'hover:bg-gray-700/50' : 'hover:bg-gray-200/50';

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging && !isResizing) return;

      if (isDragging) {
        const deltaX = e.clientX - dragStart.x;
        const deltaY = e.clientY - dragStart.y;
        
        setPosition({
          x: prevPosition.current.x + deltaX,
          y: prevPosition.current.y + deltaY
        });
      }

      if (isResizing) {
        const deltaX = e.clientX - dragStart.x;
        const deltaY = e.clientY - dragStart.y;
        
        if (resizeEdge.includes('right')) {
          setSize(prev => ({ ...prev, width: Math.max(400, prevSize.current.width + deltaX) }));
        }
        if (resizeEdge.includes('bottom')) {
          setSize(prev => ({ ...prev, height: Math.max(300, prevSize.current.height + deltaY) }));
        }
        if (resizeEdge.includes('left')) {
          const newWidth = Math.max(400, prevSize.current.width - deltaX);
          setSize(prev => ({ ...prev, width: newWidth }));
          setPosition(prev => ({ ...prev, x: prevPosition.current.x + prevSize.current.width - newWidth }));
        }
        if (resizeEdge.includes('top')) {
          const newHeight = Math.max(300, prevSize.current.height - deltaY);
          setSize(prev => ({ ...prev, height: newHeight }));
          setPosition(prev => ({ ...prev, y: prevPosition.current.y + prevSize.current.height - newHeight }));
        }
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
      prevPosition.current = position;
      prevSize.current = size;
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, dragStart, position, size, resizeEdge]);

  const handleMouseDown = (e: React.MouseEvent, edge?: string) => {
    if (edge) {
      setIsResizing(true);
      setResizeEdge(edge);
    } else {
      setIsDragging(true);
    }
    setDragStart({ x: e.clientX, y: e.clientY });
    prevPosition.current = position;
    prevSize.current = size;
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      prevSize.current = size;
      prevPosition.current = position;
      setSize({ width: window.innerWidth, height: window.innerHeight });
      setPosition({ x: 0, y: 0 });
    } else {
      setSize(prevSize.current);
      setPosition(prevPosition.current);
    }
    setIsFullscreen(!isFullscreen);
  };

  const style = isFullscreen
    ? { top: 0, left: 0, width: '100vw', height: '100vh' }
    : {
        top: `${position.y}px`,
        left: `${position.x}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
      };

  return (
    <div
      ref={windowRef}
      className={`fixed ${modeClasses} rounded-lg shadow-2xl flex flex-col window-animation overflow-hidden ${
        isFullscreen ? 'rounded-none' : ''
      }`}
      style={style}
    >
      {/* Resize handles */}
      {!isFullscreen && (
        <>
          <div
            className="absolute inset-x-0 top-0 h-1 cursor-n-resize hover:bg-cyan-500/20"
            onMouseDown={(e) => handleMouseDown(e, 'top')}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-1 cursor-s-resize hover:bg-cyan-500/20"
            onMouseDown={(e) => handleMouseDown(e, 'bottom')}
          />
          <div
            className="absolute inset-y-0 left-0 w-1 cursor-w-resize hover:bg-cyan-500/20"
            onMouseDown={(e) => handleMouseDown(e, 'left')}
          />
          <div
            className="absolute inset-y-0 right-0 w-1 cursor-e-resize hover:bg-cyan-500/20"
            onMouseDown={(e) => handleMouseDown(e, 'right')}
          />
          <div
            className="absolute top-0 left-0 w-3 h-3 cursor-nw-resize hover:bg-cyan-500/20"
            onMouseDown={(e) => handleMouseDown(e, 'top left')}
          />
          <div
            className="absolute top-0 right-0 w-3 h-3 cursor-ne-resize hover:bg-cyan-500/20"
            onMouseDown={(e) => handleMouseDown(e, 'top right')}
          />
          <div
            className="absolute bottom-0 left-0 w-3 h-3 cursor-sw-resize hover:bg-cyan-500/20"
            onMouseDown={(e) => handleMouseDown(e, 'bottom left')}
          />
          <div
            className="absolute bottom-0 right-0 w-3 h-3 cursor-se-resize hover:bg-cyan-500/20"
            onMouseDown={(e) => handleMouseDown(e, 'bottom right')}
          />
        </>
      )}

      {/* Title bar */}
      <div
        className={`h-10 ${headerClasses} flex items-center px-4 gap-2 border-b ${
          isDarkMode ? 'border-white/10' : 'border-gray-200'
        } select-none`}
        onMouseDown={(e) => !isFullscreen && handleMouseDown(e)}
      >
        <div className="flex items-center gap-2 flex-1">
          {icon}
          <span className={`text-sm font-medium ${textClasses}`}>{title}</span>
        </div>
        <div className="flex items-center gap-2">
          <button className={`p-1.5 ${buttonHoverClasses} rounded-full transition-colors`}>
            <Minus className="w-4 h-4" />
          </button>
          <button
            onClick={toggleFullscreen}
            className={`p-1.5 ${buttonHoverClasses} rounded-full transition-colors`}
          >
            {isFullscreen ? (
              <Minimize2 className="w-4 h-4" />
            ) : (
              <Maximize2 className="w-4 h-4" />
            )}
          </button>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-red-500/20 hover:text-red-500 rounded-full transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto custom-scrollbar">
        {children}
      </div>
    </div>
  );
};

export default Window;