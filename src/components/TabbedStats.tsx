/**
 * TabbedStats Component
 * 
 * Tabbed interface for stats on mobile
 * Desktop: Show all stats in grid
 * Mobile: Tabs to reduce information overload
 */

import { useState } from 'react';

interface Stat {
  icon: string;
  number: string;
  label: string;
  suffix?: string;
}

interface StatCategory {
  id: string;
  label: string;
  icon: string;
  stats: Stat[];
}

interface TabbedStatsProps {
  categories: StatCategory[];
}

export default function TabbedStats({ categories }: TabbedStatsProps) {
  const [activeTab, setActiveTab] = useState(categories[0]?.id || '');

  const activeCategory = categories.find(cat => cat.id === activeTab);

  return (
    <div>
      {/* Mobile: Tabbed Interface */}
      <div className="md:hidden">
        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6 overflow-x-auto scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`flex items-center gap-2 px-4 py-3 font-semibold whitespace-nowrap transition-colors ${
                activeTab === category.id
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span className="text-xl">{category.icon}</span>
              <span>{category.label}</span>
            </button>
          ))}
        </div>

        {/* Active Tab Content */}
        {activeCategory && (
          <div className="grid grid-cols-2 gap-4">
            {activeCategory.stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-4 shadow-md text-center"
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {stat.number}{stat.suffix}
                </div>
                <div className="text-xs text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Desktop: All Stats in Grid */}
      <div className="hidden md:block">
        <div className="space-y-12">
          {categories.map((category) => (
            <div key={category.id}>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">{category.icon}</span>
                <h3 className="text-2xl font-bold text-gray-900">{category.label}</h3>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {category.stats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-6 shadow-md text-center hover:shadow-xl transition-shadow"
                  >
                    <div className="text-4xl mb-3">{stat.icon}</div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                      {stat.number}{stat.suffix}
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
