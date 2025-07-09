import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, X, Search, Calendar, Users, Thermometer, Globe, Plane, Car, MapPin, Mountain, Building, Briefcase, UtensilsCrossed, Camera, Music, Heart, Zap, Shield, Package, Award, Star, Crown, Gift, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface PremadeListsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddItems: (items: any[]) => void;
}

interface PremadeList {
  id: string;
  name: string;
  description: string;
  destinationType: string;
  season: string;
  duration: string;
  icon: string;
  items: Array<{ 
    name: string; 
    category: string; 
    quantity: number; 
    essential?: boolean;
    premium?: boolean;
    thoroughnessLevel?: 'light' | 'balanced' | 'thorough';
  }>;
}

const premadeLists: PremadeList[] = [
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
      { name: 'Evening clutch', category: 'miscellaneous', quantity: 1 },
      { name: 'Waterproof watch', category: 'miscellaneous', quantity: 1 },
      { name: 'Portable speaker', category: 'electronics', quantity: 1 },
      { name: 'Reading materials', category: 'miscellaneous', quantity: 3 },
      { name: 'Yoga mat', category: 'miscellaneous', quantity: 1 },
      { name: 'Resort wellness kit', category: 'toiletries', quantity: 1 },
      { name: 'Tropical perfume', category: 'toiletries', quantity: 1 },
      { name: 'Luxury beach towels', category: 'miscellaneous', quantity: 2 },
    ],
  },
  {
    id: 'european-city-tour',
    name: 'European City Adventure',
    description: 'Multi-city European tour with museums, dining, and walking',
    destinationType: 'city',
    season: 'spring',
    duration: '10-14 days',
    icon: '🏛️',
    items: [
      { name: 'Comfortable walking shoes', category: 'clothes', quantity: 2 },
      { name: 'Dress shoes for dining', category: 'clothes', quantity: 1 },
      { name: 'Weather-appropriate jackets', category: 'clothes', quantity: 2 },
      { name: 'Casual daywear', category: 'clothes', quantity: 8 },
      { name: 'Evening outfits', category: 'clothes', quantity: 4 },
      { name: 'Layering pieces', category: 'clothes', quantity: 6 },
      { name: 'Travel backpack', category: 'miscellaneous', quantity: 1 },
      { name: 'Portable phone charger', category: 'electronics', quantity: 1 },
      { name: 'Universal power adapter', category: 'electronics', quantity: 1 },
      { name: 'Travel guide books', category: 'miscellaneous', quantity: 3 },
      { name: 'Comfortable underwear', category: 'clothes', quantity: 14 },
      { name: 'Socks for walking', category: 'clothes', quantity: 14 },
      { name: 'Camera with extra batteries', category: 'electronics', quantity: 1 },
      { name: 'City maps and transit passes', category: 'documents', quantity: 5 },
      { name: 'Travel insurance documents', category: 'documents', quantity: 1 },
      { name: 'Museum and attraction tickets', category: 'documents', quantity: 10 },
      { name: 'Emergency contact information', category: 'documents', quantity: 1 },
      { name: 'Medications and first aid', category: 'toiletries', quantity: 1 },
      { name: 'Travel-sized toiletries', category: 'toiletries', quantity: 1 },
      { name: 'Umbrella for rain', category: 'miscellaneous', quantity: 1 },
      { name: 'Crossbody security bag', category: 'miscellaneous', quantity: 1 },
    ],
  },
  {
    id: 'tokyo-adventure',
    name: 'Tokyo Cultural Immersion',
    description: 'Deep dive into Japanese culture, food, and technology',
    destinationType: 'city',
    season: 'spring',
    duration: '7-10 days',
    icon: '🗼',
    items: [
      { name: 'Comfortable walking shoes', category: 'clothes', quantity: 2 },
      { name: 'Casual modern outfits', category: 'clothes', quantity: 7 },
      { name: 'Light jacket for temples', category: 'clothes', quantity: 1 },
      { name: 'Portable Wi-Fi device', category: 'electronics', quantity: 1 },
      { name: 'Translation app device', category: 'electronics', quantity: 1 },
      { name: 'Portable phone charger', category: 'electronics', quantity: 1 },
      { name: 'JR Pass and travel cards', category: 'documents', quantity: 1 },
      { name: 'Cash in Japanese Yen', category: 'miscellaneous', quantity: 1 },
      { name: 'Small day backpack', category: 'miscellaneous', quantity: 1 },
      { name: 'Cultural etiquette guide', category: 'miscellaneous', quantity: 1 },
      { name: 'Reusable chopsticks', category: 'miscellaneous', quantity: 1 },
      { name: 'Face masks', category: 'toiletries', quantity: 10 },
      { name: 'Hand sanitizer', category: 'toiletries', quantity: 2 },
      { name: 'Digestive aids', category: 'toiletries', quantity: 1 },
      { name: 'Travel insurance', category: 'documents', quantity: 1 },
      { name: 'Emergency contacts', category: 'documents', quantity: 1 },
      { name: 'Slippers for traditional areas', category: 'clothes', quantity: 1 },
      { name: 'Camera for memories', category: 'electronics', quantity: 1 },
      { name: 'Gifts for hosts', category: 'miscellaneous', quantity: 5 },
      { name: 'Formal attire for fancy restaurants', category: 'clothes', quantity: 2 },
      { name: 'Seasonal appropriate layers', category: 'clothes', quantity: 4 },
    ],
  },
  {
    id: 'business-conference',
    name: 'Business Conference Professional',
    description: 'Corporate conference with networking and presentations',
    destinationType: 'business',
    season: 'all',
    duration: '3-5 days',
    icon: '💼',
    items: [
      { name: 'Business suits', category: 'clothes', quantity: 3 },
      { name: 'Professional blouses/shirts', category: 'clothes', quantity: 5 },
      { name: 'Dress shoes', category: 'clothes', quantity: 2 },
      { name: 'Professional accessories', category: 'miscellaneous', quantity: 3 },
      { name: 'Laptop with charger', category: 'electronics', quantity: 1 },
      { name: 'Business cards', category: 'documents', quantity: 100 },
      { name: 'Portfolio and notebooks', category: 'miscellaneous', quantity: 2 },
      { name: 'Presentation materials', category: 'documents', quantity: 1 },
      { name: 'Conference registration docs', category: 'documents', quantity: 1 },
      { name: 'Professional name tags', category: 'miscellaneous', quantity: 3 },
      { name: 'Network adapter for presentations', category: 'electronics', quantity: 1 },
      { name: 'Backup presentation on USB', category: 'electronics', quantity: 2 },
      { name: 'Professional headshots', category: 'documents', quantity: 10 },
      { name: 'Industry publications', category: 'miscellaneous', quantity: 3 },
      { name: 'Breath mints/gum', category: 'toiletries', quantity: 2 },
      { name: 'Professional grooming kit', category: 'toiletries', quantity: 1 },
      { name: 'Stain removal pen', category: 'miscellaneous', quantity: 1 },
      { name: 'Phone charger', category: 'electronics', quantity: 1 },
      { name: 'Professional watch', category: 'miscellaneous', quantity: 1 },
      { name: 'Comfortable conference shoes', category: 'clothes', quantity: 1 },
      { name: 'Professional bag/briefcase', category: 'miscellaneous', quantity: 1 },
    ],
  },
  {
    id: 'ski-alpine-adventure',
    name: 'Alpine Ski Adventure',
    description: 'Mountain skiing with apres-ski and winter activities',
    destinationType: 'mountain',
    season: 'winter',
    duration: '7-10 days',
    icon: '⛷️',
    items: [
      { name: 'Ski jacket', category: 'clothes', quantity: 1 },
      { name: 'Ski pants', category: 'clothes', quantity: 2 },
      { name: 'Thermal base layers', category: 'clothes', quantity: 4 },
      { name: 'Ski socks', category: 'clothes', quantity: 7 },
      { name: 'Ski gloves', category: 'clothes', quantity: 2 },
      { name: 'Ski helmet', category: 'miscellaneous', quantity: 1 },
      { name: 'Ski goggles', category: 'miscellaneous', quantity: 1 },
      { name: 'Ski boots', category: 'clothes', quantity: 1 },
      { name: 'Skis and poles', category: 'miscellaneous', quantity: 1 },
      { name: 'Apres-ski boots', category: 'clothes', quantity: 1 },
      { name: 'Warm sweaters', category: 'clothes', quantity: 4 },
      { name: 'Casual winter wear', category: 'clothes', quantity: 6 },
      { name: 'Sunscreen for snow glare', category: 'toiletries', quantity: 2 },
      { name: 'Lip balm with SPF', category: 'toiletries', quantity: 3 },
      { name: 'Hand and foot warmers', category: 'miscellaneous', quantity: 10 },
      { name: 'Ski lift tickets', category: 'documents', quantity: 7 },
      { name: 'Travel insurance for skiing', category: 'documents', quantity: 1 },
      { name: 'Emergency contact info', category: 'documents', quantity: 1 },
      { name: 'First aid kit', category: 'toiletries', quantity: 1 },
      { name: 'Waterproof phone case', category: 'electronics', quantity: 1 },
      { name: 'Action camera for slopes', category: 'electronics', quantity: 1 },
    ],
  },
  {
    id: 'backpacking-europe',
    name: 'European Backpacking Adventure',
    description: 'Budget-friendly multi-country European exploration',
    destinationType: 'adventure',
    season: 'summer',
    duration: '14-21 days',
    icon: '🎒',
    items: [
      { name: 'Quality backpack', category: 'miscellaneous', quantity: 1 },
      { name: 'Quick-dry clothing', category: 'clothes', quantity: 10 },
      { name: 'Hiking boots', category: 'clothes', quantity: 1 },
      { name: 'Comfortable walking shoes', category: 'clothes', quantity: 1 },
      { name: 'Packable rain jacket', category: 'clothes', quantity: 1 },
      { name: 'Hostel essentials kit', category: 'toiletries', quantity: 1 },
      { name: 'Travel towel', category: 'miscellaneous', quantity: 1 },
      { name: 'Universal power adapter', category: 'electronics', quantity: 1 },
      { name: 'Portable phone charger', category: 'electronics', quantity: 1 },
      { name: 'Eurail pass', category: 'documents', quantity: 1 },
      { name: 'Youth hostel membership', category: 'documents', quantity: 1 },
      { name: 'Travel guidebooks', category: 'miscellaneous', quantity: 2 },
      { name: 'First aid kit', category: 'toiletries', quantity: 1 },
      { name: 'Water purification tablets', category: 'miscellaneous', quantity: 20 },
      { name: 'Lightweight sleeping bag', category: 'miscellaneous', quantity: 1 },
      { name: 'Travel pillow', category: 'miscellaneous', quantity: 1 },
      { name: 'Laundry detergent packets', category: 'miscellaneous', quantity: 10 },
      { name: 'Money belt', category: 'miscellaneous', quantity: 1 },
      { name: 'Padlock for lockers', category: 'miscellaneous', quantity: 2 },
      { name: 'Lightweight camera', category: 'electronics', quantity: 1 },
      { name: 'Travel insurance documents', category: 'documents', quantity: 1 },
    ],
  },
  {
    id: 'family-disney-world',
    name: 'Disney World Family Magic',
    description: 'Complete family vacation to Disney World with kids',
    destinationType: 'family',
    season: 'all',
    duration: '5-7 days',
    icon: '🏰',
    items: [
      { name: 'Comfortable walking shoes for all', category: 'clothes', quantity: 6 },
      { name: 'Disney-themed outfits', category: 'clothes', quantity: 8 },
      { name: 'Light jackets for air conditioning', category: 'clothes', quantity: 4 },
      { name: 'Swimwear for hotel pools', category: 'clothes', quantity: 4 },
      { name: 'Sunscreen family pack', category: 'toiletries', quantity: 3 },
      { name: 'First aid kit for kids', category: 'toiletries', quantity: 1 },
      { name: 'Disney tickets and reservations', category: 'documents', quantity: 1 },
      { name: 'Autograph books', category: 'miscellaneous', quantity: 4 },
      { name: 'Portable phone chargers', category: 'electronics', quantity: 3 },
      { name: 'Stroller or wagon', category: 'miscellaneous', quantity: 1 },
      { name: 'Snacks for the parks', category: 'miscellaneous', quantity: 20 },
      { name: 'Water bottles', category: 'miscellaneous', quantity: 4 },
      { name: 'Rain ponchos', category: 'clothes', quantity: 4 },
      { name: 'Camera for memories', category: 'electronics', quantity: 1 },
      { name: 'Disney pins for trading', category: 'miscellaneous', quantity: 20 },
      { name: 'Glow sticks for parades', category: 'miscellaneous', quantity: 8 },
      { name: 'Hand sanitizer', category: 'toiletries', quantity: 3 },
      { name: 'Kids medications', category: 'toiletries', quantity: 1 },
      { name: 'Extra clothes for kids', category: 'clothes', quantity: 8 },
      { name: 'Disney apps downloaded', category: 'electronics', quantity: 1 },
      { name: 'Souvenir budget money', category: 'miscellaneous', quantity: 1 },
    ],
  },
  {
    id: 'safari-adventure',
    name: 'African Safari Expedition',
    description: 'Wildlife photography and game drive adventure',
    destinationType: 'adventure',
    season: 'winter',
    duration: '10-14 days',
    icon: '🦁',
    items: [
      { name: 'Neutral-colored safari clothing', category: 'clothes', quantity: 8 },
      { name: 'Hiking boots', category: 'clothes', quantity: 1 },
      { name: 'Safari hat with chin strap', category: 'clothes', quantity: 1 },
      { name: 'Lightweight long sleeves', category: 'clothes', quantity: 4 },
      { name: 'Long pants for protection', category: 'clothes', quantity: 4 },
      { name: 'Binoculars', category: 'miscellaneous', quantity: 1 },
      { name: 'Camera with telephoto lens', category: 'electronics', quantity: 1 },
      { name: 'Extra camera batteries', category: 'electronics', quantity: 6 },
      { name: 'Memory cards', category: 'electronics', quantity: 4 },
      { name: 'Insect repellent', category: 'toiletries', quantity: 3 },
      { name: 'Sunscreen high SPF', category: 'toiletries', quantity: 2 },
      { name: 'Malaria prophylaxis', category: 'toiletries', quantity: 1 },
      { name: 'First aid kit', category: 'toiletries', quantity: 1 },
      { name: 'Headlamp and flashlight', category: 'electronics', quantity: 2 },
      { name: 'Portable charger', category: 'electronics', quantity: 1 },
      { name: 'Safari field guide', category: 'miscellaneous', quantity: 1 },
      { name: 'Travel insurance', category: 'documents', quantity: 1 },
      { name: 'Vaccination records', category: 'documents', quantity: 1 },
      { name: 'Dust-proof bags', category: 'miscellaneous', quantity: 5 },
      { name: 'Water purification tablets', category: 'miscellaneous', quantity: 30 },
      { name: 'Quick-dry towel', category: 'miscellaneous', quantity: 1 },
    ],
  },
  {
    id: 'road-trip-usa',
    name: 'American Road Trip Adventure',
    description: 'Cross-country road trip with national parks and cities',
    destinationType: 'adventure',
    season: 'summer',
    duration: '14-21 days',
    icon: '🚗',
    items: [
      { name: 'Comfortable road trip clothes', category: 'clothes', quantity: 15 },
      { name: 'Hiking gear for national parks', category: 'clothes', quantity: 5 },
      { name: 'Layers for varying climates', category: 'clothes', quantity: 8 },
      { name: 'Road atlas and maps', category: 'miscellaneous', quantity: 1 },
      { name: 'GPS and backup navigation', category: 'electronics', quantity: 1 },
      { name: 'Car chargers', category: 'electronics', quantity: 2 },
      { name: 'Cooler for food storage', category: 'miscellaneous', quantity: 1 },
      { name: 'Road trip snacks', category: 'miscellaneous', quantity: 30 },
      { name: 'Water bottles', category: 'miscellaneous', quantity: 6 },
      { name: 'First aid kit', category: 'toiletries', quantity: 1 },
      { name: 'Emergency car kit', category: 'miscellaneous', quantity: 1 },
      { name: 'Camera for scenic stops', category: 'electronics', quantity: 1 },
      { name: 'National park passes', category: 'documents', quantity: 1 },
      { name: 'Hotel reservations', category: 'documents', quantity: 1 },
      { name: 'Entertainment for long drives', category: 'electronics', quantity: 1 },
      { name: 'Sunglasses', category: 'miscellaneous', quantity: 2 },
      { name: 'Travel pillow', category: 'miscellaneous', quantity: 2 },
      { name: 'Travel blanket', category: 'miscellaneous', quantity: 1 },
      { name: 'Roadside assistance info', category: 'documents', quantity: 1 },
      { name: 'Cash for tolls and tips', category: 'miscellaneous', quantity: 1 },
      { name: 'Portable phone charger', category: 'electronics', quantity: 2 },
    ],
  },
  {
    id: 'wedding-guest',
    name: 'Wedding Guest Elegance',
    description: 'Perfect attire and essentials for a formal wedding',
    destinationType: 'formal',
    season: 'spring',
    duration: '2-3 days',
    icon: '💒',
    items: [
      { name: 'Formal wedding attire', category: 'clothes', quantity: 1 },
      { name: 'Backup outfit option', category: 'clothes', quantity: 1 },
      { name: 'Formal shoes', category: 'clothes', quantity: 1 },
      { name: 'Dress shoes backup', category: 'clothes', quantity: 1 },
      { name: 'Formal accessories', category: 'miscellaneous', quantity: 3 },
      { name: 'Wedding gift', category: 'miscellaneous', quantity: 1 },
      { name: 'Card for couple', category: 'miscellaneous', quantity: 1 },
      { name: 'Camera for memories', category: 'electronics', quantity: 1 },
      { name: 'Weather backup (umbrella/wrap)', category: 'miscellaneous', quantity: 1 },
      { name: 'Touch-up makeup kit', category: 'toiletries', quantity: 1 },
      { name: 'Comfortable shoes for dancing', category: 'clothes', quantity: 1 },
      { name: 'Formal evening wear', category: 'clothes', quantity: 1 },
      { name: 'Jewelry', category: 'miscellaneous', quantity: 1 },
      { name: 'Formal handbag/clutch', category: 'miscellaneous', quantity: 1 },
      { name: 'Wedding invitation', category: 'documents', quantity: 1 },
      { name: 'Hotel confirmation', category: 'documents', quantity: 1 },
      { name: 'Emergency sewing kit', category: 'miscellaneous', quantity: 1 },
      { name: 'Stain remover pen', category: 'miscellaneous', quantity: 1 },
      { name: 'Breath mints', category: 'toiletries', quantity: 1 },
      { name: 'Tissues', category: 'toiletries', quantity: 2 },
      { name: 'Phone charger', category: 'electronics', quantity: 1 },
    ],
  },
  {
    id: 'hiking-patagonia',
    name: 'Patagonia Hiking Expedition',
    description: 'Multi-day hiking in rugged Patagonian wilderness',
    destinationType: 'adventure',
    season: 'summer',
    duration: '10-14 days',
    icon: '🏔️',
    items: [
      { name: 'Hiking backpack (50-60L)', category: 'miscellaneous', quantity: 1 },
      { name: 'Hiking boots', category: 'clothes', quantity: 1 },
      { name: 'Backup hiking shoes', category: 'clothes', quantity: 1 },
      { name: 'Moisture-wicking base layers', category: 'clothes', quantity: 4 },
      { name: 'Insulating mid-layers', category: 'clothes', quantity: 3 },
      { name: 'Waterproof shell jacket', category: 'clothes', quantity: 1 },
      { name: 'Waterproof pants', category: 'clothes', quantity: 1 },
      { name: 'Hiking socks', category: 'clothes', quantity: 8 },
      { name: 'Sleeping bag (rated appropriate)', category: 'miscellaneous', quantity: 1 },
      { name: 'Sleeping pad', category: 'miscellaneous', quantity: 1 },
      { name: 'Lightweight tent', category: 'miscellaneous', quantity: 1 },
      { name: 'Portable stove and fuel', category: 'miscellaneous', quantity: 1 },
      { name: 'Lightweight cookware', category: 'miscellaneous', quantity: 1 },
      { name: 'Water filter', category: 'miscellaneous', quantity: 1 },
      { name: 'Trekking poles', category: 'miscellaneous', quantity: 1 },
      { name: 'Headlamp and backup', category: 'electronics', quantity: 2 },
      { name: 'GPS device', category: 'electronics', quantity: 1 },
      { name: 'Emergency whistle', category: 'miscellaneous', quantity: 1 },
      { name: 'First aid kit', category: 'toiletries', quantity: 1 },
      { name: 'High SPF sunscreen', category: 'toiletries', quantity: 2 },
      { name: 'Glacier glasses', category: 'miscellaneous', quantity: 1 },
    ],
  },
  {
    id: 'wellness-retreat',
    name: 'Yoga Wellness Retreat',
    description: 'Mindful retreat focusing on yoga, meditation, and wellness',
    destinationType: 'wellness',
    season: 'all',
    duration: '5-7 days',
    icon: '🧘',
    items: [
      { name: 'Yoga mat', category: 'miscellaneous', quantity: 1 },
      { name: 'Yoga blocks', category: 'miscellaneous', quantity: 2 },
      { name: 'Yoga straps', category: 'miscellaneous', quantity: 1 },
      { name: 'Comfortable yoga clothes', category: 'clothes', quantity: 8 },
      { name: 'Meditation cushion', category: 'miscellaneous', quantity: 1 },
      { name: 'Journal for reflection', category: 'miscellaneous', quantity: 1 },
      { name: 'Wellness books', category: 'miscellaneous', quantity: 2 },
      { name: 'Essential oils', category: 'toiletries', quantity: 3 },
      { name: 'Natural toiletries', category: 'toiletries', quantity: 1 },
      { name: 'Water bottle', category: 'miscellaneous', quantity: 1 },
      { name: 'Herbal teas', category: 'miscellaneous', quantity: 5 },
      { name: 'Comfortable walking shoes', category: 'clothes', quantity: 1 },
      { name: 'Light layers for varying temperatures', category: 'clothes', quantity: 4 },
      { name: 'Swimwear for spa', category: 'clothes', quantity: 2 },
      { name: 'Sunscreen', category: 'toiletries', quantity: 1 },
      { name: 'Insect repellent', category: 'toiletries', quantity: 1 },
      { name: 'Portable speaker for meditation', category: 'electronics', quantity: 1 },
      { name: 'Phone charger', category: 'electronics', quantity: 1 },
      { name: 'Camera for nature', category: 'electronics', quantity: 1 },
      { name: 'Healthy snacks', category: 'miscellaneous', quantity: 10 },
      { name: 'Retreat schedule and materials', category: 'documents', quantity: 1 },
    ],
  },
  {
    id: 'culinary-italy',
    name: 'Italian Culinary Journey',
    description: 'Food-focused tour of Italy with cooking classes and wine tastings',
    destinationType: 'culinary',
    season: 'spring',
    duration: '7-10 days',
    icon: '🍝',
    items: [
      { name: 'Comfortable walking shoes', category: 'clothes', quantity: 2 },
      { name: 'Casual dining outfits', category: 'clothes', quantity: 6 },
      { name: 'Slightly formal dinner wear', category: 'clothes', quantity: 3 },
      { name: 'Cooking class apron', category: 'clothes', quantity: 1 },
      { name: 'Food journal', category: 'miscellaneous', quantity: 1 },
      { name: 'Camera for food photography', category: 'electronics', quantity: 1 },
      { name: 'Digestive aids', category: 'toiletries', quantity: 1 },
      { name: 'Probiotics', category: 'toiletries', quantity: 1 },
      { name: 'Wine tasting notes', category: 'miscellaneous', quantity: 1 },
      { name: 'Food allergy cards in Italian', category: 'documents', quantity: 1 },
      { name: 'Market tote bag', category: 'miscellaneous', quantity: 1 },
      { name: 'Travel-sized olive oil', category: 'miscellaneous', quantity: 1 },
      { name: 'Italian phrasebook', category: 'miscellaneous', quantity: 1 },
      { name: 'Light cardigan for restaurants', category: 'clothes', quantity: 1 },
      { name: 'Comfortable pants with stretch', category: 'clothes', quantity: 4 },
      { name: 'Portable scale for shopping', category: 'miscellaneous', quantity: 1 },
      { name: 'Vacuum bags for food souvenirs', category: 'miscellaneous', quantity: 5 },
      { name: 'Wine shipping materials', category: 'miscellaneous', quantity: 1 },
      { name: 'Cooking class reservations', category: 'documents', quantity: 1 },
      { name: 'Restaurant reservations', category: 'documents', quantity: 1 },
      { name: 'Wine tour confirmations', category: 'documents', quantity: 1 },
    ],
  },
  {
    id: 'photography-landscape',
    name: 'Landscape Photography Workshop',
    description: 'Professional photography tour of scenic landscapes',
    destinationType: 'photography',
    season: 'autumn',
    duration: '7-10 days',
    icon: '📸',
    items: [
      { name: 'Professional camera body', category: 'electronics', quantity: 1 },
      { name: 'Wide-angle lens', category: 'electronics', quantity: 1 },
      { name: 'Telephoto lens', category: 'electronics', quantity: 1 },
      { name: 'Macro lens', category: 'electronics', quantity: 1 },
      { name: 'Sturdy tripod', category: 'electronics', quantity: 1 },
      { name: 'Neutral density filters', category: 'electronics', quantity: 5 },
      { name: 'Circular polarizing filter', category: 'electronics', quantity: 1 },
      { name: 'Extra camera batteries', category: 'electronics', quantity: 6 },
      { name: 'Battery charger', category: 'electronics', quantity: 1 },
      { name: 'Multiple memory cards', category: 'electronics', quantity: 6 },
      { name: 'Card reader', category: 'electronics', quantity: 1 },
      { name: 'Lens cleaning kit', category: 'electronics', quantity: 1 },
      { name: 'Camera rain cover', category: 'electronics', quantity: 1 },
      { name: 'Laptop for editing', category: 'electronics', quantity: 1 },
      { name: 'Portable hard drive', category: 'electronics', quantity: 1 },
      { name: 'Camera backpack', category: 'miscellaneous', quantity: 1 },
      { name: 'Weather-appropriate clothes', category: 'clothes', quantity: 8 },
      { name: 'Hiking boots', category: 'clothes', quantity: 1 },
      { name: 'Waterproof jacket', category: 'clothes', quantity: 1 },
      { name: 'Photography gloves', category: 'clothes', quantity: 1 },
      { name: 'Headlamp for early shoots', category: 'electronics', quantity: 1 },
    ],
  },
  {
    id: 'festival-music',
    name: 'Music Festival Experience',
    description: 'Multi-day outdoor music festival with camping',
    destinationType: 'festival',
    season: 'summer',
    duration: '3-5 days',
    icon: '🎵',
    items: [
      { name: 'Festival tickets', category: 'documents', quantity: 1 },
      { name: 'Camping gear (tent, sleeping bag)', category: 'miscellaneous', quantity: 1 },
      { name: 'Comfortable festival clothes', category: 'clothes', quantity: 6 },
      { name: 'Rain poncho', category: 'clothes', quantity: 1 },
      { name: 'Comfortable shoes', category: 'clothes', quantity: 2 },
      { name: 'Portable phone charger', category: 'electronics', quantity: 2 },
      { name: 'Ear protection/earplugs', category: 'miscellaneous', quantity: 10 },
      { name: 'Sunscreen', category: 'toiletries', quantity: 2 },
      { name: 'Sunglasses', category: 'miscellaneous', quantity: 2 },
      { name: 'Water bottle', category: 'miscellaneous', quantity: 1 },
      { name: 'Festival map and schedule', category: 'documents', quantity: 1 },
      { name: 'Cash for vendors', category: 'miscellaneous', quantity: 1 },
      { name: 'Wet wipes', category: 'toiletries', quantity: 10 },
      { name: 'Hand sanitizer', category: 'toiletries', quantity: 2 },
      { name: 'Bandana for dust', category: 'clothes', quantity: 2 },
      { name: 'Glow sticks/LED accessories', category: 'miscellaneous', quantity: 5 },
      { name: 'Portable chair', category: 'miscellaneous', quantity: 1 },
      { name: 'Camera for memories', category: 'electronics', quantity: 1 },
      { name: 'First aid kit', category: 'toiletries', quantity: 1 },
      { name: 'Plastic bags for protection', category: 'miscellaneous', quantity: 10 },
      { name: 'Festival wristband protection', category: 'miscellaneous', quantity: 1 },
    ],
  },
  {
    id: 'honeymoon-santorini',
    name: 'Santorini Honeymoon Romance',
    description: 'Romantic Greek island honeymoon with sunset views',
    destinationType: 'romance',
    season: 'summer',
    duration: '7-10 days',
    icon: '💕',
    items: [
      { name: 'Romantic dinner outfits', category: 'clothes', quantity: 4 },
      { name: 'Swimwear', category: 'clothes', quantity: 4 },
      { name: 'Beach cover-ups', category: 'clothes', quantity: 2 },
      { name: 'Sunset viewing attire', category: 'clothes', quantity: 3 },
      { name: 'Comfortable walking shoes', category: 'clothes', quantity: 2 },
      { name: 'Dressy sandals', category: 'clothes', quantity: 1 },
      { name: 'Camera for couple photos', category: 'electronics', quantity: 1 },
      { name: 'Tripod for selfies', category: 'electronics', quantity: 1 },
      { name: 'Sunscreen', category: 'toiletries', quantity: 2 },
      { name: 'After-sun care', category: 'toiletries', quantity: 1 },
      { name: 'Romantic perfume/cologne', category: 'toiletries', quantity: 1 },
      { name: 'Wedding rings', category: 'miscellaneous', quantity: 2 },
      { name: 'Honeymoon documents', category: 'documents', quantity: 1 },
      { name: 'Wine for balcony', category: 'miscellaneous', quantity: 1 },
      { name: 'Romantic playlist ready', category: 'electronics', quantity: 1 },
      { name: 'Beach bag', category: 'miscellaneous', quantity: 1 },
      { name: 'Snorkeling gear', category: 'miscellaneous', quantity: 1 },
      { name: 'Travel insurance', category: 'documents', quantity: 1 },
      { name: 'Greek phrase book', category: 'miscellaneous', quantity: 1 },
      { name: 'Couples spa items', category: 'toiletries', quantity: 1 },
      { name: 'Waterproof phone case', category: 'electronics', quantity: 1 },
    ],
  },
  {
    id: 'winter-iceland',
    name: 'Iceland Winter Wonderland',
    description: 'Northern lights and winter activities in Iceland',
    destinationType: 'adventure',
    season: 'winter',
    duration: '7-10 days',
    icon: '🌌',
    items: [
      { name: 'Extreme weather jacket', category: 'clothes', quantity: 1 },
      { name: 'Insulated pants', category: 'clothes', quantity: 2 },
      { name: 'Thermal base layers', category: 'clothes', quantity: 6 },
      { name: 'Warm wool socks', category: 'clothes', quantity: 8 },
      { name: 'Insulated boots', category: 'clothes', quantity: 1 },
      { name: 'Waterproof gloves', category: 'clothes', quantity: 2 },
      { name: 'Warm hat', category: 'clothes', quantity: 2 },
      { name: 'Scarf or neck warmer', category: 'clothes', quantity: 1 },
      { name: 'Camera for northern lights', category: 'electronics', quantity: 1 },
      { name: 'Tripod for long exposures', category: 'electronics', quantity: 1 },
      { name: 'Extra camera batteries', category: 'electronics', quantity: 8 },
      { name: 'Battery warmers', category: 'electronics', quantity: 4 },
      { name: 'Headlamp with red filter', category: 'electronics', quantity: 1 },
      { name: 'Hand warmers', category: 'miscellaneous', quantity: 20 },
      { name: 'Foot warmers', category: 'miscellaneous', quantity: 10 },
      { name: 'Sunglasses for snow glare', category: 'miscellaneous', quantity: 1 },
      { name: 'High SPF sunscreen', category: 'toiletries', quantity: 1 },
      { name: 'Lip balm', category: 'toiletries', quantity: 3 },
      { name: 'Northern lights app', category: 'electronics', quantity: 1 },
      { name: 'Iceland travel guide', category: 'miscellaneous', quantity: 1 },
      { name: 'Emergency contact info', category: 'documents', quantity: 1 },
    ],
  },
  {
    id: 'luxury-dubai',
    name: 'Dubai Luxury Experience',
    description: 'High-end luxury travel in Dubai with shopping and dining',
    destinationType: 'luxury',
    season: 'winter',
    duration: '5-7 days',
    icon: '🏙️',
    items: [
      { name: 'Designer formal wear', category: 'clothes', quantity: 4 },
      { name: 'Luxury resort wear', category: 'clothes', quantity: 5 },
      { name: 'High-end swimwear', category: 'clothes', quantity: 3 },
      { name: 'Designer shoes', category: 'clothes', quantity: 3 },
      { name: 'Luxury accessories', category: 'miscellaneous', quantity: 5 },
      { name: 'Premium perfume/cologne', category: 'toiletries', quantity: 1 },
      { name: 'Luxury skincare', category: 'toiletries', quantity: 1 },
      { name: 'Designer sunglasses', category: 'miscellaneous', quantity: 2 },
      { name: 'High-end camera', category: 'electronics', quantity: 1 },
      { name: 'Luxury travel documents', category: 'documents', quantity: 1 },
      { name: 'VIP experience vouchers', category: 'documents', quantity: 1 },
      { name: 'Shopping budget cards', category: 'documents', quantity: 1 },
      { name: 'Desert safari attire', category: 'clothes', quantity: 2 },
      { name: 'Modest clothing for cultural sites', category: 'clothes', quantity: 3 },
      { name: 'Evening gowns/formal suits', category: 'clothes', quantity: 2 },
      { name: 'Luxury handbag', category: 'miscellaneous', quantity: 1 },
      { name: 'Premium phone charger', category: 'electronics', quantity: 1 },
      { name: 'Business cards for networking', category: 'documents', quantity: 50 },
      { name: 'Concierge contact information', category: 'documents', quantity: 1 },
      { name: 'Travel insurance (premium)', category: 'documents', quantity: 1 },
      { name: 'Currency exchange information', category: 'documents', quantity: 1 },
    ],
  },
  {
    id: 'volunteer-abroad',
    name: 'International Volunteer Program',
    description: 'Meaningful volunteer work abroad in developing communities',
    destinationType: 'volunteer',
    season: 'all',
    duration: '14-30 days',
    icon: '🤝',
    items: [
      { name: 'Durable work clothes', category: 'clothes', quantity: 10 },
      { name: 'Work boots', category: 'clothes', quantity: 1 },
      { name: 'Work gloves', category: 'clothes', quantity: 3 },
      { name: 'Cultural appropriate clothing', category: 'clothes', quantity: 8 },
      { name: 'Volunteer program documents', category: 'documents', quantity: 1 },
      { name: 'Vaccination records', category: 'documents', quantity: 1 },
      { name: 'Medical insurance', category: 'documents', quantity: 1 },
      { name: 'First aid kit', category: 'toiletries', quantity: 1 },
      { name: 'Water purification tablets', category: 'miscellaneous', quantity: 50 },
      { name: 'Insect repellent', category: 'toiletries', quantity: 3 },
      { name: 'Sunscreen', category: 'toiletries', quantity: 3 },
      { name: 'Basic tools for projects', category: 'miscellaneous', quantity: 1 },
      { name: 'Teaching/activity supplies', category: 'miscellaneous', quantity: 1 },
      { name: 'Gifts for host families', category: 'miscellaneous', quantity: 10 },
      { name: 'Local language dictionary', category: 'miscellaneous', quantity: 1 },
      { name: 'Camera for documentation', category: 'electronics', quantity: 1 },
      { name: 'Journal for experiences', category: 'miscellaneous', quantity: 1 },
      { name: 'Portable phone charger', category: 'electronics', quantity: 1 },
      { name: 'Headlamp', category: 'electronics', quantity: 1 },
      { name: 'Quick-dry towel', category: 'miscellaneous', quantity: 1 },
      { name: 'Emergency contact information', category: 'documents', quantity: 1 },
    ],
  },
  {
    id: 'study-abroad',
    name: 'Semester Study Abroad',
    description: 'Extended academic program in foreign university',
    destinationType: 'education',
    season: 'all',
    duration: '90-120 days',
    icon: '📚',
    items: [
      { name: 'Academic supplies', category: 'miscellaneous', quantity: 1 },
      { name: 'Laptop and charger', category: 'electronics', quantity: 1 },
      { name: 'University documents', category: 'documents', quantity: 1 },
      { name: 'Student visa', category: 'documents', quantity: 1 },
      { name: 'Academic transcripts', category: 'documents', quantity: 1 },
      { name: 'Season-appropriate clothing', category: 'clothes', quantity: 20 },
      { name: 'Formal presentation attire', category: 'clothes', quantity: 3 },
      { name: 'Comfortable study shoes', category: 'clothes', quantity: 3 },
      { name: 'Universal power adapter', category: 'electronics', quantity: 1 },
      { name: 'Language learning materials', category: 'miscellaneous', quantity: 1 },
      { name: 'Cultural guidebooks', category: 'miscellaneous', quantity: 2 },
      { name: 'Home country gifts', category: 'miscellaneous', quantity: 10 },
      { name: 'Prescription medications', category: 'toiletries', quantity: 1 },
      { name: 'Health insurance documents', category: 'documents', quantity: 1 },
      { name: 'Bank account setup docs', category: 'documents', quantity: 1 },
      { name: 'Emergency contact information', category: 'documents', quantity: 1 },
      { name: 'Portable hard drive for backup', category: 'electronics', quantity: 1 },
      { name: 'Camera for memories', category: 'electronics', quantity: 1 },
      { name: 'School supplies and stationery', category: 'miscellaneous', quantity: 1 },
      { name: 'Comfort items from home', category: 'miscellaneous', quantity: 5 },
      { name: 'International phone plan setup', category: 'electronics', quantity: 1 },
    ],
  },
  {
    id: 'river-cruise',
    name: 'European River Cruise',
    description: 'Scenic river cruise through European capitals',
    destinationType: 'cruise',
    season: 'spring',
    duration: '7-10 days',
    icon: '🛳️',
    items: [
      { name: 'Elegant dinner attire', category: 'clothes', quantity: 4 },
      { name: 'Smart casual daywear', category: 'clothes', quantity: 6 },
      { name: 'Comfortable walking shoes', category: 'clothes', quantity: 2 },
      { name: 'Light jacket for deck', category: 'clothes', quantity: 1 },
      { name: 'Rain jacket', category: 'clothes', quantity: 1 },
      { name: 'Dress shoes', category: 'clothes', quantity: 1 },
      { name: 'Binoculars for scenery', category: 'miscellaneous', quantity: 1 },
      { name: 'Camera with zoom lens', category: 'electronics', quantity: 1 },
      { name: 'Portable charger', category: 'electronics', quantity: 1 },
      { name: 'European travel guide', category: 'miscellaneous', quantity: 1 },
      { name: 'Shore excursion comfortable clothes', category: 'clothes', quantity: 4 },
      { name: 'Day backpack', category: 'miscellaneous', quantity: 1 },
      { name: 'Cruise documents', category: 'documents', quantity: 1 },
      { name: 'Travel insurance', category: 'documents', quantity: 1 },
      { name: 'Passport and copies', category: 'documents', quantity: 1 },
      { name: 'European currency', category: 'miscellaneous', quantity: 1 },
      { name: 'Motion sickness remedies', category: 'toiletries', quantity: 1 },
      { name: 'Sun protection', category: 'toiletries', quantity: 1 },
      { name: 'Reading materials', category: 'miscellaneous', quantity: 3 },
      { name: 'Formal accessories', category: 'miscellaneous', quantity: 3 },
      { name: 'Small umbrella', category: 'miscellaneous', quantity: 1 },
    ],
  },
  {
    id: 'camping-national-parks',
    name: 'National Parks Camping',
    description: 'Multi-park camping adventure across American national parks',
    destinationType: 'camping',
    season: 'summer',
    duration: '10-14 days',
    icon: '🏕️',
    items: [
      { name: 'Four-season tent', category: 'miscellaneous', quantity: 1 },
      { name: 'Sleeping bag', category: 'miscellaneous', quantity: 1 },
      { name: 'Sleeping pad', category: 'miscellaneous', quantity: 1 },
      { name: 'Camping pillow', category: 'miscellaneous', quantity: 1 },
      { name: 'Portable camping stove', category: 'miscellaneous', quantity: 1 },
      { name: 'Cookware set', category: 'miscellaneous', quantity: 1 },
      { name: 'Water filtration system', category: 'miscellaneous', quantity: 1 },
      { name: 'Hiking boots', category: 'clothes', quantity: 1 },
      { name: 'Camp shoes', category: 'clothes', quantity: 1 },
      { name: 'Layered clothing system', category: 'clothes', quantity: 8 },
      { name: 'Rain gear', category: 'clothes', quantity: 1 },
      { name: 'Headlamp', category: 'electronics', quantity: 1 },
      { name: 'Lantern', category: 'electronics', quantity: 1 },
      { name: 'National park passes', category: 'documents', quantity: 1 },
      { name: 'Camping reservations', category: 'documents', quantity: 1 },
      { name: 'Trail maps', category: 'miscellaneous', quantity: 5 },
      { name: 'First aid kit', category: 'toiletries', quantity: 1 },
      { name: 'Bear spray', category: 'miscellaneous', quantity: 1 },
      { name: 'Food storage containers', category: 'miscellaneous', quantity: 5 },
      { name: 'Camping chairs', category: 'miscellaneous', quantity: 2 },
      { name: 'Portable solar charger', category: 'electronics', quantity: 1 },
    ],
  },
  {
    id: 'business-trip-london',
    name: 'London Business Trip',
    description: 'Professional business trip to London with client meetings',
    destinationType: 'business',
    season: 'autumn',
    duration: '3-5 days',
    icon: '🇬🇧',
    items: [
      { name: 'Professional business suits', category: 'clothes', quantity: 3 },
      { name: 'Business shirts/blouses', category: 'clothes', quantity: 5 },
      { name: 'Professional shoes', category: 'clothes', quantity: 2 },
      { name: 'Weather-appropriate coat', category: 'clothes', quantity: 1 },
      { name: 'Umbrella', category: 'miscellaneous', quantity: 1 },
      { name: 'Laptop and accessories', category: 'electronics', quantity: 1 },
      { name: 'UK power adapter', category: 'electronics', quantity: 1 },
      { name: 'Business cards', category: 'documents', quantity: 100 },
      { name: 'Meeting materials', category: 'documents', quantity: 1 },
      { name: 'Client presentation files', category: 'electronics', quantity: 1 },
      { name: 'Professional portfolio', category: 'miscellaneous', quantity: 1 },
      { name: 'Business travel documents', category: 'documents', quantity: 1 },
      { name: 'Travel insurance', category: 'documents', quantity: 1 },
      { name: 'Client contact information', category: 'documents', quantity: 1 },
      { name: 'Professional accessories', category: 'miscellaneous', quantity: 3 },
      { name: 'Currency exchange', category: 'miscellaneous', quantity: 1 },
      { name: 'Transport cards for London', category: 'miscellaneous', quantity: 1 },
      { name: 'Professional grooming kit', category: 'toiletries', quantity: 1 },
      { name: 'Backup presentation materials', category: 'documents', quantity: 1 },
      { name: 'International phone plan', category: 'electronics', quantity: 1 },
      { name: 'Professional bag/briefcase', category: 'miscellaneous', quantity: 1 },
    ],
  },
  {
    id: 'medical-mission',
    name: 'Medical Mission Trip',
    description: 'Healthcare volunteer mission in developing region',
    destinationType: 'medical',
    season: 'all',
    duration: '7-14 days',
    icon: '⚕️',
    items: [
      { name: 'Medical scrubs', category: 'clothes', quantity: 6 },
      { name: 'Comfortable medical shoes', category: 'clothes', quantity: 2 },
      { name: 'Medical supplies', category: 'miscellaneous', quantity: 1 },
      { name: 'Stethoscope', category: 'miscellaneous', quantity: 1 },
      { name: 'Medical license documents', category: 'documents', quantity: 1 },
      { name: 'Vaccination records', category: 'documents', quantity: 1 },
      { name: 'Medical insurance', category: 'documents', quantity: 1 },
      { name: 'Antimalarial medication', category: 'toiletries', quantity: 1 },
      { name: 'First aid supplies', category: 'toiletries', quantity: 1 },
      { name: 'Hand sanitizer', category: 'toiletries', quantity: 5 },
      { name: 'Medical gloves', category: 'miscellaneous', quantity: 100 },
      { name: 'Face masks', category: 'miscellaneous', quantity: 50 },
      { name: 'Cultural appropriate clothing', category: 'clothes', quantity: 5 },
      { name: 'Work uniforms', category: 'clothes', quantity: 8 },
      { name: 'Medical reference books', category: 'miscellaneous', quantity: 2 },
      { name: 'Translation tools', category: 'electronics', quantity: 1 },
      { name: 'Emergency contact info', category: 'documents', quantity: 1 },
      { name: 'Mission organization docs', category: 'documents', quantity: 1 },
      { name: 'Personal medications', category: 'toiletries', quantity: 1 },
      { name: 'Portable medical kit', category: 'toiletries', quantity: 1 },
      { name: 'Documentation camera', category: 'electronics', quantity: 1 },
    ],
  },
  {
    id: 'archaeological-expedition',
    name: 'Archaeological Excavation',
    description: 'Field archaeology expedition with excavation work',
    destinationType: 'expedition',
    season: 'summer',
    duration: '14-21 days',
    icon: '🏺',
    items: [
      { name: 'Field work clothes', category: 'clothes', quantity: 10 },
      { name: 'Work boots', category: 'clothes', quantity: 1 },
      { name: 'Sun protection hat', category: 'clothes', quantity: 2 },
      { name: 'Work gloves', category: 'clothes', quantity: 4 },
      { name: 'Excavation tools', category: 'miscellaneous', quantity: 1 },
      { name: 'Field notebook', category: 'miscellaneous', quantity: 3 },
      { name: 'Documentation camera', category: 'electronics', quantity: 1 },
      { name: 'Measuring tools', category: 'miscellaneous', quantity: 1 },
      { name: 'Sample containers', category: 'miscellaneous', quantity: 20 },
      { name: 'Field guide books', category: 'miscellaneous', quantity: 2 },
      { name: 'Sunscreen high SPF', category: 'toiletries', quantity: 3 },
      { name: 'Insect repellent', category: 'toiletries', quantity: 2 },
      { name: 'First aid kit', category: 'toiletries', quantity: 1 },
      { name: 'Water purification', category: 'miscellaneous', quantity: 1 },
      { name: 'Field research permits', category: 'documents', quantity: 1 },
      { name: 'University documentation', category: 'documents', quantity: 1 },
      { name: 'Local guide contacts', category: 'documents', quantity: 1 },
      { name: 'Emergency evacuation plan', category: 'documents', quantity: 1 },
      { name: 'Portable generator', category: 'electronics', quantity: 1 },
      { name: 'Site mapping equipment', category: 'miscellaneous', quantity: 1 },
      { name: 'Preservation materials', category: 'miscellaneous', quantity: 1 },
    ],
  },
  {
    id: 'solo-backpacking-asia',
    name: 'Solo Backpacking Southeast Asia',
    description: 'Independent budget travel through multiple Asian countries',
    destinationType: 'backpacking',
    season: 'winter',
    duration: '30-60 days',
    icon: '🎒',
    items: [
      { name: 'Large backpack', category: 'miscellaneous', quantity: 1 },
      { name: 'Day pack', category: 'miscellaneous', quantity: 1 },
      { name: 'Quick-dry clothing', category: 'clothes', quantity: 12 },
      { name: 'Lightweight travel shoes', category: 'clothes', quantity: 2 },
      { name: 'Flip flops', category: 'clothes', quantity: 1 },
      { name: 'Travel towel', category: 'miscellaneous', quantity: 1 },
      { name: 'Mosquito net', category: 'miscellaneous', quantity: 1 },
      { name: 'Water purification tablets', category: 'miscellaneous', quantity: 100 },
      { name: 'First aid kit', category: 'toiletries', quantity: 1 },
      { name: 'Travel insurance documents', category: 'documents', quantity: 1 },
      { name: 'Multiple visa applications', category: 'documents', quantity: 1 },
      { name: 'Emergency contact information', category: 'documents', quantity: 1 },
      { name: 'Cash in multiple currencies', category: 'miscellaneous', quantity: 1 },
      { name: 'Portable phone charger', category: 'electronics', quantity: 2 },
      { name: 'Universal power adapter', category: 'electronics', quantity: 1 },
      { name: 'Lonely Planet guidebooks', category: 'miscellaneous', quantity: 3 },
      { name: 'Language phrase books', category: 'miscellaneous', quantity: 3 },
      { name: 'Padlocks for security', category: 'miscellaneous', quantity: 3 },
      { name: 'Money belt', category: 'miscellaneous', quantity: 1 },
      { name: 'Backup passport copies', category: 'documents', quantity: 3 },
      { name: 'Antimalarial medication', category: 'toiletries', quantity: 1 },
    ],
  },
  {
    id: 'extreme-sports-new-zealand',
    name: 'New Zealand Extreme Sports',
    description: 'Adrenaline-packed adventure sports in New Zealand',
    destinationType: 'extreme',
    season: 'summer',
    duration: '10-14 days',
    icon: '🪂',
    items: [
      { name: 'Adventure sports gear', category: 'miscellaneous', quantity: 1 },
      { name: 'Protective equipment', category: 'miscellaneous', quantity: 1 },
      { name: 'Action camera', category: 'electronics', quantity: 1 },
      { name: 'Waterproof cases', category: 'electronics', quantity: 3 },
      { name: 'Quick-dry athletic wear', category: 'clothes', quantity: 8 },
      { name: 'Multiple pairs of shoes', category: 'clothes', quantity: 4 },
      { name: 'Weather protection layers', category: 'clothes', quantity: 6 },
      { name: 'Activity booking confirmations', category: 'documents', quantity: 1 },
      { name: 'Medical clearance forms', category: 'documents', quantity: 1 },
      { name: 'Adventure insurance', category: 'documents', quantity: 1 },
      { name: 'Emergency contact information', category: 'documents', quantity: 1 },
      { name: 'First aid kit', category: 'toiletries', quantity: 1 },
      { name: 'Sunscreen high SPF', category: 'toiletries', quantity: 3 },
      { name: 'Energy supplements', category: 'miscellaneous', quantity: 10 },
      { name: 'Electrolyte drinks', category: 'miscellaneous', quantity: 10 },
      { name: 'Portable GPS device', category: 'electronics', quantity: 1 },
      { name: 'Emergency whistle', category: 'miscellaneous', quantity: 1 },
      { name: 'Backup phone charger', category: 'electronics', quantity: 2 },
      { name: 'Weather radio', category: 'electronics', quantity: 1 },
      { name: 'Personal locator beacon', category: 'electronics', quantity: 1 },
      { name: 'Recovery and rest gear', category: 'miscellaneous', quantity: 1 },
    ],
  },
  {
    id: 'scientific-research-antarctica',
    name: 'Antarctic Research Expedition',
    description: 'Scientific research mission in Antarctic conditions',
    destinationType: 'research',
    season: 'summer',
    duration: '30-90 days',
    icon: '🐧',
    items: [
      { name: 'Extreme cold weather gear', category: 'clothes', quantity: 1 },
      { name: 'Multiple insulation layers', category: 'clothes', quantity: 8 },
      { name: 'Specialized Antarctic boots', category: 'clothes', quantity: 2 },
      { name: 'Protective goggles', category: 'miscellaneous', quantity: 3 },
      { name: 'Scientific instruments', category: 'electronics', quantity: 1 },
      { name: 'Research documentation', category: 'documents', quantity: 1 },
      { name: 'Sample collection containers', category: 'miscellaneous', quantity: 50 },
      { name: 'Data recording equipment', category: 'electronics', quantity: 1 },
      { name: 'Satellite communication device', category: 'electronics', quantity: 1 },
      { name: 'Emergency survival kit', category: 'miscellaneous', quantity: 1 },
      { name: 'High-calorie food supplies', category: 'miscellaneous', quantity: 30 },
      { name: 'Water purification system', category: 'miscellaneous', quantity: 1 },
      { name: 'Extreme weather tent', category: 'miscellaneous', quantity: 1 },
      { name: 'Sleeping system rated to -40°F', category: 'miscellaneous', quantity: 1 },
      { name: 'Medical supplies', category: 'toiletries', quantity: 1 },
      { name: 'Expedition permits', category: 'documents', quantity: 1 },
      { name: 'Emergency evacuation plan', category: 'documents', quantity: 1 },
      { name: 'Research team contact info', category: 'documents', quantity: 1 },
      { name: 'Solar charging equipment', category: 'electronics', quantity: 1 },
      { name: 'Backup communication devices', category: 'electronics', quantity: 2 },
      { name: 'Environmental monitoring tools', category: 'electronics', quantity: 1 },
    ],
  },
  {
    id: 'luxury-train-journey',
    name: 'Luxury Train Experience',
    description: 'Elegant long-distance luxury train travel',
    destinationType: 'luxury',
    season: 'autumn',
    duration: '5-7 days',
    icon: '🚂',
    items: [
      { name: 'Formal evening attire', category: 'clothes', quantity: 3 },
      { name: 'Smart casual daywear', category: 'clothes', quantity: 5 },
      { name: 'Comfortable train clothing', category: 'clothes', quantity: 4 },
      { name: 'Elegant shoes', category: 'clothes', quantity: 2 },
      { name: 'Comfortable slippers', category: 'clothes', quantity: 1 },
      { name: 'Luxury toiletries', category: 'toiletries', quantity: 1 },
      { name: 'Reading materials', category: 'miscellaneous', quantity: 5 },
      { name: 'Travel journal', category: 'miscellaneous', quantity: 1 },
      { name: 'Camera for scenery', category: 'electronics', quantity: 1 },
      { name: 'Binoculars for landscape viewing', category: 'miscellaneous', quantity: 1 },
      { name: 'Train tickets and confirmations', category: 'documents', quantity: 1 },
      { name: 'Travel insurance', category: 'documents', quantity: 1 },
      { name: 'Formal accessories', category: 'miscellaneous', quantity: 4 },
      { name: 'Evening entertainment items', category: 'miscellaneous', quantity: 2 },
      { name: 'Portable charger', category: 'electronics', quantity: 1 },
      { name: 'Travel pillow', category: 'miscellaneous', quantity: 1 },
      { name: 'Eye mask and earplugs', category: 'miscellaneous', quantity: 1 },
      { name: 'Prescription medications', category: 'toiletries', quantity: 1 },
      { name: 'Currency for destinations', category: 'miscellaneous', quantity: 1 },
      { name: 'Cultural guides for stops', category: 'miscellaneous', quantity: 3 },
      { name: 'Personal care amenities', category: 'toiletries', quantity: 1 },
    ],
  },
  {
    id: 'winter-photography-lapland',
    name: 'Lapland Winter Photography',
    description: 'Aurora and winter landscape photography in Finnish Lapland',
    destinationType: 'photography',
    season: 'winter',
    duration: '7-10 days',
    icon: '📸',
    items: [
      { name: 'Professional camera body', category: 'electronics', quantity: 1 },
      { name: 'Wide-angle aurora lens', category: 'electronics', quantity: 1 },
      { name: 'Telephoto wildlife lens', category: 'electronics', quantity: 1 },
      { name: 'Sturdy carbon fiber tripod', category: 'electronics', quantity: 1 },
      { name: 'Intervalometer for timelapses', category: 'electronics', quantity: 1 },
      { name: 'Multiple memory cards', category: 'electronics', quantity: 6 },
      { name: 'Extra camera batteries', category: 'electronics', quantity: 12 },
      { name: 'Battery warming system', category: 'electronics', quantity: 1 },
      { name: 'Photography filters (ND, CPL)', category: 'electronics', quantity: 5 },
      { name: 'Lens cleaning supplies', category: 'electronics', quantity: 1 },
      { name: 'Waterproof camera bag', category: 'electronics', quantity: 1 },
      { name: 'Laptop for editing', category: 'electronics', quantity: 1 },
      { name: 'Portable hard drive', category: 'electronics', quantity: 1 },
      { name: 'Warm photography gloves', category: 'clothes', quantity: 2 },
      { name: 'Photographer\'s vest', category: 'clothes', quantity: 1 },
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
    description: 'Multi-week scientific expedition in Arctic wilderness',
    destinationType: 'expedition',
    season: 'summer',
    duration: '21-30 days',
    icon: '🧊',
    items: [
      { name: 'Expedition-grade cold weather gear', category: 'clothes', quantity: 1 },
      { name: 'Insulated research clothing', category: 'clothes', quantity: 8 },
      { name: 'Arctic expedition boots', category: 'clothes', quantity: 2 },
      { name: 'Protective face gear', category: 'clothes', quantity: 3 },
      { name: 'Research equipment', category: 'electronics', quantity: 1 },
      { name: 'Satellite communication system', category: 'electronics', quantity: 1 },
      { name: 'GPS navigation devices', category: 'electronics', quantity: 2 },
      { name: 'Emergency beacon', category: 'electronics', quantity: 1 },
      { name: 'Arctic survival kit', category: 'miscellaneous', quantity: 1 },
      { name: 'Ice core sampling tools', category: 'miscellaneous', quantity: 1 },
      { name: 'Scientific measuring instruments', category: 'electronics', quantity: 1 },
      { name: 'Data logging equipment', category: 'electronics', quantity: 1 },
      { name: 'Expedition tent system', category: 'miscellaneous', quantity: 1 },
      { name: 'Arctic sleeping system', category: 'miscellaneous', quantity: 1 },
      { name: 'Portable heating system', category: 'miscellaneous', quantity: 1 },
      { name: 'Food rations (30 days)', category: 'miscellaneous', quantity: 30 },
      { name: 'Water production system', category: 'miscellaneous', quantity: 1 },
      { name: 'Medical emergency kit', category: 'toiletries', quantity: 1 },
      { name: 'Research permits and documentation', category: 'documents', quantity: 1 },
      { name: 'Emergency evacuation plan', category: 'documents', quantity: 1 },
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
          economy: { weight: '23 kg', dimensions: '158 cm linear', fee: 'Varies' },
          business: { weight: '32 kg', dimensions: '158 cm linear', fee: 'Free' }
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
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDestination, setSelectedDestination] = useState('all');
  const [selectedSeason, setSelectedSeason] = useState('all');
  const [selectedTab, setSelectedTab] = useState('smart-lists');
  const [thoroughnessLevel, setThoroughnessLevel] = useState<'light' | 'balanced' | 'thorough'>('balanced');
  const [previewMode, setPreviewMode] = useState(false);
  const [selectedList, setSelectedList] = useState<PremadeList | null>(null);
  const [airlineSearch, setAirlineSearch] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setPreviewMode(false);
      setSelectedList(null);
    }
  }, [isOpen]);

  const getFilteredItems = (list: PremadeList) => {
    return list.items.filter(item => {
      if (thoroughnessLevel === 'light') {
        return item.essential !== false && item.thoroughnessLevel !== 'thorough';
      } else if (thoroughnessLevel === 'balanced') {
        return item.thoroughnessLevel !== 'thorough';
      }
      return true;
    });
  };

  const filteredLists = premadeLists.filter(list => {
    const matchesSearch = list.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         list.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDestination = selectedDestination === 'all' || list.destinationType === selectedDestination;
    const matchesSeason = selectedSeason === 'all' || list.season === selectedSeason || list.season === 'all';
    
    return matchesSearch && matchesDestination && matchesSeason;
  });

  const filteredAirlines = airlines.filter(airline =>
    airline.name.toLowerCase().includes(airlineSearch.toLowerCase()) ||
    airline.code.toLowerCase().includes(airlineSearch.toLowerCase())
  );

  const handleAddToTrip = (list: PremadeList) => {
    const items = getFilteredItems(list).map(item => ({
      id: `${list.id}-${item.name.replace(/\s+/g, '-').toLowerCase()}`,
      name: item.name,
      category: item.category,
      packed: false,
      quantity: item.quantity,
    }));
    onAddItems(items);
    onClose();
  };

  const handlePreviewList = (list: PremadeList) => {
    setSelectedList(list);
    setPreviewMode(true);
  };

  const destinations = [
    { value: 'all', label: 'All Destinations' },
    { value: 'beach', label: 'Beach' },
    { value: 'city', label: 'City' },
    { value: 'mountain', label: 'Mountain' },
    { value: 'adventure', label: 'Adventure' },
    { value: 'business', label: 'Business' },
    { value: 'family', label: 'Family' },
    { value: 'cruise', label: 'Cruise' },
    { value: 'luxury', label: 'Luxury' },
    { value: 'camping', label: 'Camping' },
  ];

  const seasons = [
    { value: 'all', label: 'All Seasons' },
    { value: 'spring', label: 'Spring' },
    { value: 'summer', label: 'Summer' },
    { value: 'autumn', label: 'Autumn' },
    { value: 'winter', label: 'Winter' },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-background rounded-2xl w-full max-w-5xl h-[90vh] flex flex-col shadow-2xl border border-border"
      >
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-primary to-primary/70 p-2 rounded-lg">
              <Sparkles className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Smart Packing Lists</h2>
              <p className="text-muted-foreground">Choose from expert-curated packing lists</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full hover:bg-muted"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="flex-1 flex flex-col">
            <div className="px-6 py-4 border-b border-border">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="smart-lists" className="flex items-center gap-2">
                  <Gift className="h-4 w-4" />
                  Smart Lists
                </TabsTrigger>
                <TabsTrigger value="airline-rules" className="flex items-center gap-2">
                  <Plane className="h-4 w-4" />
                  Airline Rules
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="smart-lists" className="flex-1 flex flex-col m-0">
              {!previewMode ? (
                <>
                  <div className="p-6 space-y-4 border-b border-border">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        placeholder="Search packing lists..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    
                    <Collapsible>
                      <CollapsibleTrigger asChild>
                        <Button variant="outline" className="w-full justify-between">
                          <span className="flex items-center gap-2">
                            <Zap className="h-4 w-4" />
                            Filters & Options
                          </span>
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="space-y-4 mt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium text-foreground mb-2 block">Destination Type</label>
                            <select
                              value={selectedDestination}
                              onChange={(e) => setSelectedDestination(e.target.value)}
                              className="w-full p-2 border border-border rounded-md bg-background text-foreground"
                            >
                              {destinations.map(dest => (
                                <option key={dest.value} value={dest.value}>{dest.label}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-foreground mb-2 block">Season</label>
                            <select
                              value={selectedSeason}
                              onChange={(e) => setSelectedSeason(e.target.value)}
                              className="w-full p-2 border border-border rounded-md bg-background text-foreground"
                            >
                              {seasons.map(season => (
                                <option key={season.value} value={season.value}>{season.label}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium text-foreground mb-2 block">Thoroughness Level</label>
                          <div className="grid grid-cols-3 gap-2">
                            {(['light', 'balanced', 'thorough'] as const).map((level) => (
                              <Button
                                key={level}
                                variant={thoroughnessLevel === level ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setThoroughnessLevel(level)}
                                className="capitalize"
                              >
                                {level}
                              </Button>
                            ))}
                          </div>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </div>

                  <ScrollArea className="flex-1">
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredLists.map((list) => (
                          <motion.div
                            key={list.id}
                            whileHover={{ scale: 1.02 }}
                            className="bg-card rounded-xl p-4 border border-border hover:shadow-lg transition-all duration-200 cursor-pointer"
                            onClick={() => handlePreviewList(list)}
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div className="text-2xl">{list.icon}</div>
                              <div className="flex flex-col gap-1">
                                {list.season && (
                                  <Badge variant="secondary" className="text-xs">
                                    <Thermometer className="h-3 w-3 mr-1" />
                                    {list.season}
                                  </Badge>
                                )}
                                {list.duration && (
                                  <Badge variant="outline" className="text-xs">
                                    <Calendar className="h-3 w-3 mr-1" />
                                    {list.duration}
                                  </Badge>
                                )}
                              </div>
                            </div>
                            
                            <h3 className="font-semibold text-card-foreground mb-2 line-clamp-1">{list.name}</h3>
                            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{list.description}</p>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Package className="h-4 w-4" />
                                <span>{getFilteredItems(list).length} items</span>
                              </div>
                              <Button
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleAddToTrip(list);
                                }}
                                className="bg-primary hover:bg-primary/90"
                              >
                                Add to Trip
                              </Button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                      
                      {filteredLists.length === 0 && (
                        <div className="text-center py-12">
                          <div className="bg-muted rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                            <Search className="h-8 w-8 text-muted-foreground" />
                          </div>
                          <h3 className="text-lg font-medium text-foreground mb-2">No lists found</h3>
                          <p className="text-muted-foreground">Try adjusting your search criteria</p>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </>
              ) : null}
            </TabsContent>

            <TabsContent value="airline-rules" className="flex-1 flex flex-col m-0">
              <div className="p-6 border-b border-border">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search airlines..."
                    value={airlineSearch}
                    onChange={(e) => setAirlineSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <ScrollArea className="flex-1">
                <div className="p-6 space-y-4">
                  {filteredAirlines.map((airline) => (
                    <Collapsible key={airline.id}>
                      <CollapsibleTrigger asChild>
                        <div className="bg-card rounded-xl p-4 border border-border hover:shadow-md transition-all duration-200 cursor-pointer w-full">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="bg-primary/10 p-2 rounded-lg">
                                <Plane className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-card-foreground">{airline.name}</h3>
                                <p className="text-sm text-muted-foreground">Code: {airline.code}</p>
                              </div>
                            </div>
                            <ChevronDown className="h-5 w-5 text-muted-foreground" />
                          </div>
                        </div>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="mt-4 ml-4 space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-muted/50 rounded-lg p-4">
                              <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                                <Car className="h-4 w-4" />
                                Carry-On Allowance
                              </h4>
                              <div className="space-y-2 text-sm">
                                <div>
                                  <span className="font-medium">Domestic:</span> {airline.baggage.carryOn.domestic.weight}, {airline.baggage.carryOn.domestic.dimensions}
                                </div>
                                <div>
                                  <span className="font-medium">International:</span> {airline.baggage.carryOn.international.weight}, {airline.baggage.carryOn.international.dimensions}
                                </div>
                              </div>
                            </div>
                            
                            <div className="bg-muted/50 rounded-lg p-4">
                              <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                                <Package className="h-4 w-4" />
                                Checked Baggage
                              </h4>
                              <div className="space-y-3 text-sm">
                                <div>
                                  <span className="font-medium block mb-1">Domestic:</span>
                                  <div className="ml-2 space-y-1">
                                    <div>Economy: {airline.baggage.checked.domestic.economy.weight}, {airline.baggage.checked.domestic.economy.fee}</div>
                                    <div>Business: {airline.baggage.checked.domestic.business.weight}, {airline.baggage.checked.domestic.business.fee}</div>
                                  </div>
                                </div>
                                <div>
                                  <span className="font-medium block mb-1">International:</span>
                                  <div className="ml-2 space-y-1">
                                    <div>Economy: {airline.baggage.checked.international.economy.weight}, {airline.baggage.checked.international.economy.fee}</div>
                                    <div>Business: {airline.baggage.checked.international.business.weight}, {airline.baggage.checked.international.business.fee}</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  ))}
                  
                  {filteredAirlines.length === 0 && (
                    <div className="text-center py-12">
                      <div className="bg-muted rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                        <Plane className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-medium text-foreground mb-2">No airlines found</h3>
                      <p className="text-muted-foreground">Try adjusting your search terms</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>

        {previewMode && selectedList && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-background rounded-2xl w-full max-w-3xl max-h-[80vh] flex flex-col shadow-2xl border border-border"
            >
              <div className="flex items-center justify-between p-6 border-b border-border">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{selectedList.icon}</span>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{selectedList.name}</h3>
                    <p className="text-muted-foreground">{selectedList.description}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setPreviewMode(false)}
                  className="rounded-full hover:bg-muted"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <ScrollArea className="flex-1 p-6">
                <div className="space-y-4">
                  {getFilteredItems(selectedList).map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-lg">
                          <Package className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <span className="font-medium text-foreground">{item.name}</span>
                          <p className="text-sm text-muted-foreground capitalize">{item.category}</p>
                        </div>
                      </div>
                      <Badge variant="outline">×{item.quantity}</Badge>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="p-6 border-t border-border">
                <div className="flex gap-3">
                  <Button
                    onClick={() => {
                      handleAddToTrip(selectedList);
                      setPreviewMode(false);
                    }}
                    className="flex-1 bg-primary hover:bg-primary/90"
                  >
                    Add All Items to Trip
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setPreviewMode(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </motion.div>
    </div>
  );
};