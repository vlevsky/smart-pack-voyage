
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Package, Plane, Backpack, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { PackingItemType } from '@/components/PackingItem';

interface LuggageViewProps {
  isOpen: boolean;
  onClose: () => void;
  items: PackingItemType[];
  onToggleItem: (id: string) => void;
}

const luggageTypes = [
  { 
    value: 'carry-on', 
    label: 'Carry-On', 
    icon: Plane, 
    color: 'bg-blue-500',
    description: 'Items you\'ll keep with you on the plane'
  },
  { 
    value: 'checked', 
    label: 'Checked Bag', 
    icon: Package, 
    color: 'bg-green-500',
    description: 'Items that go in your checked luggage'
  },
  { 
    value: 'backpack', 
    label: 'Backpack', 
    icon: Backpack, 
    color: 'bg-purple-500',
    description: 'Items in your travel backpack'
  },
  { 
    value: 'personal', 
    label: 'Personal Item', 
    icon: Briefcase, 
    color: 'bg-orange-500',
    description: 'Small bag that fits under the seat'
  },
];

export const LuggageView: React.FC<LuggageViewProps> = ({
  isOpen,
  onClose,
  items,
  onToggleItem,
}) => {
  if (!isOpen) return null;

  const getItemsByLuggage = (luggageType: string) => {
    return items.filter(item => item.luggage === luggageType);
  };

  const unassignedItems = items.filter(item => !item.luggage);

  const getTotalWeight = (luggageItems: PackingItemType[]) => {
    return luggageItems.reduce((total, item) => total + (item.quantity || 1), 0);
  };

  const getPackedCount = (luggageItems: PackingItemType[]) => {
    return luggageItems.filter(item => item.packed).length;
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white dark:bg-gray-900 rounded-3xl p-6 max-w-6xl w-full max-h-[85vh] overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Pack by Luggage 🧳
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Organize your items by where they'll go
              </p>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="rounded-full h-10 w-10">
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Luggage Categories */}
          <div className="overflow-y-auto max-h-[calc(85vh-200px)]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {luggageTypes.map((luggage) => {
                const luggageItems = getItemsByLuggage(luggage.value);
                const packedCount = getPackedCount(luggageItems);
                const totalItems = luggageItems.length;
                const totalQuantity = getTotalWeight(luggageItems);
                const Icon = luggage.icon;

                return (
                  <motion.div
                    key={luggage.value}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 border border-gray-200 dark:border-gray-600"
                  >
                    {/* Luggage Header */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-12 h-12 rounded-xl ${luggage.color} flex items-center justify-center text-white shadow-lg`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-xl text-gray-900 dark:text-white">
                          {luggage.label}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {luggage.description}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-gray-900 dark:text-white">
                          {packedCount}/{totalItems} items
                        </div>
                        <div className="text-xs text-gray-500">
                          {totalQuantity} total pieces
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    {totalItems > 0 && (
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-600 dark:text-gray-300">Progress</span>
                          <span className="font-semibold text-gray-900 dark:text-white">
                            {Math.round((packedCount / totalItems) * 100)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <motion.div
                            className={`h-2 rounded-full ${luggage.color}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${(packedCount / totalItems) * 100}%` }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Items List */}
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {luggageItems.length > 0 ? (
                        luggageItems.map((item) => (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                              item.packed
                                ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                                : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
                            }`}
                          >
                            <Checkbox
                              checked={item.packed}
                              onCheckedChange={() => onToggleItem(item.id)}
                              className="rounded-full"
                            />
                            <div className="flex-1">
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
                            </div>
                            <Badge className={`${luggage.color} text-white text-xs`}>
                              {item.category}
                            </Badge>
                          </motion.div>
                        ))
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          <Icon className="h-12 w-12 mx-auto mb-2 opacity-50" />
                          <p>No items assigned to {luggage.label.toLowerCase()}</p>
                          <p className="text-sm">Assign items from your packing list</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Unassigned Items */}
            {unassignedItems.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl p-6 border border-yellow-200 dark:border-yellow-800"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-yellow-500 flex items-center justify-center text-white">
                    <Package className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-yellow-300">
                      Unassigned Items ({unassignedItems.length})
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-yellow-200">
                      These items need luggage assignment
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {unassignedItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700"
                    >
                      <Checkbox
                        checked={item.packed}
                        onCheckedChange={() => onToggleItem(item.id)}
                        className="rounded-full"
                      />
                      <span className="flex-1 text-gray-900 dark:text-gray-100">
                        {item.name}
                        {item.quantity && item.quantity > 1 && (
                          <span className="text-sm text-gray-500 ml-2">x{item.quantity}</span>
                        )}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {item.category}
                      </Badge>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
