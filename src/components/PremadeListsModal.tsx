import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, MapPin, Calendar, Users, Sparkles, Eye, Plus, Minus, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

interface PremadeListsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddItems: (items: Array<{ name: string; category: string; quantity?: number; luggage?: string }>) => void;
}

const smartLists = [
  {
    id: 'hawaii-beach',
    name: 'Hawaii Beach Vacation',
    destination: 'Hawaii',
    type: 'Beach',
    season: 'Summer',
    duration: '7 days',
    description: 'Perfect for tropical beach getaways with sun, surf, and relaxation',
    items: [
      // Clothes
      { name: 'Swimsuit', category: 'clothes', quantity: 2, luggage: 'carry-on', required: true },
      { name: 'Beach cover-up', category: 'clothes', quantity: 2, luggage: 'carry-on', required: true },
      { name: 'Sundresses', category: 'clothes', quantity: 3, luggage: 'checked', required: false },
      { name: 'Shorts', category: 'clothes', quantity: 4, luggage: 'checked', required: true },
      { name: 'Tank tops', category: 'clothes', quantity: 5, luggage: 'checked', required: true },
      { name: 'Light cardigan', category: 'clothes', quantity: 1, luggage: 'carry-on', required: false },
      { name: 'Flip flops', category: 'clothes', quantity: 1, luggage: 'checked', required: true },
      { name: 'Sandals', category: 'clothes', quantity: 1, luggage: 'checked', required: true },
      { name: 'Sun hat', category: 'clothes', quantity: 1, luggage: 'carry-on', required: true },
      { name: 'Underwear', category: 'clothes', quantity: 8, luggage: 'checked', required: true },
      
      // Toiletries
      { name: 'Sunscreen SPF 50+', category: 'toiletries', quantity: 2, luggage: 'checked', required: true },
      { name: 'After-sun lotion', category: 'toiletries', quantity: 1, luggage: 'checked', required: true },
      { name: 'Waterproof mascara', category: 'toiletries', quantity: 1, luggage: 'carry-on', required: false },
      { name: 'Leave-in conditioner', category: 'toiletries', quantity: 1, luggage: 'checked', required: false },
      { name: 'Body wash', category: 'toiletries', quantity: 1, luggage: 'checked', required: true },
      
      // Electronics
      { name: 'Waterproof phone case', category: 'electronics', quantity: 1, luggage: 'carry-on', required: true },
      { name: 'Portable charger', category: 'electronics', quantity: 1, luggage: 'carry-on', required: true },
      { name: 'Camera', category: 'electronics', quantity: 1, luggage: 'carry-on', required: false },
      { name: 'Bluetooth speaker', category: 'electronics', quantity: 1, luggage: 'checked', required: false },
      
      // Documents
      { name: 'Driver\'s license', category: 'documents', quantity: 1, luggage: 'personal', required: true },
      { name: 'Travel insurance', category: 'documents', quantity: 1, luggage: 'personal', required: false },
      
      // Miscellaneous
      { name: 'Beach towel', category: 'miscellaneous', quantity: 2, luggage: 'checked', required: true },
      { name: 'Snorkel gear', category: 'miscellaneous', quantity: 1, luggage: 'checked', required: false },
      { name: 'Beach bag', category: 'miscellaneous', quantity: 1, luggage: 'checked', required: true },
      { name: 'Sunglasses', category: 'miscellaneous', quantity: 1, luggage: 'carry-on', required: true },
    ]
  },
  
  {
    id: 'business-nyc',
    name: 'Business Trip NYC',
    destination: 'New York City',
    type: 'Business',
    season: 'All Season',
    duration: '3 days',
    description: 'Professional attire and essentials for Manhattan business meetings',
    items: [
      // Clothes
      { name: 'Business suits', category: 'clothes', quantity: 2, luggage: 'checked', required: true },
      { name: 'Dress shirts', category: 'clothes', quantity: 3, luggage: 'checked', required: true },
      { name: 'Ties', category: 'clothes', quantity: 3, luggage: 'carry-on', required: true },
      { name: 'Dress shoes', category: 'clothes', quantity: 1, luggage: 'checked', required: true },
      { name: 'Belt', category: 'clothes', quantity: 1, luggage: 'checked', required: true },
      { name: 'Blazer', category: 'clothes', quantity: 1, luggage: 'carry-on', required: true },
      { name: 'Dress pants', category: 'clothes', quantity: 2, luggage: 'checked', required: true },
      { name: 'Underwear', category: 'clothes', quantity: 4, luggage: 'checked', required: true },
      { name: 'Dress socks', category: 'clothes', quantity: 4, luggage: 'checked', required: true },
      
      // Electronics
      { name: 'Laptop', category: 'electronics', quantity: 1, luggage: 'carry-on', required: true },
      { name: 'Laptop charger', category: 'electronics', quantity: 1, luggage: 'carry-on', required: true },
      { name: 'Business cards', category: 'electronics', quantity: 1, luggage: 'personal', required: true },
      { name: 'Presentation remote', category: 'electronics', quantity: 1, luggage: 'carry-on', required: false },
      
      // Documents
      { name: 'Meeting schedules', category: 'documents', quantity: 1, luggage: 'personal', required: true },
      { name: 'Company ID', category: 'documents', quantity: 1, luggage: 'personal', required: true },
      { name: 'Hotel confirmation', category: 'documents', quantity: 1, luggage: 'personal', required: true },
      
      // Toiletries
      { name: 'Professional cologne', category: 'toiletries', quantity: 1, luggage: 'carry-on', required: false },
      { name: 'Hair styling gel', category: 'toiletries', quantity: 1, luggage: 'carry-on', required: false },
      
      // Miscellaneous
      { name: 'Umbrella', category: 'miscellaneous', quantity: 1, luggage: 'checked', required: true },
      { name: 'Portfolio', category: 'miscellaneous', quantity: 1, luggage: 'carry-on', required: true },
    ]
  },

  {
    id: 'music-festival',
    name: 'Music Festival Weekend',
    destination: 'Festival Grounds',
    type: 'Entertainment',
    season: 'Summer',
    duration: '3 days',
    description: 'Everything you need for an epic music festival experience',
    items: [
      // Clothes
      { name: 'Comfortable t-shirts', category: 'clothes', quantity: 4, luggage: 'backpack' },
      { name: 'Shorts', category: 'clothes', quantity: 2, luggage: 'backpack' },
      { name: 'Comfortable sneakers', category: 'clothes', quantity: 1, luggage: 'backpack' },
      { name: 'Rain poncho', category: 'clothes', quantity: 1, luggage: 'backpack' },
      { name: 'Bandana', category: 'clothes', quantity: 2, luggage: 'backpack' },
      { name: 'Hat', category: 'clothes', quantity: 1, luggage: 'backpack' },
      { name: 'Underwear', category: 'clothes', quantity: 4, luggage: 'backpack' },
      { name: 'Socks', category: 'clothes', quantity: 4, luggage: 'backpack' },
      
      // Electronics
      { name: 'Portable phone charger', category: 'electronics', quantity: 2, luggage: 'backpack' },
      { name: 'Charging cables', category: 'electronics', quantity: 2, luggage: 'backpack' },
      { name: 'Waterproof phone pouch', category: 'electronics', quantity: 1, luggage: 'backpack' },
      
      // Toiletries
      { name: 'Wet wipes', category: 'toiletries', quantity: 3, luggage: 'backpack' },
      { name: 'Hand sanitizer', category: 'toiletries', quantity: 1, luggage: 'backpack' },
      { name: 'Sunscreen', category: 'toiletries', quantity: 1, luggage: 'backpack' },
      { name: 'Deodorant', category: 'toiletries', quantity: 1, luggage: 'backpack' },
      
      // Miscellaneous
      { name: 'Reusable water bottle', category: 'miscellaneous', quantity: 1, luggage: 'backpack' },
      { name: 'Earplugs', category: 'miscellaneous', quantity: 1, luggage: 'backpack' },
      { name: 'Cash for vendors', category: 'miscellaneous', quantity: 1, luggage: 'personal' },
      { name: 'Fanny pack', category: 'miscellaneous', quantity: 1, luggage: 'backpack' },
      { name: 'Festival tickets', category: 'miscellaneous', quantity: 1, luggage: 'personal' },
    ]
  },

  {
    id: 'disney-world',
    name: 'Disney World Family Trip',
    destination: 'Orlando, FL',
    type: 'Family',
    season: 'All Season',
    duration: '5 days',
    description: 'Magical family vacation with everything for Disney parks',
    items: [
      // Clothes
      { name: 'Comfortable walking shoes', category: 'clothes', quantity: 2, luggage: 'checked' },
      { name: 'Mickey ears', category: 'clothes', quantity: 4, luggage: 'carry-on' },
      { name: 'Disney t-shirts', category: 'clothes', quantity: 6, luggage: 'checked' },
      { name: 'Shorts', category: 'clothes', quantity: 5, luggage: 'checked' },
      { name: 'Light jacket', category: 'clothes', quantity: 1, luggage: 'carry-on' },
      { name: 'Swimsuit', category: 'clothes', quantity: 2, luggage: 'checked' },
      { name: 'Pajamas', category: 'clothes', quantity: 2, luggage: 'checked' },
      
      // Electronics
      { name: 'Portable chargers', category: 'electronics', quantity: 2, luggage: 'backpack' },
      { name: 'Camera', category: 'electronics', quantity: 1, luggage: 'backpack' },
      { name: 'Disney app downloaded', category: 'electronics', quantity: 1, luggage: 'personal' },
      
      // Documents
      { name: 'Park tickets', category: 'documents', quantity: 1, luggage: 'personal' },
      { name: 'Hotel reservation', category: 'documents', quantity: 1, luggage: 'personal' },
      { name: 'FastPass reservations', category: 'documents', quantity: 1, luggage: 'personal' },
      
      // Miscellaneous
      { name: 'Stroller', category: 'miscellaneous', quantity: 1, luggage: 'checked' },
      { name: 'Snacks', category: 'miscellaneous', quantity: 10, luggage: 'backpack' },
      { name: 'Water bottles', category: 'miscellaneous', quantity: 4, luggage: 'backpack' },
      { name: 'Autograph book', category: 'miscellaneous', quantity: 2, luggage: 'backpack' },
      { name: 'Ponchos', category: 'miscellaneous', quantity: 4, luggage: 'backpack' },
      { name: 'First aid kit', category: 'miscellaneous', quantity: 1, luggage: 'backpack' },
    ]
  },

  {
    id: 'safari-adventure',
    name: 'African Safari',
    destination: 'Kenya/Tanzania',
    type: 'Adventure',
    season: 'Dry Season',
    duration: '10 days',
    description: 'Ultimate safari experience with wildlife viewing essentials',
    items: [
      // Clothes
      { name: 'Khaki pants', category: 'clothes', quantity: 4, luggage: 'checked' },
      { name: 'Long-sleeve shirts', category: 'clothes', quantity: 5, luggage: 'checked' },
      { name: 'Safari hat', category: 'clothes', quantity: 1, luggage: 'carry-on' },
      { name: 'Hiking boots', category: 'clothes', quantity: 1, luggage: 'checked' },
      { name: 'Light fleece', category: 'clothes', quantity: 1, luggage: 'carry-on' },
      { name: 'Bandanas', category: 'clothes', quantity: 3, luggage: 'checked' },
      
      // Electronics
      { name: 'Binoculars', category: 'electronics', quantity: 1, luggage: 'carry-on' },
      { name: 'Camera with zoom lens', category: 'electronics', quantity: 1, luggage: 'carry-on' },
      { name: 'Extra camera batteries', category: 'electronics', quantity: 4, luggage: 'carry-on' },
      { name: 'Headlamp', category: 'electronics', quantity: 1, luggage: 'checked' },
      
      // Toiletries
      { name: 'Insect repellent DEET', category: 'toiletries', quantity: 2, luggage: 'checked' },
      { name: 'Sunscreen SPF 50+', category: 'toiletries', quantity: 2, luggage: 'checked' },
      { name: 'Anti-malaria medication', category: 'toiletries', quantity: 1, luggage: 'personal' },
      
      // Documents
      { name: 'Passport', category: 'documents', quantity: 1, luggage: 'personal' },
      { name: 'Visa', category: 'documents', quantity: 1, luggage: 'personal' },
      { name: 'Yellow fever certificate', category: 'documents', quantity: 1, luggage: 'personal' },
      { name: 'Travel insurance', category: 'documents', quantity: 1, luggage: 'personal' },
      
      // Miscellaneous
      { name: 'Safari guidebook', category: 'miscellaneous', quantity: 1, luggage: 'carry-on' },
      { name: 'Dust masks', category: 'miscellaneous', quantity: 5, luggage: 'checked' },
      { name: 'Safari vest', category: 'miscellaneous', quantity: 1, luggage: 'checked' },
    ]
  },

  {
    id: 'winter-skiing',
    name: 'Ski Resort Getaway',
    destination: 'Mountain Resort',
    type: 'Winter Sports',
    season: 'Winter',
    duration: '4 days',
    description: 'Hit the slopes with all the winter gear you need',
    items: [
      // Clothes
      { name: 'Ski jacket', category: 'clothes', quantity: 1, luggage: 'checked' },
      { name: 'Ski pants', category: 'clothes', quantity: 1, luggage: 'checked' },
      { name: 'Thermal underwear', category: 'clothes', quantity: 3, luggage: 'checked' },
      { name: 'Wool socks', category: 'clothes', quantity: 5, luggage: 'checked' },
      { name: 'Gloves', category: 'clothes', quantity: 2, luggage: 'carry-on' },
      { name: 'Beanie', category: 'clothes', quantity: 1, luggage: 'carry-on' },
      { name: 'Goggles', category: 'clothes', quantity: 1, luggage: 'carry-on' },
      { name: 'Après-ski boots', category: 'clothes', quantity: 1, luggage: 'checked' },
      
      // Electronics
      { name: 'GoPro camera', category: 'electronics', quantity: 1, luggage: 'carry-on' },
      { name: 'Hand warmers', category: 'electronics', quantity: 10, luggage: 'checked' },
      
      // Documents
      { name: 'Lift tickets', category: 'documents', quantity: 1, luggage: 'personal' },
      { name: 'Ski lesson reservations', category: 'documents', quantity: 1, luggage: 'personal' },
      
      // Miscellaneous
      { name: 'Ski equipment rental', category: 'miscellaneous', quantity: 1, luggage: 'personal' },
      { name: 'Lip balm with SPF', category: 'miscellaneous', quantity: 1, luggage: 'carry-on' },
      { name: 'Hot chocolate packets', category: 'miscellaneous', quantity: 5, luggage: 'checked' },
    ]
  },

  {
    id: 'backpack-southeast-asia',
    name: 'Southeast Asia Backpacking',
    destination: 'Thailand/Vietnam/Cambodia',
    type: 'Backpacking',
    season: 'Dry Season',
    duration: '21 days',
    description: 'Budget travel through Southeast Asia with minimal gear',
    items: [
      // Clothes
      { name: 'Quick-dry t-shirts', category: 'clothes', quantity: 4, luggage: 'backpack' },
      { name: 'Lightweight pants', category: 'clothes', quantity: 2, luggage: 'backpack' },
      { name: 'Shorts', category: 'clothes', quantity: 3, luggage: 'backpack' },
      { name: 'Flip flops', category: 'clothes', quantity: 1, luggage: 'backpack' },
      { name: 'Walking shoes', category: 'clothes', quantity: 1, luggage: 'backpack' },
      { name: 'Rain jacket', category: 'clothes', quantity: 1, luggage: 'backpack' },
      { name: 'Sarong', category: 'clothes', quantity: 1, luggage: 'backpack' },
      
      // Electronics
      { name: 'Universal adapter', category: 'electronics', quantity: 1, luggage: 'backpack' },
      { name: 'Powerbank', category: 'electronics', quantity: 1, luggage: 'backpack' },
      { name: 'Waterproof phone case', category: 'electronics', quantity: 1, luggage: 'backpack' },
      
      // Toiletries
      { name: 'Mosquito repellent', category: 'toiletries', quantity: 2, luggage: 'backpack' },
      { name: 'Travel-size toiletries', category: 'toiletries', quantity: 1, luggage: 'backpack' },
      { name: 'Water purification tablets', category: 'toiletries', quantity: 1, luggage: 'backpack' },
      
      // Documents
      { name: 'Passport copies', category: 'documents', quantity: 3, luggage: 'personal' },
      { name: 'Travel insurance', category: 'documents', quantity: 1, luggage: 'personal' },
      { name: 'Hostel bookings', category: 'documents', quantity: 1, luggage: 'personal' },
      
      // Miscellaneous
      { name: 'Money belt', category: 'miscellaneous', quantity: 1, luggage: 'personal' },
      { name: 'Padlock', category: 'miscellaneous', quantity: 2, luggage: 'backpack' },
      { name: 'Travel towel', category: 'miscellaneous', quantity: 1, luggage: 'backpack' },
      { name: 'First aid kit', category: 'miscellaneous', quantity: 1, luggage: 'backpack' },
    ]
  },

  {
    id: 'cruise-caribbean',
    name: 'Caribbean Cruise',
    destination: 'Caribbean Islands',
    type: 'Cruise',
    season: 'All Season',
    duration: '7 days',
    description: 'Luxury cruise with formal nights and tropical excursions',
    items: [
      // Clothes
      { name: 'Formal dinner attire', category: 'clothes', quantity: 2, luggage: 'checked' },
      { name: 'Cocktail dresses', category: 'clothes', quantity: 3, luggage: 'checked' },
      { name: 'Swimsuits', category: 'clothes', quantity: 3, luggage: 'carry-on' },
      { name: 'Cover-ups', category: 'clothes', quantity: 2, luggage: 'carry-on' },
      { name: 'Casual dinner outfits', category: 'clothes', quantity: 5, luggage: 'checked' },
      { name: 'Dress shoes', category: 'clothes', quantity: 2, luggage: 'checked' },
      { name: 'Sandals', category: 'clothes', quantity: 2, luggage: 'checked' },
      
      // Electronics
      { name: 'Underwater camera', category: 'electronics', quantity: 1, luggage: 'carry-on' },
      { name: 'Cruise app downloaded', category: 'electronics', quantity: 1, luggage: 'personal' },
      
      // Documents
      { name: 'Cruise documents', category: 'documents', quantity: 1, luggage: 'personal' },
      { name: 'Excursion bookings', category: 'documents', quantity: 1, luggage: 'personal' },
      { name: 'Passport', category: 'documents', quantity: 1, luggage: 'personal' },
      
      // Miscellaneous
      { name: 'Formal jewelry', category: 'miscellaneous', quantity: 1, luggage: 'carry-on' },
      { name: 'Beach bag', category: 'miscellaneous', quantity: 1, luggage: 'checked' },
      { name: 'Seasickness medication', category: 'miscellaneous', quantity: 1, luggage: 'personal' },
    ]
  },

  {
    id: 'camping-weekend',
    name: 'Weekend Camping Trip',
    destination: 'National Park',
    type: 'Camping',
    season: 'Summer',
    duration: '2 days',
    description: 'Everything needed for a perfect camping weekend in nature',
    items: [
      // Clothes
      { name: 'Hiking boots', category: 'clothes', quantity: 1, luggage: 'backpack' },
      { name: 'Hiking pants', category: 'clothes', quantity: 2, luggage: 'backpack' },
      { name: 'Moisture-wicking shirts', category: 'clothes', quantity: 3, luggage: 'backpack' },
      { name: 'Warm jacket', category: 'clothes', quantity: 1, luggage: 'backpack' },
      { name: 'Rain gear', category: 'clothes', quantity: 1, luggage: 'backpack' },
      { name: 'Hat', category: 'clothes', quantity: 1, luggage: 'backpack' },
      
      // Electronics
      { name: 'Headlamp', category: 'electronics', quantity: 1, luggage: 'backpack' },
      { name: 'Flashlight', category: 'electronics', quantity: 1, luggage: 'backpack' },
      { name: 'Portable battery pack', category: 'electronics', quantity: 1, luggage: 'backpack' },
      
      // Miscellaneous
      { name: 'Tent', category: 'miscellaneous', quantity: 1, luggage: 'backpack' },
      { name: 'Sleeping bag', category: 'miscellaneous', quantity: 1, luggage: 'backpack' },
      { name: 'Sleeping pad', category: 'miscellaneous', quantity: 1, luggage: 'backpack' },
      { name: 'Camping stove', category: 'miscellaneous', quantity: 1, luggage: 'backpack' },
      { name: 'Water bottles', category: 'miscellaneous', quantity: 2, luggage: 'backpack' },
      { name: 'Fire starter', category: 'miscellaneous', quantity: 1, luggage: 'backpack' },
      { name: 'First aid kit', category: 'miscellaneous', quantity: 1, luggage: 'backpack' },
      { name: 'Bug spray', category: 'miscellaneous', quantity: 1, luggage: 'backpack' },
    ]
  },

  {
    id: 'baby-travel',
    name: 'Baby Travel Essentials',
    destination: 'Family Visit',
    type: 'Family',
    season: 'All Season',
    duration: '5 days',
    description: 'Everything needed when traveling with baby or toddler',
    items: [
      // Clothes
      { name: 'Baby outfits', category: 'clothes', quantity: 8, luggage: 'checked' },
      { name: 'Pajamas', category: 'clothes', quantity: 3, luggage: 'checked' },
      { name: 'Bibs', category: 'clothes', quantity: 5, luggage: 'checked' },
      { name: 'Burp cloths', category: 'clothes', quantity: 6, luggage: 'checked' },
      { name: 'Socks', category: 'clothes', quantity: 10, luggage: 'checked' },
      { name: 'Hat', category: 'clothes', quantity: 2, luggage: 'carry-on' },
      
      // Electronics
      { name: 'Baby monitor', category: 'electronics', quantity: 1, luggage: 'carry-on' },
      { name: 'White noise machine', category: 'electronics', quantity: 1, luggage: 'checked' },
      
      // Toiletries
      { name: 'Diapers', category: 'toiletries', quantity: 30, luggage: 'checked' },
      { name: 'Baby wipes', category: 'toiletries', quantity: 5, luggage: 'checked' },
      { name: 'Baby lotion', category: 'toiletries', quantity: 1, luggage: 'checked' },
      { name: 'Baby shampoo', category: 'toiletries', quantity: 1, luggage: 'checked' },
      
      // Miscellaneous
      { name: 'Car seat', category: 'miscellaneous', quantity: 1, luggage: 'checked' },
      { name: 'Stroller', category: 'miscellaneous', quantity: 1, luggage: 'checked' },
      { name: 'Baby toys', category: 'miscellaneous', quantity: 5, luggage: 'carry-on' },
      { name: 'Bottles', category: 'miscellaneous', quantity: 4, luggage: 'carry-on' },
      { name: 'Baby food', category: 'miscellaneous', quantity: 10, luggage: 'carry-on' },
      { name: 'Pacifiers', category: 'miscellaneous', quantity: 3, luggage: 'carry-on' },
    ]
  }
];

export const PremadeListsModal: React.FC<PremadeListsModalProps> = ({
  isOpen,
  onClose,
  onAddItems,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedSeason, setSelectedSeason] = useState('all');
  const [previewList, setPreviewList] = useState<typeof smartLists[0] | null>(null);
  const [tripDuration, setTripDuration] = useState([7]);
  const [packingStyle, setPackingStyle] = useState('balanced');
  const [isVoiceInputEnabled, setIsVoiceInputEnabled] = useState(false);

  const filteredLists = smartLists.filter(currentList => {
    const matchesSearch = currentList.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         currentList.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         currentList.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || currentList.type === selectedType;
    const matchesSeason = selectedSeason === 'all' || currentList.season === selectedSeason;
    
    return matchesSearch && matchesType && matchesSeason;
  });

  const adjustQuantitiesForDuration = (items: any[], duration: number, style: string) => {
    const multiplier = style === 'light' ? 0.7 : style === 'thorough' ? 1.3 : 1;
    
    return items.map(item => {
      let newQuantity = item.quantity;
      
      // Adjust quantity based on duration for certain items
      if (item.name.toLowerCase().includes('shirt') || 
          item.name.toLowerCase().includes('outfit') ||
          item.name.toLowerCase().includes('underwear') ||
          item.name.toLowerCase().includes('sock')) {
        newQuantity = Math.max(1, Math.ceil((duration * multiplier) * (item.quantity / 7)));
      } else if (item.name.toLowerCase().includes('pants') || 
                 item.name.toLowerCase().includes('jean')) {
        newQuantity = Math.max(1, Math.ceil((duration / 3) * multiplier));
      }
      
      return { ...item, quantity: newQuantity };
    });
  };

  const handlePreviewList = (selectedList: typeof smartLists[0]) => {
    setPreviewList(selectedList);
  };

  const handleAddList = () => {
    if (previewList) {
      const adjustedItems = adjustQuantitiesForDuration(previewList.items, tripDuration[0], packingStyle);
      onAddItems(adjustedItems);
      setPreviewList(null);
      onClose();
    }
  };

  const startVoiceInput = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setSearchTerm(transcript);
        setIsVoiceInputEnabled(false);
      };
      recognition.start();
      setIsVoiceInputEnabled(true);
    }
  };

  if (!isOpen) return null;

  if (previewList) {
    const adjustedItems = adjustQuantitiesForDuration(previewList.items, tripDuration[0], packingStyle);
    const itemsByCategory = adjustedItems.reduce((acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    }, {} as Record<string, any[]>);

    return (
      <AnimatePresence>
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white dark:bg-gray-900 rounded-3xl p-6 max-w-4xl w-full max-h-[85vh] overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700"
          >
            {/* Preview Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  Preview: {previewList.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-300">{previewList.description}</p>
              </div>
              <Button variant="ghost" onClick={() => setPreviewList(null)} className="rounded-full">
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Duration and Style Controls */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Trip Duration: {tripDuration[0]} days</label>
                  <Slider
                    value={tripDuration}
                    onValueChange={setTripDuration}
                    max={30}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Packing Style</label>
                  <Select value={packingStyle} onValueChange={setPackingStyle}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">🟢 Light (Carry-on only)</SelectItem>
                      <SelectItem value="balanced">🟨 Balanced</SelectItem>
                      <SelectItem value="thorough">🟥 Thorough (Everything)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Items by Category */}
            <div className="overflow-y-auto max-h-96 space-y-4">
              {Object.entries(itemsByCategory).map(([category, items]) => (
                <div key={category} className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                  <h3 className="font-semibold text-lg mb-3 capitalize flex items-center gap-2">
                    {category === 'clothes' && '👕'}
                    {category === 'toiletries' && '🧴'}
                    {category === 'electronics' && '📱'}
                    {category === 'documents' && '📋'}
                    {category === 'miscellaneous' && '🎒'}
                    {category} ({items.length} items)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {items.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <span className="text-sm">{item.name}</span>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            x{item.quantity}
                          </Badge>
                          {item.luggage && (
                            <Badge className="text-xs bg-blue-500 text-white">
                              {item.luggage}
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Add to Trip Button */}
            <div className="mt-6 flex gap-3">
              <Button 
                onClick={handleAddList}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-2xl font-semibold"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add {adjustedItems.length} Items to My Trip
              </Button>
              <Button variant="outline" onClick={() => setPreviewList(null)} className="px-6 py-3 rounded-2xl">
                Cancel
              </Button>
            </div>
          </motion.div>
        </div>
      </AnimatePresence>
    );
  }

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
                Smart Packing Lists ✨
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Choose from expertly curated lists for your destination
              </p>
            </div>
            <Button variant="ghost" onClick={onClose} className="rounded-full h-10 w-10">
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="mb-6 space-y-4">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search destinations, activities, or trip types..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 rounded-2xl border-2 focus:border-blue-500"
                />
              </div>
              <Button
                variant="outline"
                onClick={startVoiceInput}
                disabled={isVoiceInputEnabled}
                className="rounded-2xl px-4"
              >
                <Volume2 className={`h-4 w-4 ${isVoiceInputEnabled ? 'text-red-500' : ''}`} />
              </Button>
            </div>

            <div className="flex gap-4">
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-48 rounded-2xl">
                  <SelectValue placeholder="Trip Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Beach">Beach</SelectItem>
                  <SelectItem value="City">City</SelectItem>
                  <SelectItem value="Business">Business</SelectItem>
                  <SelectItem value="Adventure">Adventure</SelectItem>
                  <SelectItem value="Family">Family</SelectItem>
                  <SelectItem value="Entertainment">Entertainment</SelectItem>
                  <SelectItem value="Cruise">Cruise</SelectItem>
                  <SelectItem value="Camping">Camping</SelectItem>
                  <SelectItem value="Backpacking">Backpacking</SelectItem>
                  <SelectItem value="Winter Sports">Winter Sports</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedSeason} onValueChange={setSelectedSeason}>
                <SelectTrigger className="w-48 rounded-2xl">
                  <SelectValue placeholder="Season" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Seasons</SelectItem>
                  <SelectItem value="Spring">Spring</SelectItem>
                  <SelectItem value="Summer">Summer</SelectItem>
                  <SelectItem value="Fall">Fall</SelectItem>
                  <SelectItem value="Winter">Winter</SelectItem>
                  <SelectItem value="All Season">All Season</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Lists Grid */}
          <div className="overflow-y-auto max-h-[calc(85vh-300px)]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredLists.map((smartList) => (
                <motion.div
                  key={smartList.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-5 border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-all duration-200"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">
                        {smartList.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 mb-2">
                        <MapPin className="h-3 w-3" />
                        <span>{smartList.destination}</span>
                        <Calendar className="h-3 w-3 ml-2" />
                        <span>{smartList.duration}</span>
                      </div>
                    </div>
                    <Badge className="bg-blue-500 text-white text-xs">
                      {smartList.type}
                    </Badge>
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                    {smartList.description}
                  </p>

                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
                    <span>{smartList.items.length} items</span>
                    <span>{smartList.season}</span>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePreviewList(smartList)}
                      className="flex-1 rounded-xl border-blue-200 hover:border-blue-400"
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      Preview
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => {
                        onAddItems(smartList.items);
                        onClose();
                      }}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl"
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      Add
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredLists.length === 0 && (
              <div className="text-center py-12">
                <Sparkles className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  No lists found
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Try adjusting your search or filters
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
