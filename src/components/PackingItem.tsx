
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Trash2, Edit3, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export interface PackingItemType {
  id: string;
  name: string;
  packed: boolean;
  category: string;
  quantity?: number;
  luggage?: string;
}

interface PackingItemProps {
  item: PackingItemType;
  onToggle: () => void;
  onDelete: () => void;
  onUpdate: (updates: Partial<PackingItemType>) => void;
  checklistMode?: boolean;
}

const luggageTypes = [
  { value: 'carry-on', label: 'Carry-On', color: 'bg-blue-500' },
  { value: 'checked', label: 'Checked Bag', color: 'bg-green-500' },
  { value: 'backpack', label: 'Backpack', color: 'bg-purple-500' },
  { value: 'personal', label: 'Personal Item', color: 'bg-orange-500' },
];

export const PackingItem: React.FC<PackingItemProps> = ({
  item,
  onToggle,
  onDelete,
  onUpdate,
  checklistMode = false,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(item.name);
  const [editQuantity, setEditQuantity] = useState(item.quantity?.toString() || '1');

  const handleSaveEdit = () => {
    onUpdate({
      name: editName.trim(),
      quantity: parseInt(editQuantity) || 1,
    });
    setIsEditing(false);
  };

  const handleLuggageChange = (luggage: string) => {
    onUpdate({ luggage });
  };

  const luggageType = luggageTypes.find(l => l.value === item.luggage);

  if (checklistMode) {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-200 ${
          item.packed
            ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
            : 'bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
        }`}
      >
        <Checkbox
          checked={item.packed}
          onCheckedChange={onToggle}
          className="h-6 w-6 rounded-full"
        />
        
        <div className="flex-1">
          <span
            className={`text-lg transition-all duration-200 ${
              item.packed
                ? 'text-green-700 dark:text-green-300 line-through opacity-75'
                : 'text-gray-900 dark:text-gray-100'
            }`}
          >
            {item.name}
            {item.quantity && item.quantity > 1 && (
              <span className="text-sm text-gray-500 ml-2">x{item.quantity}</span>
            )}
          </span>
        </div>

        {luggageType && (
          <Badge className={`${luggageType.color} text-white`}>
            {luggageType.label}
          </Badge>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      whileHover={{ scale: 1.01 }}
      className={`group flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
        item.packed
          ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
          : 'bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700'
      }`}
    >
      <Checkbox
        checked={item.packed}
        onCheckedChange={onToggle}
        className="rounded-full"
      />

      <div className="flex-1 min-w-0">
        {isEditing ? (
          <div className="flex gap-2">
            <Input
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="flex-1"
              onKeyPress={(e) => e.key === 'Enter' && handleSaveEdit()}
            />
            <Input
              type="number"
              value={editQuantity}
              onChange={(e) => setEditQuantity(e.target.value)}
              className="w-16"
              min="1"
            />
            <Button size="sm" onClick={handleSaveEdit}>
              <Check className="h-3 w-3" />
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <span
              className={`transition-all duration-200 ${
                item.packed
                  ? 'text-green-700 dark:text-green-300 line-through opacity-75'
                  : 'text-gray-900 dark:text-gray-100'
              }`}
            >
              {item.name}
              {item.quantity && item.quantity > 1 && (
                <span className="text-sm text-gray-500 ml-2">x{item.quantity}</span>
              )}
            </span>
            
            <div className="flex items-center gap-2">
              {luggageType && (
                <Badge className={`${luggageType.color} text-white text-xs`}>
                  {luggageType.label}
                </Badge>
              )}
              
              <Select value={item.luggage || ''} onValueChange={handleLuggageChange}>
                <SelectTrigger className="w-32 h-8 opacity-0 group-hover:opacity-100 transition-opacity">
                  <SelectValue placeholder="Luggage">
                    <Package className="h-3 w-3" />
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {luggageTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
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

      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsEditing(!isEditing)}
          className="hover:bg-blue-100 hover:text-blue-600 dark:hover:bg-blue-900/20 dark:hover:text-blue-400 rounded-full"
        >
          <Edit3 className="h-4 w-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onDelete}
          className="hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400 rounded-full"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
};
