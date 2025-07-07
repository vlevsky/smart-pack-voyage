
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, X, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface AIPackingAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  onAddItems: (items: Array<{ name: string; category: string; quantity?: number }>) => void;
}

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface PackingProfile {
  nights: number;
  destination: string;
  weather: 'cold' | 'warm' | 'mixed';
  style: 'business' | 'casual' | 'both';
  thoroughness: 'light' | 'balanced' | 'thorough';
}

export const AIPackingAssistant: React.FC<AIPackingAssistantProps> = ({
  isOpen,
  onClose,
  onAddItems,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your AI packing assistant. I'll help you create the perfect packing list by asking a few questions. How many nights will you be traveling?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [profile, setProfile] = useState<Partial<PackingProfile>>({});

  const steps = [
    'nights',
    'destination',
    'weather',
    'style',
    'thoroughness',
    'generate',
  ];

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    processUserResponse(inputText);
    setInputText('');
  };

  const processUserResponse = (response: string) => {
    const step = steps[currentStep];
    let botResponse = '';
    let newProfile = { ...profile };

    switch (step) {
      case 'nights':
        const nights = parseInt(response);
        if (nights > 0) {
          newProfile.nights = nights;
          botResponse = `Great! ${nights} nights. Where are you traveling to?`;
          setCurrentStep(1);
        } else {
          botResponse = "Please enter a valid number of nights (e.g., 5)";
        }
        break;

      case 'destination':
        newProfile.destination = response;
        botResponse = `${response} sounds amazing! What's the weather like there? (cold/warm/mixed)`;
        setCurrentStep(2);
        break;

      case 'weather':
        const weather = response.toLowerCase();
        if (['cold', 'warm', 'mixed'].includes(weather)) {
          newProfile.weather = weather as 'cold' | 'warm' | 'mixed';
          botResponse = `Perfect! Will this be a business trip, casual vacation, or both?`;
          setCurrentStep(3);
        } else {
          botResponse = "Please specify: cold, warm, or mixed weather";
        }
        break;

      case 'style':
        const style = response.toLowerCase();
        if (['business', 'casual', 'both'].includes(style)) {
          newProfile.style = style as 'business' | 'casual' | 'both';
          botResponse = `Got it! How thorough should your packing be? (light/balanced/thorough)`;
          setCurrentStep(4);
        } else {
          botResponse = "Please choose: business, casual, or both";
        }
        break;

      case 'thoroughness':
        const thoroughness = response.toLowerCase();
        if (['light', 'balanced', 'thorough'].includes(thoroughness)) {
          newProfile.thoroughness = thoroughness as 'light' | 'balanced' | 'thorough';
          botResponse = `Perfect! I'm generating your personalized packing list now...`;
          setCurrentStep(5);
          setTimeout(() => generatePackingList(newProfile as PackingProfile), 1000);
        } else {
          botResponse = "Please choose: light, balanced, or thorough";
        }
        break;
    }

    setProfile(newProfile);
    
    if (botResponse) {
      setTimeout(() => {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: botResponse,
          isBot: true,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, botMessage]);
      }, 500);
    }
  };

  const generatePackingList = (profile: PackingProfile) => {
    const items = [];
    const { nights, weather, style, thoroughness } = profile;

    // Base clothing items
    const baseClothing = [
      { name: 'Underwear', category: 'clothes', quantity: Math.min(nights + 2, 10) },
      { name: 'Socks', category: 'clothes', quantity: Math.min(nights + 1, 8) },
      { name: 'T-shirts', category: 'clothes', quantity: Math.ceil(nights / 2) + 1 },
    ];

    // Weather-specific items
    if (weather === 'cold' || weather === 'mixed') {
      baseClothing.push(
        { name: 'Sweater', category: 'clothes', quantity: 2 },
        { name: 'Warm jacket', category: 'clothes', quantity: 1 },
        { name: 'Long pants', category: 'clothes', quantity: Math.ceil(nights / 3) + 1 }
      );
    }

    if (weather === 'warm' || weather === 'mixed') {
      baseClothing.push(
        { name: 'Shorts', category: 'clothes', quantity: Math.ceil(nights / 2) },
        { name: 'Sandals', category: 'clothes', quantity: 1 },
        { name: 'Sunglasses', category: 'miscellaneous', quantity: 1 }
      );
    }

    // Business items
    if (style === 'business' || style === 'both') {
      baseClothing.push(
        { name: 'Dress shirt', category: 'clothes', quantity: Math.ceil(nights / 2) },
        { name: 'Dress pants', category: 'clothes', quantity: 2 },
        { name: 'Blazer', category: 'clothes', quantity: 1 },
        { name: 'Dress shoes', category: 'clothes', quantity: 1 }
      );
    }

    // Toiletries
    const toiletries = [
      { name: 'Toothbrush', category: 'toiletries', quantity: 1 },
      { name: 'Toothpaste', category: 'toiletries', quantity: 1 },
      { name: 'Shampoo', category: 'toiletries', quantity: nights > 7 ? 2 : 1 },
      { name: 'Deodorant', category: 'toiletries', quantity: 1 },
    ];

    // Electronics
    const electronics = [
      { name: 'Phone charger', category: 'electronics', quantity: 1 },
      { name: 'Portable battery', category: 'electronics', quantity: 1 },
    ];

    items.push(...baseClothing, ...toiletries, ...electronics);

    // Adjust for thoroughness
    if (thoroughness === 'thorough') {
      items.push(
        { name: 'Extra shoes', category: 'clothes', quantity: 1 },
        { name: 'Rain jacket', category: 'clothes', quantity: 1 },
        { name: 'First aid kit', category: 'miscellaneous', quantity: 1 },
        { name: 'Laundry bag', category: 'miscellaneous', quantity: 1 }
      );
    }

    onAddItems(items);
    
    const finalMessage: Message = {
      id: (Date.now() + 2).toString(),
      text: `I've generated a personalized packing list with ${items.length} items for your ${nights}-night trip to ${profile.destination}! The items have been added to your packing list. Happy travels! 🎒`,
      isBot: true,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, finalMessage]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-lg h-[600px] flex flex-col"
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <div className="bg-blue-500 rounded-full p-2">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <h3 className="font-semibold">AI Packing Assistant</h3>
          </div>
          <Button variant="ghost" onClick={onClose} className="rounded-full h-8 w-8 p-0">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${message.isBot ? '' : 'flex-row-reverse'}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.isBot ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                }`}>
                  {message.isBot ? (
                    <Bot className="h-4 w-4 text-white" />
                  ) : (
                    <User className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                  )}
                </div>
                <div className={`max-w-[80%] p-3 rounded-lg ${
                  message.isBot
                    ? 'bg-gray-100 dark:bg-gray-800'
                    : 'bg-blue-500 text-white'
                }`}>
                  <p className="text-sm">{message.text}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex gap-2">
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your answer..."
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} className="bg-blue-500 hover:bg-blue-600">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
