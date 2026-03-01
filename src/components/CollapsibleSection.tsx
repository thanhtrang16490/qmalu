/**
 * CollapsibleSection Component
 * 
 * Collapsible/expandable section for mobile content optimization
 * Desktop: Always expanded
 * Mobile: Collapsible with smooth animation
 */

import { useState } from 'react';

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  icon?: React.ReactNode;
  mobileOnly?: boolean;
}

export default function CollapsibleSection({
  title,
  children,
  defaultOpen = false,
  icon,
  mobileOnly = true
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`${mobileOnly ? 'md:block' : ''}`}>
      {/* Mobile: Collapsible */}
      <div className={mobileOnly ? 'md:hidden' : ''}>
        <button
          onClick={toggleOpen}
          className="w-full flex items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
          aria-expanded={isOpen}
          aria-controls={`collapsible-${title.replace(/\s+/g, '-').toLowerCase()}`}
        >
          <div className="flex items-center gap-3">
            {icon && <span className="text-2xl">{icon}</span>}
            <span className="font-bold text-lg text-gray-900">{title}</span>
          </div>
          <svg
            className={`w-6 h-6 text-gray-600 transition-transform duration-300 ${
              isOpen ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        <div
          id={`collapsible-${title.replace(/\s+/g, '-').toLowerCase()}`}
          className={`overflow-hidden transition-all duration-300 ${
            isOpen ? 'max-h-[2000px] opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          {children}
        </div>
      </div>

      {/* Desktop: Always expanded */}
      {mobileOnly && (
        <div className="hidden md:block">
          <div className="mb-4">
            <div className="flex items-center gap-3 mb-4">
              {icon && <span className="text-2xl">{icon}</span>}
              <h3 className="font-bold text-2xl text-gray-900">{title}</h3>
            </div>
          </div>
          {children}
        </div>
      )}
    </div>
  );
}
