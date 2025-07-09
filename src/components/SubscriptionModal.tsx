
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
      'Multiple packing lists',
      'Smart packing lists',
      'Trip templates',
      'Countdown timer',
      'Basic support'
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
      'Game Mode',
      'AI packing assistant',
      'Advanced templates',
      'Airline integrations'
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
  const [showManagement, setShowManagement] = useState(false);

  // Mock current subscription data
  const currentSubscription = {
    tier: 'gold',
    status: 'active',
    nextBilling: '2024-08-15',
    amount: '$79.99',
    period: 'yearly'
  };

  if (!isOpen) return null;

  const handleSubscribe = () => {
    onSubscribe(selectedTier);
    onClose();
  };

  const handleManageSubscription = () => {
    setShowManagement(true);
  };

  const handleCancelSubscription = () => {
    // Mock cancellation
    alert('Subscription cancelled. You will retain access until your next billing date.');
    setShowManagement(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end justify-center">
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        className="bg-white dark:bg-gray-900 rounded-t-3xl w-full h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold gradient-text">
                {showManagement ? 'Manage Subscription' : 'Upgrade to Pro'}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {showManagement ? 'View and manage your subscription details' : 'Choose the perfect plan for your travels'}
              </p>
            </div>
            <Button variant="ghost" onClick={onClose} className="rounded-full h-8 w-8 p-0">
              <X className="h-5 w-5" />
            </Button>
          </div>

          {showManagement ? (
            // Subscription Management View
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl p-6 border border-green-200 dark:border-green-800">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <h3 className="text-lg font-semibold">Current Plan: Gold</h3>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">Active</Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Next billing</p>
                    <p className="font-semibold">{currentSubscription.nextBilling}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Amount</p>
                    <p className="font-semibold">{currentSubscription.amount}/year</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Your Benefits:</h4>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-center gap-2">
                      <Check className="h-3 w-3 text-green-500" />
                      AI packing assistant
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-3 w-3 text-green-500" />
                      Advanced templates
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-3 w-3 text-green-500" />
                      Airline integrations
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-3 w-3 text-green-500" />
                      Priority support
                    </li>
                  </ul>
                </div>
              </div>

              <div className="space-y-3">
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl"
                  onClick={() => setShowManagement(false)}
                >
                  Upgrade Plan
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full py-3 rounded-xl"
                  onClick={() => alert('Billing details updated!')}
                >
                  Update Payment Method
                </Button>
                
                <Button 
                  variant="ghost" 
                  className="w-full py-3 rounded-xl text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                  onClick={handleCancelSubscription}
                >
                  Cancel Subscription
                </Button>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setShowManagement(false)} className="flex-1 py-3 rounded-xl">
                  Back to Plans
                </Button>
                <Button variant="ghost" onClick={onClose} className="flex-1 py-3 rounded-xl">
                  Close
                </Button>
              </div>
            </div>
          ) : (
            // Original subscription plans view
            <div>
              <div className="flex justify-center mb-6">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-1 flex">
                  <button
                    onClick={() => setBillingPeriod('monthly')}
                    className={`px-6 py-3 rounded-full font-medium transition-all ${
                      billingPeriod === 'monthly'
                        ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white'
                        : 'text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setBillingPeriod('yearly')}
                    className={`px-6 py-3 rounded-full font-medium transition-all relative ${
                      billingPeriod === 'yearly'
                        ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white'
                        : 'text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    Yearly
                    <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                      Save
                    </span>
                  </button>
                </div>
               </div>

        <div className="grid gap-4 mb-6">
          {subscriptionTiers.map((tier) => {
            const Icon = tier.icon;
            const isSelected = selectedTier === tier.id;
            
            return (
              <motion.div
                key={tier.id}
                className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                  isSelected
                    ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 shadow-lg'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                } ${tier.popular ? 'ring-2 ring-blue-500 scale-105' : ''}`}
                onClick={() => setSelectedTier(tier.id)}
                whileHover={{ scale: tier.popular ? 1.05 : 1.02 }}
                whileTap={{ scale: tier.popular ? 1.03 : 0.98 }}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-1 text-sm font-semibold">
                      ⭐ Most Popular
                    </Badge>
                  </div>
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

              <div className="space-y-4">
                <Button
                  onClick={handleSubscribe}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 text-lg font-semibold rounded-xl shadow-lg"
                >
                  🚀 Start Your Journey
                </Button>
                
                <div className="flex gap-3">
                  <Button variant="outline" onClick={onClose} className="flex-1 py-3 rounded-xl">
                    Maybe Later
                  </Button>
                  <Button variant="ghost" className="flex-1 py-3 rounded-xl text-blue-600 dark:text-blue-400" onClick={handleManageSubscription}>
                    Manage Subscription
                  </Button>
                </div>
                
                <div className="text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Cancel anytime • 30-day money-back guarantee
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
