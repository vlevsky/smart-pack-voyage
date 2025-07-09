import React from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, Eye, Type, Palette, Zap, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';

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

interface SettingsPanelProps {
  isOpen: boolean;
  settings: SettingsData;
  onSettingsChange: (key: string, value: any) => void;
  subscriptionTier: string;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  isOpen,
  settings,
  onSettingsChange,
  subscriptionTier,
}) => {
  if (!isOpen) return null;

  const isPro = ['gold', 'exclusive'].includes(subscriptionTier);

  const handleAccessibilityChange = (key: keyof AccessibilitySettings, value: boolean) => {
    onSettingsChange('accessibilitySettings', {
      ...settings.accessibilitySettings,
      [key]: value,
    });
  };

  const customThemes = [
    { id: 'ocean', name: 'Ocean Blue', colors: ['#0ea5e9', '#0284c7'] },
    { id: 'sunset', name: 'Sunset Orange', colors: ['#f97316', '#ea580c'] },
    { id: 'forest', name: 'Forest Green', colors: ['#16a34a', '#15803d'] },
    { id: 'purple', name: 'Royal Purple', colors: ['#9333ea', '#7c3aed'] },
  ];

  const customFonts = [
    { id: 'inter', name: 'Inter (Default)' },
    { id: 'roboto', name: 'Roboto' },
    { id: 'poppins', name: 'Poppins' },
    { id: 'playfair', name: 'Playfair Display' },
  ];

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      className="overflow-hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700"
    >
      <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
        
        {/* Basic Settings */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
            Display Settings
          </h3>
          
          <div className="space-y-4">
            {/* Dark Mode */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <div className="flex items-center gap-3">
                {settings.darkMode ? (
                  <Moon className="h-5 w-5 text-blue-500" />
                ) : (
                  <Sun className="h-5 w-5 text-orange-500" />
                )}
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Dark Mode</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Switch between light and dark themes
                  </p>
                </div>
              </div>
              <Switch
                checked={settings.darkMode}
                onCheckedChange={(checked) => onSettingsChange('darkMode', checked)}
              />
            </div>

            {/* Simple Mode */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <div className="flex items-center gap-3">
                <Zap className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Simple Mode</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Simplified interface with larger buttons
                  </p>
                </div>
              </div>
              <Switch
                checked={settings.simpleMode}
                onCheckedChange={(checked) => onSettingsChange('simpleMode', checked)}
              />
            </div>
          </div>
        </div>

        {/* Accessibility Settings */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
            Accessibility
          </h3>
          
          <div className="space-y-3">
            {/* High Contrast */}
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center gap-3">
                <Eye className="h-4 w-4 text-purple-500" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  High Contrast
                </span>
              </div>
              <Switch
                checked={settings.accessibilitySettings.highContrast}
                onCheckedChange={(checked) => handleAccessibilityChange('highContrast', checked)}
              />
            </div>

            {/* Large Text */}
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center gap-3">
                <Type className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  Large Text
                </span>
              </div>
              <Switch
                checked={settings.accessibilitySettings.largeText}
                onCheckedChange={(checked) => handleAccessibilityChange('largeText', checked)}
              />
            </div>

            {/* Dyslexia Font */}
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center gap-3">
                <Type className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  Dyslexia-Friendly Font
                </span>
              </div>
              <Switch
                checked={settings.accessibilitySettings.dyslexiaFont}
                onCheckedChange={(checked) => handleAccessibilityChange('dyslexiaFont', checked)}
              />
            </div>

            {/* Reduced Motion */}
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center gap-3">
                <Zap className="h-4 w-4 text-orange-500" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  Reduced Motion
                </span>
              </div>
              <Switch
                checked={settings.accessibilitySettings.reducedMotion}
                onCheckedChange={(checked) => handleAccessibilityChange('reducedMotion', checked)}
              />
            </div>

            {/* Screen Reader Support */}
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center gap-3">
                <Volume2 className="h-4 w-4 text-red-500" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  Screen Reader Support
                </span>
              </div>
              <Switch
                checked={settings.accessibilitySettings.screenReader}
                onCheckedChange={(checked) => handleAccessibilityChange('screenReader', checked)}
              />
            </div>
          </div>
        </div>

        {/* Pro Settings */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
              Premium Features
            </h3>
            {!isPro && (
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs">
                Pro
              </Badge>
            )}
          </div>

          {/* Custom Themes */}
          <div className={`space-y-3 ${!isPro ? 'opacity-50 pointer-events-none' : ''}`}>
            <div className="flex items-center gap-2">
              <Palette className="h-4 w-4 text-pink-500" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                Custom Themes
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {customThemes.map((theme) => (
                <Button
                  key={theme.id}
                  variant={settings.customTheme === theme.id ? "default" : "outline"}
                  size="sm"
                  className="justify-start"
                  onClick={() => isPro && onSettingsChange('customTheme', theme.id)}
                  disabled={!isPro}
                >
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{
                      background: `linear-gradient(45deg, ${theme.colors[0]}, ${theme.colors[1]})`
                    }}
                  />
                  {theme.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Custom Fonts */}
          <div className={`space-y-3 ${!isPro ? 'opacity-50 pointer-events-none' : ''}`}>
            <div className="flex items-center gap-2">
              <Type className="h-4 w-4 text-indigo-500" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                Custom Fonts
              </span>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {customFonts.map((font) => (
                <Button
                  key={font.id}
                  variant={settings.customFont === font.id ? "default" : "outline"}
                  size="sm"
                  className="justify-start text-xs"
                  onClick={() => isPro && onSettingsChange('customFont', font.id)}
                  disabled={!isPro}
                >
                  {font.name}
                </Button>
              ))}
            </div>
          </div>

          {!isPro && (
            <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                Unlock custom themes and fonts with Pro
              </p>
              <Button size="sm" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                Upgrade Now
              </Button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};