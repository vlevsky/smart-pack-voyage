import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, ChevronRight, ChevronDown, Sparkles, Luggage, Plane, Settings, Crown, Map } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EnhancedHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface HelpSection {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  content: string[];
  tips?: string[];
}

const helpSections: HelpSection[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    icon: Map,
    content: [
      'Welcome to Pack Smart! This app helps you create perfect packing lists for any trip.',
      'Start by creating a new trip with your destination and dates.',
      'Use Smart Lists to get AI-generated packing suggestions based on your trip type.',
      'Check off items as you pack them to track your progress.',
    ],
    tips: [
      'Always check the weather forecast before finalizing your list',
      'Consider the activities you\'ll be doing at your destination',
    ],
  },
  {
    id: 'smart-lists',
    title: 'Using Smart Lists',
    icon: Sparkles,
    content: [
      'Smart Lists are pre-curated packing lists for different trip types and destinations.',
      'Choose from 80+ professionally crafted lists including beach vacations, business trips, ski trips, and more.',
      'Customize the list by selecting trip duration (days) and packing intensity (Light, Moderate, Thorough).',
      'Preview the complete list before adding items to your trip.',
      'Add extra categories like "Business Add-On" or "Infant Add-On" for specialized needs.',
    ],
    tips: [
      'Light packing is great for short trips or when you have laundry access',
      'Thorough packing includes backup items and "just in case" essentials',
    ],
  },
  {
    id: 'luggage',
    title: 'Organizing Luggage',
    icon: Luggage,
    content: [
      'Organize your items across different bags: Carry-On, Checked Bag, and Personal Item.',
      'Drag items between bags or use the luggage view to assign items.',
      'Each bag shows weight estimates and capacity warnings.',
      'View detailed airline baggage restrictions for 50+ airlines.',
      'Get alerts when you\'re approaching weight limits.',
    ],
    tips: [
      'Pack essentials (medications, chargers, change of clothes) in your carry-on',
      'Distribute weight evenly between bags to avoid overweight fees',
      'Keep valuables and electronics in your carry-on',
    ],
  },
  {
    id: 'airline-rules',
    title: 'Understanding Baggage Limits',
    icon: Plane,
    content: [
      'Access comprehensive baggage information for major airlines worldwide.',
      'View weight and size limits for different travel classes (Economy, Business, First).',
      'See differences between domestic and international flight restrictions.',
      'Get real-time warnings when your bags exceed airline limits.',
      'Learn about restricted items and liquids rules.',
    ],
    tips: [
      'Business and First class typically have higher baggage allowances',
      'International flights often have different rules than domestic',
      'Check your specific airline\'s website for the most current restrictions',
    ],
  },
  {
    id: 'ai-assistant',
    title: 'AI Assistant',
    icon: Sparkles,
    content: [
      'Access your personal AI packing assistant anytime from the bottom navigation.',
      'Get help creating custom packing lists based on your specific needs.',
      'Ask for suggestions about items you might have forgotten.',
      'Get advice on luggage organization and weight distribution.',
      'Learn about airline restrictions and travel tips.',
    ],
    tips: [
      'Be specific about your destination, weather, and activities for better suggestions',
      'Ask follow-up questions to get more detailed help',
    ],
  },
  {
    id: 'settings',
    title: 'Settings & Accessibility',
    icon: Settings,
    content: [
      'Customize the app for your needs with accessibility options.',
      'Enable High Contrast mode for better visibility.',
      'Use Large Text mode for easier reading.',
      'Switch to Dyslexia-friendly fonts.',
      'Toggle Simple Mode to hide advanced features.',
      'Enable Dark Mode for comfortable viewing in low light.',
    ],
    tips: [
      'Simple Mode is perfect for first-time users or when you want fewer distractions',
      'Dark Mode automatically follows your device settings',
    ],
  },
  {
    id: 'upgrading',
    title: 'Upgrading Your Plan',
    icon: Crown,
    content: [
      'Choose from flexible subscription options to unlock premium features.',
      'One Trip ($4.99) - Perfect for single trips with all premium features.',
      'Silver ($3.99/month) - Essential features for regular travelers.',
      'Gold ($7.99/month) - Most popular with AI assistant and advanced templates.',
      'Exclusive ($19.99/month) - Everything included with priority support.',
      'Cancel anytime with 30-day money-back guarantee.',
    ],
    tips: [
      'Yearly subscriptions save you money compared to monthly billing',
      'One Trip is perfect if you only travel occasionally',
    ],
  },
];

export const EnhancedHelpModal: React.FC<EnhancedHelpModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [expandedSection, setExpandedSection] = useState<string | null>('getting-started');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end justify-center">
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        className="bg-white dark:bg-gray-900 rounded-t-3xl w-full h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-2xl font-bold gradient-text">Help & Guide</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Everything you need to know</p>
          </div>
          <Button variant="ghost" onClick={onClose} className="rounded-full h-8 w-8 p-0">
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-3">
            {helpSections.map((section) => {
              const Icon = section.icon;
              const isExpanded = expandedSection === section.id;
              
              return (
                <div key={section.id} className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setExpandedSection(isExpanded ? null : section.id)}
                    className="w-full p-4 flex items-center justify-between bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-500 rounded-full p-2">
                        <Icon className="h-4 w-4 text-white" />
                      </div>
                      <span className="font-semibold text-left">{section.title}</span>
                    </div>
                    {isExpanded ? (
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-gray-500" />
                    )}
                  </button>
                  
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-4 space-y-4 bg-white dark:bg-gray-900"
                    >
                      <div className="space-y-3">
                        {section.content.map((paragraph, index) => (
                          <p key={index} className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                      
                      {section.tips && section.tips.length > 0 && (
                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                          <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">💡 Pro Tips:</h4>
                          <ul className="space-y-1">
                            {section.tips.map((tip, index) => (
                              <li key={index} className="text-sm text-blue-600 dark:text-blue-400">
                                • {tip}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
          
          {/* Contact Support */}
          <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl">
            <h3 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">Need More Help?</h3>
            <p className="text-sm text-purple-600 dark:text-purple-400 mb-3">
              Can't find what you're looking for? Our support team is here to help!
            </p>
            <Button 
              variant="outline" 
              className="border-purple-300 text-purple-700 hover:bg-purple-100 dark:border-purple-600 dark:text-purple-300 dark:hover:bg-purple-900/30"
            >
              Contact Support
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};