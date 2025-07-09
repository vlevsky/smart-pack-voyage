import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Plane, Backpack, Briefcase, Info, Search, Filter, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { PackingItemType } from '@/components/PackingItem';
import { LuggageLimitsModal } from '@/components/LuggageLimitsModal';
import { ScrollArea } from '@/components/ui/scroll-area';

interface LuggageManagementProps {
  isOpen: boolean;
  onClose: () => void;
  items: PackingItemType[];
  onAssignLuggage: (itemId: string, luggage: string) => void;
  onToggleItem: (id: string) => void;
}

const luggageTypes = [
  { 
    value: 'carry-on', 
    label: 'Carry-On', 
    icon: Plane, 
    color: 'bg-blue-500',
    description: 'Items you\'ll keep with you on the plane',
    maxWeight: '22 lbs (10 kg)',
    dimensions: '22" x 14" x 9"'
  },
  { 
    value: 'checked', 
    label: 'Checked Bag', 
    icon: Package, 
    color: 'bg-green-500',
    description: 'Items that go in your checked luggage',
    maxWeight: '50 lbs (23 kg)',
    dimensions: '62" linear inches'
  },
  { 
    value: 'backpack', 
    label: 'Backpack', 
    icon: Backpack, 
    color: 'bg-purple-500',
    description: 'Items in your travel backpack',
    maxWeight: '15 lbs (7 kg)',
    dimensions: '18" x 14" x 8"'
  },
  { 
    value: 'personal', 
    label: 'Personal Item', 
    icon: Briefcase, 
    color: 'bg-orange-500',
    description: 'Small bag that fits under the seat',
    maxWeight: '10 lbs (4.5 kg)',
    dimensions: '16" x 12" x 6"'
  },
];

export const LuggageManagement: React.FC<LuggageManagementProps> = ({
  isOpen,
  onClose,
  items,
  onAssignLuggage,
  onToggleItem,
}) => {
  const [showLimits, setShowLimits] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLuggage, setSelectedLuggage] = useState<string | null>(null);

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

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleMoveItem = (itemId: string, newLuggage: string) => {
    onAssignLuggage(itemId, newLuggage);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white dark:bg-gray-900 rounded-3xl p-6 max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Luggage Management 🧳
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Organize and sort your items by luggage
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                onClick={() => setShowLimits(true)}
                className="rounded-full"
              >
                <Info className="h-4 w-4 mr-2" />
                Airline Limits
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose} className="rounded-full h-10 w-10 p-0">
                ×
              </Button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="mb-6 space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={selectedLuggage === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedLuggage(null)}
              >
                All Items ({items.length})
              </Button>
              {luggageTypes.map((luggage) => {
                const count = getItemsByLuggage(luggage.value).length;
                return (
                  <Button
                    key={luggage.value}
                    variant={selectedLuggage === luggage.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedLuggage(luggage.value)}
                    className="flex items-center gap-1"
                  >
                    <luggage.icon className="h-3 w-3" />
                    {luggage.label} ({count})
                  </Button>
                );
              })}
              <Button
                variant={selectedLuggage === 'unassigned' ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedLuggage('unassigned')}
              >
                <Package className="h-3 w-3 mr-1" />
                Unassigned ({unassignedItems.length})
              </Button>
            </div>
          </div>

          {/* Content */}
          <ScrollArea className="h-[55vh]">
            <div className="space-y-6">
              
              {/* Luggage Categories */}
              {luggageTypes.map((luggage) => {
                const luggageItems = getItemsByLuggage(luggage.value);
                const packedCount = getPackedCount(luggageItems);
                const totalItems = luggageItems.length;
                const totalQuantity = getTotalWeight(luggageItems);
                const Icon = luggage.icon;

                if (selectedLuggage && selectedLuggage !== luggage.value) return null;

                return (
                  <motion.div
                    key={luggage.value}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 border border-gray-200 dark:border-gray-600"
                  >
                    {/* Luggage Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
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
                          <div className="flex gap-4 mt-1 text-xs text-gray-500">
                            <span>Max: {luggage.maxWeight}</span>
                            <span>Size: {luggage.dimensions}</span>
                          </div>
                        </div>
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
                    <div className="space-y-3">
                      {luggageItems.length > 0 ? (
                        luggageItems
                          .filter(item => 
                            !searchQuery || 
                            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.category.toLowerCase().includes(searchQuery.toLowerCase())
                          )
                          .map((item) => (
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
                              <input
                                type="checkbox"
                                checked={item.packed}
                                onChange={() => onToggleItem(item.id)}
                                className="rounded h-4 w-4"
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
                              
                              {/* Move to other luggage */}
                              <select
                                value={item.luggage || ''}
                                onChange={(e) => handleMoveItem(item.id, e.target.value)}
                                className="text-xs p-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                              >
                                <option value="">Unassigned</option>
                                {luggageTypes.map(type => (
                                  <option key={type.value} value={type.value}>
                                    {type.label}
                                  </option>
                                ))}
                              </select>
                            </motion.div>
                          ))
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          <Icon className="h-12 w-12 mx-auto mb-2 opacity-50" />
                          <p>No items assigned to {luggage.label.toLowerCase()}</p>
                          <p className="text-sm">Drag items here or assign from unassigned items</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}

              {/* Unassigned Items */}
              {(selectedLuggage === null || selectedLuggage === 'unassigned') && unassignedItems.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl p-6 border border-yellow-200 dark:border-yellow-800"
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
                    {unassignedItems
                      .filter(item => 
                        !searchQuery || 
                        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.category.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700"
                        >
                          <input
                            type="checkbox"
                            checked={item.packed}
                            onChange={() => onToggleItem(item.id)}
                            className="rounded h-4 w-4"
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
                          
                          {/* Assign to luggage */}
                          <select
                            value=""
                            onChange={(e) => handleMoveItem(item.id, e.target.value)}
                            className="text-xs p-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                          >
                            <option value="">Assign to...</option>
                            {luggageTypes.map(type => (
                              <option key={type.value} value={type.value}>
                                {type.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      ))}
                  </div>
                </motion.div>
              )}
            </div>
          </ScrollArea>
        </motion.div>
      </div>

      {/* Luggage Limits Modal */}
      <LuggageLimitsModal
        isOpen={showLimits}
        onClose={() => setShowLimits(false)}
      />
    </AnimatePresence>
  );
};