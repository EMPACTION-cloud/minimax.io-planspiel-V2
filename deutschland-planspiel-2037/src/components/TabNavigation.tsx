import React from 'react';
import { TabType } from '../types';

interface TabNavigationProps {
  tabs: Array<{
    id: TabType;
    label: string;
    icon: string;
    available: boolean;
    badge?: string | number;
  }>;
  currentTab: string;
  onTabChange: (tab: string) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ tabs, currentTab, onTabChange }) => {
  return (
    <div className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <nav className="flex space-x-8">
          {tabs.map((tab) => {
            const isActive = tab.id === currentTab;
            const isDisabled = !tab.available;
            
            return (
              <button
                key={tab.id}
                onClick={() => tab.available && onTabChange(tab.id)}
                disabled={isDisabled}
                className={`
                  relative py-4 px-1 font-medium text-sm transition-colors
                  ${isActive 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : isDisabled 
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-700 hover:text-blue-600'
                  }
                `}
              >
                <div className="flex items-center space-x-2">
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className={`
                      inline-flex items-center justify-center px-2 py-1 text-xs font-bold rounded-full
                      ${tab.badge === '!' 
                        ? 'bg-red-100 text-red-800'
                        : 'bg-blue-100 text-blue-800'
                      }
                    `}>
                      {tab.badge}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default TabNavigation;
