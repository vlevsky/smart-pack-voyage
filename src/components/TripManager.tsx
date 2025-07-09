import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, MapPin, Calendar, Archive, Trash2, Edit3, ChevronDown, ChevronUp, Save, X, StickyNote, Plane, Hotel } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface Trip {
  id: string;
  name: string;
  destination?: string;
  startDate?: string;
  endDate?: string;
  isActive?: boolean;
  isComplete?: boolean;
  itemCount?: number;
  notes?: string;
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

const TripCard: React.FC<{
  trip: Trip;
  currentTrip: Trip | null;
  onTripSelect: (trip: Trip) => void;
  onTripUpdate: (tripId: string, updates: Partial<Trip>) => void;
  onTripDelete: (tripId: string) => void;
  subscriptionTier: string;
}> = ({ trip, currentTrip, onTripSelect, onTripUpdate, onTripDelete, subscriptionTier }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: trip.name,
    destination: trip.destination || '',
    startDate: trip.startDate || '',
    endDate: trip.endDate || '',
    notes: trip.notes || ''
  });

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

  const handleSave = () => {
    onTripUpdate(trip.id, editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      name: trip.name,
      destination: trip.destination || '',
      startDate: trip.startDate || '',
      endDate: trip.endDate || '',
      notes: trip.notes || ''
    });
    setIsEditing(false);
  };

  const daysUntil = getDaysUntilTrip(trip.startDate);
  const isUpcoming = daysUntil !== null && daysUntil > 0;
  const isOngoing = daysUntil !== null && daysUntil <= 0 && !trip.isComplete;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`transition-all duration-300 ${
        currentTrip?.id === trip.id
          ? 'ring-2 ring-primary shadow-lg scale-[1.02]'
          : 'hover:shadow-lg hover:scale-[1.01]'
      }`}
    >
      <Card className="overflow-hidden bg-gradient-to-br from-background to-muted/30 border-2 border-border/50 hover:border-primary/20">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <div className="p-4">
            {/* Header Row */}
            <div className="flex items-center justify-between">
              <div 
                className="flex items-center gap-3 flex-1 cursor-pointer"
                onClick={() => onTripSelect(trip)}
              >
                {isEditing ? (
                  <Input
                    value={editData.name}
                    onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
                    className="text-xl font-bold bg-transparent border-dashed"
                    onClick={(e) => e.stopPropagation()}
                  />
                ) : (
                  <h3 className="text-xl font-bold text-foreground truncate">
                    {trip.name}
                  </h3>
                )}
                
                {currentTrip?.id === trip.id && (
                  <Badge variant="default" className="bg-primary text-primary-foreground">
                    Active
                  </Badge>
                )}
                
                {trip.isComplete && (
                  <Badge variant="outline" className="border-green-500 text-green-600">
                    Complete
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-1">
                {isEditing ? (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleSave}
                      className="text-green-600 hover:bg-green-50"
                    >
                      <Save className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleCancel}
                      className="text-gray-500 hover:bg-gray-50"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsEditing(true);
                    }}
                    className="text-blue-600 hover:bg-blue-50"
                  >
                    <Edit3 className="h-4 w-4" />
                  </Button>
                )}
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onTripDelete(trip.id);
                  }}
                  className="text-red-500 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>

                <CollapsibleTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </Button>
                </CollapsibleTrigger>
              </div>
            </div>

            {/* Minimized Info Row */}
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                {trip.destination && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span className="truncate max-w-32">{trip.destination}</span>
                  </div>
                )}
                
                {trip.startDate && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{formatDate(trip.startDate)}</span>
                  </div>
                )}

                {trip.notes && (
                  <div className="flex items-center gap-1">
                    <StickyNote className="h-3 w-3" />
                    <span className="text-xs opacity-75">Notes</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                {daysUntil !== null && isUpcoming && (
                  <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-700">
                    {daysUntil}d
                  </Badge>
                )}
                
                {isOngoing && (
                  <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                    Now
                  </Badge>
                )}
                
                <span className="text-xs text-muted-foreground">
                  {trip.itemCount || 0} items
                </span>
              </div>
            </div>
          </div>

          {/* Expandable Content */}
          <CollapsibleContent>
            <div className="border-t border-border/50 p-4 bg-muted/20">
              <div className="space-y-4">
                {/* Trip Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1 block">
                      Destination
                    </label>
                    {isEditing ? (
                      <Input
                        value={editData.destination}
                        onChange={(e) => setEditData(prev => ({ ...prev, destination: e.target.value }))}
                        placeholder="Where are you going?"
                        className="text-sm"
                      />
                    ) : (
                      <p className="text-sm text-foreground">
                        {trip.destination || 'Not specified'}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-1 block">
                        Start Date
                      </label>
                      {isEditing ? (
                        <Input
                          type="date"
                          value={editData.startDate}
                          onChange={(e) => setEditData(prev => ({ ...prev, startDate: e.target.value }))}
                          className="text-sm"
                        />
                      ) : (
                        <p className="text-sm text-foreground">
                          {formatDate(trip.startDate) || 'TBD'}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-1 block">
                        End Date
                      </label>
                      {isEditing ? (
                        <Input
                          type="date"
                          value={editData.endDate}
                          onChange={(e) => setEditData(prev => ({ ...prev, endDate: e.target.value }))}
                          className="text-sm"
                        />
                      ) : (
                        <p className="text-sm text-foreground">
                          {formatDate(trip.endDate) || 'TBD'}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Notes Section */}
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-2 block flex items-center gap-1">
                    <StickyNote className="h-3 w-3" />
                    Trip Notes
                    <span className="text-xs opacity-75">(Flight numbers, hotel info, etc.)</span>
                  </label>
                  
                  {isEditing ? (
                    <Textarea
                      value={editData.notes}
                      onChange={(e) => setEditData(prev => ({ ...prev, notes: e.target.value }))}
                      placeholder="Add flight numbers, hotel details, itinerary notes..."
                      className="text-sm min-h-20 resize-none"
                      rows={3}
                    />
                  ) : (
                    <div className="min-h-16 p-3 bg-background border border-border rounded-md">
                      {trip.notes ? (
                        <p className="text-sm text-foreground whitespace-pre-wrap">{trip.notes}</p>
                      ) : (
                        <p className="text-sm text-muted-foreground italic">
                          No notes yet. Click edit to add flight numbers, hotel info, etc.
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Trip Status */}
                <div className="flex items-center justify-between pt-2 border-t border-border/30">
                  <div className="flex items-center gap-2">
                    {subscriptionTier === 'one-trip' && !trip.isComplete && (
                      <Badge variant="outline" className="text-xs border-purple-200 text-purple-600">
                        One Trip Plan
                      </Badge>
                    )}
                  </div>
                  
                  <div className="text-xs text-muted-foreground">
                    {daysUntil !== null && isUpcoming && (
                      <span className="flex items-center gap-1">
                        <Plane className="h-3 w-3" />
                        {daysUntil} {daysUntil === 1 ? 'day' : 'days'} to go
                      </span>
                    )}
                    
                    {isOngoing && (
                      <span className="flex items-center gap-1 text-green-600">
                        <Hotel className="h-3 w-3" />
                        Trip in progress
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </Card>
    </motion.div>
  );
};

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
          trips.map((trip) => (
            <TripCard
              key={trip.id}
              trip={trip}
              currentTrip={currentTrip}
              onTripSelect={onTripSelect}
              onTripUpdate={onTripUpdate}
              onTripDelete={onTripDelete}
              subscriptionTier={subscriptionTier}
            />
          ))
        )}
      </div>
    </div>
  );
};