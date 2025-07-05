
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Calendar, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface PremadeList {
  id: string;
  name: string;
  destination: string;
  destination_type: string;
  season: string | null;
  description: string | null;
  items: Array<{ name: string; category: string }>;
}

interface PremadeListsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddItems: (items: Array<{ name: string; category: string }>) => void;
}

export const PremadeListsModal: React.FC<PremadeListsModalProps> = ({
  isOpen,
  onClose,
  onAddItems,
}) => {
  const [premadeLists, setPremadeLists] = useState<PremadeList[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      fetchPremadeLists();
    }
  }, [isOpen]);

  const fetchPremadeLists = async () => {
    try {
      const { data, error } = await supabase
        .from('premade_lists')
        .select('*')
        .eq('is_public', true)
        .order('name');

      if (error) throw error;
      setPremadeLists(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load premade lists",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredLists = premadeLists.filter(list =>
    list.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    list.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
    list.destination_type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddList = (list: PremadeList) => {
    onAddItems(list.items);
    toast({
      title: "Items added!",
      description: `${list.items.length} items from "${list.name}" added to your list.`,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-4xl w-full max-h-[80vh] overflow-hidden"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Smart Packing Lists</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="mb-4">
            <Input
              placeholder="Search destinations or types..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="overflow-y-auto max-h-96">
            {loading ? (
              <div className="text-center py-8">Loading...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredLists.map((list) => (
                  <motion.div
                    key={list.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{list.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 mt-1">
                          <MapPin className="h-4 w-4" />
                          <span>{list.destination}</span>
                          {list.season && (
                            <>
                              <Calendar className="h-4 w-4 ml-2" />
                              <span className="capitalize">{list.season}</span>
                            </>
                          )}
                        </div>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleAddList(list)}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add
                      </Button>
                    </div>
                    
                    {list.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                        {list.description}
                      </p>
                    )}
                    
                    <div className="text-sm">
                      <span className="font-medium">{list.items.length} items:</span>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {list.items.slice(0, 5).map((item, index) => (
                          <span
                            key={index}
                            className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-xs"
                          >
                            {item.name}
                          </span>
                        ))}
                        {list.items.length > 5 && (
                          <span className="text-gray-500 text-xs">
                            +{list.items.length - 5} more
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
