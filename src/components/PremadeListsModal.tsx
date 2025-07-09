import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, X, Search, Calendar, Users, Thermometer, Globe, Plane, Car, MapPin, Mountain, Building, Briefcase, UtensilsCrossed, Camera, Music, Heart, Zap, Shield, Package, Award, Star, Crown, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
  duration?: string;
  icon?: any;
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
    name: 'Hawaii Beach Paradise',
    description: 'Complete beach vacation essentials for tropical Hawaiian islands',
    destinationType: 'beach',
    season: 'summer',
    duration: '7-14 days',
    icon: '🏖️',
    items: [
      { name: 'Swimsuit', category: 'clothes', quantity: 3 },
      { name: 'Beach cover-up', category: 'clothes', quantity: 2 },
      { name: 'Sunscreen SPF 50+', category: 'toiletries', quantity: 2 },
      { name: 'Reef-safe sunscreen', category: 'toiletries', quantity: 1 },
      { name: 'Sunglasses', category: 'miscellaneous', quantity: 2 },
      { name: 'Beach towel', category: 'miscellaneous', quantity: 2 },
      { name: 'Flip flops', category: 'clothes', quantity: 1 },
      { name: 'Water shoes', category: 'clothes', quantity: 1 },
      { name: 'Beach shorts', category: 'clothes', quantity: 5 },
      { name: 'Tank tops', category: 'clothes', quantity: 6 },
      { name: 'Summer dress', category: 'clothes', quantity: 3 },
      { name: 'Waterproof phone case', category: 'electronics', quantity: 1 },
      { name: 'Beach bag', category: 'miscellaneous', quantity: 1 },
      { name: 'After-sun lotion', category: 'toiletries', quantity: 1 },
      { name: 'Aloe vera gel', category: 'toiletries', quantity: 1 },
      { name: 'Sun hat', category: 'clothes', quantity: 1 },
      { name: 'Snorkeling gear', category: 'miscellaneous', quantity: 1 },
      { name: 'Underwater camera', category: 'electronics', quantity: 1 },
      { name: 'Beach umbrella', category: 'miscellaneous', quantity: 1 },
      { name: 'Cooling towel', category: 'miscellaneous', quantity: 1 },
      { name: 'Portable fan', category: 'electronics', quantity: 1 },
      { name: 'Beach volleyball', category: 'miscellaneous', quantity: 1 },
      { name: 'Insulated water bottle', category: 'miscellaneous', quantity: 2 },
      { name: 'Light cardigan', category: 'clothes', quantity: 1 },
      { name: 'Waterproof watch', category: 'miscellaneous', quantity: 1 },
    ],
  },
  {
    id: 'caribbean-cruise',
    name: 'Caribbean Cruise Adventure',
    description: 'Perfect cruise packing with shore excursion gear',
    destinationType: 'cruise',
    season: 'summer',
    duration: '7-10 days',
    icon: '🚢',
    items: [
      { name: 'Formal dinner attire', category: 'clothes', quantity: 3 },
      { name: 'Resort casual wear', category: 'clothes', quantity: 5 },
      { name: 'Swimwear', category: 'clothes', quantity: 4 },
      { name: 'Beach coverups', category: 'clothes', quantity: 2 },
      { name: 'Comfortable walking shoes', category: 'clothes', quantity: 2 },
      { name: 'Dress shoes', category: 'clothes', quantity: 1 },
      { name: 'Sandals', category: 'clothes', quantity: 2 },
      { name: 'Sun protection hat', category: 'clothes', quantity: 1 },
      { name: 'Light jacket for AC', category: 'clothes', quantity: 1 },
      { name: 'Sunscreen', category: 'toiletries', quantity: 3 },
      { name: 'Motion sickness medication', category: 'toiletries', quantity: 1 },
      { name: 'Reef-safe sunscreen', category: 'toiletries', quantity: 1 },
      { name: 'After-sun care', category: 'toiletries', quantity: 1 },
      { name: 'Waterproof phone case', category: 'electronics', quantity: 1 },
      { name: 'Portable charger', category: 'electronics', quantity: 1 },
      { name: 'Underwater camera', category: 'electronics', quantity: 1 },
      { name: 'Beach bag', category: 'miscellaneous', quantity: 1 },
      { name: 'Day backpack', category: 'miscellaneous', quantity: 1 },
      { name: 'Water bottle', category: 'miscellaneous', quantity: 2 },
      { name: 'Snorkeling gear', category: 'miscellaneous', quantity: 1 },
      { name: 'Cruise documents', category: 'documents', quantity: 1 },
      { name: 'Passport', category: 'documents', quantity: 1 },
      { name: 'Travel insurance docs', category: 'documents', quantity: 1 },
      { name: 'Shore excursion tickets', category: 'documents', quantity: 1 },
      { name: 'Binoculars for whale watching', category: 'miscellaneous', quantity: 1 },
    ],
  },
  {
    id: 'maldives-luxury',
    name: 'Maldives Luxury Resort',
    description: 'Upscale tropical paradise with overwater bungalows',
    destinationType: 'beach',
    season: 'summer',
    duration: '5-10 days',
    icon: '🏝️',
    items: [
      { name: 'Designer swimwear', category: 'clothes', quantity: 4 },
      { name: 'Silk cover-ups', category: 'clothes', quantity: 3 },
      { name: 'Evening resort wear', category: 'clothes', quantity: 3 },
      { name: 'Luxury sunscreen', category: 'toiletries', quantity: 2 },
      { name: 'Designer sunglasses', category: 'miscellaneous', quantity: 2 },
      { name: 'Resort sandals', category: 'clothes', quantity: 2 },
      { name: 'Underwater camera', category: 'electronics', quantity: 1 },
      { name: 'Snorkeling set', category: 'miscellaneous', quantity: 1 },
      { name: 'Beach jewelry', category: 'miscellaneous', quantity: 1 },
      { name: 'Resort bag', category: 'miscellaneous', quantity: 1 },
      { name: 'Premium toiletries', category: 'toiletries', quantity: 1 },
      { name: 'Silk pajamas', category: 'clothes', quantity: 2 },
      { name: 'Resort shoes', category: 'clothes', quantity: 2 },
      { name: 'Sun protection clothing', category: 'clothes', quantity: 2 },
      { name: 'Waterproof jewelry', category: 'miscellaneous', quantity: 1 },
      { name: 'Resort spa wear', category: 'clothes', quantity: 2 },
      { name: 'Champagne flutes', category: 'miscellaneous', quantity: 2 },
      { name: 'Private dining attire', category: 'clothes', quantity: 2 },
      { name: 'Seaplane outfit', category: 'clothes', quantity: 1 },
      { name: 'Sunset cocktail wear', category: 'clothes', quantity: 3 },
      { name: 'Designer beach hat', category: 'clothes', quantity: 1 },
      { name: 'Luxury face masks', category: 'toiletries', quantity: 3 },
      { name: 'High-end moisturizer', category: 'toiletries', quantity: 1 },
      { name: 'Expensive perfume', category: 'toiletries', quantity: 1 },
      { name: 'Gourmet snacks', category: 'miscellaneous', quantity: 5 },
    ],
  },
  
  // City Break Destinations
  {
    id: 'paris-romance',
    name: 'Paris Romantic Getaway',
    description: 'Sophisticated city break exploring art, culture, and cuisine',
    destinationType: 'city',
    season: 'spring',
    duration: '4-7 days',
    icon: '🗼',
    items: [
      { name: 'Comfortable walking shoes', category: 'clothes', quantity: 2 },
      { name: 'Stylish boots', category: 'clothes', quantity: 1 },
      { name: 'Light trench coat', category: 'clothes', quantity: 1 },
      { name: 'Elegant dresses', category: 'clothes', quantity: 3 },
      { name: 'Nice jeans', category: 'clothes', quantity: 2 },
      { name: 'Blouses', category: 'clothes', quantity: 4 },
      { name: 'Scarf collection', category: 'clothes', quantity: 3 },
      { name: 'Evening wear', category: 'clothes', quantity: 2 },
      { name: 'French phrasebook', category: 'documents', quantity: 1 },
      { name: 'Museum passes', category: 'documents', quantity: 1 },
      { name: 'Crossbody bag', category: 'miscellaneous', quantity: 1 },
      { name: 'Umbrella', category: 'miscellaneous', quantity: 1 },
      { name: 'Portable charger', category: 'electronics', quantity: 1 },
      { name: 'Camera', category: 'electronics', quantity: 1 },
      { name: 'Travel adapter', category: 'electronics', quantity: 1 },
      { name: 'Hand cream', category: 'toiletries', quantity: 1 },
      { name: 'Lip balm', category: 'toiletries', quantity: 1 },
      { name: 'Comfortable undergarments', category: 'clothes', quantity: 6 },
      { name: 'Light sweater', category: 'clothes', quantity: 2 },
      { name: 'Metro pass', category: 'documents', quantity: 1 },
      { name: 'Perfume', category: 'toiletries', quantity: 1 },
      { name: 'Jewelry', category: 'miscellaneous', quantity: 1 },
      { name: 'Notebook for memories', category: 'miscellaneous', quantity: 1 },
      { name: 'Café guidebook', category: 'documents', quantity: 1 },
      { name: 'Reusable shopping bag', category: 'miscellaneous', quantity: 1 },
    ],
  },
  {
    id: 'tokyo-culture',
    name: 'Tokyo Cultural Immersion',
    description: 'Modern and traditional Japan experience',
    destinationType: 'city',
    season: 'spring',
    duration: '5-10 days',
    icon: '🏯',
    items: [
      { name: 'Comfortable walking shoes', category: 'clothes', quantity: 2 },
      { name: 'Respectful clothing', category: 'clothes', quantity: 5 },
      { name: 'Temple visit attire', category: 'clothes', quantity: 2 },
      { name: 'Casual modern wear', category: 'clothes', quantity: 4 },
      { name: 'Layers for weather', category: 'clothes', quantity: 3 },
      { name: 'JR Pass', category: 'documents', quantity: 1 },
      { name: 'Portable wifi device', category: 'electronics', quantity: 1 },
      { name: 'Translation app', category: 'electronics', quantity: 1 },
      { name: 'Cash wallet', category: 'miscellaneous', quantity: 1 },
      { name: 'Pocket tissues', category: 'toiletries', quantity: 10 },
      { name: 'Hand towel', category: 'toiletries', quantity: 3 },
      { name: 'Face masks', category: 'toiletries', quantity: 10 },
      { name: 'Slippers', category: 'clothes', quantity: 1 },
      { name: 'Guidebook', category: 'documents', quantity: 1 },
      { name: 'Business cards', category: 'documents', quantity: 20 },
      { name: 'Gifts for hosts', category: 'miscellaneous', quantity: 3 },
      { name: 'Daypack', category: 'miscellaneous', quantity: 1 },
      { name: 'Umbrella', category: 'miscellaneous', quantity: 1 },
      { name: 'Portable charger', category: 'electronics', quantity: 1 },
      { name: 'Camera', category: 'electronics', quantity: 1 },
      { name: 'Chopsticks (personal)', category: 'miscellaneous', quantity: 1 },
      { name: 'Suica/Pasmo card', category: 'documents', quantity: 1 },
      { name: 'Socks (remove in temples)', category: 'clothes', quantity: 8 },
      { name: 'Bowing etiquette card', category: 'documents', quantity: 1 },
      { name: 'Shrine offering coins', category: 'miscellaneous', quantity: 1 },
    ],
  },

  // Adventure & Outdoor
  {
    id: 'everest-base-camp',
    name: 'Everest Base Camp Trek',
    description: 'Ultimate high-altitude trekking adventure',
    destinationType: 'adventure',
    season: 'spring',
    duration: '14-21 days',
    icon: '🏔️',
    items: [
      { name: 'Mountaineering boots', category: 'clothes', quantity: 1 },
      { name: 'Crampons', category: 'miscellaneous', quantity: 1 },
      { name: 'Down jacket', category: 'clothes', quantity: 2 },
      { name: 'Base layers', category: 'clothes', quantity: 6 },
      { name: 'Trekking poles', category: 'miscellaneous', quantity: 2 },
      { name: 'Sleeping bag (-20°C)', category: 'miscellaneous', quantity: 1 },
      { name: 'Headlamp', category: 'electronics', quantity: 2 },
      { name: 'Water purification tablets', category: 'toiletries', quantity: 50 },
      { name: 'High-altitude medication', category: 'toiletries', quantity: 1 },
      { name: 'Oxygen meter', category: 'electronics', quantity: 1 },
      { name: 'Emergency whistle', category: 'miscellaneous', quantity: 1 },
      { name: 'Avalanche beacon', category: 'electronics', quantity: 1 },
      { name: 'Thermal underwear', category: 'clothes', quantity: 4 },
      { name: 'Windproof gloves', category: 'clothes', quantity: 3 },
      { name: 'Balaclava', category: 'clothes', quantity: 2 },
      { name: 'Glacier glasses', category: 'miscellaneous', quantity: 2 },
      { name: 'Portable oxygen', category: 'miscellaneous', quantity: 2 },
      { name: 'Emergency shelter', category: 'miscellaneous', quantity: 1 },
      { name: 'High-energy bars', category: 'miscellaneous', quantity: 30 },
      { name: 'Electrolyte supplements', category: 'toiletries', quantity: 20 },
      { name: 'Satellite communicator', category: 'electronics', quantity: 1 },
      { name: 'Rope (dynamic)', category: 'miscellaneous', quantity: 1 },
      { name: 'Carabiners', category: 'miscellaneous', quantity: 10 },
      { name: 'Emergency bivvy', category: 'miscellaneous', quantity: 1 },
      { name: 'Portable weather radio', category: 'electronics', quantity: 1 },
    ],
  },

  // Business Travel
  {
    id: 'business-conference',
    name: 'Executive Business Conference',
    description: 'Professional business travel with meetings and presentations',
    destinationType: 'business',
    season: 'all',
    duration: '3-5 days',
    icon: '💼',
    items: [
      { name: 'Business suits', category: 'clothes', quantity: 3 },
      { name: 'Dress shirts', category: 'clothes', quantity: 5 },
      { name: 'Ties', category: 'clothes', quantity: 4 },
      { name: 'Dress shoes', category: 'clothes', quantity: 2 },
      { name: 'Laptop', category: 'electronics', quantity: 1 },
      { name: 'Presentation remote', category: 'electronics', quantity: 1 },
      { name: 'Business cards', category: 'documents', quantity: 100 },
      { name: 'Portfolio/briefcase', category: 'miscellaneous', quantity: 1 },
      { name: 'Tablet', category: 'electronics', quantity: 1 },
      { name: 'Wireless presenter', category: 'electronics', quantity: 1 },
      { name: 'Power bank', category: 'electronics', quantity: 2 },
      { name: 'Universal adapter', category: 'electronics', quantity: 1 },
      { name: 'Dress belts', category: 'clothes', quantity: 2 },
      { name: 'Cufflinks', category: 'miscellaneous', quantity: 2 },
      { name: 'Pocket square', category: 'clothes', quantity: 3 },
      { name: 'Professional blazer', category: 'clothes', quantity: 2 },
      { name: 'Meeting notes pad', category: 'miscellaneous', quantity: 1 },
      { name: 'Quality pens', category: 'miscellaneous', quantity: 5 },
      { name: 'Conference schedule', category: 'documents', quantity: 1 },
      { name: 'Hotel business cards', category: 'documents', quantity: 10 },
      { name: 'Expense receipts folder', category: 'documents', quantity: 1 },
      { name: 'Networking gift items', category: 'miscellaneous', quantity: 10 },
      { name: 'Professional headshots', category: 'documents', quantity: 5 },
      { name: 'Company brochures', category: 'documents', quantity: 20 },
      { name: 'Lint roller', category: 'miscellaneous', quantity: 1 },
    ],
  },
];

// Airline baggage data
const airlines = [
  {
    id: 'american',
    name: 'American Airlines',
    code: 'AA',
    baggage: {
      carryOn: {
        domestic: { weight: '10 kg', dimensions: '56x36x23 cm' },
        international: { weight: '10 kg', dimensions: '56x36x23 cm' }
      },
      checked: {
        domestic: {
          economy: { weight: '23 kg', dimensions: '158 cm linear', fee: '$30' },
          business: { weight: '32 kg', dimensions: '158 cm linear', fee: 'Free' }
        },
        international: {
          economy: { weight: '23 kg', dimensions: '158 cm linear', fee: 'Free' },
          business: { weight: '32 kg', dimensions: '158 cm linear', fee: 'Free' }
        }
      }
    }
  },
  {
    id: 'delta',
    name: 'Delta Air Lines',
    code: 'DL',
    baggage: {
      carryOn: {
        domestic: { weight: '10 kg', dimensions: '56x35x23 cm' },
        international: { weight: '10 kg', dimensions: '56x35x23 cm' }
      },
      checked: {
        domestic: {
          economy: { weight: '23 kg', dimensions: '158 cm linear', fee: '$30' },
          business: { weight: '32 kg', dimensions: '158 cm linear', fee: 'Free' }
        },
        international: {
          economy: { weight: '23 kg', dimensions: '158 cm linear', fee: 'Free' },
          business: { weight: '32 kg', dimensions: '158 cm linear', fee: 'Free' }
        }
      }
    }
  },
  {
    id: 'united',
    name: 'United Airlines',
    code: 'UA',
    baggage: {
      carryOn: {
        domestic: { weight: '10 kg', dimensions: '56x35x22 cm' },
        international: { weight: '10 kg', dimensions: '56x35x22 cm' }
      },
      checked: {
        domestic: {
          economy: { weight: '23 kg', dimensions: '158 cm linear', fee: '$35' },
          business: { weight: '32 kg', dimensions: '158 cm linear', fee: 'Free' }
        },
        international: {
          economy: { weight: '23 kg', dimensions: '158 cm linear', fee: 'Free' },
          business: { weight: '32 kg', dimensions: '158 cm linear', fee: 'Free' }
        }
      }
    }
  },
];

export const PremadeListsModal: React.FC<PremadeListsModalProps> = ({
  isOpen,
  onClose,
  onAddItems,
}) => {
  const [selectedTab, setSelectedTab] = useState<'smart-lists' | 'baggage-rules'>('smart-lists');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDestination, setSelectedDestination] = useState<string>('all');
  const [selectedSeason, setSelectedSeason] = useState<string>('all');
  const [thoroughnessLevel, setThoroughnessLevel] = useState<'light' | 'balanced' | 'thorough'>('balanced');
  const [previewMode, setPreviewMode] = useState(false);
  const [selectedList, setSelectedList] = useState<PremadeList | null>(null);

  if (!isOpen) return null;

  const destinations = Array.from(new Set(premadeLists.map(list => list.destinationType)));
  const seasons = Array.from(new Set(premadeLists.map(list => list.season).filter(Boolean)));

  const getFilteredItems = (list: PremadeList) => {
    return list.items.filter(item => {
      if (thoroughnessLevel === 'light') {
        return !item.thoroughnessLevel || item.thoroughnessLevel === 'light';
      } else if (thoroughnessLevel === 'balanced') {
        return !item.thoroughnessLevel || item.thoroughnessLevel === 'light' || item.thoroughnessLevel === 'balanced';
      }
      return true;
    });
  };

  const filteredLists = premadeLists.filter(list => {
    const matchesSearch = list.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         list.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDestination = selectedDestination === 'all' || list.destinationType === selectedDestination;
    const matchesSeason = selectedSeason === 'all' || list.season === selectedSeason;
    return matchesSearch && matchesDestination && matchesSeason;
  });

  const filteredAirlines = airlines.filter(airline => 
    airline.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    airline.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToTrip = (list: PremadeList) => {
    const items = getFilteredItems(list).map(item => ({
      name: item.name,
      category: item.category,
      quantity: item.quantity || 1,
    }));
    onAddItems(items);
    onClose();
  };

  const handlePreviewList = (list: PremadeList) => {
    setSelectedList(list);
    setPreviewMode(true);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end justify-center">
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        className="bg-white dark:bg-gray-900 rounded-t-3xl w-full h-[90vh] overflow-hidden relative"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full p-2">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold gradient-text">
                  {selectedTab === 'smart-lists' ? 'Smart Packing Lists' : 'Airline Baggage Rules'}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {selectedTab === 'smart-lists' 
                    ? 'Curated lists for every destination and occasion' 
                    : 'Check baggage allowances and restrictions'
                  }
                </p>
              </div>
            </div>
            <Button variant="ghost" onClick={onClose} className="rounded-full h-8 w-8 p-0">
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Tabs */}
          <Tabs value={selectedTab} onValueChange={(value) => setSelectedTab(value as 'smart-lists' | 'baggage-rules')} className="flex-1 flex flex-col">
            <TabsList className="grid w-full grid-cols-2 mx-4 mt-4">
              <TabsTrigger value="smart-lists" className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Smart Lists
              </TabsTrigger>
              <TabsTrigger value="baggage-rules" className="flex items-center gap-2">
                <Plane className="h-4 w-4" />
                Baggage Rules
              </TabsTrigger>
            </TabsList>

            {/* Smart Lists Tab */}
            <TabsContent value="smart-lists" className="flex-1 flex flex-col m-0">
              {/* Search and Filters */}
              <div className="p-4 space-y-3 border-b border-gray-200 dark:border-gray-700">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search destinations, activities, or styles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-9 text-sm"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <select 
                    value={selectedDestination}
                    onChange={(e) => setSelectedDestination(e.target.value)}
                    className="w-full px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                  >
                    <option value="all">All Destinations</option>
                    {destinations.map(dest => (
                      <option key={dest} value={dest}>{dest}</option>
                    ))}
                  </select>

                  <select 
                    value={selectedSeason}
                    onChange={(e) => setSelectedSeason(e.target.value)}
                    className="w-full px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                  >
                    <option value="all">All Seasons</option>
                    {seasons.map(season => (
                      <option key={season} value={season}>{season}</option>
                    ))}
                  </select>

                  <select 
                    value={thoroughnessLevel}
                    onChange={(e) => setThoroughnessLevel(e.target.value as 'light' | 'balanced' | 'thorough')}
                    className="w-full px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                  >
                    <option value="light">Light</option>
                    <option value="balanced">Balanced</option>
                    <option value="thorough">Everything</option>
                  </select>
                </div>
              </div>

              {/* Lists Grid */}
              <ScrollArea className="flex-1">
                <div className="p-4">
                  <div className="grid gap-3">
                    {filteredLists.map((list) => (
                      <motion.div
                        key={list.id}
                        whileHover={{ scale: 1.01 }}
                        className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-3 shadow-sm hover:shadow-md transition-all"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-lg">{list.icon}</span>
                              <div>
                                <h3 className="font-semibold text-sm text-gray-900 dark:text-white">{list.name}</h3>
                                <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">{list.description}</p>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-1 mb-2">
                              <Badge variant="outline" className="text-xs px-1 py-0.5">
                                {list.destinationType}
                              </Badge>
                              {list.season && (
                                <Badge variant="outline" className="text-xs px-1 py-0.5">
                                  {list.season}
                                </Badge>
                              )}
                              {list.duration && (
                                <Badge variant="outline" className="text-xs px-1 py-0.5">
                                  {list.duration}
                                </Badge>
                              )}
                              <Badge variant="outline" className="text-xs px-1 py-0.5">
                                {getFilteredItems(list).length} items
                              </Badge>
                            </div>
                          </div>
                          <div className="flex gap-1 ml-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handlePreviewList(list)}
                              className="text-xs px-2 py-1 h-7"
                            >
                              Preview
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => handleAddToTrip(list)}
                              className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-2 py-1 h-7"
                            >
                              Add to Trip
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    
                    {filteredLists.length === 0 && (
                      <div className="text-center py-12">
                        <div className="text-6xl mb-4">🧳</div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          No lists found
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          Try adjusting your search or filters
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>

            {/* Baggage Rules Tab */}
            <TabsContent value="baggage-rules" className="flex-1 flex flex-col m-0">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search airlines..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-9 text-sm"
                  />
                </div>
              </div>

              <ScrollArea className="flex-1">
                <div className="p-4">
                  <div className="grid gap-3">
                    {filteredAirlines.map((airline) => (
                      <motion.div
                        key={airline.id}
                        whileHover={{ scale: 1.01 }}
                        className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-3 shadow-sm hover:shadow-md transition-all"
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-1.5">
                            <Plane className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-sm text-gray-900 dark:text-white">{airline.name}</h3>
                            <p className="text-xs text-gray-600 dark:text-gray-400">Code: {airline.code}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <h4 className="font-medium text-xs text-gray-900 dark:text-white mb-2">Carry-On Baggage</h4>
                            <div className="space-y-1 text-xs">
                              <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">Domestic:</span>
                                <span className="text-right">{airline.baggage.carryOn.domestic.weight}, {airline.baggage.carryOn.domestic.dimensions}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">International:</span>
                                <span className="text-right">{airline.baggage.carryOn.international.weight}, {airline.baggage.carryOn.international.dimensions}</span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium text-xs text-gray-900 dark:text-white mb-2">Checked Baggage</h4>
                            <div className="space-y-1 text-xs">
                              <div>
                                <div className="font-medium text-gray-700 dark:text-gray-300">Domestic Economy:</div>
                                <div className="text-gray-600 dark:text-gray-400">
                                  {airline.baggage.checked.domestic.economy.weight}, {airline.baggage.checked.domestic.economy.dimensions} - {airline.baggage.checked.domestic.economy.fee}
                                </div>
                              </div>
                              <div>
                                <div className="font-medium text-gray-700 dark:text-gray-300">International Economy:</div>
                                <div className="text-gray-600 dark:text-gray-400">
                                  {airline.baggage.checked.international.economy.weight}, {airline.baggage.checked.international.economy.dimensions} - {airline.baggage.checked.international.economy.fee}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}

                    {filteredAirlines.length === 0 && (
                      <div className="text-center py-8">
                        <div className="text-4xl mb-3">✈️</div>
                        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                          No airlines found
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Try a different search term
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>

        {/* Preview Modal */}
        {previewMode && selectedList && (
          <div className="absolute inset-0 bg-white dark:bg-gray-900 z-10 flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <span className="text-lg">{selectedList.icon}</span>
                <div className="flex-1">
                  <h3 className="text-base font-bold text-gray-900 dark:text-white">{selectedList.name}</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">{selectedList.description}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => handleAddToTrip(selectedList)}
                  className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-2 py-1 h-7"
                >
                  Add to Trip
                </Button>
                <Button variant="ghost" onClick={() => setPreviewMode(false)} className="h-7 w-7 p-0">
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="p-4">
                <div className="grid gap-2">
                  {getFilteredItems(selectedList).map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <div className="flex-1">
                        <span className="font-medium text-sm text-gray-900 dark:text-white">{item.name}</span>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          Category: {item.category}
                          {item.thoroughnessLevel && ` • ${item.thoroughnessLevel}`}
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs px-1 py-0.5">
                        {item.quantity || 1}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};