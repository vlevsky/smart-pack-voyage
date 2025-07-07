import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface SmartSuggestionsProps {
  lastAddedItem: string;
  onAddItem: (item: { name: string; category: string }) => void;
  blockedItems: string[];
  onBlockItem: (item: string) => void;
}

const suggestionRules: { [key: string]: Array<{ name: string; category: string }> } = {
  'suit': [
    { name: 'dress shoes', category: 'clothes' },
    { name: 'belt', category: 'clothes' },
    { name: 'lint roller', category: 'miscellaneous' },
    { name: 'tie', category: 'clothes' },
  ],
  'makeup': [
    { name: 'makeup remover', category: 'toiletries' },
    { name: 'compact mirror', category: 'miscellaneous' },
    { name: 'cotton pads', category: 'toiletries' },
  ],
  'laptop': [
    { name: 'laptop charger', category: 'electronics' },
    { name: 'laptop sleeve', category: 'electronics' },
    { name: 'mouse', category: 'electronics' },
  ],
  'phone': [
    { name: 'phone charger', category: 'electronics' },
    { name: 'portable battery', category: 'electronics' },
    { name: 'phone case', category: 'electronics' },
  ],
  'camera': [
    { name: 'camera charger', category: 'electronics' },
    { name: 'memory card', category: 'electronics' },
    { name: 'camera strap', category: 'electronics' },
  ],
  'swimsuit': [
    { name: 'sunscreen', category: 'toiletries' },
    { name: 'beach towel', category: 'miscellaneous' },
    { name: 'flip flops', category: 'clothes' },
  ],
  'hiking boots': [
    { name: 'hiking socks', category: 'clothes' },
    { name: 'blister patches', category: 'toiletries' },
    { name: 'water bottle', category: 'miscellaneous' },
  ],
};

export const SmartSuggestions: React.FC<SmartSuggestionsProps> = ({
  lastAddedItem,
  onAddItem,
  blockedItems,
  onBlockItem,
}) => {
  const [dismissedSuggestions, setDismissedSuggestions] = useState<string[]>([]);

  const getSuggestions = () => {
    if (!lastAddedItem) return [];
    
    const itemKey = lastAddedItem.toLowerCase();
    let suggestions = [];
    
    // Find direct matches
    if (suggestionRules[itemKey]) {
      suggestions = suggestionRules[itemKey];
    } else {
      // Find partial matches
      const matchedKey = Object.keys(suggestionRules).find(key => 
        itemKey.includes(key) || key.includes(itemKey)
      );
      if (matchedKey) {
        suggestions = suggestionRules[matchedKey];
      }
    }
    
    // Filter out blocked and dismissed items
    return suggestions.filter(suggestion => 
      !blockedItems.includes(suggestion.name) && 
      !dismissedSuggestions.includes(suggestion.name)
    );
  };

  const suggestions = getSuggestions();

  const handleDismiss = (itemName: string) => {
    setDismissedSuggestions(prev => [...prev, itemName]);
  };

  const handleBlock = (itemName: string) => {
    onBlockItem(itemName);
    setDismissedSuggestions(prev => [...prev, itemName]);
  };

  if (suggestions.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 mb-4 border border-blue-200 dark:border-blue-800"
    >
      <div className="flex items-center gap-2 mb-3">
        <Lightbulb className="h-4 w-4 text-blue-600" />
        <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
          Suggested items for "{lastAddedItem}":
        </span>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <AnimatePresence>
          {suggestions.map((suggestion) => (
            <motion.div
              key={suggestion.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-1 bg-white dark:bg-gray-800 rounded-lg p-2 border border-blue-200 dark:border-blue-700"
            >
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onAddItem(suggestion)}
                className="h-auto p-1 hover:bg-blue-100 dark:hover:bg-blue-800"
              >
                <Plus className="h-3 w-3 mr-1" />
                {suggestion.name}
              </Button>
              
              <Badge variant="secondary" className="text-xs">
                {suggestion.category}
              </Badge>
              
              <div className="flex">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleDismiss(suggestion.name)}
                  className="h-6 w-6 p-0 hover:bg-gray-200 dark:hover:bg-gray-700"
                  title="Dismiss suggestion"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      <div className="mt-2 text-xs text-blue-600 dark:text-blue-300">
        💡 Tip: You can block items from appearing again in settings
      </div>
    </motion.div>
  );
};