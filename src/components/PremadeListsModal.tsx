
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Calendar, Plus, Search, Filter, Eye, Info } from 'lucide-react';
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
      { name: 'Insect Repellent', category: 'toiletries', quantity: 1, luggage: 'carry-on' },
      
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
      { name: 'Reusable Water Bottle', category: 'miscellaneous', quantity: 1, luggage: 'carry-on' },
    ]
  },
  
  {
    id: 'paris-city-spring',
    name: 'Paris City Break (Spring)',
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
      
      // Toiletries
      { name: 'Toothbrush & Toothpaste', category: 'toiletries', quantity: 1, luggage: 'carry-on' },
      { name: 'Shampoo & Conditioner', category: 'toiletries', quantity: 1, luggage: 'checked' },
      { name: 'Face Moisturizer', category: 'toiletries', quantity: 1, luggage: 'carry-on' },
      { name: 'Deodorant', category: 'toiletries', quantity: 1, luggage: 'carry-on' },
      
      // Documents
      { name: 'Passport', category: 'documents', quantity: 1, luggage: 'personal' },
      { name: 'Metro Map', category: 'documents', quantity: 1, luggage: 'personal' },
      { name: 'Museum Passes', category: 'documents', quantity: 1, luggage: 'personal' },
      
      // Miscellaneous
      { name: 'Compact Umbrella', category: 'miscellaneous', quantity: 1, luggage: 'carry-on' },
      { name: 'Crossbody Bag', category: 'miscellaneous', quantity: 1, luggage: 'carry-on' },
      { name: 'Travel Guide', category: 'miscellaneous', quantity: 1, luggage: 'carry-on' },
      { name: 'French Phrasebook', category: 'miscellaneous', quantity: 1, luggage: 'personal' },
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
      { name: 'Underwear', category: 'clothes', quantity: 4, luggage: 'carry-on' },
      { name: 'Dress Socks', category: 'clothes', quantity: 4, luggage: 'carry-on' },
      
      // Electronics
      { name: 'Laptop', category: 'electronics', quantity: 1, luggage: 'personal' },
      { name: 'Laptop Charger', category: 'electronics', quantity: 1, luggage: 'personal' },
      { name: 'Phone Charger', category: 'electronics', quantity: 1, luggage: 'personal' },
      { name: 'Travel Adapter', category: 'electronics', quantity: 1, luggage: 'carry-on' },
      { name: 'Portable Charger', category: 'electronics', quantity: 1, luggage: 'personal' },
      
      // Documents
      { name: 'Business Cards', category: 'documents', quantity: 50, luggage: 'personal' },
      { name: 'Presentation Materials', category: 'documents', quantity: 1, luggage: 'personal' },
      { name: 'ID Badge', category: 'documents', quantity: 1, luggage: 'personal' },
      { name: 'Travel Itinerary', category: 'documents', quantity: 1, luggage: 'personal' },
      
      // Toiletries
      { name: 'Toothbrush & Toothpaste', category: 'toiletries', quantity: 1, luggage: 'carry-on' },
      { name: 'Deodorant', category: 'toiletries', quantity: 1, luggage: 'carry-on' },
      { name: 'Hair Styling Products', category: 'toiletries', quantity: 1, luggage: 'carry-on' },
      
      // Miscellaneous
      { name: 'Portfolio/Briefcase', category: 'miscellaneous', quantity: 1, luggage: 'personal' },
      { name: 'Professional Pen', category: 'miscellaneous', quantity: 2, luggage: 'personal' },
      { name: 'Notebook', category: 'miscellaneous', quantity: 1, luggage: 'personal' },
    ]
  },

  {
    id: 'camping-trip',
    name: 'Camping Adventure',
    destination: 'National Parks',
    destination_type: 'camping',
    season: 'summer',
    description: 'Complete wilderness camping essentials',
    duration_days: 4,
    items: [
      // Miscellaneous (Camping Gear)
      { name: 'Tent', category: 'miscellaneous', quantity: 1, luggage: 'checked' },
      { name: 'Sleeping Bag', category: 'miscellaneous', quantity: 1, luggage: 'checked' },
      { name: 'Sleeping Pad', category: 'miscellaneous', quantity: 1, luggage: 'checked' },
      { name: 'Camping Stove', category: 'miscellaneous', quantity: 1, luggage: 'checked' },
      { name: 'Cookware Set', category: 'miscellaneous', quantity: 1, luggage: 'checked' },
      { name: 'Water Filter', category: 'miscellaneous', quantity: 1, luggage: 'carry-on' },
      { name: 'Multi-tool', category: 'miscellaneous', quantity: 1, luggage: 'checked' },
      { name: 'Rope/Paracord', category: 'miscellaneous', quantity: 1, luggage: 'checked' },
      { name: 'Trash Bags', category: 'miscellaneous', quantity: 5, luggage: 'checked' },
      { name: 'Matches/Lighter', category: 'miscellaneous', quantity: 2, luggage: 'checked' },
      
      // Electronics
      { name: 'Headlamp', category: 'electronics', quantity: 1, luggage: 'carry-on' },
      { name: 'Lantern', category: 'electronics', quantity: 1, luggage: 'checked' },
      { name: 'Portable Charger', category: 'electronics', quantity: 1, luggage: 'carry-on' },
      { name: 'Emergency Radio', category: 'electronics', quantity: 1, luggage: 'checked' },
      
      // Clothes
      { name: 'Hiking Boots', category: 'clothes', quantity: 1, luggage: 'carry-on' },
      { name: 'Hiking Socks', category: 'clothes', quantity: 6, luggage: 'carry-on' },
      { name: 'Quick-dry Shirts', category: 'clothes', quantity: 4, luggage: 'carry-on' },
      { name: 'Hiking Pants', category: 'clothes', quantity: 2, luggage: 'carry-on' },
      { name: 'Rain Gear', category: 'clothes', quantity: 1, luggage: 'carry-on' },
      { name: 'Warm Layers', category: 'clothes', quantity: 2, luggage: 'carry-on' },
      { name: 'Hat', category: 'clothes', quantity: 1, luggage: 'carry-on' },
      
      // Toiletries
      { name: 'Biodegradable Soap', category: 'toiletries', quantity: 1, luggage: 'carry-on' },
      { name: 'First Aid Kit', category: 'toiletries', quantity: 1, luggage: 'carry-on' },
      { name: 'Insect Repellent', category: 'toiletries', quantity: 1, luggage: 'carry-on' },
      { name: 'Sunscreen', category: 'toiletries', quantity: 1, luggage: 'carry-on' },
      { name: 'Toilet Paper', category: 'toiletries', quantity: 1, luggage: 'checked' },
      
      // Documents
      { name: 'Park Pass', category: 'documents', quantity: 1, luggage: 'personal' },
      { name: 'Trail Maps', category: 'documents', quantity: 1, luggage: 'personal' },
      { name: 'Emergency Contacts', category: 'documents', quantity: 1, luggage: 'personal' },
    ]
  },

  {
    id: 'music-festival',
    name: 'Music Festival Weekend',
    destination: 'Festival Grounds',
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
      { name: 'Bandana', category: 'clothes', quantity: 2, luggage: 'backpack' },
      { name: 'Hat', category: 'clothes', quantity: 1, luggage: 'backpack' },
      
      // Toiletries
      { name: 'Wet Wipes', category: 'toiletries', quantity: 10, luggage: 'backpack' },
      { name: 'Dry Shampoo', category: 'toiletries', quantity: 1, luggage: 'backpack' },
      { name: 'Sunscreen', category: 'toiletries', quantity: 1, luggage: 'backpack' },
      { name: 'Hand Sanitizer', category: 'toiletries', quantity: 1, luggage: 'backpack' },
      { name: 'Deodorant', category: 'toiletries', quantity: 1, luggage: 'backpack' },
      { name: 'Toothbrush & Toothpaste', category: 'toiletries', quantity: 1, luggage: 'backpack' },
      
      // Electronics
      { name: 'Portable Charger', category: 'electronics', quantity: 2, luggage: 'backpack' },
      { name: 'Waterproof Phone Case', category: 'electronics', quantity: 1, luggage: 'backpack' },
      { name: 'Phone Charger', category: 'electronics', quantity: 1, luggage: 'backpack' },
      
      // Documents
      { name: 'Festival Tickets', category: 'documents', quantity: 1, luggage: 'personal' },
      { name: 'ID', category: 'documents', quantity: 1, luggage: 'personal' },
      
      // Miscellaneous
      { name: 'Cash in Small Bills', category: 'miscellaneous', quantity: 1, luggage: 'personal' },
      { name: 'Earplugs', category: 'miscellaneous', quantity: 2, luggage: 'personal' },
      { name: 'Reusable Water Bottle', category: 'miscellaneous', quantity: 1, luggage: 'backpack' },
      { name: 'Snacks', category: 'miscellaneous', quantity: 5, luggage: 'backpack' },
      { name: 'Blanket', category: 'miscellaneous', quantity: 1, luggage: 'backpack' },
    ]
  },

  {
    id: 'disney-world',
    name: 'Disney World / Theme Park',
    destination: 'Orlando, FL',
    destination_type: 'theme-park',
    season: 'all',
    description: 'Magic Kingdom and theme park essentials',
    duration_days: 4,
    items: [
      // Clothes
      { name: 'Comfortable Walking Shoes', category: 'clothes', quantity: 2, luggage: 'carry-on' },
      { name: 'Casual Outfits', category: 'clothes', quantity: 5, luggage: 'carry-on' },
      { name: 'Light Sweater', category: 'clothes', quantity: 1, luggage: 'carry-on' },
      { name: 'Underwear', category: 'clothes', quantity: 5, luggage: 'carry-on' },
      { name: 'Socks', category: 'clothes', quantity: 5, luggage: 'carry-on' },
      { name: 'Pajamas', category: 'clothes', quantity: 2, luggage: 'carry-on' },
      
      // Toiletries
      { name: 'Sunscreen', category: 'toiletries', quantity: 2, luggage: 'carry-on' },
      { name: 'Band-aids/Blister Pads', category: 'toiletries', quantity: 1, luggage: 'personal' },
      { name: 'Pain Reliever', category: 'toiletries', quantity: 1, luggage: 'personal' },
      { name: 'Hand Sanitizer', category: 'toiletries', quantity: 1, luggage: 'personal' },
      
      // Electronics
      { name: 'Portable Charger', category: 'electronics', quantity: 1, luggage: 'personal' },
      { name: 'Phone Charger', category: 'electronics', quantity: 1, luggage: 'carry-on' },
      { name: 'Camera', category: 'electronics', quantity: 1, luggage: 'personal' },
      
      // Documents
      { name: 'Park Tickets', category: 'documents', quantity: 1, luggage: 'personal' },
      { name: 'Hotel Confirmation', category: 'documents', quantity: 1, luggage: 'personal' },
      { name: 'ID', category: 'documents', quantity: 1, luggage: 'personal' },
      
      // Miscellaneous
      { name: 'Rain Poncho', category: 'miscellaneous', quantity: 1, luggage: 'personal' },
      { name: 'Fanny Pack/Small Bag', category: 'miscellaneous', quantity: 1, luggage: 'personal' },
      { name: 'Snacks', category: 'miscellaneous', quantity: 5, luggage: 'personal' },
      { name: 'Reusable Water Bottle', category: 'miscellaneous', quantity: 1, luggage: 'personal' },
      { name: 'Autograph Book', category: 'miscellaneous', quantity: 1, luggage: 'personal' },
      { name: 'Sunglasses', category: 'miscellaneous', quantity: 1, luggage: 'personal' },
    ]
  },

  {
    id: 'cruise-vacation',
    name: 'Cruise Vacation',
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
      { name: 'Evening Wear', category: 'clothes', quantity: 3, luggage: 'checked' },
      
      // Toiletries
      { name: 'Motion Sickness Medicine', category: 'toiletries', quantity: 1, luggage: 'personal' },
      { name: 'Sunscreen', category: 'toiletries', quantity: 2, luggage: 'carry-on' },
      { name: 'After-sun Care', category: 'toiletries', quantity: 1, luggage: 'carry-on' },
      { name: 'Shampoo & Conditioner', category: 'toiletries', quantity: 1, luggage: 'checked' },
      
      // Documents
      { name: 'Cruise Documents', category: 'documents', quantity: 1, luggage: 'personal' },
      { name: 'Passport', category: 'documents', quantity: 1, luggage: 'personal' },
      { name: 'Shore Excursion Tickets', category: 'documents', quantity: 1, luggage: 'personal' },
      
      // Electronics
      { name: 'Phone Charger', category: 'electronics', quantity: 1, luggage: 'carry-on' },
      { name: 'Camera', category: 'electronics', quantity: 1, luggage: 'carry-on' },
      { name: 'Portable Charger', category: 'electronics', quantity: 1, luggage: 'personal' },
      
      // Miscellaneous
      { name: 'Waterproof Phone Case', category: 'miscellaneous', quantity: 1, luggage: 'personal' },
      { name: 'Beach Bag', category: 'miscellaneous', quantity: 1, luggage: 'checked' },
      { name: 'Formal Accessories', category: 'miscellaneous', quantity: 3, luggage: 'carry-on' },
      { name: 'Books/E-reader', category: 'miscellaneous', quantity: 2, luggage: 'carry-on' },
    ]
  },

  {
    id: 'ski-trip',
    name: 'Ski Trip Adventure',
    destination: 'Alps/Mountains',
    destination_type: 'ski',
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
      { name: 'Après-ski Boots', category: 'clothes', quantity: 1, luggage: 'checked' },
      { name: 'Casual Winter Clothes', category: 'clothes', quantity: 5, luggage: 'carry-on' },
      { name: 'Warm Hat', category: 'clothes', quantity: 2, luggage: 'carry-on' },
      
      // Toiletries
      { name: 'Lip Balm with SPF', category: 'toiletries', quantity: 2, luggage: 'personal' },
      { name: 'Moisturizer', category: 'toiletries', quantity: 1, luggage: 'carry-on' },
      { name: 'Pain Relievers', category: 'toiletries', quantity: 1, luggage: 'personal' },
      { name: 'Sunscreen (High SPF)', category: 'toiletries', quantity: 1, luggage: 'carry-on' },
      
      // Miscellaneous
      { name: 'Ski Helmet', category: 'miscellaneous', quantity: 1, luggage: 'checked' },
      { name: 'Ski Goggles', category: 'miscellaneous', quantity: 1, luggage: 'carry-on' },
      { name: 'Hand/Foot Warmers', category: 'miscellaneous', quantity: 20, luggage: 'carry-on' },
      { name: 'Ski Pass Holder', category: 'miscellaneous', quantity: 1, luggage: 'personal' },
      { name: 'Waterproof Glove Liners', category: 'miscellaneous', quantity: 1, luggage: 'carry-on' },
      
      // Documents
      { name: 'Lift Tickets', category: 'documents', quantity: 1, luggage: 'personal' },  
      { name: 'Travel Insurance', category: 'documents', quantity: 1, luggage: 'personal' },
    ]
  },

  {
    id: 'weekend-getaway',
    name: 'Weekend Getaway',
    destination: 'Various',
    destination_type: 'weekend',
    season: 'all',
    description: 'Quick 2-3 day trip essentials',
    duration_days: 2,
    items: [
      // Clothes
      { name: 'Comfortable Outfits', category: 'clothes', quantity: 3, luggage: 'carry-on' },
      { name: 'Underwear', category: 'clothes', quantity: 3, luggage: 'carry-on' },
      { name: 'Socks', category: 'clothes', quantity: 3, luggage: 'carry-on' },
      { name: 'Comfortable Shoes', category: 'clothes', quantity: 1, luggage: 'carry-on' },
      { name: 'Pajamas', category: 'clothes', quantity: 1, luggage: 'carry-on' },
      
      // Toiletries
      { name: 'Travel-size Toiletries', category: 'toiletries', quantity: 1, luggage: 'carry-on' },
      { name: 'Toothbrush & Toothpaste', category: 'toiletries', quantity: 1, luggage: 'carry-on' },
      
      // Electronics
      { name: 'Phone Charger', category: 'electronics', quantity: 1, luggage: 'carry-on' },
      { name: 'Portable Charger', category: 'electronics', quantity: 1, luggage: 'personal' },
      
      // Documents
      { name: 'ID', category: 'documents', quantity: 1, luggage: 'personal' },
      { name: 'Hotel Confirmation', category: 'documents', quantity: 1, luggage: 'personal' },
      
      // Miscellaneous
      { name: 'Sunglasses', category: 'miscellaneous', quantity: 1, luggage: 'personal' },
      { name: 'Small Day Bag', category: 'miscellaneous', quantity: 1, luggage: 'carry-on' },
    ]
  },

  {
    id: 'international-flight',
    name: 'International Flight Essentials',
    destination: 'Various',
    destination_type: 'flight',
    season: 'all',
    description: 'Long-haul flight comfort items',
    duration_days: 1,
    items: [
      // Documents
      { name: 'Passport', category: 'documents', quantity: 1, luggage: 'personal' },
      { name: 'Visa (if required)', category: 'documents', quantity: 1, luggage: 'personal' },
      { name: 'Flight Tickets', category: 'documents', quantity: 1, luggage: 'personal' },
      { name: 'Travel Insurance', category: 'documents', quantity: 1, luggage: 'personal' },
      
      // Electronics
      { name: 'Phone Charger', category: 'electronics', quantity: 1, luggage: 'personal' },
      { name: 'Portable Charger', category: 'electronics', quantity: 1, luggage: 'personal' },
      { name: 'Headphones', category: 'electronics', quantity: 1, luggage: 'personal' },
      { name: 'Travel Adapter', category: 'electronics', quantity: 1, luggage: 'personal' },
      
      // Miscellaneous
      { name: 'Travel Pillow', category: 'miscellaneous', quantity: 1, luggage: 'personal' },
      { name: 'Eye Mask', category: 'miscellaneous', quantity: 1, luggage: 'personal' },
      { name: 'Blanket/Pashmina', category: 'miscellaneous', quantity: 1, luggage: 'personal' },
      { name: 'Snacks', category: 'miscellaneous', quantity: 3, luggage: 'personal' },
      { name: 'Entertainment (Books/Tablet)', category: 'miscellaneous', quantity: 1, luggage: 'personal' },
      
      // Toiletries
      { name: 'Travel-size Toothbrush', category: 'toiletries', quantity: 1, luggage: 'personal' },
      { name: 'Face Wipes', category: 'toiletries', quantity: 1, luggage: 'personal' },
      { name: 'Lip Balm', category: 'toiletries', quantity: 1, luggage: 'personal' },
      { name: 'Hand Sanitizer', category: 'toiletries', quantity: 1, luggage: 'personal' },
    ]
  },

  {
    id: 'road-trip-kids',
    name: 'Road Trip with Kids',
    destination: 'Various',
    destination_type: 'road-trip',
    season: 'all',
    description: 'Family road trip survival kit',
    duration_days: 5,
    items: [
      // Miscellaneous (Kid Entertainment)
      { name: 'Tablets/iPads', category: 'miscellaneous', quantity: 2, luggage: 'carry-on' },
      { name: 'Car Games', category: 'miscellaneous', quantity: 5, luggage: 'carry-on' },
      { name: 'Coloring Books & Crayons', category: 'miscellaneous', quantity: 3, luggage: 'carry-on' },
      { name: 'Snacks (variety pack)', category: 'miscellaneous', quantity: 10, luggage: 'carry-on' },
      { name: 'Water Bottles', category: 'miscellaneous', quantity: 4, luggage: 'carry-on' },
      { name: 'Travel Pillows', category: 'miscellaneous', quantity: 3, luggage: 'carry-on' },
      { name: 'Blankets', category: 'miscellaneous', quantity: 2, luggage: 'carry-on' },
      
      // Toiletries (Family)
      { name: 'First Aid Kit', category: 'toiletries', quantity: 1, luggage: 'carry-on' },
      { name: 'Motion Sickness Medicine', category: 'toiletries', quantity: 1, luggage: 'personal' },
      { name: 'Wet Wipes', category: 'toiletries', quantity: 5, luggage: 'carry-on' },
      { name: 'Hand Sanitizer', category: 'toiletries', quantity: 2, luggage: 'personal' },
      { name: 'Sunscreen', category: 'toiletries', quantity: 1, luggage: 'carry-on' },
      
      // Electronics
      { name: 'Car Chargers', category: 'electronics', quantity: 3, luggage: 'carry-on' },
      { name: 'Portable Chargers', category: 'electronics', quantity: 2, luggage: 'carry-on' },
      { name: 'Headphones (kids)', category: 'electronics', quantity: 2, luggage: 'carry-on' },
      
      // Documents
      { name: 'Hotel Reservations', category: 'documents', quantity: 1, luggage: 'personal' },
      { name: 'Emergency Contacts', category: 'documents', quantity: 1, luggage: 'personal' },
      { name: 'Kids\' ID Cards', category: 'documents', quantity: 2, luggage: 'personal' },
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
  const [previewList, setPreviewList] = useState<PremadeList | null>(null);
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

  const categories = ['all', 'city', 'beach', 'mountains', 'camping', 'cruise', 'festival', 'business', 'theme-park', 'ski', 'weekend', 'flight', 'road-trip'];
  
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

  const handlePreviewList = (list: PremadeList) => {
    setPreviewList(list);
  };

  if (!isOpen) return null;

  // Preview Modal
  if (previewList) {
    const itemsByCategory = previewList.items.reduce((acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    }, {} as Record<string, typeof previewList.items>);

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
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Preview: {previewList.name}
                </h2>
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{previewList.destination}</span>
                  </div>
                  {previewList.season && (
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span className="capitalize">{previewList.season}</span>
                    </div>
                  )}
                  {previewList.duration_days && (
                    <Badge variant="secondary">
                      {previewList.duration_days} days
                    </Badge>
                  )}
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setPreviewList(null)} className="rounded-full h-10 w-10">
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Preview Content */}
            <div className="overflow-y-auto max-h-96 mb-6">
              <div className="space-y-6">
                {Object.entries(itemsByCategory).map(([category, items]) => (
                  <div key={category} className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4">
                    <h3 className="font-semibold text-lg mb-3 capitalize text-gray-900 dark:text-white">
                      {category === 'miscellaneous' ? 'Other Items' : category} ({items.length} items)
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {items.map((item, index) => (
                        <div key={index} className="flex items-center justify-between bg-white dark:bg-gray-700 rounded-lg p-3">
                          <span className="text-gray-900 dark:text-white">{item.name}</span>
                          <div className="flex items-center gap-2">
                            {item.quantity && item.quantity > 1 && (
                              <Badge variant="outline" className="text-xs">
                                {item.quantity}x
                              </Badge>
                            )}
                            {item.luggage && (
                              <Badge variant="secondary" className="text-xs capitalize">
                                {item.luggage.replace('-', ' ')}
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Preview Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button
                variant="outline"
                onClick={() => setPreviewList(null)}
                className="rounded-xl"
              >
                Back to Lists
              </Button>
              <Button
                onClick={() => {
                  handleAddList(previewList);
                  setPreviewList(null);
                }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl px-8"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add All Items to My Trip
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
              <p className="text-gray-600 dark:text-gray-300 mt-1 text-lg">
                Pre-built lists tailored for your destination and activities
              </p>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="rounded-full h-12 w-12 text-lg">
              <X className="h-6 w-6" />
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search destinations, cities, or activities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 rounded-2xl border-gray-200 dark:border-gray-700 h-12 text-lg"
              />
            </div>
            
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="lg"
                  onClick={() => setSelectedCategory(category)}
                  className="rounded-2xl capitalize px-4 py-2"
                >
                  {category === 'all' ? 'All Types' : category.replace('-', ' ')}
                </Button>
              ))}
            </div>
          </div>

          {/* Lists Grid */}
          <div className="overflow-y-auto max-h-[50vh] pr-2">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="text-gray-500 mt-4 text-lg">Loading amazing lists...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredLists.map((list) => (
                  <motion.div
                    key={list.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-6 hover:shadow-xl transition-all duration-200 border border-gray-200 dark:border-gray-600"
                  >
                    {/* List Header */}
                    <div className="mb-4">
                      <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-3">
                        {list.name}
                      </h3>
                      <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300 mb-3">
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
                      
                      {/* Description */}
                      {list.description && (
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                          {list.description}
                        </p>
                      )}
                    </div>
                    
                    {/* Items Preview */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-gray-900 dark:text-white text-lg">
                          {list.items.length} carefully selected items
                        </span>
                      </div>
                      
                      {/* Category breakdown */}
                      <div className="flex flex-wrap gap-2">
                        {Array.from(new Set(list.items.map(item => item.category))).map((category) => {
                          const count = list.items.filter(item => item.category === category).length;
                          return (
                            <Badge key={category} variant="outline" className="text-xs capitalize">
                              {category === 'miscellaneous' ? 'other' : category} ({count})
                            </Badge>
                          );
                        })}
                      </div>
                      
                      {/* Sample items */}
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-medium">Includes: </span>
                        {list.items.slice(0, 3).map(item => item.name).join(', ')}
                        {list.items.length > 3 && ` and ${list.items.length - 3} more...`}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        onClick={() => handlePreviewList(list)}
                        className="flex-1 rounded-2xl border-2 hover:border-blue-500 hover:text-blue-600"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Preview Items
                      </Button>
                      <Button
                        onClick={() => handleAddList(list)}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl shadow-lg"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add All
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
            
            {!loading && filteredLists.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-semibold mb-2">No lists found</h3>
                <p className="text-gray-500 text-lg">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>

          {/* Help Footer */}
          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <Info className="h-4 w-4" />
              <span>Tip: Use "Preview Items" to see the complete list before adding to your trip</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
