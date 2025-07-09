import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface SmartSuggestionsProps {
  lastAddedItem: string;
  onAddItem: (item: { name: string; category: string; quantity?: number }) => void;
  blockedItems: string[];
  onBlockItem: (item: string) => void;
}

const suggestionRules: { [key: string]: Array<{ name: string; category: string; quantity?: number }> } = {
  'suit': [
    { name: 'dress shoes', category: 'clothes' },
    { name: 'belt', category: 'clothes' },
    { name: 'lint roller', category: 'miscellaneous' },
    { name: 'tie', category: 'clothes' },
    { name: 'cufflinks', category: 'miscellaneous' },
    { name: 'dress socks', category: 'clothes', quantity: 3 },
    { name: 'pocket square', category: 'clothes' },
  ],
  'makeup': [
    { name: 'makeup remover', category: 'toiletries' },
    { name: 'compact mirror', category: 'miscellaneous' },
    { name: 'cotton pads', category: 'toiletries' },
    { name: 'makeup brushes', category: 'toiletries' },
    { name: 'setting spray', category: 'toiletries' },
    { name: 'blotting papers', category: 'toiletries' },
  ],
  'laptop': [
    { name: 'laptop charger', category: 'electronics' },
    { name: 'laptop sleeve', category: 'electronics' },
    { name: 'mouse', category: 'electronics' },
    { name: 'USB cables', category: 'electronics', quantity: 2 },
    { name: 'portable hard drive', category: 'electronics' },
    { name: 'laptop stand', category: 'electronics' },
  ],
  'phone': [
    { name: 'phone charger', category: 'electronics' },
    { name: 'portable battery', category: 'electronics' },
    { name: 'phone case', category: 'electronics' },
    { name: 'screen protector', category: 'electronics' },
    { name: 'car charger', category: 'electronics' },
    { name: 'wireless charger', category: 'electronics' },
  ],
  'camera': [
    { name: 'camera charger', category: 'electronics' },
    { name: 'memory card', category: 'electronics' },
    { name: 'camera strap', category: 'electronics' },
    { name: 'lens cleaning kit', category: 'electronics' },
    { name: 'tripod', category: 'electronics' },
    { name: 'camera bag', category: 'electronics' },
    { name: 'extra batteries', category: 'electronics', quantity: 4 },
  ],
  'swimsuit': [
    { name: 'sunscreen', category: 'toiletries' },
    { name: 'beach towel', category: 'miscellaneous' },
    { name: 'flip flops', category: 'clothes' },
    { name: 'swim goggles', category: 'miscellaneous' },
    { name: 'beach bag', category: 'miscellaneous' },
    { name: 'waterproof phone case', category: 'electronics' },
  ],
  'hiking boots': [
    { name: 'hiking socks', category: 'clothes', quantity: 4 },
    { name: 'blister patches', category: 'toiletries' },
    { name: 'water bottle', category: 'miscellaneous' },
    { name: 'hiking backpack', category: 'miscellaneous' },
    { name: 'trekking poles', category: 'miscellaneous' },
    { name: 'first aid kit', category: 'toiletries' },
    { name: 'trail snacks', category: 'miscellaneous', quantity: 5 },
  ],
  'passport': [
    { name: 'passport photos', category: 'documents', quantity: 4 },
    { name: 'travel insurance', category: 'documents' },
    { name: 'visa documents', category: 'documents' },
    { name: 'itinerary', category: 'documents' },
    { name: 'emergency contacts', category: 'documents' },
    { name: 'vaccination records', category: 'documents' },
  ],
  'sunglasses': [
    { name: 'sunglasses case', category: 'miscellaneous' },
    { name: 'lens cleaning cloth', category: 'miscellaneous' },
    { name: 'strap for sunglasses', category: 'miscellaneous' },
    { name: 'backup sunglasses', category: 'miscellaneous' },
  ],
  'dress': [
    { name: 'dress shoes', category: 'clothes' },
    { name: 'jewelry', category: 'miscellaneous' },
    { name: 'clutch bag', category: 'miscellaneous' },
    { name: 'shawl', category: 'clothes' },
    { name: 'strapless bra', category: 'clothes' },
    { name: 'shapewear', category: 'clothes' },
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
      className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3 mb-3 border border-blue-200 dark:border-blue-800"
    >
      <div className="flex items-center gap-2 mb-2">
        <Lightbulb className="h-3 w-3 text-blue-600" />
        <span className="text-xs font-medium text-blue-800 dark:text-blue-200">
          Suggested for "{lastAddedItem}":
        </span>
      </div>
      
      <div className="flex flex-wrap gap-1">
        <AnimatePresence>
          {suggestions.map((suggestion) => (
            <motion.div
              key={suggestion.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-1 bg-white dark:bg-gray-800 rounded-lg p-1.5 border border-blue-200 dark:border-blue-700"
            >
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onAddItem(suggestion)}
                className="h-auto p-1 hover:bg-blue-100 dark:hover:bg-blue-800 text-xs"
              >
                <Plus className="h-2 w-2 mr-1" />
                {suggestion.name}
                {suggestion.quantity && suggestion.quantity > 1 && (
                  <span className="ml-1 text-xs opacity-70">×{suggestion.quantity}</span>
                )}
              </Button>
              
              <div className="flex">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleDismiss(suggestion.name)}
                  className="h-5 w-5 p-0 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
                  title="Dismiss suggestion"
                >
                  <X className="h-2 w-2" />
                </Button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      <div className="mt-1 text-xs text-blue-600 dark:text-blue-300">
        💡 Smart suggestions based on what you pack
      </div>
    </motion.div>
  );
};