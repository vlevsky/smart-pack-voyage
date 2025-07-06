
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Settings, Moon, Sun, RotateCcw, Edit3, Check, Sparkles, List, Grid3X3, Package, MapPin, Calendar, Info, HelpCircle } from 'lucide-react';
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
        {/* Enhanced Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            {/* Left Actions */}
            <div className="flex items-center gap-3 flex-wrap">
              <Button
                variant="outline"
                size={simpleMode ? "lg" : "icon"}
                onClick={() => setDarkMode(!darkMode)}
                className="rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {darkMode ? <Sun className={simpleMode ? "h-5 w-5 mr-2" : "h-4 w-4"} /> : <Moon className={simpleMode ? "h-5 w-5 mr-2" : "h-4 w-4"} />}
                {simpleMode && (darkMode ? 'Light Mode' : 'Dark Mode')}
              </Button>
              
              {!simpleMode && (
                <SimpleModeToggle 
                  simpleMode={simpleMode} 
                  onToggle={setSimpleMode} 
                />
              )}
              
              <Button
                variant="outline"
                size={simpleMode ? "lg" : "default"}
                onClick={() => setShowPremadeLists(true)}
                className="rounded-full shadow-lg hover:shadow-xl transition-all duration-200 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 hover:from-blue-700 hover:to-purple-700"
              >
                <Sparkles className={simpleMode ? "h-5 w-5 mr-3" : "h-4 w-4 mr-2"} />
                {simpleMode ? 'Browse Packing Lists' : 'Smart Lists'}
              </Button>
              
              {!simpleMode && (
                <>
                  <Button
                    variant="outline"
                    onClick={() => setChecklistMode(!checklistMode)}
                    className="rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    {checklistMode ? <Grid3X3 className="h-4 w-4 mr-2" /> : <List className="h-4 w-4 mr-2" />}
                    {checklistMode ? 'Grid View' : 'Checklist'}
                  </Button>

                  {totalItems > 0 && (
                    <Button
                      variant="outline"
                      onClick={() => setShowLuggageView(true)}
                      className="rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      <Package className="h-4 w-4 mr-2" />
                      View by Luggage
                    </Button>
                  )}
                </>
              )}
            </div>
            
            {/* Center Title */}
            <div className="flex-1 mx-4">
              <motion.h1 
                className={`${simpleMode ? 'text-5xl md:text-6xl' : 'text-4xl md:text-5xl'} font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2`}
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
              <p className={`${simpleMode ? 'text-xl' : 'text-lg'} text-muted-foreground font-medium`}>
                Your intelligent travel companion ✈️
              </p>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {!simpleMode && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setShowHelp(true)}
                  className="rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <HelpCircle className="h-4 w-4" />
                </Button>
              )}
              
              <Button
                variant="outline"
                size={simpleMode ? "lg" : "icon"}
                onClick={resetList}
                className="rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20"
                disabled={totalItems === 0}
              >
                <RotateCcw className={simpleMode ? "h-5 w-5 mr-2" : "h-4 w-4"} />
                {simpleMode && 'Clear All Items'}
              </Button>
            </div>
          </div>

          {simpleMode && (
            <div className="mb-6">
              <SimpleModeToggle 
                simpleMode={simpleMode} 
                onToggle={setSimpleMode} 
              />
            </div>
          )}

          {/* Enhanced Progress Section */}
          {currentTrip && (
            <motion.div 
              className={`mb-8 bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-3xl ${simpleMode ? 'p-8' : 'p-6'} shadow-xl border border-white/20 dark:border-gray-700/20`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="text-left">
                  <h2 className={`${simpleMode ? 'text-3xl' : 'text-2xl'} font-bold text-gray-900 dark:text-white mb-1`}>
                    {currentTrip.name}
                  </h2>
                  {currentTrip.destination && (
                    <p className={`text-gray-600 dark:text-gray-300 flex items-center gap-2 ${simpleMode ? 'text-lg' : ''}`}>
                      <MapPin className={simpleMode ? "h-6 w-6" : "h-4 w-4"} />
                      {currentTrip.destination}
                    </p>
                  )}
                </div>
                
                <div className="text-right">
                  <div className={`${simpleMode ? 'text-5xl' : 'text-3xl'} font-bold text-gray-900 dark:text-white`}>
                    {Math.round(progressPercentage)}%
                  </div>
                  <div className={`${simpleMode ? 'text-lg' : 'text-sm'} text-gray-600 dark:text-gray-300`}>
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
                <div className={`mt-4 flex items-center justify-center gap-4 ${simpleMode ? 'text-lg' : 'text-sm'} text-gray-600 dark:text-gray-300`}>
                  <div className="flex items-center gap-1">
                    <Calendar className={simpleMode ? "h-6 w-6" : "h-4 w-4"} />
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
              size={simpleMode ? "lg" : "default"}
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
              className={simpleMode ? "text-9xl mb-8" : "text-8xl mb-6"}
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
            <h3 className={`${simpleMode ? 'text-4xl' : 'text-3xl'} font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent`}>
              Ready for your adventure?
            </h3>
            <p className={`${simpleMode ? 'text-2xl' : 'text-xl'} text-muted-foreground mb-8 max-w-2xl mx-auto`}>
              {simpleMode 
                ? "Get started by browsing our packing lists or adding items above!"
                : "Start by adding items to your categories above, or explore our smart packing lists tailored for your destination!"
              }
            </p>
            <div className="space-y-4">
              <Button 
                onClick={() => setShowPremadeLists(true)}
                size={simpleMode ? "lg" : "lg"}
                className={`bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white ${simpleMode ? 'px-12 py-6 text-xl' : 'px-8 py-4 text-lg'} rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-200`}
              >
                <Sparkles className={simpleMode ? "h-6 w-6 mr-4" : "h-5 w-5 mr-3"} />
                {simpleMode ? 'Browse Packing Lists' : 'Explore Smart Lists'}
              </Button>
              {!simpleMode && (
                <p className="text-sm text-gray-500">
                  Or click the + button on any category to add items manually
                </p>
              )}
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

      {/* Help Modal */}
      {showHelp && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-900 rounded-3xl p-8 max-w-2xl w-full shadow-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">How to Use PackSmart</h2>
              <Button variant="ghost" onClick={() => setShowHelp(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="space-y-4 text-left">
              <div>
                <h3 className="font-semibold mb-2">📝 Adding Items</h3>
                <p className="text-gray-600 dark:text-gray-300">Click the + button in any category to add packing items manually.</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">✨ Smart Lists</h3>
                <p className="text-gray-600 dark:text-gray-300">Use pre-made packing lists tailored for different destinations and trip types.</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">👁️ Preview Items</h3>
                <p className="text-gray-600 dark:text-gray-300">Preview any smart list before adding all items to your trip.</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">🧳 View by Luggage</h3>
                <p className="text-gray-600 dark:text-gray-300">Organize items by which bag they go in (carry-on, checked, etc.).</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">📋 Checklist Mode</h3>
                <p className="text-gray-600 dark:text-gray-300">Switch to a simplified view perfect for checking off items while packing.</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Index;
