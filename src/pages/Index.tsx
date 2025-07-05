
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Settings, Moon, Sun, RotateCcw, Edit3, Check } from 'lucide-react';
import { CategorySection } from '@/components/CategorySection';
import { ProgressBar } from '@/components/ProgressBar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface PackingItem {
  id: string;
  name: string;
  packed: boolean;
  category: string;
}

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
  const [items, setItems] = useState<PackingItem[]>([]);
  const [tripName, setTripName] = useState('My Amazing Trip');
  const [isEditingTrip, setIsEditingTrip] = useState(false);
  const [tempTripName, setTempTripName] = useState(tripName);
  const [darkMode, setDarkMode] = useState(false);
  const [showCompleted, setShowCompleted] = useState(true);
  const { toast } = useToast();

  // Load data from localStorage on mount
  useEffect(() => {
    const savedItems = localStorage.getItem('packingItems');
    const savedTripName = localStorage.getItem('tripName');
    const savedDarkMode = localStorage.getItem('darkMode');

    if (savedItems) setItems(JSON.parse(savedItems));
    if (savedTripName) setTripName(savedTripName);
    if (savedDarkMode) setDarkMode(JSON.parse(savedDarkMode));
  }, []);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('packingItems', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem('tripName', tripName);
  }, [tripName]);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const addItem = (name: string, category: string) => {
    const newItem: PackingItem = {
      id: Date.now().toString(),
      name,
      packed: false,
      category,
    };
    setItems([...items, newItem]);
    toast({
      title: "Item added!",
      description: `${name} has been added to your packing list.`,
    });
  };

  const toggleItem = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, packed: !item.packed } : item
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

  const handleTripNameSave = () => {
    setTripName(tempTripName);
    setIsEditingTrip(false);
    toast({
      title: "Trip renamed",
      description: `Your trip is now called "${tempTripName}".`,
    });
  };

  const getItemsByCategory = (categoryId: string) => {
    return items.filter(item => item.category === categoryId);
  };

  const totalItems = items.length;
  const packedItems = items.filter(item => item.packed).length;
  const progressPercentage = totalItems > 0 ? (packedItems / totalItems) * 100 : 0;

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      darkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
    }`}>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setDarkMode(!darkMode)}
              className="rounded-full"
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            
            <div className="flex-1 mx-4">
              {isEditingTrip ? (
                <div className="flex items-center gap-2 justify-center">
                  <Input
                    value={tempTripName}
                    onChange={(e) => setTempTripName(e.target.value)}
                    className="text-center text-2xl font-bold max-w-xs"
                    onKeyPress={(e) => e.key === 'Enter' && handleTripNameSave()}
                  />
                  <Button size="sm" onClick={handleTripNameSave}>
                    <Check className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {tripName}
                  </h1>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setTempTripName(tripName);
                      setIsEditingTrip(true);
                    }}
                  >
                    <Edit3 className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>

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

          <p className="text-muted-foreground mb-6">
            Pack smart, travel light ✈️
          </p>

          {/* Progress Bar */}
          <ProgressBar 
            current={packedItems} 
            total={totalItems} 
            percentage={progressPercentage}
          />
        </motion.div>

        {/* Categories */}
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
                  onDeleteItem={deleteItem}
                  showCompleted={showCompleted}
                />
              );
            })}
          </AnimatePresence>
        </div>

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
        {totalItems === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🎒</div>
            <h3 className="text-xl font-semibold mb-2">Ready to pack?</h3>
            <p className="text-muted-foreground">
              Start by adding items to your categories above!
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Index;
