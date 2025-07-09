import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Plane, Search, Package, Scale, Ruler } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { airlineBaggageRules, AirlineBaggage } from '@/data/airlineBaggage';

interface AirlineBaggageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AirlineBaggageModal: React.FC<AirlineBaggageModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAirline, setSelectedAirline] = useState<AirlineBaggage | null>(null);

  if (!isOpen) return null;

  const filteredAirlines = airlineBaggageRules.filter(airline =>
    airline.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    airline.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-6xl h-[90vh] overflow-hidden shadow-2xl flex flex-col"
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full p-2">
                <Plane className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Airline Baggage Rules
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Check carry-on and checked baggage limits for {airlineBaggageRules.length}+ airlines
                </p>
              </div>
            </div>
            <Button variant="ghost" onClick={onClose} className="rounded-full h-10 w-10 p-0">
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Search */}
          <div className="mt-4 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search airlines..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Airlines List */}
          <div className="w-1/3 border-r border-gray-200 dark:border-gray-700">
            <ScrollArea className="h-full">
              <div className="p-4 space-y-2">
                {filteredAirlines.map((airline) => (
                  <Card
                    key={airline.code}
                    className={`p-3 cursor-pointer transition-all hover:bg-gray-50 dark:hover:bg-gray-800 ${
                      selectedAirline?.code === airline.code 
                        ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                        : ''
                    }`}
                    onClick={() => setSelectedAirline(airline)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-sm">{airline.name}</h3>
                        <p className="text-xs text-gray-500">{airline.code}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {airline.code}
                      </Badge>
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Airline Details */}
          <div className="flex-1">
            <ScrollArea className="h-full">
              {selectedAirline ? (
                <div className="p-6 space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {selectedAirline.name} ({selectedAirline.code})
                    </h3>
                  </div>

                  {/* Personal Item */}
                  <Card className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Package className="h-4 w-4 text-blue-500" />
                      <h4 className="font-semibold">Personal Item</h4>
                      <Badge className="bg-green-100 text-green-800 text-xs">FREE</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Ruler className="h-3 w-3 text-gray-400" />
                        <span className="text-sm">{selectedAirline.personalItem.dimensions}</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {selectedAirline.personalItem.description}
                      </p>
                    </div>
                  </Card>

                  {/* Carry-On */}
                  <Card className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Package className="h-4 w-4 text-purple-500" />
                      <h4 className="font-semibold">Carry-On Bag</h4>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Ruler className="h-3 w-3 text-gray-400" />
                        <span className="text-sm">{selectedAirline.carryOn.dimensions}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Scale className="h-3 w-3 text-gray-400" />
                        <span className="text-sm">{selectedAirline.carryOn.weight}</span>
                      </div>
                      {selectedAirline.carryOn.restrictions && (
                        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                          {selectedAirline.carryOn.restrictions.map((restriction, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 shrink-0" />
                              {restriction}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </Card>

                  {/* Checked Bag */}
                  <Card className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Package className="h-4 w-4 text-orange-500" />
                      <h4 className="font-semibold">Checked Bag</h4>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Ruler className="h-3 w-3 text-gray-400" />
                          <span className="text-sm">{selectedAirline.checkedBag.dimensions}</span>
                        </div>
                      </div>

                      {/* Weight Limits by Class */}
                      <div>
                        <h5 className="font-medium mb-2">Weight Limits by Class</h5>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Economy:</span>
                            <span>{selectedAirline.checkedBag.weightLimits.economy}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Premium:</span>
                            <span>{selectedAirline.checkedBag.weightLimits.premium}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Business:</span>
                            <span>{selectedAirline.checkedBag.weightLimits.business}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">First:</span>
                            <span>{selectedAirline.checkedBag.weightLimits.first}</span>
                          </div>
                        </div>
                      </div>

                      {/* Fees */}
                      {selectedAirline.checkedBag.fees && (
                        <div>
                          <h5 className="font-medium mb-2">Baggage Fees</h5>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">First bag:</span>
                              <span>{selectedAirline.checkedBag.fees.first}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Second bag:</span>
                              <span>{selectedAirline.checkedBag.fees.second}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Overweight:</span>
                              <span>{selectedAirline.checkedBag.fees.overweight}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <Plane className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">
                      Select an airline to view baggage rules
                    </p>
                  </div>
                </div>
              )}
            </ScrollArea>
          </div>
        </div>
      </motion.div>
    </div>
  );
};