import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Globe, Clock, Map, Wallet, Thermometer, ArrowLeftRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';

interface TravelToolsProps {
  onClose: () => void;
}

export const TravelTools: React.FC<TravelToolsProps> = ({ onClose }) => {
  const [selectedTool, setSelectedTool] = useState<string>('currency');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amount, setAmount] = useState('100');
  const [convertedAmount, setConvertedAmount] = useState<string>('');
  const [exchangeRate, setExchangeRate] = useState<number>(0);
  const [isConverting, setIsConverting] = useState(false);
  
  // Distance calculator states
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [distanceResult, setDistanceResult] = useState<any>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // World clock states
  const [worldTimes, setWorldTimes] = useState<any[]>([]);

  // Weather states
  const [weatherCity, setWeatherCity] = useState('');
  const [weatherData, setWeatherData] = useState<any>(null);
  const [isLoadingWeather, setIsLoadingWeather] = useState(false);

  // Translator states
  const [translateText, setTranslateText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [fromLang, setFromLang] = useState('en');
  const [toLang, setToLang] = useState('es');
  const [isTranslating, setIsTranslating] = useState(false);

  // Tipping data
  const tippingGuide = [
    { country: 'United States', restaurant: '15-20%', taxi: '10-15%', hotel: '$1-2 per bag', general: 'Tipping is expected' },
    { country: 'United Kingdom', restaurant: '10-15%', taxi: '10%', hotel: '£1-2 per bag', general: 'Optional but appreciated' },
    { country: 'France', restaurant: 'Service included', taxi: '5-10%', hotel: '€1-2 per bag', general: 'Round up bills' },
    { country: 'Germany', restaurant: '5-10%', taxi: '5-10%', hotel: '€1-2 per bag', general: 'Round to nearest euro' },
    { country: 'Japan', restaurant: 'No tipping', taxi: 'No tipping', hotel: 'No tipping', general: 'Tipping can be offensive' },
    { country: 'Australia', restaurant: '10%', taxi: '10%', hotel: '$2-5 per bag', general: 'Not mandatory' },
    { country: 'Canada', restaurant: '15-20%', taxi: '10-15%', hotel: '$1-2 per bag', general: 'Similar to US' },
    { country: 'Italy', restaurant: '10%', taxi: 'Round up', hotel: '€1-2 per bag', general: 'Small amounts appreciated' },
    { country: 'Spain', restaurant: '5-10%', taxi: 'Round up', hotel: '€1-2 per bag', general: 'Small tips common' },
    { country: 'India', restaurant: '10%', taxi: '10%', hotel: '₹20-50 per bag', general: 'Appreciated but negotiate' },
  ];

  const tools = [
    {
      id: 'currency',
      name: 'Currency Converter',
      icon: ArrowLeftRight,
      description: 'Live currency conversion',
    },
    {
      id: 'worldclock',
      name: 'World Clock',
      icon: Clock,
      description: 'Global time zones',
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
    {
      id: 'tipping',
      name: 'Tipping Guide',
      icon: Wallet,
      description: 'Local tipping customs',
    },
    {
      id: 'translator',
      name: 'Translator',
      icon: Globe,
      description: 'Translate text instantly',
    },
  ];

  const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY', 'INR', 'MXN', 'BRL', 'KRW'];

  const worldCities = [
    { name: 'New York', timezone: 'America/New_York', country: 'USA' },
    { name: 'London', timezone: 'Europe/London', country: 'UK' },
    { name: 'Tokyo', timezone: 'Asia/Tokyo', country: 'Japan' },
    { name: 'Sydney', timezone: 'Australia/Sydney', country: 'Australia' },
    { name: 'Paris', timezone: 'Europe/Paris', country: 'France' },
    { name: 'Dubai', timezone: 'Asia/Dubai', country: 'UAE' },
    { name: 'Singapore', timezone: 'Asia/Singapore', country: 'Singapore' },
    { name: 'Los Angeles', timezone: 'America/Los_Angeles', country: 'USA' },
    { name: 'Mumbai', timezone: 'Asia/Kolkata', country: 'India' },
    { name: 'São Paulo', timezone: 'America/Sao_Paulo', country: 'Brazil' },
  ];

  // Update world clock every minute
  useEffect(() => {
    const updateWorldClock = () => {
      const times = worldCities.map(city => {
        const time = new Date().toLocaleString('en-US', {
          timeZone: city.timezone,
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        });
        const date = new Date().toLocaleDateString('en-US', {
          timeZone: city.timezone,
          weekday: 'short'
        });
        return { ...city, time, date };
      });
      setWorldTimes(times);
    };

    updateWorldClock();
    const interval = setInterval(updateWorldClock, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, []);

  const handleConvert = async () => {
    if (!amount || isNaN(parseFloat(amount))) return;
    
    setIsConverting(true);
    try {
      const { data, error } = await supabase.functions.invoke('currency-convert', {
        body: {
          from: fromCurrency,
          to: toCurrency,
          amount: amount
        }
      });

      if (error) throw error;

      setConvertedAmount(data.convertedAmount.toString());
      setExchangeRate(data.rate);
    } catch (error) {
      console.error('Currency conversion error:', error);
      setConvertedAmount('Error');
    } finally {
      setIsConverting(false);
    }
  };

  const handleDistanceCalculation = async () => {
    if (!fromCity.trim() || !toCity.trim()) return;
    
    setIsCalculating(true);
    try {
      const { data, error } = await supabase.functions.invoke('calculate-distance', {
        body: {
          fromCity: fromCity.trim(),
          toCity: toCity.trim()
        }
      });

      if (error) throw error;

      setDistanceResult(data);
    } catch (error) {
      console.error('Distance calculation error:', error);
      setDistanceResult({ error: error.message || 'Failed to calculate distance' });
    } finally {
      setIsCalculating(false);
    }
  };

  const handleWeatherSearch = async () => {
    if (!weatherCity.trim()) return;
    
    setIsLoadingWeather(true);
    try {
      const { data, error } = await supabase.functions.invoke('get-weather', {
        body: { city: weatherCity.trim() }
      });

      if (error) throw error;
      setWeatherData(data);
    } catch (error) {
      console.error('Weather search error:', error);
      setWeatherData({ error: 'Failed to get weather data' });
    } finally {
      setIsLoadingWeather(false);
    }
  };

  const handleTranslate = async () => {
    if (!translateText.trim()) return;
    
    setIsTranslating(true);
    try {
      const { data, error } = await supabase.functions.invoke('translate-text', {
        body: {
          text: translateText.trim(),
          from: fromLang,
          to: toLang
        }
      });

      if (error) throw error;
      setTranslatedText(data.translatedText);
    } catch (error) {
      console.error('Translation error:', error);
      setTranslatedText('Translation failed');
    } finally {
      setIsTranslating(false);
    }
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
      <div className="grid grid-cols-3 gap-4">
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
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="rounded-xl"
              />
            </div>

            <Button 
              onClick={handleConvert}
              disabled={isConverting}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl py-3"
            >
              {isConverting ? 'Converting...' : 'Convert'}
            </Button>

            {convertedAmount && (
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-xl text-center border border-green-200 dark:border-green-800">
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {convertedAmount} {toCurrency}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {amount} {fromCurrency} = {convertedAmount} {toCurrency}
                </p>
                {exchangeRate > 0 && (
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    Rate: 1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {selectedTool === 'worldclock' && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">World Clock</h3>
            <div className="grid gap-3">
              {worldTimes.map((city, index) => (
                <div key={index} className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{city.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{city.country}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-blue-600 dark:text-blue-400">{city.time}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{city.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedTool === 'weather' && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Weather Forecast</h3>
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input 
                  placeholder="Enter city name" 
                  value={weatherCity}
                  onChange={(e) => setWeatherCity(e.target.value)}
                  className="rounded-xl flex-1"
                />
                <Button 
                  onClick={handleWeatherSearch}
                  disabled={isLoadingWeather || !weatherCity.trim()}
                  className="rounded-xl bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-700 hover:to-yellow-700"
                >
                  {isLoadingWeather ? 'Loading...' : 'Get Weather'}
                </Button>
              </div>
              
              {weatherData && (
                <div className="bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 p-6 rounded-xl border border-orange-200 dark:border-orange-800">
                  {weatherData.error ? (
                    <p className="text-red-600 dark:text-red-400">{weatherData.error}</p>
                  ) : (
                    <>
                      <p className="font-semibold text-gray-900 dark:text-white">{weatherData.name}, {weatherData.country}</p>
                      <p className="text-4xl my-2">{weatherData.icon}</p>
                      <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{weatherData.temperature}°C</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{weatherData.description}</p>
                      <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                        <p>Feels like: {weatherData.feelsLike}°C</p>
                        <p>Humidity: {weatherData.humidity}%</p>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {selectedTool === 'tipping' && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Tipping Guide</h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {tippingGuide.map((tip, index) => (
                <div key={index} className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-xl border border-green-200 dark:border-green-800">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{tip.country}</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="font-medium">Restaurant:</span> {tip.restaurant}
                    </div>
                    <div>
                      <span className="font-medium">Taxi:</span> {tip.taxi}
                    </div>
                    <div>
                      <span className="font-medium">Hotel:</span> {tip.hotel}
                    </div>
                    <div className="col-span-2">
                      <span className="font-medium">General:</span> {tip.general}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedTool === 'translator' && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Translator</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">From</label>
                <select 
                  value={fromLang}
                  onChange={(e) => setFromLang(e.target.value)}
                  className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                  <option value="it">Italian</option>
                  <option value="pt">Portuguese</option>
                  <option value="ru">Russian</option>
                  <option value="ja">Japanese</option>
                  <option value="ko">Korean</option>
                  <option value="zh">Chinese</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">To</label>
                <select 
                  value={toLang}
                  onChange={(e) => setToLang(e.target.value)}
                  className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800"
                >
                  <option value="es">Spanish</option>
                  <option value="en">English</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                  <option value="it">Italian</option>
                  <option value="pt">Portuguese</option>
                  <option value="ru">Russian</option>
                  <option value="ja">Japanese</option>
                  <option value="ko">Korean</option>
                  <option value="zh">Chinese</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Text to translate</label>
              <textarea
                value={translateText}
                onChange={(e) => setTranslateText(e.target.value)}
                placeholder="Enter text to translate..."
                className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 min-h-20"
              />
            </div>

            <Button 
              onClick={handleTranslate}
              disabled={isTranslating || !translateText.trim()}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl py-3"
            >
              {isTranslating ? 'Translating...' : 'Translate'}
            </Button>

            {translatedText && (
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800">
                <label className="block text-sm font-medium mb-2">Translation</label>
                <p className="text-gray-900 dark:text-white">{translatedText}</p>
              </div>
            )}
          </div>
        )}

        {selectedTool === 'distance' && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Distance Calculator</h3>
            <div className="space-y-3">
              <Input 
                placeholder="From city (e.g., New York)" 
                value={fromCity}
                onChange={(e) => setFromCity(e.target.value)}
                className="rounded-xl" 
              />
              <Input 
                placeholder="To city (e.g., London)" 
                value={toCity}
                onChange={(e) => setToCity(e.target.value)}
                className="rounded-xl" 
              />
              <Button 
                onClick={handleDistanceCalculation}
                disabled={isCalculating || !fromCity.trim() || !toCity.trim()}
                className="w-full rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              >
                {isCalculating ? 'Calculating...' : 'Calculate Distance'}
              </Button>
              
              {distanceResult && (
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-xl text-center border border-green-200 dark:border-green-800">
                  {distanceResult.error ? (
                    <p className="text-red-600 dark:text-red-400">{distanceResult.error}</p>
                  ) : (
                    <>
                      <p className="text-xl font-bold text-green-600 dark:text-green-400">
                        {distanceResult.distance.toLocaleString()} km
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {distanceResult.fromCity} → {distanceResult.toCity}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        ~{distanceResult.flightTime.hours}h {distanceResult.flightTime.minutes}m flight
                      </p>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};