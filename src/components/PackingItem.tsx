
import React from 'react';
import { motion } from 'framer-motion';
import { Check, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

interface PackingItemType {
  id: string;
  name: string;
  packed: boolean;
  category: string;
}

interface PackingItemProps {
  item: PackingItemType;
  onToggle: () => void;
  onDelete: () => void;
}

export const PackingItem: React.FC<PackingItemProps> = ({
  item,
  onToggle,
  onDelete,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      whileHover={{ scale: 1.01 }}
      className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
        item.packed
          ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
          : 'bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700'
      }`}
    >
      <div className="flex items-center gap-3 flex-1">
        <Checkbox
          checked={item.packed}
          onCheckedChange={onToggle}
          className="rounded-full"
        />
        
        <span
          className={`flex-1 transition-all duration-200 ${
            item.packed
              ? 'text-green-700 dark:text-green-300 line-through opacity-75'
              : 'text-gray-900 dark:text-gray-100'
          }`}
        >
          {item.name}
        </span>
      </div>

      {item.packed && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
        >
          <Check className="h-3 w-3 text-white" />
        </motion.div>
      )}

      <Button
        variant="ghost"
        size="sm"
        onClick={onDelete}
        className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400 rounded-full"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </motion.div>
  );
};
