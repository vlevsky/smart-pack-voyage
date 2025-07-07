
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, Zap, Target, Award, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

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
    if (isEnabled) {
      addXP(10); // 10 XP per packed item
      setGameStats(prev => ({ ...prev, streak: prev.streak + 1 }));
      updateAchievements();
    }
  }, [packedItems, isEnabled]);

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
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-4 text-white mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            <span className="font-medium">Game Mode</span>
          </div>
          <Button
            onClick={() => onToggle(true)}
            variant="secondary"
            size="sm"
            className="bg-white/20 hover:bg-white/30 text-white border-white/30"
          >
            Enable
          </Button>
        </div>
        <p className="text-sm opacity-90 mt-2">
          Turn packing into a game! Earn XP, unlock achievements, and level up.
        </p>
      </div>
    );
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-4 text-white mb-4 relative overflow-hidden"
      >
        {confetti && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-yellow-300 rounded-full"
                initial={{
                  x: Math.random() * 100 + '%',
                  y: '100%',
                  scale: 0,
                }}
                animate={{
                  y: '-100%',
                  scale: [0, 1, 0],
                  rotate: 360,
                }}
                transition={{
                  duration: 2,
                  delay: Math.random() * 0.5,
                  ease: 'easeOut',
                }}
              />
            ))}
          </div>
        )}

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            <div>
              <div className="font-semibold">Level {gameStats.level}</div>
              <div className="text-xs opacity-90">{getLevelTitle(gameStats.level)}</div>
            </div>
          </div>
          <Button
            onClick={() => onToggle(false)}
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20 h-8 w-8 p-0"
          >
            ×
          </Button>
        </div>

        <div className="space-y-2 mb-3">
          <div className="flex justify-between text-sm">
            <span>XP Progress</span>
            <span>{gameStats.xp}/{gameStats.xpToNextLevel}</span>
          </div>
          <Progress value={progressPercentage} className="h-2 bg-white/20" />
        </div>

        <div className="grid grid-cols-3 gap-3 text-center text-sm">
          <div>
            <div className="font-semibold">{gameStats.totalXP}</div>
            <div className="opacity-75">Total XP</div>
          </div>
          <div>
            <div className="font-semibold">{gameStats.streak}</div>
            <div className="opacity-75">Streak</div>
          </div>
          <div>
            <div className="font-semibold">{Math.round(completionPercentage)}%</div>
            <div className="opacity-75">Complete</div>
          </div>
        </div>

        <div className="flex gap-2 mt-3 flex-wrap">
          {gameStats.achievements.filter(a => a.unlocked).map((achievement) => {
            const Icon = achievement.icon;
            return (
              <Badge
                key={achievement.id}
                variant="secondary"
                className="bg-white/20 text-white border-white/30 text-xs"
              >
                <Icon className="h-3 w-3 mr-1" />
                {achievement.name}
              </Badge>
            );
          })}
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
              <Trophy className="h-16 w-16 mx-auto mb-4" />
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
            className="fixed bottom-4 right-4 bg-green-500 text-white rounded-xl p-4 shadow-lg z-50 max-w-sm"
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
