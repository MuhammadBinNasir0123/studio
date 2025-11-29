'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Bell, Clock } from 'lucide-react';
import { sampleReminders, samplePets } from '@/lib/data';
import type { Reminder } from '@/lib/types';
import { Switch } from '@/components/ui/switch';

export default function RemindersPage() {
  const [reminders, setReminders] = useState<Reminder[]>(sampleReminders);

  const getPetName = (petId: string) => {
    return samplePets.find(p => p.id === petId)?.name || 'Unknown Pet';
  };

  const sortedReminders = [...reminders].sort((a, b) => a.time.localeCompare(b.time));

  return (
    <div className="p-4 sm:p-6">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold font-headline">Reminders</h1>
        <Button size="sm">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Reminder
        </Button>
      </header>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Upcoming Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          {sortedReminders.length > 0 ? (
            <div className="space-y-4">
              {sortedReminders.map(reminder => (
                <div key={reminder.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-4">
                    <Clock className="h-6 w-6 text-primary" />
                    <div>
                      <p className="font-semibold">{reminder.type} for {getPetName(reminder.petId)}</p>
                      <p className="text-sm text-muted-foreground">{reminder.time} - {reminder.frequency}</p>
                      {reminder.notes && <p className="text-xs text-muted-foreground mt-1">{reminder.notes}</p>}
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No reminders set.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
