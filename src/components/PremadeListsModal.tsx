import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, X, Search, Calendar, Users, Thermometer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface PremadeListsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddItems: (items: Array<{ name: string; category: string; quantity?: number }>) => void;
}

interface PremadeList {
  id: string;
  name: string;
  description: string;
  destinationType: string;
  season?: string;
  items: Array<{ 
    name: string; 
    category: string; 
    quantity?: number;
    baseQuantity?: number;
    perDay?: boolean;
    thoroughnessLevel?: 'light' | 'balanced' | 'thorough';
  }>;
}

const premadeLists: PremadeList[] = [
  {
    id: 'hawaii-beach-vacation',
    name: 'Hawaii Beach Vacation',
    description: 'Essential items for a relaxing beach vacation in Hawaii.',
    destinationType: 'beach',
    season: 'summer',
    items: [
      { name: 'Swimsuit', category: 'clothes', quantity: 2, baseQuantity: 2 },
      { name: 'Sunscreen SPF 50+', category: 'toiletries', quantity: 1 },
      { name: 'Sunglasses', category: 'miscellaneous', quantity: 1 },
      { name: 'Beach towel', category: 'miscellaneous', quantity: 1 },
      { name: 'Flip flops', category: 'clothes', quantity: 1 },
      { name: 'Shorts', category: 'clothes', quantity: 4, baseQuantity: 2, perDay: true },
      { name: 'Tank tops', category: 'clothes', quantity: 5, baseQuantity: 3, perDay: true },
      { name: 'Light dress', category: 'clothes', quantity: 2 },
      { name: 'Waterproof phone case', category: 'electronics', quantity: 1 },
      { name: 'Beach bag', category: 'miscellaneous', quantity: 1 },
      { name: 'After-sun lotion', category: 'toiletries', quantity: 1 },
      { name: 'Hat', category: 'clothes', quantity: 1 },
      { name: 'Snorkeling gear', category: 'miscellaneous', quantity: 1, thoroughnessLevel: 'thorough' },
      { name: 'Underwater camera', category: 'electronics', quantity: 1, thoroughnessLevel: 'thorough' },
      { name: 'Beach umbrella', category: 'miscellaneous', quantity: 1, thoroughnessLevel: 'thorough' },
      { name: 'Cooling towel', category: 'miscellaneous', quantity: 1, thoroughnessLevel: 'balanced' },
      { name: 'Reef-safe sunscreen', category: 'toiletries', quantity: 1, thoroughnessLevel: 'balanced' },
      { name: 'Water shoes', category: 'clothes', quantity: 1, thoroughnessLevel: 'balanced' },
      { name: 'Portable fan', category: 'electronics', quantity: 1, thoroughnessLevel: 'thorough' },
      { name: 'Beach games', category: 'miscellaneous', quantity: 1, thoroughnessLevel: 'thorough' },
      { name: 'Insulated water bottle', category: 'miscellaneous', quantity: 1 },
      { name: 'Sandal cleaner', category: 'toiletries', quantity: 1, thoroughnessLevel: 'thorough' },
      { name: 'Aloe vera gel', category: 'toiletries', quantity: 1 },
      { name: 'Light cardigan', category: 'clothes', quantity: 1 },
      { name: 'Waterproof watch', category: 'miscellaneous', quantity: 1, thoroughnessLevel: 'balanced' }
    ],
  },
  {
    id: 'paris-city-break',
    name: 'Paris City Break',
    description: 'A curated list for exploring the romantic streets of Paris.',
    destinationType: 'city',
    season: 'spring',
    items: [
      { name: 'Comfortable walking shoes', category: 'clothes', quantity: 1 },
      { name: 'Light jacket', category: 'clothes', quantity: 1 },
      { name: 'Travel adapter', category: 'electronics', quantity: 1 },
      { name: 'French phrasebook', category: 'documents', quantity: 1 },
      { name: 'Reusable water bottle', category: 'miscellaneous', quantity: 1 },
      { name: 'Casual pants', category: 'clothes', quantity: 3, baseQuantity: 2, perDay: true },
      { name: 'Nice shirts', category: 'clothes', quantity: 4, baseQuantity: 3, perDay: true },
      { name: 'Scarf', category: 'clothes', quantity: 1 },
      { name: 'Crossbody bag', category: 'miscellaneous', quantity: 1 },
      { name: 'Portable charger', category: 'electronics', quantity: 1 },
      { name: 'Camera', category: 'electronics', quantity: 1 },
      { name: 'Metro map', category: 'documents', quantity: 1 },
      { name: 'Umbrella', category: 'miscellaneous', quantity: 1 },
      { name: 'Dress clothes for dinner', category: 'clothes', quantity: 1, thoroughnessLevel: 'balanced' },
      { name: 'Museum membership card', category: 'documents', quantity: 1, thoroughnessLevel: 'thorough' },
      { name: 'Binoculars for sightseeing', category: 'miscellaneous', quantity: 1, thoroughnessLevel: 'thorough' },
      { name: 'Pocket wifi', category: 'electronics', quantity: 1, thoroughnessLevel: 'balanced' },
      { name: 'Travel insurance documents', category: 'documents', quantity: 1 },
      { name: 'Hand warmers', category: 'miscellaneous', quantity: 2, thoroughnessLevel: 'thorough' },
      { name: 'Foldable shopping bag', category: 'miscellaneous', quantity: 1, thoroughnessLevel: 'balanced' },
      { name: 'Backup shoes', category: 'clothes', quantity: 1, thoroughnessLevel: 'thorough' },
      { name: 'Travel journal', category: 'miscellaneous', quantity: 1, thoroughnessLevel: 'balanced' },
      { name: 'Lip balm with SPF', category: 'toiletries', quantity: 1 },
      { name: 'Hand cream', category: 'toiletries', quantity: 1 },
      { name: 'Tissues', category: 'toiletries', quantity: 2 }
    ],
  },
  {
    id: 'camping-adventure',
    name: 'Camping Adventure',
    description: 'All the essentials for a weekend camping trip in the wilderness.',
    destinationType: 'outdoors',
    season: 'fall',
    items: [
      { name: 'Tent', category: 'miscellaneous' },
      { name: 'Sleeping bag', category: 'miscellaneous' },
      { name: 'Headlamp', category: 'electronics' },
      { name: 'Insect repellent', category: 'toiletries' },
      { name: 'First aid kit', category: 'miscellaneous' },
    ],
  },
  {
    id: 'ski-trip',
    name: 'Ski Trip',
    description: 'Gear and clothing for a fun and safe ski trip in the mountains.',
    destinationType: 'outdoors',
    season: 'winter',
    items: [
      { name: 'Ski jacket', category: 'clothes' },
      { name: 'Ski pants', category: 'clothes' },
      { name: 'Gloves', category: 'clothes' },
      { name: 'Goggles', category: 'miscellaneous' },
      { name: 'Thermal underwear', category: 'clothes' },
    ],
  },
  {
    id: 'business-trip',
    name: 'Business Trip',
    description: 'Professional attire and gadgets for a successful business trip.',
    destinationType: 'business',
    items: [
      { name: 'Laptop', category: 'electronics' },
      { name: 'Charger', category: 'electronics' },
      { name: 'Dress shirts', category: 'clothes', quantity: 3 },
      { name: 'Dress pants', category: 'clothes', quantity: 2 },
      { name: 'Business cards', category: 'documents' },
    ],
  },
  {
    id: 'backpacking-europe',
    name: 'Backpacking Europe',
    description: 'Lightweight essentials for backpacking across Europe.',
    destinationType: 'city',
    season: 'summer',
    items: [
      { name: 'Backpack', category: 'miscellaneous' },
      { name: 'Travel towel', category: 'miscellaneous' },
      { name: 'Universal adapter', category: 'electronics' },
      { name: 'Padlock', category: 'miscellaneous' },
      { name: 'Quick-dry clothing', category: 'clothes', quantity: 3 },
    ],
  },
  {
    id: 'cruise-vacation',
    name: 'Cruise Vacation',
    description: 'Items for a relaxing and enjoyable cruise vacation.',
    destinationType: 'beach',
    items: [
      { name: 'Formal wear', category: 'clothes' },
      { name: 'Swimsuit', category: 'clothes', quantity: 2 },
      { name: 'Sun hat', category: 'clothes' },
      { name: 'Motion sickness pills', category: 'toiletries' },
      { name: 'Binoculars', category: 'miscellaneous' },
    ],
  },
  {
    id: 'road-trip',
    name: 'Road Trip',
    description: 'Essentials for a safe and fun road trip adventure.',
    destinationType: 'outdoors',
    items: [
      { name: 'Car charger', category: 'electronics' },
      { name: 'Phone mount', category: 'miscellaneous' },
      { name: 'Snacks', category: 'miscellaneous' },
      { name: 'Road maps', category: 'documents' },
      { name: 'Sunglasses', category: 'miscellaneous' },
    ],
  },
  {
    id: 'yoga-retreat',
    name: 'Yoga Retreat',
    description: 'Items for a peaceful and rejuvenating yoga retreat.',
    destinationType: 'wellness',
    items: [
      { name: 'Yoga mat', category: 'miscellaneous' },
      { name: 'Comfortable clothing', category: 'clothes', quantity: 3 },
      { name: 'Water bottle', category: 'miscellaneous' },
      { name: 'Meditation cushion', category: 'miscellaneous' },
      { name: 'Essential oils', category: 'toiletries' },
    ],
  },
  {
    id: 'safari-adventure',
    name: 'Safari Adventure',
    description: 'Clothing and gear for an exciting safari adventure.',
    destinationType: 'outdoors',
    items: [
      { name: 'Binoculars', category: 'miscellaneous' },
      { name: 'Long-sleeved shirts', category: 'clothes', quantity: 3 },
      { name: 'Long pants', category: 'clothes', quantity: 2 },
      { name: 'Hat', category: 'clothes' },
      { name: 'Insect repellent', category: 'toiletries' },
    ],
  },
];

interface TripCustomization {
  days: number;
  intensity: 'light' | 'balanced' | 'thorough';
}

const intensityColors = {
  light: 'bg-green-500',
  balanced: 'bg-yellow-500', 
  thorough: 'bg-red-500'
};

const intensityLabels = {
  light: 'Light Packer',
  balanced: 'Balanced',
  thorough: 'Thorough'
};

export const PremadeListsModal: React.FC<PremadeListsModalProps> = ({
  isOpen,
  onClose,
  onAddItems,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedList, setSelectedList] = useState<PremadeList | null>(null);
  const [customization, setCustomization] = useState<TripCustomization>({
    days: 7,
    intensity: 'balanced'
  });
  const [showPreview, setShowPreview] = useState(false);
  const [pullToRefresh, setPullToRefresh] = useState(false);

  const calculateItems = (list: PremadeList, days: number, intensity: 'light' | 'balanced' | 'thorough') => {
    return list.items.filter(item => {
      // Filter by thoroughness level
      if (item.thoroughnessLevel) {
        if (intensity === 'light' && item.thoroughnessLevel !== 'light') return false;
        if (intensity === 'balanced' && item.thoroughnessLevel === 'thorough') return false;
      }
      return true;
    }).map(item => {
      let quantity = item.quantity || 1;
      
      // Adjust quantity based on days
      if (item.perDay && item.baseQuantity) {
        quantity = Math.max(item.baseQuantity, Math.ceil(days * 0.6)); // Not exactly per day to avoid over-packing
      }
      
      return {
        ...item,
        quantity
      };
    });
  };

  const filteredLists = premadeLists.filter((list) => {
    const searchRegex = new RegExp(searchTerm, 'i');
    const matchesSearch = searchRegex.test(list.name) || searchRegex.test(list.description);
    const matchesCategory = selectedCategory === 'all' || list.destinationType === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handlePreview = (list: PremadeList) => {
    setSelectedList(list);
    setShowPreview(true);
  };

  const handleAddItems = () => {
    if (!selectedList) return;
    const items = calculateItems(selectedList, customization.days, customization.intensity);
    onAddItems(items);
    onClose();
  };

  if (!isOpen) return null;

  const previewItems = selectedList ? calculateItems(selectedList, customization.days, customization.intensity) : [];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-lg max-h-[95vh] overflow-hidden flex flex-col"
      >
        {!showPreview ? (
          <>
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 shrink-0">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full p-2">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold">Smart Packing Lists</h2>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {premadeLists.length} curated lists
                  </p>
                </div>
              </div>
              <Button variant="ghost" onClick={onClose} className="rounded-full h-8 w-8 p-0">
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Search */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 shrink-0">
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search destinations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-10"
                />
              </div>
              
              <div className="flex gap-2 overflow-x-auto pb-2">
                <Button
                  variant={selectedCategory === 'all' ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory('all')}
                  className="whitespace-nowrap text-xs px-3 py-1 h-7"
                >
                  All
                </Button>
                {['beach', 'city', 'outdoors', 'business'].map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    onClick={() => setSelectedCategory(category)}
                    className="whitespace-nowrap capitalize text-xs px-3 py-1 h-7"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Scrollable Lists */}
            <ScrollArea className="flex-1 px-4">
              <div className="py-4 space-y-3">
                {filteredLists.map((list) => (
                  <motion.div
                    key={list.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 cursor-pointer"
                    onClick={() => handlePreview(list)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm">{list.name}</h3>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                          {list.description}
                        </p>
                      </div>
                      <div className="ml-3 text-lg">
                        {list.destinationType === 'beach' ? '🏖️' : 
                         list.destinationType === 'city' ? '🏙️' : 
                         list.destinationType === 'outdoors' ? '🏞️' : '💼'}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                      <span>{list.items.length} items</span>
                      <span className="text-blue-600 dark:text-blue-400 font-medium">
                        Preview →
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>
          </>
        ) : (
          <>
            {/* Preview Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 shrink-0">
              <div>
                <h3 className="text-lg font-semibold">{selectedList?.name}</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Customize your packing list
                </p>
              </div>
              <Button 
                variant="ghost" 
                onClick={() => setShowPreview(false)}
                className="rounded-full h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Customization Controls */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 shrink-0 space-y-4">
              {/* Days Selector */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-2">
                  <Calendar className="h-4 w-4" />
                  Trip Length: {customization.days} {customization.days === 1 ? 'day' : 'days'}
                </label>
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={customization.days}
                  onChange={(e) => setCustomization(prev => ({ ...prev, days: parseInt(e.target.value) }))}
                  className="w-full"
                />
              </div>

              {/* Intensity Selector */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-2">
                  <Thermometer className="h-4 w-4" />
                  Packing Style
                </label>
                <div className="flex gap-2">
                  {(['light', 'balanced', 'thorough'] as const).map((intensity) => (
                    <Button
                      key={intensity}
                      variant={customization.intensity === intensity ? 'default' : 'outline'}
                      onClick={() => setCustomization(prev => ({ ...prev, intensity }))}
                      className={`flex-1 text-xs h-8 ${
                        customization.intensity === intensity ? intensityColors[intensity] : ''
                      }`}
                    >
                      {intensityLabels[intensity]}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Items Preview */}
            <ScrollArea className="flex-1 px-4">
              <div className="py-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">Items ({previewItems.length})</h4>
                  <Badge variant="secondary" className={intensityColors[customization.intensity]}>
                    {intensityLabels[customization.intensity]}
                  </Badge>
                </div>
                <div className="space-y-2">
                  {previewItems.map((item, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                      <div className="flex-1">
                        <span className="text-sm font-medium">{item.name}</span>
                        <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                          {item.category}
                        </div>
                      </div>
                      {item.quantity && item.quantity > 1 && (
                        <Badge variant="secondary" className="text-xs">
                          {item.quantity}
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </ScrollArea>

            {/* Actions */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 shrink-0">
              <Button
                onClick={handleAddItems}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Add {previewItems.length} Items to Trip
              </Button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};
