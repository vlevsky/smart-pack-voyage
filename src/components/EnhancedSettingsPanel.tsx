import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Moon, Sun, Eye, Type, Palette, Zap, Volume2, 
  ChevronDown, ChevronRight, User, CreditCard, 
  HelpCircle, Info, Bell, Shield, Smartphone
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

interface AccessibilitySettings {
  highContrast: boolean;
  largeText: boolean;
  dyslexiaFont: boolean;
  reducedMotion: boolean;
  screenReader: boolean;
}

interface SettingsData {
  darkMode: boolean;
  simpleMode: boolean;
  accessibilitySettings: AccessibilitySettings;
  customTheme?: string;
  customFont?: string;
}

interface EnhancedSettingsPanelProps {
  isOpen: boolean;
  settings: SettingsData;
  onSettingsChange: (key: string, value: any) => void;
  subscriptionTier: string;
  onClose: () => void;
}

const settingSections = [
  {
    id: 'account',
    title: 'Account & Subscription',
    icon: User,
    items: ['subscription', 'billing', 'account']
  },
  {
    id: 'display',
    title: 'Display Settings',
    icon: Smartphone,
    items: ['theme', 'font', 'darkMode']
  },
  {
    id: 'accessibility',
    title: 'Accessibility',
    icon: Eye,
    items: ['contrast', 'text', 'motion']
  },
  {
    id: 'help',
    title: 'Help & Support',
    icon: HelpCircle,
    items: ['faq', 'contact', 'feedback']
  },
  {
    id: 'info',
    title: 'App Info',
    icon: Info,
    items: ['version', 'privacy', 'terms']
  }
];

const customThemes = [
  { id: 'default', name: 'Default Blue', colors: ['#3b82f6', '#1d4ed8'] },
  { id: 'ocean', name: 'Ocean Blue', colors: ['#0ea5e9', '#0284c7'] },
  { id: 'sunset', name: 'Sunset Orange', colors: ['#f97316', '#ea580c'] },
  { id: 'forest', name: 'Forest Green', colors: ['#16a34a', '#15803d'] },
  { id: 'purple', name: 'Royal Purple', colors: ['#9333ea', '#7c3aed'] },
  { id: 'rose', name: 'Rose Pink', colors: ['#e11d48', '#be185d'] },
];

const customFonts = [
  { id: 'inter', name: 'Inter (Default)', preview: 'Aa' },
  { id: 'roboto', name: 'Roboto', preview: 'Aa' },
  { id: 'poppins', name: 'Poppins', preview: 'Aa' },
  { id: 'playfair', name: 'Playfair Display', preview: 'Aa' },
];

export const EnhancedSettingsPanel: React.FC<EnhancedSettingsPanelProps> = ({
  isOpen,
  settings,
  onSettingsChange,
  subscriptionTier,
  onClose,
}) => {
  const [expandedSections, setExpandedSections] = useState<string[]>(['account']);

  if (!isOpen) return null;

  const isPro = ['silver', 'gold', 'exclusive'].includes(subscriptionTier.toLowerCase());

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const applyTheme = (themeId: string) => {
    const theme = customThemes.find(t => t.id === themeId);
    if (theme) {
      onSettingsChange('customTheme', themeId);
      const root = document.documentElement;
      root.style.setProperty('--primary', theme.colors[0]);
      root.style.setProperty('--primary-variant', theme.colors[1]);
    }
  };

  const applyFont = (fontId: string) => {
    onSettingsChange('customFont', fontId);
    const fontFamily = fontId === 'inter' ? 'Inter, sans-serif' : 
      fontId === 'roboto' ? 'Roboto, sans-serif' :
      fontId === 'poppins' ? 'Poppins, sans-serif' :
      fontId === 'playfair' ? 'Playfair Display, serif' : 'Inter, sans-serif';
    document.body.style.fontFamily = fontFamily;
  };

  const getSubscriptionBadge = () => {
    switch (subscriptionTier.toLowerCase()) {
      case 'silver': return { label: 'Silver', color: 'bg-gray-400' };
      case 'gold': return { label: 'Gold', color: 'bg-yellow-500' };
      case 'exclusive': return { label: 'Exclusive', color: 'bg-purple-600' };
      default: return { label: 'Free', color: 'bg-gray-300' };
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-2xl max-h-[85vh] overflow-hidden shadow-2xl"
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h2>
            <Button variant="ghost" onClick={onClose} className="rounded-full h-10 w-10 p-0">
              ×
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[70vh]">
          <div className="p-6 space-y-4">
            
            {/* Account & Subscription */}
            <Card className="overflow-hidden">
              <div 
                className="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                onClick={() => toggleSection('account')}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                    <span className="font-semibold text-gray-900 dark:text-white">Account & Subscription</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {(() => {
                      const badge = getSubscriptionBadge();
                      return (
                        <Badge className={`${badge.color} text-white text-xs`}>
                          {badge.label}
                        </Badge>
                      );
                    })()}
                    {expandedSections.includes('account') ? 
                      <ChevronDown className="h-4 w-4" /> : 
                      <ChevronRight className="h-4 w-4" />
                    }
                  </div>
                </div>
              </div>
              
              <AnimatePresence>
                {expandedSections.includes('account') && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-gray-200 dark:border-gray-700"
                  >
                    <div className="p-4 space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center gap-3">
                          <CreditCard className="h-4 w-4 text-blue-500" />
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">Manage Subscription</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Cancel, renew, or change your plan
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Manage
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
                className="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                onClick={() => toggleSection('display')}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Smartphone className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                    <span className="font-semibold text-gray-900 dark:text-white">Display Settings</span>
                  </div>
                  {expandedSections.includes('display') ? 
                    <ChevronDown className="h-4 w-4" /> : 
                    <ChevronRight className="h-4 w-4" />
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
                    <div className="p-4 space-y-4">
                      
                      {/* Dark Mode */}
                      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center gap-3">
                          {settings.darkMode ? (
                            <Moon className="h-4 w-4 text-blue-500" />
                          ) : (
                            <Sun className="h-4 w-4 text-orange-500" />
                          )}
                          <span className="font-medium text-gray-900 dark:text-white">Dark Mode</span>
                        </div>
                        <Switch
                          checked={settings.darkMode}
                          onCheckedChange={(checked) => onSettingsChange('darkMode', checked)}
                        />
                      </div>

                      {/* Theme Colors */}
                      <div className={`space-y-3 ${!isPro ? 'opacity-50' : ''}`}>
                        <div className="flex items-center gap-2">
                          <Palette className="h-4 w-4 text-pink-500" />
                          <span className="font-medium text-gray-900 dark:text-white">Theme Colors</span>
                          {!isPro && <Badge variant="outline" className="text-xs">Pro</Badge>}
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          {customThemes.map((theme) => (
                            <button
                              key={theme.id}
                              onClick={() => isPro && applyTheme(theme.id)}
                              disabled={!isPro}
                              className={`p-2 rounded-lg border transition-all ${
                                settings.customTheme === theme.id 
                                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                                  : 'border-gray-200 dark:border-gray-700'
                              }`}
                            >
                              <div
                                className="w-8 h-8 rounded-full mx-auto mb-1"
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
                      <div className={`space-y-3 ${!isPro ? 'opacity-50' : ''}`}>
                        <div className="flex items-center gap-2">
                          <Type className="h-4 w-4 text-indigo-500" />
                          <span className="font-medium text-gray-900 dark:text-white">Font Style</span>
                          {!isPro && <Badge variant="outline" className="text-xs">Pro</Badge>}
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {customFonts.map((font) => (
                            <button
                              key={font.id}
                              onClick={() => isPro && applyFont(font.id)}
                              disabled={!isPro}
                              className={`p-3 rounded-lg border transition-all text-left ${
                                settings.customFont === font.id 
                                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                                  : 'border-gray-200 dark:border-gray-700'
                              }`}
                            >
                              <div className="font-bold text-lg mb-1">{font.preview}</div>
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
                className="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                onClick={() => toggleSection('accessibility')}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Eye className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                    <span className="font-semibold text-gray-900 dark:text-white">Accessibility</span>
                  </div>
                  {expandedSections.includes('accessibility') ? 
                    <ChevronDown className="h-4 w-4" /> : 
                    <ChevronRight className="h-4 w-4" />
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
                    <div className="p-4 space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Eye className="h-4 w-4 text-purple-500" />
                          <span className="font-medium text-gray-900 dark:text-white">High Contrast</span>
                        </div>
                        <Switch
                          checked={settings.accessibilitySettings.highContrast}
                          onCheckedChange={(checked) => onSettingsChange('accessibilitySettings', {
                            ...settings.accessibilitySettings,
                            highContrast: checked
                          })}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Type className="h-4 w-4 text-blue-500" />
                          <span className="font-medium text-gray-900 dark:text-white">Large Text</span>
                        </div>
                        <Switch
                          checked={settings.accessibilitySettings.largeText}
                          onCheckedChange={(checked) => onSettingsChange('accessibilitySettings', {
                            ...settings.accessibilitySettings,
                            largeText: checked
                          })}
                        />
                      </div>

                      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Zap className="h-4 w-4 text-green-500" />
                          <span className="font-medium text-gray-900 dark:text-white">Simple Mode</span>
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
                className="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                onClick={() => toggleSection('advanced')}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Zap className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                    <span className="font-semibold text-gray-900 dark:text-white">Advanced Settings</span>
                  </div>
                  {expandedSections.includes('advanced') ? 
                    <ChevronDown className="h-4 w-4" /> : 
                    <ChevronRight className="h-4 w-4" />
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
                    <div className="p-4 space-y-3">
                      
                      {/* Auto-save */}
                      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Shield className="h-4 w-4 text-green-500" />
                          <span className="font-medium text-gray-900 dark:text-white">Auto-save</span>
                        </div>
                        <Switch
                          checked={true}
                          onCheckedChange={() => {}}
                        />
                      </div>

                      {/* Smart Notifications */}
                      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Bell className="h-4 w-4 text-blue-500" />
                          <span className="font-medium text-gray-900 dark:text-white">Smart Notifications</span>
                        </div>
                        <Switch
                          checked={false}
                          onCheckedChange={() => {}}
                        />
                      </div>

                      {/* Offline Mode */}
                      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Volume2 className="h-4 w-4 text-purple-500" />
                          <span className="font-medium text-gray-900 dark:text-white">Offline Mode</span>
                        </div>
                        <Switch
                          checked={true}
                          onCheckedChange={() => {}}
                        />
                      </div>

                      {/* Data Sync */}
                      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Zap className="h-4 w-4 text-orange-500" />
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">Data Sync</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Sync across devices</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Sync Now
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );
};