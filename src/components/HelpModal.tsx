
import React from 'react';
import { motion } from 'framer-motion';
import { X, Plus, List, Luggage, GamepadIcon, Settings, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const helpSections = [
  {
    icon: Plus,
    title: 'Adding Items',
    content: [
      'Tap the "+" button to add new items manually',
      'Choose a category for better organization',
      'Set quantities for items you need multiples of',
      'Items are automatically saved as you type'
    ]
  },
  {
    icon: Sparkles,
    title: 'Smart Packing Lists',
    content: [
      'Tap "Smart Lists" to browse curated packing lists',
      'Choose your trip length and packing style',
      'Preview items before adding them to your trip',
      'Lists automatically adjust quantities based on your preferences'
    ]
  },
  {
    icon: Luggage,
    title: 'Luggage Assignment',
    content: [
      'Assign items to different luggage pieces',
      'Track carry-on vs checked bag items',
      'Use drag & drop mode for easy organization',
      'View airline baggage rules for size limits'
    ]
  },
  {
    icon: GamepadIcon,
    title: 'Game Mode',
    content: [
      'Turn packing into a fun game with XP and levels',
      'Earn achievements for packing milestones',
      'Track your packing streak and progress',
      'Perfect for making packing enjoyable for families'
    ]
  },
  {
    icon: Settings,
    title: 'Settings & Accessibility',
    content: [
      'Enable Simple Mode for a cleaner interface',
      'Turn on High Contrast for better visibility',
      'Adjust text size and reduce motion if needed',
      'All settings are saved automatically'
    ]
  }
];

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-lg max-h-[95vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full p-2">
              <List className="h-4 w-4 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold">How to Use This App</h2>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Step-by-step guide
              </p>
            </div>
          </div>
          <Button variant="ghost" onClick={onClose} className="rounded-full h-8 w-8 p-0">
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <ScrollArea className="flex-1 px-4">
          <div className="py-4 space-y-6">
            {helpSections.map((section, index) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-blue-500 rounded-full p-2">
                      <Icon className="h-4 w-4 text-white" />
                    </div>
                    <h3 className="font-semibold">{section.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {section.content.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 shrink-0">
          <Button onClick={onClose} className="w-full">
            Got it, thanks!
          </Button>
        </div>
      </motion.div>
    </div>
  );
};
