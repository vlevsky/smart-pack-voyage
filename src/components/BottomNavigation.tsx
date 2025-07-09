import React from 'react';
import { Map, Bot, Settings, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BottomNavigationProps {
  activeTab: 'trips' | 'ai' | 'settings' | 'pro';
  onTabChange: (tab: 'trips' | 'ai' | 'settings' | 'pro') => void;
  hasSubscription: boolean;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeTab,
  onTabChange,
  hasSubscription,
}) => {
  const tabs = [
    {
      id: 'trips' as const,
      icon: Map,
      label: 'Trips',
    },
    {
      id: 'ai' as const,
      icon: Bot,
      label: 'AI Assistant',
    },
    {
      id: 'settings' as const,
      icon: Settings,
      label: 'Settings',
    },
    {
      id: 'pro' as const,
      icon: Crown,
      label: hasSubscription ? 'Pro' : 'Upgrade',
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-4 py-2 z-50">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <Button
              key={tab.id}
              variant="ghost"
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center gap-1 h-auto py-2 px-3 rounded-lg ${
                isActive 
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' 
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? 'text-blue-600 dark:text-blue-400' : ''}`} />
              <span className={`text-xs font-medium ${isActive ? 'text-blue-600 dark:text-blue-400' : ''}`}>
                {tab.label}
              </span>
              {tab.id === 'pro' && !hasSubscription && (
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
              )}
            </Button>
          );
        })}
      </div>
    </div>
  );
};