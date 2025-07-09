import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, MapPin, Calendar, Archive, Trash2, Edit3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

interface Trip {
  id: string;
  name: string;
  destination?: string;
  startDate?: string;
  endDate?: string;
  isActive?: boolean;
  isComplete?: boolean;
  itemCount?: number;
}

interface TripManagerProps {
  trips: Trip[];
  currentTrip: Trip | null;
  onTripSelect: (trip: Trip) => void;
  onTripCreate: (trip: Omit<Trip, 'id'>) => void;
  onTripDelete: (tripId: string) => void;
  onTripUpdate: (tripId: string, updates: Partial<Trip>) => void;
  subscriptionTier: string;
}

export const TripManager: React.FC<TripManagerProps> = ({
  trips,
  currentTrip,
  onTripSelect,
  onTripCreate,
  onTripDelete,
  onTripUpdate,
  subscriptionTier,
}) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newTripName, setNewTripName] = useState('');
  const [newTripDestination, setNewTripDestination] = useState('');
  const [newTripStartDate, setNewTripStartDate] = useState('');
  const [newTripEndDate, setNewTripEndDate] = useState('');

  const canCreateTrip = () => {
    if (subscriptionTier === 'free') return trips.length === 0;
    if (subscriptionTier === 'one-trip') return trips.filter(t => !t.isComplete).length === 0;
    return true;
  };

  const handleCreateTrip = () => {
    if (!newTripName.trim()) return;
    
    onTripCreate({
      name: newTripName,
      destination: newTripDestination,
      startDate: newTripStartDate,
      endDate: newTripEndDate,
      isActive: true,
      isComplete: false,
    });

    setNewTripName('');
    setNewTripDestination('');
    setNewTripStartDate('');
    setNewTripEndDate('');
    setShowCreateForm(false);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getDaysUntilTrip = (startDate?: string) => {
    if (!startDate) return null;
    const start = new Date(startDate);
    const now = new Date();
    const diffTime = start.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">My Trips</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {trips.length} {trips.length === 1 ? 'trip' : 'trips'} planned
          </p>
        </div>
        
        {canCreateTrip() ? (
          <Button
            onClick={() => setShowCreateForm(true)}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full"
            size="lg"
          >
            <Plus className="h-5 w-5 mr-2" />
            New Trip
          </Button>
        ) : (
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-2">
              {subscriptionTier === 'one-trip' ? 'Complete your current trip to create a new one' : 'Upgrade to create more trips'}
            </p>
            {subscriptionTier === 'free' && (
              <Button variant="outline" size="sm">
                Upgrade Plan
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Create Trip Form */}
      <AnimatePresence>
        {showCreateForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
          >
            <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">Create New Trip</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Trip Name *
                </label>
                <Input
                  placeholder="e.g., Tokyo Adventure"
                  value={newTripName}
                  onChange={(e) => setNewTripName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Destination
                </label>
                <Input
                  placeholder="e.g., Tokyo, Japan"
                  value={newTripDestination}
                  onChange={(e) => setNewTripDestination(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Start Date
                  </label>
                  <Input
                    type="date"
                    value={newTripStartDate}
                    onChange={(e) => setNewTripStartDate(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    End Date
                  </label>
                  <Input
                    type="date"
                    value={newTripEndDate}
                    onChange={(e) => setNewTripEndDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleCreateTrip}
                  disabled={!newTripName.trim()}
                  className="flex-1"
                >
                  Create Trip
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowCreateForm(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trips List */}
      <div className="space-y-4">
        {trips.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-2xl">
            <MapPin className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No trips yet</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Create your first trip to start packing smart
            </p>
            {canCreateTrip() && (
              <Button
                onClick={() => setShowCreateForm(true)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create First Trip
              </Button>
            )}
          </div>
        ) : (
          trips.map((trip) => {
            const daysUntil = getDaysUntilTrip(trip.startDate);
            const isUpcoming = daysUntil !== null && daysUntil > 0;
            const isOngoing = daysUntil !== null && daysUntil <= 0 && !trip.isComplete;
            const isPast = trip.isComplete || (daysUntil !== null && daysUntil < -7);

            return (
              <motion.div
                key={trip.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`relative cursor-pointer transition-all duration-200 ${
                  currentTrip?.id === trip.id
                    ? 'ring-2 ring-blue-500 shadow-lg'
                    : 'hover:shadow-md'
                }`}
                onClick={() => onTripSelect(trip)}
              >
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <h3 className="font-bold text-xl text-gray-900 dark:text-white">
                        {trip.name}
                      </h3>
                      {currentTrip?.id === trip.id && (
                        <Badge className="bg-blue-500 text-white">Active</Badge>
                      )}
                      {trip.isComplete && (
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          Complete
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle edit
                        }}
                      >
                        <Edit3 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onTripDelete(trip.id);
                        }}
                        className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {trip.destination && (
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-2">
                      <MapPin className="h-4 w-4" />
                      <span>{trip.destination}</span>
                    </div>
                  )}

                  {(trip.startDate || trip.endDate) && (
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-4">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {formatDate(trip.startDate)}
                        {trip.endDate && ` - ${formatDate(trip.endDate)}`}
                      </span>
                    </div>
                  )}

                  {daysUntil !== null && (
                    <div className="mb-4">
                      {isUpcoming && (
                        <Badge className="bg-orange-500 text-white">
                          {daysUntil} {daysUntil === 1 ? 'day' : 'days'} until trip
                        </Badge>
                      )}
                      {isOngoing && (
                        <Badge className="bg-green-500 text-white">
                          Trip is happening now!
                        </Badge>
                      )}
                    </div>
                  )}

                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span>{trip.itemCount || 0} items packed</span>
                    {subscriptionTier === 'one-trip' && !trip.isComplete && (
                      <Badge variant="outline" className="text-purple-600 border-purple-600">
                        One Trip Plan
                      </Badge>
                    )}
                  </div>
                </Card>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
};