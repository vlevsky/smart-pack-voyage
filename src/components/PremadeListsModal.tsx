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
    id: 'maldives-resort',
    name: 'Maldives Resort Escape',
    description: 'Luxury resort vacation in the Maldives.',
    destinationType: 'beach',
    season: 'tropical',
    items: [
      { name: 'Swimwear', category: 'clothes', quantity: 3 },
      { name: 'Resort wear', category: 'clothes', quantity: 4 },
      { name: 'Evening dress', category: 'clothes', quantity: 2 },
      { name: 'Snorkeling mask', category: 'miscellaneous', quantity: 1 },
      { name: 'Underwater shoes', category: 'clothes', quantity: 1 },
      { name: 'Luxury sunscreen', category: 'toiletries', quantity: 1 },
      { name: 'Designer sunglasses', category: 'miscellaneous', quantity: 1 },
      { name: 'Beach hat', category: 'clothes', quantity: 1 },
      { name: 'Resort sandals', category: 'clothes', quantity: 2 },
      { name: 'Dinner attire', category: 'clothes', quantity: 2 },
      { name: 'Waterproof camera', category: 'electronics', quantity: 1 },
      { name: 'Portable charger', category: 'electronics', quantity: 1 },
      { name: 'Travel jewelry', category: 'miscellaneous', quantity: 1 },
      { name: 'Beach bag', category: 'miscellaneous', quantity: 1 },
      { name: 'Moisturizing lotion', category: 'toiletries', quantity: 1 },
      { name: 'Hair protection spray', category: 'toiletries', quantity: 1 },
      { name: 'Reef-safe sunscreen', category: 'toiletries', quantity: 1 },
      { name: 'After-sun care', category: 'toiletries', quantity: 1 },
      { name: 'Light scarf', category: 'clothes', quantity: 1 },
      { name: 'Reading material', category: 'miscellaneous', quantity: 2 },
      { name: 'Beach towel', category: 'miscellaneous', quantity: 1 },
      { name: 'Water bottle', category: 'miscellaneous', quantity: 1 },
      { name: 'Flip flops', category: 'clothes', quantity: 1 },
      { name: 'Light jacket', category: 'clothes', quantity: 1 },
      { name: 'Casual shorts', category: 'clothes', quantity: 3 },
      { name: 'Tank tops', category: 'clothes', quantity: 4 },
    ],
  },
  {
    id: 'caribbean-cruise',
    name: 'Caribbean Cruise',
    description: 'Items for a relaxing Caribbean cruise vacation.',
    destinationType: 'beach',
    season: 'tropical',
    items: [
      { name: 'Formal dinner attire', category: 'clothes', quantity: 2 },
      { name: 'Cocktail dress', category: 'clothes', quantity: 2 },
      { name: 'Dress shirts', category: 'clothes', quantity: 3 },
      { name: 'Swimsuit', category: 'clothes', quantity: 3 },
      { name: 'Beach cover-up', category: 'clothes', quantity: 2 },
      { name: 'Cruise casual wear', category: 'clothes', quantity: 5 },
      { name: 'Deck shoes', category: 'clothes', quantity: 1 },
      { name: 'Formal shoes', category: 'clothes', quantity: 1 },
      { name: 'Sun hat', category: 'clothes', quantity: 1 },
      { name: 'Motion sickness patches', category: 'toiletries', quantity: 1 },
      { name: 'Seasickness medication', category: 'toiletries', quantity: 1 },
      { name: 'Binoculars', category: 'miscellaneous', quantity: 1 },
      { name: 'Sunscreen', category: 'toiletries', quantity: 1 },
      { name: 'Lanyard for ship card', category: 'miscellaneous', quantity: 1 },
      { name: 'Reusable water bottle', category: 'miscellaneous', quantity: 1 },
      { name: 'Beach bag', category: 'miscellaneous', quantity: 1 },
      { name: 'Power strip', category: 'electronics', quantity: 1 },
      { name: 'Magnetic hooks', category: 'miscellaneous', quantity: 3, thoroughnessLevel: 'balanced' },
      { name: 'Evening shawl', category: 'clothes', quantity: 1 },
      { name: 'Excursion bag', category: 'miscellaneous', quantity: 1 },
      { name: 'Underwater camera', category: 'electronics', quantity: 1, thoroughnessLevel: 'balanced' },
      { name: 'Portable fan', category: 'electronics', quantity: 1, thoroughnessLevel: 'thorough' },
      { name: 'Dress shoes', category: 'clothes', quantity: 1 },
      { name: 'Casual shoes', category: 'clothes', quantity: 1 },
      { name: 'Light jacket', category: 'clothes', quantity: 1 },
      { name: 'Shorts', category: 'clothes', quantity: 4 },
    ],
  },
  {
    id: 'miami-beach',
    name: 'Miami Beach Getaway',
    description: 'Vibrant beach vacation in Miami.',
    destinationType: 'beach',
    season: 'summer',
    items: [
      { name: 'Designer swimwear', category: 'clothes', quantity: 2 },
      { name: 'Beach dress', category: 'clothes', quantity: 3 },
      { name: 'Party dress', category: 'clothes', quantity: 2 },
      { name: 'Designer sunglasses', category: 'miscellaneous', quantity: 1 },
      { name: 'Beach hat', category: 'clothes', quantity: 1 },
      { name: 'Strappy sandals', category: 'clothes', quantity: 2 },
      { name: 'High heels', category: 'clothes', quantity: 1 },
      { name: 'Flip flops', category: 'clothes', quantity: 1 },
      { name: 'Beach bag', category: 'miscellaneous', quantity: 1 },
      { name: 'Clutch purse', category: 'miscellaneous', quantity: 1 },
      { name: 'Sunscreen', category: 'toiletries', quantity: 1 },
      { name: 'Tanning oil', category: 'toiletries', quantity: 1 },
      { name: 'After-sun lotion', category: 'toiletries', quantity: 1 },
      { name: 'Waterproof mascara', category: 'toiletries', quantity: 1 },
      { name: 'Hair ties', category: 'toiletries', quantity: 5 },
      { name: 'Beach towel', category: 'miscellaneous', quantity: 1 },
      { name: 'Portable speaker', category: 'electronics', quantity: 1, thoroughnessLevel: 'balanced' },
      { name: 'Waterproof phone case', category: 'electronics', quantity: 1 },
      { name: 'Portable charger', category: 'electronics', quantity: 1 },
      { name: 'Camera', category: 'electronics', quantity: 1 },
      { name: 'Light cardigan', category: 'clothes', quantity: 1 },
      { name: 'Shorts', category: 'clothes', quantity: 3 },
      { name: 'Tank tops', category: 'clothes', quantity: 4 },
      { name: 'Beach cover-up', category: 'clothes', quantity: 2 },
      { name: 'Evening jacket', category: 'clothes', quantity: 1 },
      { name: 'Casual wear', category: 'clothes', quantity: 3 },
    ],
  },

  // City Breaks & Urban Exploration
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
    id: 'london-weekend',
    name: 'London Weekend Break',
    description: 'Short city break in London.',
    destinationType: 'city',
    season: 'fall',
    items: [
      { name: 'Waterproof jacket', category: 'clothes', quantity: 1 },
      { name: 'Umbrella', category: 'miscellaneous', quantity: 1 },
      { name: 'Comfortable walking shoes', category: 'clothes', quantity: 1 },
      { name: 'Warm layers', category: 'clothes', quantity: 3 },
      { name: 'Oyster card', category: 'documents', quantity: 1 },
      { name: 'Theatre tickets', category: 'documents', quantity: 1, thoroughnessLevel: 'balanced' },
      { name: 'Pub outfit', category: 'clothes', quantity: 1 },
      { name: 'Nice dinner attire', category: 'clothes', quantity: 1 },
      { name: 'Jeans', category: 'clothes', quantity: 2 },
      { name: 'Sweater', category: 'clothes', quantity: 1 },
      { name: 'Scarf', category: 'clothes', quantity: 1 },
      { name: 'Gloves', category: 'clothes', quantity: 1 },
      { name: 'Portable charger', category: 'electronics', quantity: 1 },
      { name: 'Camera', category: 'electronics', quantity: 1 },
      { name: 'Guidebook', category: 'documents', quantity: 1 },
      { name: 'Cash and cards', category: 'documents', quantity: 1 },
      { name: 'Hand cream', category: 'toiletries', quantity: 1 },
      { name: 'Lip balm', category: 'toiletries', quantity: 1 },
      { name: 'Tissues', category: 'toiletries', quantity: 2 },
      { name: 'Undergarments', category: 'clothes', quantity: 3 },
      { name: 'Warm socks', category: 'clothes', quantity: 3 },
      { name: 'Casual shirts', category: 'clothes', quantity: 2 },
      { name: 'Formal shoes', category: 'clothes', quantity: 1 },
      { name: 'Day bag', category: 'miscellaneous', quantity: 1 },
      { name: 'Water bottle', category: 'miscellaneous', quantity: 1 },
      { name: 'Snacks', category: 'miscellaneous', quantity: 2 },
    ],
  },

  // Outdoor & Adventure
  {
    id: 'camping-adventure',
    name: 'Camping Adventure',
    description: 'All the essentials for a weekend camping trip in the wilderness.',
    destinationType: 'outdoors',
    season: 'fall',
    items: [
      { name: 'Tent', category: 'miscellaneous', quantity: 1 },
      { name: 'Sleeping bag', category: 'miscellaneous', quantity: 1 },
      { name: 'Sleeping pad', category: 'miscellaneous', quantity: 1 },
      { name: 'Pillow or inflatable pillow', category: 'miscellaneous', quantity: 1 },
      { name: 'Headlamp', category: 'electronics', quantity: 1 },
      { name: 'Flashlight', category: 'electronics', quantity: 1 },
      { name: 'Extra batteries', category: 'electronics', quantity: 4 },
      { name: 'Portable charger', category: 'electronics', quantity: 1 },
      { name: 'Insect repellent', category: 'toiletries', quantity: 1 },
      { name: 'Sunscreen', category: 'toiletries', quantity: 1 },
      { name: 'First aid kit', category: 'miscellaneous', quantity: 1 },
      { name: 'Water bottles', category: 'miscellaneous', quantity: 2 },
      { name: 'Water purification tablets', category: 'miscellaneous', quantity: 1 },
      { name: 'Camping stove', category: 'miscellaneous', quantity: 1 },
      { name: 'Fuel for stove', category: 'miscellaneous', quantity: 1 },
      { name: 'Matches/lighter', category: 'miscellaneous', quantity: 2 },
      { name: 'Cooking pot', category: 'miscellaneous', quantity: 1 },
      { name: 'Camping utensils', category: 'miscellaneous', quantity: 1 },
      { name: 'Camping food', category: 'miscellaneous', quantity: 5 },
      { name: 'Trash bags', category: 'miscellaneous', quantity: 3 },
      { name: 'Rope/paracord', category: 'miscellaneous', quantity: 1 },
      { name: 'Multi-tool', category: 'miscellaneous', quantity: 1 },
      { name: 'Warm clothes', category: 'clothes', quantity: 3 },
      { name: 'Rain gear', category: 'clothes', quantity: 1 },
      { name: 'Hiking boots', category: 'clothes', quantity: 1 },
      { name: 'Hiking socks', category: 'clothes', quantity: 3 },
    ],
  },
  {
    id: 'ski-trip',
    name: 'Ski Trip',
    description: 'Gear and clothing for a fun and safe ski trip in the mountains.',
    destinationType: 'outdoors',
    season: 'winter',
    items: [
      { name: 'Ski jacket', category: 'clothes', quantity: 1 },
      { name: 'Ski pants', category: 'clothes', quantity: 1 },
      { name: 'Base layer top', category: 'clothes', quantity: 2 },
      { name: 'Base layer bottom', category: 'clothes', quantity: 2 },
      { name: 'Mid-layer fleece', category: 'clothes', quantity: 1 },
      { name: 'Ski gloves', category: 'clothes', quantity: 1 },
      { name: 'Liner gloves', category: 'clothes', quantity: 1 },
      { name: 'Ski goggles', category: 'miscellaneous', quantity: 1 },
      { name: 'Ski helmet', category: 'miscellaneous', quantity: 1 },
      { name: 'Ski socks', category: 'clothes', quantity: 4 },
      { name: 'Thermal underwear', category: 'clothes', quantity: 2 },
      { name: 'Neck gaiter', category: 'clothes', quantity: 1 },
      { name: 'Warm hat', category: 'clothes', quantity: 1 },
      { name: 'Après-ski boots', category: 'clothes', quantity: 1 },
      { name: 'Casual wear', category: 'clothes', quantity: 3 },
      { name: 'Ski equipment', category: 'miscellaneous', quantity: 1, thoroughnessLevel: 'thorough' },
      { name: 'Hand warmers', category: 'miscellaneous', quantity: 10 },
      { name: 'Foot warmers', category: 'miscellaneous', quantity: 5 },
      { name: 'Sunscreen', category: 'toiletries', quantity: 1 },
      { name: 'Lip balm with SPF', category: 'toiletries', quantity: 1 },
      { name: 'Moisturizer', category: 'toiletries', quantity: 1 },
      { name: 'Lift tickets', category: 'documents', quantity: 1 },
      { name: 'Resort map', category: 'documents', quantity: 1 },
      { name: 'Emergency contact info', category: 'documents', quantity: 1 },
      { name: 'Backpack for slopes', category: 'miscellaneous', quantity: 1 },
      { name: 'Water bottle', category: 'miscellaneous', quantity: 1 },
    ],
  },
  {
    id: 'hiking-adventure',
    name: 'Multi-Day Hiking Trip',
    description: 'Essential gear for a multi-day hiking adventure.',
    destinationType: 'outdoors',
    season: 'summer',
    items: [
      { name: 'Hiking backpack', category: 'miscellaneous', quantity: 1 },
      { name: 'Hiking boots', category: 'clothes', quantity: 1 },
      { name: 'Hiking socks', category: 'clothes', quantity: 5 },
      { name: 'Moisture-wicking shirts', category: 'clothes', quantity: 3 },
      { name: 'Hiking pants', category: 'clothes', quantity: 2 },
      { name: 'Hiking shorts', category: 'clothes', quantity: 2 },
      { name: 'Rain jacket', category: 'clothes', quantity: 1 },
      { name: 'Warm layer', category: 'clothes', quantity: 1 },
      { name: 'Sun hat', category: 'clothes', quantity: 1 },
      { name: 'Hiking gloves', category: 'clothes', quantity: 1 },
      { name: 'Trekking poles', category: 'miscellaneous', quantity: 2 },
      { name: 'Water bottles', category: 'miscellaneous', quantity: 2 },
      { name: 'Water filter', category: 'miscellaneous', quantity: 1 },
      { name: 'Hydration reservoir', category: 'miscellaneous', quantity: 1 },
      { name: 'Trail snacks', category: 'miscellaneous', quantity: 10 },
      { name: 'Camping stove', category: 'miscellaneous', quantity: 1 },
      { name: 'Lightweight tent', category: 'miscellaneous', quantity: 1 },
      { name: 'Sleeping bag', category: 'miscellaneous', quantity: 1 },
      { name: 'Sleeping pad', category: 'miscellaneous', quantity: 1 },
      { name: 'Headlamp', category: 'electronics', quantity: 1 },
      { name: 'GPS device', category: 'electronics', quantity: 1 },
      { name: 'Maps', category: 'documents', quantity: 1 },
      { name: 'Compass', category: 'miscellaneous', quantity: 1 },
      { name: 'First aid kit', category: 'miscellaneous', quantity: 1 },
      { name: 'Blister patches', category: 'toiletries', quantity: 5 },
      { name: 'Sunscreen', category: 'toiletries', quantity: 1 },
    ],
  },
  {
    id: 'safari-adventure',
    name: 'African Safari',
    description: 'Clothing and gear for an exciting safari adventure.',
    destinationType: 'outdoors',
    season: 'dry',
    items: [
      { name: 'Binoculars', category: 'miscellaneous', quantity: 1 },
      { name: 'Camera with telephoto lens', category: 'electronics', quantity: 1 },
      { name: 'Extra camera batteries', category: 'electronics', quantity: 4 },
      { name: 'Memory cards', category: 'electronics', quantity: 3 },
      { name: 'Long-sleeved shirts', category: 'clothes', quantity: 4 },
      { name: 'Safari pants', category: 'clothes', quantity: 3 },
      { name: 'Safari hat', category: 'clothes', quantity: 1 },
      { name: 'Safari vest', category: 'clothes', quantity: 1 },
      { name: 'Hiking boots', category: 'clothes', quantity: 1 },
      { name: 'Comfortable walking shoes', category: 'clothes', quantity: 1 },
      { name: 'Insect repellent', category: 'toiletries', quantity: 1 },
      { name: 'Strong sunscreen', category: 'toiletries', quantity: 1 },
      { name: 'Malaria medication', category: 'toiletries', quantity: 1 },
      { name: 'First aid kit', category: 'miscellaneous', quantity: 1 },
      { name: 'Flashlight', category: 'electronics', quantity: 1 },
      { name: 'Headlamp', category: 'electronics', quantity: 1 },
      { name: 'Day pack', category: 'miscellaneous', quantity: 1 },
      { name: 'Water bottles', category: 'miscellaneous', quantity: 2 },
      { name: 'Water purification tablets', category: 'miscellaneous', quantity: 1 },
      { name: 'Warm jacket', category: 'clothes', quantity: 1 },
      { name: 'Lightweight scarf', category: 'clothes', quantity: 1 },
      { name: 'Safari guide book', category: 'documents', quantity: 1 },
      { name: 'Notebook', category: 'miscellaneous', quantity: 1 },
      { name: 'Pens', category: 'miscellaneous', quantity: 2 },
      { name: 'Dust mask', category: 'toiletries', quantity: 3 },
      { name: 'Bandana', category: 'clothes', quantity: 2 },
    ],
  },

  // Business & Professional
  {
    id: 'business-trip',
    name: 'Business Trip',
    description: 'Professional attire and gadgets for a successful business trip.',
    destinationType: 'business',
    season: 'all',
    items: [
      { name: 'Business laptop', category: 'electronics', quantity: 1 },
      { name: 'Laptop charger', category: 'electronics', quantity: 1 },
      { name: 'Business suit', category: 'clothes', quantity: 2 },
      { name: 'Dress shirts', category: 'clothes', quantity: 4 },
      { name: 'Dress pants', category: 'clothes', quantity: 3 },
      { name: 'Ties', category: 'clothes', quantity: 3 },
      { name: 'Belt', category: 'clothes', quantity: 2 },
      { name: 'Dress shoes', category: 'clothes', quantity: 2 },
      { name: 'Business casual attire', category: 'clothes', quantity: 2 },
      { name: 'Business cards', category: 'documents', quantity: 50 },
      { name: 'Presentation materials', category: 'documents', quantity: 1 },
      { name: 'Meeting notes', category: 'documents', quantity: 1 },
      { name: 'Portable charger', category: 'electronics', quantity: 1 },
      { name: 'Phone charger', category: 'electronics', quantity: 1 },
      { name: 'Tablet', category: 'electronics', quantity: 1, thoroughnessLevel: 'balanced' },
      { name: 'Travel adapter', category: 'electronics', quantity: 1 },
      { name: 'Brief case', category: 'miscellaneous', quantity: 1 },
      { name: 'Professional bag', category: 'miscellaneous', quantity: 1 },
      { name: 'Cufflinks', category: 'miscellaneous', quantity: 1, thoroughnessLevel: 'thorough' },
      { name: 'Dress socks', category: 'clothes', quantity: 5 },
      { name: 'Undershirts', category: 'clothes', quantity: 4 },
      { name: 'Undergarments', category: 'clothes', quantity: 5 },
      { name: 'Blazer', category: 'clothes', quantity: 1 },
      { name: 'Professional watch', category: 'miscellaneous', quantity: 1 },
      { name: 'Notebook', category: 'miscellaneous', quantity: 1 },
      { name: 'Pens', category: 'miscellaneous', quantity: 3 },
    ],
  },
  {
    id: 'conference-travel',
    name: 'Conference Travel',
    description: 'Professional conference attendance essentials.',
    destinationType: 'business',
    season: 'all',
    items: [
      { name: 'Conference badge holder', category: 'miscellaneous', quantity: 1 },
      { name: 'Business attire', category: 'clothes', quantity: 3 },
      { name: 'Comfortable walking shoes', category: 'clothes', quantity: 1 },
      { name: 'Laptop bag', category: 'miscellaneous', quantity: 1 },
      { name: 'Networking business cards', category: 'documents', quantity: 100 },
      { name: 'Portfolio', category: 'miscellaneous', quantity: 1 },
      { name: 'Notebook', category: 'miscellaneous', quantity: 2 },
      { name: 'Pens', category: 'miscellaneous', quantity: 5 },
      { name: 'Portable charger', category: 'electronics', quantity: 1 },
      { name: 'Extension cord', category: 'electronics', quantity: 1 },
      { name: 'Tablet', category: 'electronics', quantity: 1 },
      { name: 'Laptop', category: 'electronics', quantity: 1 },
      { name: 'Conference schedule', category: 'documents', quantity: 1 },
      { name: 'Blazer', category: 'clothes', quantity: 2 },
      { name: 'Professional shirts', category: 'clothes', quantity: 3 },
      { name: 'Dress pants', category: 'clothes', quantity: 2 },
      { name: 'Professional bag', category: 'miscellaneous', quantity: 1 },
      { name: 'Hand sanitizer', category: 'toiletries', quantity: 1 },
      { name: 'Breath mints', category: 'toiletries', quantity: 1 },
      { name: 'Tissue packets', category: 'toiletries', quantity: 2 },
      { name: 'Professional socks', category: 'clothes', quantity: 4 },
      { name: 'Undergarments', category: 'clothes', quantity: 4 },
      { name: 'Casual dinner outfit', category: 'clothes', quantity: 1 },
      { name: 'Nice shoes', category: 'clothes', quantity: 1 },
      { name: 'Professional watch', category: 'miscellaneous', quantity: 1 },
      { name: 'Phone charger', category: 'electronics', quantity: 1 },
    ],
  },

  // Special Interest & Wellness
  {
    id: 'yoga-retreat',
    name: 'Yoga Retreat',
    description: 'Items for a peaceful and rejuvenating yoga retreat.',
    destinationType: 'wellness',
    season: 'all',
    items: [
      { name: 'Yoga mat', category: 'miscellaneous', quantity: 1 },
      { name: 'Yoga blocks', category: 'miscellaneous', quantity: 2, thoroughnessLevel: 'balanced' },
      { name: 'Yoga strap', category: 'miscellaneous', quantity: 1, thoroughnessLevel: 'balanced' },
      { name: 'Meditation cushion', category: 'miscellaneous', quantity: 1 },
      { name: 'Comfortable yoga clothing', category: 'clothes', quantity: 5 },
      { name: 'Yoga pants', category: 'clothes', quantity: 4 },
      { name: 'Yoga tops', category: 'clothes', quantity: 4 },
      { name: 'Light sweater', category: 'clothes', quantity: 2 },
      { name: 'Sandals', category: 'clothes', quantity: 1 },
      { name: 'Slip-on shoes', category: 'clothes', quantity: 1 },
      { name: 'Water bottle', category: 'miscellaneous', quantity: 1 },
      { name: 'Essential oils', category: 'toiletries', quantity: 3 },
      { name: 'Natural toiletries', category: 'toiletries', quantity: 5 },
      { name: 'Journal', category: 'miscellaneous', quantity: 1 },
      { name: 'Pens', category: 'miscellaneous', quantity: 2 },
      { name: 'Books', category: 'miscellaneous', quantity: 2 },
      { name: 'Healthy snacks', category: 'miscellaneous', quantity: 5 },
      { name: 'Herbal tea', category: 'miscellaneous', quantity: 3 },
      { name: 'Reusable tea cup', category: 'miscellaneous', quantity: 1 },
      { name: 'Comfortable socks', category: 'clothes', quantity: 5 },
      { name: 'Undergarments', category: 'clothes', quantity: 5 },
      { name: 'Light scarf', category: 'clothes', quantity: 1 },
      { name: 'Sleep mask', category: 'miscellaneous', quantity: 1 },
      { name: 'Earplugs', category: 'miscellaneous', quantity: 1 },
      { name: 'Natural deodorant', category: 'toiletries', quantity: 1 },
      { name: 'Organic sunscreen', category: 'toiletries', quantity: 1 },
    ],
  },
  {
    id: 'spa-weekend',
    name: 'Spa Weekend Retreat',
    description: 'Relaxing spa weekend essentials.',
    destinationType: 'wellness',
    season: 'all',
    items: [
      { name: 'Robe', category: 'clothes', quantity: 1 },
      { name: 'Comfortable slippers', category: 'clothes', quantity: 1 },
      { name: 'Spa flip-flops', category: 'clothes', quantity: 1 },
      { name: 'Comfortable loungewear', category: 'clothes', quantity: 3 },
      { name: 'Swimsuit', category: 'clothes', quantity: 2 },
      { name: 'Yoga clothes', category: 'clothes', quantity: 2 },
      { name: 'Light layers', category: 'clothes', quantity: 2 },
      { name: 'Spa bag', category: 'miscellaneous', quantity: 1 },
      { name: 'Water bottle', category: 'miscellaneous', quantity: 1 },
      { name: 'Books', category: 'miscellaneous', quantity: 2 },
      { name: 'Journal', category: 'miscellaneous', quantity: 1 },
      { name: 'Essential oils', category: 'toiletries', quantity: 2 },
      { name: 'Face mask', category: 'toiletries', quantity: 2 },
      { name: 'Moisturizer', category: 'toiletries', quantity: 1 },
      { name: 'Hair tie', category: 'toiletries', quantity: 3 },
      { name: 'Lip balm', category: 'toiletries', quantity: 1 },
      { name: 'Healthy snacks', category: 'miscellaneous', quantity: 3 },
      { name: 'Herbal tea bags', category: 'miscellaneous', quantity: 5 },
      { name: 'Sleep mask', category: 'miscellaneous', quantity: 1 },
      { name: 'Comfortable undergarments', category: 'clothes', quantity: 3 },
      { name: 'Hair products', category: 'toiletries', quantity: 2 },
      { name: 'Nail care kit', category: 'toiletries', quantity: 1, thoroughnessLevel: 'balanced' },
      { name: 'Meditation app', category: 'electronics', quantity: 1 },
      { name: 'Headphones', category: 'electronics', quantity: 1 },
      { name: 'Phone charger', category: 'electronics', quantity: 1 },
      { name: 'Camera', category: 'electronics', quantity: 1 },
    ],
  },

  // Adventure & Special Activities
  {
    id: 'backpacking-europe',
    name: 'Backpacking Europe',
    description: 'Lightweight essentials for backpacking across Europe.',
    destinationType: 'city',
    season: 'summer',
    items: [
      { name: 'Large backpack', category: 'miscellaneous', quantity: 1 },
      { name: 'Day pack', category: 'miscellaneous', quantity: 1 },
      { name: 'Quick-dry clothing', category: 'clothes', quantity: 5 },
      { name: 'Merino wool shirts', category: 'clothes', quantity: 2 },
      { name: 'Convertible pants', category: 'clothes', quantity: 2 },
      { name: 'Travel towel', category: 'miscellaneous', quantity: 1 },
      { name: 'Universal adapter', category: 'electronics', quantity: 1 },
      { name: 'Padlock', category: 'miscellaneous', quantity: 2 },
      { name: 'Money belt', category: 'miscellaneous', quantity: 1 },
      { name: 'Hostel lock', category: 'miscellaneous', quantity: 1 },
      { name: 'Laundry detergent sheets', category: 'toiletries', quantity: 10 },
      { name: 'Compact toiletries', category: 'toiletries', quantity: 5 },
      { name: 'First aid kit', category: 'miscellaneous', quantity: 1 },
      { name: 'Portable charger', category: 'electronics', quantity: 1 },
      { name: 'Offline maps', category: 'electronics', quantity: 1 },
      { name: 'Travel insurance documents', category: 'documents', quantity: 1 },
      { name: 'Passport copies', category: 'documents', quantity: 3 },
      { name: 'Lightweight shoes', category: 'clothes', quantity: 2 },
      { name: 'Flip-flops', category: 'clothes', quantity: 1 },
      { name: 'Packable rain jacket', category: 'clothes', quantity: 1 },
      { name: 'Warm layer', category: 'clothes', quantity: 1 },
      { name: 'Socks', category: 'clothes', quantity: 5 },
      { name: 'Undergarments', category: 'clothes', quantity: 5 },
      { name: 'Hat', category: 'clothes', quantity: 1 },
      { name: 'Sunglasses', category: 'miscellaneous', quantity: 1 },
      { name: 'Water bottle', category: 'miscellaneous', quantity: 1 },
    ],
  },
  {
    id: 'road-trip',
    name: 'Road Trip Adventure',
    description: 'Essentials for a safe and fun road trip adventure.',
    destinationType: 'outdoors',
    season: 'summer',
    items: [
      { name: 'Car emergency kit', category: 'miscellaneous', quantity: 1 },
      { name: 'Car charger', category: 'electronics', quantity: 1 },
      { name: 'Phone mount', category: 'miscellaneous', quantity: 1 },
      { name: 'GPS device', category: 'electronics', quantity: 1 },
      { name: 'Road atlas', category: 'documents', quantity: 1 },
      { name: 'Cooler', category: 'miscellaneous', quantity: 1 },
      { name: 'Snacks', category: 'miscellaneous', quantity: 10 },
      { name: 'Water bottles', category: 'miscellaneous', quantity: 4 },
      { name: 'Travel games', category: 'miscellaneous', quantity: 3 },
      { name: 'Travel pillow', category: 'miscellaneous', quantity: 2 },
      { name: 'Blanket', category: 'miscellaneous', quantity: 1 },
      { name: 'Sunglasses', category: 'miscellaneous', quantity: 1 },
      { name: 'Comfortable driving clothes', category: 'clothes', quantity: 3 },
      { name: 'Layers for changing weather', category: 'clothes', quantity: 3 },
      { name: 'Comfortable shoes', category: 'clothes', quantity: 2 },
      { name: 'Camera', category: 'electronics', quantity: 1 },
      { name: 'Portable speaker', category: 'electronics', quantity: 1, thoroughnessLevel: 'balanced' },
      { name: 'First aid kit', category: 'miscellaneous', quantity: 1 },
      { name: 'Cash for tolls', category: 'documents', quantity: 1 },
      { name: 'Car documents', category: 'documents', quantity: 1 },
      { name: 'Roadside assistance info', category: 'documents', quantity: 1 },
      { name: 'Hand sanitizer', category: 'toiletries', quantity: 1 },
      { name: 'Tissues', category: 'toiletries', quantity: 3 },
      { name: 'Wet wipes', category: 'toiletries', quantity: 2 },
      { name: 'Trash bags', category: 'miscellaneous', quantity: 5 },
      { name: 'Reusable bags', category: 'miscellaneous', quantity: 3 },
    ],
  },

  // Cultural & Educational
  {
    id: 'art-museum-tour',
    name: 'Art Museum Tour',
    description: 'Cultural exploration through art museums.',
    destinationType: 'city',
    season: 'all',
    items: [
      { name: 'Comfortable walking shoes', category: 'clothes', quantity: 1 },
      { name: 'Layered clothing', category: 'clothes', quantity: 3 },
      { name: 'Small crossbody bag', category: 'miscellaneous', quantity: 1 },
      { name: 'Museum membership cards', category: 'documents', quantity: 1 },
      { name: 'Art guidebook', category: 'documents', quantity: 1 },
      { name: 'Notebook for sketching', category: 'miscellaneous', quantity: 1 },
      { name: 'Pencils', category: 'miscellaneous', quantity: 3 },
      { name: 'Camera', category: 'electronics', quantity: 1 },
      { name: 'Portable charger', category: 'electronics', quantity: 1 },
      { name: 'Audio guide headphones', category: 'electronics', quantity: 1 },
      { name: 'Reading glasses', category: 'miscellaneous', quantity: 1, thoroughnessLevel: 'balanced' },
      { name: 'Water bottle', category: 'miscellaneous', quantity: 1 },
      { name: 'Light snacks', category: 'miscellaneous', quantity: 2 },
      { name: 'Nice casual attire', category: 'clothes', quantity: 2 },
      { name: 'Sweater', category: 'clothes', quantity: 1 },
      { name: 'Light jacket', category: 'clothes', quantity: 1 },
      { name: 'Respectful clothing', category: 'clothes', quantity: 2 },
      { name: 'Closed-toe shoes', category: 'clothes', quantity: 1 },
      { name: 'Hand sanitizer', category: 'toiletries', quantity: 1 },
      { name: 'Tissues', category: 'toiletries', quantity: 1 },
      { name: 'Lip balm', category: 'toiletries', quantity: 1 },
      { name: 'Eye drops', category: 'toiletries', quantity: 1, thoroughnessLevel: 'thorough' },
      { name: 'Postcard collection', category: 'miscellaneous', quantity: 1, thoroughnessLevel: 'balanced' },
      { name: 'Museum tote bag', category: 'miscellaneous', quantity: 1, thoroughnessLevel: 'balanced' },
      { name: 'Art appreciation book', category: 'miscellaneous', quantity: 1, thoroughnessLevel: 'thorough' },
      { name: 'Magnifying glass', category: 'miscellaneous', quantity: 1, thoroughnessLevel: 'thorough' },
    ],
  },
  {
    id: 'wine-country',
    name: 'Wine Country Tour',
    description: 'Elegant wine tasting tour essentials.',
    destinationType: 'city',
    season: 'fall',
    items: [
      { name: 'Nice casual attire', category: 'clothes', quantity: 3 },
      { name: 'Dress for dinner', category: 'clothes', quantity: 2 },
      { name: 'Comfortable walking shoes', category: 'clothes', quantity: 1 },
      { name: 'Nice dinner shoes', category: 'clothes', quantity: 1 },
      { name: 'Light jacket', category: 'clothes', quantity: 1 },
      { name: 'Sweater', category: 'clothes', quantity: 1 },
      { name: 'Wine tasting notebook', category: 'miscellaneous', quantity: 1 },
      { name: 'Pens', category: 'miscellaneous', quantity: 2 },
      { name: 'Camera', category: 'electronics', quantity: 1 },
      { name: 'Designated driver info', category: 'documents', quantity: 1 },
      { name: 'Water bottle', category: 'miscellaneous', quantity: 1 },
      { name: 'Breath mints', category: 'toiletries', quantity: 1 },
      { name: 'Hand sanitizer', category: 'toiletries', quantity: 1 },
      { name: 'Sunglasses', category: 'miscellaneous', quantity: 1 },
      { name: 'Hat', category: 'clothes', quantity: 1 },
      { name: 'Picnic blanket', category: 'miscellaneous', quantity: 1, thoroughnessLevel: 'balanced' },
      { name: 'Wine shipping info', category: 'documents', quantity: 1, thoroughnessLevel: 'thorough' },
      { name: 'Wine opener', category: 'miscellaneous', quantity: 1, thoroughnessLevel: 'thorough' },
      { name: 'Cheese knife', category: 'miscellaneous', quantity: 1, thoroughnessLevel: 'thorough' },
      { name: 'Crackers', category: 'miscellaneous', quantity: 1 },
      { name: 'Palate cleansers', category: 'miscellaneous', quantity: 2 },
      { name: 'Small cooler bag', category: 'miscellaneous', quantity: 1, thoroughnessLevel: 'balanced' },
      { name: 'Wine glass charms', category: 'miscellaneous', quantity: 1, thoroughnessLevel: 'thorough' },
      { name: 'Scarf', category: 'clothes', quantity: 1 },
      { name: 'Nice pants', category: 'clothes', quantity: 2 },
      { name: 'Blouse', category: 'clothes', quantity: 2 },
    ],
  },

  // Family & Group Travel
  {
    id: 'family-disney',
    name: 'Family Disney Vacation',
    description: 'Magical Disney vacation with kids.',
    destinationType: 'theme park',
    season: 'all',
    items: [
      { name: 'Disney outfits', category: 'clothes', quantity: 4 },
      { name: 'Character shirts', category: 'clothes', quantity: 3 },
      { name: 'Comfortable walking shoes', category: 'clothes', quantity: 1 },
      { name: 'Mickey ears', category: 'clothes', quantity: 1 },
      { name: 'Autograph book', category: 'miscellaneous', quantity: 1 },
      { name: 'Disney pens', category: 'miscellaneous', quantity: 3 },
      { name: 'Portable charger', category: 'electronics', quantity: 1 },
      { name: 'Camera', category: 'electronics', quantity: 1 },
      { name: 'Stroller', category: 'miscellaneous', quantity: 1, thoroughnessLevel: 'balanced' },
      { name: 'Diaper bag', category: 'miscellaneous', quantity: 1, thoroughnessLevel: 'balanced' },
      { name: 'Kids snacks', category: 'miscellaneous', quantity: 10 },
      { name: 'Water bottles', category: 'miscellaneous', quantity: 4 },
      { name: 'First aid kit', category: 'miscellaneous', quantity: 1 },
      { name: 'Wet wipes', category: 'toiletries', quantity: 5 },
      { name: 'Hand sanitizer', category: 'toiletries', quantity: 1 },
      { name: 'Sunscreen', category: 'toiletries', quantity: 1 },
      { name: 'Kids sunglasses', category: 'miscellaneous', quantity: 1 },
      { name: 'Rain ponchos', category: 'clothes', quantity: 4 },
      { name: 'Backpack', category: 'miscellaneous', quantity: 1 },
      { name: 'Cash for souvenirs', category: 'documents', quantity: 1 },
      { name: 'Park tickets', category: 'documents', quantity: 1 },
      { name: 'Hotel confirmation', category: 'documents', quantity: 1 },
      { name: 'Emergency contact info', category: 'documents', quantity: 1 },
      { name: 'Kids comfortable clothes', category: 'clothes', quantity: 6 },
      { name: 'Extra socks', category: 'clothes', quantity: 8 },
      { name: 'Extra underwear', category: 'clothes', quantity: 8 },
    ],
  },
  {
    id: 'grandparents-visit',
    name: 'Visiting Grandparents',
    description: 'Comfortable family visit essentials.',
    destinationType: 'family',
    season: 'all',
    items: [
      { name: 'Comfortable casual clothes', category: 'clothes', quantity: 5 },
      { name: 'Nice outfit for photos', category: 'clothes', quantity: 1 },
      { name: 'Comfortable shoes', category: 'clothes', quantity: 1 },
      { name: 'Slippers', category: 'clothes', quantity: 1 },
      { name: 'Gifts for grandparents', category: 'miscellaneous', quantity: 2 },
      { name: 'Photo albums', category: 'miscellaneous', quantity: 1 },
      { name: 'Camera', category: 'electronics', quantity: 1 },
      { name: 'Phone charger', category: 'electronics', quantity: 1 },
      { name: 'Medications', category: 'toiletries', quantity: 1 },
      { name: 'Comfortable pajamas', category: 'clothes', quantity: 2 },
      { name: 'Sweater', category: 'clothes', quantity: 1 },
      { name: 'Light jacket', category: 'clothes', quantity: 1 },
      { name: 'Comfortable socks', category: 'clothes', quantity: 5 },
      { name: 'Undergarments', category: 'clothes', quantity: 5 },
      { name: 'Recipe cards', category: 'miscellaneous', quantity: 1, thoroughnessLevel: 'balanced' },
      { name: 'Board games', category: 'miscellaneous', quantity: 2, thoroughnessLevel: 'balanced' },
      { name: 'Books', category: 'miscellaneous', quantity: 2 },
      { name: 'Knitting supplies', category: 'miscellaneous', quantity: 1, thoroughnessLevel: 'thorough' },
      { name: 'Thank you cards', category: 'miscellaneous', quantity: 5 },
      { name: 'Pens', category: 'miscellaneous', quantity: 2 },
      { name: 'Hand lotion', category: 'toiletries', quantity: 1 },
      { name: 'Lip balm', category: 'toiletries', quantity: 1 },
      { name: 'Reading glasses', category: 'miscellaneous', quantity: 1, thoroughnessLevel: 'balanced' },
      { name: 'Hearing aid batteries', category: 'electronics', quantity: 2, thoroughnessLevel: 'thorough' },
      { name: 'Compression socks', category: 'clothes', quantity: 2, thoroughnessLevel: 'balanced' },
      { name: 'Comfortable shoes for walking', category: 'clothes', quantity: 1 },
    ],
  },

  // Special Occasions
  {
    id: 'wedding-guest',
    name: 'Wedding Guest',
    description: 'Elegant attire for a special wedding celebration.',
    destinationType: 'formal',
    season: 'all',
    items: [
      { name: 'Wedding guest dress', category: 'clothes', quantity: 1 },
      { name: 'Formal suit', category: 'clothes', quantity: 1 },
      { name: 'Dress shoes', category: 'clothes', quantity: 1 },
      { name: 'Formal accessories', category: 'miscellaneous', quantity: 3 },
      { name: 'Clutch purse', category: 'miscellaneous', quantity: 1 },
      { name: 'Shawl or wrap', category: 'clothes', quantity: 1 },
      { name: 'Comfortable flats', category: 'clothes', quantity: 1, thoroughnessLevel: 'balanced' },
      { name: 'Jewelry', category: 'miscellaneous', quantity: 1 },
      { name: 'Hair styling tools', category: 'electronics', quantity: 1 },
      { name: 'Makeup', category: 'toiletries', quantity: 1 },
      { name: 'Perfume', category: 'toiletries', quantity: 1 },
      { name: 'Wedding gift', category: 'miscellaneous', quantity: 1 },
      { name: 'Card for couple', category: 'miscellaneous', quantity: 1 },
      { name: 'Cash for gift', category: 'documents', quantity: 1 },
      { name: 'Camera', category: 'electronics', quantity: 1 },
      { name: 'Breath mints', category: 'toiletries', quantity: 1 },
      { name: 'Tissues', category: 'toiletries', quantity: 1 },
      { name: 'Touch-up makeup', category: 'toiletries', quantity: 3 },
      { name: 'Hair pins', category: 'toiletries', quantity: 5 },
      { name: 'Band-aids for shoes', category: 'toiletries', quantity: 3 },
      { name: 'Portable charger', category: 'electronics', quantity: 1 },
      { name: 'Weather backup plan', category: 'clothes', quantity: 1 },
      { name: 'Umbrella', category: 'miscellaneous', quantity: 1, thoroughnessLevel: 'balanced' },
      { name: 'Sunglasses', category: 'miscellaneous', quantity: 1 },
      { name: 'Extra hosiery', category: 'clothes', quantity: 2 },
      { name: 'Formal undergarments', category: 'clothes', quantity: 1 },
    ],
  },
  {
    id: 'graduation-ceremony',
    name: 'Graduation Ceremony',
    description: 'Celebrating a graduation milestone.',
    destinationType: 'formal',
    season: 'spring',
    items: [
      { name: 'Formal attire', category: 'clothes', quantity: 1 },
      { name: 'Comfortable shoes', category: 'clothes', quantity: 1 },
      { name: 'Camera', category: 'electronics', quantity: 1 },
      { name: 'Extra camera batteries', category: 'electronics', quantity: 2 },
      { name: 'Portable charger', category: 'electronics', quantity: 1 },
      { name: 'Graduation gift', category: 'miscellaneous', quantity: 1 },
      { name: 'Congratulations card', category: 'miscellaneous', quantity: 1 },
      { name: 'Flowers', category: 'miscellaneous', quantity: 1 },
      { name: 'Tissues', category: 'toiletries', quantity: 2 },
      { name: 'Water bottle', category: 'miscellaneous', quantity: 1 },
      { name: 'Small blanket', category: 'miscellaneous', quantity: 1, thoroughnessLevel: 'balanced' },
      { name: 'Seat cushion', category: 'miscellaneous', quantity: 1, thoroughnessLevel: 'balanced' },
      { name: 'Sunscreen', category: 'toiletries', quantity: 1 },
      { name: 'Hat', category: 'clothes', quantity: 1 },
      { name: 'Sunglasses', category: 'miscellaneous', quantity: 1 },
      { name: 'Light jacket', category: 'clothes', quantity: 1 },
      { name: 'Program keeper', category: 'miscellaneous', quantity: 1, thoroughnessLevel: 'thorough' },
      { name: 'Nice dress shirt', category: 'clothes', quantity: 1 },
      { name: 'Dress pants', category: 'clothes', quantity: 1 },
      { name: 'Belt', category: 'clothes', quantity: 1 },
      { name: 'Nice dress', category: 'clothes', quantity: 1 },
      { name: 'Cardigan', category: 'clothes', quantity: 1 },
      { name: 'Celebration dinner outfit', category: 'clothes', quantity: 1 },
      { name: 'Cash for celebration', category: 'documents', quantity: 1 },
      { name: 'Parking information', category: 'documents', quantity: 1 },
      { name: 'Event tickets', category: 'documents', quantity: 1 },
    ],
  },

  // Seasonal Specialties
  {
    id: 'autumn-foliage',
    name: 'Autumn Foliage Tour',
    description: 'Scenic fall foliage viewing trip.',
    destinationType: 'outdoors',
    season: 'fall',
    items: [
      { name: 'Warm layers', category: 'clothes', quantity: 4 },
      { name: 'Waterproof jacket', category: 'clothes', quantity: 1 },
      { name: 'Comfortable hiking boots', category: 'clothes', quantity: 1 },
      { name: 'Warm hat', category: 'clothes', quantity: 1 },
      { name: 'Gloves', category: 'clothes', quantity: 1 },
      { name: 'Scarf', category: 'clothes', quantity: 1 },
      { name: 'Camera with good lens', category: 'electronics', quantity: 1 },
      { name: 'Extra batteries', category: 'electronics', quantity: 4 },
      { name: 'Memory cards', category: 'electronics', quantity: 2 },
      { name: 'Tripod', category: 'electronics', quantity: 1, thoroughnessLevel: 'balanced' },
      { name: 'Binoculars', category: 'miscellaneous', quantity: 1 },
      { name: 'Nature guidebook', category: 'documents', quantity: 1 },
      { name: 'Trail maps', category: 'documents', quantity: 1 },
      { name: 'Thermos for hot drinks', category: 'miscellaneous', quantity: 1 },
      { name: 'Hot chocolate packets', category: 'miscellaneous', quantity: 3 },
      { name: 'Warm snacks', category: 'miscellaneous', quantity: 5 },
      { name: 'Hand warmers', category: 'miscellaneous', quantity: 5 },
      { name: 'Blanket for picnics', category: 'miscellaneous', quantity: 1 },
      { name: 'Waterproof boots', category: 'clothes', quantity: 1 },
      { name: 'Warm socks', category: 'clothes', quantity: 5 },
      { name: 'Long underwear', category: 'clothes', quantity: 2 },
      { name: 'Fleece jacket', category: 'clothes', quantity: 1 },
      { name: 'Rain pants', category: 'clothes', quantity: 1, thoroughnessLevel: 'thorough' },
      { name: 'Leaf collection bag', category: 'miscellaneous', quantity: 1, thoroughnessLevel: 'thorough' },
      { name: 'Nature journal', category: 'miscellaneous', quantity: 1, thoroughnessLevel: 'balanced' },
      { name: 'Colored pencils', category: 'miscellaneous', quantity: 1, thoroughnessLevel: 'thorough' },
    ],
  },
  {
    id: 'spring-cherry-blossoms',
    name: 'Cherry Blossom Viewing',
    description: 'Beautiful spring cherry blossom tour.',
    destinationType: 'city',
    season: 'spring',
    items: [
      { name: 'Light layers', category: 'clothes', quantity: 4 },
      { name: 'Light jacket', category: 'clothes', quantity: 1 },
      { name: 'Comfortable walking shoes', category: 'clothes', quantity: 1 },
      { name: 'Sun hat', category: 'clothes', quantity: 1 },
      { name: 'Light scarf', category: 'clothes', quantity: 1 },
      { name: 'Camera', category: 'electronics', quantity: 1 },
      { name: 'Portable charger', category: 'electronics', quantity: 1 },
      { name: 'Picnic blanket', category: 'miscellaneous', quantity: 1 },
      { name: 'Picnic basket', category: 'miscellaneous', quantity: 1 },
      { name: 'Seasonal snacks', category: 'miscellaneous', quantity: 5 },
      { name: 'Thermos for tea', category: 'miscellaneous', quantity: 1 },
      { name: 'Green tea packets', category: 'miscellaneous', quantity: 3 },
      { name: 'Sunglasses', category: 'miscellaneous', quantity: 1 },
      { name: 'Sunscreen', category: 'toiletries', quantity: 1 },
      { name: 'Allergy medication', category: 'toiletries', quantity: 1, thoroughnessLevel: 'balanced' },
      { name: 'Tissues', category: 'toiletries', quantity: 3 },
      { name: 'Hand sanitizer', category: 'toiletries', quantity: 1 },
      { name: 'Water bottle', category: 'miscellaneous', quantity: 1 },
      { name: 'Nature journal', category: 'miscellaneous', quantity: 1, thoroughnessLevel: 'balanced' },
      { name: 'Sketching pencils', category: 'miscellaneous', quantity: 3, thoroughnessLevel: 'thorough' },
      { name: 'Folding chair', category: 'miscellaneous', quantity: 1, thoroughnessLevel: 'thorough' },
      { name: 'Flower pressing kit', category: 'miscellaneous', quantity: 1, thoroughnessLevel: 'thorough' },
      { name: 'Casual spring dress', category: 'clothes', quantity: 1 },
      { name: 'Light cardigan', category: 'clothes', quantity: 1 },
      { name: 'Comfortable pants', category: 'clothes', quantity: 2 },
      { name: 'Spring tops', category: 'clothes', quantity: 3 },
    ],
  },

  // Extended & Adventure Travel
  {
    id: 'month-long-europe',
    name: 'Month-Long Europe Trip',
    description: 'Extended European adventure with multiple countries.',
    destinationType: 'city',
    season: 'summer',
    items: [
      { name: 'Large backpack', category: 'miscellaneous', quantity: 1 },
      { name: 'Day pack', category: 'miscellaneous', quantity: 1 },
      { name: 'Versatile clothing', category: 'clothes', quantity: 10 },
      { name: 'Merino wool basics', category: 'clothes', quantity: 5 },
      { name: 'Quick-dry fabrics', category: 'clothes', quantity: 5 },
      { name: 'Universal adapters', category: 'electronics', quantity: 2 },
      { name: 'Portable laundry kit', category: 'toiletries', quantity: 1 },
      { name: 'Eurail pass', category: 'documents', quantity: 1 },
      { name: 'Multiple guidebooks', category: 'documents', quantity: 3 },
      { name: 'Language phrasebooks', category: 'documents', quantity: 3 },
      { name: 'Money belt', category: 'miscellaneous', quantity: 1 },
      { name: 'Padlocks', category: 'miscellaneous', quantity: 3 },
      { name: 'Travel insurance docs', category: 'documents', quantity: 1 },
      { name: 'Backup credit cards', category: 'documents', quantity: 2 },
      { name: 'Passport copies', category: 'documents', quantity: 5 },
      { name: 'Emergency contacts', category: 'documents', quantity: 1 },
      { name: 'First aid kit', category: 'miscellaneous', quantity: 1 },
      { name: 'Prescription medications', category: 'toiletries', quantity: 1 },
      { name: 'Portable charger', category: 'electronics', quantity: 2 },
      { name: 'Offline maps', category: 'electronics', quantity: 1 },
      { name: 'Travel journal', category: 'miscellaneous', quantity: 1 },
      { name: 'Pens', category: 'miscellaneous', quantity: 5 },
      { name: 'Lightweight shoes', category: 'clothes', quantity: 2 },
      { name: 'Weather layers', category: 'clothes', quantity: 4 },
      { name: 'Socks', category: 'clothes', quantity: 10 },
      { name: 'Undergarments', category: 'clothes', quantity: 10 },
    ],
  },
  {
    id: 'solo-travel-adventure',
    name: 'Solo Travel Adventure',
    description: 'Independent solo travel essentials.',
    destinationType: 'city',
    season: 'all',
    items: [
      { name: 'Safety whistle', category: 'miscellaneous', quantity: 1 },
      { name: 'Door alarm', category: 'electronics', quantity: 1 },
      { name: 'Portable lock', category: 'miscellaneous', quantity: 1 },
      { name: 'Emergency contacts', category: 'documents', quantity: 1 },
      { name: 'Solo travel guidebook', category: 'documents', quantity: 1 },
      { name: 'Local emergency numbers', category: 'documents', quantity: 1 },
      { name: 'Backup phone', category: 'electronics', quantity: 1, thoroughnessLevel: 'balanced' },
      { name: 'Portable charger', category: 'electronics', quantity: 1 },
      { name: 'Money belt', category: 'miscellaneous', quantity: 1 },
      { name: 'Dummy wallet', category: 'miscellaneous', quantity: 1, thoroughnessLevel: 'balanced' },
      { name: 'Travel journal', category: 'miscellaneous', quantity: 1 },
      { name: 'Camera', category: 'electronics', quantity: 1 },
      { name: 'Self-timer tripod', category: 'electronics', quantity: 1, thoroughnessLevel: 'balanced' },
      { name: 'Comfortable walking shoes', category: 'clothes', quantity: 1 },
      { name: 'Versatile clothing', category: 'clothes', quantity: 5 },
      { name: 'Layers', category: 'clothes', quantity: 3 },
      { name: 'First aid kit', category: 'miscellaneous', quantity: 1 },
      { name: 'Medications', category: 'toiletries', quantity: 1 },
      { name: 'Hand sanitizer', category: 'toiletries', quantity: 1 },
      { name: 'Pepper spray', category: 'miscellaneous', quantity: 1, thoroughnessLevel: 'thorough' },
      { name: 'Local SIM card', category: 'electronics', quantity: 1, thoroughnessLevel: 'balanced' },
      { name: 'Translation app', category: 'electronics', quantity: 1 },
      { name: 'Maps (offline)', category: 'documents', quantity: 1 },
      { name: 'Emergency cash', category: 'documents', quantity: 1 },
      { name: 'Travel insurance', category: 'documents', quantity: 1 },
      { name: 'Comfortable day bag', category: 'miscellaneous', quantity: 1 },
    ],
  },

  // Special Climate & Locations
  {
    id: 'desert-expedition',
    name: 'Desert Expedition',
    description: 'Surviving and thriving in desert conditions.',
    destinationType: 'outdoors',
    season: 'dry',
    items: [
      { name: 'Sun protection clothing', category: 'clothes', quantity: 4 },
      { name: 'Wide-brimmed hat', category: 'clothes', quantity: 1 },
      { name: 'Neck gaiter', category: 'clothes', quantity: 2 },
      { name: 'Sunglasses', category: 'miscellaneous', quantity: 1 },
      { name: 'High SPF sunscreen', category: 'toiletries', quantity: 2 },
      { name: 'Lip balm with SPF', category: 'toiletries', quantity: 2 },
      { name: 'Water bottles', category: 'miscellaneous', quantity: 4 },
      { name: 'Hydration pack', category: 'miscellaneous', quantity: 1 },
      { name: 'Electrolyte tablets', category: 'toiletries', quantity: 10 },
      { name: 'Desert boots', category: 'clothes', quantity: 1 },
      { name: 'Gaiters', category: 'clothes', quantity: 1 },
      { name: 'Lightweight tent', category: 'miscellaneous', quantity: 1 },
      { name: 'Emergency shelter', category: 'miscellaneous', quantity: 1 },
      { name: 'Navigation tools', category: 'electronics', quantity: 1 },
      { name: 'Emergency beacon', category: 'electronics', quantity: 1, thoroughnessLevel: 'thorough' },
      { name: 'First aid kit', category: 'miscellaneous', quantity: 1 },
      { name: 'Anti-venom info', category: 'documents', quantity: 1, thoroughnessLevel: 'thorough' },
      { name: 'Emergency water', category: 'miscellaneous', quantity: 2 },
      { name: 'Signal mirror', category: 'miscellaneous', quantity: 1 },
      { name: 'Whistle', category: 'miscellaneous', quantity: 1 },
      { name: 'Cooling towels', category: 'miscellaneous', quantity: 2 },
      { name: 'Insect repellent', category: 'toiletries', quantity: 1 },
      { name: 'Snake bite kit', category: 'miscellaneous', quantity: 1, thoroughnessLevel: 'thorough' },
      { name: 'Extra batteries', category: 'electronics', quantity: 8 },
      { name: 'Solar charger', category: 'electronics', quantity: 1, thoroughnessLevel: 'balanced' },
      { name: 'Dust mask', category: 'toiletries', quantity: 3 },
    ],
  },
  {
    id: 'arctic-expedition',
    name: 'Arctic Expedition',
    description: 'Extreme cold weather expedition gear.',
    destinationType: 'outdoors',
    season: 'winter',
    items: [
      { name: 'Extreme cold jacket', category: 'clothes', quantity: 1 },
      { name: 'Insulated pants', category: 'clothes', quantity: 2 },
      { name: 'Base layers', category: 'clothes', quantity: 4 },
      { name: 'Mid layers', category: 'clothes', quantity: 3 },
      { name: 'Insulated boots', category: 'clothes', quantity: 1 },
      { name: 'Extreme cold gloves', category: 'clothes', quantity: 2 },
      { name: 'Liner gloves', category: 'clothes', quantity: 3 },
      { name: 'Balaclava', category: 'clothes', quantity: 2 },
      { name: 'Goggles', category: 'miscellaneous', quantity: 1 },
      { name: 'Emergency shelter', category: 'miscellaneous', quantity: 1 },
      { name: 'Sleeping bag rated to -40', category: 'miscellaneous', quantity: 1 },
      { name: 'Insulated sleeping pad', category: 'miscellaneous', quantity: 1 },
      { name: 'Hand warmers', category: 'miscellaneous', quantity: 20 },
      { name: 'Foot warmers', category: 'miscellaneous', quantity: 10 },
      { name: 'High-calorie food', category: 'miscellaneous', quantity: 10 },
      { name: 'Thermos', category: 'miscellaneous', quantity: 1 },
      { name: 'Emergency stove', category: 'miscellaneous', quantity: 1 },
      { name: 'Extra fuel', category: 'miscellaneous', quantity: 2 },
      { name: 'Emergency beacon', category: 'electronics', quantity: 1 },
      { name: 'Satellite communicator', category: 'electronics', quantity: 1, thoroughnessLevel: 'thorough' },
      { name: 'Cold weather batteries', category: 'electronics', quantity: 10 },
      { name: 'Headlamp', category: 'electronics', quantity: 2 },
      { name: 'Emergency whistle', category: 'miscellaneous', quantity: 1 },
      { name: 'Repair kit', category: 'miscellaneous', quantity: 1 },
      { name: 'Frostbite treatment', category: 'toiletries', quantity: 1 },
      { name: 'Hypothermia knowledge', category: 'documents', quantity: 1 },
    ],
  },

  // Cultural Immersion
  {
    id: 'india-cultural',
    name: 'India Cultural Immersion',
    description: 'Respectful cultural exploration of India.',
    destinationType: 'cultural',
    season: 'cool',
    items: [
      { name: 'Modest clothing', category: 'clothes', quantity: 6 },
      { name: 'Long sleeves', category: 'clothes', quantity: 4 },
      { name: 'Long pants/skirts', category: 'clothes', quantity: 4 },
      { name: 'Head covering', category: 'clothes', quantity: 2 },
      { name: 'Comfortable walking shoes', category: 'clothes', quantity: 1 },
      { name: 'Temple-appropriate footwear', category: 'clothes', quantity: 1 },
      { name: 'Light scarf', category: 'clothes', quantity: 2 },
      { name: 'Cotton clothing', category: 'clothes', quantity: 5 },
      { name: 'Hand sanitizer', category: 'toiletries', quantity: 2 },
      { name: 'Stomach medication', category: 'toiletries', quantity: 1 },
      { name: 'Water purification tablets', category: 'miscellaneous', quantity: 10 },
      { name: 'Sealed water bottles', category: 'miscellaneous', quantity: 5 },
      { name: 'Mosquito repellent', category: 'toiletries', quantity: 1 },
      { name: 'Cultural guidebook', category: 'documents', quantity: 1 },
      { name: 'Hindi phrasebook', category: 'documents', quantity: 1 },
      { name: 'Respectful gifts', category: 'miscellaneous', quantity: 3 },
      { name: 'Cash in small bills', category: 'documents', quantity: 1 },
      { name: 'Copies of passport', category: 'documents', quantity: 3 },
      { name: 'Visa documents', category: 'documents', quantity: 1 },
      { name: 'Travel insurance', category: 'documents', quantity: 1 },
      { name: 'Malaria prophylaxis', category: 'toiletries', quantity: 1, thoroughnessLevel: 'balanced' },
      { name: 'First aid kit', category: 'miscellaneous', quantity: 1 },
      { name: 'Flashlight', category: 'electronics', quantity: 1 },
      { name: 'Portable charger', category: 'electronics', quantity: 1 },
      { name: 'Camera', category: 'electronics', quantity: 1 },
      { name: 'Journal', category: 'miscellaneous', quantity: 1 },
    ],
  },
  {
    id: 'japan-cultural',
    name: 'Japan Cultural Experience',
    description: 'Traditional and modern Japan exploration.',
    destinationType: 'cultural',
    season: 'spring',
    items: [
      { name: 'Respectful business casual', category: 'clothes', quantity: 4 },
      { name: 'Temple visit outfit', category: 'clothes', quantity: 2 },
      { name: 'Comfortable walking shoes', category: 'clothes', quantity: 1 },
      { name: 'Slip-on shoes', category: 'clothes', quantity: 1 },
      { name: 'Socks without holes', category: 'clothes', quantity: 8 },
      { name: 'Layers for weather', category: 'clothes', quantity: 4 },
      { name: 'Small towel', category: 'toiletries', quantity: 2 },
      { name: 'Pocket tissues', category: 'toiletries', quantity: 10 },
      { name: 'Hand sanitizer', category: 'toiletries', quantity: 1 },
      { name: 'Face masks', category: 'toiletries', quantity: 10 },
      { name: 'JR Pass', category: 'documents', quantity: 1 },
      { name: 'Pocket wifi', category: 'electronics', quantity: 1 },
      { name: 'Translation app', category: 'electronics', quantity: 1 },
      { name: 'Japanese phrasebook', category: 'documents', quantity: 1 },
      { name: 'Business cards', category: 'documents', quantity: 20, thoroughnessLevel: 'balanced' },
      { name: 'Small gifts', category: 'miscellaneous', quantity: 5 },
      { name: 'Cash wallet', category: 'miscellaneous', quantity: 1 },
      { name: 'IC card', category: 'documents', quantity: 1 },
      { name: 'Umbrella', category: 'miscellaneous', quantity: 1 },
      { name: 'Day pack', category: 'miscellaneous', quantity: 1 },
      { name: 'Camera', category: 'electronics', quantity: 1 },
      { name: 'Portable charger', category: 'electronics', quantity: 1 },
      { name: 'Travel journal', category: 'miscellaneous', quantity: 1 },
      { name: 'Cultural guidebook', category: 'documents', quantity: 1 },
      { name: 'Chopstick etiquette card', category: 'documents', quantity: 1, thoroughnessLevel: 'thorough' },
      { name: 'Bowing etiquette guide', category: 'documents', quantity: 1, thoroughnessLevel: 'thorough' },
    ],
  },

  // Long-Distance & Multi-Modal Travel
  {
    id: 'cross-country-train',
    name: 'Cross-Country Train Journey',
    description: 'Comfortable long-distance train travel.',
    destinationType: 'train',
    season: 'all',
    items: [
      { name: 'Comfortable layers', category: 'clothes', quantity: 4 },
      { name: 'Soft shoes/slippers', category: 'clothes', quantity: 1 },
      { name: 'Travel pillow', category: 'miscellaneous', quantity: 1 },
      { name: 'Travel blanket', category: 'miscellaneous', quantity: 1 },
      { name: 'Eye mask', category: 'miscellaneous', quantity: 1 },
      { name: 'Earplugs', category: 'miscellaneous', quantity: 1 },
      { name: 'Entertainment books', category: 'miscellaneous', quantity: 3 },
      { name: 'Tablet/e-reader', category: 'electronics', quantity: 1 },
      { name: 'Headphones', category: 'electronics', quantity: 1 },
      { name: 'Portable charger', category: 'electronics', quantity: 1 },
      { name: 'Extension cord', category: 'electronics', quantity: 1, thoroughnessLevel: 'balanced' },
      { name: 'Snacks', category: 'miscellaneous', quantity: 8 },
      { name: 'Water bottle', category: 'miscellaneous', quantity: 1 },
      { name: 'Wet wipes', category: 'toiletries', quantity: 2 },
      { name: 'Hand sanitizer', category: 'toiletries', quantity: 1 },
      { name: 'Toiletry bag', category: 'toiletries', quantity: 1 },
      { name: 'Toothbrush', category: 'toiletries', quantity: 1 },
      { name: 'Travel journal', category: 'miscellaneous', quantity: 1 },
      { name: 'Camera', category: 'electronics', quantity: 1 },
      { name: 'Train tickets', category: 'documents', quantity: 1 },
      { name: 'ID documents', category: 'documents', quantity: 1 },
      { name: 'Comfortable socks', category: 'clothes', quantity: 3 },
      { name: 'Change of clothes', category: 'clothes', quantity: 2 },
      { name: 'Light jacket', category: 'clothes', quantity: 1 },
      { name: 'Medication', category: 'toiletries', quantity: 1 },
      { name: 'Motion sickness pills', category: 'toiletries', quantity: 1, thoroughnessLevel: 'balanced' },
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
