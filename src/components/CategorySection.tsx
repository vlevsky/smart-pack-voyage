
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PackingItem, PackingItemType } from '@/components/PackingItem';

interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

interface CategorySectionProps {
  category: Category;
  items: PackingItemType[];
  onAddItem: (name: string) => void;
  onToggleItem: (id: string) => void;
  onUpdateItem: (id: string, updates: Partial<PackingItemType>) => void;
  onDeleteItem: (id: string) => void;
  showCompleted: boolean;
  checklistMode?: boolean;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  category,
  items,
  onAddItem,
  onToggleItem,
  onUpdateItem,
  onDeleteItem,
  showCompleted,
  checklistMode = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [newItemName, setNewItemName] = useState('');
  const [isAddingItem, setIsAddingItem] = useState(false);

  const handleAddItem = () => {
    if (newItemName.trim()) {
      onAddItem(newItemName.trim());
      setNewItemName('');
      setIsAddingItem(false);
    }
  };

  const packedCount = items.filter(item => item.packed).length;
  const totalCount = items.length;
  const totalQuantity = items.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const packedQuantity = items.filter(item => item.packed).reduce((sum, item) => sum + (item.quantity || 1), 0);

  if (checklistMode && (!showCompleted && packedCount === totalCount && totalCount > 0)) {
    return null;
  }

  const progressPercentage = totalCount > 0 ? (packedCount / totalCount) * 100 : 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/30 dark:border-gray-700/30 overflow-hidden hover:shadow-2xl transition-all duration-300"
    >
      {/* Enhanced Category Header */}
      <div
        className="flex items-center justify-between p-6 cursor-pointer hover:bg-white/60 dark:hover:bg-gray-700/50 transition-all duration-200"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-4">
          <div className={`w-14 h-14 rounded-2xl ${category.color} flex items-center justify-center text-white shadow-xl`}>
            <span className="text-2xl">{category.icon}</span>
          </div>
          <div>
            <h3 className="font-bold text-xl text-gray-900 dark:text-white">{category.name}</h3>
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
              <span>
                {packedCount}/{totalCount} items
              </span>
              <span>
                ({packedQuantity}/{totalQuantity} pieces)
              </span>
              {totalCount > 0 && (
                <div className="flex items-center gap-2">
                  <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full ${category.color} rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercentage}%` }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                  </div>
                  <span className="font-semibold">{Math.round(progressPercentage)}%</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              setIsAddingItem(!isAddingItem);
            }}
            className="rounded-full h-10 w-10 p-0 bg-white/50 dark:bg-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Plus className="h-4 w-4" />
          </Button>
          <motion.div
            animate={{ rotate: isExpanded ? 90 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="text-gray-400"
          >
            <ChevronRight className="h-6 w-6" />
          </motion.div>
        </div>
      </div>

      {/* Enhanced Add Item Form */}
      <AnimatePresence>
        {isAddingItem && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="px-6 pb-4"
          >
            <div className="flex gap-3 bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-4">
              <Input
                placeholder={`Add ${category.name.toLowerCase()} item...`}
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddItem()}
                className="flex-1 rounded-xl border-0 bg-white dark:bg-gray-800 shadow-sm"
                autoFocus
              />
              <Button 
                onClick={handleAddItem} 
                disabled={!newItemName.trim()}
                className="rounded-xl px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
              >
                Add
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Items List */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="pb-6"
          >
            <div className="space-y-3 px-6">
              <AnimatePresence mode="popLayout">
                {items.map((item) => (
                  <PackingItem
                    key={item.id}
                    item={item}
                    onToggle={() => onToggleItem(item.id)}
                    onUpdate={(updates) => onUpdateItem(item.id, updates)}
                    onDelete={() => onDeleteItem(item.id)}
                    checklistMode={checklistMode}
                  />
                ))}
              </AnimatePresence>
              
              {items.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 bg-gray-50 dark:bg-gray-700/30 rounded-2xl"
                >
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <p className="text-gray-600 dark:text-gray-300 font-medium mb-2">
                    No items in {category.name.toLowerCase()} yet
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Click the + button to add items
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
