import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus, Zap } from 'lucide-react';

interface QuickAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddItem: (item: { name: string; category: string }) => void;
  existingItems: string[];
  tripType?: 'business' | 'evening' | 'casual';
  numberOfPeople?: number;
}

const BASE_SUGGESTIONS = [
  { name: 'Toothbrush', category: 'toiletries' },
  { name: 'Toothpaste', category: 'toiletries' },
  { name: 'Hairbrush', category: 'toiletries' },
  { name: 'Deodorant', category: 'toiletries' },
  { name: 'Shampoo', category: 'toiletries' },
  { name: 'Phone Charger', category: 'electronics' },
  { name: 'Underwear', category: 'clothes' },
  { name: 'Socks', category: 'clothes' },
  { name: 'Pajamas', category: 'clothes' },
  { name: 'Passport', category: 'documents' },
  { name: 'ID Card', category: 'documents' },
];

const CASUAL_SUGGESTIONS = [
  { name: 'T-shirt', category: 'clothes' },
  { name: 'Jeans', category: 'clothes' },
  { name: 'Sneakers', category: 'clothes' },
  { name: 'Hoodie', category: 'clothes' },
  { name: 'Shorts', category: 'clothes' },
  { name: 'Flip Flops', category: 'clothes' },
  { name: 'Backpack', category: 'miscellaneous' },
  { name: 'Water Bottle', category: 'miscellaneous' },
  { name: 'Sunglasses', category: 'miscellaneous' },
  { name: 'Sunscreen', category: 'miscellaneous' },
  { name: 'Camera', category: 'electronics' },
];

const BUSINESS_SUGGESTIONS = [
  { name: 'Dress Shirt', category: 'clothes' },
  { name: 'Suit', category: 'clothes' },
  { name: 'Dress Shoes', category: 'clothes' },
  { name: 'Tie', category: 'clothes' },
  { name: 'Belt', category: 'clothes' },
  { name: 'Laptop', category: 'electronics' },
  { name: 'Business Cards', category: 'documents' },
  { name: 'Portfolio', category: 'miscellaneous' },
  { name: 'Power Bank', category: 'electronics' },
  { name: 'Dress Watch', category: 'miscellaneous' },
];

const EVENING_SUGGESTIONS = [
  { name: 'Dress', category: 'clothes' },
  { name: 'Heels', category: 'clothes' },
  { name: 'Makeup', category: 'toiletries' },
  { name: 'Jewelry', category: 'miscellaneous' },
  { name: 'Perfume', category: 'toiletries' },
  { name: 'Clutch', category: 'miscellaneous' },
  { name: 'Hair Styling Tools', category: 'electronics' },
  { name: 'Formal Shoes', category: 'clothes' },
  { name: 'Evening Gown', category: 'clothes' },
  { name: 'Dress Shirt', category: 'clothes' },
];

export function QuickAddModal({ isOpen, onClose, onAddItem, existingItems, tripType = 'casual', numberOfPeople = 1 }: QuickAddModalProps) {
  const [addedItems, setAddedItems] = useState<string[]>([]);

  const getSmartSuggestions = () => {
    let suggestions = [...BASE_SUGGESTIONS];
    
    switch (tripType) {
      case 'business':
        suggestions = [...suggestions, ...BUSINESS_SUGGESTIONS];
        break;
      case 'evening':
        suggestions = [...suggestions, ...EVENING_SUGGESTIONS];
        break;
      case 'casual':
      default:
        suggestions = [...suggestions, ...CASUAL_SUGGESTIONS];
        break;
    }
    
    return suggestions;
  };

  const availableSuggestions = getSmartSuggestions().filter(
    suggestion => !existingItems.includes(suggestion.name.toLowerCase()) && 
                  !addedItems.includes(suggestion.name)
  );

  const handleAddItem = (item: { name: string; category: string }) => {
    onAddItem(item);
    setAddedItems([...addedItems, item.name]);
  };

  const handleClose = () => {
    setAddedItems([]);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg">
            <Zap className="h-5 w-5 text-blue-500" />
            Quick Add Items
            {tripType && (
              <span className="text-sm font-normal text-muted-foreground capitalize">
                ({tripType} trip)
              </span>
            )}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-1">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Add common items to your packing list with one click
            </p>
            {numberOfPeople > 1 && (
              <p className="text-xs text-blue-600 dark:text-blue-400">
                Items will be multiplied by {numberOfPeople} people
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-2 max-h-96 overflow-y-auto">
            {availableSuggestions.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-2">✅</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  You already have all common items!
                </p>
              </div>
            ) : (
              availableSuggestions.map((item) => (
                <Button
                  key={item.name}
                  variant="outline"
                  onClick={() => handleAddItem(item)}
                  className="justify-between h-auto p-3 text-left"
                >
                  <div>
                    <div className="text-sm font-medium">{item.name}</div>
                    <div className="text-xs text-gray-500 capitalize">{item.category}</div>
                  </div>
                  <Plus className="h-4 w-4" />
                </Button>
              ))
            )}
          </div>

          <div className="flex justify-end pt-4">
            <Button onClick={handleClose} variant="outline">
              Done
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}