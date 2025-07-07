import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Plus, Check, Trash2, Sparkles, Plane, Move, Bookmark, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  PremadeListsModal
} from '@/components/PremadeListsModal';
import {
  LuggageLimitsModal
} from '@/components/LuggageLimitsModal';
import {
  SubscriptionModal
} from '@/components/SubscriptionModal';
import {
  AIPackingAssistant
} from '@/components/AIPackingAssistant';
import {
  TripTemplates
} from '@/components/TripTemplates';
import {
  HelpModal
} from '@/components/HelpModal';
import {
  TripCountdown
} from '@/components/TripCountdown';
import {
  PackingGameMode
} from '@/components/PackingGameMode';

interface Item {
  id: string;
  name: string;
  category: string;
  packed: boolean;
  quantity?: number;
}

interface Trip {
  id: string;
  name: string;
  destination?: string;
  startDate?: string;
  endDate?: string;
}

interface Template {
  id: string;
  name: string;
  description: string;
  destination?: string;
  duration: number;
  items: Item[];
  created: Date;
  luggage?: { [key: string]: string };
}

interface AccessibilitySettings {
  highContrast: boolean;
  largeText: boolean;
  dyslexiaFont: boolean;
}

export default function Index() {
  const [items, setItems] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState(['clothes', 'toiletries', 'electronics', 'miscellaneous', 'documents']);
  const [currentTrip, setCurrentTrip] = useState<Trip | null>(null);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [showPremadeLists, setShowPremadeLists] = useState(false);
  const [showLuggageLimits, setShowLuggageLimits] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [subscriptionTier, setSubscriptionTier] = useState<'free' | 'one-trip' | 'silver' | 'gold' | 'exclusive'>('free');
  const [gameMode, setGameMode] = useState(false);
  const [dragDropMode, setDragDropMode] = useState(false);
  const [simpleMode, setSimpleMode] = useState(false);
  const [accessibilitySettings, setAccessibilitySettings] = useState<AccessibilitySettings>({
    highContrast: false,
    largeText: false,
    dyslexiaFont: false,
  });
  const [showSettings, setShowSettings] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    const savedItems = localStorage.getItem('packingListItems');
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    }

    const savedTrip = localStorage.getItem('currentTrip');
    if (savedTrip) {
      setCurrentTrip(JSON.parse(savedTrip));
    }

    const savedTemplates = localStorage.getItem('packingTemplates');
    if (savedTemplates) {
      setTemplates(JSON.parse(savedTemplates));
    }

    const savedAccessibilitySettings = localStorage.getItem('accessibilitySettings');
    if (savedAccessibilitySettings) {
      setAccessibilitySettings(JSON.parse(savedAccessibilitySettings));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('packingListItems', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem('currentTrip', JSON.stringify(currentTrip));
  }, [currentTrip]);

  useEffect(() => {
    localStorage.setItem('packingTemplates', JSON.stringify(templates));
  }, [templates]);

  useEffect(() => {
    localStorage.setItem('accessibilitySettings', JSON.stringify(accessibilitySettings));
  }, [accessibilitySettings]);

  const addItem = () => {
    if (newItem.trim() !== '') {
      const newItemObject: Item = {
        id: Date.now().toString(),
        name: newItem,
        category: 'miscellaneous',
        packed: false,
      };
      setItems([...items, newItemObject]);
      setNewItem('');
    }
  };

  const addMultipleItems = (newItems: Array<{ name: string; category: string; quantity?: number }>) => {
    const newItemObjects = newItems.map(item => ({
      id: Date.now().toString() + Math.random().toString(),
      name: item.name,
      category: item.category,
      packed: false,
      quantity: item.quantity,
    }));
    setItems([...items, ...newItemObjects]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const toggleItem = (id: string) => {
    setItems(
      items.map(item =>
        item.id === id ? {
          ...item,
          packed: !item.packed
        } : item
      )
    );
  };

  const saveTemplate = (name: string, items: Item[]) => {
    const newTemplate = {
      id: Date.now().toString(),
      name,
      description: `Template created on ${new Date().toLocaleDateString()}`,
      destination: currentTrip?.destination || '',
      duration: 7, // Default duration
      items,
      created: new Date(),
      luggage: {},
    };
    setTemplates([...templates, newTemplate]);
    localStorage.setItem('packingTemplates', JSON.stringify([...templates, newTemplate]));
  };

  const loadTemplate = (template: Template) => {
    setItems([...items, ...template.items]);
  };

  const handleSubscribe = (tier: string) => {
    setSubscriptionTier(tier as 'free' | 'one-trip' | 'silver' | 'gold' | 'exclusive');
    localStorage.setItem('subscriptionTier', tier);
  };

  const filteredItems = selectedCategory === 'all' ? items : items.filter(item => item.category === selectedCategory);

  const hasSubscription = (feature: string) => {
    if (subscriptionTier === 'free') {
      // Only basic features are free
      return ['basic-lists', 'manual-add', 'simple-categories'].includes(feature);
    }

    const tierFeatures = {
      'one-trip': ['all'], // All features for one trip
      silver: ['smart-lists', 'game-mode', 'basic-templates', 'countdown'],
      gold: ['smart-lists', 'game-mode', 'templates', 'countdown', 'ai-assistant', 'drag-drop'],
      exclusive: ['all'] // All features
    };

    return subscriptionTier === 'exclusive' || subscriptionTier === 'one-trip' ||
      tierFeatures[subscriptionTier as keyof typeof tierFeatures]?.includes(feature) ||
      tierFeatures[subscriptionTier as keyof typeof tierFeatures]?.includes('all');
  };

  const requiresSubscription = (feature: string, action: () => void) => {
    if (hasSubscription(feature)) {
      action();
    } else {
      setShowSubscriptionModal(true);
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      accessibilitySettings.highContrast
        ? 'bg-black text-yellow-400'
        : 'bg-gray-50 dark:bg-gray-900'
    } ${
      accessibilitySettings.largeText ? 'text-lg' : ''
    } ${
      accessibilitySettings.dyslexiaFont ? 'font-mono' : ''
    }`}>

      {/* Settings Panel */}
      <motion.div
        initial={false}
        animate={{
          height: showSettings ? 'auto' : 0
        }}
        className="overflow-hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700"
      >
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant={simpleMode ? "default" : "outline"}
              onClick={() => setSimpleMode(!simpleMode)}
              className="text-sm"
            >
              Simple Mode
            </Button>
            <Button
              variant={accessibilitySettings.highContrast ? "default" : "outline"}
              onClick={() => setAccessibilitySettings(prev => ({
                ...prev,
                highContrast: !prev.highContrast
              }))}
              className="text-sm"
            >
              High Contrast
            </Button>
            <Button
              variant={accessibilitySettings.largeText ? "default" : "outline"}
              onClick={() => setAccessibilitySettings(prev => ({
                ...prev,
                largeText: !prev.largeText
              }))}
              className="text-sm"
            >
              Large Text
            </Button>
            <Button
              variant={accessibilitySettings.dyslexiaFont ? "default" : "outline"}
              onClick={() => setAccessibilitySettings(prev => ({
                ...prev,
                dyslexiaFont: !prev.dyslexiaFont
              }))}
              className="text-sm"
            >
              Dyslexia Font
            </Button>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setShowHelp(true)}
              className="flex-1 text-sm"
            >
              Help & Guide
            </Button>
            <Button
              variant="outline"
              onClick={() => requiresSubscription('ai-assistant', () => setShowAIAssistant(true))}
              className="flex-1 text-sm"
            >
              AI Assistant
            </Button>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-6 max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className={`font-bold ${
              accessibilitySettings.largeText ? 'text-3xl' : 'text-2xl'
            } ${
              accessibilitySettings.highContrast ? 'text-yellow-400' : 'text-gray-900 dark:text-white'
            }`}>
              Pack Smart
            </h1>
            <p className={`${
              accessibilitySettings.highContrast ? 'text-yellow-200' : 'text-gray-600 dark:text-gray-400'
            } mt-1`}>
              {currentTrip?.name || 'Create your first trip'}
            </p>
          </div>

          <Button
            variant="ghost"
            onClick={() => setShowSettings(!showSettings)}
            className={`rounded-full h-10 w-10 p-0 ${
              accessibilitySettings.highContrast ? 'text-yellow-400 hover:bg-yellow-400/10' : ''
            }`}
          >
            ⚙️
          </Button>
        </div>

        {/* Trip Countdown */}
        {currentTrip && currentTrip.startDate && (
          <TripCountdown
            tripName={currentTrip.name}
            destination={currentTrip.destination}
            startDate={new Date(currentTrip.startDate)}
            endDate={currentTrip.endDate ? new Date(currentTrip.endDate) : undefined}
          />
        )}

        {/* Game Mode */}
        <PackingGameMode
          isEnabled={gameMode}
          onToggle={setGameMode}
          packedItems={items.filter(item => item.packed).length}
          totalItems={items.length}
          onItemPacked={() => {}}
        />

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Button
            onClick={() => requiresSubscription('smart-lists', () => setShowPremadeLists(true))}
            className="h-16 flex flex-col items-center justify-center gap-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
          >
            <Sparkles className="h-5 w-5" />
            <span className="text-sm font-medium">Smart Lists</span>
            {!hasSubscription('smart-lists') && (
              <div className="absolute top-2 right-2">
                <div className="bg-yellow-500 rounded-full p-1">
                  <Lock className="h-3 w-3 text-white" />
                </div>
              </div>
            )}
          </Button>

          <Button
            onClick={() => requiresSubscription('templates', () => setShowTemplates(true))}
            variant="outline"
            className="h-16 flex flex-col items-center justify-center gap-1 relative"
          >
            <Bookmark className="h-5 w-5" />
            <span className="text-sm font-medium">Templates</span>
            {!hasSubscription('templates') && (
              <div className="absolute top-2 right-2">
                <div className="bg-yellow-500 rounded-full p-1">
                  <Lock className="h-3 w-3 text-white" />
                </div>
              </div>
            )}
          </Button>
        </div>

        {/* Add Item Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 mb-6 shadow-sm">
          <div className="flex gap-2">
            <Input
              placeholder="Add new item..."
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addItem()}
              className="flex-1"
            />
            <Button onClick={addItem} className="px-4">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Categories */}
        {!simpleMode && (
          <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('all')}
              className="whitespace-nowrap text-sm"
            >
              All ({items.length})
            </Button>
            {categories.map(category => {
              const count = items.filter(item => item.category === category).length;
              return (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category)}
                  className="whitespace-nowrap capitalize text-sm"
                >
                  {category} ({count})
                </Button>
              );
            })}
          </div>
        )}

        {/* Items List */}
        <div className="space-y-2 mb-6">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{
                opacity: 0,
                y: 10
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              className={`flex items-center gap-3 p-3 rounded-xl ${
                accessibilitySettings.highContrast
                  ? 'bg-gray-900 border border-yellow-400'
                  : 'bg-white dark:bg-gray-800'
              } shadow-sm`}
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleItem(item.id)}
                className={`h-6 w-6 p-0 rounded-full border-2 ${
                  item.packed
                    ? 'bg-green-500 border-green-500 text-white'
                    : 'border-gray-300 dark:border-gray-600'
                }`}
              >
                {item.packed && <Check className="h-3 w-3" />}
              </Button>

              <div className="flex-1">
                <span className={`${
                  item.packed ? 'line-through opacity-60' : ''
                } ${
                  accessibilitySettings.highContrast ? 'text-yellow-400' : ''
                }`}>
                  {item.name}
                </span>
                {item.quantity && item.quantity > 1 && (
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {item.quantity}
                  </Badge>
                )}
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeItem(item.id)}
                className="h-8 w-8 p-0 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Bottom Actions */}
        {!simpleMode && (
          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={() => setShowLuggageLimits(true)}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Plane className="h-4 w-4" />
              Baggage Rules
            </Button>

            <Button
              onClick={() => requiresSubscription('drag-drop', () => setDragDropMode(!dragDropMode))}
              variant="outline"
              className="flex items-center gap-2 relative"
            >
              <Move className="h-4 w-4" />
              Drag & Drop
              {!hasSubscription('drag-drop') && (
                <Lock className="h-3 w-3 ml-1" />
              )}
            </Button>
          </div>
        )}
      </div>

      {/* Modals */}
      <PremadeListsModal
        isOpen={showPremadeLists}
        onClose={() => setShowPremadeLists(false)}
        onAddItems={addMultipleItems}
      />

      <LuggageLimitsModal
        isOpen={showLuggageLimits}
        onClose={() => setShowLuggageLimits(false)}
      />

      <SubscriptionModal
        isOpen={showSubscriptionModal}
        onClose={() => setShowSubscriptionModal(false)}
        onSubscribe={handleSubscribe}
      />

      <AIPackingAssistant
        isOpen={showAIAssistant}
        onClose={() => setShowAIAssistant(false)}
        onAddItems={addMultipleItems}
      />

      <TripTemplates
        isOpen={showTemplates}
        onClose={() => setShowTemplates(false)}
        templates={templates}
        onSaveTemplate={saveTemplate}
        onLoadTemplate={loadTemplate}
        currentTrip={currentTrip ? {
          name: currentTrip.name,
          destination: currentTrip.destination,
          startDate: currentTrip.startDate ? new Date(currentTrip.startDate) : undefined,
          endDate: currentTrip.endDate ? new Date(currentTrip.endDate) : undefined,
        } : undefined}
        currentItems={items}
      />

      <HelpModal
        isOpen={showHelp}
        onClose={() => setShowHelp(false)}
      />
    </div>
  );
}
