import React from 'react';
import { Scale, AlertTriangle, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface Item {
  id: string;
  name: string;
  category: string;
  packed: boolean;
  quantity?: number;
}

interface WeightEstimatorProps {
  items: Item[];
  airline?: string;
  flightType?: 'domestic' | 'international';
  classType?: 'economy' | 'business' | 'first';
}

// Weight estimates in kg for common items
const itemWeights: { [category: string]: { [item: string]: number } } = {
  clothes: {
    't-shirt': 0.2,
    'jeans': 0.7,
    'suit': 1.5,
    'dress': 0.5,
    'underwear': 0.05,
    'socks': 0.1,
    'shoes': 1.0,
    'sneakers': 0.8,
    'boots': 1.5,
    'jacket': 1.2,
    'sweater': 0.6,
    'shorts': 0.3,
    'skirt': 0.3,
  },
  electronics: {
    'laptop': 2.0,
    'tablet': 0.5,
    'phone': 0.2,
    'charger': 0.3,
    'camera': 0.6,
    'headphones': 0.3,
    'power bank': 0.4,
  },
  toiletries: {
    'toothbrush': 0.05,
    'toothpaste': 0.1,
    'shampoo': 0.3,
    'soap': 0.1,
    'deodorant': 0.15,
    'sunscreen': 0.2,
    'makeup': 0.5,
  },
  miscellaneous: {
    'book': 0.3,
    'umbrella': 0.4,
    'water bottle': 0.5,
    'towel': 0.8,
    'pillow': 0.5,
    'blanket': 1.0,
  },
  documents: {
    'passport': 0.05,
    'documents': 0.1,
  },
};

// Airline weight limits (in kg)
const airlineLimits = {
  domestic: {
    economy: { checked: 23, carryon: 7 },
    business: { checked: 32, carryon: 10 },
    first: { checked: 32, carryon: 10 },
  },
  international: {
    economy: { checked: 23, carryon: 8 },
    business: { checked: 32, carryon: 12 },
    first: { checked: 40, carryon: 15 },
  },
};

export const WeightEstimator: React.FC<WeightEstimatorProps> = ({
  items,
  airline = 'Standard',
  flightType = 'international',
  classType = 'economy',
}) => {
  const estimateItemWeight = (item: Item): number => {
    const category = itemWeights[item.category] || {};
    const itemName = item.name.toLowerCase();
    
    // Try exact match first
    let weight = category[itemName];
    
    // If no exact match, try partial matches
    if (!weight) {
      const matchedKey = Object.keys(category).find(key => 
        itemName.includes(key) || key.includes(itemName)
      );
      weight = matchedKey ? category[matchedKey] : 0.5; // Default weight
    }
    
    return weight * (item.quantity || 1);
  };

  const totalWeight = items.reduce((total, item) => {
    if (item.packed) {
      return total + estimateItemWeight(item);
    }
    return total;
  }, 0);

  const limits = airlineLimits[flightType][classType];
  const carryOnPercentage = Math.min((totalWeight / limits.carryon) * 100, 100);
  const checkedPercentage = Math.min((totalWeight / limits.checked) * 100, 100);

  const getStatusColor = (percentage: number) => {
    if (percentage > 100) return 'text-red-600';
    if (percentage > 80) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getStatusIcon = (percentage: number) => {
    if (percentage > 100) return AlertTriangle;
    if (percentage > 80) return AlertTriangle;
    return CheckCircle;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Scale className="h-5 w-5 text-blue-600" />
        <h3 className="font-semibold">Weight Estimate</h3>
        <Badge variant="outline" className="text-xs">
          {airline} • {flightType} • {classType}
        </Badge>
      </div>

      <div className="space-y-4">
        {/* Total Weight */}
        <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="text-2xl font-bold">{totalWeight.toFixed(1)} kg</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">Total estimated weight</div>
        </div>

        {/* Carry-on Limit */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Carry-on Limit</span>
            <div className="flex items-center gap-2">
              {React.createElement(getStatusIcon(carryOnPercentage), {
                className: `h-4 w-4 ${getStatusColor(carryOnPercentage)}`,
              })}
              <span className={`text-sm font-medium ${getStatusColor(carryOnPercentage)}`}>
                {totalWeight.toFixed(1)} / {limits.carryon} kg
              </span>
            </div>
          </div>
          <Progress value={carryOnPercentage} className="h-2" />
          {carryOnPercentage > 100 && (
            <div className="text-xs text-red-600 flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" />
              Exceeds carry-on weight limit by {(totalWeight - limits.carryon).toFixed(1)} kg
            </div>
          )}
        </div>

        {/* Checked Bag Limit */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Checked Bag Limit</span>
            <div className="flex items-center gap-2">
              {React.createElement(getStatusIcon(checkedPercentage), {
                className: `h-4 w-4 ${getStatusColor(checkedPercentage)}`,
              })}
              <span className={`text-sm font-medium ${getStatusColor(checkedPercentage)}`}>
                {totalWeight.toFixed(1)} / {limits.checked} kg
              </span>
            </div>
          </div>
          <Progress value={checkedPercentage} className="h-2" />
          {checkedPercentage > 100 && (
            <div className="text-xs text-red-600 flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" />
              Exceeds checked bag limit by {(totalWeight - limits.checked).toFixed(1)} kg
            </div>
          )}
        </div>

        {/* Weight by Category */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Weight by Category</h4>
          {Object.entries(
            items.reduce((acc, item) => {
              if (item.packed) {
                acc[item.category] = (acc[item.category] || 0) + estimateItemWeight(item);
              }
              return acc;
            }, {} as { [category: string]: number })
          ).map(([category, weight]) => (
            <div key={category} className="flex justify-between text-sm">
              <span className="capitalize">{category}</span>
              <span className="font-medium">{weight.toFixed(1)} kg</span>
            </div>
          ))}
        </div>

        <div className="text-xs text-gray-500 dark:text-gray-400 border-t pt-2">
          * Weight estimates are approximate. Actual weights may vary.
        </div>
      </div>
    </div>
  );
};