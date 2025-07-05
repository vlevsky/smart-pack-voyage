
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Calendar, Plus, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface PremadeList {
  id: string;
  name: string;
  destination: string;
  destination_type: string;
  season: string | null;
  description: string | null;
  duration_days?: number;
  items: Array<{ name: string; category: string; quantity?: number; luggage?: string }>;
}

interface PremadeListsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddItems: (items: Array<{ name: string; category: string; quantity?: number; luggage?: string }>) => void;
}

// Comprehensive premade lists with detailed items
const comprehensivePremadeLists: PremadeList[] = [
  {
    id: 'hawaii-beach',
    name: 'Hawaii Beach Vacation',
    destination: 'Hawaii',
    destination_type: 'beach',
    season: 'summer',
    description: 'Complete tropical paradise essentials',
    duration_days: 7,
    items: [
      // Clothes
      { name: 'Swimsuits', category: 'clothes', quantity: 3, luggage: 'carry-on' },
      { name: 'Beach Cover-ups', category: 'clothes', quantity: 2, luggage: 'carry-on' },
      { name: 'Flip Flops', category: 'clothes', quantity: 1, luggage: 'checked' },
      { name: 'Sandals', category: 'clothes', quantity: 1, luggage: 'checked' },
      { name: 'Shorts', category: 'clothes', quantity: 4, luggage: 'carry-on' },
      { name: 'T-shirts', category: 'clothes', quantity: 5, luggage: 'carry-on' },
      { name: 'Sundresses', category: 'clothes', quantity: 3, luggage: 'carry-on' },
      { name: 'Light Cardigan', category: 'clothes', quantity: 1, luggage: 'carry-on' },
      { name: 'Underwear', category: 'clothes', quantity: 8, luggage: 'carry-on' },
      { name: 'Pajamas', category: 'clothes', quantity: 2, luggage: 'carry-on' },
      
      // Toiletries
      { name: 'Sunscreen SPF 50+', category: 'toiletries', quantity: 2, luggage: 'carry-on' },
      { name: 'After-sun Aloe Vera', category: 'toiletries', quantity: 1, luggage: 'checked' },
      { name: 'Waterproof Mascara', category: 'toiletries', quantity: 1, luggage: 'personal' },
      { name: 'Lip Balm with SPF', category: 'toiletries', quantity: 2, luggage: 'personal' },
      { name: 'Shampoo & Conditioner', category: 'toiletries', quantity: 1, luggage: 'checked' },
      { name: 'Body Wash', category: 'toiletries', quantity: 1, luggage: 'checked' },
      { name: 'Razor', category: 'toiletries', quantity: 1, luggage: 'checked' },
      { name: 'Toothbrush & Toothpaste', category: 'toiletries', quantity: 1, luggage: 'carry-on' },
      
      // Electronics
      { name: 'Waterproof Phone Case', category: 'electronics', quantity: 1, luggage: 'personal' },
      { name: 'Portable Charger', category: 'electronics', quantity: 1, luggage: 'personal' },
      { name: 'Underwater Camera', category: 'electronics', quantity: 1, luggage: 'carry-on' },
      { name: 'Phone Charger', category: 'electronics', quantity: 1, luggage: 'carry-on' },
      { name: 'Bluetooth Speaker', category: 'electronics', quantity: 1, luggage: 'checked' },
      
      // Documents
      { name: 'Passport', category: 'documents', quantity: 1, luggage: 'personal' },
      { name: 'Flight Tickets', category: 'documents', quantity: 1, luggage: 'personal' },
      { name: 'Hotel Confirmation', category: 'documents', quantity: 1, luggage: 'personal' },
      { name: 'Travel Insurance', category: 'documents', quantity: 1, luggage: 'personal' },
      
      // Miscellaneous
      { name: 'Beach Towels', category: 'miscellaneous', quantity: 2, luggage: 'checked' },
      { name: 'Snorkel Gear', category: 'miscellaneous', quantity: 1, luggage: 'checked' },
      { name: 'Beach Bag', category: 'miscellaneous', quantity: 1, luggage: 'checked' },
      { name: 'Sunglasses', category: 'miscellaneous', quantity: 2, luggage: 'personal' },
      { name: 'Sun Hat', category: 'miscellaneous', quantity: 1, luggage: 'carry-on' },
      { name: 'Books/E-reader', category: 'miscellaneous', quantity: 2, luggage: 'carry-on' },
      { name: 'Travel Pillow', category: 'miscellaneous', quantity: 1, luggage: 'personal' },
    ]
  },
  
  {
    id: 'paris-city',
    name: 'Paris City Break',
    destination: 'Paris',
    destination_type: 'city',
    season: 'spring',
    description: 'Sophisticated essentials for the City of Light',
    duration_days: 5,
    items: [
      // Clothes
      { name: 'Comfortable Walking Shoes', category: 'clothes', quantity: 1, luggage: 'carry-on' },
      { name: 'Dress Shoes', category: 'clothes', quantity: 1, luggage: 'checked' },
      { name: 'Jeans', category: 'clothes', quantity: 2, luggage: 'carry-on' },
      { name: 'Dress Pants', category: 'clothes', quantity: 1, luggage: 'carry-on' },
      { name: 'Nice Shirts/Blouses', category: 'clothes', quantity: 3, luggage: 'carry-on' },
      { name: 'Sweater/Cardigan', category: 'clothes', quantity: 2, luggage: 'carry-on' },
      { name: 'Light Jacket', category: 'clothes', quantity: 1, luggage: 'carry-on' },
      { name: 'Scarf', category: 'clothes', quantity: 1, luggage: 'carry-on' },
      { name: 'Underwear', category: 'clothes', quantity: 6, luggage: 'carry-on' },
      { name: 'Socks', category: 'clothes', quantity: 6, luggage: 'carry-on' },
      
      // Electronics
      { name: 'EU Travel Adapter', category: 'electronics', quantity: 1, luggage: 'carry-on' },
      { name: 'Camera', category: 'electronics', quantity: 1, luggage: 'carry-on' },
      { name: 'Phone Charger', category: 'electronics', quantity: 1, luggage: 'carry-on' },
      { name: 'Portable Charger', category: 'electronics', quantity: 1, luggage: 'personal' },
      
      // Documents
      { name: 'Passport', category: 'documents', quantity: 1, luggage: 'personal' },
      { name: 'Metro Map', category: 'documents', quantity: 1, luggage: 'personal' },
      { name: 'Museum Passes', category: 'documents', quantity: 1, luggage: 'personal' },
      
      // Miscellaneous
      { name: 'Compact Umbrella', category: 'miscellaneous', quantity: 1, luggage: 'carry-on' },
      { name: 'Crossbody Bag', category: 'miscellaneous', quantity: 1, luggage: 'carry-on' },
      { name: 'Travel Guide', category: 'miscellaneous', quantity: 1, luggage: 'carry-on' },
      { name: 'French Phrasebook', camera: 'miscellaneous', quantity: 1, luggage: 'personal' },
    ]
  },

  {
    id: 'tokyo-urban',
    name: 'Tokyo Urban Explorer',
    destination: 'Tokyo',
    destination_type: 'city',
    season: 'spring',
    description: 'Modern essentials for Japan adventure',
    duration_days: 8,
    items: [
      // Clothes
      { name: 'Comfortable Walking Shoes', category: 'clothes', quantity: 2, luggage: 'carry-on' },
      { name: 'Casual Outfits', category: 'clothes', quantity: 6, luggage: 'carry-on' },
      { name: 'Light Layers', category: 'clothes', quantity: 4, luggage: 'carry-on' },
      { name: 'Rain Jacket', category: 'clothes', quantity: 1, luggage: 'carry-on' },
      { name: 'Underwear', category: 'clothes', quantity: 9, luggage: 'carry-on' },
      { name: 'Socks', category: 'clothes', quantity: 9, luggage: 'carry-on' },
      
      // Electronics
      { name: 'Japan Travel Adapter', category: 'electronics', quantity: 1, luggage: 'carry-on' },
      { name: 'Portable WiFi Device', category: 'electronics', quantity: 1, luggage: 'personal' },
      { name: 'Translation App', category: 'electronics', quantity: 1, luggage: 'personal' },
      { name: 'Camera', category: 'electronics', quantity: 1, luggage: 'carry-on' },
      
      // Toiletries
      { name: 'Face Masks', category: 'toiletries', quantity: 10, luggage: 'carry-on' },
      { name: 'Hand Sanitizer', category: 'toiletries', quantity: 1, luggage: 'personal' },
      
      // Documents
      { name: 'JR Pass', category: 'documents', quantity: 1, luggage: 'personal' },
      { name: 'IC Card', category: 'documents', quantity: 1, luggage: 'personal' },
      
      // Miscellaneous
      { name: 'Cash Wallet', category: 'miscellaneous', quantity: 1, luggage: 'personal' },
      { name: 'Chopsticks (personal)', category: 'miscellaneous', quantity: 1, luggage: 'personal' },
      { name: 'Lightweight Backpack', category: 'miscellaneous', quantity: 1, luggage: 'carry-on' },
    ]
  },

  {
    id: 'nyc-winter',
    name: 'New York City Winter',
    destination: 'New York',
    destination_type: 'city',
    season: 'winter',
    description: 'Big Apple essentials for cold weather exploration',
    duration_days: 4,
    items: [
      // Clothes
      { name: 'Heavy Winter Coat', category: 'clothes', quantity: 1, luggage: 'carry-on' },
      { name: 'Warm Boots', category: 'clothes', quantity: 1, luggage: 'checked' },
      { name: 'Thermal Underwear', category: 'clothes', quantity: 3, luggage: 'carry-on' },
      { name: 'Sweaters', category: 'clothes', quantity: 3, luggage: 'carry-on' },
      { name: 'Jeans', category: 'clothes', quantity: 2, luggage: 'carry-on' },
      { name: 'Warm Hat', category: 'clothes', quantity: 1, luggage: 'personal' },
      { name: 'Gloves', category: 'clothes', quantity: 1, luggage: 'personal' },
      { name: 'Scarf', category: 'clothes', quantity: 1, luggage: 'personal' },
      
      // Documents
      { name: 'MetroCard/OMNY', category: 'documents', quantity: 1, luggage: 'personal' },
      { name: 'Broadway Tickets', category: 'documents', quantity: 1, luggage: 'personal' },
      
      // Miscellaneous
      { name: 'Hand Warmers', category: 'miscellaneous', quantity: 10, luggage: 'personal' },
      { name: 'Crossbody Bag', category: 'miscellaneous', quantity: 1, luggage: 'personal' },
    ]
  },

  {
    id: 'rome-historic',
    name: 'Rome Historical Tour',
    destination: 'Rome',
    destination_type: 'city',
    season: 'fall',
    description: 'Classic essentials for the Eternal City',
    duration_days: 6,
    items: [
      // Clothes
      { name: 'Comfortable Walking Shoes', category: 'clothes', quantity: 2, luggage: 'carry-on' },
      { name: 'Conservative Clothing for Churches', category: 'clothes', quantity: 3, luggage: 'carry-on' },
      { name: 'Light Jacket', category: 'clothes', quantity: 1, luggage: 'carry-on' },
      { name: 'Comfortable Pants', category: 'clothes', quantity: 3, luggage: 'carry-on' },
      { name: 'T-shirts', category: 'clothes', quantity: 5, luggage: 'carry-on' },
      
      // Electronics
      { name: 'EU Travel Adapter', category: 'electronics', quantity: 1, luggage: 'carry-on' },
      { name: 'Camera with Extra Battery', category: 'electronics', quantity: 1, luggage: 'carry-on' },
      
      // Documents
      { name: 'Roma Pass', category: 'documents', quantity: 1, luggage: 'personal' },
      { name: 'Vatican Tickets', category: 'documents', quantity: 1, luggage: 'personal' },
      
      // Miscellaneous
      { name: 'Water Bottle', category: 'miscellaneous', quantity: 1, luggage: 'carry-on' },
      { name: 'Rome Guidebook', category: 'miscellaneous', quantity: 1, luggage: 'carry-on' },
    ]
  },

  {
    id: 'yosemite-camping',
    name: 'Yosemite Camping Adventure',
    destination: 'Yosemite',
    destination_type: 'camping',
    season: 'summer',
    description: 'Complete wilderness camping essentials',
    duration_days: 5,
    items: [
      // Miscellaneous (Camping Gear)
      { name: 'Tent', category: 'miscellaneous', quantity: 1, luggage: 'checked' },
      { name: 'Sleeping Bag', category: 'miscellaneous', quantity: 1, luggage: 'checked' },
      { name: 'Sleeping Pad', category: 'miscellaneous', quantity: 1, luggage: 'checked' },
      { name: 'Camping Stove', category: 'miscellaneous', quantity: 1, luggage: 'checked' },
      { name: 'Cookware Set', category: 'miscellaneous', quantity: 1, luggage: 'checked' },
      { name: 'Water Filter', category: 'miscellaneous', quantity: 1, luggage: 'carry-on' },
      { name: 'Headlamp', category: 'electronics', quantity: 1, luggage: 'carry-on' },
      { name: 'Lantern', category: 'electronics', quantity: 1, luggage: 'checked' },
      { name: 'Multi-tool', category: 'miscellaneous', quantity: 1, luggage: 'checked' },
      
      // Clothes
      { name: 'Hiking Boots', category: 'clothes', quantity: 1, luggage: 'carry-on' },
      { name: 'Hiking Socks', category: 'clothes', quantity: 6, luggage: 'carry-on' },
      { name: 'Quick-dry Shirts', category: 'clothes', quantity: 4, luggage: 'carry-on' },
      { name: 'Hiking Pants', category: 'clothes', quantity: 2, luggage: 'carry-on' },
      { name: 'Rain Gear', category: 'clothes', quantity: 1, luggage: 'carry-on' },
      { name: 'Warm Layers', category: 'clothes', quantity: 2, luggage: 'carry-on' },
      
      // Toiletries
      { name: 'Biodegradable Soap', category: 'toiletries', quantity: 1, luggage: 'carry-on' },
      { name: 'First Aid Kit', category: 'toiletries', quantity: 1, luggage: 'carry-on' },
      { name: 'Insect Repellent', category: 'toiletries', quantity: 1, luggage: 'carry-on' },
      { name: 'Sunscreen', category: 'toiletries', quantity: 1, luggage: 'carry-on' },
      
      // Documents
      { name: 'Park Pass', category: 'documents', quantity: 1, luggage: 'personal' },
      { name: 'Trail Maps', category: 'documents', quantity: 1, luggage: 'personal' },
    ]
  },

  {
    id: 'ski-trip',
    name: 'Alpine Ski Adventure',
    destination: 'Alps',
    destination_type: 'mountains',
    season: 'winter',
    description: 'Complete ski gear for mountain slopes',
    duration_days: 7,
    items: [
      // Clothes
      { name: 'Ski Jacket', category: 'clothes', quantity: 1, luggage: 'checked' },
      { name: 'Ski Pants', category: 'clothes', quantity: 2, luggage: 'checked' },
      { name: 'Thermal Base Layers', category: 'clothes', quantity: 4, luggage: 'carry-on' },
      { name: 'Ski Socks', category: 'clothes', quantity: 8, luggage: 'carry-on' },
      { name: 'Ski Gloves', category: 'clothes', quantity: 2, luggage: 'carry-on' },
      { name: 'Ski Helmet', category: 'miscellaneous', quantity: 1, luggage: 'checked' },
      { name: 'Ski Goggles', category: 'miscellaneous', quantity: 1, luggage: 'carry-on' },
      { name: 'Après-ski Boots', category: 'clothes', quantity: 1, luggage: 'checked' },
      { name: 'Casual Winter Clothes', category: 'clothes', quantity: 5, luggage: 'carry-on' },
      
      // Toiletries
      { name: 'Lip Balm with SPF', category: 'toiletries', quantity: 2, luggage: 'personal' },
      { name: 'Moisturizer', category: 'toiletries', quantity: 1, luggage: 'carry-on' },
      { name: 'Pain Relievers', category: 'toiletries', quantity: 1, luggage: 'personal' },
      
      // Miscellaneous
      { name: 'Hand/Foot Warmers', category: 'miscellaneous', quantity: 20, luggage: 'carry-on' },
      { name: 'Ski Pass Holder', category: 'miscellaneous', quantity: 1, luggage: 'personal' },
      { name: 'Waterproof Glove Liners', category: 'clothes', quantity: 1, luggage: 'carry-on' },
    ]
  },

  {
    id: 'caribbean-cruise',
    name: 'Caribbean Cruise',
    destination: 'Caribbean',
    destination_type: 'cruise',
    season: 'winter',
    description: 'All-inclusive cruise vacation essentials',
    duration_days: 10,
    items: [
      // Clothes
      { name: 'Formal Dinner Outfits', category: 'clothes', quantity: 3, luggage: 'checked' },
      { name: 'Casual Cruise Outfits', category: 'clothes', quantity: 8, luggage: 'carry-on' },
      { name: 'Swimsuits', category: 'clothes', quantity: 4, luggage: 'carry-on' },
      { name: 'Cover-ups', category: 'clothes', quantity: 3, luggage: 'carry-on' },
      { name: 'Comfortable Walking Shoes', category: 'clothes', quantity: 2, luggage: 'carry-on' },
      { name: 'Dress Shoes', category: 'clothes', quantity: 1, luggage: 'checked' },
      { name: 'Flip Flops', category: 'clothes', quantity: 1, luggage: 'carry-on' },
      
      // Toiletries
      { name: 'Motion Sickness Medicine', category: 'toiletries', quantity: 1, luggage: 'personal' },
      { name: 'Sunscreen', category: 'toiletries', quantity: 2, luggage: 'carry-on' },
      { name: 'After-sun Care', category: 'toiletries', quantity: 1, luggage: 'carry-on' },
      
      // Documents
      { name: 'Cruise Documents', category: 'documents', quantity: 1, luggage: 'personal' },
      { name: 'Passport', category: 'documents', quantity: 1, luggage: 'personal' },
      { name: 'Shore Excursion Tickets', category: 'documents', quantity: 1, luggage: 'personal' },
      
      // Miscellaneous
      { name: 'Waterproof Phone Case', category: 'miscellaneous', quantity: 1, luggage: 'personal' },
      { name: 'Beach Bag', category: 'miscellaneous', quantity: 1, luggage: 'checked' },
      { name: 'Formal Accessories', category: 'miscellaneous', quantity: 3, luggage: 'carry-on' },
    ]
  },

  {
    id: 'music-festival',
    name: 'Music Festival Weekend',
    destination: 'Various',
    destination_type: 'festival',
    season: 'summer',
    description: 'Festival survival essentials',
    duration_days: 3,
    items: [
      // Clothes
      { name: 'Comfortable Festival Outfits', category: 'clothes', quantity: 4, luggage: 'backpack' },
      { name: 'Comfortable Shoes', category: 'clothes', quantity: 2, luggage: 'backpack' },
      { name: 'Rain Poncho', category: 'clothes', quantity: 1, luggage: 'backpack' },
      { name: 'Extra Socks & Underwear', category: 'clothes', quantity: 5, luggage: 'backpack' },
      
      // Toiletries
      { name: 'Wet Wipes', category: 'toiletries', quantity: 10, luggage: 'backpack' },
      { name: 'Dry Shampoo', category: 'toiletries', quantity: 1, luggage: 'backpack' },
      { name: 'Sunscreen', category: 'toiletries', quantity: 1, luggage: 'backpack' },
      { name: 'Hand Sanitizer', category: 'toiletries', quantity: 1, luggage: 'backpack' },
      
      // Electronics
      { name: 'Portable Charger', category: 'electronics', quantity: 2, luggage: 'backpack' },
      { name: 'Waterproof Phone Case', category: 'electronics', quantity: 1, luggage: 'backpack' },
      
      // Miscellaneous
      { name: 'Festival Tickets', category: 'documents', quantity: 1, luggage: 'personal' },
      { name: 'Cash in Small Bills', category: 'miscellaneous', quantity: 1, luggage: 'personal' },
      { name: 'Earplugs', category: 'miscellaneous', quantity: 2, luggage: 'personal' },
      { name: 'Bandana', category: 'miscellaneous', quantity: 2, luggage: 'backpack' },
    ]
  },

  {
    id: 'business-trip',
    name: 'Business Trip',
    destination: 'Various',
    destination_type: 'business',
    season: 'all',
    description: 'Professional travel essentials',
    duration_days: 3,
    items: [
      // Clothes
      { name: 'Business Suits', category: 'clothes', quantity: 2, luggage: 'carry-on' },
      { name: 'Dress Shirts', category: 'clothes', quantity: 4, luggage: 'carry-on' },
      { name: 'Business Shoes', category: 'clothes', quantity: 1, luggage: 'carry-on' },
      { name: 'Ties', category: 'clothes', quantity: 3, luggage: 'carry-on' },
      { name: 'Belt', category: 'clothes', quantity: 1, luggage: 'carry-on' },
      { name: 'Casual Business Attire', category: 'clothes', quantity: 2, luggage: 'carry-on' },
      
      // Electronics
      { name: 'Laptop', category: 'electronics', quantity: 1, luggage: 'personal' },
      { name: 'Laptop Charger', category: 'electronics', quantity: 1, luggage: 'personal' },
      { name: 'Business Cards', category: 'documents', quantity: 50, luggage: 'personal' },
      { name: 'Presentation Materials', category: 'documents', quantity: 1, luggage: 'personal' },
      
      // Miscellaneous
      { name: 'Portfolio/Briefcase', category: 'miscellaneous', quantity: 1, luggage: 'personal' },
      { name: 'Professional Pen', category: 'miscellaneous', quantity: 2, luggage: 'personal' },
    ]
  }
];

export const PremadeListsModal: React.FC<PremadeListsModalProps> = ({
  isOpen,
  onClose,
  onAddItems,
}) => {
  const [premadeLists, setPremadeLists] = useState<PremadeList[]>(comprehensivePremadeLists);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      fetchPremadeLists();
    }
  }, [isOpen]);

  const fetchPremadeLists = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('premade_lists')
        .select('*')
        .eq('is_public', true)
        .order('name');

      if (error) {
        console.log('Using offline premade lists');
        return;
      }
      
      if (data && data.length > 0) {
        const parsedData = data.map(list => ({
          ...list,
          items: typeof list.items === 'string' ? JSON.parse(list.items) : list.items
        }));
        setPremadeLists([...comprehensivePremadeLists, ...parsedData]);
      }
    } catch (error: any) {
      console.log('Using offline premade lists');
    } finally {
      setLoading(false);
    }
  };

  const categories = ['all', 'city', 'beach', 'mountains', 'camping', 'cruise', 'festival', 'business'];
  
  const filteredLists = premadeLists.filter(list => {
    const matchesSearch = list.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         list.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         list.destination_type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || list.destination_type === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddList = (list: PremadeList) => {
    onAddItems(list.items);
    toast({
      title: "Items added! ✨",
      description: `${list.items.length} items from "${list.name}" added to your list.`,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white dark:bg-gray-900 rounded-3xl p-6 max-w-5xl w-full max-h-[85vh] overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Smart Packing Lists ✨
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Pre-built lists tailored for your destination
              </p>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="rounded-full h-10 w-10">
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search destinations, cities, or activities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 rounded-xl border-gray-200 dark:border-gray-700"
              />
            </div>
            
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="rounded-full capitalize"
                >
                  {category === 'all' ? 'All' : category}
                </Button>
              ))}
            </div>
          </div>

          {/* Lists Grid */}
          <div className="overflow-y-auto max-h-96 pr-2">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="text-gray-500 mt-2">Loading amazing lists...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredLists.map((list) => (
                  <motion.div
                    key={list.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 hover:shadow-lg transition-all duration-200 border border-gray-200 dark:border-gray-600"
                  >
                    {/* List Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2">
                          {list.name}
                        </h3>
                        <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300 mb-2">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{list.destination}</span>
                          </div>
                          {list.season && (
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span className="capitalize">{list.season}</span>
                            </div>
                          )}
                          {list.duration_days && (
                            <Badge variant="secondary" className="text-xs">
                              {list.duration_days} days
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <Button
                        onClick={() => handleAddList(list)}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl px-6 py-2 shadow-lg"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add All
                      </Button>
                    </div>
                    
                    {/* Description */}
                    {list.description && (
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                        {list.description}
                      </p>
                    )}
                    
                    {/* Items Preview */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {list.items.length} carefully selected items
                        </span>
                      </div>
                      
                      {/* Category breakdown */}
                      <div className="flex flex-wrap gap-2">
                        {Array.from(new Set(list.items.map(item => item.category))).map((category) => {
                          const count = list.items.filter(item => item.category === category).length;
                          return (
                            <Badge key={category} variant="outline" className="text-xs capitalize">
                              {category} ({count})
                            </Badge>
                          );
                        })}
                      </div>
                      
                      {/* Sample items */}
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-medium">Includes: </span>
                        {list.items.slice(0, 4).map(item => item.name).join(', ')}
                        {list.items.length > 4 && ` and ${list.items.length - 4} more...`}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
            
            {!loading && filteredLists.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">No lists found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
