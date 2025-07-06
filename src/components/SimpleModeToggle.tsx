
import React from 'react';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';

interface SimpleModeToggleProps {
  simpleMode: boolean;
  onToggle: (enabled: boolean) => void;
  large?: boolean;
}

export const SimpleModeToggle: React.FC<SimpleModeToggleProps> = ({ 
  simpleMode, 
  onToggle,
  large = false 
}) => {
  return (
    <Button
      variant="outline"
      onClick={() => onToggle(!simpleMode)}
      className={`w-full justify-start ${large ? 'text-lg py-3' : ''}`}
    >
      {simpleMode ? (
        <EyeOff className={`${large ? 'h-6 w-6' : 'h-4 w-4'} mr-2`} />
      ) : (
        <Eye className={`${large ? 'h-6 w-6' : 'h-4 w-4'} mr-2`} />
      )}
      Simple Mode {simpleMode ? 'On' : 'Off'}
    </Button>
  );
};
