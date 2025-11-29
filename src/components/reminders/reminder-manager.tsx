'use client';

import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { sampleReminders } from '@/lib/data';
import { add, sub, parse, format, isFuture, isToday } from 'date-fns';

export function ReminderManager() {
  const { toast } = useToast();

  useEffect(() => {
    // Check for Notification API support
    if (!('Notification' in window)) {
      console.warn('This browser does not support desktop notification');
      return;
    }

    // Request permission
    if (Notification.permission !== 'granted') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          toast({
            title: 'Notifications Enabled!',
            description: 'You will now receive reminders for your pets.',
          });
        }
      });
    }

    // --- Scheduling Logic ---
    const scheduledNotifications = new Set<string>();

    const scheduleNotification = (id: string, title: string, body: string, showAt: Date) => {
      const notificationId = `${id}-${format(showAt, 'yyyy-MM-dd-HH-mm')}`;
      if (scheduledNotifications.has(notificationId) || !isFuture(showAt)) {
        return;
      }
      
      const delay = showAt.getTime() - Date.now();
      if (delay <= 0) return;

      setTimeout(() => {
        if (Notification.permission === 'granted') {
          new Notification(title, { body });
        }
        scheduledNotifications.delete(notificationId);
      }, delay);
      
      scheduledNotifications.add(notificationId);
    };

    const setupReminders = () => {
      const now = new Date();
      
      sampleReminders.forEach(reminder => {
        const [hour, minute] = reminder.time.split(':');
        const reminderTimeToday = parse(`${hour}:${minute}`, 'HH:mm', new Date());

        // Standard notification (1 hour before)
        const notificationTime = sub(reminderTimeToday, { hours: 1 });
        if (isToday(notificationTime) && isFuture(notificationTime)) {
          scheduleNotification(
            `${reminder.id}-standard`,
            `Upcoming: ${reminder.type}`,
            `Reminder for ${reminder.type} at ${reminder.time}. ${reminder.notes || ''}`,
            notificationTime
          );
        }

        // Important notification (1 day before)
        if (reminder.isImportant) {
          const dayBeforeReminderTime = sub(reminderTimeToday, { days: 1 });
          const tomorrowReminderTime = add(reminderTimeToday, { days: 1 });
          
           // Check if it should be sent today for tomorrow's reminder
           if (isFuture(dayBeforeReminderTime) && isToday(dayBeforeReminderTime)) {
             scheduleNotification(
               `${reminder.id}-important`,
               `Important Reminder for Tomorrow`,
               `Tomorrow at ${reminder.time}: ${reminder.type}. ${reminder.notes || ''}`,
               dayBeforeReminderTime
             );
           }
           // For daily important reminders, schedule for tomorrow as well
           if (reminder.frequency === 'Daily' && isFuture(tomorrowReminderTime)) {
             const dayBeforeTmrw = add(dayBeforeReminderTime, {days: 1})
              scheduleNotification(
               `${reminder.id}-important-tomorrow`,
               `Important Reminder for Tomorrow`,
               `Tomorrow at ${reminder.time}: ${reminder.type}. ${reminder.notes || ''}`,
               dayBeforeTmrw
             );
           }
        }
      });
    };

    if (Notification.permission === 'granted') {
      setupReminders();
    }

    // This is a simple implementation. For a real app, you'd want to
    // re-run this logic periodically or when reminders change.
  }, [toast]);

  return null; // This is a manager component, it doesn't render anything
}
