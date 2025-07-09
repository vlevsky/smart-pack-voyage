import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Settings, Crown, Palette, Type, Volume2, 
  Accessibility, Shield, Download, RotateCcw, Bell, 
  Wifi, Database, Moon, Sun, Smartphone, 
  ChevronDown, ChevronRight, User, CreditCard, HelpCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SubscriptionModal } from '@/components/SubscriptionModal';
import { HelpModal } from '@/components/HelpModal';

interface EnhancedSettingsPanelProps {
  isOpen: boolean;
  settings: {
    darkMode: boolean;
    simpleMode: boolean;
    accessibilitySettings: any;
    customTheme: string;
    customFont: string;
  };
  onSettingsChange: (key: string, value: any) => void;
  subscriptionTier: string;
  onClose: () => void;
}

const EnhancedSettingsPanel: React.FC<EnhancedSettingsPanelProps> = ({
  isOpen,
  settings,
  onSettingsChange,
  subscriptionTier,
  onClose,
}) => {
  const [expandedSections, setExpandedSections] = useState<string[]>(['subscription']);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  const [smartNotifications, setSmartNotifications] = useState(false);
  const [offlineMode, setOfflineMode] = useState(true);

  if (!isOpen) return null;

  const customThemes = [
    { id: 'default', name: 'Default', colors: ['#3b82f6', '#1d4ed8'] },
    { id: 'ocean', name: 'Ocean', colors: ['#0ea5e9', '#0284c7'] },
    { id: 'sunset', name: 'Sunset', colors: ['#f97316', '#ea580c'] },
    { id: 'forest', name: 'Forest', colors: ['#16a34a', '#15803d'] },
    { id: 'purple', name: 'Purple', colors: ['#9333ea', '#7c3aed'] },
    { id: 'rose', name: 'Rose', colors: ['#e11d48', '#be185d'] },
  ];

  const customFonts = [
    { id: 'inter', name: 'Inter' },
    { id: 'roboto', name: 'Roboto' },
    { id: 'poppins', name: 'Poppins' },
    { id: 'playfair', name: 'Playfair' },
  ];

  const isPro = subscriptionTier !== 'free';
  const isSilverOrAbove = ['silver', 'gold', 'exclusive'].includes(subscriptionTier);
  const isGoldOrAbove = ['gold', 'exclusive'].includes(subscriptionTier);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const applyTheme = (themeId: string) => {
    if (isPro) {
      onSettingsChange('customTheme', themeId);
    }
  };

  const applyFont = (fontId: string) => {
    if (isPro) {
      onSettingsChange('customFont', fontId);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 md:p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-2xl h-[90vh] overflow-hidden shadow-2xl flex flex-col"
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 shrink-0">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Settings</h2>
            <Button variant="ghost" onClick={onClose} className="rounded-full h-8 w-8 p-0">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-4 space-y-4">
            
            {/* Subscription */}
            <Card className="overflow-hidden">
              <div 
                className="p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                onClick={() => toggleSection('subscription')}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Crown className="h-4 w-4 text-yellow-500" />
                    <span className="font-medium text-gray-900 dark:text-white text-sm">Subscription</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="text-xs">
                      {subscriptionTier === 'free' ? 'Free' : subscriptionTier}
                    </Badge>
                    {expandedSections.includes('subscription') ? 
                      <ChevronDown className="h-3 w-3" /> : 
                      <ChevronRight className="h-3 w-3" />
                    }
                  </div>
                </div>
              </div>
              
              <AnimatePresence>
                {expandedSections.includes('subscription') && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-gray-200 dark:border-gray-700"
                  >
                    <div className="p-3">
                      <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-3 w-3 text-blue-500" />
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white text-xs">Manage Subscription</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              View billing and subscription details
                            </p>
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setShowSubscriptionModal(true)}
                          className="h-7 text-xs"
                        >
                          Manage
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg mt-2">
                        <div className="flex items-center gap-2">
                          <HelpCircle className="h-3 w-3 text-blue-500" />
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white text-xs">Help & Support</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Step-by-step app guide
                            </p>
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setShowHelpModal(true)}
                          className="h-7 text-xs"
                        >
                          Help
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>

            {/* Display Settings */}
            <Card className="overflow-hidden">
              <div 
                className="p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                onClick={() => toggleSection('display')}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Smartphone className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                    <span className="font-medium text-gray-900 dark:text-white text-sm">Display</span>
                  </div>
                  {expandedSections.includes('display') ? 
                    <ChevronDown className="h-3 w-3" /> : 
                    <ChevronRight className="h-3 w-3" />
                  }
                </div>
              </div>
              
              <AnimatePresence>
                {expandedSections.includes('display') && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-gray-200 dark:border-gray-700"
                  >
                    <div className="p-3 space-y-3">
                      
                      {/* Dark Mode */}
                      <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center gap-2">
                          {settings.darkMode ? (
                            <Moon className="h-3 w-3 text-blue-500" />
                          ) : (
                            <Sun className="h-3 w-3 text-orange-500" />
                          )}
                          <span className="font-medium text-gray-900 dark:text-white text-xs">Dark Mode</span>
                        </div>
                        <Switch
                          checked={settings.darkMode}
                          onCheckedChange={(checked) => onSettingsChange('darkMode', checked)}
                        />
                      </div>

                      {/* Theme Colors */}
                      <div className={`space-y-2 ${!isPro ? 'opacity-50' : ''}`}>
                        <div className="flex items-center gap-2">
                          <Palette className="h-3 w-3 text-pink-500" />
                          <span className="font-medium text-gray-900 dark:text-white text-xs">Theme Colors</span>
                          {!isPro && <Badge variant="outline" className="text-xs">Pro</Badge>}
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          {customThemes.map((theme) => (
                            <button
                              key={theme.id}
                              onClick={() => applyTheme(theme.id)}
                              disabled={!isPro}
                              className={`p-2 rounded-lg border transition-all ${
                                settings.customTheme === theme.id 
                                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                                  : 'border-gray-200 dark:border-gray-700'
                              }`}
                            >
                              <div
                                className="w-6 h-6 rounded-full mx-auto mb-1"
                                style={{
                                  background: `linear-gradient(45deg, ${theme.colors[0]}, ${theme.colors[1]})`
                                }}
                              />
                              <span className="text-xs text-gray-700 dark:text-gray-300">{theme.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Fonts */}
                      <div className={`space-y-2 ${!isPro ? 'opacity-50' : ''}`}>
                        <div className="flex items-center gap-2">
                          <Type className="h-3 w-3 text-indigo-500" />
                          <span className="font-medium text-gray-900 dark:text-white text-xs">Font Style</span>
                          {!isPro && <Badge variant="outline" className="text-xs">Pro</Badge>}
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {customFonts.map((font) => (
                            <button
                              key={font.id}
                              onClick={() => applyFont(font.id)}
                              disabled={!isPro}
                              className={`p-2 rounded-lg border transition-all text-left ${
                                settings.customFont === font.id 
                                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                                  : 'border-gray-200 dark:border-gray-700'
                              }`}
                            >
                              <span className="text-xs text-gray-700 dark:text-gray-300">{font.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>

            {/* Accessibility */}
            <Card className="overflow-hidden">
              <div 
                className="p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                onClick={() => toggleSection('accessibility')}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Accessibility className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                    <span className="font-medium text-gray-900 dark:text-white text-sm">Accessibility</span>
                  </div>
                  {expandedSections.includes('accessibility') ? 
                    <ChevronDown className="h-3 w-3" /> : 
                    <ChevronRight className="h-3 w-3" />
                  }
                </div>
              </div>
              
              <AnimatePresence>
                {expandedSections.includes('accessibility') && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-gray-200 dark:border-gray-700"
                  >
                    <div className="p-3 space-y-2">
                      <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Accessibility className="h-3 w-3 text-purple-500" />
                          <span className="font-medium text-gray-900 dark:text-white text-xs">High Contrast</span>
                        </div>
                        <Switch
                          checked={settings.accessibilitySettings.highContrast}
                          onCheckedChange={(checked) => onSettingsChange('accessibilitySettings', {
                            ...settings.accessibilitySettings,
                            highContrast: checked
                          })}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Type className="h-3 w-3 text-blue-500" />
                          <span className="font-medium text-gray-900 dark:text-white text-xs">Large Text</span>
                        </div>
                        <Switch
                          checked={settings.accessibilitySettings.largeText}
                          onCheckedChange={(checked) => onSettingsChange('accessibilitySettings', {
                            ...settings.accessibilitySettings,
                            largeText: checked
                          })}
                        />
                      </div>

                      <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Settings className="h-3 w-3 text-green-500" />
                          <span className="font-medium text-gray-900 dark:text-white text-xs">Simple Mode</span>
                        </div>
                        <Switch
                          checked={settings.simpleMode}
                          onCheckedChange={(checked) => onSettingsChange('simpleMode', checked)}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>

            {/* Advanced Settings */}
            <Card className="overflow-hidden">
              <div 
                className="p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                onClick={() => toggleSection('advanced')}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Settings className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                    <span className="font-medium text-gray-900 dark:text-white text-sm">Advanced</span>
                    {!isSilverOrAbove && <Badge variant="outline" className="text-xs">Silver+</Badge>}
                  </div>
                  {expandedSections.includes('advanced') ? 
                    <ChevronDown className="h-3 w-3" /> : 
                    <ChevronRight className="h-3 w-3" />
                  }
                </div>
              </div>
              
              <AnimatePresence>
                {expandedSections.includes('advanced') && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-gray-200 dark:border-gray-700"
                  >
                    <div className={`p-3 space-y-2 ${!isSilverOrAbove ? 'opacity-50' : ''}`}>
                      
                      {/* Auto-save */}
                      <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Shield className="h-3 w-3 text-green-500" />
                          <span className="font-medium text-gray-900 dark:text-white text-xs">Auto-save</span>
                          {!isSilverOrAbove && <Badge variant="outline" className="text-xs">Silver+</Badge>}
                        </div>
                        <Switch
                          checked={isSilverOrAbove && autoSave}
                          onCheckedChange={(checked) => isSilverOrAbove && setAutoSave(checked)}
                          disabled={!isSilverOrAbove}
                        />
                      </div>

                      {/* Smart Notifications */}
                      <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Bell className="h-3 w-3 text-blue-500" />
                          <span className="font-medium text-gray-900 dark:text-white text-xs">Smart Notifications</span>
                          {!isSilverOrAbove && <Badge variant="outline" className="text-xs">Silver+</Badge>}
                        </div>
                        <Switch
                          checked={isSilverOrAbove && smartNotifications}
                          onCheckedChange={(checked) => isSilverOrAbove && setSmartNotifications(checked)}
                          disabled={!isSilverOrAbove}
                        />
                      </div>

                      {/* Offline Mode */}
                      <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Wifi className="h-3 w-3 text-purple-500" />
                          <span className="font-medium text-gray-900 dark:text-white text-xs">Offline Mode</span>
                          {!isSilverOrAbove && <Badge variant="outline" className="text-xs">Silver+</Badge>}
                        </div>
                        <Switch
                          checked={isSilverOrAbove && offlineMode}
                          onCheckedChange={(checked) => isSilverOrAbove && setOfflineMode(checked)}
                          disabled={!isSilverOrAbove}
                        />
                      </div>

                      {/* Data Sync */}
                      <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Database className="h-3 w-3 text-orange-500" />
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white text-xs">Data Sync</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Sync across devices</p>
                          </div>
                          {!isGoldOrAbove && <Badge variant="outline" className="text-xs">Gold+</Badge>}
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-6 text-xs"
                          disabled={!isGoldOrAbove}
                        >
                          Sync Now
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </div>
        </ScrollArea>
      </motion.div>

      {/* Subscription Modal */}
      {showSubscriptionModal && (
        <SubscriptionModal
          isOpen={showSubscriptionModal}
          onClose={() => setShowSubscriptionModal(false)}
          onSubscribe={(tier) => {
            onSettingsChange('subscriptionTier', tier);
            setShowSubscriptionModal(false);
          }}
        />
      )}

      {/* Help Modal */}
      {showHelpModal && (
        <HelpModal
          isOpen={showHelpModal}
          onClose={() => setShowHelpModal(false)}
        />
      )}
    </div>
  );
};

export { EnhancedSettingsPanel };