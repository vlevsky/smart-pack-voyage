
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, Copy, Trash2, Plus, X, MapPin, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { PackingItemType } from '@/components/PackingItem';

interface Template {
  id: string;
  name: string;
  description: string;
  destination?: string;
  duration: number;
  items: PackingItemType[];
  created: Date;
  luggage?: { [key: string]: string };
}

interface TripTemplatesProps {
  isOpen: boolean;
  onClose: () => void;
  templates: Template[];
  onSaveTemplate: (name: string, items: PackingItemType[]) => void;
  onLoadTemplate: (template: Template) => void;
  currentItems: PackingItemType[];
  currentTrip?: {
    name: string;
    destination?: string;
    startDate?: Date;
    endDate?: Date;
  };
}

export const TripTemplates: React.FC<TripTemplatesProps> = ({
  isOpen,
  onClose,
  templates: externalTemplates,
  onSaveTemplate,
  onLoadTemplate,
  currentItems,
  currentTrip,
}) => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [saveData, setSaveData] = useState({
    name: '',
    description: '',
  });

  useEffect(() => {
    const savedTemplates = localStorage.getItem('packingTemplates');
    if (savedTemplates) {
      const parsed = JSON.parse(savedTemplates).map((template: any) => ({
        ...template,
        created: new Date(template.created),
      }));
      setTemplates(parsed);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('packingTemplates', JSON.stringify(templates));
  }, [templates]);

  const handleSaveTemplate = () => {
    if (!saveData.name.trim()) return;

    const duration = currentTrip?.startDate && currentTrip?.endDate
      ? Math.ceil((currentTrip.endDate.getTime() - currentTrip.startDate.getTime()) / (1000 * 60 * 60 * 24))
      : 7;

    const newTemplate: Template = {
      id: Date.now().toString(),
      name: saveData.name.trim(),
      description: saveData.description.trim(),
      destination: currentTrip?.destination,
      duration,
      items: currentItems,
      created: new Date(),
    };

    setTemplates(prev => [newTemplate, ...prev]);
    setSaveData({ name: '', description: '' });
    setShowSaveModal(false);
  };

  const handleDeleteTemplate = (templateId: string) => {
    setTemplates(prev => prev.filter(t => t.id !== templateId));
  };

  const handleCloneTemplate = (template: Template) => {
    onLoadTemplate(template);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold">Trip Templates</h2>
          <div className="flex gap-2">
            <Button onClick={() => setShowSaveModal(true)} className="bg-blue-500 hover:bg-blue-600">
              <Save className="h-4 w-4 mr-2" />
              Save Current Trip
            </Button>
            <Button variant="ghost" onClick={onClose} className="rounded-full h-10 w-10 p-0">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {templates.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📋</div>
              <h3 className="text-xl font-semibold mb-2">No Templates Yet</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Save your current trip as a template to reuse it later
              </p>
              <Button onClick={() => setShowSaveModal(true)} className="bg-blue-500 hover:bg-blue-600">
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Template
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {templates.map((template) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-lg truncate">{template.name}</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteTemplate(template.id)}
                      className="text-red-500 hover:text-red-700 h-8 w-8 p-0"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>

                  {template.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      {template.description}
                    </p>
                  )}

                  <div className="space-y-2 mb-4">
                    {template.destination && (
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <MapPin className="h-3 w-3" />
                        <span>{template.destination}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Calendar className="h-3 w-3" />
                      <span>{template.duration} days</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="secondary">
                      {template.items.length} items
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {template.created.toLocaleDateString()}
                    </span>
                  </div>

                  <Button
                    onClick={() => handleCloneTemplate(template)}
                    className="w-full bg-blue-500 hover:bg-blue-600"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Use Template
                  </Button>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>

      <AnimatePresence>
        {showSaveModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white dark:bg-gray-900 rounded-xl p-6 w-full max-w-md"
            >
              <h3 className="text-lg font-semibold mb-4">Save as Template</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Template Name</label>
                  <Input
                    value={saveData.name}
                    onChange={(e) => setSaveData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Paris Summer Trip"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Description (Optional)</label>
                  <Input
                    value={saveData.description}
                    onChange={(e) => setSaveData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="e.g., Perfect for 7-day European vacation"
                  />
                </div>
              </div>

              <div className="flex gap-2 mt-6">
                <Button
                  onClick={handleSaveTemplate}
                  disabled={!saveData.name.trim()}
                  className="flex-1 bg-blue-500 hover:bg-blue-600"
                >
                  Save Template
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowSaveModal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
