
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Settings, Moon, Sun, RotateCcw, Edit3, Check, Sparkles, List, Grid3X3, Package, MapPin, Calendar, Info, HelpCircle, Menu } from 'lucide-react';
import { CategorySection } from '@/components/CategorySection';
import { ProgressBar } from '@/components/ProgressBar';
import { PremadeListsModal } from '@/components/PremadeListsModal';
import { LuggageView } from '@/components/LuggageView';
import { TripSelector, Trip } from '@/components/TripSelector';
import { SimpleModeToggle } from '@/components/SimpleModeToggle';
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
  const [showCompleted, setShowCompleted] = useState(true);
  const [showPremadeLists, setShowPremadeLists] = useState(false);
  const [checklistMode, setChecklistMode] = useState(false);
  const [showLuggageView, setShowLuggageView] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const { toast } = useToast();

  // Load data from localStorage on mount
  useEffect(() => {
    const savedTrips = localStorage.getItem('trips');
    const savedCurrentTripId = localStorage.getItem('currentTripId');
    const savedDarkMode = localStorage.getItem('darkMode');
    const savedSimpleMode = localStorage.getItem('simpleMode');

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
  }, []);

  // Save all settings to localStorage
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
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode, simpleMode]);

  // Create default trip if none exist
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

  // Enhanced duration-based quantity suggestion
  const suggestQuantity = (itemName: string, category: string): number => {
    const currentTrip = trips.find(t => t.id === currentTripId);
    if (!currentTrip?.startDate || !currentTrip?.endDate) return 1;
    
    const duration = Math.ceil((currentTrip.endDate.getTime() - currentTrip.startDate.getTime()) / (1000 * 60 * 60 * 24));
    const lowerName = itemName.toLowerCase();
    
    // Smart quantity suggestions based on item type and trip duration
    if (category === 'clothes') {
      if (lowerName.includes('shirt') || lowerName.includes('t-shirt') || lowerName.includes('top')) {
        return Math.min(duration + 1, 10); // Extra shirt for buffer
      }
      if (lowerName.includes('underwear') || lowerName.includes('sock')) {
        return duration + 2; // Extra underwear/socks
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
    // Save current items before switching
    if (currentTripId) {
      localStorage.setItem(`items_${currentTripId}`, JSON.stringify(items));
    }
    
    // Load items for selected trip
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

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      darkMode ? 'dark bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
    }`}>
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Clean Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-6">
            {/* Left: App Title */}
            <div className="flex items-center gap-4">
              <motion.h1 
                className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
                animate={{ 
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
              >
                PackSmart
              </motion.h1>
              <p className="text-lg text-muted-foreground font-medium hidden md:block">
                Your intelligent travel companion ✈️
              </p>
            </div>

            {/* Right: Menu Toggle */}
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => setShowPremadeLists(true)}
                className="rounded-full shadow-lg hover:shadow-xl transition-all duration-200 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 hover:from-blue-700 hover:to-purple-700"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Smart Lists
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowMenu(!showMenu)}
                className="rounded-full shadow-lg hover:shadow-xl transition-all duration-200 relative"
              >
                <Menu className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Trip Progress Card */}
          {currentTrip && (
            <motion.div 
              className="mb-6 bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/20 dark:border-gray-700/20"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="text-left">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    {currentTrip.name}
                  </h2>
                  {currentTrip.destination && (
                    <p className="text-gray-600 dark:text-gray-300 flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {currentTrip.destination}
                    </p>
                  )}
                </div>
                
                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    {Math.round(progressPercentage)}%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
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
                <div className="mt-4 flex items-center justify-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
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

        {/* Side Menu */}
        <AnimatePresence>
          {showMenu && (
            <motion.div
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              className="fixed top-0 right-0 h-full w-80 bg-white dark:bg-gray-900 shadow-2xl z-50 p-6 border-l border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Settings & Options</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowMenu(false)}>
                  <Edit3 className="h-4 w-4 rotate-45" />
                </Button>
              </div>

              <div className="space-y-4">
                <Button
                  variant="outline"
                  onClick={() => setDarkMode(!darkMode)}
                  className="w-full justify-start"
                >
                  {darkMode ? <Sun className="h-4 w-4 mr-2" /> : <Moon className="h-4 w-4 mr-2" />}
                  {darkMode ? 'Light Mode' : 'Dark Mode'}
                </Button>

                <SimpleModeToggle 
                  simpleMode={simpleMode} 
                  onToggle={setSimpleMode} 
                />

                <Button
                  variant="outline"
                  onClick={() => setChecklistMode(!checklistMode)}
                  className="w-full justify-start"
                >
                  {checklistMode ? <Grid3X3 className="h-4 w-4 mr-2" /> : <List className="h-4 w-4 mr-2" />}
                  {checklistMode ? 'Grid View' : 'Checklist Mode'}
                </Button>

                {totalItems > 0 && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowLuggageView(true);
                      setShowMenu(false);
                    }}
                    className="w-full justify-start"
                  >
                    <Package className="h-4 w-4 mr-2" />
                    View by Luggage
                  </Button>
                )}

                <Button
                  variant="outline"
                  onClick={() => {
                    setShowHelp(true);
                    setShowMenu(false);
                  }}
                  className="w-full justify-start"
                >
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Help & Guide
                </Button>

                <Button
                  variant="outline"
                  onClick={() => {
                    resetList();
                    setShowMenu(false);
                  }}
                  className="w-full justify-start hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20"
                  disabled={totalItems === 0}
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Clear All Items
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Backdrop for menu */}
        {showMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setShowMenu(false)}
          />
        )}

        {/* Trip Selector */}
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

        {/* Categories */}
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

        {/* Show/Hide Completed Toggle */}
        {packedItems > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mt-8"
          >
            <Button
              variant="outline"
              onClick={() => setShowCompleted(!showCompleted)}
              className="rounded-full shadow-lg hover:shadow-xl transition-all duration-200 bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg"
            >
              {showCompleted ? 'Hide' : 'Show'} Packed Items ({packedItems})
            </Button>
          </motion.div>
        )}

        {/* Enhanced Empty State */}
        {totalItems === 0 && currentTripId && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <motion.div 
              className="text-8xl mb-6"
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
            <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Ready for your adventure?
            </h3>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Start by adding items to your categories above, or explore our smart packing lists tailored for your destination!
            </p>
            <div className="space-y-4">
              <Button 
                onClick={() => setShowPremadeLists(true)}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-200"
              >
                <Sparkles className="h-5 w-5 mr-3" />
                Explore Smart Lists
              </Button>
              <p className="text-sm text-gray-500">
                Or click the + button on any category to add items manually
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Modals */}
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

      {/* Enhanced Help Modal */}
      {showHelp && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-900 rounded-3xl p-8 max-w-4xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Welcome to PackSmart! 🎒
              </h2>
              <Button variant="ghost" onClick={() => setShowHelp(false)} className="rounded-full">
                <Edit3 className="h-5 w-5 rotate-45" />
              </Button>
            </div>
            
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl p-6">
                  <div className="text-4xl mb-3">🗂️</div>
                  <h3 className="font-bold text-lg mb-2">Managing Trips</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Create multiple trips, set dates and destinations. Each trip has its own packing list that saves automatically.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-2xl p-6">
                  <div className="text-4xl mb-3">✨</div>
                  <h3 className="font-bold text-lg mb-2">Smart Packing Lists</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Browse pre-made lists for destinations like Hawaii, Paris, or activities like camping. Preview before adding!
                  </p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-2xl p-6">
                  <div className="text-4xl mb-3">🧳</div>
                  <h3 className="font-bold text-lg mb-2">Luggage Organization</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Assign items to carry-on, checked bags, or backpack. View by luggage type to see what goes where.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-2xl p-6">
                  <div className="text-4xl mb-3">📋</div>
                  <h3 className="font-bold text-lg mb-2">Packing Modes</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Switch between detailed grid view and simple checklist mode. Perfect for checking off items while packing.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20 rounded-2xl p-6">
                  <div className="text-4xl mb-3">🔢</div>
                  <h3 className="font-bold text-lg mb-2">Smart Quantities</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Set trip duration and get automatic quantity suggestions. 7 days = 7 shirts, plus extras for safety!
                  </p>
                </div>

                <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 rounded-2xl p-6">
                  <div className="text-4xl mb-3">👁️</div>
                  <h3 className="font-bold text-lg mb-2">Simple Mode</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Toggle Simple Mode for a cleaner interface with larger buttons - perfect for less tech-savvy users.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  Pro Tips for Better Packing
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>• Set your trip dates for automatic quantity suggestions</div>
                  <div>• Use Smart Lists as starting points, then customize</div>
                  <div>• Assign items to luggage types before traveling</div>
                  <div>• Try Checklist Mode when actually packing</div>
                  <div>• Create separate trips for different occasions</div>
                  <div>• Use categories to stay organized</div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <Button 
                onClick={() => setShowHelp(false)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl px-8 py-3"
              >
                <Check className="h-4 w-4 mr-2" />
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
