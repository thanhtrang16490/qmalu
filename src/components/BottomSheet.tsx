import React, { useEffect, useState, useRef, type ReactNode } from 'react';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  snapPoints?: number[]; // [0.5, 1] for half and full height
}

export default function BottomSheet({ 
  isOpen, 
  onClose, 
  children, 
  snapPoints = [0.5, 1] 
}: BottomSheetProps) {
  const [currentSnap, setCurrentSnap] = useState(0);
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);
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

  // Prevent body scroll when sheet is open
  useEffect(() => {
    if (isOpen && isMobile) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [isOpen, isMobile]);

  const handleDragStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartY(e.touches[0].clientY);
    setCurrentY(e.touches[0].clientY);
  };

  const handleDragMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    setCurrentY(e.touches[0].clientY);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const deltaY = currentY - startY;
    const threshold = 100;

    if (deltaY > threshold) {
      // Swipe down - dismiss or snap to lower point
      if (currentSnap === 0) {
        onClose();
      } else {
        setCurrentSnap(currentSnap - 1);
      }
    } else if (deltaY < -threshold && currentSnap < snapPoints.length - 1) {
      // Swipe up - snap to higher point
      setCurrentSnap(currentSnap + 1);
    }
  };

  // Only render as bottom sheet on mobile
  if (!isMobile) {
    return null;
  }

  if (!isOpen) {
    return null;
  }

  return (
    <>
      {/* Backdrop overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-[999] animate-[fadeIn_0.3s_ease-out]"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Bottom sheet */}
      <div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[24px] z-[1000] transition-[height] duration-300 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]"
        style={{
          height: `${snapPoints[currentSnap] * 100}vh`,
          animation: 'slideUpSheet 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        }}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
      >
        {/* Drag handle */}
        <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto my-3" />
        
        {/* Content */}
        <div className="overflow-y-auto h-[calc(100%-28px)] px-6 pb-6">
          {children}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUpSheet {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
