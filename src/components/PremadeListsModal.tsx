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
  // Beach & Resort Destinations
  {
    id: 'hawaii-beach-vacation',
    name: 'Hawaii Beach Vacation',
    description: 'Essential items for a relaxing beach vacation in Hawaii.',
    destinationType: 'beach',
    season: 'summer',
    items: [
      { name: 'Swimsuit', category: 'clothes', quantity: 2, baseQuantity: 2 },
      { name: 'Beach cover-up', category: 'clothes', quantity: 2 },
      { name: 'Sunscreen SPF 50+', category: 'toiletries', quantity: 1 },
      { name: 'Reef-safe sunscreen', category: 'toiletries', quantity: 1, thoroughnessLevel: 'balanced' },
      { name: 'Sunglasses', category: 'miscellaneous', quantity: 1 },
      { name: 'Beach towel', category: 'miscellaneous', quantity: 2 },
      { name: 'Flip flops', category: 'clothes', quantity: 1 },
      { name: 'Water shoes', category: 'clothes', quantity: 1, thoroughnessLevel: 'balanced' },
      { name: 'Shorts', category: 'clothes', quantity: 4, baseQuantity: 2, perDay: true },
      { name: 'Tank tops', category: 'clothes', quantity: 5, baseQuantity: 3, perDay: true },
      { name: 'Light dress', category: 'clothes', quantity: 2 },
      { name: 'Beach dress', category: 'clothes', quantity: 1 },
      { name: 'Waterproof phone case', category: 'electronics', quantity: 1 },
      { name: 'Beach bag', category: 'miscellaneous', quantity: 1 },
      { name: 'After-sun lotion', category: 'toiletries', quantity: 1 },
      { name: 'Aloe vera gel', category: 'toiletries', quantity: 1 },
      { name: 'Hat', category: 'clothes', quantity: 1 },
      { name: 'Snorkeling gear', category: 'miscellaneous', quantity: 1, thoroughnessLevel: 'thorough' },
      { name: 'Underwater camera', category: 'electronics', quantity: 1, thoroughnessLevel: 'thorough' },
      { name: 'Beach umbrella', category: 'miscellaneous', quantity: 1, thoroughnessLevel: 'thorough' },
      { name: 'Cooling towel', category: 'miscellaneous', quantity: 1, thoroughnessLevel: 'balanced' },
      { name: 'Portable fan', category: 'electronics', quantity: 1, thoroughnessLevel: 'thorough' },
      { name: 'Beach games', category: 'miscellaneous', quantity: 1, thoroughnessLevel: 'thorough' },
      { name: 'Insulated water bottle', category: 'miscellaneous', quantity: 1 },
      { name: 'Light cardigan', category: 'clothes', quantity: 1 },
      { name: 'Waterproof watch', category: 'miscellaneous', quantity: 1, thoroughnessLevel: 'balanced' },
      { name: 'Beach sarong', category: 'clothes', quantity: 1 },
      { name: 'Lip balm with SPF', category: 'toiletries', quantity: 1 },
      { name: 'Beach sandals', category: 'clothes', quantity: 1 },
      { name: 'Pool floatie', category: 'miscellaneous', quantity: 1, thoroughnessLevel: 'thorough' },
      { name: 'Snacks', category: 'miscellaneous', quantity: 3 },
      { name: 'Electrolyte packets', category: 'toiletries', quantity: 1 },
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
      { name: 'Backup walking shoes', category: 'clothes', quantity: 1, thoroughnessLevel: 'thorough' },
      { name: 'Light jacket', category: 'clothes', quantity: 1 },
      { name: 'Trench coat', category: 'clothes', quantity: 1, thoroughnessLevel: 'balanced' },
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
      { name: 'Museum pass', category: 'documents', quantity: 1, thoroughnessLevel: 'thorough' },
      { name: 'Binoculars for sightseeing', category: 'miscellaneous', quantity: 1, thoroughnessLevel: 'thorough' },
      { name: 'Pocket wifi', category: 'electronics', quantity: 1, thoroughnessLevel: 'balanced' },
      { name: 'Travel insurance documents', category: 'documents', quantity: 1 },
      { name: 'Hand warmers', category: 'miscellaneous', quantity: 2, thoroughnessLevel: 'thorough' },
      { name: 'Foldable shopping bag', category: 'miscellaneous', quantity: 1, thoroughnessLevel: 'balanced' },
      { name: 'Travel journal', category: 'miscellaneous', quantity: 1, thoroughnessLevel: 'balanced' },
      { name: 'Lip balm with SPF', category: 'toiletries', quantity: 1 },
      { name: 'Hand cream', category: 'toiletries', quantity: 1 },
      { name: 'Tissues', category: 'toiletries', quantity: 2 },
      { name: 'Comfortable socks', category: 'clothes', quantity: 5 },
      { name: 'Undergarments', category: 'clothes', quantity: 5 },
      { name: 'Sweater', category: 'clothes', quantity: 1 },
      { name: 'Dressy shoes', category: 'clothes', quantity: 1 },
    ],
  },
  {
    id: 'tokyo-exploration',
    name: 'Tokyo City Experience',
    description: 'Exploring modern and traditional Tokyo.',
    destinationType: 'city',
    season: 'spring',
    items: [
      { name: 'Comfortable walking shoes', category: 'clothes', quantity: 1 },
      { name: 'Light layers', category: 'clothes', quantity: 4 },
      { name: 'JR Pass', category: 'documents', quantity: 1 },
      { name: 'Portable wifi device', category: 'electronics', quantity: 1 },
      { name: 'Translation app', category: 'electronics', quantity: 1 },
      { name: 'Cash wallet', category: 'miscellaneous', quantity: 1 },
      { name: 'Pocket tissues', category: 'toiletries', quantity: 5 },
      { name: 'Hand towel', category: 'toiletries', quantity: 2 },
      { name: 'Face mask', category: 'toiletries', quantity: 5 },
      { name: 'Respectful clothing', category: 'clothes', quantity: 3 },
      { name: 'Temple visit outfit', category: 'clothes', quantity: 1 },
      { name: 'Portable charger', category: 'electronics', quantity: 1 },
      { name: 'Camera', category: 'electronics', quantity: 1 },
      { name: 'Umbrella', category: 'miscellaneous', quantity: 1 },
      { name: 'Daypack', category: 'miscellaneous', quantity: 1 },
      { name: 'Guidebook', category: 'documents', quantity: 1 },
      { name: 'Business cards', category: 'documents', quantity: 10, thoroughnessLevel: 'balanced' },
      { name: 'Gift for hosts', category: 'miscellaneous', quantity: 2, thoroughnessLevel: 'thorough' },
      { name: 'Comfortable socks', category: 'clothes', quantity: 5 },
      { name: 'Undergarments', category: 'clothes', quantity: 5 },
      { name: 'Light jacket', category: 'clothes', quantity: 1 },
      { name: 'Casual pants', category: 'clothes', quantity: 3 },
      { name: 'Shirts', category: 'clothes', quantity: 4 },
      { name: 'Dress shoes', category: 'clothes', quantity: 1 },
      { name: 'Slippers', category: 'clothes', quantity: 1 },
      { name: 'Hand sanitizer', category: 'toiletries', quantity: 1 },
    ],
  },
  {
    id: 'new-york-city',
    name: 'New York City Adventure',
    description: 'Urban exploration in the Big Apple.',
    destinationType: 'city',
    season: 'fall',
    items: [
      { name: 'Comfortable walking shoes', category: 'clothes', quantity: 1 },
      { name: 'Warm jacket', category: 'clothes', quantity: 1 },
      { name: 'Layers clothing', category: 'clothes', quantity: 4 },
      { name: 'Jeans', category: 'clothes', quantity: 2 },
      { name: 'Sweaters', category: 'clothes', quantity: 2 },
      { name: 'MetroCard/OMNY card', category: 'documents', quantity: 1 },
      { name: 'City guidebook', category: 'documents', quantity: 1 },
      { name: 'Portable charger', category: 'electronics', quantity: 1 },
      { name: 'Camera', category: 'electronics', quantity: 1 },
      { name: 'Crossbody bag', category: 'miscellaneous', quantity: 1 },
      { name: 'Umbrella', category: 'miscellaneous', quantity: 1 },
      { name: 'Hand sanitizer', category: 'toiletries', quantity: 1 },
      { name: 'Broadway show tickets', category: 'documents', quantity: 1, thoroughnessLevel: 'balanced' },
      { name: 'Nice dinner outfit', category: 'clothes', quantity: 1 },
      { name: 'Casual shirts', category: 'clothes', quantity: 3 },
      { name: 'Comfortable socks', category: 'clothes', quantity: 5 },
      { name: 'Undergarments', category: 'clothes', quantity: 5 },
      { name: 'Scarf', category: 'clothes', quantity: 1 },
      { name: 'Gloves', category: 'clothes', quantity: 1 },
      { name: 'Hat', category: 'clothes', quantity: 1 },
      { name: 'Backup phone battery', category: 'electronics', quantity: 1 },
      { name: 'Headphones', category: 'electronics', quantity: 1 },
      { name: 'Snacks', category: 'miscellaneous', quantity: 3 },
      { name: 'Water bottle', category: 'miscellaneous', quantity: 1 },
      { name: 'Tissues', category: 'toiletries', quantity: 2 },
      { name: 'Lip balm', category: 'toiletries', quantity: 1 },
    ],
  },
  {
    id: 'ski-trip',
    name: 'Ski Trip Essentials',
    description: 'Everything you need for a winter ski adventure.',
    destinationType: 'mountain',
    season: 'winter',
    items: [
      { name: 'Ski jacket', category: 'clothes', quantity: 1 },
      { name: 'Ski pants', category: 'clothes', quantity: 1 },
      { name: 'Thermal underwear', category: 'clothes', quantity: 3 },
      { name: 'Ski gloves', category: 'clothes', quantity: 2 },
      { name: 'Ski goggles', category: 'miscellaneous', quantity: 1 },
      { name: 'Ski helmet', category: 'miscellaneous', quantity: 1 },
      { name: 'Ski socks', category: 'clothes', quantity: 7 },
      { name: 'Après-ski boots', category: 'clothes', quantity: 1 },
      { name: 'Warm sweater', category: 'clothes', quantity: 3 },
      { name: 'Fleece jacket', category: 'clothes', quantity: 1 },
      { name: 'Ski mask/balaclava', category: 'clothes', quantity: 1 },
      { name: 'Hand warmers', category: 'miscellaneous', quantity: 10 },
      { name: 'Foot warmers', category: 'miscellaneous', quantity: 5 },
      { name: 'Lip balm with SPF', category: 'toiletries', quantity: 1 },
      { name: 'Sunscreen', category: 'toiletries', quantity: 1 },
      { name: 'Moisturizer', category: 'toiletries', quantity: 1 },
      { name: 'Ski lift tickets', category: 'documents', quantity: 1 },
      { name: 'Ski equipment rental confirmation', category: 'documents', quantity: 1 },
      { name: 'Emergency contact info', category: 'documents', quantity: 1 },
      { name: 'Portable charger', category: 'electronics', quantity: 1 },
      { name: 'Waterproof phone case', category: 'electronics', quantity: 1 },
      { name: 'Action camera', category: 'electronics', quantity: 1, thoroughnessLevel: 'balanced' },
      { name: 'Casual wear for evening', category: 'clothes', quantity: 3 },
      { name: 'Warm pajamas', category: 'clothes', quantity: 2 },
      { name: 'Slippers', category: 'clothes', quantity: 1 },
    ],
  },
  {
    id: 'business-trip',
    name: 'Business Trip Professional',
    description: 'Professional attire and essentials for business travel.',
    destinationType: 'business',
    season: 'all',
    items: [
      { name: 'Business suit', category: 'clothes', quantity: 2 },
      { name: 'Dress shirts', category: 'clothes', quantity: 4 },
      { name: 'Ties', category: 'clothes', quantity: 3 },
      { name: 'Dress shoes', category: 'clothes', quantity: 2 },
      { name: 'Dress socks', category: 'clothes', quantity: 5 },
      { name: 'Belt', category: 'clothes', quantity: 1 },
      { name: 'Business cards', category: 'documents', quantity: 50 },
      { name: 'Laptop', category: 'electronics', quantity: 1 },
      { name: 'Laptop charger', category: 'electronics', quantity: 1 },
      { name: 'Presentation materials', category: 'documents', quantity: 1 },
      { name: 'Portfolio/briefcase', category: 'miscellaneous', quantity: 1 },
      { name: 'Travel adapter', category: 'electronics', quantity: 1 },
      { name: 'Portable charger', category: 'electronics', quantity: 1 },
      { name: 'Cufflinks', category: 'miscellaneous', quantity: 1, thoroughnessLevel: 'balanced' },
      { name: 'Pocket square', category: 'clothes', quantity: 2, thoroughnessLevel: 'balanced' },
      { name: 'Dress watch', category: 'miscellaneous', quantity: 1 },
      { name: 'Garment bag', category: 'miscellaneous', quantity: 1 },
      { name: 'Shoe polish', category: 'miscellaneous', quantity: 1 },
      { name: 'Lint roller', category: 'miscellaneous', quantity: 1 },
      { name: 'Hand sanitizer', category: 'toiletries', quantity: 1 },
      { name: 'Breath mints', category: 'toiletries', quantity: 1 },
      { name: 'Professional headshots', category: 'documents', quantity: 5, thoroughnessLevel: 'thorough' },
      { name: 'Company ID/badge', category: 'documents', quantity: 1 },
      { name: 'Travel itinerary', category: 'documents', quantity: 1 },
      { name: 'Meeting notes', category: 'documents', quantity: 1 },
    ],
  },
];

export const PremadeListsModal: React.FC<PremadeListsModalProps> = ({
  isOpen,
  onClose,
  onAddItems,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedList, setSelectedList] = useState<PremadeList | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [tripLength, setTripLength] = useState(7);
  const [packingStyle, setPackingStyle] = useState<'light' | 'balanced' | 'thorough'>('balanced');
  const [selectedFilters, setSelectedFilters] = useState<Set<string>>(new Set());

  const filterOptions = [
    { id: 'beach', label: 'Beach', icon: '🏖️' },
    { id: 'city', label: 'City', icon: '🏙️' },
    { id: 'mountain', label: 'Mountain', icon: '🏔️' },
    { id: 'adventure', label: 'Adventure', icon: '🎒' },
    { id: 'business', label: 'Business', icon: '💼' },
    { id: 'summer', label: 'Summer', icon: '☀️' },
    { id: 'winter', label: 'Winter', icon: '❄️' },
    { id: 'spring', label: 'Spring', icon: '🌸' },
    { id: 'fall', label: 'Fall', icon: '🍂' },
  ];

  const filteredLists = premadeLists.filter(list => {
    const matchesSearch = list.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         list.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilters = selectedFilters.size === 0 || 
                          Array.from(selectedFilters).some(filter => 
                            list.destinationType.includes(filter) ||
                            list.season?.includes(filter) ||
                            list.name.toLowerCase().includes(filter)
                          );
    
    return matchesSearch && matchesFilters;
  });

  const toggleFilter = (filterId: string) => {
    const newFilters = new Set(selectedFilters);
    if (newFilters.has(filterId)) {
      newFilters.delete(filterId);
    } else {
      newFilters.add(filterId);
    }
    setSelectedFilters(newFilters);
  };

  const getFilteredItems = (list: PremadeList) => {
    return list.items.filter(item => {
      // Filter by thoroughness level
      if (item.thoroughnessLevel) {
        const levels = { light: 1, balanced: 2, thorough: 3 };
        if (levels[item.thoroughnessLevel] > levels[packingStyle]) {
          return false;
        }
      }
      
      return true;
    }).map(item => ({
      ...item,
      quantity: item.perDay ? 
        Math.max(1, Math.floor((item.baseQuantity || item.quantity || 1) * tripLength / 7)) :
        item.quantity || 1
    }));
  };

  const handleAddToTrip = (list: PremadeList) => {
    const filteredItems = getFilteredItems(list);
    onAddItems(filteredItems);
    onClose();
  };

  const handlePreviewList = (list: PremadeList) => {
    setSelectedList(list);
    setPreviewMode(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full p-2">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Smart Packing Lists</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {!previewMode ? `${filteredLists.length} lists available` : 'Preview mode'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {previewMode && (
              <Button
                variant="ghost"
                onClick={() => setPreviewMode(false)}
                className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
              >
                Back to Lists
              </Button>
            )}
            <Button variant="ghost" onClick={onClose} className="rounded-full h-8 w-8 p-0">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {!previewMode ? (
            <div className="p-6 h-full flex flex-col">
              {/* Search and Filters */}
              <div className="space-y-4 mb-4 shrink-0">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search packing lists..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Filter Buttons */}
                <div className="flex flex-wrap gap-2">
                  {filterOptions.map((filter) => (
                    <Button
                      key={filter.id}
                      variant={selectedFilters.has(filter.id) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleFilter(filter.id)}
                      className="h-8 px-3 text-xs"
                    >
                      <span className="mr-1">{filter.icon}</span>
                      {filter.label}
                    </Button>
                  ))}
                </div>

                {/* Trip Settings */}
                <div className="flex gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span>Trip length:</span>
                    <Input
                      type="number"
                      value={tripLength}
                      onChange={(e) => setTripLength(parseInt(e.target.value) || 7)}
                      className="w-16 h-8 text-center"
                      min="1"
                      max="30"
                    />
                    <span>days</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span>Packing style:</span>
                    <select
                      value={packingStyle}
                      onChange={(e) => setPackingStyle(e.target.value as 'light' | 'balanced' | 'thorough')}
                      className="h-8 px-2 border rounded text-sm bg-white dark:bg-gray-800"
                    >
                      <option value="light">Light</option>
                      <option value="balanced">Balanced</option>
                      <option value="thorough">Thorough</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Lists Grid with Scroll */}
              <ScrollArea className="flex-1">
                <div className="grid gap-4 pr-4">
                  {filteredLists.map((list) => (
                    <motion.div
                      key={list.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-2">
                            {list.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                            {list.description}
                          </p>
                          <div className="flex gap-2">
                            <Badge variant="outline" className="text-xs">
                              {list.destinationType}
                            </Badge>
                            {list.season && (
                              <Badge variant="outline" className="text-xs">
                                {list.season}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {getFilteredItems(list).length} items
                        </span>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handlePreviewList(list)}
                            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
                          >
                            Preview
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleAddToTrip(list)}
                            className="bg-blue-500 hover:bg-blue-600 text-white"
                          >
                            Add Items
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {filteredLists.length === 0 && (
                    <div className="text-center py-12">
                      <Sparkles className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 dark:text-gray-400">
                        No packing lists found matching your criteria.
                      </p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
          ) : (
            /* Preview Mode */
            <div className="p-6 h-full flex flex-col">
              <div className="mb-6 shrink-0">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {selectedList?.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {selectedList?.description}
                </p>
              </div>

              <ScrollArea className="flex-1">
                <div className="grid gap-3 pr-4">
                  {selectedList && getFilteredItems(selectedList).map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 border-2 border-gray-300 dark:border-gray-600 rounded" />
                        <div>
                          <span className="font-medium text-gray-900 dark:text-white">
                            {item.name}
                          </span>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {item.category}
                            </Badge>
                            {item.quantity && item.quantity > 1 && (
                              <span className="text-xs text-gray-500">
                                Qty: {item.quantity}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 shrink-0">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {selectedList && getFilteredItems(selectedList).length} items total
                  </span>
                  <Button
                    onClick={() => selectedList && handleAddToTrip(selectedList)}
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    Add All Items
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};