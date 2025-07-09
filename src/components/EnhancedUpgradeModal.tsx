import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Check, Star, Crown, Zap, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

interface EnhancedUpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: (tier: string) => void;
  currentTier: string;
}

const plans = [
  {
    id: 'silver',
    name: 'Silver',
    icon: Star,
    color: 'from-gray-400 to-gray-600',
    borderColor: 'border-gray-300',
    monthly: 3.99,
    yearly: 39.99,
    savings: '17%',
    features: [
      'Up to 5 trips',
      'Smart packing lists',
      'Basic AI assistance',
      'Luggage organization',
      'App Customizations',
      'Auto save & smart notifications',
      'Offline mode',
    ],
    limitations: ['Limited themes', 'Basic support'],
  },
  {
    id: 'gold',
    name: 'Gold',
    icon: Crown,
    color: 'from-yellow-400 to-yellow-600',
    borderColor: 'border-yellow-400',
    monthly: 7.99,
    yearly: 79.99,
    savings: '17%',
    popular: true,
    features: [
      'Everything in Silver',
      'Unlimited trips',
      'Premium smart lists',
      'Advanced AI chat',
      'Custom themes',
      'Data sync across devices',
      'Priority support',
      'Export to PDF',
    ],
    limitations: [],
  },
  {
    id: 'exclusive',
    name: 'Exclusive',
    icon: Sparkles,
    color: 'from-purple-500 to-pink-600',
    borderColor: 'border-purple-500',
    monthly: 19.99,
    yearly: 179.99,
    savings: '25%',
    features: [
      'Everything in Gold',
      'Executive Travel Tools',
      'Currency converter & world clock',
      'Weather forecasts & distance calculator',
      'Tipping guide & translator',
      'Custom fonts',
      'Premium themes',
      'Advanced analytics',
      'White-label options',
      'Dedicated support',
      'Early access features',
      'Team collaboration',
    ],
    limitations: [],
  },
];

export const EnhancedUpgradeModal: React.FC<EnhancedUpgradeModalProps> = ({
  isOpen,
  onClose,
  onUpgrade,
  currentTier,
}) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  if (!isOpen) return null;

  const handleUpgrade = (planId: string) => {
    onUpgrade(planId);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl"
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Choose Your Plan
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Unlock premium features and get the most out of your travels
              </p>
            </div>
            <Button variant="ghost" onClick={onClose} className="rounded-full h-10 w-10 p-0">
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center mt-6">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-1 flex">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  billingCycle === 'yearly'
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                Yearly
                <Badge className="ml-2 bg-green-100 text-green-700 text-xs">Save up to 25%</Badge>
              </button>
            </div>
          </div>
        </div>

        {/* Plans */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => {
              const Icon = plan.icon;
              const isCurrentPlan = currentTier.toLowerCase() === plan.id;
              const price = billingCycle === 'monthly' ? plan.monthly : plan.yearly;
              const priceLabel = billingCycle === 'monthly' ? '/month' : '/year';

              return (
                <Card
                  key={plan.id}
                  className={`relative overflow-hidden transition-all duration-300 hover:scale-105 ${
                    plan.popular ? 'ring-2 ring-blue-500 ring-offset-2' : ''
                  } ${isCurrentPlan ? 'ring-2 ring-green-500 ring-offset-2' : ''}`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-blue-500 text-white px-3 py-1 text-xs font-semibold rounded-bl-lg">
                      Most Popular
                    </div>
                  )}
                  
                  {isCurrentPlan && (
                    <div className="absolute top-0 left-0 bg-green-500 text-white px-3 py-1 text-xs font-semibold rounded-br-lg">
                      Current Plan
                    </div>
                  )}

                  <div className="p-6">
                    {/* Plan Header */}
                    <div className="text-center mb-6">
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${plan.color} mb-4`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {plan.name}
                      </h3>
                      <div className="space-y-1">
                        <div className="text-4xl font-bold text-gray-900 dark:text-white">
                          ${price}
                          <span className="text-lg font-normal text-gray-500">{priceLabel}</span>
                        </div>
                        {billingCycle === 'yearly' && (
                          <div className="text-sm text-green-600 font-medium">
                            Save {plan.savings} vs monthly
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-3 mb-6">
                      {plan.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <Check className="h-4 w-4 text-green-500 shrink-0" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                        </div>
                      ))}
                      {plan.limitations.map((limitation, index) => (
                        <div key={index} className="flex items-center gap-3 opacity-60">
                          <X className="h-4 w-4 text-gray-400 shrink-0" />
                          <span className="text-sm text-gray-500 line-through">{limitation}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <Button
                      onClick={() => handleUpgrade(plan.id)}
                      disabled={isCurrentPlan}
                      className={`w-full ${
                        isCurrentPlan
                          ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          : plan.popular
                          ? 'bg-blue-600 hover:bg-blue-700'
                          : 'bg-gray-900 hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100'
                      } text-white font-semibold py-3 rounded-xl transition-all duration-200`}
                    >
                      {isCurrentPlan ? 'Current Plan' : `Get ${plan.name}`}
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            <p>All plans include a 7-day free trial • Cancel anytime • Secure payments</p>
            <div className="flex items-center justify-center gap-4 mt-2">
              <button className="hover:text-blue-600 transition-colors">Restore Purchases</button>
              <span>•</span>
              <button className="hover:text-blue-600 transition-colors">Terms of Service</button>
              <span>•</span>
              <button className="hover:text-blue-600 transition-colors">Privacy Policy</button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};