import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

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
  items: Array<{ name: string; category: string; quantity?: number }>;
}

const premadeLists: PremadeList[] = [
  {
    id: 'hawaii-beach-vacation',
    name: 'Hawaii Beach Vacation',
    description: 'Essential items for a relaxing beach vacation in Hawaii.',
    destinationType: 'beach',
    season: 'summer',
    items: [
      { name: 'Swimsuit', category: 'clothes', quantity: 2 },
      { name: 'Sunscreen', category: 'toiletries' },
      { name: 'Sunglasses', category: 'miscellaneous' },
      { name: 'Beach towel', category: 'miscellaneous' },
      { name: 'Flip flops', category: 'clothes' },
    ],
  },
  {
    id: 'paris-city-break',
    name: 'Paris City Break',
    description: 'A curated list for exploring the romantic streets of Paris.',
    destinationType: 'city',
    season: 'spring',
    items: [
      { name: 'Comfortable walking shoes', category: 'clothes' },
      { name: 'Light jacket', category: 'clothes' },
      { name: 'Travel adapter', category: 'electronics' },
      { name: 'Phrasebook', category: 'documents' },
      { name: 'Reusable water bottle', category: 'miscellaneous' },
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

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'beach':
      return '🏖️';
    case 'city':
      return '🏙️';
    case 'outdoors':
      return '🏞️';
    case 'business':
      return '💼';
    case 'wellness':
      return '🧘';
    default:
      return '🌍';
  }
};

interface PreviewItem {
  name: string;
  category: string;
  quantity?: number;
}

interface PreviewList {
  id: string;
  name: string;
  description: string;
  destinationType: string;
  season?: string;
  items: PreviewItem[];
}

export const PremadeListsModal: React.FC<PremadeListsModalProps> = ({
  isOpen,
  onClose,
  onAddItems,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedList, setSelectedList] = useState<PreviewList | null>(null);
  const [pullToRefresh, setPullToRefresh] = useState(false);
  const [touchStart, setTouchStart] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touchCurrent = e.touches[0].clientY;
    const touchDifference = touchCurrent - touchStart;
    
    if (touchDifference > 50 && window.scrollY === 0) {
      setPullToRefresh(true);
    }
  };

  const handleTouchEnd = () => {
    if (pullToRefresh) {
      // Simulate refresh
      setTimeout(() => {
        setPullToRefresh(false);
        // Could add actual refresh logic here
      }, 1000);
    }
  };

  const filteredLists = premadeLists.filter((list) => {
    const searchRegex = new RegExp(searchTerm, 'i');
    const matchesSearch = searchRegex.test(list.name) || searchRegex.test(list.description);
    const matchesCategory = selectedCategory === 'all' || list.destinationType === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categoryCount = premadeLists.reduce((acc: { [key: string]: number }, list) => {
    const category = list.destinationType;
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 md:p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-6xl max-h-[95vh] overflow-hidden flex flex-col"
      >
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-900 z-10">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full p-2">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold">Smart Packing Lists</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {premadeLists.length} curated lists for every adventure
              </p>
            </div>
          </div>
          <Button variant="ghost" onClick={onClose} className="rounded-full h-10 w-10 p-0">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 p-4 md:p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search destinations, activities, or items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('all')}
              className="whitespace-nowrap"
            >
              All ({premadeLists.length})
            </Button>
            {Object.entries(categoryCount).map(([category, count]) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className="whitespace-nowrap capitalize"
              >
                {category} ({count})
              </Button>
            ))}
          </div>
        </div>

        <div 
          className="flex-1 overflow-y-auto"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {pullToRefresh && (
            <div className="flex items-center justify-center py-4 text-blue-500">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mr-2"></div>
              Refreshing lists...
            </div>
          )}

          <div className="p-4 md:p-6">
            {filteredLists.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">No lists found</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Try adjusting your search or category filter
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {filteredLists.map((list) => (
                  <motion.div
                    key={list.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 md:p-6 hover:shadow-lg transition-all cursor-pointer group"
                    onClick={() => setSelectedList(list)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {list.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {list.description}
                        </p>
                      </div>
                      <div className="ml-3 text-2xl">
                        {getCategoryIcon(list.destinationType)}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      {list.season && (
                        <Badge variant="secondary" className="text-xs">
                          {list.season}
                        </Badge>
                      )}
                      <Badge variant="outline" className="text-xs">
                        {list.destinationType}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                      <span>{Array.isArray(list.items) ? list.items.length : 0} items</span>
                      <span className="text-blue-600 dark:text-blue-400 font-medium">
                        Preview →
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        {selectedList && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-2 md:p-4"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold">{selectedList.name}</h3>
                <div className="flex gap-2">
                  <Button
                    onClick={() => {
                      onAddItems(selectedList.items);
                      onClose();
                    }}
                    className="bg-blue-500 hover:bg-blue-600"
                  >
                    Add All Items
                  </Button>
                  <Button variant="ghost" onClick={() => setSelectedList(null)} className="rounded-full h-10 w-10 p-0">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-4 md:p-6">
                {selectedList.items.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🗂️</div>
                    <h3 className="text-xl font-semibold mb-2">No items in this list</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      This list is currently empty.
                    </p>
                  </div>
                ) : (
                  <ul className="space-y-3">
                    {selectedList.items.map((item, index) => (
                      <li key={index} className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                        <div>
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Category: {item.category}
                          </p>
                        </div>
                        {item.quantity && (
                          <Badge variant="secondary">
                            {item.quantity}
                          </Badge>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
