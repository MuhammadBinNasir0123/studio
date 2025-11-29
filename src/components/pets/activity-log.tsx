'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, MoreVertical, Bone, Footprints, ShowerHead } from 'lucide-react';
import type { Activity, ActivityType } from '@/lib/types';
import AddRecordDialog, { RecordType } from './add-record-dialog';
import { format } from 'date-fns';

interface ActivityLogProps {
  petId: string;
  initialActivities: Activity[];
  setActivities: React.Dispatch<React.SetStateAction<Activity[]>>;
}

const activityIcons: Record<ActivityType, React.ReactNode> = {
  Meal: <Bone className="h-5 w-5 text-yellow-600" />,
  Walk: <Footprints className="h-5 w-5 text-green-600" />,
  Grooming: <ShowerHead className="h-5 w-5 text-blue-600" />,
  Training: <Bone className="h-5 w-5 text-purple-600" />,
};

export function ActivityLog({ petId, initialActivities, setActivities }: ActivityLogProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddActivity = (data: { type: string; date: Date; notes?: string }) => {
    const newActivity: Activity = {
      id: `act-${Date.now()}`,
      petId,
      type: data.type as ActivityType,
      date: data.date.toISOString(),
      notes: data.notes,
    };
    setActivities(prev => [newActivity, ...prev].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
  };

  const sortedActivities = [...initialActivities].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold font-headline">Recent Activities</h3>
          <Button onClick={() => setIsDialogOpen(true)} size="sm">
            <PlusCircle className="h-4 w-4 mr-2" />
            Log Activity
          </Button>
        </div>
        <div className="space-y-4">
          {sortedActivities.length > 0 ? sortedActivities.map(activity => (
            <div key={activity.id} className="flex items-start space-x-4 p-3 rounded-lg bg-muted/50">
              <div className="mt-1">{activityIcons[activity.type]}</div>
              <div className="flex-1">
                <p className="font-semibold">{activity.type}</p>
                <p className="text-sm text-muted-foreground">{activity.notes}</p>
                <p className="text-xs text-muted-foreground mt-1">{format(new Date(activity.date), "PPP p")}</p>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          )) : <p className="text-center text-sm text-muted-foreground py-4">No activities logged yet.</p>}
        </div>
        <AddRecordDialog
          isOpen={isDialogOpen}
          setIsOpen={setIsDialogOpen}
          onRecordAdd={handleAddActivity}
          recordType="Activity"
          recordOptions={['Meal', 'Walk', 'Grooming', 'Training']}
        />
      </CardContent>
    </Card>
  );
}
