
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Check, Crown, Star, Zap, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubscribe: (tier: string) => void;
}

const subscriptionTiers = [
  {
    id: 'one-trip',
    name: 'One Trip',
    price: '$4.99',
    type: 'one-time',
    description: 'Perfect for single trips',
    features: [
      'All premium features',
      'Advanced smart lists',
      'Airline baggage rules',
      'Trip templates',
      'Until trip completion'
    ],
    icon: Star,
    color: 'bg-blue-500'
  },
  {
    id: 'silver',
    name: 'Silver',
    monthlyPrice: '$3.99/month',
    yearlyPrice: '$39.99/year',
    savings: '17%',
    description: 'Essential premium features',
    features: [
      'Smart packing lists',
      'Basic templates',
      'Countdown timer',
      'Game mode',
      'Priority support'
    ],
    icon: Crown,
    color: 'bg-gray-500'
  },
  {
    id: 'gold',
    name: 'Gold',
    monthlyPrice: '$7.99/month',
    yearlyPrice: '$79.99/year',
    savings: '17%',
    description: 'Most premium features',
    features: [
      'All Silver features',
      'AI packing assistant',
      'Advanced templates',
      'Airline integrations',
      'Custom reminders'
    ],
    icon: Star,
    color: 'bg-yellow-500',
    popular: true
  },
  {
    id: 'exclusive',
    name: 'Exclusive',
    monthlyPrice: '$19.99/month',
    yearlyPrice: '$179.99/year',
    savings: '25%',
    description: 'All premium features',
    features: [
      'Everything included',
      'Unlimited templates',
      'Advanced AI features',
      'Priority customer service',
      'Early access to new features'
    ],
    icon: Zap,
    color: 'bg-purple-500'
  }
];

export const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  isOpen,
  onClose,
  onSubscribe,
}) => {
  const [selectedTier, setSelectedTier] = useState<string>('gold');
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('yearly');

  if (!isOpen) return null;

  const handleSubscribe = () => {
    onSubscribe(selectedTier);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Choose Your Plan</h2>
          <Button variant="ghost" onClick={onClose} className="rounded-full">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex justify-center mb-6">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-1 flex">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                billingPeriod === 'monthly'
                  ? 'bg-white dark:bg-gray-700 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                billingPeriod === 'yearly'
                  ? 'bg-white dark:bg-gray-700 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              Yearly
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {subscriptionTiers.map((tier) => {
            const Icon = tier.icon;
            const isSelected = selectedTier === tier.id;
            
            return (
              <motion.div
                key={tier.id}
                className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700'
                } ${tier.popular ? 'ring-2 ring-blue-500' : ''}`}
                onClick={() => setSelectedTier(tier.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {tier.popular && (
                  <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-blue-500">
                    Most Popular
                  </Badge>
                )}
                
                <div className="flex items-center gap-2 mb-3">
                  <div className={`p-2 rounded-lg ${tier.color} text-white`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <h3 className="font-semibold">{tier.name}</h3>
                </div>

                <div className="mb-3">
                  {tier.type === 'one-time' ? (
                    <div className="text-2xl font-bold">{tier.price}</div>
                  ) : (
                    <div>
                      <div className="text-2xl font-bold">
                        {billingPeriod === 'monthly' ? tier.monthlyPrice : tier.yearlyPrice}
                      </div>
                      {billingPeriod === 'yearly' && tier.savings && (
                        <div className="text-sm text-green-600 font-medium">
                          Save {tier.savings}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {tier.description}
                </p>

                <ul className="space-y-2">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <Check className="h-3 w-3 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={handleSubscribe}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
          >
            Subscribe Now
          </Button>
          <Button variant="outline" onClick={onClose} className="px-8 py-3">
            Maybe Later
          </Button>
        </div>

        <div className="mt-4 text-center">
          <Button variant="ghost" className="text-sm text-gray-600">
            Restore Purchases
          </Button>
        </div>
      </motion.div>
    </div>
  );
};
