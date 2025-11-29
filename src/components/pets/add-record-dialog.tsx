'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

export type RecordType = 'Activity' | 'Health Record';

interface AddRecordDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onRecordAdd: (data: any) => void;
  recordType: RecordType;
  recordOptions: string[];
  showVetName?: boolean;
}

export default function AddRecordDialog({
  isOpen,
  setIsOpen,
  onRecordAdd,
  recordType,
  recordOptions,
  showVetName = false,
}: AddRecordDialogProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const schema = z.object({
    type: z.string().min(1, 'Please select a type'),
    date: z.date({ required_error: 'A date is required.' }),
    notes: z.string().optional(),
    vetName: z.string().optional(),
  });

  type FormValues = z.infer<typeof schema>;

  const { control, register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      date: new Date(),
    }
  });

  const onSubmit = (data: FormValues) => {
    setIsSubmitting(true);
    setTimeout(() => {
      onRecordAdd(data);
      toast({
        title: `${recordType} Added!`,
        description: `Your new ${recordType.toLowerCase()} has been logged.`,
      });
      setIsSubmitting(false);
      setIsOpen(false);
      reset({ date: new Date(), type: '', notes: '', vetName: '' });
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New {recordType}</DialogTitle>
          <DialogDescription>
            Log a new {recordType.toLowerCase()} for your pet.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder={`Select a ${recordType.toLowerCase()} type`} />
                    </SelectTrigger>
                    <SelectContent>
                      {recordOptions.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.type && <p className="text-destructive text-sm">{errors.type.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Controller
                name="date"
                control={control}
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn("w-full justify-start text-left font-normal", !field.value && "text-muted-foreground")}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                    </PopoverContent>
                  </Popover>
                )}
              />
              {errors.date && <p className="text-destructive text-sm">{errors.date.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes / Details</Label>
              <Textarea id="notes" {...register('notes')} placeholder="Any extra details..." />
            </div>
            {showVetName && (
              <div className="space-y-2">
                <Label htmlFor="vetName">Vet Name (Optional)</Label>
                <Input id="vetName" {...register('vetName')} placeholder="Dr. Smith" />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Record
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
