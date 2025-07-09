import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Lock, Star, Crown } from 'lucide-react';

interface GameModeSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: () => void;
}

export function GameModeSubscriptionModal({ isOpen, onClose, onUpgrade }: GameModeSubscriptionModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg">
            <Lock className="h-5 w-5 text-amber-500" />
            Game Mode Locked
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="text-center py-6">
            <div className="text-6xl mb-4">🎮</div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Game Mode is available with Silver subscription or higher
            </p>
          </div>

          <div className="space-y-3">
            <div className="border rounded-lg p-3 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <Star className="h-4 w-4 text-amber-500" />
                <span className="font-medium text-sm">Silver Plan</span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Includes Game Mode, Smart Lists, Templates, and more!
              </p>
            </div>

            <div className="border rounded-lg p-3 bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20">
              <div className="flex items-center gap-2 mb-2">
                <Crown className="h-4 w-4 text-amber-600" />
                <span className="font-medium text-sm">Gold & Exclusive</span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                All features including AI Assistant and advanced tools
              </p>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1 text-sm">
              Maybe Later
            </Button>
            <Button onClick={onUpgrade} className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-sm">
              Upgrade Now
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}