import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Luggage, Plus, Trash2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface LuggageAssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: { id: string; name: string; category: string; packed: boolean; quantity?: number } | null;
  onAssignToLuggage: (itemId: string, luggageId: string) => void;
  currentLuggage: string;
}

interface LuggagePiece {
  id: string;
  name: string;
  type: 'carry-on' | 'checked' | 'personal' | 'custom';
  color: string;
  icon: string;
  description: string;
}

const defaultLuggage: LuggagePiece[] = [
  {
    id: 'carry-on',
    name: 'Carry-on Bag',
    type: 'carry-on',
    color: 'bg-blue-500',
    icon: '🎒',
    description: 'Items you need during flight'
  },
  {
    id: 'checked',
    name: 'Checked Bag',
    type: 'checked',
    color: 'bg-green-500',
    icon: '🧳',
    description: 'Main luggage for trip'
  },
  {
    id: 'personal',
    name: 'Personal Item',
    type: 'personal',
    color: 'bg-purple-500',
    icon: '👜',
    description: 'Small bag under seat'
  },
];

export const LuggageAssignmentModal: React.FC<LuggageAssignmentModalProps> = ({
  isOpen,
  onClose,
  item,
  onAssignToLuggage,
  currentLuggage,
}) => {
  const [customLuggage, setCustomLuggage] = useState<LuggagePiece[]>([]);
  const [newLuggageName, setNewLuggageName] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const allLuggage = [...defaultLuggage, ...customLuggage];

  const handleAssign = (luggageId: string) => {
    if (item) {
      onAssignToLuggage(item.id, luggageId);
      onClose();
    }
  };

  const handleAddCustomLuggage = () => {
    if (newLuggageName.trim()) {
      const newLuggage: LuggagePiece = {
        id: Date.now().toString(),
        name: newLuggageName.trim(),
        type: 'custom',
        color: 'bg-gray-500',
        icon: '🎒',
        description: 'Custom luggage piece'
      };
      setCustomLuggage([...customLuggage, newLuggage]);
      setNewLuggageName('');
      setShowAddForm(false);
    }
  };

  const handleDeleteCustomLuggage = (id: string) => {
    setCustomLuggage(customLuggage.filter(l => l.id !== id));
  };

  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-md max-h-[80vh] overflow-hidden shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full p-2">
              <Luggage className="h-4 w-4 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                Assign to Luggage
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {item.name}
              </p>
            </div>
          </div>
          <Button variant="ghost" onClick={onClose} className="rounded-full h-8 w-8 p-0">
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <ScrollArea className="flex-1 max-h-[60vh]">
          <div className="p-6 space-y-4">
            {/* Current Assignment */}
            {currentLuggage && (
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-2 mb-2">
                  <Check className="h-4 w-4 text-blue-600" />
                  <span className="font-medium text-blue-900 dark:text-blue-100">
                    Currently assigned to
                  </span>
                </div>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  {allLuggage.find(l => l.id === currentLuggage)?.name || 'Unknown luggage'}
                </p>
              </div>
            )}

            {/* Luggage Options */}
            <div className="space-y-3">
              <h3 className="font-medium text-gray-900 dark:text-white">
                Choose luggage:
              </h3>
              
              {allLuggage.map((luggage) => (
                <motion.button
                  key={luggage.id}
                  onClick={() => handleAssign(luggage.id)}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left hover:shadow-md ${
                    currentLuggage === luggage.id
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`${luggage.color} rounded-full p-2`}>
                        <span className="text-white text-sm">{luggage.icon}</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {luggage.name}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {luggage.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {currentLuggage === luggage.id && (
                        <Check className="h-4 w-4 text-blue-600" />
                      )}
                      {luggage.type === 'custom' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteCustomLuggage(luggage.id);
                          }}
                          className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Add Custom Luggage */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              {!showAddForm ? (
                <Button
                  variant="ghost"
                  onClick={() => setShowAddForm(true)}
                  className="w-full border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 h-16 rounded-xl"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Custom Luggage
                </Button>
              ) : (
                <div className="space-y-3">
                  <Input
                    placeholder="Enter luggage name..."
                    value={newLuggageName}
                    onChange={(e) => setNewLuggageName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleAddCustomLuggage();
                      } else if (e.key === 'Escape') {
                        setShowAddForm(false);
                        setNewLuggageName('');
                      }
                    }}
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <Button
                      onClick={handleAddCustomLuggage}
                      disabled={!newLuggageName.trim()}
                      className="flex-1"
                    >
                      Add
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowAddForm(false);
                        setNewLuggageName('');
                      }}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="text-xs">
              {item.category}
            </Badge>
            <Button
              variant="ghost"
              onClick={onClose}
              className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
            >
              Cancel
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};