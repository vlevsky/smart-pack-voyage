import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Plane, AlertTriangle, DollarSign, Ruler, Weight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';

interface LuggageLimitsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Baggage {
  type: 'carry-on' | 'personal' | 'checked';
  dimensions: {
    inches: string;
    cm: string;
  };
  weight: {
    lbs: number;
    kg: number;
  };
  fee?: {
    domestic: number;
    international: number;
  };
  notes?: string;
}

interface AirlineData {
  name: string;
  code: string;
  logo: string;
  baggage: {
    [key in 'economy' | 'premium' | 'business' | 'first']?: {
      'carry-on': Baggage;
      personal: Baggage;
      checked: Baggage[];
    };
  };
}

const airlines: AirlineData[] = [
  // US Major Airlines
  {
    name: 'Delta Air Lines',
    code: 'DL',
    logo: '✈️',
    baggage: {
      economy: {
        'carry-on': { type: 'carry-on', dimensions: { inches: '22 x 14 x 9', cm: '56 x 35 x 23' }, weight: { lbs: 50, kg: 23 } },
        personal: { type: 'personal', dimensions: { inches: '18 x 14 x 8', cm: '45 x 35 x 20' }, weight: { lbs: 22, kg: 10 } },
        checked: [{ type: 'checked', dimensions: { inches: '62 linear', cm: '158 linear' }, weight: { lbs: 50, kg: 23 }, fee: { domestic: 30, international: 60 } }],
      },
      business: {
        'carry-on': { type: 'carry-on', dimensions: { inches: '22 x 14 x 9', cm: '56 x 35 x 23' }, weight: { lbs: 50, kg: 23 } },
        personal: { type: 'personal', dimensions: { inches: '18 x 14 x 8', cm: '45 x 35 x 20' }, weight: { lbs: 22, kg: 10 } },
        checked: [{ type: 'checked', dimensions: { inches: '62 linear', cm: '158 linear' }, weight: { lbs: 70, kg: 32 }, fee: { domestic: 0, international: 0 } }],
      },
    },
  },
  {
    name: 'United Airlines',
    code: 'UA',
    logo: '✈️',
    baggage: {
      economy: {
        'carry-on': { type: 'carry-on', dimensions: { inches: '22 x 14 x 9', cm: '56 x 35 x 23' }, weight: { lbs: 0, kg: 0 } },
        personal: { type: 'personal', dimensions: { inches: '17 x 10 x 9', cm: '43 x 25 x 23' }, weight: { lbs: 0, kg: 0 } },
        checked: [{ type: 'checked', dimensions: { inches: '62 linear', cm: '158 linear' }, weight: { lbs: 50, kg: 23 }, fee: { domestic: 30, international: 75 } }],
      },
      business: {
        'carry-on': { type: 'carry-on', dimensions: { inches: '22 x 14 x 9', cm: '56 x 35 x 23' }, weight: { lbs: 0, kg: 0 } },
        personal: { type: 'personal', dimensions: { inches: '17 x 10 x 9', cm: '43 x 25 x 23' }, weight: { lbs: 0, kg: 0 } },
        checked: [{ type: 'checked', dimensions: { inches: '62 linear', cm: '158 linear' }, weight: { lbs: 70, kg: 32 }, fee: { domestic: 0, international: 0 } }],
      },
    },
  },
  {
    name: 'American Airlines',
    code: 'AA',
    logo: '✈️',
    baggage: {
      economy: {
        'carry-on': { type: 'carry-on', dimensions: { inches: '22 x 14 x 9', cm: '56 x 35 x 23' }, weight: { lbs: 0, kg: 0 } },
        personal: { type: 'personal', dimensions: { inches: '18 x 14 x 8', cm: '45 x 35 x 20' }, weight: { lbs: 0, kg: 0 } },
        checked: [{ type: 'checked', dimensions: { inches: '62 linear', cm: '158 linear' }, weight: { lbs: 50, kg: 23 }, fee: { domestic: 30, international: 75 } }],
      },
      business: {
        'carry-on': { type: 'carry-on', dimensions: { inches: '22 x 14 x 9', cm: '56 x 35 x 23' }, weight: { lbs: 0, kg: 0 } },
        personal: { type: 'personal', dimensions: { inches: '18 x 14 x 8', cm: '45 x 35 x 20' }, weight: { lbs: 0, kg: 0 } },
        checked: [{ type: 'checked', dimensions: { inches: '62 linear', cm: '158 linear' }, weight: { lbs: 70, kg: 32 }, fee: { domestic: 0, international: 0 } }],
      },
    },
  },
  { name: 'Southwest Airlines', code: 'WN', logo: '✈️', baggage: { economy: { 'carry-on': { type: 'carry-on', dimensions: { inches: '24 x 16 x 10', cm: '61 x 41 x 28' }, weight: { lbs: 0, kg: 0 } }, personal: { type: 'personal', dimensions: { inches: '18.5 x 8.5 x 13.5', cm: '47 x 22 x 34' }, weight: { lbs: 0, kg: 0 } }, checked: [{ type: 'checked', dimensions: { inches: '62 linear', cm: '158 linear' }, weight: { lbs: 50, kg: 23 }, fee: { domestic: 0, international: 0 } }] } } },
  { name: 'JetBlue', code: 'B6', logo: '✈️', baggage: { economy: { 'carry-on': { type: 'carry-on', dimensions: { inches: '22 x 14 x 9', cm: '55.8 x 35.5 x 22.8' }, weight: { lbs: 0, kg: 0 } }, personal: { type: 'personal', dimensions: { inches: '17 x 13 x 8', cm: '43.2 x 33 x 20.3' }, weight: { lbs: 0, kg: 0 } }, checked: [{ type: 'checked', dimensions: { inches: '62 linear', cm: '157.5 linear' }, weight: { lbs: 50, kg: 23 }, fee: { domestic: 35, international: 60 } }] } } },
  { name: 'Alaska Airlines', code: 'AS', logo: '✈️', baggage: { economy: { 'carry-on': { type: 'carry-on', dimensions: { inches: '22 x 14 x 9', cm: '56 x 36 x 23' }, weight: { lbs: 0, kg: 0 } }, personal: { type: 'personal', dimensions: { inches: '17 x 13 x 6', cm: '43 x 33 x 15' }, weight: { lbs: 0, kg: 0 } }, checked: [{ type: 'checked', dimensions: { inches: '62 linear', cm: '158 linear' }, weight: { lbs: 50, kg: 23 }, fee: { domestic: 30, international: 75 } }] } } },
  { name: 'Spirit Airlines', code: 'NK', logo: '✈️', baggage: { economy: { 'carry-on': { type: 'carry-on', dimensions: { inches: '22 x 18 x 10', cm: '56 x 46 x 25' }, weight: { lbs: 40, kg: 18 } }, personal: { type: 'personal', dimensions: { inches: '18 x 14 x 8', cm: '46 x 36 x 20' }, weight: { lbs: 0, kg: 0 } }, checked: [{ type: 'checked', dimensions: { inches: '62 linear', cm: '158 linear' }, weight: { lbs: 40, kg: 18 }, fee: { domestic: 45, international: 65 } }] } } },
  { name: 'Frontier Airlines', code: 'F9', logo: '✈️', baggage: { economy: { 'carry-on': { type: 'carry-on', dimensions: { inches: '24 x 16 x 10', cm: '61 x 41 x 25' }, weight: { lbs: 35, kg: 16 } }, personal: { type: 'personal', dimensions: { inches: '18 x 14 x 8', cm: '46 x 36 x 20' }, weight: { lbs: 0, kg: 0 } }, checked: [{ type: 'checked', dimensions: { inches: '62 linear', cm: '158 linear' }, weight: { lbs: 50, kg: 23 }, fee: { domestic: 39, international: 75 } }] } } },

  // International Airlines
  { name: 'British Airways', code: 'BA', logo: '🇬🇧', baggage: { economy: { 'carry-on': { type: 'carry-on', dimensions: { inches: '22 x 18 x 10', cm: '56 x 45 x 25' }, weight: { lbs: 51, kg: 23 } }, personal: { type: 'personal', dimensions: { inches: '16 x 12 x 6', cm: '40 x 30 x 15' }, weight: { lbs: 0, kg: 0 } }, checked: [{ type: 'checked', dimensions: { inches: '62 linear', cm: '158 linear' }, weight: { lbs: 51, kg: 23 }, fee: { domestic: 75, international: 100 } }] } } },
  { name: 'Lufthansa', code: 'LH', logo: '🇩🇪', baggage: { economy: { 'carry-on': { type: 'carry-on', dimensions: { inches: '22 x 16 x 9', cm: '55 x 40 x 23' }, weight: { lbs: 18, kg: 8 } }, personal: { type: 'personal', dimensions: { inches: '16 x 12 x 6', cm: '40 x 30 x 15' }, weight: { lbs: 0, kg: 0 } }, checked: [{ type: 'checked', dimensions: { inches: '62 linear', cm: '158 linear' }, weight: { lbs: 51, kg: 23 }, fee: { domestic: 60, international: 80 } }] } } },
  { name: 'Air France', code: 'AF', logo: '🇫🇷', baggage: { economy: { 'carry-on': { type: 'carry-on', dimensions: { inches: '22 x 14 x 9', cm: '55 x 35 x 25' }, weight: { lbs: 26, kg: 12 } }, personal: { type: 'personal', dimensions: { inches: '16 x 12 x 6', cm: '40 x 30 x 15' }, weight: { lbs: 0, kg: 0 } }, checked: [{ type: 'checked', dimensions: { inches: '62 linear', cm: '158 linear' }, weight: { lbs: 51, kg: 23 }, fee: { domestic: 70, international: 90 } }] } } },
  { name: 'KLM', code: 'KL', logo: '🇳🇱', baggage: { economy: { 'carry-on': { type: 'carry-on', dimensions: { inches: '22 x 14 x 9', cm: '55 x 35 x 25' }, weight: { lbs: 26, kg: 12 } }, personal: { type: 'personal', dimensions: { inches: '16 x 12 x 6', cm: '40 x 30 x 15' }, weight: { lbs: 0, kg: 0 } }, checked: [{ type: 'checked', dimensions: { inches: '62 linear', cm: '158 linear' }, weight: { lbs: 51, kg: 23 }, fee: { domestic: 70, international: 90 } }] } } },
  { name: 'Emirates', code: 'EK', logo: '🇦🇪', baggage: { economy: { 'carry-on': { type: 'carry-on', dimensions: { inches: '22 x 15 x 8', cm: '55 x 38 x 21' }, weight: { lbs: 15, kg: 7 } }, personal: { type: 'personal', dimensions: { inches: '18 x 14 x 8', cm: '45 x 35 x 20' }, weight: { lbs: 0, kg: 0 } }, checked: [{ type: 'checked', dimensions: { inches: '62 linear', cm: '158 linear' }, weight: { lbs: 51, kg: 23 }, fee: { domestic: 0, international: 0 } }] } } },
  { name: 'Qatar Airways', code: 'QR', logo: '🇶🇦', baggage: { economy: { 'carry-on': { type: 'carry-on', dimensions: { inches: '22 x 16 x 10', cm: '55 x 37 x 25' }, weight: { lbs: 15, kg: 7 } }, personal: { type: 'personal', dimensions: { inches: '16 x 12 x 6', cm: '40 x 30 x 15' }, weight: { lbs: 0, kg: 0 } }, checked: [{ type: 'checked', dimensions: { inches: '62 linear', cm: '158 linear' }, weight: { lbs: 51, kg: 23 }, fee: { domestic: 0, international: 0 } }] } } },
  { name: 'Singapore Airlines', code: 'SQ', logo: '🇸🇬', baggage: { economy: { 'carry-on': { type: 'carry-on', dimensions: { inches: '22 x 16 x 9', cm: '55 x 40 x 23' }, weight: { lbs: 15, kg: 7 } }, personal: { type: 'personal', dimensions: { inches: '16 x 12 x 6', cm: '40 x 30 x 15' }, weight: { lbs: 0, kg: 0 } }, checked: [{ type: 'checked', dimensions: { inches: '62 linear', cm: '158 linear' }, weight: { lbs: 51, kg: 23 }, fee: { domestic: 0, international: 0 } }] } } },
  { name: 'Japan Airlines', code: 'JL', logo: '🇯🇵', baggage: { economy: { 'carry-on': { type: 'carry-on', dimensions: { inches: '22 x 16 x 10', cm: '55 x 40 x 25' }, weight: { lbs: 22, kg: 10 } }, personal: { type: 'personal', dimensions: { inches: '17 x 13 x 7', cm: '43 x 33 x 18' }, weight: { lbs: 0, kg: 0 } }, checked: [{ type: 'checked', dimensions: { inches: '62 linear', cm: '158 linear' }, weight: { lbs: 51, kg: 23 }, fee: { domestic: 0, international: 0 } }] } } },
  { name: 'ANA', code: 'NH', logo: '🇯🇵', baggage: { economy: { 'carry-on': { type: 'carry-on', dimensions: { inches: '22 x 16 x 10', cm: '55 x 40 x 25' }, weight: { lbs: 22, kg: 10 } }, personal: { type: 'personal', dimensions: { inches: '17 x 13 x 7', cm: '43 x 33 x 18' }, weight: { lbs: 0, kg: 0 } }, checked: [{ type: 'checked', dimensions: { inches: '62 linear', cm: '158 linear' }, weight: { lbs: 51, kg: 23 }, fee: { domestic: 0, international: 0 } }] } } },
  { name: 'Cathay Pacific', code: 'CX', logo: '🇭🇰', baggage: { economy: { 'carry-on': { type: 'carry-on', dimensions: { inches: '22 x 14 x 9', cm: '56 x 36 x 23' }, weight: { lbs: 15, kg: 7 } }, personal: { type: 'personal', dimensions: { inches: '16 x 12 x 6', cm: '40 x 30 x 15' }, weight: { lbs: 0, kg: 0 } }, checked: [{ type: 'checked', dimensions: { inches: '62 linear', cm: '158 linear' }, weight: { lbs: 51, kg: 23 }, fee: { domestic: 0, international: 0 } }] } } },

  // More Airlines (continuing to reach 50+)
  { name: 'Turkish Airlines', code: 'TK', logo: '🇹🇷', baggage: { economy: { 'carry-on': { type: 'carry-on', dimensions: { inches: '22 x 16 x 9', cm: '55 x 40 x 23' }, weight: { lbs: 18, kg: 8 } }, personal: { type: 'personal', dimensions: { inches: '16 x 12 x 6', cm: '40 x 30 x 15' }, weight: { lbs: 0, kg: 0 } }, checked: [{ type: 'checked', dimensions: { inches: '62 linear', cm: '158 linear' }, weight: { lbs: 51, kg: 23 }, fee: { domestic: 0, international: 0 } }] } } },
  { name: 'Swiss International', code: 'LX', logo: '🇨🇭', baggage: { economy: { 'carry-on': { type: 'carry-on', dimensions: { inches: '22 x 16 x 9', cm: '55 x 40 x 23' }, weight: { lbs: 18, kg: 8 } }, personal: { type: 'personal', dimensions: { inches: '16 x 12 x 6', cm: '40 x 30 x 15' }, weight: { lbs: 0, kg: 0 } }, checked: [{ type: 'checked', dimensions: { inches: '62 linear', cm: '158 linear' }, weight: { lbs: 51, kg: 23 }, fee: { domestic: 60, international: 80 } }] } } },
  { name: 'Austrian Airlines', code: 'OS', logo: '🇦🇹', baggage: { economy: { 'carry-on': { type: 'carry-on', dimensions: { inches: '22 x 16 x 9', cm: '55 x 40 x 23' }, weight: { lbs: 18, kg: 8 } }, personal: { type: 'personal', dimensions: { inches: '16 x 12 x 6', cm: '40 x 30 x 15' }, weight: { lbs: 0, kg: 0 } }, checked: [{ type: 'checked', dimensions: { inches: '62 linear', cm: '158 linear' }, weight: { lbs: 51, kg: 23 }, fee: { domestic: 60, international: 80 } }] } } },
  { name: 'Scandinavian Airlines', code: 'SK', logo: '🇸🇪', baggage: { economy: { 'carry-on': { type: 'carry-on', dimensions: { inches: '22 x 16 x 9', cm: '55 x 40 x 23' }, weight: { lbs: 18, kg: 8 } }, personal: { type: 'personal', dimensions: { inches: '16 x 12 x 6', cm: '40 x 30 x 15' }, weight: { lbs: 0, kg: 0 } }, checked: [{ type: 'checked', dimensions: { inches: '62 linear', cm: '158 linear' }, weight: { lbs: 51, kg: 23 }, fee: { domestic: 70, international: 90 } }] } } },
  { name: 'Air Canada', code: 'AC', logo: '🇨🇦', baggage: { economy: { 'carry-on': { type: 'carry-on', dimensions: { inches: '22 x 14 x 9', cm: '56 x 35 x 23' }, weight: { lbs: 22, kg: 10 } }, personal: { type: 'personal', dimensions: { inches: '16 x 13 x 6', cm: '41 x 33 x 15' }, weight: { lbs: 0, kg: 0 } }, checked: [{ type: 'checked', dimensions: { inches: '62 linear', cm: '158 linear' }, weight: { lbs: 50, kg: 23 }, fee: { domestic: 30, international: 70 } }] } } },
  { name: 'WestJet', code: 'WS', logo: '🇨🇦', baggage: { economy: { 'carry-on': { type: 'carry-on', dimensions: { inches: '22 x 14 x 9', cm: '56 x 35 x 23' }, weight: { lbs: 22, kg: 10 } }, personal: { type: 'personal', dimensions: { inches: '16 x 13 x 6', cm: '41 x 33 x 15' }, weight: { lbs: 0, kg: 0 } }, checked: [{ type: 'checked', dimensions: { inches: '62 linear', cm: '158 linear' }, weight: { lbs: 50, kg: 23 }, fee: { domestic: 29, international: 65 } }] } } },
  { name: 'Qantas', code: 'QF', logo: '🇦🇺', baggage: { economy: { 'carry-on': { type: 'carry-on', dimensions: { inches: '22 x 14 x 9', cm: '56 x 36 x 23' }, weight: { lbs: 15, kg: 7 } }, personal: { type: 'personal', dimensions: { inches: '17 x 13 x 8', cm: '43 x 33 x 20' }, weight: { lbs: 0, kg: 0 } }, checked: [{ type: 'checked', dimensions: { inches: '62 linear', cm: '158 linear' }, weight: { lbs: 51, kg: 23 }, fee: { domestic: 0, international: 0 } }] } } },
  { name: 'Virgin Australia', code: 'VA', logo: '🇦🇺', baggage: { economy: { 'carry-on': { type: 'carry-on', dimensions: { inches: '22 x 14 x 9', cm: '56 x 36 x 23' }, weight: { lbs: 15, kg: 7 } }, personal: { type: 'personal', dimensions: { inches: '17 x 13 x 8', cm: '43 x 33 x 20' }, weight: { lbs: 0, kg: 0 } }, checked: [{ type: 'checked', dimensions: { inches: '62 linear', cm: '158 linear' }, weight: { lbs: 51, kg: 23 }, fee: { domestic: 35, international: 65 } }] } } },
  { name: 'Air New Zealand', code: 'NZ', logo: '🇳🇿', baggage: { economy: { 'carry-on': { type: 'carry-on', dimensions: { inches: '22 x 14 x 10', cm: '56 x 35 x 25' }, weight: { lbs: 15, kg: 7 } }, personal: { type: 'personal', dimensions: { inches: '16 x 12 x 8', cm: '40 x 30 x 20' }, weight: { lbs: 0, kg: 0 } }, checked: [{ type: 'checked', dimensions: { inches: '62 linear', cm: '158 linear' }, weight: { lbs: 51, kg: 23 }, fee: { domestic: 0, international: 0 } }] } } },

  // Asian Airlines
  { name: 'Korean Air', code: 'KE', logo: '🇰🇷', baggage: { economy: { 'carry-on': { type: 'carry-on', dimensions: { inches: '22 x 16 x 10', cm: '55 x 40 x 25' }, weight: { lbs: 26, kg: 12 } }, personal: { type: 'personal', dimensions: { inches: '17 x 13 x 8', cm: '43 x 33 x 20' }, weight: { lbs: 0, kg: 0 } }, checked: [{ type: 'checked', dimensions: { inches: '62 linear', cm: '158 linear' }, weight: { lbs: 51, kg: 23 }, fee: { domestic: 0, international: 0 } }] } } },
  { name: 'Asiana Airlines', code: 'OZ', logo: '🇰🇷', baggage: { economy: { 'carry-on': { type: 'carry-on', dimensions: { inches: '22 x 16 x 10', cm: '55 x 40 x 25' }, weight: { lbs: 22, kg: 10 } }, personal: { type: 'personal', dimensions: { inches: '17 x 13 x 8', cm: '43 x 33 x 20' }, weight: { lbs: 0, kg: 0 } }, checked: [{ type: 'checked', dimensions: { inches: '62 linear', cm: '158 linear' }, weight: { lbs: 51, kg: 23 }, fee: { domestic: 0, international: 0 } }] } } },
  { name: 'Thai Airways', code: 'TG', logo: '🇹🇭', baggage: { economy: { 'carry-on': { type: 'carry-on', dimensions: { inches: '22 x 16 x 9', cm: '56 x 40 x 23' }, weight: { lbs: 15, kg: 7 } }, personal: { type: 'personal', dimensions: { inches: '16 x 12 x 8', cm: '40 x 30 x 20' }, weight: { lbs: 0, kg: 0 } }, checked: [{ type: 'checked', dimensions: { inches: '62 linear', cm: '158 linear' }, weight: { lbs: 66, kg: 30 }, fee: { domestic: 0, international: 0 } }] } } },
  { name: 'Malaysia Airlines', code: 'MH', logo: '🇲🇾', baggage: { economy: { 'carry-on': { type: 'carry-on', dimensions: { inches: '22 x 14 x 9', cm: '56 x 36 x 23' }, weight: { lbs: 15, kg: 7 } }, personal: { type: 'personal', dimensions: { inches: '16 x 12 x 8', cm: '40 x 30 x 20' }, weight: { lbs: 0, kg: 0 } }, checked: [{ type: 'checked', dimensions: { inches: '62 linear', cm: '158 linear' }, weight: { lbs: 66, kg: 30 }, fee: { domestic: 0, international: 0 } }] } } },
  { name: 'Vietnam Airlines', code: 'VN', logo: '🇻🇳', baggage: { economy: { 'carry-on': { type: 'carry-on', dimensions: { inches: '22 x 16 x 9', cm: '56 x 40 x 23' }, weight: { lbs: 15, kg: 7 } }, personal: { type: 'personal', dimensions: { inches: '16 x 12 x 8', cm: '40 x 30 x 20' }, weight: { lbs: 0, kg: 0 } }, checked: [{ type: 'checked', dimensions: { inches: '62 linear', cm: '158 linear' }, weight: { lbs: 51, kg: 23 }, fee: { domestic: 0, international: 0 } }] } } },
  { name: 'Philippine Airlines', code: 'PR', logo: '🇵🇭', baggage: { economy: { 'carry-on': { type: 'carry-on', dimensions: { inches: '22 x 14 x 9', cm: '56 x 36 x 23' }, weight: { lbs: 15, kg: 7 } }, personal: { type: 'personal', dimensions: { inches: '14 x 10 x 6', cm: '35 x 25 x 15' }, weight: { lbs: 0, kg: 0 } }, checked: [{ type: 'checked', dimensions: { inches: '62 linear', cm: '158 linear' }, weight: { lbs: 51, kg: 23 }, fee: { domestic: 20, international: 50 } }] } } },
  { name: 'China Eastern', code: 'MU', logo: '🇨🇳', baggage: { economy: { 'carry-on': { type: 'carry-on', dimensions: { inches: '22 x 16 x 9', cm: '55 x 40 x 23' }, weight: { lbs: 22, kg: 10 } }, personal: { type: 'personal', dimensions: { inches: '16 x 12 x 8', cm: '40 x 30 x 20' }, weight: { lbs: 0, kg: 0 } }, checked: [{ type: 'checked', dimensions: { inches: '62 linear', cm: '158 linear' }, weight: { lbs: 51, kg: 23 }, fee: { domestic: 0, international: 0 } }] } } },
  { name: 'China Southern', code: 'CZ', logo: '🇨🇳', baggage: { economy: { 'carry-on': { type: 'carry-on', dimensions: { inches: '22 x 16 x 9', cm: '55 x 40 x 23' }, weight: { lbs: 11, kg: 5 } }, personal: { type: 'personal', dimensions: { inches: '16 x 12 x 8', cm: '40 x 30 x 20' }, weight: { lbs: 0, kg: 0 } }, checked: [{ type: 'checked', dimensions: { inches: '62 linear', cm: '158 linear' }, weight: { lbs: 51, kg: 23 }, fee: { domestic: 0, international: 0 } }] } } },
  { name: 'Air China', code: 'CA', logo: '🇨🇳', baggage: { economy: { 'carry-on': { type: 'carry-on', dimensions: { inches: '22 x 16 x 9', cm: '55 x 40 x 23' }, weight: { lbs: 11, kg: 5 } }, personal: { type: 'personal', dimensions: { inches: '16 x 12 x 8', cm: '40 x 30 x 20' }, weight: { lbs: 0, kg: 0 } }, checked: [{ type: 'checked', dimensions: { inches: '62 linear', cm: '158 linear' }, weight: { lbs: 51, kg: 23 }, fee: { domestic: 0, international: 0 } }] } } },

  // Latin American Airlines
  { name: 'LATAM Airlines', code: 'LA', logo: '🇨🇱', baggage: { economy: { 'carry-on': { type: 'carry-on', dimensions: { inches: '22 x 16 x 9', cm: '55 x 40 x 23' }, weight: { lbs: 22, kg: 10 } }, personal: { type: 'personal', dimensions: { inches: '17 x 13 x 6', cm: '43 x 33 x 16' }, weight: { lbs: 0, kg: 0 } }, checked: [{ type: 'checked', dimensions: { inches: '62 linear', cm: '158 linear' }, weight: { lbs: 51, kg: 23 }, fee: { domestic: 25, international: 70 } }] } } },
  { name: 'Copa Airlines', code: 'CM', logo: '🇵🇦', baggage: { economy: { 'carry-on': { type: 'carry-on', dimensions: { inches: '22 x 14 x 9', cm: '56 x 35 x 23' }, weight: { lbs: 22, kg: 10 } }, personal: { type: 'personal', dimensions: { inches: '18 x 14 x 8', cm: '45 x 35 x 20' }, weight: { lbs: 0, kg: 0 } }, checked: [{ type: 'checked', dimensions: { inches: '62 linear', cm: '158 linear' }, weight: { lbs: 50, kg: 23 }, fee: { domestic: 30, international: 60 } }] } } },
  { name: 'Avianca', code: 'AV', logo: '🇨🇴', baggage: { economy: { 'carry-on': { type: 'carry-on', dimensions: { inches: '22 x 14 x 9', cm: '55 x 35 x 25' }, weight: { lbs: 22, kg: 10 } }, personal: { type: 'personal', dimensions: { inches: '18 x 13 x 8', cm: '45 x 33 x 20' }, weight: { lbs: 0, kg: 0 } }, checked: [{ type: 'checked', dimensions: { inches: '62 linear', cm: '158 linear' }, weight: { lbs: 50, kg: 23 }, fee: { domestic: 35, international: 70 } }] } } },
  { name: 'Aeromexico', code: 'AM', logo: '🇲🇽', baggage: { economy: { 'carry-on': { type: 'carry-on', dimensions: { inches: '22 x 14 x 9', cm: '55 x 40 x 25' }, weight: { lbs: 22, kg: 10 } }, personal: { type: 'personal', dimensions: { inches: '16 x 12 x 8', cm: '40 x 30 x 20' }, weight: { lbs: 0, kg: 0 } }, checked: [{ type: 'checked', dimensions: { inches: '62 linear', cm: '158 linear' }, weight: { lbs: 55, kg: 25 }, fee: { domestic: 25, international: 60 } }] } } },

  // African Airlines  
  { name: 'South African Airways', code: 'SA', logo: '🇿🇦', baggage: { economy: { 'carry-on': { type: 'carry-on', dimensions: { inches: '22 x 14 x 9', cm: '56 x 36 x 23' }, weight: { lbs: 18, kg: 8 } }, personal: { type: 'personal', dimensions: { inches: '16 x 12 x 6', cm: '40 x 30 x 15' }, weight: { lbs: 0, kg: 0 } }, checked: [{ type: 'checked', dimensions: { inches: '62 linear', cm: '158 linear' }, weight: { lbs: 51, kg: 23 }, fee: { domestic: 30, international: 80 } }] } } },
  { name: 'Ethiopian Airlines', code: 'ET', logo: '🇪🇹', baggage: { economy: { 'carry-on': { type: 'carry-on', dimensions: { inches: '22 x 16 x 9', cm: '55 x 40 x 23' }, weight: { lbs: 15, kg: 7 } }, personal: { type: 'personal', dimensions: { inches: '16 x 12 x 6', cm: '40 x 30 x 15' }, weight: { lbs: 0, kg: 0 } }, checked: [{ type: 'checked', dimensions: { inches: '62 linear', cm: '158 linear' }, weight: { lbs: 51, kg: 23 }, fee: { domestic: 0, international: 0 } }] } } },
  { name: 'Egypt Air', code: 'MS', logo: '🇪🇬', baggage: { economy: { 'carry-on': { type: 'carry-on', dimensions: { inches: '22 x 16 x 9', cm: '55 x 40 x 23' }, weight: { lbs: 18, kg: 8 } }, personal: { type: 'personal', dimensions: { inches: '16 x 12 x 6', cm: '40 x 30 x 15' }, weight: { lbs: 0, kg: 0 } }, checked: [{ type: 'checked', dimensions: { inches: '62 linear', cm: '158 linear' }, weight: { lbs: 51, kg: 23 }, fee: { domestic: 25, international: 60 } }] } } },
  { name: 'Kenya Airways', code: 'KQ', logo: '🇰🇪', baggage: { economy: { 'carry-on': { type: 'carry-on', dimensions: { inches: '22 x 14 x 9', cm: '56 x 36 x 23' }, weight: { lbs: 18, kg: 8 } }, personal: { type: 'personal', dimensions: { inches: '16 x 12 x 6', cm: '40 x 30 x 15' }, weight: { lbs: 0, kg: 0 } }, checked: [{ type: 'checked', dimensions: { inches: '62 linear', cm: '158 linear' }, weight: { lbs: 51, kg: 23 }, fee: { domestic: 20, international: 50 } }] } } },

  // Middle Eastern Airlines
  { name: 'Etihad Airways', code: 'EY', logo: '🇦🇪', baggage: { economy: { 'carry-on': { type: 'carry-on', dimensions: { inches: '22 x 16 x 8', cm: '56 x 40 x 21' }, weight: { lbs: 15, kg: 7 } }, personal: { type: 'personal', dimensions: { inches: '16 x 12 x 6', cm: '40 x 30 x 15' }, weight: { lbs: 0, kg: 0 } }, checked: [{ type: 'checked', dimensions: { inches: '62 linear', cm: '158 linear' }, weight: { lbs: 51, kg: 23 }, fee: { domestic: 0, international: 0 } }] } } },
  { name: 'Royal Jordanian', code: 'RJ', logo: '🇯🇴', baggage: { economy: { 'carry-on': { type: 'carry-on', dimensions: { inches: '22 x 16 x 9', cm: '56 x 40 x 23' }, weight: { lbs: 15, kg: 7 } }, personal: { type: 'personal', dimensions: { inches: '16 x 12 x 6', cm: '40 x 30 x 15' }, weight: { lbs: 0, kg: 0 } }, checked: [{ type: 'checked', dimensions: { inches: '62 linear', cm: '158 linear' }, weight: { lbs: 51, kg: 23 }, fee: { domestic: 30, international: 60 } }] } } },
  { name: 'Saudia', code: 'SV', logo: '🇸🇦', baggage: { economy: { 'carry-on': { type: 'carry-on', dimensions: { inches: '22 x 16 x 9', cm: '56 x 40 x 23' }, weight: { lbs: 15, kg: 7 } }, personal: { type: 'personal', dimensions: { inches: '16 x 12 x 6', cm: '40 x 30 x 15' }, weight: { lbs: 0, kg: 0 } }, checked: [{ type: 'checked', dimensions: { inches: '62 linear', cm: '158 linear' }, weight: { lbs: 66, kg: 30 }, fee: { domestic: 0, international: 0 } }] } } },

  // Low-Cost European Airlines
  { name: 'Ryanair', code: 'FR', logo: '🇮🇪', baggage: { economy: { 'carry-on': { type: 'carry-on', dimensions: { inches: '22 x 16 x 9', cm: '55 x 40 x 20' }, weight: { lbs: 22, kg: 10 } }, personal: { type: 'personal', dimensions: { inches: '16 x 12 x 8', cm: '40 x 20 x 25' }, weight: { lbs: 0, kg: 0 } }, checked: [{ type: 'checked', dimensions: { inches: '54 linear', cm: '138 linear' }, weight: { lbs: 44, kg: 20 }, fee: { domestic: 30, international: 50 } }] } } },
  { name: 'EasyJet', code: 'U2', logo: '🇬🇧', baggage: { economy: { 'carry-on': { type: 'carry-on', dimensions: { inches: '22 x 16 x 9', cm: '56 x 45 x 25' }, weight: { lbs: 0, kg: 0 } }, personal: { type: 'personal', dimensions: { inches: '17 x 14 x 8', cm: '45 x 36 x 20' }, weight: { lbs: 0, kg: 0 } }, checked: [{ type: 'checked', dimensions: { inches: '108 linear', cm: '275 linear' }, weight: { lbs: 51, kg: 23 }, fee: { domestic: 45, international: 60 } }] } } },
  { name: 'Wizz Air', code: 'W6', logo: '🇭🇺', baggage: { economy: { 'carry-on': { type: 'carry-on', dimensions: { inches: '22 x 16 x 9', cm: '55 x 40 x 23' }, weight: { lbs: 22, kg: 10 } }, personal: { type: 'personal', dimensions: { inches: '16 x 12 x 6', cm: '40 x 30 x 18' }, weight: { lbs: 0, kg: 0 } }, checked: [{ type: 'checked', dimensions: { inches: '58 linear', cm: '149 linear' }, weight: { lbs: 44, kg: 20 }, fee: { domestic: 30, international: 45 } }] } } },
  { name: 'Vueling', code: 'VY', logo: '🇪🇸', baggage: { economy: { 'carry-on': { type: 'carry-on', dimensions: { inches: '22 x 16 x 8', cm: '55 x 40 x 20' }, weight: { lbs: 22, kg: 10 } }, personal: { type: 'personal', dimensions: { inches: '14 x 8 x 12', cm: '35 x 20 x 30' }, weight: { lbs: 0, kg: 0 } }, checked: [{ type: 'checked', dimensions: { inches: '62 linear', cm: '158 linear' }, weight: { lbs: 51, kg: 23 }, fee: { domestic: 25, international: 45 } }] } } },

  // Indian Airlines
  { name: 'Air India', code: 'AI', logo: '🇮🇳', baggage: { economy: { 'carry-on': { type: 'carry-on', dimensions: { inches: '22 x 14 x 9', cm: '55 x 35 x 25' }, weight: { lbs: 15, kg: 7 } }, personal: { type: 'personal', dimensions: { inches: '18 x 12 x 8', cm: '45 x 30 x 20' }, weight: { lbs: 0, kg: 0 } }, checked: [{ type: 'checked', dimensions: { inches: '62 linear', cm: '158 linear' }, weight: { lbs: 51, kg: 23 }, fee: { domestic: 0, international: 0 } }] } } },
  { name: 'IndiGo', code: '6E', logo: '🇮🇳', baggage: { economy: { 'carry-on': { type: 'carry-on', dimensions: { inches: '22 x 14 x 9', cm: '55 x 35 x 25' }, weight: { lbs: 15, kg: 7 } }, personal: { type: 'personal', dimensions: { inches: '14 x 10 x 6', cm: '35 x 25 x 15' }, weight: { lbs: 0, kg: 0 } }, checked: [{ type: 'checked', dimensions: { inches: '62 linear', cm: '158 linear' }, weight: { lbs: 33, kg: 15 }, fee: { domestic: 15, international: 40 } }] } } },
  { name: 'SpiceJet', code: 'SG', logo: '🇮🇳', baggage: { economy: { 'carry-on': { type: 'carry-on', dimensions: { inches: '22 x 14 x 9', cm: '55 x 35 x 25' }, weight: { lbs: 15, kg: 7 } }, personal: { type: 'personal', dimensions: { inches: '14 x 10 x 6', cm: '35 x 25 x 15' }, weight: { lbs: 0, kg: 0 } }, checked: [{ type: 'checked', dimensions: { inches: '62 linear', cm: '158 linear' }, weight: { lbs: 33, kg: 15 }, fee: { domestic: 15, international: 35 } }] } } },

  // Russian Airlines
  { name: 'Aeroflot', code: 'SU', logo: '🇷🇺', baggage: { economy: { 'carry-on': { type: 'carry-on', dimensions: { inches: '22 x 16 x 9', cm: '55 x 40 x 25' }, weight: { lbs: 22, kg: 10 } }, personal: { type: 'personal', dimensions: { inches: '16 x 12 x 6', cm: '40 x 30 x 15' }, weight: { lbs: 0, kg: 0 } }, checked: [{ type: 'checked', dimensions: { inches: '62 linear', cm: '158 linear' }, weight: { lbs: 51, kg: 23 }, fee: { domestic: 0, international: 0 } }] } } },
  { name: 'S7 Airlines', code: 'S7', logo: '🇷🇺', baggage: { economy: { 'carry-on': { type: 'carry-on', dimensions: { inches: '22 x 16 x 9', cm: '55 x 40 x 23' }, weight: { lbs: 22, kg: 10 } }, personal: { type: 'personal', dimensions: { inches: '16 x 12 x 6', cm: '40 x 30 x 15' }, weight: { lbs: 0, kg: 0 } }, checked: [{ type: 'checked', dimensions: { inches: '62 linear', cm: '158 linear' }, weight: { lbs: 51, kg: 23 }, fee: { domestic: 20, international: 50 } }] } } },

  // Additional Airlines to reach 50+
  { name: 'Iberia', code: 'IB', logo: '🇪🇸', baggage: { economy: { 'carry-on': { type: 'carry-on', dimensions: { inches: '22 x 16 x 9', cm: '56 x 40 x 25' }, weight: { lbs: 22, kg: 10 } }, personal: { type: 'personal', dimensions: { inches: '16 x 12 x 6', cm: '40 x 30 x 15' }, weight: { lbs: 0, kg: 0 } }, checked: [{ type: 'checked', dimensions: { inches: '62 linear', cm: '158 linear' }, weight: { lbs: 51, kg: 23 }, fee: { domestic: 25, international: 60 } }] } } },
  { name: 'TAP Air Portugal', code: 'TP', logo: '🇵🇹', baggage: { economy: { 'carry-on': { type: 'carry-on', dimensions: { inches: '22 x 16 x 9', cm: '55 x 40 x 23' }, weight: { lbs: 18, kg: 8 } }, personal: { type: 'personal', dimensions: { inches: '16 x 12 x 6', cm: '40 x 30 x 15' }, weight: { lbs: 0, kg: 0 } }, checked: [{ type: 'checked', dimensions: { inches: '62 linear', cm: '158 linear' }, weight: { lbs: 51, kg: 23 }, fee: { domestic: 30, international: 70 } }] } } },
  { name: 'Alitalia', code: 'AZ', logo: '🇮🇹', baggage: { economy: { 'carry-on': { type: 'carry-on', dimensions: { inches: '22 x 16 x 9', cm: '55 x 40 x 23' }, weight: { lbs: 18, kg: 8 } }, personal: { type: 'personal', dimensions: { inches: '16 x 12 x 6', cm: '40 x 30 x 15' }, weight: { lbs: 0, kg: 0 } }, checked: [{ type: 'checked', dimensions: { inches: '62 linear', cm: '158 linear' }, weight: { lbs: 51, kg: 23 }, fee: { domestic: 30, international: 70 } }] } } },
  { name: 'Finnair', code: 'AY', logo: '🇫🇮', baggage: { economy: { 'carry-on': { type: 'carry-on', dimensions: { inches: '22 x 16 x 9', cm: '56 x 45 x 25' }, weight: { lbs: 18, kg: 8 } }, personal: { type: 'personal', dimensions: { inches: '16 x 12 x 6', cm: '40 x 30 x 15' }, weight: { lbs: 0, kg: 0 } }, checked: [{ type: 'checked', dimensions: { inches: '62 linear', cm: '158 linear' }, weight: { lbs: 51, kg: 23 }, fee: { domestic: 30, international: 60 } }] } } },
];

export const LuggageLimitsModal: React.FC<LuggageLimitsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedAirline, setSelectedAirline] = useState<AirlineData | null>(null);
  const [selectedClass, setSelectedClass] = useState<keyof AirlineData['baggage']>('economy');
  const [searchTerm, setSearchTerm] = useState('');
  const [units, setUnits] = useState<'imperial' | 'metric'>('imperial');

  const filteredAirlines = airlines.filter(airline =>
    airline.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    airline.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-lg max-h-[95vh] overflow-hidden flex flex-col"
      >
        {!selectedAirline ? (
          <>
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 shrink-0">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full p-2">
                  <Plane className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold">Airline Baggage Rules</h2>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {airlines.length} airlines available
                  </p>
                </div>
              </div>
              <Button variant="ghost" onClick={onClose} className="rounded-full h-8 w-8 p-0">
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Search and Units */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 shrink-0 space-y-3">
              <Input
                placeholder="Search airlines..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-10"
              />
              
              <div className="flex justify-center">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-1 flex">
                  <button
                    onClick={() => setUnits('imperial')}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                      units === 'imperial'
                        ? 'bg-white dark:bg-gray-700 shadow-sm'
                        : 'text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    Imperial (in/lbs)
                  </button>
                  <button
                    onClick={() => setUnits('metric')}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                      units === 'metric'
                        ? 'bg-white dark:bg-gray-700 shadow-sm'
                        : 'text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    Metric (cm/kg)
                  </button>
                </div>
              </div>
            </div>

            {/* Airlines List */}
            <ScrollArea className="flex-1 px-4">
              <div className="py-4 space-y-2">
                {filteredAirlines.map((airline) => (
                  <motion.div
                    key={airline.code}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    onClick={() => setSelectedAirline(airline)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{airline.logo}</div>
                        <div>
                          <h3 className="font-semibold text-sm">{airline.name}</h3>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {airline.code}
                          </p>
                        </div>
                      </div>
                      <div className="text-blue-600 dark:text-blue-400 text-xs font-medium">
                        View Rules →
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>
          </>
        ) : (
          <>
            {/* Airline Details Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 shrink-0">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  onClick={() => setSelectedAirline(null)}
                  className="rounded-full h-8 w-8 p-0"
                >
                  ←
                </Button>
                <div className="text-2xl">{selectedAirline.logo}</div>
                <div>
                  <h3 className="text-lg font-semibold">{selectedAirline.name}</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Baggage allowances
                  </p>
                </div>
              </div>
              <Button variant="ghost" onClick={onClose} className="rounded-full h-8 w-8 p-0">
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Class Selector */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 shrink-0">
              <div className="flex gap-2 overflow-x-auto">
                {Object.keys(selectedAirline.baggage).map((classType) => (
                  <Button
                    key={classType}
                    variant={selectedClass === classType ? 'default' : 'outline'}
                    onClick={() => setSelectedClass(classType as keyof AirlineData['baggage'])}
                    className="whitespace-nowrap capitalize text-xs px-3 py-1 h-7"
                  >
                    {classType === 'premium' ? 'Premium Economy' : classType}
                  </Button>
                ))}
              </div>
            </div>

            {/* Baggage Details */}
            <ScrollArea className="flex-1 px-4">
              <div className="py-4 space-y-4">
                {selectedAirline.baggage[selectedClass] && (
                  <>
                    {/* Carry-on */}
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="bg-blue-500 rounded-full p-1">
                          <Plane className="h-3 w-3 text-white" />
                        </div>
                        <h4 className="font-semibold text-sm">Carry-on Bag</h4>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Ruler className="h-3 w-3 text-gray-600" />
                          <span>
                            {units === 'imperial' 
                              ? selectedAirline.baggage[selectedClass]!['carry-on'].dimensions.inches
                              : selectedAirline.baggage[selectedClass]!['carry-on'].dimensions.cm
                            }
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Weight className="h-3 w-3 text-gray-600" />
                          <span>
                            {units === 'imperial' 
                              ? `${selectedAirline.baggage[selectedClass]!['carry-on'].weight.lbs} lbs`
                              : `${selectedAirline.baggage[selectedClass]!['carry-on'].weight.kg} kg`
                            }
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Personal Item */}
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="bg-green-500 rounded-full p-1">
                          <Plane className="h-3 w-3 text-white" />
                        </div>
                        <h4 className="font-semibold text-sm">Personal Item</h4>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Ruler className="h-3 w-3 text-gray-600" />
                          <span>
                            {units === 'imperial' 
                              ? selectedAirline.baggage[selectedClass]!.personal.dimensions.inches
                              : selectedAirline.baggage[selectedClass]!.personal.dimensions.cm
                            }
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Weight className="h-3 w-3 text-gray-600" />
                          <span>
                            {units === 'imperial' 
                              ? `${selectedAirline.baggage[selectedClass]!.personal.weight.lbs} lbs`
                              : `${selectedAirline.baggage[selectedClass]!.personal.weight.kg} kg`
                            }
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Checked Bags */}
                    {selectedAirline.baggage[selectedClass]!.checked.map((bag, index) => (
                      <div key={index} className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="bg-orange-500 rounded-full p-1">
                            <Plane className="h-3 w-3 text-white" />
                          </div>
                          <h4 className="font-semibold text-sm">
                            Checked Bag {index + 1}
                          </h4>
                          {bag.fee && (
                            <Badge variant="secondary" className="text-xs">
                              ${bag.fee.domestic} domestic
                            </Badge>
                          )}
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <Ruler className="h-3 w-3 text-gray-600" />
                            <span>
                              {units === 'imperial' ? bag.dimensions.inches : bag.dimensions.cm}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Weight className="h-3 w-3 text-gray-600" />
                            <span>
                              {units === 'imperial' ? `${bag.weight.lbs} lbs` : `${bag.weight.kg} kg`}
                            </span>
                          </div>
                          {bag.fee && (
                            <div className="flex items-center gap-2">
                              <DollarSign className="h-3 w-3 text-gray-600" />
                              <span>
                                ${bag.fee.domestic} domestic / ${bag.fee.international} international
                              </span>
                            </div>
                          )}
                        </div>
                        {bag.notes && (
                          <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                            <AlertTriangle className="h-3 w-3 inline mr-1" />
                            {bag.notes}
                          </div>
                        )}
                      </div>
                    ))}
                  </>
                )}
              </div>
            </ScrollArea>
          </>
        )}
      </motion.div>
    </div>
  );
};
