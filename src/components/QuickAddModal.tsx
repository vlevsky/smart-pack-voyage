import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus, Zap } from 'lucide-react';

interface QuickAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddItem: (item: { name: string; category: string }) => void;
  existingItems: string[];
}

const QUICK_SUGGESTIONS = [
  { name: 'Toothbrush', category: 'toiletries' },
  { name: 'Toothpaste', category: 'toiletries' },
  { name: 'Hairbrush', category: 'toiletries' },
  { name: 'Deodorant', category: 'toiletries' },
  { name: 'Shampoo', category: 'toiletries' },
  { name: 'Phone Charger', category: 'electronics' },
  { name: 'Power Bank', category: 'electronics' },
  { name: 'Headphones', category: 'electronics' },
  { name: 'Camera', category: 'electronics' },
  { name: 'Underwear', category: 'clothes' },
  { name: 'Socks', category: 'clothes' },
  { name: 'Pajamas', category: 'clothes' },
  { name: 'Jacket', category: 'clothes' },
  { name: 'Sneakers', category: 'clothes' },
  { name: 'Sunglasses', category: 'miscellaneous' },
  { name: 'Sunscreen', category: 'miscellaneous' },
  { name: 'Umbrella', category: 'miscellaneous' },
  { name: 'Travel Pillow', category: 'miscellaneous' },
  { name: 'First Aid Kit', category: 'miscellaneous' },
  { name: 'Passport', category: 'documents' },
  { name: 'Tickets', category: 'documents' },
  { name: 'ID Card', category: 'documents' },
  { name: 'Travel Insurance', category: 'documents' },
];

export function QuickAddModal({ isOpen, onClose, onAddItem, existingItems }: QuickAddModalProps) {
  const [addedItems, setAddedItems] = useState<string[]>([]);

  const availableSuggestions = QUICK_SUGGESTIONS.filter(
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
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Add common items to your packing list with one click
          </p>

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