import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Globe, Clock, Map, Wallet, Thermometer, ArrowLeftRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface TravelToolsProps {
  onClose: () => void;
}

export const TravelTools: React.FC<TravelToolsProps> = ({ onClose }) => {
  const [selectedTool, setSelectedTool] = useState<string>('currency');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amount, setAmount] = useState('100');
  const [convertedAmount, setConvertedAmount] = useState('85.30');

  const tools = [
    {
      id: 'currency',
      name: 'Currency Converter',
      icon: ArrowLeftRight,
      description: 'Convert between currencies',
    },
    {
      id: 'timezone',
      name: 'Time Zone Converter',
      icon: Clock,
      description: 'Check time differences',
    },
    {
      id: 'weather',
      name: 'Weather Forecast',
      icon: Thermometer,
      description: 'Check destination weather',
    },
    {
      id: 'distance',
      name: 'Distance Calculator',
      icon: Map,
      description: 'Calculate travel distances',
    },
  ];

  const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY'];

  const handleConvert = () => {
    // Mock conversion - in real app would use exchange rate API
    const rate = 0.853;
    const result = parseFloat(amount) * rate;
    setConvertedAmount(result.toFixed(2));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Travel Tools
        </h2>
        <Button variant="ghost" onClick={onClose} className="rounded-full h-8 w-8 p-0">
          ✕
        </Button>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-2 gap-4">
        {tools.map((tool) => {
          const Icon = tool.icon;
          const isSelected = selectedTool === tool.id;
          
          return (
            <Card
              key={tool.id}
              className={`p-4 cursor-pointer transition-all duration-200 hover:scale-105 rounded-2xl ${
                isSelected 
                  ? 'ring-2 ring-blue-500 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20' 
                  : 'hover:shadow-lg'
              }`}
              onClick={() => setSelectedTool(tool.id)}
            >
              <div className="text-center space-y-2">
                <div className={`w-12 h-12 mx-auto rounded-xl flex items-center justify-center ${
                  isSelected ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                }`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-sm">{tool.name}</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">{tool.description}</p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Tool Content */}
      <Card className="p-6 rounded-2xl">
        {selectedTool === 'currency' && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Currency Converter</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">From</label>
                <select 
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                  className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800"
                >
                  {currencies.map(currency => (
                    <option key={currency} value={currency}>{currency}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">To</label>
                <select 
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                  className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800"
                >
                  {currencies.map(currency => (
                    <option key={currency} value={currency}>{currency}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Amount</label>
              <Input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="rounded-xl"
              />
            </div>

            <Button 
              onClick={handleConvert}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl py-3"
            >
              Convert
            </Button>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl text-center">
              <p className="text-2xl font-bold text-green-600">
                {convertedAmount} {toCurrency}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {amount} {fromCurrency} = {convertedAmount} {toCurrency}
              </p>
            </div>
          </div>
        )}

        {selectedTool === 'timezone' && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Time Zone Converter</h3>
            <div className="text-center space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
                <p className="font-semibold">New York</p>
                <p className="text-2xl font-bold">2:30 PM</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">EST</p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl">
                <p className="font-semibold">London</p>
                <p className="text-2xl font-bold">7:30 PM</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">GMT</p>
              </div>
            </div>
          </div>
        )}

        {selectedTool === 'weather' && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Weather Forecast</h3>
            <div className="text-center space-y-4">
              <div className="bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 p-4 rounded-xl">
                <p className="font-semibold">Paris, France</p>
                <p className="text-4xl">☀️</p>
                <p className="text-2xl font-bold">22°C</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Sunny</p>
              </div>
            </div>
          </div>
        )}

        {selectedTool === 'distance' && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Distance Calculator</h3>
            <div className="space-y-3">
              <Input placeholder="From city" className="rounded-xl" />
              <Input placeholder="To city" className="rounded-xl" />
              <Button className="w-full rounded-xl">Calculate Distance</Button>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl text-center">
                <p className="text-xl font-bold">3,459 km</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">~4h 20m flight</p>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};