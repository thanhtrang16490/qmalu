import React, { useState, useEffect } from 'react';

interface FABAction {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

interface FloatingActionButtonProps {
  actions?: FABAction[];
  primaryAction?: () => void;
  primaryIcon?: React.ReactNode;
}

export default function FloatingActionButton({
  actions = [],
  primaryAction,
  primaryIcon
}: FloatingActionButtonProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if viewport is mobile (< 768px)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Show FAB after scrolling 300px
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePrimaryClick = () => {
    if (actions.length > 0) {
      setIsExpanded(!isExpanded);
    } else if (primaryAction) {
      primaryAction();
    }
  };

  // Only render on mobile
  if (!isMobile || !isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-[999] flex flex-col items-end gap-3">
      {/* Expanded Menu */}
      {isExpanded && actions.length > 0 && (
        <div className="flex flex-col gap-3 animate-[fabMenuEnter_0.3s_ease-out]">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={() => {
                action.onClick();
                setIsExpanded(false);
              }}
              className="flex items-center gap-3 bg-white rounded-full shadow-lg px-5 py-3 hover:shadow-xl transition-all duration-200 hover:-translate-x-1 focus:outline-none focus:ring-4 focus:ring-primary-600/30"
            >
              <span className="text-gray-700 font-medium whitespace-nowrap">
                {action.label}
              </span>
              <span className="text-primary-600">{action.icon}</span>
            </button>
          ))}
        </div>
      )}

      {/* Primary FAB Button */}
      <button
        onClick={handlePrimaryClick}
        className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-600 to-green-500 text-white shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-primary-600/30"
        style={{
          animation: 'fabEnter 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
        }}
        aria-label={isExpanded ? 'Close menu' : 'Open menu'}
      >
        {isExpanded ? (
          // Close icon
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : primaryIcon ? (
          primaryIcon
        ) : (
          // Default plus icon
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        )}
      </button>

      <style>{`
        @keyframes fabEnter {
          from {
            transform: scale(0) rotate(-180deg);
            opacity: 0;
          }
          to {
            transform: scale(1) rotate(0);
            opacity: 1;
          }
        }

        @keyframes fabMenuEnter {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
