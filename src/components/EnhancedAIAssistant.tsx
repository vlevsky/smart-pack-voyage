import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, X, Bot, User, Sparkles, MapPin, Luggage, Plane } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface EnhancedAIAssistantProps {
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

const helpOptions = [
  {
    id: 'create-list',
    title: 'Creating a list',
    description: 'Help me create a packing list for my trip',
    icon: Sparkles,
    color: 'from-blue-500 to-purple-600',
  },
  {
    id: 'find-items',
    title: 'Finding missing items',
    description: 'Suggest items I might have forgotten',
    icon: MapPin,
    color: 'from-green-500 to-emerald-600',
  },
  {
    id: 'organize-luggage',
    title: 'Organizing luggage',
    description: 'Help me organize items between bags',
    icon: Luggage,
    color: 'from-orange-500 to-red-600',
  },
  {
    id: 'baggage-limits',
    title: 'Understanding baggage limits',
    description: 'Explain airline baggage restrictions',
    icon: Plane,
    color: 'from-purple-500 to-pink-600',
  },
];

export const EnhancedAIAssistant: React.FC<EnhancedAIAssistantProps> = ({
  isOpen,
  onClose,
  onAddItems,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [showOptions, setShowOptions] = useState(true);
  const [isTyping, setIsTyping] = useState(false);

  const handleOptionSelect = (option: any) => {
    setShowOptions(false);
    const userMessage: Message = {
      id: Date.now().toString(),
      text: `I need help with ${option.title.toLowerCase()}`,
      isBot: false,
      timestamp: new Date(),
    };
    
    setMessages([userMessage]);
    
    // Simulate AI response based on option
    setIsTyping(true);
    setTimeout(() => {
      let botResponse = '';
      
      switch (option.id) {
        case 'create-list':
          botResponse = "I'd love to help you create a packing list! Tell me about your trip:\n\n• Where are you going?\n• How many days will you be away?\n• What's the purpose of your trip (business, vacation, etc.)?\n• What's the weather like there?\n\nOnce I know these details, I can suggest the perfect items for your trip!";
          break;
        case 'find-items':
          botResponse = "I can help you find items you might have missed! Based on your current list, here are some commonly forgotten essentials:\n\n• Phone charger\n• Toothbrush and toothpaste\n• Underwear and socks\n• Medications\n• Travel documents\n• Weather-appropriate outerwear\n\nWould you like me to suggest items based on your specific destination or trip type?";
          break;
        case 'organize-luggage':
          botResponse = "Great choice! Here are some luggage organization tips:\n\n• **Carry-on essentials:** Medications, chargers, change of clothes, valuables\n• **Checked bag:** Bulky items, shoes, toiletries over 3-1-1 limits\n• **Fragile items:** Pack in carry-on with soft padding\n• **Heavy items:** Distribute evenly between bags\n\nWould you like help assigning your current items to specific bags?";
          break;
        case 'baggage-limits':
          botResponse = "I can help you understand baggage restrictions! Here's what I need to know:\n\n• Which airline are you flying?\n• Are you flying domestic or international?\n• What class of service (Economy, Business, etc.)?\n\nOnce I know these details, I can show you exact weight and size limits, plus any restrictions on specific items.";
          break;
        default:
          botResponse = "Hi there! I'm your AI packing assistant. I can help you create lists, organize luggage, understand airline rules, and make sure you don't forget anything important. What would you like help with today?";
      }
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        isBot: true,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // Simulate AI response
    setIsTyping(true);
    setTimeout(() => {
      let botResponse = "I understand you need help with that. Let me assist you step by step. Could you provide more specific details about what you're looking for?";
      
      // Simple keyword-based responses
      const input = inputText.toLowerCase();
      if (input.includes('beach') || input.includes('vacation')) {
        botResponse = "For a beach vacation, I recommend: swimwear, sunscreen, sunglasses, flip-flops, beach towel, waterproof phone case, light cotton clothes, and a good book! Would you like me to add these to your list?";
      } else if (input.includes('business') || input.includes('work')) {
        botResponse = "For a business trip, you'll want: formal attire, laptop and charger, business cards, dress shoes, belt, portfolio or briefcase, and any presentation materials. Should I add these items?";
      } else if (input.includes('cold') || input.includes('winter')) {
        botResponse = "For cold weather, pack: warm coat, layers, gloves, hat, warm boots, thermal underwear, scarves, and lip balm. Don't forget hand warmers! Add these to your list?";
      }
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        isBot: true,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleStartOver = () => {
    setMessages([]);
    setShowOptions(true);
  };

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
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full p-2">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">AI Assistant</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">How can I help you today?</p>
            </div>
          </div>
          <div className="flex gap-2">
            {messages.length > 0 && (
              <Button variant="ghost" size="sm" onClick={handleStartOver}>
                New Chat
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={onClose} className="rounded-full h-8 w-8 p-0">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {showOptions ? (
            <div className="p-4 space-y-4 overflow-y-auto flex-1">
              <div className="text-center mb-6">
                <h4 className="text-xl font-semibold mb-2">What do you need help with?</h4>
                <p className="text-gray-600 dark:text-gray-400">Choose an option below or type your own question</p>
              </div>
              
              <div className="grid gap-3">
                {helpOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <motion.button
                      key={option.id}
                      onClick={() => handleOptionSelect(option)}
                      className={`bg-gradient-to-r ${option.color} text-white rounded-xl p-4 text-left shadow-lg transition-transform active:scale-95`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-white/20 rounded-full p-2">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="font-semibold">{option.title}</div>
                          <div className="text-sm opacity-90">{option.description}</div>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Help Guide Section */}
              <div className="mt-6 space-y-3">
                <h5 className="font-semibold text-gray-900 dark:text-white">Quick Help Guide</h5>
                <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <details className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                    <summary className="font-medium cursor-pointer">How to create trips</summary>
                    <p className="mt-2 text-xs">Tap the "+" button in the Trips tab to create a new trip. Add your destination, dates, and start packing!</p>
                  </details>
                  <details className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                    <summary className="font-medium cursor-pointer">How to use smart lists</summary>
                    <p className="mt-2 text-xs">Access pre-made packing lists tailored to different destinations and trip types. Customize them to your needs.</p>
                  </details>
                  <details className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                    <summary className="font-medium cursor-pointer">How to assign items to luggage</summary>
                    <p className="mt-2 text-xs">Long-press any item in your list and select which luggage bag it should go in (carry-on, checked, etc.).</p>
                  </details>
                  <details className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                    <summary className="font-medium cursor-pointer">How to upgrade your plan</summary>
                    <p className="mt-2 text-xs">Visit the Upgrade tab to see all available plans and unlock premium features like custom themes.</p>
                  </details>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3 ${message.isBot ? '' : 'flex-row-reverse'}`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      message.isBot ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                    }`}>
                      {message.isBot ? (
                        <Bot className="h-4 w-4 text-white" />
                      ) : (
                        <User className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                      )}
                    </div>
                    <div className={`max-w-[80%] p-3 rounded-2xl ${
                      message.isBot
                        ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                        : 'bg-blue-500 text-white'
                    }`}>
                      <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                    </div>
                  </motion.div>
                ))}
                
                {/* Typing Indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-3"
                  >
                    <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-blue-500">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-2xl">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Input - CRITICAL FIX - Move above menu */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 sticky bottom-0 z-20">
          <div className="flex gap-2 items-end">
            <div className="flex-1">
              <Input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={showOptions ? "Or type your question here..." : "Type your message..."}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    if (inputText.trim()) {
                      if (showOptions) {
                        setShowOptions(false);
                      }
                      handleSendMessage();
                    }
                  }
                }}
                className="min-h-[44px] text-base border-2 border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="sentences"
                disabled={isTyping}
                autoFocus={!showOptions}
              />
            </div>
            <Button 
              onClick={() => {
                if (inputText.trim()) {
                  if (showOptions) {
                    setShowOptions(false);
                  }
                  handleSendMessage();
                }
              }}
              disabled={!inputText.trim() || isTyping}
              className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 min-h-[44px] min-w-[44px] shrink-0 border-2 border-blue-500"
              size="sm"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};