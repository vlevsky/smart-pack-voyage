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
  // Beach & Resort Destinations (1-10)
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
  {
    id: 'bali-cultural',
    name: 'Bali Cultural Journey',
    description: 'Spiritual and cultural exploration with temple visits',
    destinationType: 'beach',
    season: 'summer',
    duration: '7-12 days',
    icon: '🛕',
    items: [
      { name: 'Modest temple clothing', category: 'clothes', quantity: 5 },
      { name: 'Sarong for temples', category: 'clothes', quantity: 3 },
      { name: 'Comfortable sandals', category: 'clothes', quantity: 2 },
      { name: 'Light cotton shirts', category: 'clothes', quantity: 6 },
      { name: 'Long pants for temples', category: 'clothes', quantity: 3 },
      { name: 'Swimwear', category: 'clothes', quantity: 3 },
      { name: 'Rain jacket', category: 'clothes', quantity: 1 },
      { name: 'Mosquito repellent', category: 'toiletries', quantity: 2 },
      { name: 'Sunscreen', category: 'toiletries', quantity: 2 },
      { name: 'Camera for temples', category: 'electronics', quantity: 1 },
      { name: 'Cash for offerings', category: 'miscellaneous', quantity: 1 },
      { name: 'Guidebook', category: 'documents', quantity: 1 },
      { name: 'Water bottle', category: 'miscellaneous', quantity: 1 },
      { name: 'Daypack', category: 'miscellaneous', quantity: 1 },
      { name: 'Hand sanitizer', category: 'toiletries', quantity: 2 },
      { name: 'First aid kit', category: 'toiletries', quantity: 1 },
      { name: 'Portable charger', category: 'electronics', quantity: 1 },
      { name: 'Yoga mat', category: 'miscellaneous', quantity: 1 },
      { name: 'Journal', category: 'miscellaneous', quantity: 1 },
      { name: 'Incense as gifts', category: 'miscellaneous', quantity: 3 },
      { name: 'Scarf for coverage', category: 'clothes', quantity: 2 },
      { name: 'Flip flops', category: 'clothes', quantity: 1 },
      { name: 'Meditation cushion', category: 'miscellaneous', quantity: 1 },
      { name: 'Herbal remedies', category: 'toiletries', quantity: 2 },
      { name: 'Traditional offerings', category: 'miscellaneous', quantity: 5 },
    ],
  },
  {
    id: 'thai-islands',
    name: 'Thai Islands Hopping',
    description: 'Island hopping adventure through Thailand beaches',
    destinationType: 'beach',
    season: 'winter',
    duration: '10-14 days',
    icon: '🏝️',
    items: [
      { name: 'Quick-dry swimwear', category: 'clothes', quantity: 4 },
      { name: 'Beach shorts', category: 'clothes', quantity: 6 },
      { name: 'Tank tops', category: 'clothes', quantity: 8 },
      { name: 'Flip flops', category: 'clothes', quantity: 2 },
      { name: 'Water shoes', category: 'clothes', quantity: 1 },
      { name: 'Snorkeling gear', category: 'miscellaneous', quantity: 1 },
      { name: 'Waterproof bag', category: 'miscellaneous', quantity: 2 },
      { name: 'Sunscreen', category: 'toiletries', quantity: 3 },
      { name: 'After-sun lotion', category: 'toiletries', quantity: 2 },
      { name: 'Mosquito repellent', category: 'toiletries', quantity: 2 },
      { name: 'Ferry tickets', category: 'documents', quantity: 1 },
      { name: 'Waterproof phone case', category: 'electronics', quantity: 1 },
      { name: 'Portable charger', category: 'electronics', quantity: 2 },
      { name: 'Beach towel', category: 'miscellaneous', quantity: 2 },
      { name: 'Day backpack', category: 'miscellaneous', quantity: 1 },
      { name: 'Water bottle', category: 'miscellaneous', quantity: 2 },
      { name: 'Underwater camera', category: 'electronics', quantity: 1 },
      { name: 'Beach hat', category: 'clothes', quantity: 1 },
      { name: 'Light sarong', category: 'clothes', quantity: 2 },
      { name: 'Island hopping guide', category: 'documents', quantity: 1 },
      { name: 'Cash for boats', category: 'miscellaneous', quantity: 1 },
      { name: 'Seasickness tablets', category: 'toiletries', quantity: 1 },
      { name: 'Reef-safe sunscreen', category: 'toiletries', quantity: 1 },
      { name: 'Dry bag for valuables', category: 'miscellaneous', quantity: 1 },
      { name: 'Beach umbrella', category: 'miscellaneous', quantity: 1 },
    ],
  },
  {
    id: 'mediterranean-cruise',
    name: 'Mediterranean Cruise',
    description: 'Elegant cruise through Mediterranean ports',
    destinationType: 'cruise',
    season: 'summer',
    duration: '10-14 days',
    icon: '⛵',
    items: [
      { name: 'Formal evening wear', category: 'clothes', quantity: 4 },
      { name: 'Cocktail dresses', category: 'clothes', quantity: 3 },
      { name: 'Smart casual outfits', category: 'clothes', quantity: 6 },
      { name: 'Dress shoes', category: 'clothes', quantity: 2 },
      { name: 'Comfortable walking shoes', category: 'clothes', quantity: 2 },
      { name: 'Sandals', category: 'clothes', quantity: 2 },
      { name: 'Swimwear', category: 'clothes', quantity: 3 },
      { name: 'Cover-ups', category: 'clothes', quantity: 2 },
      { name: 'Light jacket', category: 'clothes', quantity: 2 },
      { name: 'Sunglasses', category: 'miscellaneous', quantity: 2 },
      { name: 'Sun hat', category: 'clothes', quantity: 1 },
      { name: 'Sunscreen', category: 'toiletries', quantity: 2 },
      { name: 'Evening clutch', category: 'miscellaneous', quantity: 1 },
      { name: 'Day bag', category: 'miscellaneous', quantity: 1 },
      { name: 'Jewelry', category: 'miscellaneous', quantity: 1 },
      { name: 'Cruise documents', category: 'documents', quantity: 1 },
      { name: 'Port guides', category: 'documents', quantity: 1 },
      { name: 'Camera', category: 'electronics', quantity: 1 },
      { name: 'Portable charger', category: 'electronics', quantity: 1 },
      { name: 'Motion sickness meds', category: 'toiletries', quantity: 1 },
      { name: 'European adapter', category: 'electronics', quantity: 1 },
      { name: 'Water bottle', category: 'miscellaneous', quantity: 1 },
      { name: 'Binoculars', category: 'miscellaneous', quantity: 1 },
      { name: 'Formal accessories', category: 'miscellaneous', quantity: 3 },
      { name: 'Shore excursion gear', category: 'miscellaneous', quantity: 1 },
    ],
  },
  {
    id: 'florida-keys',
    name: 'Florida Keys Road Trip',
    description: 'Key-hopping adventure with fishing and diving',
    destinationType: 'beach',
    season: 'winter',
    duration: '5-8 days',
    icon: '🐠',
    items: [
      { name: 'Fishing gear', category: 'miscellaneous', quantity: 1 },
      { name: 'Diving equipment', category: 'miscellaneous', quantity: 1 },
      { name: 'Swimwear', category: 'clothes', quantity: 3 },
      { name: 'Board shorts', category: 'clothes', quantity: 4 },
      { name: 'Rash guards', category: 'clothes', quantity: 3 },
      { name: 'Flip flops', category: 'clothes', quantity: 2 },
      { name: 'Water shoes', category: 'clothes', quantity: 1 },
      { name: 'Boat shoes', category: 'clothes', quantity: 1 },
      { name: 'Sunglasses', category: 'miscellaneous', quantity: 2 },
      { name: 'Fishing hat', category: 'clothes', quantity: 1 },
      { name: 'Sunscreen SPF 50+', category: 'toiletries', quantity: 3 },
      { name: 'Cooler for fish', category: 'miscellaneous', quantity: 1 },
      { name: 'Waterproof phone case', category: 'electronics', quantity: 1 },
      { name: 'GoPro for diving', category: 'electronics', quantity: 1 },
      { name: 'Fishing license', category: 'documents', quantity: 1 },
      { name: 'Boat rental docs', category: 'documents', quantity: 1 },
      { name: 'First aid kit', category: 'toiletries', quantity: 1 },
      { name: 'Snorkeling gear', category: 'miscellaneous', quantity: 1 },
      { name: 'Dive weights', category: 'miscellaneous', quantity: 1 },
      { name: 'Underwater camera', category: 'electronics', quantity: 1 },
      { name: 'Key lime pie supplies', category: 'miscellaneous', quantity: 1 },
      { name: 'Insulated water bottle', category: 'miscellaneous', quantity: 2 },
      { name: 'Beach towels', category: 'miscellaneous', quantity: 3 },
      { name: 'Portable charger', category: 'electronics', quantity: 1 },
      { name: 'Road trip snacks', category: 'miscellaneous', quantity: 5 },
    ],
  },
  {
    id: 'california-coast',
    name: 'California Coast Road Trip',
    description: 'Pacific Coast Highway scenic drive adventure',
    destinationType: 'beach',
    season: 'summer',
    duration: '7-10 days',
    icon: '🌊',
    items: [
      { name: 'Layered clothing', category: 'clothes', quantity: 8 },
      { name: 'Windbreaker', category: 'clothes', quantity: 1 },
      { name: 'Warm jacket', category: 'clothes', quantity: 1 },
      { name: 'Comfortable jeans', category: 'clothes', quantity: 3 },
      { name: 'T-shirts', category: 'clothes', quantity: 6 },
      { name: 'Hiking boots', category: 'clothes', quantity: 1 },
      { name: 'Sneakers', category: 'clothes', quantity: 1 },
      { name: 'Sandals', category: 'clothes', quantity: 1 },
      { name: 'Swimwear', category: 'clothes', quantity: 2 },
      { name: 'Sunglasses', category: 'miscellaneous', quantity: 2 },
      { name: 'Camera with extra batteries', category: 'electronics', quantity: 1 },
      { name: 'Road atlas', category: 'documents', quantity: 1 },
      { name: 'National park passes', category: 'documents', quantity: 1 },
      { name: 'Cooler for drinks', category: 'miscellaneous', quantity: 1 },
      { name: 'Beach towel', category: 'miscellaneous', quantity: 2 },
      { name: 'Hiking daypack', category: 'miscellaneous', quantity: 1 },
      { name: 'Water bottles', category: 'miscellaneous', quantity: 3 },
      { name: 'Sunscreen', category: 'toiletries', quantity: 2 },
      { name: 'Lip balm with SPF', category: 'toiletries', quantity: 2 },
      { name: 'Car charger', category: 'electronics', quantity: 1 },
      { name: 'Portable phone mount', category: 'electronics', quantity: 1 },
      { name: 'Binoculars for wildlife', category: 'miscellaneous', quantity: 1 },
      { name: 'Beach chair', category: 'miscellaneous', quantity: 2 },
      { name: 'Picnic supplies', category: 'miscellaneous', quantity: 1 },
      { name: 'Emergency car kit', category: 'miscellaneous', quantity: 1 },
    ],
  },
  {
    id: 'greek-islands',
    name: 'Greek Islands Explorer',
    description: 'Island hopping through ancient Greece',
    destinationType: 'beach',
    season: 'summer',
    duration: '10-14 days',
    icon: '🏛️',
    items: [
      { name: 'Light summer dresses', category: 'clothes', quantity: 5 },
      { name: 'Linen shirts', category: 'clothes', quantity: 4 },
      { name: 'Cotton shorts', category: 'clothes', quantity: 4 },
      { name: 'Swimwear', category: 'clothes', quantity: 4 },
      { name: 'Beach cover-ups', category: 'clothes', quantity: 2 },
      { name: 'Comfortable walking sandals', category: 'clothes', quantity: 2 },
      { name: 'Flip flops', category: 'clothes', quantity: 1 },
      { name: 'Evening sandals', category: 'clothes', quantity: 1 },
      { name: 'Sun hat', category: 'clothes', quantity: 1 },
      { name: 'Light cardigan', category: 'clothes', quantity: 1 },
      { name: 'Sunglasses', category: 'miscellaneous', quantity: 2 },
      { name: 'Sunscreen SPF 50+', category: 'toiletries', quantity: 3 },
      { name: 'After-sun lotion', category: 'toiletries', quantity: 1 },
      { name: 'Camera', category: 'electronics', quantity: 1 },
      { name: 'Portable charger', category: 'electronics', quantity: 1 },
      { name: 'Waterproof phone case', category: 'electronics', quantity: 1 },
      { name: 'Day backpack', category: 'miscellaneous', quantity: 1 },
      { name: 'Beach bag', category: 'miscellaneous', quantity: 1 },
      { name: 'Water bottle', category: 'miscellaneous', quantity: 2 },
      { name: 'Ancient history guidebook', category: 'documents', quantity: 1 },
      { name: 'Ferry schedules', category: 'documents', quantity: 1 },
      { name: 'Cash for tavernas', category: 'miscellaneous', quantity: 1 },
      { name: 'Snorkeling gear', category: 'miscellaneous', quantity: 1 },
      { name: 'Beach towel', category: 'miscellaneous', quantity: 2 },
      { name: 'Greek phrasebook', category: 'documents', quantity: 1 },
    ],
  },
  {
    id: 'costa-rica-beaches',
    name: 'Costa Rica Beach & Wildlife',
    description: 'Eco-adventure with beaches and rainforest',
    destinationType: 'beach',
    season: 'winter',
    duration: '8-12 days',
    icon: '🦜',
    items: [
      { name: 'Quick-dry clothing', category: 'clothes', quantity: 6 },
      { name: 'Rain jacket', category: 'clothes', quantity: 1 },
      { name: 'Hiking boots', category: 'clothes', quantity: 1 },
      { name: 'Water shoes', category: 'clothes', quantity: 1 },
      { name: 'Flip flops', category: 'clothes', quantity: 1 },
      { name: 'Swimwear', category: 'clothes', quantity: 3 },
      { name: 'Long-sleeve shirts', category: 'clothes', quantity: 3 },
      { name: 'Convertible pants', category: 'clothes', quantity: 2 },
      { name: 'Insect repellent', category: 'toiletries', quantity: 3 },
      { name: 'Sunscreen', category: 'toiletries', quantity: 2 },
      { name: 'First aid kit', category: 'toiletries', quantity: 1 },
      { name: 'Binoculars for wildlife', category: 'miscellaneous', quantity: 1 },
      { name: 'Camera with zoom lens', category: 'electronics', quantity: 1 },
      { name: 'Waterproof camera bag', category: 'electronics', quantity: 1 },
      { name: 'Headlamp', category: 'electronics', quantity: 1 },
      { name: 'Portable charger', category: 'electronics', quantity: 2 },
      { name: 'Waterproof phone case', category: 'electronics', quantity: 1 },
      { name: 'Wildlife guide book', category: 'documents', quantity: 1 },
      { name: 'Snorkeling gear', category: 'miscellaneous', quantity: 1 },
      { name: 'Day hiking pack', category: 'miscellaneous', quantity: 1 },
      { name: 'Water purification tablets', category: 'toiletries', quantity: 1 },
      { name: 'Zip-lock bags', category: 'miscellaneous', quantity: 10 },
      { name: 'Eco-friendly toiletries', category: 'toiletries', quantity: 1 },
      { name: 'Cash for eco-tours', category: 'miscellaneous', quantity: 1 },
      { name: 'Reusable water bottle', category: 'miscellaneous', quantity: 2 },
    ],
  },

  // City Break Destinations (11-20)
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
  {
    id: 'new-york-city',
    name: 'New York City Weekend',
    description: 'Fast-paced urban adventure in the Big Apple',
    destinationType: 'city',
    season: 'fall',
    duration: '3-5 days',
    icon: '🏙️',
    items: [
      { name: 'Comfortable walking shoes', category: 'clothes', quantity: 2 },
      { name: 'Layers for changing weather', category: 'clothes', quantity: 5 },
      { name: 'Stylish jacket', category: 'clothes', quantity: 1 },
      { name: 'Nice dinner outfit', category: 'clothes', quantity: 2 },
      { name: 'Jeans', category: 'clothes', quantity: 2 },
      { name: 'Casual shirts', category: 'clothes', quantity: 4 },
      { name: 'Crossbody bag', category: 'miscellaneous', quantity: 1 },
      { name: 'Subway map', category: 'documents', quantity: 1 },
      { name: 'MetroCard', category: 'documents', quantity: 1 },
      { name: 'Theater tickets', category: 'documents', quantity: 1 },
      { name: 'Museum passes', category: 'documents', quantity: 1 },
      { name: 'Camera', category: 'electronics', quantity: 1 },
      { name: 'Portable charger', category: 'electronics', quantity: 1 },
      { name: 'Umbrella', category: 'miscellaneous', quantity: 1 },
      { name: 'Sunglasses', category: 'miscellaneous', quantity: 1 },
      { name: 'Cash for tips', category: 'miscellaneous', quantity: 1 },
      { name: 'Water bottle', category: 'miscellaneous', quantity: 1 },
      { name: 'Hand sanitizer', category: 'toiletries', quantity: 1 },
      { name: 'Lip balm', category: 'toiletries', quantity: 1 },
      { name: 'City guidebook', category: 'documents', quantity: 1 },
      { name: 'Restaurant reservations', category: 'documents', quantity: 1 },
      { name: 'Broadway show program', category: 'miscellaneous', quantity: 1 },
      { name: 'Shopping bags', category: 'miscellaneous', quantity: 3 },
      { name: 'Emergency contact list', category: 'documents', quantity: 1 },
      { name: 'Phone with GPS', category: 'electronics', quantity: 1 },
    ],
  },
  {
    id: 'london-heritage',
    name: 'London Historical Tour',
    description: 'Royal palaces, museums, and British culture',
    destinationType: 'city',
    season: 'fall',
    duration: '5-7 days',
    icon: '👑',
    items: [
      { name: 'Waterproof jacket', category: 'clothes', quantity: 1 },
      { name: 'Warm layers', category: 'clothes', quantity: 5 },
      { name: 'Comfortable walking shoes', category: 'clothes', quantity: 2 },
      { name: 'Smart casual outfits', category: 'clothes', quantity: 4 },
      { name: 'Umbrella', category: 'miscellaneous', quantity: 1 },
      { name: 'Oyster card', category: 'documents', quantity: 1 },
      { name: 'Museum passes', category: 'documents', quantity: 1 },
      { name: 'Theater tickets', category: 'documents', quantity: 1 },
      { name: 'Royal tour bookings', category: 'documents', quantity: 1 },
      { name: 'Camera', category: 'electronics', quantity: 1 },
      { name: 'Portable charger', category: 'electronics', quantity: 1 },
      { name: 'UK adapter', category: 'electronics', quantity: 1 },
      { name: 'Crossbody bag', category: 'miscellaneous', quantity: 1 },
      { name: 'Cash for markets', category: 'miscellaneous', quantity: 1 },
      { name: 'Thermos for tea', category: 'miscellaneous', quantity: 1 },
      { name: 'London guidebook', category: 'documents', quantity: 1 },
      { name: 'Pub guide', category: 'documents', quantity: 1 },
      { name: 'Map of London', category: 'documents', quantity: 1 },
      { name: 'Scarf', category: 'clothes', quantity: 2 },
      { name: 'Gloves', category: 'clothes', quantity: 1 },
      { name: 'Warm hat', category: 'clothes', quantity: 1 },
      { name: 'Evening wear for shows', category: 'clothes', quantity: 2 },
      { name: 'Hand cream', category: 'toiletries', quantity: 1 },
      { name: 'Lip balm', category: 'toiletries', quantity: 1 },
      { name: 'Afternoon tea attire', category: 'clothes', quantity: 1 },
    ],
  },
  {
    id: 'rome-ancient',
    name: 'Rome Ancient Wonders',
    description: 'Historical journey through the Eternal City',
    destinationType: 'city',
    season: 'spring',
    duration: '4-6 days',
    icon: '🏛️',
    items: [
      { name: 'Comfortable walking shoes', category: 'clothes', quantity: 2 },
      { name: 'Modest clothing for churches', category: 'clothes', quantity: 4 },
      { name: 'Light layers', category: 'clothes', quantity: 5 },
      { name: 'Sun hat', category: 'clothes', quantity: 1 },
      { name: 'Sunglasses', category: 'miscellaneous', quantity: 1 },
      { name: 'Sunscreen', category: 'toiletries', quantity: 1 },
      { name: 'Camera', category: 'electronics', quantity: 1 },
      { name: 'Portable charger', category: 'electronics', quantity: 1 },
      { name: 'Rome city pass', category: 'documents', quantity: 1 },
      { name: 'Vatican tour tickets', category: 'documents', quantity: 1 },
      { name: 'Colosseum tickets', category: 'documents', quantity: 1 },
      { name: 'Ancient Rome guidebook', category: 'documents', quantity: 1 },
      { name: 'Italian phrasebook', category: 'documents', quantity: 1 },
      { name: 'Day backpack', category: 'miscellaneous', quantity: 1 },
      { name: 'Water bottle', category: 'miscellaneous', quantity: 1 },
      { name: 'Cash for gelato', category: 'miscellaneous', quantity: 1 },
      { name: 'Rome metro map', category: 'documents', quantity: 1 },
      { name: 'Restaurant reservations', category: 'documents', quantity: 1 },
      { name: 'Comfortable socks', category: 'clothes', quantity: 6 },
      { name: 'Light cardigan', category: 'clothes', quantity: 1 },
      { name: 'Evening wear', category: 'clothes', quantity: 2 },
      { name: 'Blister patches', category: 'toiletries', quantity: 1 },
      { name: 'Hand sanitizer', category: 'toiletries', quantity: 1 },
      { name: 'Notebook for sketches', category: 'miscellaneous', quantity: 1 },
      { name: 'Sketching pencils', category: 'miscellaneous', quantity: 3 },
    ],
  },
  {
    id: 'barcelona-art',
    name: 'Barcelona Art & Architecture',
    description: 'Gaudi masterpieces and Catalonian culture',
    destinationType: 'city',
    season: 'spring',
    duration: '4-6 days',
    icon: '🎨',
    items: [
      { name: 'Comfortable walking shoes', category: 'clothes', quantity: 2 },
      { name: 'Light spring clothing', category: 'clothes', quantity: 6 },
      { name: 'Light jacket', category: 'clothes', quantity: 1 },
      { name: 'Sundress', category: 'clothes', quantity: 2 },
      { name: 'Casual pants', category: 'clothes', quantity: 2 },
      { name: 'T-shirts', category: 'clothes', quantity: 4 },
      { name: 'Camera', category: 'electronics', quantity: 1 },
      { name: 'Portable charger', category: 'electronics', quantity: 1 },
      { name: 'Sagrada Familia tickets', category: 'documents', quantity: 1 },
      { name: 'Park Güell tickets', category: 'documents', quantity: 1 },
      { name: 'Museum passes', category: 'documents', quantity: 1 },
      { name: 'Barcelona guidebook', category: 'documents', quantity: 1 },
      { name: 'Spanish phrasebook', category: 'documents', quantity: 1 },
      { name: 'Metro map', category: 'documents', quantity: 1 },
      { name: 'Crossbody bag', category: 'miscellaneous', quantity: 1 },
      { name: 'Sunglasses', category: 'miscellaneous', quantity: 1 },
      { name: 'Sunscreen', category: 'toiletries', quantity: 1 },
      { name: 'Water bottle', category: 'miscellaneous', quantity: 1 },
      { name: 'Cash for tapas', category: 'miscellaneous', quantity: 1 },
      { name: 'Comfortable sandals', category: 'clothes', quantity: 1 },
      { name: 'Evening wear', category: 'clothes', quantity: 2 },
      { name: 'Art supplies', category: 'miscellaneous', quantity: 1 },
      { name: 'Sketchbook', category: 'miscellaneous', quantity: 1 },
      { name: 'Architecture photography tips', category: 'documents', quantity: 1 },
      { name: 'Gaudi biography book', category: 'documents', quantity: 1 },
    ],
  },
  {
    id: 'amsterdam-canals',
    name: 'Amsterdam Canal Discovery',
    description: 'Cycling through canals and Dutch culture',
    destinationType: 'city',
    season: 'spring',
    duration: '3-5 days',
    icon: '🚲',
    items: [
      { name: 'Cycling clothes', category: 'clothes', quantity: 3 },
      { name: 'Waterproof jacket', category: 'clothes', quantity: 1 },
      { name: 'Comfortable layers', category: 'clothes', quantity: 4 },
      { name: 'Flat cycling shoes', category: 'clothes', quantity: 1 },
      { name: 'Walking shoes', category: 'clothes', quantity: 1 },
      { name: 'Helmet (if preferred)', category: 'miscellaneous', quantity: 1 },
      { name: 'Small backpack', category: 'miscellaneous', quantity: 1 },
      { name: 'Waterproof bag', category: 'miscellaneous', quantity: 1 },
      { name: 'Camera', category: 'electronics', quantity: 1 },
      { name: 'Portable charger', category: 'electronics', quantity: 1 },
      { name: 'Museum quarter passes', category: 'documents', quantity: 1 },
      { name: 'Anne Frank House tickets', category: 'documents', quantity: 1 },
      { name: 'Canal cruise tickets', category: 'documents', quantity: 1 },
      { name: 'Bike rental confirmation', category: 'documents', quantity: 1 },
      { name: 'City cycling map', category: 'documents', quantity: 1 },
      { name: 'Amsterdam guidebook', category: 'documents', quantity: 1 },
      { name: 'Umbrella', category: 'miscellaneous', quantity: 1 },
      { name: 'Water bottle', category: 'miscellaneous', quantity: 1 },
      { name: 'Cash for markets', category: 'miscellaneous', quantity: 1 },
      { name: 'Hand warmers', category: 'miscellaneous', quantity: 2 },
      { name: 'Gloves', category: 'clothes', quantity: 1 },
      { name: 'Scarf', category: 'clothes', quantity: 1 },
      { name: 'Evening wear', category: 'clothes', quantity: 2 },
      { name: 'Dutch cheese shopping list', category: 'documents', quantity: 1 },
      { name: 'Coffee shop guide', category: 'documents', quantity: 1 },
    ],
  },
  {
    id: 'berlin-history',
    name: 'Berlin History & Culture',
    description: 'Cold War history and modern German culture',
    destinationType: 'city',
    season: 'fall',
    duration: '4-6 days',
    icon: '🧱',
    items: [
      { name: 'Warm layers', category: 'clothes', quantity: 5 },
      { name: 'Comfortable walking shoes', category: 'clothes', quantity: 2 },
      { name: 'Warm jacket', category: 'clothes', quantity: 1 },
      { name: 'Jeans', category: 'clothes', quantity: 2 },
      { name: 'Long-sleeve shirts', category: 'clothes', quantity: 4 },
      { name: 'Sweater', category: 'clothes', quantity: 2 },
      { name: 'Scarf', category: 'clothes', quantity: 1 },
      { name: 'Gloves', category: 'clothes', quantity: 1 },
      { name: 'Warm hat', category: 'clothes', quantity: 1 },
      { name: 'Museum passes', category: 'documents', quantity: 1 },
      { name: 'Holocaust Memorial tour', category: 'documents', quantity: 1 },
      { name: 'Berlin Wall tour tickets', category: 'documents', quantity: 1 },
      { name: 'Checkpoint Charlie info', category: 'documents', quantity: 1 },
      { name: 'Historical Berlin guidebook', category: 'documents', quantity: 1 },
      { name: 'German phrasebook', category: 'documents', quantity: 1 },
      { name: 'Camera', category: 'electronics', quantity: 1 },
      { name: 'Portable charger', category: 'electronics', quantity: 1 },
      { name: 'Day backpack', category: 'miscellaneous', quantity: 1 },
      { name: 'Water bottle', category: 'miscellaneous', quantity: 1 },
      { name: 'Cash for beer gardens', category: 'miscellaneous', quantity: 1 },
      { name: 'Umbrella', category: 'miscellaneous', quantity: 1 },
      { name: 'Hand warmers', category: 'miscellaneous', quantity: 4 },
      { name: 'Evening wear', category: 'clothes', quantity: 2 },
      { name: 'Notebook for history notes', category: 'miscellaneous', quantity: 1 },
      { name: 'Berlin transport pass', category: 'documents', quantity: 1 },
    ],
  },
  {
    id: 'prague-fairytale',
    name: 'Prague Fairytale Adventure',
    description: 'Medieval architecture and Czech culture',
    destinationType: 'city',
    season: 'fall',
    duration: '3-5 days',
    icon: '🏰',
    items: [
      { name: 'Comfortable walking shoes', category: 'clothes', quantity: 2 },
      { name: 'Warm layers', category: 'clothes', quantity: 5 },
      { name: 'Warm coat', category: 'clothes', quantity: 1 },
      { name: 'Jeans', category: 'clothes', quantity: 2 },
      { name: 'Sweaters', category: 'clothes', quantity: 3 },
      { name: 'Scarf', category: 'clothes', quantity: 1 },
      { name: 'Gloves', category: 'clothes', quantity: 1 },
      { name: 'Warm socks', category: 'clothes', quantity: 5 },
      { name: 'Prague Castle tickets', category: 'documents', quantity: 1 },
      { name: 'Old Town tour booking', category: 'documents', quantity: 1 },
      { name: 'Charles Bridge guide', category: 'documents', quantity: 1 },
      { name: 'Czech Republic guidebook', category: 'documents', quantity: 1 },
      { name: 'Basic Czech phrases', category: 'documents', quantity: 1 },
      { name: 'Camera', category: 'electronics', quantity: 1 },
      { name: 'Portable charger', category: 'electronics', quantity: 1 },
      { name: 'Day bag', category: 'miscellaneous', quantity: 1 },
      { name: 'Water bottle', category: 'miscellaneous', quantity: 1 },
      { name: 'Cash for street vendors', category: 'miscellaneous', quantity: 1 },
      { name: 'Umbrella', category: 'miscellaneous', quantity: 1 },
      { name: 'Hand warmers', category: 'miscellaneous', quantity: 3 },
      { name: 'Evening dress clothes', category: 'clothes', quantity: 2 },
      { name: 'Opera/concert tickets', category: 'documents', quantity: 1 },
      { name: 'Beer hall guide', category: 'documents', quantity: 1 },
      { name: 'Astronomical clock schedule', category: 'documents', quantity: 1 },
      { name: 'Medieval Prague history book', category: 'documents', quantity: 1 },
    ],
  },
  {
    id: 'vienna-classical',
    name: 'Vienna Classical Music Tour',
    description: 'Imperial palaces and classical music heritage',
    destinationType: 'city',
    season: 'winter',
    duration: '3-5 days',
    icon: '🎼',
    items: [
      { name: 'Formal concert attire', category: 'clothes', quantity: 3 },
      { name: 'Warm winter coat', category: 'clothes', quantity: 1 },
      { name: 'Warm layers', category: 'clothes', quantity: 5 },
      { name: 'Dress shoes', category: 'clothes', quantity: 1 },
      { name: 'Comfortable walking shoes', category: 'clothes', quantity: 1 },
      { name: 'Warm accessories', category: 'clothes', quantity: 3 },
      { name: 'Elegant evening wear', category: 'clothes', quantity: 2 },
      { name: 'Opera tickets', category: 'documents', quantity: 1 },
      { name: 'Concert hall tickets', category: 'documents', quantity: 1 },
      { name: 'Schönbrunn Palace tickets', category: 'documents', quantity: 1 },
      { name: 'Hofburg Palace tickets', category: 'documents', quantity: 1 },
      { name: 'Vienna guidebook', category: 'documents', quantity: 1 },
      { name: 'Classical music history book', category: 'documents', quantity: 1 },
      { name: 'German phrasebook', category: 'documents', quantity: 1 },
      { name: 'Camera', category: 'electronics', quantity: 1 },
      { name: 'Portable charger', category: 'electronics', quantity: 1 },
      { name: 'Small evening bag', category: 'miscellaneous', quantity: 1 },
      { name: 'Day bag', category: 'miscellaneous', quantity: 1 },
      { name: 'Cash for coffee houses', category: 'miscellaneous', quantity: 1 },
      { name: 'Hand warmers', category: 'miscellaneous', quantity: 5 },
      { name: 'Vienna transport pass', category: 'documents', quantity: 1 },
      { name: 'Coffee house guide', category: 'documents', quantity: 1 },
      { name: 'Opera program collection', category: 'miscellaneous', quantity: 1 },
      { name: 'Winter boots', category: 'clothes', quantity: 1 },
      { name: 'Thermal underwear', category: 'clothes', quantity: 3 },
    ],
  },

  // Adventure & Outdoor (21-30)
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
  {
    id: 'kilimanjaro-summit',
    name: 'Kilimanjaro Summit Expedition',
    description: 'African peak climbing adventure',
    destinationType: 'adventure',
    season: 'winter',
    duration: '7-10 days',
    icon: '⛰️',
    items: [
      { name: 'Hiking boots', category: 'clothes', quantity: 1 },
      { name: 'Gaiters', category: 'clothes', quantity: 1 },
      { name: 'Insulated jacket', category: 'clothes', quantity: 1 },
      { name: 'Rain gear', category: 'clothes', quantity: 1 },
      { name: 'Layering system', category: 'clothes', quantity: 6 },
      { name: 'Warm sleeping bag', category: 'miscellaneous', quantity: 1 },
      { name: 'Trekking poles', category: 'miscellaneous', quantity: 2 },
      { name: 'Headlamp with extra batteries', category: 'electronics', quantity: 1 },
      { name: 'Water purification system', category: 'toiletries', quantity: 1 },
      { name: 'Altitude sickness medication', category: 'toiletries', quantity: 1 },
      { name: 'Sunscreen SPF 50+', category: 'toiletries', quantity: 2 },
      { name: 'Lip balm with SPF', category: 'toiletries', quantity: 2 },
      { name: 'Glacier sunglasses', category: 'miscellaneous', quantity: 1 },
      { name: 'Sun hat', category: 'clothes', quantity: 1 },
      { name: 'Warm hat', category: 'clothes', quantity: 1 },
      { name: 'Liner gloves', category: 'clothes', quantity: 1 },
      { name: 'Insulated gloves', category: 'clothes', quantity: 1 },
      { name: 'Quick-dry hiking socks', category: 'clothes', quantity: 8 },
      { name: 'Moisture-wicking underwear', category: 'clothes', quantity: 6 },
      { name: 'Energy snacks', category: 'miscellaneous', quantity: 20 },
      { name: 'Electrolyte powder', category: 'toiletries', quantity: 10 },
      { name: 'First aid kit', category: 'toiletries', quantity: 1 },
      { name: 'Personal medications', category: 'toiletries', quantity: 1 },
      { name: 'Camera', category: 'electronics', quantity: 1 },
      { name: 'Summit celebration flag', category: 'miscellaneous', quantity: 1 },
    ],
  },
  {
    id: 'patagonia-trek',
    name: 'Patagonia Wilderness Trek',
    description: 'Wild landscapes and glacier exploration',
    destinationType: 'adventure',
    season: 'summer',
    duration: '10-14 days',
    icon: '🏔️',
    items: [
      { name: 'Waterproof hiking boots', category: 'clothes', quantity: 1 },
      { name: 'Camp shoes', category: 'clothes', quantity: 1 },
      { name: 'Waterproof jacket', category: 'clothes', quantity: 1 },
      { name: 'Insulated jacket', category: 'clothes', quantity: 1 },
      { name: 'Base layers', category: 'clothes', quantity: 5 },
      { name: 'Hiking pants', category: 'clothes', quantity: 3 },
      { name: 'Warm sleeping bag', category: 'miscellaneous', quantity: 1 },
      { name: 'Sleeping pad', category: 'miscellaneous', quantity: 1 },
      { name: 'Tent (4-season)', category: 'miscellaneous', quantity: 1 },
      { name: 'Cooking stove', category: 'miscellaneous', quantity: 1 },
      { name: 'Water filter', category: 'miscellaneous', quantity: 1 },
      { name: 'Trekking poles', category: 'miscellaneous', quantity: 2 },
      { name: 'Headlamp', category: 'electronics', quantity: 2 },
      { name: 'Emergency beacon', category: 'electronics', quantity: 1 },
      { name: 'Map and compass', category: 'miscellaneous', quantity: 1 },
      { name: 'Glacier travel gear', category: 'miscellaneous', quantity: 1 },
      { name: 'Wind-resistant gloves', category: 'clothes', quantity: 2 },
      { name: 'Sun hat', category: 'clothes', quantity: 1 },
      { name: 'Warm beanie', category: 'clothes', quantity: 1 },
      { name: 'Glacier glasses', category: 'miscellaneous', quantity: 1 },
      { name: 'High-energy food', category: 'miscellaneous', quantity: 30 },
      { name: 'Bear spray', category: 'miscellaneous', quantity: 1 },
      { name: 'First aid supplies', category: 'toiletries', quantity: 1 },
      { name: 'Emergency shelter', category: 'miscellaneous', quantity: 1 },
      { name: 'Camera in waterproof case', category: 'electronics', quantity: 1 },
    ],
  },
  {
    id: 'inca-trail',
    name: 'Inca Trail to Machu Picchu',
    description: 'Ancient Peruvian trail with archaeological sites',
    destinationType: 'adventure',
    season: 'winter',
    duration: '4-5 days',
    icon: '🏛️',
    items: [
      { name: 'Hiking boots', category: 'clothes', quantity: 1 },
      { name: 'Comfortable hiking socks', category: 'clothes', quantity: 6 },
      { name: 'Quick-dry hiking pants', category: 'clothes', quantity: 2 },
      { name: 'Moisture-wicking shirts', category: 'clothes', quantity: 4 },
      { name: 'Insulated jacket', category: 'clothes', quantity: 1 },
      { name: 'Rain poncho', category: 'clothes', quantity: 1 },
      { name: 'Warm sleeping bag', category: 'miscellaneous', quantity: 1 },
      { name: 'Sleeping pad', category: 'miscellaneous', quantity: 1 },
      { name: 'Trekking poles', category: 'miscellaneous', quantity: 2 },
      { name: 'Daypack', category: 'miscellaneous', quantity: 1 },
      { name: 'Headlamp', category: 'electronics', quantity: 1 },
      { name: 'Water bottles', category: 'miscellaneous', quantity: 3 },
      { name: 'Water purification tablets', category: 'toiletries', quantity: 20 },
      { name: 'Altitude sickness medication', category: 'toiletries', quantity: 1 },
      { name: 'Sunscreen', category: 'toiletries', quantity: 2 },
      { name: 'Sunglasses', category: 'miscellaneous', quantity: 1 },
      { name: 'Sun hat', category: 'clothes', quantity: 1 },
      { name: 'Warm hat', category: 'clothes', quantity: 1 },
      { name: 'Gloves', category: 'clothes', quantity: 1 },
      { name: 'Personal first aid kit', category: 'toiletries', quantity: 1 },
      { name: 'Energy bars', category: 'miscellaneous', quantity: 15 },
      { name: 'Electrolyte supplements', category: 'toiletries', quantity: 8 },
      { name: 'Camera', category: 'electronics', quantity: 1 },
      { name: 'Portable charger', category: 'electronics', quantity: 1 },
      { name: 'Machu Picchu entrance ticket', category: 'documents', quantity: 1 },
    ],
  },
  {
    id: 'alaska-wilderness',
    name: 'Alaska Wilderness Adventure',
    description: 'Remote wilderness camping and wildlife viewing',
    destinationType: 'adventure',
    season: 'summer',
    duration: '7-12 days',
    icon: '🐻',
    items: [
      { name: 'Insulated hiking boots', category: 'clothes', quantity: 1 },
      { name: 'Waterproof boots', category: 'clothes', quantity: 1 },
      { name: 'Warm layers', category: 'clothes', quantity: 8 },
      { name: 'Waterproof outer shell', category: 'clothes', quantity: 1 },
      { name: 'Insulated jacket', category: 'clothes', quantity: 1 },
      { name: 'Warm sleeping bag (-10°C)', category: 'miscellaneous', quantity: 1 },
      { name: 'Insulated sleeping pad', category: 'miscellaneous', quantity: 1 },
      { name: 'Four-season tent', category: 'miscellaneous', quantity: 1 },
      { name: 'Bear canister', category: 'miscellaneous', quantity: 2 },
      { name: 'Bear spray', category: 'miscellaneous', quantity: 2 },
      { name: 'Fishing gear', category: 'miscellaneous', quantity: 1 },
      { name: 'Water filter', category: 'miscellaneous', quantity: 1 },
      { name: 'Portable stove', category: 'miscellaneous', quantity: 1 },
      { name: 'Emergency beacon', category: 'electronics', quantity: 1 },
      { name: 'GPS device', category: 'electronics', quantity: 1 },
      { name: 'Binoculars for wildlife', category: 'miscellaneous', quantity: 1 },
      { name: 'Camera with telephoto lens', category: 'electronics', quantity: 1 },
      { name: 'Extra batteries', category: 'electronics', quantity: 10 },
      { name: 'Headlamp', category: 'electronics', quantity: 2 },
      { name: 'Mosquito net', category: 'miscellaneous', quantity: 1 },
      { name: 'Insect repellent', category: 'toiletries', quantity: 3 },
      { name: 'Sunscreen', category: 'toiletries', quantity: 2 },
      { name: 'First aid kit', category: 'toiletries', quantity: 1 },
      { name: 'Emergency signaling mirror', category: 'miscellaneous', quantity: 1 },
      { name: 'Wilderness permit', category: 'documents', quantity: 1 },
    ],
  },
  {
    id: 'sahara-desert',
    name: 'Sahara Desert Expedition',
    description: 'Camel trekking and desert camping experience',
    destinationType: 'adventure',
    season: 'winter',
    duration: '5-8 days',
    icon: '🐪',
    items: [
      { name: 'Desert boots', category: 'clothes', quantity: 1 },
      { name: 'Sandals for camp', category: 'clothes', quantity: 1 },
      { name: 'Long-sleeve shirts', category: 'clothes', quantity: 5 },
      { name: 'Long pants', category: 'clothes', quantity: 3 },
      { name: 'Lightweight scarf/turban', category: 'clothes', quantity: 3 },
      { name: 'Sun hat with neck protection', category: 'clothes', quantity: 1 },
      { name: 'Warm jacket for nights', category: 'clothes', quantity: 1 },
      { name: 'Sleeping bag (desert rated)', category: 'miscellaneous', quantity: 1 },
      { name: 'Insulated sleeping pad', category: 'miscellaneous', quantity: 1 },
      { name: 'Camel saddle padding', category: 'miscellaneous', quantity: 1 },
      { name: 'Water bottles (large)', category: 'miscellaneous', quantity: 4 },
      { name: 'Water purification tablets', category: 'toiletries', quantity: 30 },
      { name: 'Electrolyte powder', category: 'toiletries', quantity: 15 },
      { name: 'Sunscreen SPF 50+', category: 'toiletries', quantity: 3 },
      { name: 'Lip balm with SPF', category: 'toiletries', quantity: 3 },
      { name: 'Eye drops', category: 'toiletries', quantity: 2 },
      { name: 'Dust mask/bandana', category: 'clothes', quantity: 3 },
      { name: 'Sunglasses (wraparound)', category: 'miscellaneous', quantity: 2 },
      { name: 'Headlamp with red filter', category: 'electronics', quantity: 1 },
      { name: 'GPS device', category: 'electronics', quantity: 1 },
      { name: 'Camera with dust protection', category: 'electronics', quantity: 1 },
      { name: 'Extra batteries (sealed)', category: 'electronics', quantity: 8 },
      { name: 'Emergency whistle', category: 'miscellaneous', quantity: 1 },
      { name: 'First aid kit', category: 'toiletries', quantity: 1 },
      { name: 'Desert survival guide', category: 'documents', quantity: 1 },
    ],
  },
  {
    id: 'amazon-rainforest',
    name: 'Amazon Rainforest Exploration',
    description: 'Deep jungle adventure with wildlife observation',
    destinationType: 'adventure',
    season: 'winter',
    duration: '6-10 days',
    icon: '🦋',
    items: [
      { name: 'Waterproof hiking boots', category: 'clothes', quantity: 1 },
      { name: 'Quick-dry clothing', category: 'clothes', quantity: 8 },
      { name: 'Long-sleeve shirts', category: 'clothes', quantity: 5 },
      { name: 'Long pants', category: 'clothes', quantity: 4 },
      { name: 'Rain gear (full set)', category: 'clothes', quantity: 1 },
      { name: 'Gaiters', category: 'clothes', quantity: 1 },
      { name: 'Mosquito head net', category: 'clothes', quantity: 2 },
      { name: 'Insect repellent (DEET)', category: 'toiletries', quantity: 4 },
      { name: 'Permethrin-treated clothes', category: 'clothes', quantity: 3 },
      { name: 'Waterproof daypack', category: 'miscellaneous', quantity: 1 },
      { name: 'Dry bags', category: 'miscellaneous', quantity: 5 },
      { name: 'Water purification system', category: 'toiletries', quantity: 1 },
      { name: 'Headlamp (waterproof)', category: 'electronics', quantity: 2 },
      { name: 'Binoculars', category: 'miscellaneous', quantity: 1 },
      { name: 'Camera (waterproof case)', category: 'electronics', quantity: 1 },
      { name: 'Telephoto lens', category: 'electronics', quantity: 1 },
      { name: 'Field notebook (waterproof)', category: 'miscellaneous', quantity: 1 },
      { name: 'Wildlife identification guide', category: 'documents', quantity: 1 },
      { name: 'Machete (if permitted)', category: 'miscellaneous', quantity: 1 },
      { name: 'First aid kit (comprehensive)', category: 'toiletries', quantity: 1 },
      { name: 'Anti-malarial medication', category: 'toiletries', quantity: 1 },
      { name: 'Antifungal powder', category: 'toiletries', quantity: 1 },
      { name: 'Emergency signaling device', category: 'electronics', quantity: 1 },
      { name: 'Solar charger', category: 'electronics', quantity: 1 },
      { name: 'Hammock with mosquito net', category: 'miscellaneous', quantity: 1 },
    ],
  },
  {
    id: 'antarctica-expedition',
    name: 'Antarctica Scientific Expedition',
    description: 'Ultimate polar adventure and wildlife observation',
    destinationType: 'adventure',
    season: 'summer',
    duration: '10-21 days',
    icon: '🐧',
    items: [
      { name: 'Expedition parka', category: 'clothes', quantity: 1 },
      { name: 'Insulated boots', category: 'clothes', quantity: 1 },
      { name: 'Base layers (merino wool)', category: 'clothes', quantity: 6 },
      { name: 'Insulation layers', category: 'clothes', quantity: 4 },
      { name: 'Waterproof outer shell', category: 'clothes', quantity: 1 },
      { name: 'Insulated gloves', category: 'clothes', quantity: 2 },
      { name: 'Liner gloves', category: 'clothes', quantity: 3 },
      { name: 'Warm hat', category: 'clothes', quantity: 2 },
      { name: 'Balaclava', category: 'clothes', quantity: 1 },
      { name: 'Neck gaiter', category: 'clothes', quantity: 2 },
      { name: 'Glacier sunglasses', category: 'miscellaneous', quantity: 2 },
      { name: 'Sunscreen (glacier formula)', category: 'toiletries', quantity: 3 },
      { name: 'Camera (cold weather)', category: 'electronics', quantity: 1 },
      { name: 'Extra camera batteries', category: 'electronics', quantity: 10 },
      { name: 'Telephoto lens', category: 'electronics', quantity: 1 },
      { name: 'Binoculars', category: 'miscellaneous', quantity: 1 },
      { name: 'Waterproof daypack', category: 'miscellaneous', quantity: 1 },
      { name: 'Hand/foot warmers', category: 'miscellaneous', quantity: 20 },
      { name: 'Expedition journal', category: 'miscellaneous', quantity: 1 },
      { name: 'Waterproof pens', category: 'miscellaneous', quantity: 3 },
      { name: 'Emergency whistle', category: 'miscellaneous', quantity: 1 },
      { name: 'Personal locator beacon', category: 'electronics', quantity: 1 },
      { name: 'Seasickness medication', category: 'toiletries', quantity: 1 },
      { name: 'Antarctica wildlife guide', category: 'documents', quantity: 1 },
      { name: 'Expedition permit documents', category: 'documents', quantity: 1 },
    ],
  },
  {
    id: 'iceland-adventure',
    name: 'Iceland Ring Road Adventure',
    description: 'Volcanic landscapes, geysers, and northern lights',
    destinationType: 'adventure',
    season: 'winter',
    duration: '8-12 days',
    icon: '🌋',
    items: [
      { name: 'Waterproof hiking boots', category: 'clothes', quantity: 1 },
      { name: 'Crampons for glaciers', category: 'miscellaneous', quantity: 1 },
      { name: 'Warm layers', category: 'clothes', quantity: 8 },
      { name: 'Waterproof jacket', category: 'clothes', quantity: 1 },
      { name: 'Insulated jacket', category: 'clothes', quantity: 1 },
      { name: 'Thermal underwear', category: 'clothes', quantity: 4 },
      { name: 'Wool socks', category: 'clothes', quantity: 8 },
      { name: 'Waterproof gloves', category: 'clothes', quantity: 2 },
      { name: 'Warm hat', category: 'clothes', quantity: 2 },
      { name: 'Swimwear for hot springs', category: 'clothes', quantity: 1 },
      { name: 'Towel for hot springs', category: 'miscellaneous', quantity: 2 },
      { name: 'Camera (weather-sealed)', category: 'electronics', quantity: 1 },
      { name: 'Tripod for northern lights', category: 'electronics', quantity: 1 },
      { name: 'Extra batteries (cold weather)', category: 'electronics', quantity: 8 },
      { name: 'Headlamp', category: 'electronics', quantity: 1 },
      { name: 'GPS device', category: 'electronics', quantity: 1 },
      { name: 'Iceland road atlas', category: 'documents', quantity: 1 },
      { name: 'Northern lights forecast app', category: 'electronics', quantity: 1 },
      { name: 'Glacier hiking gear', category: 'miscellaneous', quantity: 1 },
      { name: 'Day backpack', category: 'miscellaneous', quantity: 1 },
      { name: 'Thermos for hot drinks', category: 'miscellaneous', quantity: 1 },
      { name: 'Hand warmers', category: 'miscellaneous', quantity: 15 },
      { name: 'Emergency blanket', category: 'miscellaneous', quantity: 1 },
      { name: 'First aid kit', category: 'toiletries', quantity: 1 },
      { name: 'Iceland geology guidebook', category: 'documents', quantity: 1 },
    ],
  },
  {
    id: 'new-zealand-adventure',
    name: 'New Zealand Adventure Sports',
    description: 'Extreme sports and outdoor activities paradise',
    destinationType: 'adventure',
    season: 'summer',
    duration: '10-14 days',
    icon: '🏂',
    items: [
      { name: 'Hiking boots', category: 'clothes', quantity: 1 },
      { name: 'Water shoes', category: 'clothes', quantity: 1 },
      { name: 'Quick-dry clothing', category: 'clothes', quantity: 8 },
      { name: 'Layers for altitude changes', category: 'clothes', quantity: 6 },
      { name: 'Rain gear', category: 'clothes', quantity: 1 },
      { name: 'Wetsuit (if not provided)', category: 'clothes', quantity: 1 },
      { name: 'Action camera', category: 'electronics', quantity: 1 },
      { name: 'Helmet (personal)', category: 'miscellaneous', quantity: 1 },
      { name: 'Bungee jumping confirmation', category: 'documents', quantity: 1 },
      { name: 'Skydiving booking', category: 'documents', quantity: 1 },
      { name: 'White-water rafting gear', category: 'miscellaneous', quantity: 1 },
      { name: 'Hiking daypack', category: 'miscellaneous', quantity: 1 },
      { name: 'Water bottles', category: 'miscellaneous', quantity: 3 },
      { name: 'Energy snacks', category: 'miscellaneous', quantity: 20 },
      { name: 'Sunscreen SPF 50+', category: 'toiletries', quantity: 2 },
      { name: 'Sunglasses', category: 'miscellaneous', quantity: 2 },
      { name: 'First aid kit', category: 'toiletries', quantity: 1 },
      { name: 'Portable charger', category: 'electronics', quantity: 2 },
      { name: 'Camera', category: 'electronics', quantity: 1 },
      { name: 'Travel insurance documents', category: 'documents', quantity: 1 },
      { name: 'Activity waivers', category: 'documents', quantity: 1 },
      { name: 'New Zealand adventure guide', category: 'documents', quantity: 1 },
      { name: 'Fiordland hiking map', category: 'documents', quantity: 1 },
      { name: 'Emergency contact list', category: 'documents', quantity: 1 },
      { name: 'Adrenaline activity schedule', category: 'documents', quantity: 1 },
    ],
  },

  // Business Travel (31-40)
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
  {
    id: 'international-sales',
    name: 'International Sales Mission',
    description: 'Multi-country client meetings and presentations',
    destinationType: 'business',
    season: 'all',
    duration: '7-10 days',
    icon: '🌐',
    items: [
      { name: 'Professional wardrobe variety', category: 'clothes', quantity: 8 },
      { name: 'Cultural-appropriate attire', category: 'clothes', quantity: 3 },
      { name: 'Comfortable travel shoes', category: 'clothes', quantity: 2 },
      { name: 'Laptop with international keyboard', category: 'electronics', quantity: 1 },
      { name: 'Multi-region power adapters', category: 'electronics', quantity: 3 },
      { name: 'Dual SIM phone', category: 'electronics', quantity: 1 },
      { name: 'International business cards', category: 'documents', quantity: 200 },
      { name: 'Translated product brochures', category: 'documents', quantity: 50 },
      { name: 'Presentation materials', category: 'documents', quantity: 1 },
      { name: 'Client gift items', category: 'miscellaneous', quantity: 15 },
      { name: 'Currency for each country', category: 'miscellaneous', quantity: 3 },
      { name: 'International contracts', category: 'documents', quantity: 10 },
      { name: 'Legal document translations', category: 'documents', quantity: 1 },
      { name: 'Time zone reference chart', category: 'documents', quantity: 1 },
      { name: 'Cultural etiquette guides', category: 'documents', quantity: 3 },
      { name: 'Backup presentation on USB', category: 'electronics', quantity: 2 },
      { name: 'Portable projector', category: 'electronics', quantity: 1 },
      { name: 'Noise-canceling headphones', category: 'electronics', quantity: 1 },
      { name: 'Travel-size grooming kit', category: 'toiletries', quantity: 1 },
      { name: 'Jet lag remedies', category: 'toiletries', quantity: 1 },
      { name: 'Emergency contact cards', category: 'documents', quantity: 5 },
      { name: 'International health insurance', category: 'documents', quantity: 1 },
      { name: 'Visa documentation', category: 'documents', quantity: 1 },
      { name: 'Client meeting schedules', category: 'documents', quantity: 1 },
      { name: 'Sales target worksheets', category: 'documents', quantity: 10 },
    ],
  },
  {
    id: 'startup-pitch-tour',
    name: 'Startup Investor Pitch Tour',
    description: 'Venture capital meetings and investor presentations',
    destinationType: 'business',
    season: 'all',
    duration: '5-7 days',
    icon: '🚀',
    items: [
      { name: 'Sharp professional attire', category: 'clothes', quantity: 5 },
      { name: 'Casual startup-appropriate wear', category: 'clothes', quantity: 3 },
      { name: 'Comfortable presentation shoes', category: 'clothes', quantity: 2 },
      { name: 'Laptop with pitch deck', category: 'electronics', quantity: 1 },
      { name: 'Backup laptop', category: 'electronics', quantity: 1 },
      { name: 'Product demo devices', category: 'electronics', quantity: 3 },
      { name: 'Pitch deck printouts', category: 'documents', quantity: 50 },
      { name: 'Business plan copies', category: 'documents', quantity: 20 },
      { name: 'Financial projections', category: 'documents', quantity: 20 },
      { name: 'Investor information packets', category: 'documents', quantity: 30 },
      { name: 'Prototype/product samples', category: 'miscellaneous', quantity: 5 },
      { name: 'Team business cards', category: 'documents', quantity: 100 },
      { name: 'Press kit materials', category: 'documents', quantity: 10 },
      { name: 'Company swag items', category: 'miscellaneous', quantity: 20 },
      { name: 'Legal documents folder', category: 'documents', quantity: 1 },
      { name: 'Reference letters', category: 'documents', quantity: 10 },
      { name: 'Market research reports', category: 'documents', quantity: 5 },
      { name: 'Competitor analysis sheets', category: 'documents', quantity: 15 },
      { name: 'Portable presentation clicker', category: 'electronics', quantity: 1 },
      { name: 'Power bank for demos', category: 'electronics', quantity: 2 },
      { name: 'HDMI/USB-C adapters', category: 'electronics', quantity: 2 },
      { name: 'Investor meeting schedule', category: 'documents', quantity: 1 },
      { name: 'Follow-up contact forms', category: 'documents', quantity: 50 },
      { name: 'Stress relief items', category: 'miscellaneous', quantity: 3 },
      { name: 'Celebration champagne', category: 'miscellaneous', quantity: 1 },
    ],
  },
  {
    id: 'consulting-project',
    name: 'Management Consulting Project',
    description: 'Client site work and strategic consulting engagement',
    destinationType: 'business',
    season: 'all',
    duration: '1-4 weeks',
    icon: '📊',
    items: [
      { name: 'Professional suits', category: 'clothes', quantity: 5 },
      { name: 'Business casual attire', category: 'clothes', quantity: 8 },
      { name: 'Client-appropriate footwear', category: 'clothes', quantity: 3 },
      { name: 'High-performance laptop', category: 'electronics', quantity: 1 },
      { name: 'External monitor (portable)', category: 'electronics', quantity: 1 },
      { name: 'Wireless mouse and keyboard', category: 'electronics', quantity: 1 },
      { name: 'Laptop stand', category: 'electronics', quantity: 1 },
      { name: 'Client project binders', category: 'documents', quantity: 5 },
      { name: 'Consulting frameworks cards', category: 'documents', quantity: 1 },
      { name: 'Analysis worksheets', category: 'documents', quantity: 30 },
      { name: 'Interview guide templates', category: 'documents', quantity: 10 },
      { name: 'Data collection forms', category: 'documents', quantity: 50 },
      { name: 'Whiteboard markers', category: 'miscellaneous', quantity: 8 },
      { name: 'Sticky notes variety pack', category: 'miscellaneous', quantity: 1 },
      { name: 'Professional notebooks', category: 'miscellaneous', quantity: 3 },
      { name: 'Quality pens', category: 'miscellaneous', quantity: 10 },
      { name: 'Calculator', category: 'electronics', quantity: 1 },
      { name: 'Voice recorder', category: 'electronics', quantity: 1 },
      { name: 'Meeting room supplies', category: 'miscellaneous', quantity: 1 },
      { name: 'Client deliverable templates', category: 'documents', quantity: 1 },
      { name: 'Project timeline charts', category: 'documents', quantity: 5 },
      { name: 'Stakeholder contact lists', category: 'documents', quantity: 1 },
      { name: 'Industry research materials', category: 'documents', quantity: 1 },
      { name: 'Benchmark data printouts', category: 'documents', quantity: 20 },
      { name: 'Professional thank you cards', category: 'miscellaneous', quantity: 20 },
    ],
  },
  {
    id: 'tech-conference',
    name: 'Technology Conference Speaker',
    description: 'Technical conference presentation and networking',
    destinationType: 'business',
    season: 'all',
    duration: '3-5 days',
    icon: '💻',
    items: [
      { name: 'Smart casual tech attire', category: 'clothes', quantity: 4 },
      { name: 'Comfortable presentation outfit', category: 'clothes', quantity: 2 },
      { name: 'Professional but relaxed shoes', category: 'clothes', quantity: 2 },
      { name: 'High-spec laptop', category: 'electronics', quantity: 1 },
      { name: 'Backup presentation device', category: 'electronics', quantity: 1 },
      { name: 'Multiple adapter cables', category: 'electronics', quantity: 1 },
      { name: 'Wireless presentation remote', category: 'electronics', quantity: 1 },
      { name: 'Live demo equipment', category: 'electronics', quantity: 1 },
      { name: 'Conference slides (USB backup)', category: 'electronics', quantity: 2 },
      { name: 'Speaker biography sheets', category: 'documents', quantity: 20 },
      { name: 'Technical documentation', category: 'documents', quantity: 30 },
      { name: 'Code examples printouts', category: 'documents', quantity: 50 },
      { name: 'Business cards with QR codes', category: 'documents', quantity: 200 },
      { name: 'Conference schedule', category: 'documents', quantity: 1 },
      { name: 'Networking contact sheets', category: 'documents', quantity: 50 },
      { name: 'Company swag for giveaways', category: 'miscellaneous', quantity: 100 },
      { name: 'Tech conference t-shirts', category: 'clothes', quantity: 3 },
      { name: 'Portable battery pack', category: 'electronics', quantity: 2 },
      { name: 'Phone tripod for social media', category: 'electronics', quantity: 1 },
      { name: 'Note-taking tablet', category: 'electronics', quantity: 1 },
      { name: 'Voice recorder for interviews', category: 'electronics', quantity: 1 },
      { name: 'Social media content plan', category: 'documents', quantity: 1 },
      { name: 'Follow-up email templates', category: 'documents', quantity: 1 },
      { name: 'Demo failure backup plan', category: 'documents', quantity: 1 },
      { name: 'Conference app login details', category: 'documents', quantity: 1 },
    ],
  },
  {
    id: 'pharmaceutical-sales',
    name: 'Pharmaceutical Sales Rounds',
    description: 'Medical professional visits and product demonstrations',
    destinationType: 'business',
    season: 'all',
    duration: '3-7 days',
    icon: '🏥',
    items: [
      { name: 'Professional medical attire', category: 'clothes', quantity: 5 },
      { name: 'Comfortable walking shoes', category: 'clothes', quantity: 2 },
      { name: 'Lab-appropriate clothing', category: 'clothes', quantity: 2 },
      { name: 'Tablet with medical apps', category: 'electronics', quantity: 1 },
      { name: 'Product sample cases', category: 'miscellaneous', quantity: 3 },
      { name: 'Medical literature', category: 'documents', quantity: 100 },
      { name: 'Clinical trial data', category: 'documents', quantity: 50 },
      { name: 'Product monographs', category: 'documents', quantity: 30 },
      { name: 'Dosage calculation charts', category: 'documents', quantity: 20 },
      { name: 'Adverse effects information', category: 'documents', quantity: 20 },
      { name: 'Competitor comparison sheets', category: 'documents', quantity: 40 },
      { name: 'Medical conference materials', category: 'documents', quantity: 10 },
      { name: 'Doctor appointment schedule', category: 'documents', quantity: 1 },
      { name: 'Hospital contact directory', category: 'documents', quantity: 1 },
      { name: 'Medical reference books', category: 'documents', quantity: 2 },
      { name: 'Prescription pads (samples)', category: 'miscellaneous', quantity: 20 },
      { name: 'Medical professional gifts', category: 'miscellaneous', quantity: 15 },
      { name: 'Hand sanitizer', category: 'toiletries', quantity: 3 },
      { name: 'Disposable gloves', category: 'miscellaneous', quantity: 20 },
      { name: 'Medical masks', category: 'miscellaneous', quantity: 10 },
      { name: 'Laptop for presentations', category: 'electronics', quantity: 1 },
      { name: 'Portable projector', category: 'electronics', quantity: 1 },
      { name: 'Medical journals', category: 'documents', quantity: 5 },
      { name: 'Continuing education credits', category: 'documents', quantity: 1 },
      { name: 'Regulatory compliance docs', category: 'documents', quantity: 1 },
    ],
  },
  {
    id: 'financial-audit',
    name: 'Financial Audit Assignment',
    description: 'Client site financial review and compliance work',
    destinationType: 'business',
    season: 'all',
    duration: '1-3 weeks',
    icon: '📋',
    items: [
      { name: 'Conservative business suits', category: 'clothes', quantity: 8 },
      { name: 'Professional blouses/shirts', category: 'clothes', quantity: 10 },
      { name: 'Comfortable office shoes', category: 'clothes', quantity: 3 },
      { name: 'Laptop with audit software', category: 'electronics', quantity: 1 },
      { name: 'Financial calculator', category: 'electronics', quantity: 1 },
      { name: 'Document scanner (portable)', category: 'electronics', quantity: 1 },
      { name: 'Audit workpaper binders', category: 'documents', quantity: 10 },
      { name: 'Financial statement templates', category: 'documents', quantity: 20 },
      { name: 'Compliance checklists', category: 'documents', quantity: 30 },
      { name: 'Audit procedure manuals', category: 'documents', quantity: 1 },
      { name: 'Sample testing worksheets', category: 'documents', quantity: 50 },
      { name: 'Internal control questionnaires', category: 'documents', quantity: 20 },
      { name: 'Risk assessment forms', category: 'documents', quantity: 15 },
      { name: 'Client communication letters', category: 'documents', quantity: 10 },
      { name: 'Accounting standards references', category: 'documents', quantity: 1 },
      { name: 'Highlighters (multiple colors)', category: 'miscellaneous', quantity: 6 },
      { name: 'Sticky flags for documents', category: 'miscellaneous', quantity: 100 },
      { name: 'Professional pens', category: 'miscellaneous', quantity: 8 },
      { name: 'Audit stamps', category: 'miscellaneous', quantity: 3 },
      { name: 'Document folders', category: 'miscellaneous', quantity: 20 },
      { name: 'Backup storage drives', category: 'electronics', quantity: 2 },
      { name: 'Secure document bags', category: 'miscellaneous', quantity: 3 },
      { name: 'Client interview forms', category: 'documents', quantity: 30 },
      { name: 'Regulatory reference materials', category: 'documents', quantity: 1 },
      { name: 'Professional liability insurance docs', category: 'documents', quantity: 1 },
    ],
  },
  {
    id: 'legal-deposition',
    name: 'Legal Deposition Travel',
    description: 'Court appearances and legal document work',
    destinationType: 'business',
    season: 'all',
    duration: '2-5 days',
    icon: '⚖️',
    items: [
      { name: 'Formal court attire', category: 'clothes', quantity: 3 },
      { name: 'Conservative business suits', category: 'clothes', quantity: 2 },
      { name: 'Professional court shoes', category: 'clothes', quantity: 2 },
      { name: 'Laptop with legal software', category: 'electronics', quantity: 1 },
      { name: 'Digital voice recorder', category: 'electronics', quantity: 1 },
      { name: 'Backup recording device', category: 'electronics', quantity: 1 },
      { name: 'Case file documents', category: 'documents', quantity: 1 },
      { name: 'Deposition transcripts', category: 'documents', quantity: 20 },
      { name: 'Legal precedent research', category: 'documents', quantity: 50 },
      { name: 'Witness interview notes', category: 'documents', quantity: 30 },
      { name: 'Evidence documentation', category: 'documents', quantity: 1 },
      { name: 'Court filing papers', category: 'documents', quantity: 10 },
      { name: 'Legal citations reference', category: 'documents', quantity: 1 },
      { name: 'Client authorization forms', category: 'documents', quantity: 15 },
      { name: 'Confidentiality agreements', category: 'documents', quantity: 10 },
      { name: 'Court reporter business cards', category: 'documents', quantity: 5 },
      { name: 'Legal pad notebooks', category: 'miscellaneous', quantity: 5 },
      { name: 'Professional pens', category: 'miscellaneous', quantity: 10 },
      { name: 'Document organizer tabs', category: 'miscellaneous', quantity: 50 },
      { name: 'Secure briefcase', category: 'miscellaneous', quantity: 1 },
      { name: 'Bar admission certificates', category: 'documents', quantity: 1 },
      { name: 'Professional liability insurance', category: 'documents', quantity: 1 },
      { name: 'Court schedule and directions', category: 'documents', quantity: 1 },
      { name: 'Emergency contact information', category: 'documents', quantity: 1 },
      { name: 'Legal ethics guidelines', category: 'documents', quantity: 1 },
    ],
  },
  {
    id: 'engineering-site-visit',
    name: 'Engineering Site Inspection',
    description: 'Technical site evaluation and engineering assessment',
    destinationType: 'business',
    season: 'all',
    duration: '3-7 days',
    icon: '⚙️',
    items: [
      { name: 'Safety boots (steel toe)', category: 'clothes', quantity: 1 },
      { name: 'Work pants/coveralls', category: 'clothes', quantity: 3 },
      { name: 'High-visibility safety vest', category: 'clothes', quantity: 2 },
      { name: 'Hard hat', category: 'miscellaneous', quantity: 1 },
      { name: 'Safety glasses', category: 'miscellaneous', quantity: 2 },
      { name: 'Work gloves', category: 'clothes', quantity: 3 },
      { name: 'Rugged tablet/laptop', category: 'electronics', quantity: 1 },
      { name: 'Engineering calculator', category: 'electronics', quantity: 1 },
      { name: 'Digital camera', category: 'electronics', quantity: 1 },
      { name: 'Measuring tools', category: 'miscellaneous', quantity: 1 },
      { name: 'Technical drawings/blueprints', category: 'documents', quantity: 20 },
      { name: 'Site inspection checklists', category: 'documents', quantity: 30 },
      { name: 'Engineering specifications', category: 'documents', quantity: 50 },
      { name: 'Safety compliance forms', category: 'documents', quantity: 20 },
      { name: 'Equipment manuals', category: 'documents', quantity: 5 },
      { name: 'Technical reference books', category: 'documents', quantity: 2 },
      { name: 'Site access permits', category: 'documents', quantity: 5 },
      { name: 'Professional engineer license', category: 'documents', quantity: 1 },
      { name: 'First aid kit', category: 'toiletries', quantity: 1 },
      { name: 'Flashlight with extra batteries', category: 'electronics', quantity: 1 },
      { name: 'Multi-tool', category: 'miscellaneous', quantity: 1 },
      { name: 'Site maps and layouts', category: 'documents', quantity: 10 },
      { name: 'Inspection report templates', category: 'documents', quantity: 20 },
      { name: 'Professional business cards', category: 'documents', quantity: 50 },
      { name: 'Emergency contact list', category: 'documents', quantity: 1 },
    ],
  },
  {
    id: 'medical-conference',
    name: 'Medical Conference Presentation',
    description: 'Healthcare professional conference and CME credits',
    destinationType: 'business',
    season: 'all',
    duration: '3-5 days',
    icon: '🩺',
    items: [
      { name: 'Professional medical attire', category: 'clothes', quantity: 4 },
      { name: 'Comfortable conference shoes', category: 'clothes', quantity: 2 },
      { name: 'White coat (if presenting)', category: 'clothes', quantity: 1 },
      { name: 'Laptop with medical presentations', category: 'electronics', quantity: 1 },
      { name: 'Medical reference tablet', category: 'electronics', quantity: 1 },
      { name: 'Research poster materials', category: 'documents', quantity: 1 },
      { name: 'Clinical study data', category: 'documents', quantity: 30 },
      { name: 'Medical journal articles', category: 'documents', quantity: 50 },
      { name: 'Patient case studies', category: 'documents', quantity: 20 },
      { name: 'Research methodology papers', category: 'documents', quantity: 15 },
      { name: 'Conference registration docs', category: 'documents', quantity: 1 },
      { name: 'CME credit tracking sheets', category: 'documents', quantity: 1 },
      { name: 'Professional networking cards', category: 'documents', quantity: 100 },
      { name: 'Medical license copies', category: 'documents', quantity: 3 },
      { name: 'Hospital affiliation letters', category: 'documents', quantity: 5 },
      { name: 'Research collaboration forms', category: 'documents', quantity: 10 },
      { name: 'Medical association memberships', category: 'documents', quantity: 1 },
      { name: 'Hand sanitizer', category: 'toiletries', quantity: 2 },
      { name: 'Medical masks', category: 'miscellaneous', quantity: 10 },
      { name: 'Professional name badge', category: 'miscellaneous', quantity: 1 },
      { name: 'Medical calculator', category: 'electronics', quantity: 1 },
      { name: 'Voice recorder for lectures', category: 'electronics', quantity: 1 },
      { name: 'Conference schedule planner', category: 'documents', quantity: 1 },
      { name: 'Research contact directory', category: 'documents', quantity: 1 },
      { name: 'Medical ethics guidelines', category: 'documents', quantity: 1 },
    ],
  },

  // Winter Sports & Cold Weather (41-50)
  {
    id: 'alpine-skiing',
    name: 'Alpine Skiing Adventure',
    description: 'Downhill skiing in mountain resorts',
    destinationType: 'winter',
    season: 'winter',
    duration: '5-7 days',
    icon: '⛷️',
    items: [
      { name: 'Ski jacket', category: 'clothes', quantity: 1 },
      { name: 'Ski pants', category: 'clothes', quantity: 2 },
      { name: 'Base layers', category: 'clothes', quantity: 4 },
      { name: 'Ski socks', category: 'clothes', quantity: 6 },
      { name: 'Ski boots', category: 'clothes', quantity: 1 },
      { name: 'Ski gloves', category: 'clothes', quantity: 2 },
      { name: 'Ski helmet', category: 'miscellaneous', quantity: 1 },
      { name: 'Ski goggles', category: 'miscellaneous', quantity: 2 },
      { name: 'Skis and bindings', category: 'miscellaneous', quantity: 1 },
      { name: 'Ski poles', category: 'miscellaneous', quantity: 1 },
      { name: 'Après-ski boots', category: 'clothes', quantity: 1 },
      { name: 'Warm evening wear', category: 'clothes', quantity: 3 },
      { name: 'Thermal underwear', category: 'clothes', quantity: 3 },
      { name: 'Neck warmer', category: 'clothes', quantity: 1 },
      { name: 'Hand/foot warmers', category: 'miscellaneous', quantity: 10 },
      { name: 'Sunscreen for snow', category: 'toiletries', quantity: 2 },
      { name: 'Lip balm with SPF', category: 'toiletries', quantity: 2 },
      { name: 'Lift tickets', category: 'documents', quantity: 1 },
      { name: 'Trail map', category: 'documents', quantity: 1 },
      { name: 'Emergency contact card', category: 'documents', quantity: 1 },
      { name: 'Action camera', category: 'electronics', quantity: 1 },
      { name: 'Extra camera batteries', category: 'electronics', quantity: 4 },
      { name: 'Portable charger', category: 'electronics', quantity: 1 },
      { name: 'First aid kit', category: 'toiletries', quantity: 1 },
      { name: 'Recovery drinks/snacks', category: 'miscellaneous', quantity: 10 },
    ],
  },
  {
    id: 'cross-country-skiing',
    name: 'Cross-Country Skiing Trek',
    description: 'Nordic skiing through winter landscapes',
    destinationType: 'winter',
    season: 'winter',
    duration: '3-5 days',
    icon: '🎿',
    items: [
      { name: 'Cross-country ski jacket', category: 'clothes', quantity: 1 },
      { name: 'Ski tights/pants', category: 'clothes', quantity: 2 },
      { name: 'Moisture-wicking base layers', category: 'clothes', quantity: 4 },
      { name: 'Cross-country ski boots', category: 'clothes', quantity: 1 },
      { name: 'Lightweight ski gloves', category: 'clothes', quantity: 2 },
      { name: 'Headband/light hat', category: 'clothes', quantity: 2 },
      { name: 'Cross-country skis', category: 'miscellaneous', quantity: 1 },
      { name: 'Ski poles', category: 'miscellaneous', quantity: 1 },
      { name: 'Ski wax kit', category: 'miscellaneous', quantity: 1 },
      { name: 'Trail snacks', category: 'miscellaneous', quantity: 15 },
      { name: 'Hydration system', category: 'miscellaneous', quantity: 1 },
      { name: 'Insulated water bottle', category: 'miscellaneous', quantity: 2 },
      { name: 'Trail maps', category: 'documents', quantity: 3 },
      { name: 'Emergency whistle', category: 'miscellaneous', quantity: 1 },
      { name: 'Spare ski tips', category: 'miscellaneous', quantity: 2 },
      { name: 'Multi-tool', category: 'miscellaneous', quantity: 1 },
      { name: 'First aid supplies', category: 'toiletries', quantity: 1 },
      { name: 'Sunglasses', category: 'miscellaneous', quantity: 1 },
      { name: 'Sunscreen', category: 'toiletries', quantity: 1 },
      { name: 'Hand warmers', category: 'miscellaneous', quantity: 8 },
      { name: 'Emergency shelter', category: 'miscellaneous', quantity: 1 },
      { name: 'Headlamp', category: 'electronics', quantity: 1 },
      { name: 'Camera', category: 'electronics', quantity: 1 },
      { name: 'Emergency contact info', category: 'documents', quantity: 1 },
      { name: 'Weather radio', category: 'electronics', quantity: 1 },
    ],
  },
  {
    id: 'snowboarding',
    name: 'Snowboarding Adventure',
    description: 'Freestyle and mountain snowboarding',
    destinationType: 'winter',
    season: 'winter',
    duration: '4-6 days',
    icon: '🏂',
    items: [
      { name: 'Snowboard jacket', category: 'clothes', quantity: 1 },
      { name: 'Snowboard pants', category: 'clothes', quantity: 2 },
      { name: 'Base layer tops', category: 'clothes', quantity: 3 },
      { name: 'Base layer bottoms', category: 'clothes', quantity: 3 },
      { name: 'Snowboard boots', category: 'clothes', quantity: 1 },
      { name: 'Snowboard gloves/mittens', category: 'clothes', quantity: 2 },
      { name: 'Snowboard helmet', category: 'miscellaneous', quantity: 1 },
      { name: 'Snowboard goggles', category: 'miscellaneous', quantity: 2 },
      { name: 'Snowboard', category: 'miscellaneous', quantity: 1 },
      { name: 'Snowboard bindings', category: 'miscellaneous', quantity: 1 },
      { name: 'Wrist guards', category: 'miscellaneous', quantity: 1 },
      { name: 'Impact shorts', category: 'clothes', quantity: 1 },
      { name: 'Après-snowboard wear', category: 'clothes', quantity: 3 },
      { name: 'Warm socks', category: 'clothes', quantity: 6 },
      { name: 'Face mask/balaclava', category: 'clothes', quantity: 1 },
      { name: 'Snowboard tool kit', category: 'miscellaneous', quantity: 1 },
      { name: 'Action camera with mounts', category: 'electronics', quantity: 1 },
      { name: 'Camera chest harness', category: 'electronics', quantity: 1 },
      { name: 'Extra action cam batteries', category: 'electronics', quantity: 6 },
      { name: 'Portable speaker', category: 'electronics', quantity: 1 },
      { name: 'Hand/foot warmers', category: 'miscellaneous', quantity: 12 },
      { name: 'Energy bars', category: 'miscellaneous', quantity: 15 },
      { name: 'Lift tickets', category: 'documents', quantity: 1 },
      { name: 'Mountain map', category: 'documents', quantity: 1 },
      { name: 'Recovery gear (ice packs)', category: 'toiletries', quantity: 3 },
    ],
  },
  {
    id: 'iceland-northern-lights',
    name: 'Iceland Northern Lights Chase',
    description: 'Winter aurora hunting and glacier exploration',
    destinationType: 'winter',
    season: 'winter',
    duration: '6-8 days',
    icon: '🌌',
    items: [
      { name: 'Extreme cold weather jacket', category: 'clothes', quantity: 1 },
      { name: 'Insulated winter pants', category: 'clothes', quantity: 2 },
      { name: 'Multiple warming layers', category: 'clothes', quantity: 6 },
      { name: 'Waterproof boots', category: 'clothes', quantity: 1 },
      { name: 'Crampons for ice', category: 'miscellaneous', quantity: 1 },
      { name: 'Insulated gloves', category: 'clothes', quantity: 2 },
      { name: 'Liner gloves', category: 'clothes', quantity: 2 },
      { name: 'Warm hat/beanie', category: 'clothes', quantity: 2 },
      { name: 'Face protection mask', category: 'clothes', quantity: 1 },
      { name: 'Camera for night photography', category: 'electronics', quantity: 1 },
      { name: 'Sturdy tripod', category: 'electronics', quantity: 1 },
      { name: 'Extra camera batteries', category: 'electronics', quantity: 8 },
      { name: 'Battery warming packs', category: 'electronics', quantity: 4 },
      { name: 'Memory cards', category: 'electronics', quantity: 3 },
      { name: 'Headlamp with red filter', category: 'electronics', quantity: 1 },
      { name: 'Aurora forecast app', category: 'electronics', quantity: 1 },
      { name: 'Thermos for hot drinks', category: 'miscellaneous', quantity: 2 },
      { name: 'Hand/foot warmers', category: 'miscellaneous', quantity: 20 },
      { name: 'Emergency blanket', category: 'miscellaneous', quantity: 1 },
      { name: 'Iceland road map', category: 'documents', quantity: 1 },
      { name: 'Northern lights photography guide', category: 'documents', quantity: 1 },
      { name: 'Weather app access', category: 'electronics', quantity: 1 },
      { name: 'Portable phone charger', category: 'electronics', quantity: 2 },
      { name: 'Warm sleeping bag', category: 'miscellaneous', quantity: 1 },
      { name: 'Photography filters', category: 'electronics', quantity: 3 },
    ],
  },
  {
    id: 'winter-camping',
    name: 'Winter Backcountry Camping',
    description: 'Cold weather wilderness camping experience',
    destinationType: 'winter',
    season: 'winter',
    duration: '3-5 days',
    icon: '🏕️',
    items: [
      { name: 'Four-season tent', category: 'miscellaneous', quantity: 1 },
      { name: 'Winter sleeping bag (-20°C)', category: 'miscellaneous', quantity: 1 },
      { name: 'Insulated sleeping pad', category: 'miscellaneous', quantity: 1 },
      { name: 'Backup sleeping pad', category: 'miscellaneous', quantity: 1 },
      { name: 'Winter hiking boots', category: 'clothes', quantity: 1 },
      { name: 'Snowshoes', category: 'miscellaneous', quantity: 1 },
      { name: 'Trekking poles', category: 'miscellaneous', quantity: 2 },
      { name: 'Multiple insulation layers', category: 'clothes', quantity: 8 },
      { name: 'Waterproof outer shell', category: 'clothes', quantity: 1 },
      { name: 'Insulated gloves', category: 'clothes', quantity: 3 },
      { name: 'Warm hat', category: 'clothes', quantity: 2 },
      { name: 'Balaclava', category: 'clothes', quantity: 1 },
      { name: 'Winter camp stove', category: 'miscellaneous', quantity: 1 },
      { name: 'Extra fuel', category: 'miscellaneous', quantity: 2 },
      { name: 'Insulated cookware', category: 'miscellaneous', quantity: 1 },
      { name: 'Water filter (winter grade)', category: 'miscellaneous', quantity: 1 },
      { name: 'Insulated water bottles', category: 'miscellaneous', quantity: 3 },
      { name: 'High-calorie food', category: 'miscellaneous', quantity: 20 },
      { name: 'Avalanche safety gear', category: 'miscellaneous', quantity: 1 },
      { name: 'Emergency beacon', category: 'electronics', quantity: 1 },
      { name: 'Headlamp', category: 'electronics', quantity: 2 },
      { name: 'Extra batteries', category: 'electronics', quantity: 12 },
      { name: 'First aid kit', category: 'toiletries', quantity: 1 },
      { name: 'Emergency shelter', category: 'miscellaneous', quantity: 1 },
      { name: 'Snow shovel', category: 'miscellaneous', quantity: 1 },
    ],
  },
  {
    id: 'dogsledding',
    name: 'Dogsledding Expedition',
    description: 'Arctic dog sledding adventure',
    destinationType: 'winter',
    season: 'winter',
    duration: '4-7 days',
    icon: '🐕',
    items: [
      { name: 'Arctic expedition parka', category: 'clothes', quantity: 1 },
      { name: 'Extreme cold weather pants', category: 'clothes', quantity: 2 },
      { name: 'Arctic boots', category: 'clothes', quantity: 1 },
      { name: 'Multiple warming layers', category: 'clothes', quantity: 6 },
      { name: 'Arctic mitts/gloves', category: 'clothes', quantity: 3 },
      { name: 'Face protection mask', category: 'clothes', quantity: 2 },
      { name: 'Warm hat with ear protection', category: 'clothes', quantity: 2 },
      { name: 'Dog handling gloves', category: 'clothes', quantity: 2 },
      { name: 'Sled driving instructions', category: 'documents', quantity: 1 },
      { name: 'Dog team safety guidelines', category: 'documents', quantity: 1 },
      { name: 'Emergency procedures card', category: 'documents', quantity: 1 },
      { name: 'GPS device', category: 'electronics', quantity: 1 },
      { name: 'Emergency beacon', category: 'electronics', quantity: 1 },
      { name: 'Headlamp', category: 'electronics', quantity: 2 },
      { name: 'Extra batteries (cold resistant)', category: 'electronics', quantity: 10 },
      { name: 'Camera (cold weather)', category: 'electronics', quantity: 1 },
      { name: 'Thermos for hot drinks', category: 'miscellaneous', quantity: 2 },
      { name: 'High-energy snacks', category: 'miscellaneous', quantity: 20 },
      { name: 'Hand/foot warmers', category: 'miscellaneous', quantity: 25 },
      { name: 'Emergency shelter', category: 'miscellaneous', quantity: 1 },
      { name: 'First aid kit', category: 'toiletries', quantity: 1 },
      { name: 'Dog treats', category: 'miscellaneous', quantity: 3 },
      { name: 'Emergency whistle', category: 'miscellaneous', quantity: 1 },
      { name: 'Trail maps', category: 'documents', quantity: 2 },
      { name: 'Weather radio', category: 'electronics', quantity: 1 },
    ],
  },
  {
    id: 'ice-climbing',
    name: 'Ice Climbing Adventure',
    description: 'Technical ice climbing and mountaineering',
    destinationType: 'winter',
    season: 'winter',
    duration: '5-8 days',
    icon: '🧗',
    items: [
      { name: 'Mountaineering boots', category: 'clothes', quantity: 1 },
      { name: 'Crampons', category: 'miscellaneous', quantity: 1 },
      { name: 'Ice axes', category: 'miscellaneous', quantity: 2 },
      { name: 'Ice climbing harness', category: 'miscellaneous', quantity: 1 },
      { name: 'Climbing helmet', category: 'miscellaneous', quantity: 1 },
      { name: 'Dynamic climbing rope', category: 'miscellaneous', quantity: 1 },
      { name: 'Ice screws', category: 'miscellaneous', quantity: 10 },
      { name: 'Carabiners', category: 'miscellaneous', quantity: 15 },
      { name: 'Belay device', category: 'miscellaneous', quantity: 1 },
      { name: 'Insulated climbing jacket', category: 'clothes', quantity: 1 },
      { name: 'Climbing pants', category: 'clothes', quantity: 2 },
      { name: 'Base layers', category: 'clothes', quantity: 5 },
      { name: 'Climbing gloves', category: 'clothes', quantity: 3 },
      { name: 'Liner gloves', category: 'clothes', quantity: 2 },
      { name: 'Climbing gaiters', category: 'clothes', quantity: 1 },
      { name: 'Glacier glasses', category: 'miscellaneous', quantity: 2 },
      { name: 'Avalanche safety equipment', category: 'miscellaneous', quantity: 1 },
      { name: 'Emergency beacon', category: 'electronics', quantity: 1 },
      { name: 'First aid kit', category: 'toiletries', quantity: 1 },
      { name: 'High-energy food', category: 'miscellaneous', quantity: 25 },
      { name: 'Insulated water bottles', category: 'miscellaneous', quantity: 2 },
      { name: 'Headlamp', category: 'electronics', quantity: 2 },
      { name: 'Emergency shelter', category: 'miscellaneous', quantity: 1 },
      { name: 'Route guidebook', category: 'documents', quantity: 1 },
      { name: 'Weather forecast device', category: 'electronics', quantity: 1 },
    ],
  },
  {
    id: 'christmas-markets',
    name: 'European Christmas Markets',
    description: 'Festive holiday market tour across Europe',
    destinationType: 'winter',
    season: 'winter',
    duration: '7-10 days',
    icon: '🎄',
    items: [
      { name: 'Warm winter coat', category: 'clothes', quantity: 1 },
      { name: 'Layered clothing', category: 'clothes', quantity: 8 },
      { name: 'Comfortable walking boots', category: 'clothes', quantity: 1 },
      { name: 'Warm accessories', category: 'clothes', quantity: 4 },
      { name: 'Festive holiday attire', category: 'clothes', quantity: 3 },
      { name: 'Christmas market guidebook', category: 'documents', quantity: 1 },
      { name: 'European travel passes', category: 'documents', quantity: 1 },
      { name: 'Currency for each country', category: 'miscellaneous', quantity: 5 },
      { name: 'Shopping list for gifts', category: 'documents', quantity: 1 },
      { name: 'Extra luggage space items', category: 'miscellaneous', quantity: 2 },
      { name: 'Camera for festive photos', category: 'electronics', quantity: 1 },
      { name: 'Portable charger', category: 'electronics', quantity: 1 },
      { name: 'Multi-country adapter', category: 'electronics', quantity: 1 },
      { name: 'Thermos for glühwein', category: 'miscellaneous', quantity: 1 },
      { name: 'Hand warmers', category: 'miscellaneous', quantity: 10 },
      { name: 'Folding shopping bags', category: 'miscellaneous', quantity: 5 },
      { name: 'Gift wrapping supplies', category: 'miscellaneous', quantity: 1 },
      { name: 'Address list for postcards', category: 'documents', quantity: 1 },
      { name: 'Holiday craft supplies', category: 'miscellaneous', quantity: 3 },
      { name: 'Festive jewelry', category: 'miscellaneous', quantity: 2 },
      { name: 'Christmas market map', category: 'documents', quantity: 1 },
      { name: 'Traditional recipe cards', category: 'documents', quantity: 5 },
      { name: 'Holiday music playlist', category: 'electronics', quantity: 1 },
      { name: 'Celebration planning notebook', category: 'miscellaneous', quantity: 1 },
      { name: 'Shipping supplies for gifts', category: 'miscellaneous', quantity: 1 },
    ],
  },
  {
    id: 'winter-photography',
    name: 'Winter Landscape Photography',
    description: 'Cold weather photography expedition',
    destinationType: 'winter',
    season: 'winter',
    duration: '5-8 days',
    icon: '📸',
    items: [
      { name: 'Insulated camera jacket', category: 'electronics', quantity: 1 },
      { name: 'Weather-sealed camera body', category: 'electronics', quantity: 1 },
      { name: 'Backup camera body', category: 'electronics', quantity: 1 },
      { name: 'Cold weather lenses', category: 'electronics', quantity: 3 },
      { name: 'Carbon fiber tripod', category: 'electronics', quantity: 1 },
      { name: 'Multiple memory cards', category: 'electronics', quantity: 6 },
      { name: 'Extra camera batteries', category: 'electronics', quantity: 12 },
      { name: 'Battery warming system', category: 'electronics', quantity: 1 },
      { name: 'Photography filters (ND, CPL)', category: 'electronics', quantity: 5 },
      { name: 'Lens cleaning supplies', category: 'electronics', quantity: 1 },
      { name: 'Waterproof camera bag', category: 'electronics', quantity: 1 },
      { name: 'Laptop for editing', category: 'electronics', quantity: 1 },
      { name: 'Portable hard drive', category: 'electronics', quantity: 1 },
      { name: 'Warm photography gloves', category: 'clothes', quantity: 2 },
      { name: 'Photographer's vest', category: 'clothes', quantity: 1 },
      { name: 'Insulated boots', category: 'clothes', quantity: 1 },
      { name: 'Layered clothing system', category: 'clothes', quantity: 6 },
      { name: 'Headlamp with red filter', category: 'electronics', quantity: 1 },
      { name: 'Location scouting maps', category: 'documents', quantity: 3 },
      { name: 'Sunrise/sunset timing charts', category: 'documents', quantity: 1 },
      { name: 'Weather monitoring app', category: 'electronics', quantity: 1 },
      { name: 'Photography permit documents', category: 'documents', quantity: 1 },
      { name: 'Emergency communication device', category: 'electronics', quantity: 1 },
      { name: 'Thermos for hot drinks', category: 'miscellaneous', quantity: 1 },
      { name: 'Hand/foot warmers', category: 'miscellaneous', quantity: 15 },
    ],
  },
  {
    id: 'arctic-expedition',
    name: 'Arctic Research Expedition',
    description: 'Scientific research in extreme arctic conditions',
    destinationType: 'winter',
    season: 'winter',
    duration: '14-21 days',
    icon: '🔬',
    items: [
      { name: 'Extreme cold weather suit', category: 'clothes', quantity: 1 },
      { name: 'Arctic boots', category: 'clothes', quantity: 1 },
      { name: 'Multiple base layer sets', category: 'clothes', quantity: 8 },
      { name: 'Insulation layer system', category: 'clothes', quantity: 5 },
      { name: 'Arctic mitts', category: 'clothes', quantity: 3 },
      { name: 'Face protection gear', category: 'clothes', quantity: 2 },
      { name: 'Scientific equipment', category: 'electronics', quantity: 1 },
      { name: 'Backup scientific instruments', category: 'electronics', quantity: 1 },
      { name: 'Data recording devices', category: 'electronics', quantity: 2 },
      { name: 'Satellite communication device', category: 'electronics', quantity: 1 },
      { name: 'Emergency beacon', category: 'electronics', quantity: 2 },
      { name: 'GPS navigation system', category: 'electronics', quantity: 1 },
      { name: 'Solar power system', category: 'electronics', quantity: 1 },
      { name: 'Cold weather batteries', category: 'electronics', quantity: 20 },
      { name: 'Research documentation', category: 'documents', quantity: 1 },
      { name: 'Expedition permits', category: 'documents', quantity: 1 },
      { name: 'Emergency procedures manual', category: 'documents', quantity: 1 },
      { name: 'Arctic survival gear', category: 'miscellaneous', quantity: 1 },
      { name: 'Emergency shelter system', category: 'miscellaneous', quantity: 1 },
      { name: 'High-calorie expedition food', category: 'miscellaneous', quantity: 50 },
      { name: 'Water purification system', category: 'miscellaneous', quantity: 1 },
      { name: 'First aid kit (comprehensive)', category: 'toiletries', quantity: 1 },
      { name: 'Emergency medical supplies', category: 'toiletries', quantity: 1 },
      { name: 'Sample collection containers', category: 'miscellaneous', quantity: 20 },
      { name: 'Research sample preservation', category: 'miscellaneous', quantity: 1 },
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