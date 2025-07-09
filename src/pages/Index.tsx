import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Plus, Check, Trash2, Sparkles, Plane, Move, Bookmark, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { BottomNavigation } from '@/components/BottomNavigation';
import { TripManager } from '@/components/TripManager';
import { EnhancedSettingsPanel } from '@/components/EnhancedSettingsPanel';
import { SimpleModeToggle } from '@/components/SimpleModeToggle';
import { EnhancedAIAssistant } from '@/components/EnhancedAIAssistant';
import { LuggageView } from '@/components/LuggageView';
import { EnhancedHelpModal } from '@/components/EnhancedHelpModal';
import { TripSelector } from '@/components/TripSelector';
import { PackingItem } from '@/components/PackingItem';
import { ProgressBar } from '@/components/ProgressBar';
import { GlobalThemeProvider } from '@/components/GlobalThemeProvider';
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
  reducedMotion: boolean;
  screenReader: boolean;
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
    reducedMotion: false,
    screenReader: false,
  });
  const [showSettings, setShowSettings] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [activeTab, setActiveTab] = useState<'trips' | 'help' | 'settings' | 'upgrade'>('trips');
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  const [showLuggageView, setShowLuggageView] = useState(false);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [settingsExpanded, setSettingsExpanded] = useState(false);
  const [customTheme, setCustomTheme] = useState<string>('default');
  const [customFont, setCustomFont] = useState<string>('inter');

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

  // Dark mode effect
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Initialize trips
  useEffect(() => {
    const savedTrips = localStorage.getItem('trips');
    if (savedTrips) {
      setTrips(JSON.parse(savedTrips));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('trips', JSON.stringify(trips));
  }, [trips]);

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

  const handleTripCreate = (tripData: Omit<Trip, 'id'>) => {
    const newTrip: Trip = {
      ...tripData,
      id: Date.now().toString(),
    };
    
    // Set as current trip if no current trip exists
    if (!currentTrip) {
      setCurrentTrip(newTrip);
    }
    
    setTrips([...trips, newTrip]);
  };

  const handleTripSelect = (trip: Trip) => {
    setCurrentTrip(trip);
    setActiveTab('trips');
  };

  const handleTripDelete = (tripId: string) => {
    setTrips(trips.filter(t => t.id !== tripId));
    if (currentTrip?.id === tripId) {
      const remainingTrips = trips.filter(t => t.id !== tripId);
      setCurrentTrip(remainingTrips.length > 0 ? remainingTrips[0] : null);
    }
  };

  const handleTripUpdate = (tripId: string, updates: Partial<Trip>) => {
    setTrips(trips.map(t => t.id === tripId ? { ...t, ...updates } : t));
    if (currentTrip?.id === tripId) {
      setCurrentTrip({ ...currentTrip, ...updates });
    }
  };

  const handleSettingsChange = (key: string, value: any) => {
    if (key === 'darkMode') {
      setDarkMode(value);
    } else if (key === 'simpleMode') {
      setSimpleMode(value);
    } else if (key === 'accessibilitySettings') {
      setAccessibilitySettings(value);
    } else if (key === 'customTheme') {
      setCustomTheme(value);
      localStorage.setItem('customTheme', value);
    } else if (key === 'customFont') {
      setCustomFont(value);
      localStorage.setItem('customFont', value);
    }
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
      setActiveTab('upgrade');
    }
  };

  return (
    <GlobalThemeProvider theme={customTheme} font={customFont}>
      <div className={`min-h-screen pb-20 transition-all duration-300 ${
        darkMode ? 'dark' : ''
      } ${
        accessibilitySettings.highContrast
          ? 'contrast-more bg-black text-yellow-400'
          : 'bg-gray-50 dark:bg-gray-900'
      } ${
        accessibilitySettings.largeText ? 'text-lg' : ''
      } ${
        accessibilitySettings.dyslexiaFont ? 'font-mono' : ''
      }`}>

        {/* Settings Panel */}
        {activeTab === 'settings' && (
          <EnhancedSettingsPanel
            isOpen={activeTab === 'settings'}
            settings={{
              darkMode,
              simpleMode,
              accessibilitySettings,
              customTheme,
              customFont,
            }}
            onSettingsChange={handleSettingsChange}
            subscriptionTier={subscriptionTier}
            onClose={() => setActiveTab('trips')}
          />
        )}

        <div className="container mx-auto px-4 py-6 max-w-md">
          
          {/* Trip Manager */}
          {activeTab === 'trips' && (
            <TripManager
              trips={trips}
              currentTrip={currentTrip}
              onTripSelect={handleTripSelect}
              onTripCreate={handleTripCreate}
              onTripDelete={handleTripDelete}
              onTripUpdate={handleTripUpdate}
              subscriptionTier={subscriptionTier}
            />
          )}

          {/* Help Tab Content */}
          {activeTab === 'help' && (
            <div className="h-[calc(100vh-140px)]">
              <EnhancedAIAssistant
                isOpen={true}
                onClose={() => setActiveTab('trips')}
                onAddItems={addMultipleItems}
              />
            </div>
          )}

          {/* Settings Tab Content */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <EnhancedSettingsPanel
                isOpen={true}
                settings={{
                  darkMode,
                  simpleMode,
                  accessibilitySettings,
                  customTheme,
                  customFont,
                }}
                onSettingsChange={handleSettingsChange}
                subscriptionTier={subscriptionTier}
                onClose={() => setActiveTab('trips')}
              />
            </div>
          )}

          {/* Upgrade Tab Content */}
          {activeTab === 'upgrade' && (
            <SubscriptionModal
              isOpen={true}
              onClose={() => setActiveTab('trips')}
              onSubscribe={handleSubscribe}
            />
          )}

          {/* Main App Content - Only show when on trips tab */}
          {activeTab === 'trips' && currentTrip && (
            <div>
              
              {/* Simple Mode Toggle */}
              <SimpleModeToggle
                simpleMode={simpleMode}
                onToggle={setSimpleMode}
              />
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className={`font-bold ${
                simpleMode || accessibilitySettings.largeText ? 'text-2xl' : 'text-xl'
              } ${
                accessibilitySettings.highContrast ? 'text-yellow-400' : 'text-gray-900 dark:text-white'
              }`}>
                Pack Smart
              </h1>
              <p className={`${
                accessibilitySettings.highContrast ? 'text-yellow-200' : 'text-gray-600 dark:text-gray-400'
              } mt-1 text-sm`}>
                {currentTrip?.name || 'Create your first trip'}
              </p>
            </div>

            <Button
              variant="ghost"
              onClick={() => setActiveTab('settings')}
              className={`rounded-full h-8 w-8 p-0 ${
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
          <div className="grid grid-cols-2 gap-2 mb-4">
            <Button
              onClick={() => requiresSubscription('smart-lists', () => setShowPremadeLists(true))}
              className={`h-12 flex flex-col items-center justify-center gap-1 relative ${
                hasSubscription('smart-lists') 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700' 
                  : 'bg-gray-400 hover:bg-gray-500 opacity-70'
              }`}
              disabled={!hasSubscription('smart-lists')}
            >
              <Sparkles className="h-4 w-4" />
              <span className="text-xs font-medium">Smart Lists</span>
              {!hasSubscription('smart-lists') && (
                <Lock className="h-3 w-3 absolute top-1 right-1 text-white" />
              )}
            </Button>

            <Button
              onClick={() => requiresSubscription('templates', () => setShowTemplates(true))}
              className={`h-12 flex flex-col items-center justify-center gap-1 relative ${
                hasSubscription('templates') 
                  ? 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700' 
                  : 'bg-gray-400 hover:bg-gray-500 opacity-70 border border-gray-300'
              }`}
              disabled={!hasSubscription('templates')}
            >
              <Bookmark className="h-4 w-4" />
              <span className="text-xs font-medium">Templates</span>
              {!hasSubscription('templates') && (
                <Lock className="h-3 w-3 absolute top-1 right-1 text-white" />
              )}
            </Button>
          </div>

          {/* Add Item Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-3 mb-4 shadow-sm">
            <div className="flex gap-2">
              <Input
                placeholder="Add new item..."
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addItem()}
                className="flex-1 h-9 text-sm"
              />
              <Button onClick={addItem} className="px-3 h-9">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Categories */}
          {!simpleMode && (
            <div className="flex gap-1 mb-3 overflow-x-auto pb-2">
              <Button
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('all')}
                className="whitespace-nowrap text-xs h-8 px-3"
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
                    className="whitespace-nowrap text-xs h-8 px-3 capitalize"
                  >
                    {category} ({count})
                  </Button>
                );
              })}
            </div>
          )}

          {/* Progress */}
          <ProgressBar
            current={items.filter(item => item.packed).length}
            total={items.length}
            percentage={items.length > 0 ? Math.round((items.filter(item => item.packed).length / items.length) * 100) : 0}
          />

          {/* Items List */}
          <div className="space-y-2">
            {filteredItems.map(item => (
              <PackingItem
                key={item.id}
                item={item}
                onToggle={() => toggleItem(item.id)}
                onDelete={() => removeItem(item.id)}
                onUpdate={(updatedItem: Item) => {
                  setItems(items.map(i => i.id === updatedItem.id ? updatedItem : i));
                }}
              />
            ))}
            
            {filteredItems.length === 0 && (
              <div className="text-center py-8">
                <div className="text-4xl mb-3">🎒</div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                  Your packing list is empty
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Add items manually or use our smart lists to get started
                </p>
                <Button
                  onClick={() => requiresSubscription('smart-lists', () => setShowPremadeLists(true))}
                  className={hasSubscription('smart-lists') 
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700" 
                    : "bg-gray-400 hover:bg-gray-500 opacity-70 relative"
                  }
                  disabled={!hasSubscription('smart-lists')}
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Browse Smart Lists
                  {!hasSubscription('smart-lists') && (
                    <Lock className="h-3 w-3 absolute top-1 right-1" />
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>
        )}

          {/* Additional Action Buttons */}
          {activeTab === 'trips' && currentTrip && (
            <div className="fixed bottom-20 right-4 flex flex-col gap-2">
              <Button
                onClick={() => setShowLuggageView(true)}
                className="rounded-full h-10 w-10 p-0 bg-green-500 hover:bg-green-600 shadow-lg"
              >
                <Move className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Modals and Overlays */}
        <PremadeListsModal
          isOpen={showPremadeLists}
          onClose={() => setShowPremadeLists(false)}
          onAddItems={addMultipleItems}
        />

        <LuggageLimitsModal
          isOpen={showLuggageLimits}
          onClose={() => setShowLuggageLimits(false)}
        />

        <TripTemplates
          isOpen={showTemplates}
          onClose={() => setShowTemplates(false)}
          templates={templates}
          onLoadTemplate={loadTemplate}
          onSaveTemplate={(name) => saveTemplate(name, items)}
          currentItems={items}
        />

        <HelpModal
          isOpen={showHelp}
          onClose={() => setShowHelp(false)}
        />

        <LuggageView
          isOpen={showLuggageView}
          onClose={() => setShowLuggageView(false)}
          items={items}
          onToggleItem={toggleItem}
        />

        <BottomNavigation 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
          subscriptionTier={subscriptionTier}
          hasSubscription={subscriptionTier !== 'free'}
        />
      </div>
    </GlobalThemeProvider>
  );
}
