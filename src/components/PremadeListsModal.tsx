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
      { name: 'Swimsuit', category: 'clothes', quantity: 3, baseQuantity: 2 },
      { name: 'Beach cover-up', category: 'clothes', quantity: 2 },
      { name: 'Sunscreen SPF 50+', category: 'toiletries', quantity: 2 },
      { name: 'Reef-safe sunscreen', category: 'toiletries', quantity: 1, thoroughnessLevel: 'balanced' },
      { name: 'Sunglasses', category: 'miscellaneous', quantity: 2 },
      { name: 'Beach towel', category: 'miscellaneous', quantity: 2 },
      { name: 'Flip flops', category: 'clothes', quantity: 1 },
      { name: 'Water shoes', category: 'clothes', quantity: 1, thoroughnessLevel: 'balanced' },
      { name: 'Beach shorts', category: 'clothes', quantity: 5, baseQuantity: 3, perDay: true },
      { name: 'Tank tops', category: 'clothes', quantity: 6, baseQuantity: 4, perDay: true },
      { name: 'Summer dress', category: 'clothes', quantity: 3 },
      { name: 'Waterproof phone case', category: 'electronics', quantity: 1 },
      { name: 'Beach bag', category: 'miscellaneous', quantity: 1 },
      { name: 'After-sun lotion', category: 'toiletries', quantity: 1 },
      { name: 'Aloe vera gel', category: 'toiletries', quantity: 1 },
      { name: 'Sun hat', category: 'clothes', quantity: 1 },
      { name: 'Snorkeling gear', category: 'miscellaneous', quantity: 1, thoroughnessLevel: 'thorough' },
      { name: 'Underwater camera', category: 'electronics', quantity: 1, thoroughnessLevel: 'thorough' },
      { name: 'Beach umbrella', category: 'miscellaneous', quantity: 1, thoroughnessLevel: 'thorough' },
      { name: 'Cooling towel', category: 'miscellaneous', quantity: 1, thoroughnessLevel: 'balanced' },
      { name: 'Portable fan', category: 'electronics', quantity: 1, thoroughnessLevel: 'thorough' },
      { name: 'Beach volleyball', category: 'miscellaneous', quantity: 1, thoroughnessLevel: 'thorough' },
      { name: 'Insulated water bottle', category: 'miscellaneous', quantity: 2 },
      { name: 'Light cardigan', category: 'clothes', quantity: 1 },
      { name: 'Waterproof watch', category: 'miscellaneous', quantity: 1, thoroughnessLevel: 'balanced' },
      { name: 'Beach sarong', category: 'clothes', quantity: 2 },
      { name: 'Lip balm with SPF', category: 'toiletries', quantity: 2 },
      { name: 'Beach sandals', category: 'clothes', quantity: 1 },
      { name: 'Pool floatie', category: 'miscellaneous', quantity: 1, thoroughnessLevel: 'thorough' },
      { name: 'Healthy snacks', category: 'miscellaneous', quantity: 5 },
      { name: 'Electrolyte packets', category: 'toiletries', quantity: 10 },
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
    ],
  },
  {
    id: 'caribbean-cruise',
    name: 'Caribbean Cruise Adventure',
    description: 'Multi-island cruise with formal nights and excursions',
    destinationType: 'cruise',
    season: 'summer',
    duration: '7-14 days',
    icon: '🚢',
    items: [
      { name: 'Formal cruise attire', category: 'clothes', quantity: 3 },
      { name: 'Cocktail dresses', category: 'clothes', quantity: 2 },
      { name: 'Cruise casual wear', category: 'clothes', quantity: 5 },
      { name: 'Swimwear', category: 'clothes', quantity: 3 },
      { name: 'Excursion shoes', category: 'clothes', quantity: 2 },
      { name: 'Formal shoes', category: 'clothes', quantity: 2 },
      { name: 'Seasickness medication', category: 'toiletries', quantity: 1 },
      { name: 'Sunscreen', category: 'toiletries', quantity: 2 },
      { name: 'Cruise documents', category: 'documents', quantity: 1 },
      { name: 'Shore excursion gear', category: 'miscellaneous', quantity: 1 },
      { name: 'Formal accessories', category: 'miscellaneous', quantity: 1 },
      { name: 'Waterproof bag', category: 'miscellaneous', quantity: 1 },
      { name: 'Portable charger', category: 'electronics', quantity: 1 },
      { name: 'Camera', category: 'electronics', quantity: 1 },
      { name: 'Binoculars', category: 'miscellaneous', quantity: 1 },
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
      { name: 'Business cards', category: 'documents', quantity: 20, thoroughnessLevel: 'balanced' },
      { name: 'Gifts for hosts', category: 'miscellaneous', quantity: 3, thoroughnessLevel: 'thorough' },
      { name: 'Daypack', category: 'miscellaneous', quantity: 1 },
      { name: 'Umbrella', category: 'miscellaneous', quantity: 1 },
      { name: 'Portable charger', category: 'electronics', quantity: 1 },
      { name: 'Camera', category: 'electronics', quantity: 1 },
    ],
  },
  {
    id: 'new-york-urban',
    name: 'New York City Explorer',
    description: 'Big Apple adventure with Broadway and landmarks',
    destinationType: 'city',
    season: 'fall',
    duration: '4-7 days',
    icon: '🏙️',
    items: [
      { name: 'Comfortable sneakers', category: 'clothes', quantity: 2 },
      { name: 'Warm jacket', category: 'clothes', quantity: 1 },
      { name: 'Layering pieces', category: 'clothes', quantity: 5 },
      { name: 'Jeans', category: 'clothes', quantity: 3 },
      { name: 'Comfortable shirts', category: 'clothes', quantity: 5 },
      { name: 'Broadway outfit', category: 'clothes', quantity: 2 },
      { name: 'Winter accessories', category: 'clothes', quantity: 1 },
      { name: 'MetroCard', category: 'documents', quantity: 1 },
      { name: 'City guidebook', category: 'documents', quantity: 1 },
      { name: 'Broadway tickets', category: 'documents', quantity: 1 },
      { name: 'Crossbody bag', category: 'miscellaneous', quantity: 1 },
      { name: 'Umbrella', category: 'miscellaneous', quantity: 1 },
      { name: 'Portable charger', category: 'electronics', quantity: 1 },
      { name: 'Camera', category: 'electronics', quantity: 1 },
      { name: 'Hand sanitizer', category: 'toiletries', quantity: 1 },
      { name: 'Snacks', category: 'miscellaneous', quantity: 3 },
      { name: 'Water bottle', category: 'miscellaneous', quantity: 1 },
      { name: 'Headphones', category: 'electronics', quantity: 1 },
      { name: 'Warm socks', category: 'clothes', quantity: 5 },
      { name: 'Backup phone battery', category: 'electronics', quantity: 1 },
    ],
  },
  {
    id: 'london-classic',
    name: 'London Heritage Tour',
    description: 'Classic British experience with museums and history',
    destinationType: 'city',
    season: 'fall',
    duration: '5-8 days',
    icon: '🏰',
    items: [
      { name: 'Waterproof jacket', category: 'clothes', quantity: 1 },
      { name: 'Warm layers', category: 'clothes', quantity: 4 },
      { name: 'Comfortable walking shoes', category: 'clothes', quantity: 2 },
      { name: 'Formal attire', category: 'clothes', quantity: 2 },
      { name: 'Casual wear', category: 'clothes', quantity: 5 },
      { name: 'Umbrella', category: 'miscellaneous', quantity: 1 },
      { name: 'Travel adapter', category: 'electronics', quantity: 1 },
      { name: 'Oyster card', category: 'documents', quantity: 1 },
      { name: 'Museum passes', category: 'documents', quantity: 1 },
      { name: 'Theatre tickets', category: 'documents', quantity: 1 },
      { name: 'Crossbody bag', category: 'miscellaneous', quantity: 1 },
      { name: 'Camera', category: 'electronics', quantity: 1 },
      { name: 'Portable charger', category: 'electronics', quantity: 1 },
      { name: 'Hand cream', category: 'toiletries', quantity: 1 },
      { name: 'Lip balm', category: 'toiletries', quantity: 1 },
    ],
  },
  {
    id: 'barcelona-culture',
    name: 'Barcelona Art & Architecture',
    description: 'Gaudi masterpieces and Mediterranean charm',
    destinationType: 'city',
    season: 'spring',
    duration: '4-6 days',
    icon: '🎨',
    items: [
      { name: 'Comfortable walking shoes', category: 'clothes', quantity: 2 },
      { name: 'Light layers', category: 'clothes', quantity: 4 },
      { name: 'Summer dresses', category: 'clothes', quantity: 3 },
      { name: 'Casual pants', category: 'clothes', quantity: 2 },
      { name: 'Light cardigan', category: 'clothes', quantity: 1 },
      { name: 'Sunglasses', category: 'miscellaneous', quantity: 1 },
      { name: 'Sunscreen', category: 'toiletries', quantity: 1 },
      { name: 'Camera', category: 'electronics', quantity: 1 },
      { name: 'Spanish phrasebook', category: 'documents', quantity: 1 },
      { name: 'Museum tickets', category: 'documents', quantity: 1 },
      { name: 'Day bag', category: 'miscellaneous', quantity: 1 },
      { name: 'Water bottle', category: 'miscellaneous', quantity: 1 },
      { name: 'Art supplies', category: 'miscellaneous', quantity: 1, thoroughnessLevel: 'thorough' },
      { name: 'Travel journal', category: 'miscellaneous', quantity: 1 },
      { name: 'Portable charger', category: 'electronics', quantity: 1 },
    ],
  },

  // Adventure & Outdoor
  {
    id: 'swiss-alps-hiking',
    name: 'Swiss Alps Hiking',
    description: 'Mountain hiking with breathtaking Alpine views',
    destinationType: 'mountain',
    season: 'summer',
    duration: '7-10 days',
    icon: '⛰️',
    items: [
      { name: 'Hiking boots', category: 'clothes', quantity: 1 },
      { name: 'Backup hiking shoes', category: 'clothes', quantity: 1 },
      { name: 'Hiking socks', category: 'clothes', quantity: 8 },
      { name: 'Moisture-wicking shirts', category: 'clothes', quantity: 6 },
      { name: 'Hiking pants', category: 'clothes', quantity: 3 },
      { name: 'Rain jacket', category: 'clothes', quantity: 1 },
      { name: 'Insulating layer', category: 'clothes', quantity: 2 },
      { name: 'Sun hat', category: 'clothes', quantity: 1 },
      { name: 'Hiking backpack', category: 'miscellaneous', quantity: 1 },
      { name: 'Trekking poles', category: 'miscellaneous', quantity: 1 },
      { name: 'Water bottles', category: 'miscellaneous', quantity: 2 },
      { name: 'First aid kit', category: 'toiletries', quantity: 1 },
      { name: 'Sunscreen SPF 50+', category: 'toiletries', quantity: 2 },
      { name: 'Lip balm with SPF', category: 'toiletries', quantity: 1 },
      { name: 'Hiking map', category: 'documents', quantity: 1 },
      { name: 'GPS device', category: 'electronics', quantity: 1 },
      { name: 'Headlamp', category: 'electronics', quantity: 1 },
      { name: 'Power bank', category: 'electronics', quantity: 1 },
      { name: 'Camera', category: 'electronics', quantity: 1 },
      { name: 'Trail snacks', category: 'miscellaneous', quantity: 10 },
    ],
  },
  {
    id: 'colorado-ski',
    name: 'Colorado Ski Adventure',
    description: 'World-class skiing in the Rocky Mountains',
    destinationType: 'mountain',
    season: 'winter',
    duration: '5-7 days',
    icon: '⛷️',
    items: [
      { name: 'Ski jacket', category: 'clothes', quantity: 1 },
      { name: 'Ski pants', category: 'clothes', quantity: 2 },
      { name: 'Base layers', category: 'clothes', quantity: 6 },
      { name: 'Ski socks', category: 'clothes', quantity: 8 },
      { name: 'Ski gloves', category: 'clothes', quantity: 2 },
      { name: 'Ski goggles', category: 'miscellaneous', quantity: 2 },
      { name: 'Ski helmet', category: 'miscellaneous', quantity: 1 },
      { name: 'Après-ski clothes', category: 'clothes', quantity: 4 },
      { name: 'Winter boots', category: 'clothes', quantity: 1 },
      { name: 'Warm sweaters', category: 'clothes', quantity: 3 },
      { name: 'Ski equipment', category: 'miscellaneous', quantity: 1 },
      { name: 'Hand warmers', category: 'miscellaneous', quantity: 20 },
      { name: 'Lip balm', category: 'toiletries', quantity: 2 },
      { name: 'Sunscreen', category: 'toiletries', quantity: 1 },
      { name: 'Moisturizer', category: 'toiletries', quantity: 1 },
      { name: 'Lift tickets', category: 'documents', quantity: 1 },
      { name: 'Trail map', category: 'documents', quantity: 1 },
      { name: 'Action camera', category: 'electronics', quantity: 1 },
      { name: 'Portable charger', category: 'electronics', quantity: 1 },
      { name: 'Hot chocolate mix', category: 'miscellaneous', quantity: 5 },
    ],
  },
  {
    id: 'african-safari',
    name: 'African Safari Adventure',
    description: 'Wildlife watching and cultural experiences',
    destinationType: 'adventure',
    season: 'winter',
    duration: '10-14 days',
    icon: '🦁',
    items: [
      { name: 'Safari clothing (neutral colors)', category: 'clothes', quantity: 8 },
      { name: 'Lightweight pants', category: 'clothes', quantity: 4 },
      { name: 'Long-sleeve shirts', category: 'clothes', quantity: 5 },
      { name: 'Safari hat', category: 'clothes', quantity: 1 },
      { name: 'Comfortable boots', category: 'clothes', quantity: 1 },
      { name: 'Sandals', category: 'clothes', quantity: 1 },
      { name: 'Binoculars', category: 'miscellaneous', quantity: 1 },
      { name: 'Camera with zoom lens', category: 'electronics', quantity: 1 },
      { name: 'Extra camera batteries', category: 'electronics', quantity: 4 },
      { name: 'Insect repellent', category: 'toiletries', quantity: 2 },
      { name: 'Malaria prophylaxis', category: 'toiletries', quantity: 1 },
      { name: 'Sunscreen SPF 50+', category: 'toiletries', quantity: 2 },
      { name: 'First aid kit', category: 'toiletries', quantity: 1 },
      { name: 'Water purification tablets', category: 'toiletries', quantity: 1 },
      { name: 'Flashlight', category: 'electronics', quantity: 1 },
      { name: 'Power bank', category: 'electronics', quantity: 2 },
      { name: 'Safari guidebook', category: 'documents', quantity: 1 },
      { name: 'Vaccination records', category: 'documents', quantity: 1 },
      { name: 'Travel insurance', category: 'documents', quantity: 1 },
      { name: 'Quick-dry towel', category: 'miscellaneous', quantity: 1 },
    ],
  },
  {
    id: 'amazon-expedition',
    name: 'Amazon Rainforest Expedition',
    description: 'Deep jungle exploration and wildlife discovery',
    destinationType: 'adventure',
    season: 'all',
    duration: '7-12 days',
    icon: '🌿',
    items: [
      { name: 'Quick-dry clothing', category: 'clothes', quantity: 8 },
      { name: 'Long pants (bug protection)', category: 'clothes', quantity: 4 },
      { name: 'Long-sleeve shirts', category: 'clothes', quantity: 6 },
      { name: 'Rain poncho', category: 'clothes', quantity: 1 },
      { name: 'Waterproof boots', category: 'clothes', quantity: 1 },
      { name: 'Jungle hat', category: 'clothes', quantity: 1 },
      { name: 'Strong insect repellent', category: 'toiletries', quantity: 3 },
      { name: 'Antimalarial medication', category: 'toiletries', quantity: 1 },
      { name: 'First aid kit', category: 'toiletries', quantity: 1 },
      { name: 'Water purification system', category: 'miscellaneous', quantity: 1 },
      { name: 'Waterproof bags', category: 'miscellaneous', quantity: 5 },
      { name: 'Headlamp', category: 'electronics', quantity: 1 },
      { name: 'Backup flashlight', category: 'electronics', quantity: 1 },
      { name: 'Binoculars', category: 'miscellaneous', quantity: 1 },
      { name: 'Waterproof camera', category: 'electronics', quantity: 1 },
      { name: 'Power bank', category: 'electronics', quantity: 2 },
      { name: 'Satellite communicator', category: 'electronics', quantity: 1, thoroughnessLevel: 'thorough' },
      { name: 'Jungle survival guide', category: 'documents', quantity: 1 },
      { name: 'Vaccination certificates', category: 'documents', quantity: 1 },
      { name: 'Emergency whistle', category: 'miscellaneous', quantity: 1 },
    ],
  },

  // Business Travel
  {
    id: 'business-international',
    name: 'International Business Trip',
    description: 'Professional meetings and conferences abroad',
    destinationType: 'business',
    season: 'all',
    duration: '3-7 days',
    icon: '💼',
    items: [
      { name: 'Business suits', category: 'clothes', quantity: 3 },
      { name: 'Dress shirts', category: 'clothes', quantity: 5 },
      { name: 'Ties/accessories', category: 'clothes', quantity: 4 },
      { name: 'Dress shoes', category: 'clothes', quantity: 2 },
      { name: 'Professional socks', category: 'clothes', quantity: 6 },
      { name: 'Belts', category: 'clothes', quantity: 2 },
      { name: 'Business cards', category: 'documents', quantity: 100 },
      { name: 'Laptop', category: 'electronics', quantity: 1 },
      { name: 'Chargers', category: 'electronics', quantity: 2 },
      { name: 'Presentation materials', category: 'documents', quantity: 1 },
      { name: 'Portfolio', category: 'miscellaneous', quantity: 1 },
      { name: 'Travel adapters', category: 'electronics', quantity: 1 },
      { name: 'Professional attire steamer', category: 'miscellaneous', quantity: 1 },
      { name: 'Cufflinks', category: 'miscellaneous', quantity: 1 },
      { name: 'Watch', category: 'miscellaneous', quantity: 1 },
      { name: 'Meeting notes', category: 'documents', quantity: 1 },
      { name: 'Company ID', category: 'documents', quantity: 1 },
      { name: 'Travel itinerary', category: 'documents', quantity: 1 },
      { name: 'Breath mints', category: 'toiletries', quantity: 1 },
      { name: 'Hand sanitizer', category: 'toiletries', quantity: 1 },
    ],
  },
  {
    id: 'conference-speaker',
    name: 'Conference Speaker',
    description: 'Speaking engagement with presentation setup',
    destinationType: 'business',
    season: 'all',
    duration: '2-4 days',
    icon: '🎤',
    items: [
      { name: 'Presentation outfit', category: 'clothes', quantity: 2 },
      { name: 'Backup professional attire', category: 'clothes', quantity: 1 },
      { name: 'Comfortable shoes', category: 'clothes', quantity: 1 },
      { name: 'Dress shoes', category: 'clothes', quantity: 1 },
      { name: 'Laptop', category: 'electronics', quantity: 1 },
      { name: 'Presentation remote', category: 'electronics', quantity: 1 },
      { name: 'Backup slides (USB)', category: 'electronics', quantity: 1 },
      { name: 'Adapters/dongles', category: 'electronics', quantity: 1 },
      { name: 'Business cards', category: 'documents', quantity: 200 },
      { name: 'Speaker bio', category: 'documents', quantity: 5 },
      { name: 'Presentation notes', category: 'documents', quantity: 1 },
      { name: 'Throat lozenges', category: 'toiletries', quantity: 1 },
      { name: 'Stress relief items', category: 'miscellaneous', quantity: 1 },
      { name: 'Networking materials', category: 'documents', quantity: 1 },
      { name: 'Emergency contact list', category: 'documents', quantity: 1 },
    ],
  },

  // Family Travel
  {
    id: 'disney-family',
    name: 'Disney World Family Vacation',
    description: 'Magical family trip with kids of all ages',
    destinationType: 'family',
    season: 'summer',
    duration: '5-7 days',
    icon: '🏰',
    items: [
      { name: 'Comfortable walking shoes', category: 'clothes', quantity: 2 },
      { name: 'Backup shoes for kids', category: 'clothes', quantity: 1 },
      { name: 'Casual family outfits', category: 'clothes', quantity: 6 },
      { name: 'Disney-themed clothes', category: 'clothes', quantity: 3 },
      { name: 'Swimwear', category: 'clothes', quantity: 2 },
      { name: 'Sunscreen', category: 'toiletries', quantity: 2 },
      { name: 'First aid kit', category: 'toiletries', quantity: 1 },
      { name: 'Kids medications', category: 'toiletries', quantity: 1 },
      { name: 'Portable chargers', category: 'electronics', quantity: 2 },
      { name: 'Camera', category: 'electronics', quantity: 1 },
      { name: 'Snacks for kids', category: 'miscellaneous', quantity: 10 },
      { name: 'Water bottles', category: 'miscellaneous', quantity: 4 },
      { name: 'Stroller', category: 'miscellaneous', quantity: 1 },
      { name: 'Disney tickets', category: 'documents', quantity: 1 },
      { name: 'Autograph book', category: 'miscellaneous', quantity: 1 },
      { name: 'Small backpack', category: 'miscellaneous', quantity: 1 },
      { name: 'Entertainment for queues', category: 'miscellaneous', quantity: 1 },
      { name: 'Wet wipes', category: 'toiletries', quantity: 5 },
      { name: 'Hand sanitizer', category: 'toiletries', quantity: 2 },
      { name: 'Rain ponchos', category: 'clothes', quantity: 4 },
    ],
  },
  {
    id: 'camping-family',
    name: 'Family Camping Adventure',
    description: 'Outdoor camping with kids and nature activities',
    destinationType: 'outdoor',
    season: 'summer',
    duration: '3-5 days',
    icon: '🏕️',
    items: [
      { name: 'Tent', category: 'miscellaneous', quantity: 1 },
      { name: 'Sleeping bags', category: 'miscellaneous', quantity: 4 },
      { name: 'Camping pillows', category: 'miscellaneous', quantity: 4 },
      { name: 'Camping chairs', category: 'miscellaneous', quantity: 4 },
      { name: 'Outdoor clothing', category: 'clothes', quantity: 12 },
      { name: 'Rain gear', category: 'clothes', quantity: 4 },
      { name: 'Hiking boots', category: 'clothes', quantity: 4 },
      { name: 'Camping stove', category: 'miscellaneous', quantity: 1 },
      { name: 'Cooking supplies', category: 'miscellaneous', quantity: 1 },
      { name: 'Cooler', category: 'miscellaneous', quantity: 1 },
      { name: 'Flashlights', category: 'electronics', quantity: 4 },
      { name: 'Lantern', category: 'electronics', quantity: 1 },
      { name: 'First aid kit', category: 'toiletries', quantity: 1 },
      { name: 'Insect repellent', category: 'toiletries', quantity: 2 },
      { name: 'Sunscreen', category: 'toiletries', quantity: 2 },
      { name: 'Toilet paper', category: 'toiletries', quantity: 4 },
      { name: 'Camping games', category: 'miscellaneous', quantity: 3 },
      { name: 'Nature guides', category: 'documents', quantity: 1 },
      { name: 'Emergency supplies', category: 'miscellaneous', quantity: 1 },
      { name: 'Trash bags', category: 'miscellaneous', quantity: 10 },
    ],
  },

  // Food & Culture
  {
    id: 'italy-culinary',
    name: 'Italian Culinary Journey',
    description: 'Food-focused trip through Italy\'s regions',
    destinationType: 'culinary',
    season: 'spring',
    duration: '10-14 days',
    icon: '🍝',
    items: [
      { name: 'Comfortable walking shoes', category: 'clothes', quantity: 2 },
      { name: 'Casual dining outfits', category: 'clothes', quantity: 8 },
      { name: 'Nice dinner attire', category: 'clothes', quantity: 4 },
      { name: 'Light layers', category: 'clothes', quantity: 5 },
      { name: 'Food tour comfortable clothes', category: 'clothes', quantity: 6 },
      { name: 'Camera for food photos', category: 'electronics', quantity: 1 },
      { name: 'Food journal', category: 'miscellaneous', quantity: 1 },
      { name: 'Italian phrasebook', category: 'documents', quantity: 1 },
      { name: 'Restaurant reservations', category: 'documents', quantity: 1 },
      { name: 'Cooking class materials', category: 'miscellaneous', quantity: 1 },
      { name: 'Digestive aids', category: 'toiletries', quantity: 1 },
      { name: 'Stretchy pants', category: 'clothes', quantity: 2 },
      { name: 'Wine tasting notes', category: 'miscellaneous', quantity: 1 },
      { name: 'Food storage containers', category: 'miscellaneous', quantity: 3 },
      { name: 'Portable scales', category: 'miscellaneous', quantity: 1, thoroughnessLevel: 'thorough' },
    ],
  },
  {
    id: 'japan-food-culture',
    name: 'Japan Food & Culture',
    description: 'Authentic Japanese cuisine and traditions',
    destinationType: 'culinary',
    season: 'spring',
    duration: '8-12 days',
    icon: '🍣',
    items: [
      { name: 'Respectful dining attire', category: 'clothes', quantity: 6 },
      { name: 'Comfortable shoes (easy removal)', category: 'clothes', quantity: 2 },
      { name: 'Sushi class outfit', category: 'clothes', quantity: 1 },
      { name: 'Temple visit clothes', category: 'clothes', quantity: 2 },
      { name: 'Chopsticks (personal set)', category: 'miscellaneous', quantity: 1 },
      { name: 'Food allergies card (Japanese)', category: 'documents', quantity: 1 },
      { name: 'Restaurant guide', category: 'documents', quantity: 1 },
      { name: 'Cultural etiquette guide', category: 'documents', quantity: 1 },
      { name: 'Food photography camera', category: 'electronics', quantity: 1 },
      { name: 'Taste journal', category: 'miscellaneous', quantity: 1 },
      { name: 'Pocket tissues', category: 'toiletries', quantity: 10 },
      { name: 'Hand towel', category: 'toiletries', quantity: 2 },
      { name: 'Small gifts for hosts', category: 'miscellaneous', quantity: 5 },
      { name: 'Cash wallet', category: 'miscellaneous', quantity: 1 },
      { name: 'Market bags', category: 'miscellaneous', quantity: 2 },
    ],
  },

  // Wellness & Spa
  {
    id: 'bali-wellness',
    name: 'Bali Wellness Retreat',
    description: 'Spiritual healing and yoga in tropical paradise',
    destinationType: 'wellness',
    season: 'all',
    duration: '7-14 days',
    icon: '🧘',
    items: [
      { name: 'Yoga clothing', category: 'clothes', quantity: 8 },
      { name: 'Meditation attire', category: 'clothes', quantity: 4 },
      { name: 'Lightweight fabrics', category: 'clothes', quantity: 6 },
      { name: 'Yoga mat', category: 'miscellaneous', quantity: 1 },
      { name: 'Meditation cushion', category: 'miscellaneous', quantity: 1 },
      { name: 'Natural skincare', category: 'toiletries', quantity: 1 },
      { name: 'Essential oils', category: 'toiletries', quantity: 3 },
      { name: 'Wellness journal', category: 'miscellaneous', quantity: 1 },
      { name: 'Books for inspiration', category: 'miscellaneous', quantity: 2 },
      { name: 'Reusable water bottle', category: 'miscellaneous', quantity: 1 },
      { name: 'Healthy snacks', category: 'miscellaneous', quantity: 5 },
      { name: 'Mosquito repellent (natural)', category: 'toiletries', quantity: 1 },
      { name: 'Sunscreen (reef-safe)', category: 'toiletries', quantity: 1 },
      { name: 'Light scarf', category: 'clothes', quantity: 2 },
      { name: 'Comfortable sandals', category: 'clothes', quantity: 2 },
    ],
  },
  {
    id: 'iceland-spa',
    name: 'Iceland Geothermal Spa',
    description: 'Relaxation in natural hot springs and Nordic spas',
    destinationType: 'wellness',
    season: 'winter',
    duration: '5-7 days',
    icon: '♨️',
    items: [
      { name: 'Swimsuit', category: 'clothes', quantity: 2 },
      { name: 'Warm layers', category: 'clothes', quantity: 6 },
      { name: 'Waterproof jacket', category: 'clothes', quantity: 1 },
      { name: 'Warm boots', category: 'clothes', quantity: 1 },
      { name: 'Spa slippers', category: 'clothes', quantity: 1 },
      { name: 'Quick-dry towel', category: 'miscellaneous', quantity: 2 },
      { name: 'Waterproof bag', category: 'miscellaneous', quantity: 1 },
      { name: 'Hair mask', category: 'toiletries', quantity: 2 },
      { name: 'Moisturizer', category: 'toiletries', quantity: 2 },
      { name: 'Lip balm', category: 'toiletries', quantity: 2 },
      { name: 'Camera (waterproof)', category: 'electronics', quantity: 1 },
      { name: 'Relaxation music', category: 'electronics', quantity: 1 },
      { name: 'Hot chocolate mix', category: 'miscellaneous', quantity: 5 },
      { name: 'Warm socks', category: 'clothes', quantity: 8 },
      { name: 'Spa booking confirmations', category: 'documents', quantity: 1 },
    ],
  },

  // Festival & Events
  {
    id: 'coachella-festival',
    name: 'Coachella Music Festival',
    description: 'Desert music festival with style and comfort',
    destinationType: 'festival',
    season: 'spring',
    duration: '3-4 days',
    icon: '🎵',
    items: [
      { name: 'Festival outfits', category: 'clothes', quantity: 4 },
      { name: 'Comfortable festival shoes', category: 'clothes', quantity: 2 },
      { name: 'Bandanas/face coverings', category: 'clothes', quantity: 3 },
      { name: 'Sunglasses', category: 'miscellaneous', quantity: 2 },
      { name: 'Sun hat', category: 'clothes', quantity: 1 },
      { name: 'Portable phone charger', category: 'electronics', quantity: 2 },
      { name: 'Fanny pack/crossbody bag', category: 'miscellaneous', quantity: 1 },
      { name: 'Sunscreen', category: 'toiletries', quantity: 2 },
      { name: 'Water bottles', category: 'miscellaneous', quantity: 2 },
      { name: 'Wet wipes', category: 'toiletries', quantity: 5 },
      { name: 'Hand sanitizer', category: 'toiletries', quantity: 2 },
      { name: 'Cash', category: 'miscellaneous', quantity: 1 },
      { name: 'Festival tickets', category: 'documents', quantity: 1 },
      { name: 'Backup phone battery', category: 'electronics', quantity: 1 },
      { name: 'Dust mask', category: 'miscellaneous', quantity: 3 },
    ],
  },
  {
    id: 'oktoberfest-munich',
    name: 'Oktoberfest Munich',
    description: 'Traditional German beer festival celebration',
    destinationType: 'festival',
    season: 'fall',
    duration: '3-5 days',
    icon: '🍺',
    items: [
      { name: 'Traditional dirndl/lederhosen', category: 'clothes', quantity: 2 },
      { name: 'Comfortable shoes', category: 'clothes', quantity: 2 },
      { name: 'Warm layers', category: 'clothes', quantity: 4 },
      { name: 'Rain jacket', category: 'clothes', quantity: 1 },
      { name: 'Crossbody bag', category: 'miscellaneous', quantity: 1 },
      { name: 'Cash (euros)', category: 'miscellaneous', quantity: 1 },
      { name: 'Table reservations', category: 'documents', quantity: 1 },
      { name: 'Antacids', category: 'toiletries', quantity: 1 },
      { name: 'Hangover remedies', category: 'toiletries', quantity: 1 },
      { name: 'Water bottle', category: 'miscellaneous', quantity: 1 },
      { name: 'Camera', category: 'electronics', quantity: 1 },
      { name: 'Portable charger', category: 'electronics', quantity: 1 },
      { name: 'German phrasebook', category: 'documents', quantity: 1 },
      { name: 'Hand sanitizer', category: 'toiletries', quantity: 1 },
      { name: 'Aspirin', category: 'toiletries', quantity: 1 },
    ],
  },

  // Road Trip & Self-Drive
  {
    id: 'usa-road-trip',
    name: 'USA Cross-Country Road Trip',
    description: 'Epic American road trip adventure',
    destinationType: 'roadtrip',
    season: 'summer',
    duration: '14-21 days',
    icon: '🛣️',
    items: [
      { name: 'Comfortable driving clothes', category: 'clothes', quantity: 15 },
      { name: 'Various weather clothing', category: 'clothes', quantity: 10 },
      { name: 'Hiking gear', category: 'clothes', quantity: 5 },
      { name: 'Car emergency kit', category: 'miscellaneous', quantity: 1 },
      { name: 'Road atlas', category: 'documents', quantity: 1 },
      { name: 'GPS device', category: 'electronics', quantity: 1 },
      { name: 'Car phone charger', category: 'electronics', quantity: 1 },
      { name: 'Cooler', category: 'miscellaneous', quantity: 1 },
      { name: 'Road trip snacks', category: 'miscellaneous', quantity: 20 },
      { name: 'Water bottles', category: 'miscellaneous', quantity: 6 },
      { name: 'Camera', category: 'electronics', quantity: 1 },
      { name: 'Travel journal', category: 'miscellaneous', quantity: 1 },
      { name: 'First aid kit', category: 'toiletries', quantity: 1 },
      { name: 'Sunscreen', category: 'toiletries', quantity: 2 },
      { name: 'Entertainment for passengers', category: 'miscellaneous', quantity: 1 },
      { name: 'Blankets', category: 'miscellaneous', quantity: 2 },
      { name: 'Pillows', category: 'miscellaneous', quantity: 2 },
      { name: 'National park passes', category: 'documents', quantity: 1 },
      { name: 'Hotel booking confirmations', category: 'documents', quantity: 1 },
      { name: 'Car insurance documents', category: 'documents', quantity: 1 },
    ],
  },
  {
    id: 'scotland-highlands',
    name: 'Scotland Highlands Drive',
    description: 'Self-drive through Scottish castles and lochs',
    destinationType: 'roadtrip',
    season: 'summer',
    duration: '7-10 days',
    icon: '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
    items: [
      { name: 'Waterproof clothing', category: 'clothes', quantity: 8 },
      { name: 'Warm layers', category: 'clothes', quantity: 6 },
      { name: 'Walking boots', category: 'clothes', quantity: 1 },
      { name: 'Rain gear', category: 'clothes', quantity: 1 },
      { name: 'Driving gloves', category: 'clothes', quantity: 1 },
      { name: 'UK road atlas', category: 'documents', quantity: 1 },
      { name: 'Castle guidebook', category: 'documents', quantity: 1 },
      { name: 'Car rental documents', category: 'documents', quantity: 1 },
      { name: 'Camera', category: 'electronics', quantity: 1 },
      { name: 'Binoculars', category: 'miscellaneous', quantity: 1 },
      { name: 'Thermos flask', category: 'miscellaneous', quantity: 1 },
      { name: 'Scottish snacks', category: 'miscellaneous', quantity: 5 },
      { name: 'Umbrella', category: 'miscellaneous', quantity: 1 },
      { name: 'Car charger', category: 'electronics', quantity: 1 },
      { name: 'First aid kit', category: 'toiletries', quantity: 1 },
    ],
  },

  // Cruise & Ship Travel
  {
    id: 'mediterranean-cruise',
    name: 'Mediterranean Cruise',
    description: 'Luxury cruise through historic Mediterranean ports',
    destinationType: 'cruise',
    season: 'summer',
    duration: '7-12 days',
    icon: '🚢',
    items: [
      { name: 'Formal cruise attire', category: 'clothes', quantity: 4 },
      { name: 'Smart casual wear', category: 'clothes', quantity: 6 },
      { name: 'Poolside clothing', category: 'clothes', quantity: 4 },
      { name: 'Shore excursion outfits', category: 'clothes', quantity: 6 },
      { name: 'Formal shoes', category: 'clothes', quantity: 2 },
      { name: 'Comfortable walking shoes', category: 'clothes', quantity: 2 },
      { name: 'Seasickness remedies', category: 'toiletries', quantity: 1 },
      { name: 'Sunscreen', category: 'toiletries', quantity: 2 },
      { name: 'Cruise documents', category: 'documents', quantity: 1 },
      { name: 'Shore excursion tickets', category: 'documents', quantity: 1 },
      { name: 'Evening accessories', category: 'miscellaneous', quantity: 1 },
      { name: 'Camera', category: 'electronics', quantity: 1 },
      { name: 'Portable charger', category: 'electronics', quantity: 1 },
      { name: 'Binoculars', category: 'miscellaneous', quantity: 1 },
      { name: 'Day bag for excursions', category: 'miscellaneous', quantity: 1 },
    ],
  },
  {
    id: 'alaska-cruise',
    name: 'Alaska Wilderness Cruise',
    description: 'Scenic cruise through Alaskan fjords and glaciers',
    destinationType: 'cruise',
    season: 'summer',
    duration: '7-10 days',
    icon: '🐻',
    items: [
      { name: 'Warm cruise attire', category: 'clothes', quantity: 8 },
      { name: 'Waterproof jacket', category: 'clothes', quantity: 1 },
      { name: 'Warm layers', category: 'clothes', quantity: 6 },
      { name: 'Waterproof pants', category: 'clothes', quantity: 1 },
      { name: 'Warm boots', category: 'clothes', quantity: 1 },
      { name: 'Gloves', category: 'clothes', quantity: 2 },
      { name: 'Warm hat', category: 'clothes', quantity: 1 },
      { name: 'Binoculars', category: 'miscellaneous', quantity: 1 },
      { name: 'Wildlife guidebook', category: 'documents', quantity: 1 },
      { name: 'Camera with zoom lens', category: 'electronics', quantity: 1 },
      { name: 'Extra batteries', category: 'electronics', quantity: 4 },
      { name: 'Hand warmers', category: 'miscellaneous', quantity: 10 },
      { name: 'Lip balm', category: 'toiletries', quantity: 2 },
      { name: 'Moisturizer', category: 'toiletries', quantity: 1 },
      { name: 'Sunglasses', category: 'miscellaneous', quantity: 1 },
    ],
  },

  // Winter Sports
  {
    id: 'aspen-luxury-ski',
    name: 'Aspen Luxury Ski Resort',
    description: 'High-end ski resort with après-ski elegance',
    destinationType: 'ski',
    season: 'winter',
    duration: '5-7 days',
    icon: '🎿',
    items: [
      { name: 'Designer ski wear', category: 'clothes', quantity: 4 },
      { name: 'Luxury base layers', category: 'clothes', quantity: 6 },
      { name: 'Après-ski outfits', category: 'clothes', quantity: 4 },
      { name: 'Designer boots', category: 'clothes', quantity: 2 },
      { name: 'Ski equipment rental', category: 'miscellaneous', quantity: 1 },
      { name: 'Ski lessons booking', category: 'documents', quantity: 1 },
      { name: 'Restaurant reservations', category: 'documents', quantity: 1 },
      { name: 'Lift tickets', category: 'documents', quantity: 1 },
      { name: 'Action camera', category: 'electronics', quantity: 1 },
      { name: 'Portable charger', category: 'electronics', quantity: 1 },
      { name: 'Ski goggles', category: 'miscellaneous', quantity: 2 },
      { name: 'Hand warmers', category: 'miscellaneous', quantity: 20 },
      { name: 'Lip balm', category: 'toiletries', quantity: 2 },
      { name: 'Sunscreen', category: 'toiletries', quantity: 1 },
      { name: 'Moisturizer', category: 'toiletries', quantity: 1 },
    ],
  },

  // Additional unique destinations
  {
    id: 'antarctica-expedition',
    name: 'Antarctica Expedition',
    description: 'Once-in-a-lifetime polar expedition adventure',
    destinationType: 'expedition',
    season: 'summer',
    duration: '10-14 days',
    icon: '🐧',
    items: [
      { name: 'Expedition parka', category: 'clothes', quantity: 1 },
      { name: 'Waterproof pants', category: 'clothes', quantity: 2 },
      { name: 'Insulating layers', category: 'clothes', quantity: 8 },
      { name: 'Waterproof gloves', category: 'clothes', quantity: 2 },
      { name: 'Warm hat', category: 'clothes', quantity: 2 },
      { name: 'Expedition boots', category: 'clothes', quantity: 1 },
      { name: 'Sunglasses (glacier)', category: 'miscellaneous', quantity: 1 },
      { name: 'Sunscreen SPF 50+', category: 'toiletries', quantity: 2 },
      { name: 'Lip balm', category: 'toiletries', quantity: 3 },
      { name: 'Camera (cold weather)', category: 'electronics', quantity: 1 },
      { name: 'Extra batteries', category: 'electronics', quantity: 8 },
      { name: 'Waterproof bag', category: 'miscellaneous', quantity: 2 },
      { name: 'Binoculars', category: 'miscellaneous', quantity: 1 },
      { name: 'Journal', category: 'miscellaneous', quantity: 1 },
      { name: 'Seasickness medication', category: 'toiletries', quantity: 1 },
    ],
  },
  {
    id: 'india-spiritual',
    name: 'India Spiritual Journey',
    description: 'Cultural and spiritual exploration of incredible India',
    destinationType: 'spiritual',
    season: 'winter',
    duration: '14-21 days',
    icon: '🕉️',
    items: [
      { name: 'Modest clothing', category: 'clothes', quantity: 15 },
      { name: 'Long pants/skirts', category: 'clothes', quantity: 8 },
      { name: 'Long-sleeve shirts', category: 'clothes', quantity: 10 },
      { name: 'Comfortable sandals', category: 'clothes', quantity: 2 },
      { name: 'Temple visit attire', category: 'clothes', quantity: 5 },
      { name: 'Light scarf/shawl', category: 'clothes', quantity: 3 },
      { name: 'Water purification tablets', category: 'toiletries', quantity: 1 },
      { name: 'First aid kit', category: 'toiletries', quantity: 1 },
      { name: 'Insect repellent', category: 'toiletries', quantity: 2 },
      { name: 'Hand sanitizer', category: 'toiletries', quantity: 3 },
      { name: 'Meditation cushion', category: 'miscellaneous', quantity: 1 },
      { name: 'Journal', category: 'miscellaneous', quantity: 1 },
      { name: 'Spiritual books', category: 'miscellaneous', quantity: 2 },
      { name: 'Camera', category: 'electronics', quantity: 1 },
      { name: 'Portable charger', category: 'electronics', quantity: 1 },
    ],
  },
];

// Add airlines data
const airlines = [
  {
    id: 'american',
    name: 'American Airlines',
    code: 'AA',
    baggage: {
      carryOn: { 
        domestic: { weight: '40 lbs', dimensions: '22x14x9 in' },
        international: { weight: '40 lbs', dimensions: '22x14x9 in' }
      },
      checked: {
        domestic: { 
          economy: { weight: '50 lbs', dimensions: '62 in total', fee: '$30' },
          premium: { weight: '50 lbs', dimensions: '62 in total', fee: 'Free first bag' }
        },
        international: {
          economy: { weight: '50 lbs', dimensions: '62 in total', fee: 'Free first bag' },
          premium: { weight: '50 lbs', dimensions: '62 in total', fee: 'Free 2 bags' }
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
        domestic: { weight: '40 lbs', dimensions: '22x14x9 in' },
        international: { weight: '40 lbs', dimensions: '22x14x9 in' }
      },
      checked: {
        domestic: { 
          economy: { weight: '50 lbs', dimensions: '62 in total', fee: '$30' },
          premium: { weight: '50 lbs', dimensions: '62 in total', fee: 'Free first bag' }
        },
        international: {
          economy: { weight: '50 lbs', dimensions: '62 in total', fee: 'Free first bag' },
          premium: { weight: '50 lbs', dimensions: '62 in total', fee: 'Free 2 bags' }
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
        domestic: { weight: '40 lbs', dimensions: '22x14x9 in' },
        international: { weight: '40 lbs', dimensions: '22x14x9 in' }
      },
      checked: {
        domestic: { 
          economy: { weight: '50 lbs', dimensions: '62 in total', fee: '$35' },
          premium: { weight: '50 lbs', dimensions: '62 in total', fee: 'Free first bag' }
        },
        international: {
          economy: { weight: '50 lbs', dimensions: '62 in total', fee: 'Free first bag' },
          premium: { weight: '50 lbs', dimensions: '62 in total', fee: 'Free 2 bags' }
        }
      }
    }
  },
  {
    id: 'southwest',
    name: 'Southwest Airlines',
    code: 'WN',
    baggage: {
      carryOn: { 
        domestic: { weight: 'No limit', dimensions: '24x16x10 in' },
        international: { weight: 'No limit', dimensions: '24x16x10 in' }
      },
      checked: {
        domestic: { 
          economy: { weight: '50 lbs', dimensions: '62 in total', fee: 'Free 2 bags' },
          premium: { weight: '50 lbs', dimensions: '62 in total', fee: 'Free 2 bags' }
        },
        international: {
          economy: { weight: '50 lbs', dimensions: '62 in total', fee: 'Free 2 bags' },
          premium: { weight: '50 lbs', dimensions: '62 in total', fee: 'Free 2 bags' }
        }
      }
    }
  },
  {
    id: 'jetblue',
    name: 'JetBlue Airways',
    code: 'B6',
    baggage: {
      carryOn: { 
        domestic: { weight: 'No limit', dimensions: '22x14x9 in' },
        international: { weight: 'No limit', dimensions: '22x14x9 in' }
      },
      checked: {
        domestic: { 
          economy: { weight: '50 lbs', dimensions: '62 in total', fee: '$35' },
          premium: { weight: '50 lbs', dimensions: '62 in total', fee: 'Free first bag' }
        },
        international: {
          economy: { weight: '50 lbs', dimensions: '62 in total', fee: '$35' },
          premium: { weight: '50 lbs', dimensions: '62 in total', fee: 'Free first bag' }
        }
      }
    }
  },
  {
    id: 'lufthansa',
    name: 'Lufthansa',
    code: 'LH',
    baggage: {
      carryOn: { 
        domestic: { weight: '8 kg', dimensions: '55x40x23 cm' },
        international: { weight: '8 kg', dimensions: '55x40x23 cm' }
      },
      checked: {
        domestic: { 
          economy: { weight: '23 kg', dimensions: '158 cm total', fee: 'Varies' },
          premium: { weight: '32 kg', dimensions: '158 cm total', fee: 'Free first bag' }
        },
        international: {
          economy: { weight: '23 kg', dimensions: '158 cm total', fee: 'Free first bag' },
          premium: { weight: '32 kg', dimensions: '158 cm total', fee: 'Free 2 bags' }
        }
      }
    }
  },
  {
    id: 'british-airways',
    name: 'British Airways',
    code: 'BA',
    baggage: {
      carryOn: { 
        domestic: { weight: '23 kg', dimensions: '56x45x25 cm' },
        international: { weight: '23 kg', dimensions: '56x45x25 cm' }
      },
      checked: {
        domestic: { 
          economy: { weight: '23 kg', dimensions: '90x75x43 cm', fee: 'Free first bag' },
          premium: { weight: '32 kg', dimensions: '90x75x43 cm', fee: 'Free 2 bags' }
        },
        international: {
          economy: { weight: '23 kg', dimensions: '90x75x43 cm', fee: 'Free first bag' },
          premium: { weight: '32 kg', dimensions: '90x75x43 cm', fee: 'Free 2 bags' }
        }
      }
    }
  },
  {
    id: 'air-france',
    name: 'Air France',
    code: 'AF',
    baggage: {
      carryOn: { 
        domestic: { weight: '12 kg', dimensions: '55x35x25 cm' },
        international: { weight: '12 kg', dimensions: '55x35x25 cm' }
      },
      checked: {
        domestic: { 
          economy: { weight: '23 kg', dimensions: '158 cm total', fee: 'Free first bag' },
          premium: { weight: '32 kg', dimensions: '158 cm total', fee: 'Free 2 bags' }
        },
        international: {
          economy: { weight: '23 kg', dimensions: '158 cm total', fee: 'Free first bag' },
          premium: { weight: '32 kg', dimensions: '158 cm total', fee: 'Free 2 bags' }
        }
      }
    }
  },
  {
    id: 'klm',
    name: 'KLM Royal Dutch Airlines',
    code: 'KL',
    baggage: {
      carryOn: { 
        domestic: { weight: '12 kg', dimensions: '55x35x25 cm' },
        international: { weight: '12 kg', dimensions: '55x35x25 cm' }
      },
      checked: {
        domestic: { 
          economy: { weight: '23 kg', dimensions: '158 cm total', fee: 'Free first bag' },
          premium: { weight: '32 kg', dimensions: '158 cm total', fee: 'Free 2 bags' }
        },
        international: {
          economy: { weight: '23 kg', dimensions: '158 cm total', fee: 'Free first bag' },
          premium: { weight: '32 kg', dimensions: '158 cm total', fee: 'Free 2 bags' }
        }
      }
    }
  },
  {
    id: 'emirates',
    name: 'Emirates',
    code: 'EK',
    baggage: {
      carryOn: { 
        domestic: { weight: '7 kg', dimensions: '55x38x22 cm' },
        international: { weight: '7 kg', dimensions: '55x38x22 cm' }
      },
      checked: {
        domestic: { 
          economy: { weight: '30 kg', dimensions: '150 cm total', fee: 'Free allowance' },
          premium: { weight: '40 kg', dimensions: '150 cm total', fee: 'Free allowance' }
        },
        international: {
          economy: { weight: '30 kg', dimensions: '150 cm total', fee: 'Free allowance' },
          premium: { weight: '40 kg', dimensions: '150 cm total', fee: 'Free allowance' }
        }
      }
    }
  },
  {
    id: 'singapore',
    name: 'Singapore Airlines',
    code: 'SQ',
    baggage: {
      carryOn: { 
        domestic: { weight: '7 kg', dimensions: '56x36x23 cm' },
        international: { weight: '7 kg', dimensions: '56x36x23 cm' }
      },
      checked: {
        domestic: { 
          economy: { weight: '30 kg', dimensions: '158 cm total', fee: 'Free allowance' },
          premium: { weight: '40 kg', dimensions: '158 cm total', fee: 'Free allowance' }
        },
        international: {
          economy: { weight: '30 kg', dimensions: '158 cm total', fee: 'Free allowance' },
          premium: { weight: '40 kg', dimensions: '158 cm total', fee: 'Free allowance' }
        }
      }
    }
  },
  {
    id: 'qantas',
    name: 'Qantas',
    code: 'QF',
    baggage: {
      carryOn: { 
        domestic: { weight: '7 kg', dimensions: '56x36x23 cm' },
        international: { weight: '7 kg', dimensions: '56x36x23 cm' }
      },
      checked: {
        domestic: { 
          economy: { weight: '23 kg', dimensions: '158 cm total', fee: 'Free first bag' },
          premium: { weight: '32 kg', dimensions: '158 cm total', fee: 'Free 2 bags' }
        },
        international: {
          economy: { weight: '23 kg', dimensions: '158 cm total', fee: 'Free first bag' },
          premium: { weight: '32 kg', dimensions: '158 cm total', fee: 'Free 2 bags' }
        }
      }
    }
  },
  {
    id: 'cathay-pacific',
    name: 'Cathay Pacific',
    code: 'CX',
    baggage: {
      carryOn: { 
        domestic: { weight: '7 kg', dimensions: '56x36x23 cm' },
        international: { weight: '7 kg', dimensions: '56x36x23 cm' }
      },
      checked: {
        domestic: { 
          economy: { weight: '23 kg', dimensions: '158 cm total', fee: 'Free first bag' },
          premium: { weight: '32 kg', dimensions: '158 cm total', fee: 'Free 2 bags' }
        },
        international: {
          economy: { weight: '23 kg', dimensions: '158 cm total', fee: 'Free first bag' },
          premium: { weight: '32 kg', dimensions: '158 cm total', fee: 'Free 2 bags' }
        }
      }
    }
  },
  {
    id: 'japan-airlines',
    name: 'Japan Airlines (JAL)',
    code: 'JL',
    baggage: {
      carryOn: { 
        domestic: { weight: '10 kg', dimensions: '55x40x25 cm' },
        international: { weight: '10 kg', dimensions: '55x40x25 cm' }
      },
      checked: {
        domestic: { 
          economy: { weight: '20 kg', dimensions: '203 cm total', fee: 'Free first bag' },
          premium: { weight: '32 kg', dimensions: '203 cm total', fee: 'Free 2 bags' }
        },
        international: {
          economy: { weight: '23 kg', dimensions: '158 cm total', fee: 'Free 2 bags' },
          premium: { weight: '32 kg', dimensions: '158 cm total', fee: 'Free 2 bags' }
        }
      }
    }
  },
  {
    id: 'ana',
    name: 'All Nippon Airways (ANA)',
    code: 'NH',
    baggage: {
      carryOn: { 
        domestic: { weight: '10 kg', dimensions: '55x40x25 cm' },
        international: { weight: '10 kg', dimensions: '55x40x25 cm' }
      },
      checked: {
        domestic: { 
          economy: { weight: '20 kg', dimensions: '203 cm total', fee: 'Free first bag' },
          premium: { weight: '32 kg', dimensions: '203 cm total', fee: 'Free 2 bags' }
        },
        international: {
          economy: { weight: '23 kg', dimensions: '158 cm total', fee: 'Free 2 bags' },
          premium: { weight: '32 kg', dimensions: '158 cm total', fee: 'Free 2 bags' }
        }
      }
    }
  },
  {
    id: 'turkish',
    name: 'Turkish Airlines',
    code: 'TK',
    baggage: {
      carryOn: { 
        domestic: { weight: '8 kg', dimensions: '55x40x23 cm' },
        international: { weight: '8 kg', dimensions: '55x40x23 cm' }
      },
      checked: {
        domestic: { 
          economy: { weight: '20 kg', dimensions: '158 cm total', fee: 'Free first bag' },
          premium: { weight: '30 kg', dimensions: '158 cm total', fee: 'Free 2 bags' }
        },
        international: {
          economy: { weight: '23 kg', dimensions: '158 cm total', fee: 'Free first bag' },
          premium: { weight: '32 kg', dimensions: '158 cm total', fee: 'Free 2 bags' }
        }
      }
    }
  },
  {
    id: 'etihad',
    name: 'Etihad Airways',
    code: 'EY',
    baggage: {
      carryOn: { 
        domestic: { weight: '7 kg', dimensions: '56x36x23 cm' },
        international: { weight: '7 kg', dimensions: '56x36x23 cm' }
      },
      checked: {
        domestic: { 
          economy: { weight: '23 kg', dimensions: '158 cm total', fee: 'Free first bag' },
          premium: { weight: '32 kg', dimensions: '158 cm total', fee: 'Free 2 bags' }
        },
        international: {
          economy: { weight: '23 kg', dimensions: '158 cm total', fee: 'Free first bag' },
          premium: { weight: '32 kg', dimensions: '158 cm total', fee: 'Free 2 bags' }
        }
      }
    }
  },
  {
    id: 'qatar',
    name: 'Qatar Airways',
    code: 'QR',
    baggage: {
      carryOn: { 
        domestic: { weight: '7 kg', dimensions: '56x36x23 cm' },
        international: { weight: '7 kg', dimensions: '56x36x23 cm' }
      },
      checked: {
        domestic: { 
          economy: { weight: '30 kg', dimensions: '158 cm total', fee: 'Free allowance' },
          premium: { weight: '40 kg', dimensions: '158 cm total', fee: 'Free allowance' }
        },
        international: {
          economy: { weight: '30 kg', dimensions: '158 cm total', fee: 'Free allowance' },
          premium: { weight: '40 kg', dimensions: '158 cm total', fee: 'Free allowance' }
        }
      }
    }
  },
  {
    id: 'air-canada',
    name: 'Air Canada',
    code: 'AC',
    baggage: {
      carryOn: { 
        domestic: { weight: '10 kg', dimensions: '56x23x56 cm' },
        international: { weight: '10 kg', dimensions: '56x23x56 cm' }
      },
      checked: {
        domestic: { 
          economy: { weight: '23 kg', dimensions: '158 cm total', fee: '$30 CAD' },
          premium: { weight: '32 kg', dimensions: '158 cm total', fee: 'Free first bag' }
        },
        international: {
          economy: { weight: '23 kg', dimensions: '158 cm total', fee: 'Free first bag' },
          premium: { weight: '32 kg', dimensions: '158 cm total', fee: 'Free 2 bags' }
        }
      }
    }
  },
  {
    id: 'westjet',
    name: 'WestJet',
    code: 'WS',
    baggage: {
      carryOn: { 
        domestic: { weight: '10 kg', dimensions: '56x23x56 cm' },
        international: { weight: '10 kg', dimensions: '56x23x56 cm' }
      },
      checked: {
        domestic: { 
          economy: { weight: '23 kg', dimensions: '158 cm total', fee: '$30 CAD' },
          premium: { weight: '32 kg', dimensions: '158 cm total', fee: 'Free first bag' }
        },
        international: {
          economy: { weight: '23 kg', dimensions: '158 cm total', fee: '$30 CAD' },
          premium: { weight: '32 kg', dimensions: '158 cm total', fee: 'Free first bag' }
        }
      }
    }
  },
  {
    id: 'ryanair',
    name: 'Ryanair',
    code: 'FR',
    baggage: {
      carryOn: { 
        domestic: { weight: '10 kg', dimensions: '55x40x20 cm' },
        international: { weight: '10 kg', dimensions: '55x40x20 cm' }
      },
      checked: {
        domestic: { 
          economy: { weight: '20 kg', dimensions: '158 cm total', fee: '€25-70' },
          premium: { weight: '20 kg', dimensions: '158 cm total', fee: '€25-70' }
        },
        international: {
          economy: { weight: '20 kg', dimensions: '158 cm total', fee: '€25-70' },
          premium: { weight: '20 kg', dimensions: '158 cm total', fee: '€25-70' }
        }
      }
    }
  },
  {
    id: 'easyjet',
    name: 'easyJet',
    code: 'U2',
    baggage: {
      carryOn: { 
        domestic: { weight: 'No limit', dimensions: '56x45x25 cm' },
        international: { weight: 'No limit', dimensions: '56x45x25 cm' }
      },
      checked: {
        domestic: { 
          economy: { weight: '23 kg', dimensions: '275 cm total', fee: '£15-45' },
          premium: { weight: '32 kg', dimensions: '275 cm total', fee: '£15-45' }
        },
        international: {
          economy: { weight: '23 kg', dimensions: '275 cm total', fee: '£15-45' },
          premium: { weight: '32 kg', dimensions: '275 cm total', fee: '£15-45' }
        }
      }
    }
  },
  {
    id: 'spirit',
    name: 'Spirit Airlines',
    code: 'NK',
    baggage: {
      carryOn: { 
        domestic: { weight: '40 lbs', dimensions: '22x18x10 in' },
        international: { weight: '40 lbs', dimensions: '22x18x10 in' }
      },
      checked: {
        domestic: { 
          economy: { weight: '40 lbs', dimensions: '62 in total', fee: '$37-75' },
          premium: { weight: '40 lbs', dimensions: '62 in total', fee: '$37-75' }
        },
        international: {
          economy: { weight: '40 lbs', dimensions: '62 in total', fee: '$37-75' },
          premium: { weight: '40 lbs', dimensions: '62 in total', fee: '$37-75' }
        }
      }
    }
  },
  {
    id: 'frontier',
    name: 'Frontier Airlines',
    code: 'F9',
    baggage: {
      carryOn: { 
        domestic: { weight: '35 lbs', dimensions: '24x16x10 in' },
        international: { weight: '35 lbs', dimensions: '24x16x10 in' }
      },
      checked: {
        domestic: { 
          economy: { weight: '40 lbs', dimensions: '62 in total', fee: '$30-75' },
          premium: { weight: '50 lbs', dimensions: '62 in total', fee: '$30-75' }
        },
        international: {
          economy: { weight: '40 lbs', dimensions: '62 in total', fee: '$30-75' },
          premium: { weight: '50 lbs', dimensions: '62 in total', fee: '$30-75' }
        }
      }
    }
  },
  {
    id: 'alaska-air',
    name: 'Alaska Airlines',
    code: 'AS',
    baggage: {
      carryOn: { 
        domestic: { weight: '40 lbs', dimensions: '22x14x9 in' },
        international: { weight: '40 lbs', dimensions: '22x14x9 in' }
      },
      checked: {
        domestic: { 
          economy: { weight: '50 lbs', dimensions: '62 in total', fee: '$30' },
          premium: { weight: '50 lbs', dimensions: '62 in total', fee: 'Free first bag' }
        },
        international: {
          economy: { weight: '50 lbs', dimensions: '62 in total', fee: 'Free first bag' },
          premium: { weight: '50 lbs', dimensions: '62 in total', fee: 'Free 2 bags' }
        }
      }
    }
  },
  {
    id: 'hawaiian',
    name: 'Hawaiian Airlines',
    code: 'HA',
    baggage: {
      carryOn: { 
        domestic: { weight: '25 lbs', dimensions: '22x14x9 in' },
        international: { weight: '25 lbs', dimensions: '22x14x9 in' }
      },
      checked: {
        domestic: { 
          economy: { weight: '50 lbs', dimensions: '62 in total', fee: '$25-30' },
          premium: { weight: '50 lbs', dimensions: '62 in total', fee: 'Free first bag' }
        },
        international: {
          economy: { weight: '50 lbs', dimensions: '62 in total', fee: 'Free first bag' },
          premium: { weight: '50 lbs', dimensions: '62 in total', fee: 'Free 2 bags' }
        }
      }
    }
  },
  {
    id: 'virgin-atlantic',
    name: 'Virgin Atlantic',
    code: 'VS',
    baggage: {
      carryOn: { 
        domestic: { weight: '10 kg', dimensions: '56x36x23 cm' },
        international: { weight: '10 kg', dimensions: '56x36x23 cm' }
      },
      checked: {
        domestic: { 
          economy: { weight: '23 kg', dimensions: '90x75x43 cm', fee: 'Free first bag' },
          premium: { weight: '32 kg', dimensions: '90x75x43 cm', fee: 'Free 2 bags' }
        },
        international: {
          economy: { weight: '23 kg', dimensions: '90x75x43 cm', fee: 'Free first bag' },
          premium: { weight: '32 kg', dimensions: '90x75x43 cm', fee: 'Free 2 bags' }
        }
      }
    }
  },
  {
    id: 'virgin-australia',
    name: 'Virgin Australia',
    code: 'VA',
    baggage: {
      carryOn: { 
        domestic: { weight: '7 kg', dimensions: '56x36x23 cm' },
        international: { weight: '7 kg', dimensions: '56x36x23 cm' }
      },
      checked: {
        domestic: { 
          economy: { weight: '23 kg', dimensions: '140 cm total', fee: 'Free first bag' },
          premium: { weight: '32 kg', dimensions: '140 cm total', fee: 'Free 2 bags' }
        },
        international: {
          economy: { weight: '23 kg', dimensions: '158 cm total', fee: 'Free first bag' },
          premium: { weight: '32 kg', dimensions: '158 cm total', fee: 'Free 2 bags' }
        }
      }
    }
  },
  {
    id: 'jetstar',
    name: 'Jetstar Airways',
    code: 'JQ',
    baggage: {
      carryOn: { 
        domestic: { weight: '7 kg', dimensions: '56x36x23 cm' },
        international: { weight: '7 kg', dimensions: '56x36x23 cm' }
      },
      checked: {
        domestic: { 
          economy: { weight: '20 kg', dimensions: '158 cm total', fee: '$25-45 AUD' },
          premium: { weight: '30 kg', dimensions: '158 cm total', fee: '$25-45 AUD' }
        },
        international: {
          economy: { weight: '20 kg', dimensions: '158 cm total', fee: '$25-65 AUD' },
          premium: { weight: '30 kg', dimensions: '158 cm total', fee: '$25-65 AUD' }
        }
      }
    }
  },
  {
    id: 'scoot',
    name: 'Scoot',
    code: 'TR',
    baggage: {
      carryOn: { 
        domestic: { weight: '10 kg', dimensions: '54x38x23 cm' },
        international: { weight: '10 kg', dimensions: '54x38x23 cm' }
      },
      checked: {
        domestic: { 
          economy: { weight: '20 kg', dimensions: '158 cm total', fee: '$25-80 SGD' },
          premium: { weight: '30 kg', dimensions: '158 cm total', fee: '$25-80 SGD' }
        },
        international: {
          economy: { weight: '20 kg', dimensions: '158 cm total', fee: '$35-120 SGD' },
          premium: { weight: '30 kg', dimensions: '158 cm total', fee: '$35-120 SGD' }
        }
      }
    }
  },
  {
    id: 'cebu-pacific',
    name: 'Cebu Pacific',
    code: '5J',
    baggage: {
      carryOn: { 
        domestic: { weight: '7 kg', dimensions: '56x36x23 cm' },
        international: { weight: '7 kg', dimensions: '56x36x23 cm' }
      },
      checked: {
        domestic: { 
          economy: { weight: '20 kg', dimensions: '158 cm total', fee: '₱1,200-2,000' },
          premium: { weight: '30 kg', dimensions: '158 cm total', fee: '₱1,200-2,000' }
        },
        international: {
          economy: { weight: '20 kg', dimensions: '158 cm total', fee: '₱2,000-4,000' },
          premium: { weight: '30 kg', dimensions: '158 cm total', fee: '₱2,000-4,000' }
        }
      }
    }
  },
  {
    id: 'airasia',
    name: 'AirAsia',
    code: 'AK',
    baggage: {
      carryOn: { 
        domestic: { weight: '7 kg', dimensions: '56x36x23 cm' },
        international: { weight: '7 kg', dimensions: '56x36x23 cm' }
      },
      checked: {
        domestic: { 
          economy: { weight: '20 kg', dimensions: '158 cm total', fee: 'RM 45-85' },
          premium: { weight: '30 kg', dimensions: '158 cm total', fee: 'RM 45-85' }
        },
        international: {
          economy: { weight: '20 kg', dimensions: '158 cm total', fee: '$30-60 USD' },
          premium: { weight: '30 kg', dimensions: '158 cm total', fee: '$30-60 USD' }
        }
      }
    }
  },
  {
    id: 'indigo',
    name: 'IndiGo',
    code: '6E',
    baggage: {
      carryOn: { 
        domestic: { weight: '7 kg', dimensions: '55x35x25 cm' },
        international: { weight: '7 kg', dimensions: '55x35x25 cm' }
      },
      checked: {
        domestic: { 
          economy: { weight: '15 kg', dimensions: '158 cm total', fee: '₹2,000-4,000' },
          premium: { weight: '25 kg', dimensions: '158 cm total', fee: '₹2,000-4,000' }
        },
        international: {
          economy: { weight: '20 kg', dimensions: '158 cm total', fee: '₹3,500-7,000' },
          premium: { weight: '30 kg', dimensions: '158 cm total', fee: '₹3,500-7,000' }
        }
      }
    }
  },
  {
    id: 'spicejet',
    name: 'SpiceJet',
    code: 'SG',
    baggage: {
      carryOn: { 
        domestic: { weight: '7 kg', dimensions: '55x35x25 cm' },
        international: { weight: '7 kg', dimensions: '55x35x25 cm' }
      },
      checked: {
        domestic: { 
          economy: { weight: '15 kg', dimensions: '158 cm total', fee: '₱1,500-3,500' },
          premium: { weight: '25 kg', dimensions: '158 cm total', fee: '₱1,500-3,500' }
        },
        international: {
          economy: { weight: '20 kg', dimensions: '158 cm total', fee: '₱3,000-6,000' },
          premium: { weight: '30 kg', dimensions: '158 cm total', fee: '₱3,000-6,000' }
        }
      }
    }
  },
  {
    id: 'vistara',
    name: 'Vistara',
    code: 'UK',
    baggage: {
      carryOn: { 
        domestic: { weight: '7 kg', dimensions: '55x35x25 cm' },
        international: { weight: '7 kg', dimensions: '55x35x25 cm' }
      },
      checked: {
        domestic: { 
          economy: { weight: '15 kg', dimensions: '158 cm total', fee: 'Free on most fares' },
          premium: { weight: '25 kg', dimensions: '158 cm total', fee: 'Free' }
        },
        international: {
          economy: { weight: '23 kg', dimensions: '158 cm total', fee: 'Free first bag' },
          premium: { weight: '32 kg', dimensions: '158 cm total', fee: 'Free 2 bags' }
        }
      }
    }
  },
  {
    id: 'air-india',
    name: 'Air India',
    code: 'AI',
    baggage: {
      carryOn: { 
        domestic: { weight: '7 kg', dimensions: '55x35x25 cm' },
        international: { weight: '8 kg', dimensions: '55x35x25 cm' }
      },
      checked: {
        domestic: { 
          economy: { weight: '15 kg', dimensions: '158 cm total', fee: 'Free on most fares' },
          premium: { weight: '25 kg', dimensions: '158 cm total', fee: 'Free' }
        },
        international: {
          economy: { weight: '23 kg', dimensions: '158 cm total', fee: 'Free first bag' },
          premium: { weight: '32 kg', dimensions: '158 cm total', fee: 'Free 2 bags' }
        }
      }
    }
  },
  {
    id: 'thai',
    name: 'Thai Airways',
    code: 'TG',
    baggage: {
      carryOn: { 
        domestic: { weight: '7 kg', dimensions: '56x36x23 cm' },
        international: { weight: '7 kg', dimensions: '56x36x23 cm' }
      },
      checked: {
        domestic: { 
          economy: { weight: '20 kg', dimensions: '158 cm total', fee: 'Free first bag' },
          premium: { weight: '30 kg', dimensions: '158 cm total', fee: 'Free 2 bags' }
        },
        international: {
          economy: { weight: '23 kg', dimensions: '158 cm total', fee: 'Free first bag' },
          premium: { weight: '32 kg', dimensions: '158 cm total', fee: 'Free 2 bags' }
        }
      }
    }
  },
  {
    id: 'malaysian',
    name: 'Malaysia Airlines',
    code: 'MH',
    baggage: {
      carryOn: { 
        domestic: { weight: '7 kg', dimensions: '56x36x23 cm' },
        international: { weight: '7 kg', dimensions: '56x36x23 cm' }
      },
      checked: {
        domestic: { 
          economy: { weight: '20 kg', dimensions: '158 cm total', fee: 'Free first bag' },
          premium: { weight: '30 kg', dimensions: '158 cm total', fee: 'Free 2 bags' }
        },
        international: {
          economy: { weight: '30 kg', dimensions: '158 cm total', fee: 'Free first bag' },
          premium: { weight: '40 kg', dimensions: '158 cm total', fee: 'Free 2 bags' }
        }
      }
    }
  },
  {
    id: 'garuda',
    name: 'Garuda Indonesia',
    code: 'GA',
    baggage: {
      carryOn: { 
        domestic: { weight: '7 kg', dimensions: '56x36x23 cm' },
        international: { weight: '7 kg', dimensions: '56x36x23 cm' }
      },
      checked: {
        domestic: { 
          economy: { weight: '20 kg', dimensions: '158 cm total', fee: 'Free first bag' },
          premium: { weight: '30 kg', dimensions: '158 cm total', fee: 'Free 2 bags' }
        },
        international: {
          economy: { weight: '23 kg', dimensions: '158 cm total', fee: 'Free first bag' },
          premium: { weight: '32 kg', dimensions: '158 cm total', fee: 'Free 2 bags' }
        }
      }
    }
  },
  {
    id: 'philippine',
    name: 'Philippine Airlines',
    code: 'PR',
    baggage: {
      carryOn: { 
        domestic: { weight: '7 kg', dimensions: '56x36x23 cm' },
        international: { weight: '7 kg', dimensions: '56x36x23 cm' }
      },
      checked: {
        domestic: { 
          economy: { weight: '10 kg', dimensions: '158 cm total', fee: '₱1,500-2,500' },
          premium: { weight: '20 kg', dimensions: '158 cm total', fee: 'Free first bag' }
        },
        international: {
          economy: { weight: '23 kg', dimensions: '158 cm total', fee: 'Free first bag' },
          premium: { weight: '32 kg', dimensions: '158 cm total', fee: 'Free 2 bags' }
        }
      }
    }
  },
  {
    id: 'vietnam',
    name: 'Vietnam Airlines',
    code: 'VN',
    baggage: {
      carryOn: { 
        domestic: { weight: '7 kg', dimensions: '56x36x23 cm' },
        international: { weight: '7 kg', dimensions: '56x36x23 cm' }
      },
      checked: {
        domestic: { 
          economy: { weight: '20 kg', dimensions: '158 cm total', fee: 'Free first bag' },
          premium: { weight: '30 kg', dimensions: '158 cm total', fee: 'Free 2 bags' }
        },
        international: {
          economy: { weight: '23 kg', dimensions: '158 cm total', fee: 'Free first bag' },
          premium: { weight: '32 kg', dimensions: '158 cm total', fee: 'Free 2 bags' }
        }
      }
    }
  },
  {
    id: 'korean-air',
    name: 'Korean Air',
    code: 'KE',
    baggage: {
      carryOn: { 
        domestic: { weight: '10 kg', dimensions: '55x40x20 cm' },
        international: { weight: '12 kg', dimensions: '55x40x20 cm' }
      },
      checked: {
        domestic: { 
          economy: { weight: '20 kg', dimensions: '203 cm total', fee: 'Free first bag' },
          premium: { weight: '30 kg', dimensions: '203 cm total', fee: 'Free 2 bags' }
        },
        international: {
          economy: { weight: '23 kg', dimensions: '158 cm total', fee: 'Free 2 bags' },
          premium: { weight: '32 kg', dimensions: '158 cm total', fee: 'Free 2 bags' }
        }
      }
    }
  },
  {
    id: 'asiana',
    name: 'Asiana Airlines',
    code: 'OZ',
    baggage: {
      carryOn: { 
        domestic: { weight: '10 kg', dimensions: '55x40x20 cm' },
        international: { weight: '10 kg', dimensions: '55x40x20 cm' }
      },
      checked: {
        domestic: { 
          economy: { weight: '20 kg', dimensions: '203 cm total', fee: 'Free first bag' },
          premium: { weight: '30 kg', dimensions: '203 cm total', fee: 'Free 2 bags' }
        },
        international: {
          economy: { weight: '23 kg', dimensions: '158 cm total', fee: 'Free first bag' },
          premium: { weight: '32 kg', dimensions: '158 cm total', fee: 'Free 2 bags' }
        }
      }
    }
  },
  {
    id: 'china-southern',
    name: 'China Southern Airlines',
    code: 'CZ',
    baggage: {
      carryOn: { 
        domestic: { weight: '5 kg', dimensions: '55x40x20 cm' },
        international: { weight: '7 kg', dimensions: '55x40x20 cm' }
      },
      checked: {
        domestic: { 
          economy: { weight: '20 kg', dimensions: '203 cm total', fee: 'Free first bag' },
          premium: { weight: '30 kg', dimensions: '203 cm total', fee: 'Free 2 bags' }
        },
        international: {
          economy: { weight: '23 kg', dimensions: '158 cm total', fee: 'Free first bag' },
          premium: { weight: '32 kg', dimensions: '158 cm total', fee: 'Free 2 bags' }
        }
      }
    }
  },
  {
    id: 'china-eastern',
    name: 'China Eastern Airlines',
    code: 'MU',
    baggage: {
      carryOn: { 
        domestic: { weight: '5 kg', dimensions: '55x40x20 cm' },
        international: { weight: '7 kg', dimensions: '55x40x20 cm' }
      },
      checked: {
        domestic: { 
          economy: { weight: '20 kg', dimensions: '203 cm total', fee: 'Free first bag' },
          premium: { weight: '30 kg', dimensions: '203 cm total', fee: 'Free 2 bags' }
        },
        international: {
          economy: { weight: '23 kg', dimensions: '158 cm total', fee: 'Free first bag' },
          premium: { weight: '32 kg', dimensions: '158 cm total', fee: 'Free 2 bags' }
        }
      }
    }
  },
  {
    id: 'air-china',
    name: 'Air China',
    code: 'CA',
    baggage: {
      carryOn: { 
        domestic: { weight: '5 kg', dimensions: '55x40x20 cm' },
        international: { weight: '7 kg', dimensions: '55x40x20 cm' }
      },
      checked: {
        domestic: { 
          economy: { weight: '20 kg', dimensions: '203 cm total', fee: 'Free first bag' },
          premium: { weight: '30 kg', dimensions: '203 cm total', fee: 'Free 2 bags' }
        },
        international: {
          economy: { weight: '23 kg', dimensions: '158 cm total', fee: 'Free first bag' },
          premium: { weight: '32 kg', dimensions: '158 cm total', fee: 'Free 2 bags' }
        }
      }
    }
  },
  {
    id: 'hainan',
    name: 'Hainan Airlines',
    code: 'HU',
    baggage: {
      carryOn: { 
        domestic: { weight: '5 kg', dimensions: '55x40x20 cm' },
        international: { weight: '7 kg', dimensions: '55x40x20 cm' }
      },
      checked: {
        domestic: { 
          economy: { weight: '20 kg', dimensions: '203 cm total', fee: 'Free first bag' },
          premium: { weight: '30 kg', dimensions: '203 cm total', fee: 'Free 2 bags' }
        },
        international: {
          economy: { weight: '23 kg', dimensions: '158 cm total', fee: 'Free first bag' },
          premium: { weight: '32 kg', dimensions: '158 cm total', fee: 'Free 2 bags' }
        }
      }
    }
  }
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
  const [activeTab, setActiveTab] = useState<'lists' | 'airlines'>('lists');

  const filterOptions = [
    { id: 'beach', label: 'Beach', icon: '🏖️' },
    { id: 'city', label: 'City', icon: '🏙️' },
    { id: 'mountain', label: 'Mountain', icon: '🏔️' },
    { id: 'adventure', label: 'Adventure', icon: '🎒' },
    { id: 'business', label: 'Business', icon: '💼' },
    { id: 'family', label: 'Family', icon: '👨‍👩‍👧‍👦' },
    { id: 'cruise', label: 'Cruise', icon: '🚢' },
    { id: 'festival', label: 'Festival', icon: '🎵' },
    { id: 'wellness', label: 'Wellness', icon: '🧘' },
    { id: 'culinary', label: 'Food', icon: '🍽️' },
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

  const filteredAirlines = airlines.filter(airline => 
    airline.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    airline.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 md:p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-900 rounded-2xl md:rounded-3xl w-full max-w-4xl h-[95vh] md:max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-3 md:p-6 border-b border-gray-200 dark:border-gray-700 shrink-0">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full p-1.5 md:p-2">
              <Sparkles className="h-4 w-4 md:h-5 md:w-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">Smart Travel Assistant</h2>
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Packing lists and airline rules</p>
            </div>
          </div>
          <Button variant="ghost" onClick={onClose} className="rounded-full h-8 w-8 md:h-10 md:w-10 p-0">
            <X className="h-3 w-3 md:h-4 md:w-4" />
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 shrink-0">
          <button
            onClick={() => setActiveTab('lists')}
            className={`flex-1 px-3 py-2 md:px-6 md:py-3 text-xs md:text-sm font-medium transition-colors ${
              activeTab === 'lists'
                ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'
            }`}
          >
            Smart Lists ({premadeLists.length})
          </button>
          <button
            onClick={() => setActiveTab('airlines')}
            className={`flex-1 px-3 py-2 md:px-6 md:py-3 text-xs md:text-sm font-medium transition-colors ${
              activeTab === 'airlines'
                ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'
            }`}
          >
            Baggage Rules ({airlines.length})
          </button>
        </div>

        {/* Search and Filters */}
        <div className="p-3 md:p-6 border-b border-gray-200 dark:border-gray-700 shrink-0">
          <div className="relative mb-3 md:mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-3 w-3 md:h-4 md:w-4" />
            <Input
              placeholder={activeTab === 'lists' ? "Search destinations and trips..." : "Search airlines..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 md:pl-10 text-sm md:text-base h-8 md:h-10"
            />
          </div>

          {activeTab === 'lists' && (
            <>
              {/* Filter Pills */}
              <div className="flex flex-wrap gap-1 md:gap-2 mb-3 md:mb-4">
                {filterOptions.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => toggleFilter(filter.id)}
                    className={`px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-medium transition-colors ${
                      selectedFilters.has(filter.id)
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    {filter.icon} {filter.label}
                  </button>
                ))}
              </div>

              {/* Trip Settings */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Trip Length
                  </label>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <Input
                      type="number"
                      min="1"
                      max="30"
                      value={tripLength}
                      onChange={(e) => setTripLength(parseInt(e.target.value) || 7)}
                      className="w-20"
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400">days</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Packing Style
                  </label>
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-gray-400" />
                    <select
                      value={packingStyle}
                      onChange={(e) => setPackingStyle(e.target.value as 'light' | 'balanced' | 'thorough')}
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    >
                      <option value="light">Light Packer</option>
                      <option value="balanced">Balanced</option>
                      <option value="thorough">Everything Needed</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-end">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedFilters(new Set());
                      setSearchTerm('');
                    }}
                    className="w-full"
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="p-3 md:p-6">
              {activeTab === 'lists' ? (
                <div className="grid gap-3 md:gap-4">
                  {filteredLists.map((list) => (
                    <motion.div
                      key={list.id}
                      whileHover={{ scale: 1.01 }}
                      className="bg-white dark:bg-gray-800 rounded-lg md:rounded-xl border border-gray-200 dark:border-gray-700 p-3 md:p-4 shadow-sm hover:shadow-md transition-all"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 md:gap-3 mb-2">
                            <span className="text-lg md:text-2xl">{list.icon}</span>
                            <div>
                              <h3 className="font-semibold text-sm md:text-base text-gray-900 dark:text-white">{list.name}</h3>
                              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{list.description}</p>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-1 md:gap-2 mb-2 md:mb-3">
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
                        <div className="flex gap-1 md:gap-2 ml-2 md:ml-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handlePreviewList(list)}
                            className="text-xs md:text-sm px-2 py-1 h-7 md:h-8"
                          >
                            Preview
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleAddToTrip(list)}
                            className="bg-blue-500 hover:bg-blue-600 text-white text-xs md:text-sm px-2 py-1 h-7 md:h-8"
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
              ) : (
                <div className="grid gap-3 md:gap-4">
                  {filteredAirlines.map((airline) => (
                    <motion.div
                      key={airline.id}
                      whileHover={{ scale: 1.01 }}
                      className="bg-white dark:bg-gray-800 rounded-lg md:rounded-xl border border-gray-200 dark:border-gray-700 p-3 md:p-4 shadow-sm hover:shadow-md transition-all"
                    >
                      <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                        <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-1.5 md:p-2">
                          <Plane className="h-4 w-4 md:h-5 md:w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-sm md:text-base text-gray-900 dark:text-white">{airline.name}</h3>
                          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Code: {airline.code}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                        <div>
                          <h4 className="font-medium text-xs md:text-sm text-gray-900 dark:text-white mb-2">Carry-On Baggage</h4>
                          <div className="space-y-1 md:space-y-2 text-xs md:text-sm">
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
                          <h4 className="font-medium text-xs md:text-sm text-gray-900 dark:text-white mb-2">Checked Baggage</h4>
                          <div className="space-y-1 md:space-y-2 text-xs md:text-sm">
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
                    <div className="text-center py-8 md:py-12">
                      <div className="text-4xl md:text-6xl mb-3 md:mb-4">✈️</div>
                      <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        No airlines found
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Try a different search term
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Preview Modal */}
        {previewMode && selectedList && (
          <div className="absolute inset-0 bg-white dark:bg-gray-900 z-10 flex flex-col">
            <div className="flex items-center justify-between p-3 md:p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 md:gap-3">
                <span className="text-lg md:text-2xl">{selectedList.icon}</span>
                <div className="flex-1">
                  <h3 className="text-base md:text-xl font-bold text-gray-900 dark:text-white">{selectedList.name}</h3>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{selectedList.description}</p>
                </div>
              </div>
              <div className="flex gap-1 md:gap-2">
                <Button
                  onClick={() => handleAddToTrip(selectedList)}
                  className="bg-blue-500 hover:bg-blue-600 text-white text-xs md:text-sm px-2 py-1 h-7 md:h-9"
                >
                  Add to Trip
                </Button>
                <Button variant="ghost" onClick={() => setPreviewMode(false)} className="h-7 w-7 md:h-9 md:w-9 p-0">
                  <X className="h-3 w-3 md:h-4 md:w-4" />
                </Button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="p-3 md:p-6">
                <div className="grid gap-2 md:gap-4">
                  {getFilteredItems(selectedList).map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 md:p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <div className="flex-1">
                        <span className="font-medium text-sm md:text-base text-gray-900 dark:text-white">{item.name}</span>
                        <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
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