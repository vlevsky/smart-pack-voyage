
import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SimpleModeToggleProps {
  simpleMode: boolean;
  onToggle: (enabled: boolean) => void;
}

export const SimpleModeToggle: React.FC<SimpleModeToggleProps> = ({
  simpleMode,
  onToggle,
}) => {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant={simpleMode ? "default" : "outline"}
        onClick={() => onToggle(!simpleMode)}
        className={`rounded-full shadow-lg hover:shadow-xl transition-all duration-200 ${
          simpleMode 
            ? 'bg-green-600 hover:bg-green-700 text-white' 
            : 'bg-white/70 dark:bg-gray-800/70 hover:bg-white dark:hover:bg-gray-800'
        }`}
      >
        <Eye className="h-4 w-4 mr-2" />
        {simpleMode ? 'Simple Mode' : 'Full Features'}
      </Button>
      
      {/* Tooltip for explanation */}
      <div className="hidden sm:block text-xs text-gray-500 dark:text-gray-400 max-w-xs">
        {simpleMode ? 'Showing simplified interface' : 'Toggle for easier navigation'}
      </div>
    </div>
  );
};
