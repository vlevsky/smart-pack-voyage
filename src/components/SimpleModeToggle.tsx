import React from 'react';
import { motion } from 'framer-motion';
import { Zap, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SimpleModeToggleProps {
  simpleMode: boolean;
  onToggle: (enabled: boolean) => void;
}

export const SimpleModeToggle: React.FC<SimpleModeToggleProps> = ({
  simpleMode,
  onToggle,
}) => {
  if (!simpleMode) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-4 mb-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-green-800 dark:text-green-300">
              Simple Mode Active
            </h3>
            <p className="text-sm text-green-600 dark:text-green-400">
              Simplified interface with larger buttons
            </p>
          </div>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => onToggle(false)}
          className="border-green-300 text-green-700 hover:bg-green-100 dark:border-green-700 dark:text-green-300 dark:hover:bg-green-900/30"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Exit
        </Button>
      </div>
    </motion.div>
  );
};