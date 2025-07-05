
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Settings, Moon, Sun, RotateCcw, Edit3, Check, Sparkles, List, Grid3X3 } from 'lucide-react';
import { CategorySection } from '@/components/CategorySection';
import { ProgressBar } from '@/components/ProgressBar';
import { PremadeListsModal } from '@/components/PremadeListsModal';
import { TripSelector, Trip } from '@/components/TripSelector';
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
  const [showCompleted, setShowCompleted] = useState(true);
  const [showPremadeLists, setShowPremadeLists] = useState(false);
  const [checklistMode, setChecklistMode] = useState(false);
  const { toast } = useToast();

  // Load data from localStorage on mount
  useEffect(() => {
    const savedTrips = localStorage.getItem('trips');
    const savedCurrentTripId = localStorage.getItem('currentTripId');
    const savedDarkMode = localStorage.getItem('darkMode');

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
  }, []);

  // Save trips to localStorage
  useEffect(() => {
    localStorage.setItem('trips', JSON.stringify(trips));
  }, [trips]);

  // Save current trip ID
  useEffect(() => {
    if (currentTripId) {
      localStorage.setItem('currentTripId', currentTripId);
    }
  }, [currentTripId]);

  // Save items for current trip
  useEffect(() => {
    if (currentTripId) {
      localStorage.setItem(`items_${currentTripId}`, JSON.stringify(items));
    }
  }, [items, currentTripId]);

  // Handle dark mode
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

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

  // Auto-suggest quantities based on trip duration
  const suggestQuantity = (itemName: string, category: string): number => {
    const currentTrip = trips.find(t => t.id === currentTripId);
    if (!currentTrip?.startDate || !currentTrip?.endDate) return 1;
    
    const duration = Math.ceil((currentTrip.endDate.getTime() - currentTrip.startDate.getTime()) / (1000 * 60 * 60 * 24));
    
    // Smart quantity suggestions based on item type and trip duration
    const lowerName = itemName.toLowerCase();
    
    if (category === 'clothes') {
      if (lowerName.includes('shirt') || lowerName.includes('top')) return Math.min(duration, 7);
      if (lowerName.includes('underwear') || lowerName.includes('sock')) return duration + 1;
      if (lowerName.includes('pants') || lowerName.includes('jeans')) return Math.ceil(duration / 3);
    }
    
    if (category === 'toiletries') {
      if (lowerName.includes('toothbrush')) return 1;
      if (lowerName.includes('contact') && lowerName.includes('lens')) return duration;
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
        title: "Cannot delete",
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

  const addMultipleItems = (newItems: Array<{ name: string; category: string }>) => {
    const itemsToAdd = newItems.map(item => {
      const quantity = suggestQuantity(item.name, item.category);
      return {
        id: (Date.now() + Math.random()).toString(),
        name: item.name,
        packed: false,
        category: item.category,
        quantity,
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
    <div className={`min-h-screen transition-colors duration-500 ${
      darkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
    }`}>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setDarkMode(!darkMode)}
                className="rounded-full"
              >
                {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPremadeLists(true)}
                className="rounded-full"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Smart Lists
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setChecklistMode(!checklistMode)}
                className="rounded-full"
              >
                {checklistMode ? <Grid3X3 className="h-4 w-4 mr-2" /> : <List className="h-4 w-4 mr-2" />}
                {checklistMode ? 'Grid View' : 'Checklist'}
              </Button>
            </div>
            
            <div className="flex-1 mx-4">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                PackSmart
              </h1>
              <p className="text-muted-foreground">
                Pack smart, travel light ✈️
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={resetList}
                className="rounded-full"
                disabled={totalItems === 0}
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Progress Bar */}
          {currentTrip && (
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">{currentTrip.name}</h2>
              <ProgressBar 
                current={packedItems} 
                total={totalItems} 
                percentage={progressPercentage}
              />
            </div>
          )}
        </motion.div>

        {/* Trip Selector */}
        <TripSelector
          trips={trips}
          currentTripId={currentTripId}
          onSelectTrip={handleSelectTrip}
          onCreateTrip={handleCreateTrip}
          onUpdateTrip={handleUpdateTrip}
          onDeleteTrip={handleDeleteTrip}
        />

        {/* Categories */}
        {currentTripId && (
          <div className="space-y-6">
            <AnimatePresence>
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
                    checklistMode={checklistMode}
                  />
                );
              })}
            </AnimatePresence>
          </div>
        )}

        {/* Show/Hide Completed Toggle */}
        {packedItems > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center mt-8"
          >
            <Button
              variant="outline"
              onClick={() => setShowCompleted(!showCompleted)}
              className="rounded-full"
            >
              {showCompleted ? 'Hide' : 'Show'} Packed Items ({packedItems})
            </Button>
          </motion.div>
        )}

        {/* Empty State */}
        {totalItems === 0 && currentTripId && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🎒</div>
            <h3 className="text-xl font-semibold mb-2">Ready to pack?</h3>
            <p className="text-muted-foreground mb-4">
              Start by adding items to your categories above, or try our smart packing lists!
            </p>
            <Button 
              onClick={() => setShowPremadeLists(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Explore Smart Lists
            </Button>
          </motion.div>
        )}
      </div>

      {/* Premade Lists Modal */}
      <PremadeListsModal
        isOpen={showPremadeLists}
        onClose={() => setShowPremadeLists(false)}
        onAddItems={addMultipleItems}
      />
    </div>
  );
};

export default Index;
