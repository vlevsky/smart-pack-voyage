import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Settings, Moon, Sun, RotateCcw, Edit3, Check, Sparkles, List, Grid3X3, Package, MapPin, Calendar, Info, HelpCircle, Menu, Volume2, Luggage, Eye, ZoomIn, Target, DollarSign, Clock, Shield, X, Contrast, Type, Volume, VolumeX, Accessibility, Bot, Save, Trophy, CreditCard } from 'lucide-react';
import { CategorySection } from '@/components/CategorySection';
import { ProgressBar } from '@/components/ProgressBar';
import { PremadeListsModal } from '@/components/PremadeListsModal';
import { LuggageView } from '@/components/LuggageView';
import { LuggageLimitsModal } from '@/components/LuggageLimitsModal';
import { TripSelector, Trip } from '@/components/TripSelector';
import { SimpleModeToggle } from '@/components/SimpleModeToggle';
import { SubscriptionModal } from '@/components/SubscriptionModal';
import { AIPackingAssistant } from '@/components/AIPackingAssistant';
import { TripTemplates } from '@/components/TripTemplates';
import { TripCountdown } from '@/components/TripCountdown';
import { PackingGameMode } from '@/components/PackingGameMode';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { PackingItemType } from '@/components/PackingItem';

interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

const defaultCategories: Category[] = [
  { id: 'clothes', name: 'Clothes', icon: '👕', color: 'bg-blue-500' },
  { id: 'toiletries', name: 'Toiletries', icon: '🧴', color: 'bg-green-500' },
  { id: 'electronics', name: 'Electronics', icon: '📱', color: 'bg-purple-500' },
  { id: 'documents', name: 'Documents', icon: '📋', color: 'bg-orange-500' },
  { id: 'miscellaneous', name: 'Miscellaneous', icon: '🎒', color: 'bg-pink-500' },
];

const Index = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [currentTripId, setCurrentTripId] = useState<string | null>(null);
  const [items, setItems] = useState<PackingItemType[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const [simpleMode, setSimpleMode] = useState(false);
  const [accessibilityMode, setAccessibilityMode] = useState(false);
  const [largeTextMode, setLargeTextMode] = useState(false);
  const [highContrastMode, setHighContrastMode] = useState(false);
  const [dyslexiaFriendlyMode, setDyslexiaFriendlyMode] = useState(false);
  const [motionReduced, setMotionReduced] = useState(false);
  const [voiceHintsEnabled, setVoiceHintsEnabled] = useState(false);
  const [showCompleted, setShowCompleted] = useState(true);
  const [showPremadeLists, setShowPremadeLists] = useState(false);
  const [showLuggageLimits, setShowLuggageLimits] = useState(false);
  const [checklistMode, setChecklistMode] = useState(false);
  const [showLuggageView, setShowLuggageView] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [voiceNavigationEnabled, setVoiceNavigationEnabled] = useState(false);
  const [showSubscription, setShowSubscription] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [gameMode, setGameMode] = useState(false);
  const [subscription, setSubscription] = useState<string | null>(null);
  const [dragDropMode, setDragDropMode] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const savedTrips = localStorage.getItem('trips');
    const savedCurrentTripId = localStorage.getItem('currentTripId');
    const savedDarkMode = localStorage.getItem('darkMode');
    const savedSimpleMode = localStorage.getItem('simpleMode');
    const savedAccessibilityMode = localStorage.getItem('accessibilityMode');

    if (savedTrips) {
      const parsedTrips = JSON.parse(savedTrips).map((trip: any) => ({
        ...trip,
        startDate: trip.startDate ? new Date(trip.startDate) : undefined,
        endDate: trip.endDate ? new Date(trip.endDate) : undefined,
        created: new Date(trip.created),
      }));
      setTrips(parsedTrips);
    }
    
    if (savedCurrentTripId) {
      setCurrentTripId(savedCurrentTripId);
      const savedItems = localStorage.getItem(`items_${savedCurrentTripId}`);
      if (savedItems) setItems(JSON.parse(savedItems));
    }
    
    if (savedDarkMode) setDarkMode(JSON.parse(savedDarkMode));
    if (savedSimpleMode) setSimpleMode(JSON.parse(savedSimpleMode));
    if (savedAccessibilityMode) setAccessibilityMode(JSON.parse(savedAccessibilityMode));
  }, []);

  useEffect(() => {
    localStorage.setItem('trips', JSON.stringify(trips));
  }, [trips]);

  useEffect(() => {
    if (currentTripId) {
      localStorage.setItem('currentTripId', currentTripId);
    }
  }, [currentTripId]);

  useEffect(() => {
    if (currentTripId) {
      localStorage.setItem(`items_${currentTripId}`, JSON.stringify(items));
    }
  }, [items, currentTripId]);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    localStorage.setItem('simpleMode', JSON.stringify(simpleMode));
    localStorage.setItem('accessibilityMode', JSON.stringify(accessibilityMode));
    
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    if (largeTextMode) {
      document.documentElement.classList.add('text-lg');
    } else {
      document.documentElement.classList.remove('text-lg');
    }

    if (highContrastMode) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  }, [darkMode, simpleMode, accessibilityMode, largeTextMode, highContrastMode]);

  useEffect(() => {
    if (trips.length === 0) {
      const defaultTrip: Trip = {
        id: Date.now().toString(),
        name: 'My Amazing Trip',
        created: new Date(),
      };
      setTrips([defaultTrip]);
      setCurrentTripId(defaultTrip.id);
    }
  }, [trips.length]);

  useEffect(() => {
    const savedSubscription = localStorage.getItem('subscription');
    const savedGameMode = localStorage.getItem('gameMode');
    if (savedSubscription) setSubscription(savedSubscription);
    if (savedGameMode) setGameMode(JSON.parse(savedGameMode));
  }, []);

  useEffect(() => {
    if (subscription) {
      localStorage.setItem('subscription', subscription);
    }
    localStorage.setItem('gameMode', JSON.stringify(gameMode));
  }, [subscription, gameMode]);

  const startVoiceNavigation = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.onresult = (event: any) => {
        const command = event.results[event.results.length - 1][0].transcript.toLowerCase();
        
        if (command.includes('show luggage')) {
          setShowLuggageView(true);
        } else if (command.includes('add item')) {
          const inputs = document.querySelectorAll('input[placeholder*="Add"]');
          if (inputs.length > 0) {
            (inputs[0] as HTMLInputElement).focus();
          }
        } else if (command.includes('help')) {
          setShowHelp(true);
        }
      };
      recognition.start();
      setVoiceNavigationEnabled(true);
    }
  };

  const stopVoiceNavigation = () => {
    setVoiceNavigationEnabled(false);
  };

  const suggestQuantity = (itemName: string, category: string): number => {
    const currentTrip = trips.find(t => t.id === currentTripId);
    if (!currentTrip?.startDate || !currentTrip?.endDate) return 1;
    
    const duration = Math.ceil((currentTrip.endDate.getTime() - currentTrip.startDate.getTime()) / (1000 * 60 * 60 * 24));
    const lowerName = itemName.toLowerCase();
    
    if (category === 'clothes') {
      if (lowerName.includes('shirt') || lowerName.includes('t-shirt') || lowerName.includes('top')) {
        return Math.min(duration + 1, 10);
      }
      if (lowerName.includes('underwear') || lowerName.includes('sock')) {
        return duration + 2;
      }
      if (lowerName.includes('pants') || lowerName.includes('jeans') || lowerName.includes('trouser')) {
        return Math.max(Math.ceil(duration / 3), 2);
      }
      if (lowerName.includes('sweater') || lowerName.includes('jacket')) {
        return Math.max(Math.ceil(duration / 4), 1);
      }
    }
    
    if (category === 'toiletries') {
      if (lowerName.includes('toothbrush')) return 1;
      if (lowerName.includes('contact') && lowerName.includes('lens')) return duration;
      if (lowerName.includes('shampoo') || lowerName.includes('soap')) {
        return duration > 7 ? 2 : 1;
      }
    }
    
    return 1;
  };

  const handleCreateTrip = (tripData: Omit<Trip, 'id' | 'created'>): string => {
    const newTrip: Trip = {
      ...tripData,
      id: Date.now().toString(),
      created: new Date(),
    };
    setTrips(prev => [...prev, newTrip]);
    return newTrip.id;
  };

  const handleSelectTrip = (tripId: string) => {
    if (currentTripId) {
      localStorage.setItem(`items_${currentTripId}`, JSON.stringify(items));
    }
    
    const savedItems = localStorage.getItem(`items_${tripId}`);
    setItems(savedItems ? JSON.parse(savedItems) : []);
    setCurrentTripId(tripId);
  };

  const handleUpdateTrip = (tripId: string, updates: Partial<Trip>) => {
    setTrips(prev => prev.map(trip => 
      trip.id === tripId ? { ...trip, ...updates } : trip
    ));
  };

  const handleDeleteTrip = (tripId: string) => {
    if (trips.length === 1) {
      toast({
        title: "Cannot delete trip",
        description: "You must have at least one trip.",
        variant: "destructive",
      });
      return;
    }
    
    setTrips(prev => prev.filter(trip => trip.id !== tripId));
    localStorage.removeItem(`items_${tripId}`);
    
    if (currentTripId === tripId) {
      const remainingTrips = trips.filter(trip => trip.id !== tripId);
      setCurrentTripId(remainingTrips[0]?.id || null);
    }
    
    toast({
      title: "Trip deleted",
      description: "Trip and all its items have been removed.",
    });
  };

  const addItem = (name: string, category: string) => {
    const quantity = suggestQuantity(name, category);
    const newItem: PackingItemType = {
      id: Date.now().toString(),
      name,
      packed: false,
      category,
      quantity,
    };
    
    setItems([...items, newItem]);
    toast({
      title: "Item added!",
      description: `${name} has been added to your packing list.`,
    });
  };

  const addMultipleItems = (newItems: Array<{ name: string; category: string; quantity?: number; luggage?: string }>) => {
    const itemsToAdd = newItems.map(item => {
      const quantity = item.quantity || suggestQuantity(item.name, item.category);
      return {
        id: (Date.now() + Math.random()).toString(),
        name: item.name,
        packed: false,
        category: item.category,
        quantity,
        luggage: item.luggage,
      };
    });

    setItems(prev => [...prev, ...itemsToAdd]);
  };

  const toggleItem = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, packed: !item.packed } : item
    ));
  };

  const updateItem = (id: string, updates: Partial<PackingItemType>) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ));
  };

  const deleteItem = (id: string) => {
    const item = items.find(i => i.id === id);
    setItems(items.filter(item => item.id !== id));
    if (item) {
      toast({
        title: "Item removed",
        description: `${item.name} has been removed from your list.`,
      });
    }
  };

  const resetList = () => {
    setItems([]);
    toast({
      title: "List cleared",
      description: "All items have been removed from your packing list.",
    });
  };

  const getItemsByCategory = (categoryId: string) => {
    return items.filter(item => item.category === categoryId);
  };

  const currentTrip = trips.find(t => t.id === currentTripId);
  const totalItems = items.length;
  const packedItems = items.filter(item => item.packed).length;
  const progressPercentage = totalItems > 0 ? (packedItems / totalItems) * 100 : 0;

  const daysUntilTrip = currentTrip?.startDate 
    ? Math.ceil((currentTrip.startDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : null;

  const speakText = (text: string) => {
    if (voiceHintsEnabled && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterance);
    }
  };

  const handleSubscribe = (tier: string) => {
    setSubscription(tier);
    toast({
      title: "Subscription activated!",
      description: `Welcome to ${tier} tier! All premium features are now unlocked.`,
    });
  };

  const handleAIGenerateList = (items: Array<{ name: string; category: string; quantity: number }>) => {
    addMultipleItems(items);
    toast({
      title: "AI list generated!",
      description: `Added ${items.length} items to your packing list.`,
    });
  };

  const isFeatureLocked = (feature: string) => {
    if (!subscription) return true;
    
    const tierHierarchy = {
      'one-trip': ['basic', 'smart-lists', 'ai-assistant'],
      'silver': ['basic', 'smart-lists', 'templates'],
      'gold': ['basic', 'smart-lists', 'ai-assistant', 'templates', 'game-mode'],
      'exclusive': ['basic', 'smart-lists', 'ai-assistant', 'templates', 'game-mode', 'advanced-features']
    };
    
    return !tierHierarchy[subscription as keyof typeof tierHierarchy]?.includes(feature);
  };

  const LockedFeatureButton = ({ feature, children, onClick }: { feature: string; children: React.ReactNode; onClick: () => void }) => {
    const locked = isFeatureLocked(feature);
    
    return (
      <div className="relative">
        <Button
          onClick={locked ? () => setShowSubscription(true) : onClick}
          className={`${locked ? 'opacity-75 cursor-not-allowed' : ''} relative`}
          disabled={locked}
        >
          {children}
          {locked && (
            <div className="absolute -top-1 -right-1 bg-yellow-500 rounded-full p-1">
              <CreditCard className="h-3 w-3 text-white" />
            </div>
          )}
        </Button>
      </div>
    );
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      darkMode ? 'dark' : ''
    } ${
      highContrastMode ? 'contrast-more bg-black text-white' : 
      darkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 
      'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
    } ${
      largeTextMode ? 'text-lg' : ''
    } ${
      dyslexiaFriendlyMode ? 'font-mono' : ''
    }`}>
      <div className="container mx-auto px-4 py-4 md:py-6 max-w-7xl">
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 md:mb-8"
        >
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <div className="flex items-center gap-2 md:gap-4">
              <motion.h1 
                className={`${simpleMode || largeTextMode ? 'text-3xl md:text-5xl' : 'text-2xl md:text-4xl'} font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent`}
                animate={motionReduced ? {} : { 
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={motionReduced ? {} : { 
                  duration: 8, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
              >
                PackSmart
              </motion.h1>
              
              {!simpleMode && (
                <div className="flex gap-2">
                  <LockedFeatureButton
                    feature="smart-lists"
                    onClick={() => {
                      setShowPremadeLists(true);
                      speakText("Opening smart packing lists");
                    }}
                  >
                    <Sparkles className={`${largeTextMode ? 'h-5 w-5' : 'h-4 w-4'} mr-1 md:mr-2`} />
                    <span className="hidden sm:inline">Smart Lists</span>
                  </LockedFeatureButton>

                  <LockedFeatureButton
                    feature="ai-assistant"
                    onClick={() => {
                      setShowAIAssistant(true);
                      speakText("Opening AI packing assistant");
                    }}
                  >
                    <Bot className={`${largeTextMode ? 'h-5 w-5' : 'h-4 w-4'} mr-1`} />
                    <span className="hidden md:inline">AI Assistant</span>
                  </LockedFeatureButton>

                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowLuggageLimits(true);
                      speakText("Opening airline baggage limits");
                    }}
                    className={`rounded-full shadow-lg hover:shadow-xl transition-all duration-200 ${largeTextMode ? 'text-base px-4 py-2' : 'text-sm px-3 py-2'} md:px-4 md:py-3 md:text-base`}
                  >
                    <Package className={`${largeTextMode ? 'h-5 w-5' : 'h-4 w-4'} mr-1`} />
                    <span className="hidden md:inline">Airlines</span>
                  </Button>
                </div>
              )}
            </div>

            <Button
              variant="outline"
              size={largeTextMode ? 'lg' : 'default'}
              onClick={() => {
                setShowMenu(!showMenu);
                speakText("Opening settings menu");
              }}
              className="rounded-full shadow-lg hover:shadow-xl transition-all duration-200 relative h-10 w-10 md:h-12 md:w-12"
            >
              <Menu className={`${largeTextMode ? 'h-6 w-6' : 'h-4 w-4 md:h-5 md:w-5'}`} />
            </Button>
          </div>

          {currentTrip && (
            <TripCountdown
              tripName={currentTrip.name}
              destination={currentTrip.destination}
              startDate={currentTrip.startDate}
              endDate={currentTrip.endDate}
            />
          )}

          <PackingGameMode
            isEnabled={gameMode}
            onToggle={setGameMode}
            packedItems={packedItems}
            totalItems={totalItems}
            onItemPacked={() => {}}
          />

          {currentTrip && (
            <motion.div 
              className="mb-4 md:mb-6 bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-xl border border-white/20 dark:border-gray-700/20"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 md:mb-4">
                <div className="mb-3 sm:mb-0">
                  <h2 className={`${largeTextMode ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'} font-bold text-gray-900 dark:text-white mb-1`}>
                    {currentTrip.name}
                  </h2>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    {currentTrip.destination && (
                      <p className={`text-gray-600 dark:text-gray-300 flex items-center gap-2 ${largeTextMode ? 'text-base' : 'text-sm'}`}>
                        <MapPin className={`${largeTextMode ? 'h-5 w-5' : 'h-4 w-4'}`} />
                        {currentTrip.destination}
                      </p>
                    )}
                    {daysUntilTrip !== null && daysUntilTrip > 0 && (
                      <p className={`text-blue-600 dark:text-blue-400 font-medium flex items-center gap-2 ${largeTextMode ? 'text-base' : 'text-sm'}`}>
                        <Clock className={`${largeTextMode ? 'h-5 w-5' : 'h-4 w-4'}`} />
                        {daysUntilTrip} days to go
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="text-center sm:text-right">
                  <div className={`${largeTextMode ? 'text-3xl md:text-4xl' : 'text-2xl md:text-3xl'} font-bold text-gray-900 dark:text-white`}>
                    {Math.round(progressPercentage)}%
                  </div>
                  <div className={`${largeTextMode ? 'text-sm md:text-base' : 'text-xs md:text-sm'} text-gray-600 dark:text-gray-300`}>
                    {packedItems} of {totalItems} packed
                  </div>
                </div>
              </div>
              
              <ProgressBar 
                current={packedItems} 
                total={totalItems} 
                percentage={progressPercentage}
              />
              
              {currentTrip.startDate && currentTrip.endDate && (
                <div className={`mt-3 md:mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-center gap-2 sm:gap-4 ${largeTextMode ? 'text-sm md:text-base' : 'text-xs md:text-sm'} text-gray-600 dark:text-gray-300`}>
                  <div className="flex items-center gap-1">
                    <Calendar className={`${largeTextMode ? 'h-5 w-5' : 'h-4 w-4'}`} />
                    <span>
                      {currentTrip.startDate.toLocaleDateString()} - {currentTrip.endDate.toLocaleDateString()}
                    </span>
                  </div>
                  <div className="text-blue-600 dark:text-blue-400 font-medium">
                    {Math.ceil((currentTrip.endDate.getTime() - currentTrip.startDate.getTime()) / (1000 * 60 * 60 * 24))} days
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </motion.div>

        <AnimatePresence>
          {showMenu && (
            <motion.div
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              className={`fixed top-0 right-0 h-full ${simpleMode || largeTextMode ? 'w-full sm:w-96' : 'w-full sm:w-80'} bg-white dark:bg-gray-900 shadow-2xl z-50 p-4 md:p-6 border-l border-gray-200 dark:border-gray-700 overflow-y-auto`}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className={`${largeTextMode ? 'text-xl md:text-2xl' : 'text-lg md:text-xl'} font-bold`}>Settings & Options</h3>
                <Button variant="ghost" size={largeTextMode ? 'lg' : 'sm'} onClick={() => setShowMenu(false)}>
                  <X className={`${largeTextMode ? 'h-6 w-6' : 'h-4 w-4'}`} />
                </Button>
              </div>

              <div className="space-y-6">
                {!subscription && (
                  <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <CreditCard className="h-5 w-5" />
                      <span className="font-semibold">Upgrade to Premium</span>
                    </div>
                    <p className="text-sm opacity-90 mb-3">
                      Unlock AI assistant, advanced templates, and more!
                    </p>
                    <Button
                      onClick={() => setShowSubscription(true)}
                      className="bg-white text-blue-600 hover:bg-gray-100 text-sm"
                    >
                      View Plans
                    </Button>
                  </div>
                )}

                <div className="space-y-4">
                  <h4 className={`${largeTextMode ? 'text-base md:text-lg' : 'text-sm md:text-base'} font-semibold flex items-center gap-2`}>
                    <Eye className="h-4 w-4" />
                    Display Mode
                  </h4>
                  
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      onClick={() => setDarkMode(!darkMode)}
                      className={`w-full justify-start ${largeTextMode ? 'text-base py-4' : 'text-sm py-3'}`}
                    >
                      {darkMode ? <Sun className={`${largeTextMode ? 'h-5 w-5' : 'h-4 w-4'} mr-2`} /> : <Moon className={`${largeTextMode ? 'h-5 w-5' : 'h-4 w-4'} mr-2`} />}
                      {darkMode ? 'Light Mode' : 'Dark Mode'}
                    </Button>

                    <SimpleModeToggle 
                      simpleMode={simpleMode} 
                      onToggle={setSimpleMode}
                      large={largeTextMode}
                    />

                    <Button
                      variant="outline"
                      onClick={() => setChecklistMode(!checklistMode)}
                      className={`w-full justify-start ${largeTextMode ? 'text-base py-4' : 'text-sm py-3'}`}
                    >
                      {checklistMode ? <Grid3X3 className={`${largeTextMode ? 'h-5 w-5' : 'h-4 w-4'} mr-2`} /> : <List className={`${largeTextMode ? 'h-5 w-5' : 'h-4 w-4'} mr-2`} />}
                      {checklistMode ? 'Grid View' : 'Checklist Mode'}
                    </Button>

                    <Button
                      variant="outline"
                      onClick={() => setDragDropMode(!dragDropMode)}
                      className={`w-full justify-start ${largeTextMode ? 'text-base py-4' : 'text-sm py-3'}`}
                    >
                      <Luggage className={`${largeTextMode ? 'h-5 w-5' : 'h-4 w-4'} mr-2`} />
                      Drag & Drop Luggage
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className={`${largeTextMode ? 'text-base md:text-lg' : 'text-sm md:text-base'} font-semibold flex items-center gap-2`}>
                    <Accessibility className="h-4 w-4" />
                    Accessibility (5 Options)
                  </h4>
                  
                  <div className="space-y-3">
                    <Button
                      variant={highContrastMode ? "default" : "outline"}
                      onClick={() => setHighContrastMode(!highContrastMode)}
                      className={`w-full justify-start ${largeTextMode ? 'text-base py-4' : 'text-sm py-3'}`}
                    >
                      <Contrast className={`${largeTextMode ? 'h-5 w-5' : 'h-4 w-4'} mr-2`} />
                      High Contrast Mode
                    </Button>

                    <Button
                      variant={largeTextMode ? "default" : "outline"}
                      onClick={() => setLargeTextMode(!largeTextMode)}
                      className={`w-full justify-start ${largeTextMode ? 'text-base py-4' : 'text-sm py-3'}`}
                    >
                      <ZoomIn className={`${largeTextMode ? 'h-5 w-5' : 'h-4 w-4'} mr-2`} />
                      Large Text Mode
                    </Button>

                    <Button
                      variant={dyslexiaFriendlyMode ? "default" : "outline"}
                      onClick={() => setDyslexiaFriendlyMode(!dyslexiaFriendlyMode)}
                      className={`w-full justify-start ${largeTextMode ? 'text-base py-4' : 'text-sm py-3'}`}
                    >
                      <Type className={`${largeTextMode ? 'h-5 w-5' : 'h-4 w-4'} mr-2`} />
                      Dyslexia Friendly Font
                    </Button>

                    <Button
                      variant={motionReduced ? "default" : "outline"}
                      onClick={() => setMotionReduced(!motionReduced)}
                      className={`w-full justify-start ${largeTextMode ? 'text-base py-4' : 'text-sm py-3'}`}
                    >
                      <Target className={`${largeTextMode ? 'h-5 w-5' : 'h-4 w-4'} mr-2`} />
                      Reduce Motion
                    </Button>

                    <Button
                      variant={voiceHintsEnabled ? "default" : "outline"}
                      onClick={() => setVoiceHintsEnabled(!voiceHintsEnabled)}
                      className={`w-full justify-start ${largeTextMode ? 'text-base py-4' : 'text-sm py-3'}`}
                    >
                      {voiceHintsEnabled ? <Volume2 className={`${largeTextMode ? 'h-5 w-5' : 'h-4 w-4'} mr-2`} /> : <VolumeX className={`${largeTextMode ? 'h-5 w-5' : 'h-4 w-4'} mr-2`} />}
                      Voice Hints
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className={`${largeTextMode ? 'text-base md:text-lg' : 'text-sm md:text-base'} font-semibold`}>Premium Features</h4>
                  
                  <div className="space-y-3">
                    <LockedFeatureButton
                      feature="templates"
                      onClick={() => {
                        setShowTemplates(true);
                        setShowMenu(false);
                      }}
                    >
                      <Save className={`${largeTextMode ? 'h-5 w-5' : 'h-4 w-4'} mr-2`} />
                      Trip Templates
                    </LockedFeatureButton>

                    <LockedFeatureButton
                      feature="game-mode"
                      onClick={() => setGameMode(!gameMode)}
                    >
                      <Trophy className={`${largeTextMode ? 'h-5 w-5' : 'h-4 w-4'} mr-2`} />
                      Game Mode
                    </LockedFeatureButton>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className={`${largeTextMode ? 'text-base md:text-lg' : 'text-sm md:text-base'} font-semibold`}>Actions</h4>
                  
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowHelp(true);
                        setShowMenu(false);
                        speakText("Opening help and tutorial");
                      }}
                      className={`w-full justify-start ${largeTextMode ? 'text-base py-4' : 'text-sm py-3'}`}
                    >
                      <HelpCircle className={`${largeTextMode ? 'h-5 w-5' : 'h-4 w-4'} mr-2`} />
                      Help & Tutorial
                    </Button>

                    <Button
                      variant="outline"
                      onClick={() => {
                        resetList();
                        setShowMenu(false);
                      }}
                      className={`w-full justify-start hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 ${largeTextMode ? 'text-base py-4' : 'text-sm py-3'}`}
                      disabled={totalItems === 0}
                    >
                      <RotateCcw className={`${largeTextMode ? 'h-5 w-5' : 'h-4 w-4'} mr-2`} />
                      Clear All Items
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {showMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setShowMenu(false)}
          />
        )}

        {!simpleMode && (
          <TripSelector
            trips={trips}
            currentTripId={currentTripId}
            onSelectTrip={handleSelectTrip}
            onCreateTrip={handleCreateTrip}
            onUpdateTrip={handleUpdateTrip}
            onDeleteTrip={handleDeleteTrip}
          />
        )}

        {currentTripId && (
          <div className="space-y-6">
            <AnimatePresence mode="wait">
              {defaultCategories.map((category) => {
                const categoryItems = getItemsByCategory(category.id);
                const visibleItems = showCompleted 
                  ? categoryItems 
                  : categoryItems.filter(item => !item.packed);

                return (
                  <CategorySection
                    key={category.id}
                    category={category}
                    items={visibleItems}
                    onAddItem={(name) => addItem(name, category.id)}
                    onToggleItem={toggleItem}
                    onUpdateItem={updateItem}
                    onDeleteItem={deleteItem}
                    showCompleted={showCompleted}
                    checklistMode={checklistMode || simpleMode}
                  />
                );
              })}
            </AnimatePresence>
          </div>
        )}

        {packedItems > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mt-8"
          >
            <Button
              variant="outline"
              onClick={() => setShowCompleted(!showCompleted)}
              className={`rounded-full shadow-lg hover:shadow-xl transition-all duration-200 bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg ${largeTextMode ? 'text-lg px-6 py-3' : ''}`}
            >
              {showCompleted ? 'Hide' : 'Show'} Packed Items ({packedItems})
            </Button>
          </motion.div>
        )}

        {totalItems === 0 && currentTripId && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <motion.div 
              className={`${largeTextMode ? 'text-9xl' : 'text-8xl'} mb-6`}
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              🎒
            </motion.div>
            <h3 className={`${largeTextMode ? 'text-4xl' : 'text-3xl'} font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent`}>
              Ready for your adventure?
            </h3>
            <p className={`${largeTextMode ? 'text-2xl' : 'text-xl'} text-muted-foreground mb-8 max-w-2xl mx-auto`}>
              {simpleMode 
                ? "Start by adding items to your categories above!" 
                : "Start by adding items to your categories above, or explore our smart packing lists tailored for your destination!"
              }
            </p>
            <div className="space-y-4">
              {!simpleMode && (
                <Button 
                  onClick={() => setShowPremadeLists(true)}
                  size={largeTextMode ? 'lg' : 'default'}
                  className={`bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-200 ${largeTextMode ? 'px-10 py-4 text-xl' : 'px-8 py-4 text-lg'}`}
                >
                  <Sparkles className={`${largeTextMode ? 'h-6 w-6' : 'h-5 w-5'} mr-3`} />
                  Explore Smart Lists
                </Button>
              )}
              <p className={`${largeTextMode ? 'text-base' : 'text-sm'} text-gray-500`}>
                Or click the + button on any category to add items manually
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {totalItems > 0 && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-40"
        >
          <Button
            onClick={() => {
              setShowLuggageView(true);
              speakText("Opening luggage view");
            }}
            className={`rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 ${largeTextMode ? 'h-16 w-16' : 'h-12 w-12 md:h-14 md:w-14'}`}
            title="See what's in your luggage"
          >
            <Luggage className={`${largeTextMode ? 'h-8 w-8' : 'h-5 w-5 md:h-6 md:w-6'}`} />
          </Button>
        </motion.div>
      )}

      <PremadeListsModal
        isOpen={showPremadeLists}
        onClose={() => setShowPremadeLists(false)}
        onAddItems={addMultipleItems}
      />

      <LuggageView
        isOpen={showLuggageView}
        onClose={() => setShowLuggageView(false)}
        items={items}
        onToggleItem={toggleItem}
      />

      <LuggageLimitsModal
        isOpen={showLuggageLimits}
        onClose={() => setShowLuggageLimits(false)}
      />

      <SubscriptionModal
        isOpen={showSubscription}
        onClose={() => setShowSubscription(false)}
        onSubscribe={handleSubscribe}
      />

      <AIPackingAssistant
        isOpen={showAIAssistant}
        onClose={() => setShowAIAssistant(false)}
        onGenerateList={handleAIGenerateList}
      />

      <TripTemplates
        isOpen={showTemplates}
        onClose={() => setShowTemplates(false)}
        onLoadTemplate={(template) => {
          setItems(template.items);
          toast({
            title: "Template loaded!",
            description: `Loaded ${template.items.length} items from ${template.name}`,
          });
        }}
        currentItems={items}
        currentTrip={currentTrip}
      />

      {showHelp && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`bg-white dark:bg-gray-900 rounded-2xl md:rounded-3xl p-4 md:p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl ${largeTextMode ? 'text-base md:text-lg' : 'text-sm md:text-base'}`}
          >
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <h2 className={`${largeTextMode ? 'text-2xl md:text-4xl' : 'text-xl md:text-3xl'} font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent`}>
                Welcome to PackSmart! 🎒
              </h2>
              <Button variant="ghost" onClick={() => setShowHelp(false)} className="rounded-full h-8 w-8 md:h-10 md:w-10">
                <X className={`${largeTextMode ? 'h-5 w-5' : 'h-4 w-4'}`} />
              </Button>
            </div>
            
            <div className="space-y-6 md:space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl md:rounded-2xl p-4 md:p-6">
                  <div className={`${largeTextMode ? 'text-4xl md:text-6xl' : 'text-3xl md:text-4xl'} mb-3`}>🗂️</div>
                  <h3 className={`font-bold ${largeTextMode ? 'text-lg md:text-2xl' : 'text-base md:text-lg'} mb-2`}>Managing Trips</h3>
                  <p className={`text-gray-600 dark:text-gray-300 ${largeTextMode ? 'text-base md:text-lg' : 'text-sm md:text-base'}`}>
                    Create multiple trips, set dates and destinations. Each trip has its own packing list that saves automatically.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl md:rounded-2xl p-4 md:p-6">
                  <div className={`${largeTextMode ? 'text-4xl md:text-6xl' : 'text-3xl md:text-4xl'} mb-3`}>✨</div>
                  <h3 className={`font-bold ${largeTextMode ? 'text-lg md:text-2xl' : 'text-base md:text-lg'} mb-2`}>Smart Packing Lists</h3>
                  <p className={`text-gray-600 dark:text-gray-300 ${largeTextMode ? 'text-base md:text-lg' : 'text-sm md:text-base'}`}>
                    Browse 50+ pre-made lists for destinations like Hawaii, Paris, or activities like camping. Preview before adding!
                  </p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl md:rounded-2xl p-4 md:p-6">
                  <div className={`${largeTextMode ? 'text-4xl md:text-6xl' : 'text-3xl md:text-4xl'} mb-3`}>🧳</div>
                  <h3 className={`font-bold ${largeTextMode ? 'text-lg md:text-2xl' : 'text-base md:text-lg'} mb-2`}>Luggage Organization</h3>
                  <p className={`text-gray-600 dark:text-gray-300 ${largeTextMode ? 'text-base md:text-lg' : 'text-sm md:text-base'}`}>
                    Assign items to carry-on, checked bags, or backpack. View by luggage type to see what goes where.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-xl md:rounded-2xl p-4 md:p-6">
                  <div className={`${largeTextMode ? 'text-4xl md:text-6xl' : 'text-3xl md:text-4xl'} mb-3`}>♿</div>
                  <h3 className={`font-bold ${largeTextMode ? 'text-lg md:text-2xl' : 'text-base md:text-lg'} mb-2`}>5 Accessibility Features</h3>
                  <p className={`text-gray-600 dark:text-gray-300 ${largeTextMode ? 'text-base md:text-lg' : 'text-sm md:text-base'}`}>
                    High contrast, large text, dyslexia-friendly fonts, motion reduction, and voice hints for easier use.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-xl md:rounded-2xl p-4 md:p-6">
                  <div className={`${largeTextMode ? 'text-4xl md:text-6xl' : 'text-3xl md:text-4xl'} mb-3`}>✈️</div>
                  <h3 className={`font-bold ${largeTextMode ? 'text-lg md:text-2xl' : 'text-base md:text-lg'} mb-2`}>75+ Airlines Database</h3>
                  <p className={`text-gray-600 dark:text-gray-300 ${largeTextMode ? 'text-base md:text-lg' : 'text-sm md:text-base'}`}>
                    Check baggage limits, fees, and restrictions for major airlines worldwide. Switch between metric/imperial units.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20 rounded-xl md:rounded-2xl p-4 md:p-6">
                  <div className={`${largeTextMode ? 'text-4xl md:text-6xl' : 'text-3xl md:text-4xl'} mb-3`}>📱</div>
                  <h3 className={`font-bold ${largeTextMode ? 'text-lg md:text-2xl' : 'text-base md:text-lg'} mb-2`}>Mobile-First Design</h3>
                  <p className={`text-gray-600 dark:text-gray-300 ${largeTextMode ? 'text-base md:text-lg' : 'text-sm md:text-base'}`}>
                    Optimized for phones with touch-friendly controls, spacious layouts, and offline functionality.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl md:rounded-2xl p-4 md:p-6">
                <h3 className={`font-bold ${largeTextMode ? 'text-lg md:text-2xl' : 'text-base md:text-lg'} mb-4 flex items-center gap-2`}>
                  <Info className={`${largeTextMode ? 'h-5 w-5 md:h-6 md:w-6' : 'h-4 w-4 md:h-5 md:w-5'}`} />
                  Step-by-Step Guide
                </h3>
                <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${largeTextMode ? 'text-base md:text-lg' : 'text-sm md:text-base'}`}>
                  <div>
                    <strong>1. Create a Trip:</strong> Tap the trip selector to add your destination and dates
                  </div>
                  <div>
                    <strong>2. Add Items:</strong> Use the + button on categories or browse Smart Lists
                  </div>
                  <div>
                    <strong>3. Preview Lists:</strong> Check what's included before adding to your trip
                  </div>
                  <div>
                    <strong>4. Assign Luggage:</strong> Use the luggage button to organize by bag type
                  </div>
                  <div>
                    <strong>5. Check Airlines:</strong> View baggage limits for your airline
                  </div>
                  <div>
                    <strong>6. Pack & Track:</strong> Check off items as you pack them
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 md:mt-8 flex justify-center">
              <Button 
                onClick={() => setShowHelp(false)}
                className={`bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl md:rounded-2xl ${largeTextMode ? 'px-8 py-4 text-lg md:text-xl' : 'px-6 py-3 md:px-8 md:py-3'}`}
              >
                <Check className={`${largeTextMode ? 'h-5 w-5 md:h-6 md:w-6' : 'h-4 w-4'} mr-2`} />
                Got it, let's start packing!
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Index;
