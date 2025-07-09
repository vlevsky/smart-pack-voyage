import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, Zap, Target, Award, Gift, Gamepad2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';

interface PackingGameModeProps {
  isEnabled: boolean;
  onToggle: (enabled: boolean) => void;
  packedItems: number;
  totalItems: number;
  onItemPacked: () => void;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
}

interface GameStats {
  level: number;
  xp: number;
  xpToNextLevel: number;
  totalXP: number;
  streak: number;
  achievements: Achievement[];
}

export const PackingGameMode: React.FC<PackingGameModeProps> = ({
  isEnabled,
  onToggle,
  packedItems,
  totalItems,
  onItemPacked,
}) => {
  const [gameStats, setGameStats] = useState<GameStats>({
    level: 1,
    xp: 0,
    xpToNextLevel: 100,
    totalXP: 0,
    streak: 0,
    achievements: [
      {
        id: 'first_pack',
        name: 'First Steps',
        description: 'Pack your first item',
        icon: Star,
        unlocked: false,
        progress: 0,
        maxProgress: 1,
      },
      {
        id: 'streak_5',
        name: 'On a Roll',
        description: 'Pack 5 items in a row',
        icon: Zap,
        unlocked: false,
        progress: 0,
        maxProgress: 5,
      },
      {
        id: 'completionist',
        name: 'Completionist',
        description: 'Complete your first trip',
        icon: Trophy,
        unlocked: false,
        progress: 0,
        maxProgress: 1,
      },
      {
        id: 'efficiency_expert',
        name: 'Efficiency Expert',
        description: 'Pack 50 items total',
        icon: Target,
        unlocked: false,
        progress: 0,
        maxProgress: 50,
      },
    ],
  });

  const [showLevelUp, setShowLevelUp] = useState(false);
  const [showAchievement, setShowAchievement] = useState<Achievement | null>(null);
  const [confetti, setConfetti] = useState(false);

  useEffect(() => {
    const savedStats = localStorage.getItem('packingGameStats');
    if (savedStats) {
      setGameStats(JSON.parse(savedStats));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('packingGameStats', JSON.stringify(gameStats));
  }, [gameStats]);

  const addXP = (amount: number) => {
    if (!isEnabled) return;

    setGameStats(prev => {
      const newXP = prev.xp + amount;
      const newTotalXP = prev.totalXP + amount;
      let newLevel = prev.level;
      let newXPToNextLevel = prev.xpToNextLevel;

      // Check for level up
      if (newXP >= prev.xpToNextLevel) {
        newLevel++;
        newXPToNextLevel = newLevel * 100;
        setShowLevelUp(true);
        setConfetti(true);
        setTimeout(() => {
          setShowLevelUp(false);
          setConfetti(false);
        }, 3000);
      }

      return {
        ...prev,
        xp: newXP >= prev.xpToNextLevel ? newXP - prev.xpToNextLevel : newXP,
        level: newLevel,
        xpToNextLevel: newXPToNextLevel,
        totalXP: newTotalXP,
      };
    });
  };

  const updateAchievements = () => {
    if (!isEnabled) return;

    setGameStats(prev => {
      const updatedAchievements = prev.achievements.map(achievement => {
        let newProgress = achievement.progress;

        switch (achievement.id) {
          case 'first_pack':
            newProgress = Math.min(packedItems, achievement.maxProgress);
            break;
          case 'streak_5':
            newProgress = Math.min(prev.streak, achievement.maxProgress);
            break;
          case 'completionist':
            newProgress = totalItems > 0 && packedItems === totalItems ? 1 : 0;
            break;
          case 'efficiency_expert':
            newProgress = Math.min(prev.totalXP / 10, achievement.maxProgress); // Assuming 10 XP per item
            break;
        }

        const wasUnlocked = achievement.unlocked;
        const isNowUnlocked = newProgress >= achievement.maxProgress;

        if (!wasUnlocked && isNowUnlocked) {
          setShowAchievement(achievement);
          setTimeout(() => setShowAchievement(null), 3000);
        }

        return {
          ...achievement,
          progress: newProgress,
          unlocked: isNowUnlocked,
        };
      });

      return {
        ...prev,
        achievements: updatedAchievements,
      };
    });
  };

  useEffect(() => {
    try {
      if (isEnabled && packedItems > 0 && totalItems > 0) {
        addXP(10); // 10 XP per packed item
        setGameStats(prev => ({ ...prev, streak: packedItems }));
        updateAchievements();
      }
    } catch (error) {
      console.error('Game mode error:', error);
    }
  }, [packedItems, isEnabled, totalItems]);

  const getLevelTitle = (level: number) => {
    if (level < 5) return 'Packing Newbie';
    if (level < 10) return 'Travel Enthusiast';
    if (level < 20) return 'Packing Pro';
    if (level < 30) return 'Globetrotter';
    return 'Packing Master';
  };

  const progressPercentage = (gameStats.xp / gameStats.xpToNextLevel) * 100;
  const completionPercentage = totalItems > 0 ? (packedItems / totalItems) * 100 : 0;

  if (!isEnabled) {
    return (
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-xl p-3 text-white mb-3 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-white/20 rounded-full p-2">
              <Trophy className="h-4 w-4" />
            </div>
            <div>
              <span className="font-semibold text-base">Game Mode</span>
              <p className="text-xs opacity-90 mt-1">
                Turn packing into a fun challenge!
              </p>
            </div>
          </div>
          <Button
            onClick={() => onToggle(true)}
            className="bg-white/20 hover:bg-white/30 text-white border-white/30 font-medium text-sm h-8"
            size="sm"
          >
            Enable
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-xl p-3 text-white mb-3 relative overflow-hidden shadow-lg"
      >
        {/* Decorative background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-2 right-2 w-12 h-12 bg-white rounded-full"></div>
          <div className="absolute bottom-2 left-2 w-8 h-8 bg-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-4 h-4 bg-white rounded-full"></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 rounded-full p-2 backdrop-blur-sm">
                <Trophy className="h-6 w-6" />
              </div>
              <div>
                <div className="font-bold text-xl">Level {gameStats.level}</div>
                <div className="text-sm opacity-90">{getLevelTitle(gameStats.level)}</div>
              </div>
            </div>
            <Button
              onClick={() => onToggle(false)}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20 h-8 w-8 p-0 rounded-full"
            >
              ×
            </Button>
          </div>

          <div className="space-y-3 mb-4">
            <div className="flex justify-between text-sm font-medium">
              <span>XP Progress</span>
              <span>{gameStats.xp}/{gameStats.xpToNextLevel}</span>
            </div>
            <div className="bg-white/20 rounded-full h-3 overflow-hidden backdrop-blur-sm">
              <div 
                className="bg-gradient-to-r from-yellow-400 to-orange-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center mb-4">
            <div className="bg-white/10 rounded-lg p-2 backdrop-blur-sm">
              <div className="font-bold text-lg">{gameStats.totalXP}</div>
              <div className="text-xs opacity-75">Total XP</div>
            </div>
            <div className="bg-white/10 rounded-lg p-2 backdrop-blur-sm">
              <div className="font-bold text-lg">{gameStats.streak}</div>
              <div className="text-xs opacity-75">Streak</div>
            </div>
            <div className="bg-white/10 rounded-lg p-2 backdrop-blur-sm">
              <div className="font-bold text-lg">{Math.round(completionPercentage)}%</div>
              <div className="text-xs opacity-75">Complete</div>
            </div>
          </div>

          {gameStats.achievements.filter(a => a.unlocked).length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {gameStats.achievements.filter(a => a.unlocked).slice(0, 3).map((achievement) => {
                const Icon = achievement.icon;
                return (
                  <div
                    key={achievement.id}
                    className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1"
                  >
                    <Icon className="h-3 w-3" />
                    <span className="text-xs font-medium">{achievement.name}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </motion.div>

      <AnimatePresence>
        {showLevelUp && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
          >
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-2xl p-8 text-center shadow-2xl">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Trophy className="h-16 w-16 mx-auto mb-4" />
              </motion.div>
              <h2 className="text-3xl font-bold mb-2">Level Up!</h2>
              <p className="text-lg">Welcome to Level {gameStats.level}</p>
              <p className="text-sm opacity-90 mt-2">{getLevelTitle(gameStats.level)}</p>
            </div>
          </motion.div>
        )}

        {showAchievement && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl p-4 shadow-lg z-50 max-w-sm"
          >
            <div className="flex items-center gap-3">
              <div className="bg-white/20 rounded-full p-2">
                <showAchievement.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="font-semibold">Achievement Unlocked!</div>
                <div className="text-sm">{showAchievement.name}</div>
                <div className="text-xs opacity-90">{showAchievement.description}</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};