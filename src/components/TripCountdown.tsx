
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Bell, CheckCircle, Plane, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface TripCountdownProps {
  tripName: string;
  destination?: string;
  startDate?: Date;
  endDate?: Date;
  onReminderSet?: (reminder: string) => void;
}

interface Reminder {
  id: string;
  text: string;
  daysBeforeTrip: number;
  completed: boolean;
}

export const TripCountdown: React.FC<TripCountdownProps> = ({
  tripName,
  destination,
  startDate,
  endDate,
  onReminderSet,
}) => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  
  const [reminders, setReminders] = useState<Reminder[]>([
    { id: '1', text: 'Check passport expiration', daysBeforeTrip: 30, completed: false },
    { id: '2', text: 'Book travel insurance', daysBeforeTrip: 14, completed: false },
    { id: '3', text: 'Check-in online', daysBeforeTrip: 1, completed: false },
    { id: '4', text: 'Start packing', daysBeforeTrip: 3, completed: false },
    { id: '5', text: 'Download offline maps', daysBeforeTrip: 2, completed: false },
  ]);

  useEffect(() => {
    if (!startDate) return;

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const tripTime = startDate.getTime();
      const difference = tripTime - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [startDate]);

  const toggleReminder = (reminderId: string) => {
    setReminders(prev =>
      prev.map(reminder =>
        reminder.id === reminderId
          ? { ...reminder, completed: !reminder.completed }
          : reminder
      )
    );
  };

  if (!startDate) return null;

  const isUpcoming = timeLeft.days > 0 || timeLeft.hours > 0 || timeLeft.minutes > 0 || timeLeft.seconds > 0;
  const activeReminders = reminders.filter(r => r.daysBeforeTrip >= timeLeft.days && !r.completed);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white mb-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Plane className="h-5 w-5" />
          <h3 className="font-semibold text-lg">{tripName}</h3>
        </div>
        {destination && (
          <div className="flex items-center gap-1 text-sm opacity-90">
            <MapPin className="h-4 w-4" />
            {destination}
          </div>
        )}
      </div>

      {isUpcoming ? (
        <div className="text-center mb-6">
          <div className="text-3xl font-bold mb-2">
            {timeLeft.days > 0 ? (
              `${timeLeft.days} day${timeLeft.days !== 1 ? 's' : ''} to go!`
            ) : (
              `${timeLeft.hours}:${timeLeft.minutes.toString().padStart(2, '0')}:${timeLeft.seconds.toString().padStart(2, '0')}`
            )}
          </div>
          <div className="text-sm opacity-90">
            Departure: {startDate.toLocaleDateString()} at {startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      ) : (
        <div className="text-center mb-6">
          <div className="text-2xl font-bold mb-2">🎉 Enjoy your trip!</div>
          <div className="text-sm opacity-90">Have an amazing time!</div>
        </div>
      )}

      {activeReminders.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Bell className="h-4 w-4" />
            Upcoming Reminders
          </div>
          {activeReminders.slice(0, 3).map((reminder) => (
            <motion.div
              key={reminder.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center justify-between bg-white/10 rounded-lg p-3"
            >
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleReminder(reminder.id)}
                  className="text-white hover:bg-white/20 h-6 w-6 p-0 rounded-full"
                >
                  <CheckCircle className={`h-4 w-4 ${reminder.completed ? 'fill-current' : ''}`} />
                </Button>
                <span className={`text-sm ${reminder.completed ? 'line-through opacity-60' : ''}`}>
                  {reminder.text}
                </span>
              </div>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                {reminder.daysBeforeTrip}d
              </Badge>
            </motion.div>
          ))}
        </div>
      )}

      {endDate && (
        <div className="mt-4 pt-4 border-t border-white/20 text-center text-sm opacity-90">
          <div className="flex items-center justify-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>
              {Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))} day trip
            </span>
          </div>
        </div>
      )}
    </motion.div>
  );
};
