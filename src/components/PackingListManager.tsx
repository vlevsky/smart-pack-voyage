import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Users, Trash2, Edit3, Save, X, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface PackingList {
  id: string;
  name: string;
  person_name: string;
  itemCount?: number;
}

interface PackingListManagerProps {
  tripId: string;
  onListSelect: (listId: string, listName: string) => void;
  selectedListId: string | null;
}

export function PackingListManager({ tripId, onListSelect, selectedListId }: PackingListManagerProps) {
  const [packingLists, setPackingLists] = useState<PackingList[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [newPersonName, setNewPersonName] = useState('');
  const [editingList, setEditingList] = useState<string | null>(null);
  const [editData, setEditData] = useState({ name: '', person_name: '' });
  const { user } = useAuth();

  useEffect(() => {
    if (tripId && user) {
      fetchPackingLists();
    }
  }, [tripId, user]);

  const fetchPackingLists = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('packing_lists')
      .select(`
        id,
        name,
        person_name,
        packing_items!inner(id)
      `)
      .eq('trip_id', tripId)
      .eq('user_id', user.id);

    if (error) {
      console.error('Error fetching packing lists:', error);
      return;
    }

    const listsWithCounts = data.map(list => ({
      id: list.id,
      name: list.name,
      person_name: list.person_name,
      itemCount: list.packing_items?.length || 0
    }));

    setPackingLists(listsWithCounts);

    // Auto-select first list if none selected
    if (listsWithCounts.length > 0 && !selectedListId) {
      onListSelect(listsWithCounts[0].id, listsWithCounts[0].name);
    }
  };

  const createPackingList = async () => {
    if (!user || !newListName.trim() || !newPersonName.trim()) return;

    const { data, error } = await supabase
      .from('packing_lists')
      .insert({
        trip_id: tripId,
        name: newListName.trim(),
        person_name: newPersonName.trim(),
        user_id: user.id
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating packing list:', error);
      return;
    }

    const newList = {
      id: data.id,
      name: data.name,
      person_name: data.person_name,
      itemCount: 0
    };

    setPackingLists([...packingLists, newList]);
    setNewListName('');
    setNewPersonName('');
    setShowCreateForm(false);
    onListSelect(newList.id, newList.name);
  };

  const updatePackingList = async (listId: string) => {
    if (!user || !editData.name.trim() || !editData.person_name.trim()) return;

    const { error } = await supabase
      .from('packing_lists')
      .update({
        name: editData.name.trim(),
        person_name: editData.person_name.trim()
      })
      .eq('id', listId)
      .eq('user_id', user.id);

    if (error) {
      console.error('Error updating packing list:', error);
      return;
    }

    setPackingLists(packingLists.map(list => 
      list.id === listId 
        ? { ...list, name: editData.name, person_name: editData.person_name }
        : list
    ));
    setEditingList(null);
  };

  const deletePackingList = async (listId: string) => {
    if (!user) return;

    const { error } = await supabase
      .from('packing_lists')
      .delete()
      .eq('id', listId)
      .eq('user_id', user.id);

    if (error) {
      console.error('Error deleting packing list:', error);
      return;
    }

    const updatedLists = packingLists.filter(list => list.id !== listId);
    setPackingLists(updatedLists);

    // Select another list if the deleted one was selected
    if (selectedListId === listId && updatedLists.length > 0) {
      onListSelect(updatedLists[0].id, updatedLists[0].name);
    } else if (selectedListId === listId) {
      onListSelect('', '');
    }
  };

  const startEditing = (list: PackingList) => {
    setEditData({ name: list.name, person_name: list.person_name });
    setEditingList(list.id);
  };

  const cancelEditing = () => {
    setEditingList(null);
    setEditData({ name: '', person_name: '' });
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Packing Lists</h3>
          <Badge variant="secondary" className="text-xs">
            {packingLists.length} {packingLists.length === 1 ? 'list' : 'lists'}
          </Badge>
        </div>
        
        <Button
          onClick={() => setShowCreateForm(true)}
          size="sm"
          className="bg-primary hover:bg-primary/90"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add List
        </Button>
      </div>

      {/* Create Form */}
      <AnimatePresence>
        {showCreateForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-muted/20 rounded-lg p-4 border border-border/50"
          >
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Input
                  placeholder="List name (e.g., Main packing)"
                  value={newListName}
                  onChange={(e) => setNewListName(e.target.value)}
                  className="text-sm"
                />
                <Input
                  placeholder="Person name (e.g., Mom)"
                  value={newPersonName}
                  onChange={(e) => setNewPersonName(e.target.value)}
                  className="text-sm"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={createPackingList}
                  disabled={!newListName.trim() || !newPersonName.trim()}
                  size="sm"
                  className="flex-1"
                >
                  Create List
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowCreateForm(false);
                    setNewListName('');
                    setNewPersonName('');
                  }}
                  size="sm"
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Packing Lists */}
      <div className="space-y-2">
        {packingLists.length === 0 ? (
          <div className="text-center py-8 bg-muted/10 rounded-lg border border-dashed border-border">
            <Package className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground mb-4">
              No packing lists yet. Create one to get started.
            </p>
            <Button
              onClick={() => setShowCreateForm(true)}
              size="sm"
              variant="outline"
            >
              <Plus className="h-4 w-4 mr-1" />
              Create First List
            </Button>
          </div>
        ) : (
          packingLists.map((list) => (
            <motion.div
              key={list.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`transition-all duration-200 ${
                selectedListId === list.id
                  ? 'ring-2 ring-primary shadow-md scale-[1.02]'
                  : 'hover:shadow-sm hover:scale-[1.01]'
              }`}
            >
              <Card 
                className={`p-3 cursor-pointer ${
                  selectedListId === list.id
                    ? 'bg-primary/5 border-primary/20'
                    : 'bg-background hover:bg-muted/30'
                }`}
                onClick={() => onListSelect(list.id, list.name)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    {editingList === list.id ? (
                      <div className="grid grid-cols-2 gap-2" onClick={(e) => e.stopPropagation()}>
                        <Input
                          value={editData.name}
                          onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
                          className="text-sm h-8"
                          placeholder="List name"
                        />
                        <Input
                          value={editData.person_name}
                          onChange={(e) => setEditData(prev => ({ ...prev, person_name: e.target.value }))}
                          className="text-sm h-8"
                          placeholder="Person name"
                        />
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-sm truncate">{list.name}</h4>
                          {selectedListId === list.id && (
                            <Badge variant="default" className="text-xs px-2 py-0">
                              Active
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-muted-foreground">
                            For: {list.person_name}
                          </span>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground">
                            {list.itemCount || 0} items
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-1 ml-2" onClick={(e) => e.stopPropagation()}>
                    {editingList === list.id ? (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updatePackingList(list.id)}
                          className="h-8 w-8 p-0 text-green-600 hover:bg-green-50"
                        >
                          <Save className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={cancelEditing}
                          className="h-8 w-8 p-0 text-gray-500 hover:bg-gray-50"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => startEditing(list)}
                          className="h-8 w-8 p-0 text-blue-600 hover:bg-blue-50"
                        >
                          <Edit3 className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deletePackingList(list.id)}
                          className="h-8 w-8 p-0 text-red-500 hover:bg-red-50"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}