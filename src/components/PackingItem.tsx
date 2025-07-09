
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Trash2, Edit3, Package, Plus, Minus } from 'lucide-react';
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
  textSize?: 'small' | 'normal' | 'large';
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
  textSize = 'normal',
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(item.name);
  const [isQuantityEditing, setIsQuantityEditing] = useState(false);

  const handleSaveEdit = () => {
    onUpdate({
      name: editName.trim(),
    });
    setIsEditing(false);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 99) {
      onUpdate({ quantity: newQuantity });
    }
  };

  const handleLuggageChange = (luggage: string) => {
    onUpdate({ luggage });
  };

  const luggageType = luggageTypes.find(l => l.value === item.luggage);
  const quantity = item.quantity || 1;
  
  const getTextSizeClass = () => {
    switch (textSize) {
      case 'small': return 'text-xs';
      case 'large': return 'text-base';
      default: return 'text-sm';
    }
  };

  if (checklistMode) {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
      className={`flex items-center gap-2 p-2 rounded-xl transition-all duration-300 ${
        item.packed
          ? 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800'
          : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
      } shadow-sm hover:shadow-md`}
      >
        <Checkbox
          checked={item.packed}
          onCheckedChange={onToggle}
          className="h-5 w-5 rounded-full border-2 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
        />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span
              className={`${getTextSizeClass()} font-medium transition-all duration-300 ${
                item.packed
                  ? 'text-green-700 dark:text-green-300 line-through opacity-75'
                  : 'text-gray-900 dark:text-gray-100'
              }`}
            >
              {item.name}
              {quantity > 1 && (
                <span className="text-xs text-gray-500 ml-1 font-normal">×{quantity}</span>
              )}
            </span>
            
            <div className="flex items-center gap-2">
              {luggageType && (
                <Badge className={`${luggageType.color} text-white text-xs px-1 py-0.5`}>
                  {luggageType.label}
                </Badge>
              )}
            </div>
          </div>
        </div>

        {item.packed && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
          >
            <Check className="h-3 w-3 text-white" />
          </motion.div>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      whileHover={{ scale: 1.01 }}
      className={`group flex items-center gap-2 p-2 rounded-xl transition-all duration-300 ${
        item.packed
          ? 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800'
          : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-md'
      } shadow-sm`}
    >
      <Checkbox
        checked={item.packed}
        onCheckedChange={onToggle}
        className="rounded-full h-5 w-5 border-2 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
      />

      <div className="flex-1 min-w-0">
        {isEditing ? (
          <div className="flex gap-2">
            <Input
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="flex-1 rounded-xl"
              onKeyPress={(e) => e.key === 'Enter' && handleSaveEdit()}
              onBlur={handleSaveEdit}
              autoFocus
            />
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span
                className={`${getTextSizeClass()} font-medium transition-all duration-300 ${
                  item.packed
                    ? 'text-green-700 dark:text-green-300 line-through opacity-75'
                    : 'text-gray-900 dark:text-gray-100'
                }`}
              >
                {item.name}
              </span>

              {/* Quantity Controls */}
              <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 rounded-lg px-1.5 py-0.5">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                  className="h-5 w-5 p-0 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  <Minus className="h-2 w-2" />
                </Button>
                
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 min-w-[1.5ch] text-center">
                  {quantity}
                </span>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= 99}
                  className="h-5 w-5 p-0 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  <Plus className="h-2 w-2" />
                </Button>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Luggage Assignment */}
              <Select value={item.luggage || ''} onValueChange={handleLuggageChange}>
                <SelectTrigger className="w-24 h-6 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                  <SelectValue placeholder="Luggage">
                    <div className="flex items-center gap-1">
                      <Package className="h-2 w-2" />
                      {luggageType ? (
                        <span className="text-xs">{luggageType.label.slice(0, 3)}</span>
                      ) : (
                        <span className="text-xs">Bag</span>
                      )}
                    </div>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="rounded-lg">
                  {luggageTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value} className="rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${type.color}`} />
                        <span className="text-xs">{type.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {luggageType && (
                <Badge className={`${luggageType.color} text-white text-xs px-1 py-0.5`}>
                  {luggageType.label.slice(0, 3)}
                </Badge>
              )}
            </div>
          </div>
        )}
      </div>

      {item.packed && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
        >
          <Check className="h-3 w-3 text-white" />
        </motion.div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsEditing(!isEditing)}
          className="hover:bg-blue-100 hover:text-blue-600 dark:hover:bg-blue-900/20 dark:hover:text-blue-400 rounded-full h-6 w-6 p-0"
        >
          <Edit3 className="h-2 w-2" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onDelete}
          className="hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400 rounded-full h-6 w-6 p-0"
        >
          <Trash2 className="h-2 w-2" />
        </Button>
      </div>
    </motion.div>
  );
};
