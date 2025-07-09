import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Package, Plane, Backpack, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PackingItemType } from '@/components/PackingItem';

interface AssignLuggageModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: PackingItemType | null;
  onAssign: (itemId: string, luggage: string) => void;
}

const luggageOptions = [
  { 
    value: 'carry-on', 
    label: 'Carry-On', 
    icon: Plane, 
    color: 'bg-blue-500',
    description: 'Keep with you on the plane'
  },
  { 
    value: 'checked', 
    label: 'Checked Bag', 
    icon: Package, 
    color: 'bg-green-500',
    description: 'Goes in checked luggage'
  },
  { 
    value: 'backpack', 
    label: 'Backpack', 
    icon: Backpack, 
    color: 'bg-purple-500',
    description: 'In your travel backpack'
  },
  { 
    value: 'personal', 
    label: 'Personal Item', 
    icon: Briefcase, 
    color: 'bg-orange-500',
    description: 'Small bag under the seat'
  },
];

export const AssignLuggageModal: React.FC<AssignLuggageModalProps> = ({
  isOpen,
  onClose,
  item,
  onAssign,
}) => {
  if (!isOpen || !item) return null;

  const handleAssign = (luggageType: string) => {
    onAssign(item.id, luggageType);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-md w-full shadow-2xl"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Assign to Luggage
          </h3>
          <Button variant="ghost" size="sm" onClick={onClose} className="rounded-full h-8 w-8 p-0">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="font-medium text-gray-900 dark:text-white">{item.name}</div>
          <Badge variant="outline" className="mt-1 text-xs">
            {item.category}
          </Badge>
        </div>

        <div className="space-y-3">
          {luggageOptions.map((luggage) => {
            const Icon = luggage.icon;
            return (
              <motion.button
                key={luggage.value}
                onClick={() => handleAssign(luggage.value)}
                className="w-full p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 text-left"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg ${luggage.color} flex items-center justify-center text-white`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {luggage.label}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      {luggage.description}
                    </div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <Button 
            variant="outline" 
            onClick={() => handleAssign('')}
            className="w-full"
          >
            Remove from Luggage
          </Button>
        </div>
      </motion.div>
    </div>
  );
};