import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, Zap, Target, Award, Gamepad2, Circle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface GameModeTabProps {
  packedItems: number;
  totalItems: number;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  iconName: string;
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

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'star': return Star;
    case 'zap': return Zap;
    case 'trophy': return Trophy;
    case 'target': return Target;
    default: return Circle;
  }
};

const initialAchievements: Achievement[] = [
  {
    id: 'first_pack',
    name: 'First Steps',
    description: 'Pack your first item',
    iconName: 'star',
    unlocked: false,
    progress: 0,
    maxProgress: 1,
  },
  {
    id: 'streak_5',
    name: 'On a Roll',
    description: 'Pack 5 items in a row',
    iconName: 'zap',
    unlocked: false,
    progress: 0,
    maxProgress: 5,
  },
  {
    id: 'completionist',
    name: 'Completionist',
    description: 'Complete your first trip',
    iconName: 'trophy',
    unlocked: false,
    progress: 0,
    maxProgress: 1,
  },
  {
    id: 'efficiency_expert',
    name: 'Efficiency Expert',
    description: 'Pack 50 items total',
    iconName: 'target',
    unlocked: false,
    progress: 0,
    maxProgress: 50,
  },
  {
    id: 'speed_packer',
    name: 'Speed Packer',
    description: 'Pack 10 items in one session',
    iconName: 'zap',
    unlocked: false,
    progress: 0,
    maxProgress: 10,
  },
  {
    id: 'organization_master',
    name: 'Organization Master',
    description: 'Complete 3 trips',
    iconName: 'trophy',
    unlocked: false,
    progress: 0,
    maxProgress: 3,
  },
];

export const GameModeTab: React.FC<GameModeTabProps> = ({
  packedItems,
  totalItems,
}) => {
  const [gameStats, setGameStats] = useState<GameStats>({
    level: 1,
    xp: 0,
    xpToNextLevel: 100,
    totalXP: 0,
    streak: 0,
    achievements: initialAchievements,
  });

  const [showLevelUp, setShowLevelUp] = useState(false);
  const [showAchievement, setShowAchievement] = useState<Achievement | null>(null);

  // Load saved stats
  useEffect(() => {
    try {
      const savedStats = localStorage.getItem('packingGameStats');
      if (savedStats) {
        const parsed = JSON.parse(savedStats);
        setGameStats({
          ...parsed,
          achievements: parsed.achievements || initialAchievements,
        });
      }
    } catch (error) {
      console.warn('Failed to load game stats:', error);
    }
  }, []);

  // Save stats
  useEffect(() => {
    try {
      localStorage.setItem('packingGameStats', JSON.stringify(gameStats));
    } catch (error) {
      console.warn('Failed to save game stats:', error);
    }
  }, [gameStats]);

  // Add XP when items are packed
  useEffect(() => {
    const prevPackedItems = parseInt(localStorage.getItem('prevPackedItems') || '0');
    if (packedItems > prevPackedItems) {
      const xpGained = (packedItems - prevPackedItems) * 10;
      addXP(xpGained);
      localStorage.setItem('prevPackedItems', packedItems.toString());
    }
  }, [packedItems]);

  const addXP = (amount: number) => {
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
        setTimeout(() => setShowLevelUp(false), 3000);
      }

      // Update achievements
      const updatedAchievements = prev.achievements.map(achievement => {
        let newProgress = achievement.progress;

        switch (achievement.id) {
          case 'first_pack':
            newProgress = Math.min(packedItems, achievement.maxProgress);
            break;
          case 'streak_5':
            newProgress = Math.min(packedItems, achievement.maxProgress);
            break;
          case 'completionist':
            newProgress = totalItems > 0 && packedItems === totalItems ? 1 : 0;
            break;
          case 'efficiency_expert':
            newProgress = Math.min(Math.floor(newTotalXP / 10), achievement.maxProgress);
            break;
          case 'speed_packer':
            newProgress = Math.min(packedItems, achievement.maxProgress);
            break;
          case 'organization_master':
            const completedTrips = parseInt(localStorage.getItem('completedTrips') || '0');
            newProgress = Math.min(completedTrips, achievement.maxProgress);
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
        xp: newXP >= prev.xpToNextLevel ? newXP - prev.xpToNextLevel : newXP,
        level: newLevel,
        xpToNextLevel: newXPToNextLevel,
        totalXP: newTotalXP,
        streak: packedItems,
        achievements: updatedAchievements,
      };
    });
  };

  const getLevelTitle = (level: number) => {
    if (level < 5) return 'Packing Newbie';
    if (level < 10) return 'Travel Enthusiast';
    if (level < 20) return 'Packing Pro';
    if (level < 30) return 'Globetrotter';
    return 'Packing Master';
  };

  const progressPercentage = gameStats.xpToNextLevel > 0 ? (gameStats.xp / gameStats.xpToNextLevel) * 100 : 0;
  const completionPercentage = totalItems > 0 ? (packedItems / totalItems) * 100 : 0;

  return (
    <div className="p-4 pb-20 space-y-4">
      {/* Header */}
      <div className="text-center space-y-1">
        <div className="flex items-center justify-center gap-2">
          <Gamepad2 className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold text-primary">Game Mode</h1>
        </div>
        <p className="text-sm text-muted-foreground">Turn packing into a fun challenge!</p>
      </div>

      {/* Level Card */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-primary/10 rounded-full p-2">
                <Trophy className="h-4 w-4 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg">Level {gameStats.level}</CardTitle>
                <p className="text-xs text-muted-foreground">{getLevelTitle(gameStats.level)}</p>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <div className="flex justify-between text-xs font-medium mb-1">
              <span>XP Progress</span>
              <span>{gameStats.xp}/{gameStats.xpToNextLevel}</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
          
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-muted/50 rounded-lg p-2">
              <div className="font-bold text-sm">{gameStats.totalXP}</div>
              <div className="text-[10px] text-muted-foreground">Total XP</div>
            </div>
            <div className="bg-muted/50 rounded-lg p-2">
              <div className="font-bold text-sm">{gameStats.streak}</div>
              <div className="text-[10px] text-muted-foreground">Items Packed</div>
            </div>
            <div className="bg-muted/50 rounded-lg p-2">
              <div className="font-bold text-sm">{Math.round(completionPercentage)}%</div>
              <div className="text-[10px] text-muted-foreground">Complete</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Award className="h-4 w-4" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            {gameStats.achievements.map((achievement) => {
              const Icon = getIcon(achievement.iconName);
              const progress = (achievement.progress / achievement.maxProgress) * 100;
              
              return (
                <div
                  key={achievement.id}
                  className={`flex items-center gap-2 p-2 rounded-lg border ${
                    achievement.unlocked 
                      ? 'bg-primary/5 border-primary/20' 
                      : 'bg-muted/30 border-muted'
                  }`}
                >
                  <div className={`rounded-full p-1.5 ${
                    achievement.unlocked ? 'bg-primary/20' : 'bg-muted'
                  }`}>
                    <Icon className={`h-3 w-3 ${
                      achievement.unlocked ? 'text-primary' : 'text-muted-foreground'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-0.5">
                      <span className={`font-medium text-xs ${
                        achievement.unlocked ? 'text-primary' : 'text-muted-foreground'
                      }`}>
                        {achievement.name}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        {achievement.progress}/{achievement.maxProgress}
                      </span>
                    </div>
                    <p className="text-[10px] text-muted-foreground mb-1">
                      {achievement.description}
                    </p>
                    <Progress value={progress} className="h-0.5" />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Level Up Animation */}
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
                {React.createElement(getIcon(showAchievement.iconName), { className: "h-5 w-5" })}
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
    </div>
  );
};