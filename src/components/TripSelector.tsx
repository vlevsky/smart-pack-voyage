
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Calendar, MapPin, Edit3, Check, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export interface Trip {
  id: string;
  name: string;
  destination?: string;
  startDate?: Date;
  endDate?: Date;
  created: Date;
}

interface TripSelectorProps {
  trips: Trip[];
  currentTripId: string | null;
  onSelectTrip: (tripId: string) => void;
  onCreateTrip: (trip: Omit<Trip, 'id' | 'created'>) => string;
  onUpdateTrip: (tripId: string, updates: Partial<Trip>) => void;
  onDeleteTrip: (tripId: string) => void;
}

export const TripSelector: React.FC<TripSelectorProps> = ({
  trips,
  currentTripId,
  onSelectTrip,
  onCreateTrip,
  onUpdateTrip,
  onDeleteTrip,
}) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingTrip, setEditingTrip] = useState<string | null>(null);
  const [newTripData, setNewTripData] = useState({
    name: '',
    destination: '',
    startDate: '',
    endDate: '',
  });

  const currentTrip = trips.find(t => t.id === currentTripId);

  const handleCreateTrip = () => {
    if (!newTripData.name.trim()) return;
    
    const tripId = onCreateTrip({
      name: newTripData.name.trim(),
      destination: newTripData.destination.trim() || undefined,
      startDate: newTripData.startDate ? new Date(newTripData.startDate) : undefined,
      endDate: newTripData.endDate ? new Date(newTripData.endDate) : undefined,
    });
    
    onSelectTrip(tripId);
    setNewTripData({ name: '', destination: '', startDate: '', endDate: '' });
    setShowCreateForm(false);
  };

  const calculateDuration = (trip: Trip) => {
    if (!trip.startDate || !trip.endDate) return null;
    const diffTime = trip.endDate.getTime() - trip.startDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : null;
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Your Trips</h2>
        <Button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Trip
        </Button>
      </div>

      <AnimatePresence>
        {showCreateForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-xl p-4 mb-4 border border-white/20"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Trip name (required)"
                value={newTripData.name}
                onChange={(e) => setNewTripData(prev => ({ ...prev, name: e.target.value }))}
              />
              <Input
                placeholder="Destination (optional)"
                value={newTripData.destination}
                onChange={(e) => setNewTripData(prev => ({ ...prev, destination: e.target.value }))}
              />
              <Input
                type="date"
                placeholder="Start date"
                value={newTripData.startDate}
                onChange={(e) => setNewTripData(prev => ({ ...prev, startDate: e.target.value }))}
              />
              <Input
                type="date"
                placeholder="End date"
                value={newTripData.endDate}
                onChange={(e) => setNewTripData(prev => ({ ...prev, endDate: e.target.value }))}
              />
            </div>
            <div className="flex gap-2 mt-4">
              <Button onClick={handleCreateTrip} disabled={!newTripData.name.trim()}>
                Create Trip
              </Button>
              <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                Cancel
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {trips.map((trip) => {
          const duration = calculateDuration(trip);
          const isSelected = trip.id === currentTripId;
          
          return (
            <motion.div
              key={trip.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                isSelected
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 hover:border-gray-300'
              }`}
              onClick={() => onSelectTrip(trip.id)}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-lg truncate">{trip.name}</h3>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingTrip(trip.id);
                    }}
                  >
                    <Edit3 className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteTrip(trip.id);
                    }}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              
              {trip.destination && (
                <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300 mb-2">
                  <MapPin className="h-3 w-3" />
                  <span>{trip.destination}</span>
                </div>
              )}
              
              {trip.startDate && trip.endDate && (
                <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300 mb-2">
                  <Calendar className="h-3 w-3" />
                  <span>
                    {trip.startDate.toLocaleDateString()} - {trip.endDate.toLocaleDateString()}
                  </span>
                </div>
              )}
              
              {duration && (
                <Badge variant="secondary" className="text-xs">
                  {duration} day{duration !== 1 ? 's' : ''}
                </Badge>
              )}
            </motion.div>
          );
        })}
      </div>

      {trips.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No trips yet. Create your first trip to get started!</p>
        </div>
      )}
    </div>
  );
};
