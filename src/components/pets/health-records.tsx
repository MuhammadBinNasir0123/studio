'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, MoreVertical, Syringe, Stethoscope, Pill } from 'lucide-react';
import type { HealthRecord, HealthRecordType } from '@/lib/types';
import AddRecordDialog from './add-record-dialog';
import { format } from 'date-fns';

interface HealthRecordsProps {
  petId: string;
  initialRecords: HealthRecord[];
  setRecords: React.Dispatch<React.SetStateAction<HealthRecord[]>>;
}

const recordIcons: Record<HealthRecordType, React.ReactNode> = {
  'Vaccination': <Syringe className="h-5 w-5 text-red-500" />,
  'Vet Visit': <Stethoscope className="h-5 w-5 text-blue-500" />,
  'Medication': <Pill className="h-5 w-5 text-green-500" />,
};

export function HealthRecords({ petId, initialRecords, setRecords }: HealthRecordsProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddRecord = (data: { type: string; date: Date; notes?: string; vetName?: string }) => {
    const newRecord: HealthRecord = {
      id: `hr-${Date.now()}`,
      petId,
      type: data.type as HealthRecordType,
      date: data.date.toISOString(),
      details: data.notes || '',
      vetName: data.vetName,
    };
    setRecords(prev => [newRecord, ...prev].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
  };
  
  const sortedRecords = [...initialRecords].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold font-headline">Health History</h3>
          <Button onClick={() => setIsDialogOpen(true)} size="sm">
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Record
          </Button>
        </div>
        <div className="space-y-4">
          {sortedRecords.length > 0 ? sortedRecords.map(record => (
            <div key={record.id} className="flex items-start space-x-4 p-3 rounded-lg bg-muted/50">
              <div className="mt-1">{recordIcons[record.type]}</div>
              <div className="flex-1">
                <p className="font-semibold">{record.type}</p>
                <p className="text-sm text-muted-foreground">{record.details}</p>
                {record.vetName && <p className="text-xs text-muted-foreground mt-1">Vet: {record.vetName}</p>}
                <p className="text-xs text-muted-foreground mt-1">{format(new Date(record.date), "PPP")}</p>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          )) : <p className="text-center text-sm text-muted-foreground py-4">No health records found.</p>}
        </div>
        <AddRecordDialog
          isOpen={isDialogOpen}
          setIsOpen={setIsDialogOpen}
          onRecordAdd={handleAddRecord}
          recordType="Health Record"
          recordOptions={['Vaccination', 'Vet Visit', 'Medication']}
          showVetName
        />
      </CardContent>
    </Card>
  );
}
