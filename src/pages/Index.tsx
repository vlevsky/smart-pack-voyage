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
import { GameModeTab } from '@/components/GameModeTab';
import { SmartSuggestions } from '@/components/SmartSuggestions';
import { GameModeSubscriptionModal } from '@/components/GameModeSubscriptionModal';
import { QuickAddModal } from '@/components/QuickAddModal';
import { PackingListManager } from '@/components/PackingListManager';
import { TravelTools } from '@/components/TravelTools';

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
  numberOfPeople?: number;
  tripType?: 'business' | 'evening' | 'casual';
  notes?: string;
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
  const [activeTab, setActiveTab] = useState<'trips' | 'game' | 'help' | 'settings' | 'upgrade' | 'tools'>('trips');
  const [showGameModeSubscription, setShowGameModeSubscription] = useState(false);
  const [showQuickAdd, setShowQuickAdd] = useState(false);

  // Handle tab changes to show/hide modals
  useEffect(() => {
    setShowHelp(activeTab === 'help');
    setShowSettings(activeTab === 'settings');
    if (activeTab === 'upgrade') {
      setShowSubscriptionModal(true);
    }
  }, [activeTab]);
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
  const [lastAddedItem, setLastAddedItem] = useState<string>('');
  const [blockedSuggestions, setBlockedSuggestions] = useState<string[]>([]);
  const [currentPackingListId, setCurrentPackingListId] = useState<string | null>(null);
  const [currentPackingListName, setCurrentPackingListName] = useState<string>('');

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
      setLastAddedItem(newItem);
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
    if (newItems.length > 0) {
      setLastAddedItem(newItems[newItems.length - 1].name);
    }
  };

  const addSuggestedItem = (item: { name: string; category: string; quantity?: number }) => {
    const numberOfPeople = currentTrip?.numberOfPeople || 1;
    const baseQuantity = item.quantity || 1;
    const finalQuantity = baseQuantity * numberOfPeople;
    
    const newItemObject: Item = {
      id: Date.now().toString(),
      name: item.name,
      category: item.category,
      packed: false,
      quantity: finalQuantity,
    };
    setItems([...items, newItemObject]);
    setLastAddedItem(item.name);
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

  const handleGameModeAccess = () => {
    if (hasSubscription('game-mode')) {
      setActiveTab('game');
    } else {
      setShowGameModeSubscription(true);
    }
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

  // Auto-sort items: unpacked first, then packed at bottom
  const sortedItems = [...items].sort((a, b) => {
    if (a.packed === b.packed) return 0;
    return a.packed ? 1 : -1;
  });
  
  const filteredItems = selectedCategory === 'all' ? sortedItems : sortedItems.filter(item => item.category === selectedCategory);

  const hasSubscription = (feature: string) => {
    if (subscriptionTier === 'free') {
      // Only basic features are free
      return ['basic-lists', 'manual-add', 'simple-categories'].includes(feature);
    }

    const tierFeatures = {
      'one-trip': ['all'], // All features for one trip
      silver: ['smart-lists', 'templates', 'countdown', 'multiple-lists'],
      gold: ['smart-lists', 'templates', 'countdown', 'multiple-lists', 'game-mode', 'ai-assistant', 'drag-drop'],
      exclusive: ['all'] // All features including priority support
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
            <div className="space-y-6">
              <TripManager
                trips={trips}
                currentTrip={currentTrip}
                onTripSelect={handleTripSelect}
                onTripCreate={handleTripCreate}
                onTripDelete={handleTripDelete}
                onTripUpdate={handleTripUpdate}
                subscriptionTier={subscriptionTier}
              />
            </div>
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

          {/* Game Tab Content */}
          {activeTab === 'game' && (
            <GameModeTab
              packedItems={items.filter(item => item.packed).length}
              totalItems={items.length}
            />
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

          {/* Tools Tab Content */}
          {activeTab === 'tools' && (
            <div className="h-[calc(100vh-140px)] overflow-y-auto">
              <TravelTools onClose={() => setActiveTab('trips')} />
            </div>
          )}

          {/* Main App Content - Only show when on trips tab */}
          {activeTab === 'trips' && currentTrip && (
            <div className="space-y-6">
              {/* Simple Mode Toggle */}
              <SimpleModeToggle
                simpleMode={simpleMode}
                onToggle={setSimpleMode}
              />

              {/* Header */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-3xl p-6 mb-6 border border-blue-100 dark:border-blue-800">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className={`font-bold ${
                      simpleMode || accessibilitySettings.largeText ? 'text-3xl' : 'text-2xl'
                    } ${
                      accessibilitySettings.highContrast ? 'text-yellow-400' : 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'
                    }`}>
                      Pack Smart
                    </h1>
                    <p className={`${
                      accessibilitySettings.highContrast ? 'text-yellow-200' : 'text-gray-600 dark:text-gray-300'
                    } mt-2 text-sm font-medium`}>
                      {currentTrip?.name || 'Create your first trip'}
                    </p>
                  </div>

                  <Button
                    variant="ghost"
                    onClick={() => setActiveTab('settings')}
                    className={`rounded-full h-12 w-12 p-0 hover:bg-white/50 dark:hover:bg-gray-800/50 ${
                      accessibilitySettings.highContrast ? 'text-yellow-400 hover:bg-yellow-400/10' : ''
                    }`}
                  >
                    ⚙️
                  </Button>
                </div>
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

              {/* Packing Lists Management */}
              {currentTrip && (
                <div className="mb-6">
                  <PackingListManager
                    tripId={currentTrip.id}
                    onListSelect={(listId, listName) => {
                      setCurrentPackingListId(listId);
                      setCurrentPackingListName(listName);
                    }}
                    selectedListId={currentPackingListId}
                    subscriptionTier={subscriptionTier}
                  />
                </div>
              )}

              {/* Only show packing interface if a list is selected */}
              {currentPackingListId && (
                <div>
                  {/* Current List Header */}
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-4 mb-6 border border-green-200 dark:border-green-800">
                    <div className="flex items-center gap-3">
                      <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-semibold text-green-700 dark:text-green-300">
                        Currently editing: {currentPackingListName}
                      </span>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <Button
                      onClick={() => requiresSubscription('smart-lists', () => setShowPremadeLists(true))}
                      className={`h-16 flex flex-col items-center justify-center gap-2 relative rounded-2xl transition-all duration-200 hover:scale-105 ${
                        hasSubscription('smart-lists') 
                          ? 'bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg' 
                          : 'bg-gray-400 hover:bg-gray-500 opacity-70'
                      }`}
                      disabled={!hasSubscription('smart-lists')}
                    >
                      <Sparkles className="h-4 w-4" />
                      <span className="text-xs font-medium">Smart Lists</span>
                      {!hasSubscription('smart-lists') && (
                        <Lock className="h-3 w-3 absolute top-2 right-2 text-white" />
                      )}
                    </Button>

                    <Button
                      onClick={() => requiresSubscription('templates', () => setShowTemplates(true))}
                      className={`h-16 flex flex-col items-center justify-center gap-2 relative rounded-2xl transition-all duration-200 hover:scale-105 ${
                        hasSubscription('templates') 
                          ? 'bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 shadow-lg hover:shadow-xl' 
                          : 'bg-gray-400 hover:bg-gray-500 opacity-70 border-2 border-gray-300'
                      }`}
                      disabled={!hasSubscription('templates')}
                    >
                      <Bookmark className="h-4 w-4" />
                      <span className="text-xs font-medium">Templates</span>
                      {!hasSubscription('templates') && (
                        <Lock className="h-3 w-3 absolute top-2 right-2 text-white" />
                      )}
                    </Button>

                    <Button
                      onClick={() => setShowQuickAdd(true)}
                      className="h-16 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-2xl transition-all duration-200 hover:scale-105 shadow-lg"
                    >
                      <Plus className="h-4 w-4" />
                      <span className="text-xs font-medium">Quick Add</span>
                    </Button>
                  </div>

                  {/* Add Item Section */}
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 mb-6 shadow-lg border border-gray-100 dark:border-gray-700">
                    <div className="flex gap-3">
                      <Input
                        placeholder="Add new item..."
                        value={newItem}
                        onChange={(e) => setNewItem(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addItem()}
                        className="flex-1 h-10 text-sm rounded-xl border-gray-200 dark:border-gray-600"
                      />
                      <Button onClick={addItem} className="px-4 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Categories */}
                  {!simpleMode && (
                    <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                      <Button
                        variant={selectedCategory === 'all' ? 'default' : 'outline'}
                        onClick={() => setSelectedCategory('all')}
                        className="whitespace-nowrap text-xs h-8 px-3 rounded-full"
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
                            className="whitespace-nowrap text-xs h-8 px-3 capitalize rounded-full"
                          >
                            {category} ({count})
                          </Button>
                        );
                      })}
                    </div>
                  )}

                  {/* Smart Suggestions */}
                  <SmartSuggestions
                    lastAddedItem={lastAddedItem}
                    onAddItem={addSuggestedItem}
                    blockedItems={blockedSuggestions}
                    onBlockItem={(item) => setBlockedSuggestions([...blockedSuggestions, item])}
                  />

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
                        onUpdate={(updates: Partial<Item>) => {
                          setItems(items.map(i => i.id === item.id ? { ...i, ...updates } : i));
                        }}
                        textSize={accessibilitySettings.largeText ? 'large' : 'normal'}
                      />
                    ))}
                    
                    {filteredItems.length === 0 && (
                      <div className="text-center py-12 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-700">
                        <div className="text-6xl mb-4">🎒</div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                          Your packing list is empty
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 max-w-xs mx-auto">
                          Add items manually or use our smart lists to get started on your perfect packing list
                        </p>
                        <Button
                          onClick={() => requiresSubscription('smart-lists', () => setShowPremadeLists(true))}
                          className={`relative rounded-2xl transition-all duration-200 hover:scale-105 ${hasSubscription('smart-lists') 
                            ? "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg" 
                            : "bg-gray-400 hover:bg-gray-500 opacity-70"
                          }`}
                          disabled={!hasSubscription('smart-lists')}
                        >
                          <Sparkles className="h-4 w-4 mr-2" />
                          Browse Smart Lists
                          {!hasSubscription('smart-lists') && (
                            <Lock className="h-4 w-4 absolute top-2 right-2" />
                          )}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Additional Action Buttons */}
        {activeTab === 'trips' && currentTrip && currentPackingListId && (
          <div className="fixed bottom-20 right-4 flex flex-col gap-3">
            <Button
              onClick={() => setShowLuggageView(true)}
              className="rounded-2xl h-12 w-12 p-0 bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-110"
            >
              <Move className="h-5 w-5" />
            </Button>
          </div>
        )}

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

        <EnhancedHelpModal
          isOpen={showHelp}
          onClose={() => {
            setShowHelp(false);
            setActiveTab('trips');
          }}
        />

        <LuggageView
          isOpen={showLuggageView}
          onClose={() => setShowLuggageView(false)}
          items={items}
          onToggleItem={toggleItem}
        />

        <GameModeSubscriptionModal
          isOpen={showGameModeSubscription}
          onClose={() => setShowGameModeSubscription(false)}
          onUpgrade={() => {
            setShowGameModeSubscription(false);
            setActiveTab('upgrade');
          }}
        />

        <QuickAddModal
          isOpen={showQuickAdd}
          onClose={() => setShowQuickAdd(false)}
          onAddItem={addSuggestedItem}
          existingItems={items.map(item => item.name.toLowerCase())}
          tripType={currentTrip?.tripType}
          numberOfPeople={currentTrip?.numberOfPeople}
        />

        <BottomNavigation 
          activeTab={activeTab} 
          onTabChange={(tab) => {
            if (tab === 'game') {
              handleGameModeAccess();
            } else {
              setActiveTab(tab);
            }
          }} 
          subscriptionTier={subscriptionTier}
          hasSubscription={subscriptionTier !== 'free'}
        />
      </div>
    </GlobalThemeProvider>
  );
}
