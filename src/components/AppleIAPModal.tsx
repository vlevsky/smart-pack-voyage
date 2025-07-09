import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Crown, Star, Sparkles, Check, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

interface AppleIAPModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPurchase: (tier: string) => void;
  currentTier: string;
}

// Apple In-App Purchase Product IDs (these would be configured in App Store Connect)
const iapProducts = [
  {
    id: 'one_trip',
    productId: 'com.packingapp.onetrip',
    name: 'One Trip',
    icon: Star,
    color: 'from-blue-400 to-blue-600',
    borderColor: 'border-blue-400',
    price: '$4.99',
    type: 'one-time',
    features: [
      'Full premium access for one trip',
      'Smart packing suggestions',
      'AI assistant',
      'Luggage organization',
      'Airline baggage limits',
    ],
    limitations: ['Limited to one trip'],
  },
  {
    id: 'silver',
    productId: 'com.packingapp.silver.monthly',
    name: 'Silver',
    icon: Star,
    color: 'from-gray-400 to-gray-600',
    borderColor: 'border-gray-300',
    monthlyPrice: '$3.99',
    yearlyPrice: '$39.99',
    yearlyProductId: 'com.packingapp.silver.yearly',
    savings: '17%',
    features: [
      'Up to 5 trips',
      'Smart packing lists',
      'Basic AI assistance',
      'Luggage organization',
      'Cloud sync',
    ],
    limitations: ['Limited themes', 'Basic support'],
  },
  {
    id: 'gold',
    productId: 'com.packingapp.gold.monthly',
    name: 'Gold',
    icon: Crown,
    color: 'from-yellow-400 to-yellow-600',
    borderColor: 'border-yellow-400',
    monthlyPrice: '$7.99',
    yearlyPrice: '$79.99',
    yearlyProductId: 'com.packingapp.gold.yearly',
    savings: '17%',
    popular: true,
    features: [
      'Unlimited trips',
      'Premium smart lists',
      'Advanced AI chat',
      'Custom themes',
      'Priority support',
      'Offline access',
      'Export to PDF',
    ],
    limitations: [],
  },
  {
    id: 'exclusive',
    productId: 'com.packingapp.exclusive.monthly',
    name: 'Exclusive',
    icon: Sparkles,
    color: 'from-purple-500 to-pink-600',
    borderColor: 'border-purple-500',
    monthlyPrice: '$19.99',
    yearlyPrice: '$179.99',
    yearlyProductId: 'com.packingapp.exclusive.yearly',
    savings: '25%',
    features: [
      'Everything in Gold',
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

export const AppleIAPModal: React.FC<AppleIAPModalProps> = ({
  isOpen,
  onClose,
  onPurchase,
  currentTier,
}) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handlePurchase = async (product: any) => {
    setIsProcessing(true);
    
    try {
      // Apple In-App Purchase logic would go here
      // This would integrate with Apple's StoreKit framework
      
      if ((window as any).webkit?.messageHandlers?.purchase) {
        // Send message to native iOS app
        const productId = product.type === 'one-time' 
          ? product.productId 
          : billingCycle === 'yearly' 
            ? product.yearlyProductId || product.productId 
            : product.productId;
            
        (window as any).webkit.messageHandlers.purchase.postMessage({
          productId: productId,
          tier: product.id
        });
      } else {
        // Fallback for web preview - simulate purchase
        console.log('Simulating Apple IAP for:', product.id);
        onPurchase(product.id);
      }
    } catch (error) {
      console.error('Purchase failed:', error);
      alert('Purchase failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRestorePurchases = async () => {
    setIsProcessing(true);
    
    try {
      if ((window as any).webkit?.messageHandlers?.restore) {
        // Send message to native iOS app to restore purchases
        (window as any).webkit.messageHandlers.restore.postMessage({});
      } else {
        // Fallback for web preview
        console.log('Simulating restore purchases');
        alert('No previous purchases found to restore.');
      }
    } catch (error) {
      console.error('Restore failed:', error);
      alert('Restore failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
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
                Unlock premium features with Apple's secure in-app purchases
              </p>
            </div>
            <Button variant="ghost" onClick={onClose} className="rounded-full h-10 w-10 p-0">
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Billing Toggle - Only for subscription products */}
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {iapProducts.map((product) => {
              const Icon = product.icon;
              const isCurrentPlan = currentTier.toLowerCase() === product.id;
              const price = product.type === 'one-time' 
                ? product.price 
                : billingCycle === 'monthly' 
                  ? product.monthlyPrice 
                  : product.yearlyPrice;
              const priceLabel = product.type === 'one-time' 
                ? 'one-time' 
                : billingCycle === 'monthly' 
                  ? '/month' 
                  : '/year';

              return (
                <Card
                  key={product.id}
                  className={`relative overflow-hidden transition-all duration-300 hover:scale-105 ${
                    product.popular ? 'ring-2 ring-blue-500 ring-offset-2' : ''
                  } ${isCurrentPlan ? 'ring-2 ring-green-500 ring-offset-2' : ''}`}
                >
                  {product.popular && (
                    <div className="absolute top-0 right-0 bg-blue-500 text-white px-2 py-1 text-xs font-semibold rounded-bl-lg">
                      Popular
                    </div>
                  )}
                  
                  {isCurrentPlan && (
                    <div className="absolute top-0 left-0 bg-green-500 text-white px-2 py-1 text-xs font-semibold rounded-br-lg">
                      Current
                    </div>
                  )}

                  <div className="p-4">
                    {/* Plan Header */}
                    <div className="text-center mb-4">
                      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-r ${product.color} mb-3`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                        {product.name}
                      </h3>
                      <div className="space-y-1">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                          {price}
                          <span className="text-sm font-normal text-gray-500">{priceLabel}</span>
                        </div>
                        {billingCycle === 'yearly' && product.savings && (
                          <div className="text-xs text-green-600 font-medium">
                            Save {product.savings}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-2 mb-4">
                      {product.features.slice(0, 4).map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Check className="h-3 w-3 text-green-500 shrink-0" />
                          <span className="text-xs text-gray-700 dark:text-gray-300">{feature}</span>
                        </div>
                      ))}
                      {product.features.length > 4 && (
                        <div className="text-xs text-gray-500 italic">
                          +{product.features.length - 4} more features
                        </div>
                      )}
                    </div>

                    {/* CTA Button */}
                    <Button
                      onClick={() => handlePurchase(product)}
                      disabled={isCurrentPlan || isProcessing}
                      className={`w-full ${
                        isCurrentPlan
                          ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          : product.popular
                          ? 'bg-blue-600 hover:bg-blue-700'
                          : 'bg-gray-900 hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100'
                      } text-white font-semibold py-2 rounded-xl transition-all duration-200 text-sm`}
                    >
                      {isCurrentPlan ? 'Current Plan' : isProcessing ? 'Processing...' : `Get ${product.name}`}
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <div className="text-center space-y-3">
            <Button
              onClick={handleRestorePurchases}
              disabled={isProcessing}
              variant="outline"
              className="mb-3"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Restore Purchases
            </Button>
            
            <div className="text-xs text-gray-600 dark:text-gray-400">
              <p>Secure payments through Apple App Store • Cancel anytime</p>
              <div className="flex items-center justify-center gap-4 mt-2">
                <button className="hover:text-blue-600 transition-colors">Terms of Use</button>
                <span>•</span>
                <button className="hover:text-blue-600 transition-colors">Privacy Policy</button>
                <span>•</span>
                <button className="hover:text-blue-600 transition-colors">Support</button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};