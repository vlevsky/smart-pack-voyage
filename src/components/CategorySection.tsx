
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PackingItem } from '@/components/PackingItem';

interface PackingItemType {
  id: string;
  name: string;
  packed: boolean;
  category: string;
}

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
  onDeleteItem: (id: string) => void;
  showCompleted: boolean;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  category,
  items,
  onAddItem,
  onToggleItem,
  onDeleteItem,
  showCompleted,
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/20 overflow-hidden"
    >
      {/* Category Header */}
      <div
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-white/50 dark:hover:bg-gray-700/50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl ${category.color} flex items-center justify-center text-white shadow-lg`}>
            <span className="text-lg">{category.icon}</span>
          </div>
          <div>
            <h3 className="font-semibold text-lg">{category.name}</h3>
            <p className="text-sm text-muted-foreground">
              {packedCount}/{totalCount} packed
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              setIsAddingItem(!isAddingItem);
            }}
            className="rounded-full"
          >
            <Plus className="h-4 w-4" />
          </Button>
          <motion.div
            animate={{ rotate: isExpanded ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </motion.div>
        </div>
      </div>

      {/* Add Item Form */}
      <AnimatePresence>
        {isAddingItem && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="px-4 pb-4"
          >
            <div className="flex gap-2">
              <Input
                placeholder={`Add ${category.name.toLowerCase()} item...`}
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddItem()}
                className="flex-1"
                autoFocus
              />
              <Button onClick={handleAddItem} disabled={!newItemName.trim()}>
                Add
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Items List */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="pb-4"
          >
            <div className="space-y-2 px-4">
              <AnimatePresence>
                {items.map((item) => (
                  <PackingItem
                    key={item.id}
                    item={item}
                    onToggle={() => onToggleItem(item.id)}
                    onDelete={() => onDeleteItem(item.id)}
                  />
                ))}
              </AnimatePresence>
              
              {items.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-8 text-muted-foreground"
                >
                  <p>No items in this category yet</p>
                  <p className="text-sm">Click the + button to add items</p>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
