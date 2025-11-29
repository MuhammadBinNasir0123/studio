'use client';

import { useForm } from 'react-hook-form';
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
import { useToast } from '@/hooks/use-toast';
import type { Pet } from '@/lib/types';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

interface AddPetDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onPetAdd: (newPet: Omit<Pet, 'id' | 'photoUrl' | 'photoHint'>) => void;
}

const petSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  breed: z.string().min(2, 'Breed must be at least 2 characters'),
  age: z.coerce.number().int().min(0, 'Age cannot be negative'),
  weight: z.coerce.number().min(0, 'Weight cannot be negative'),
});

type PetFormValues = z.infer<typeof petSchema>;

export default function AddPetDialog({ isOpen, setIsOpen, onPetAdd }: AddPetDialogProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<PetFormValues>({
    resolver: zodResolver(petSchema),
  });

  const onSubmit = (data: PetFormValues) => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      onPetAdd(data);
      toast({
        title: "Pet Added!",
        description: `${data.name} is now part of your family.`,
      });
      setIsSubmitting(false);
      setIsOpen(false);
      reset();
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a New Pet</DialogTitle>
          <DialogDescription>
            Fill in the details for your new furry friend.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input id="name" {...register('name')} className="col-span-3" />
              {errors.name && <p className="col-span-4 text-right text-destructive text-sm">{errors.name.message}</p>}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="breed" className="text-right">Breed</Label>
              <Input id="breed" {...register('breed')} className="col-span-3" />
              {errors.breed && <p className="col-span-4 text-right text-destructive text-sm">{errors.breed.message}</p>}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="age" className="text-right">Age (yrs)</Label>
              <Input id="age" type="number" {...register('age')} className="col-span-3" />
              {errors.age && <p className="col-span-4 text-right text-destructive text-sm">{errors.age.message}</p>}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="weight" className="text-right">Weight (kg)</Label>
              <Input id="weight" type="number" step="0.1" {...register('weight')} className="col-span-3" />
              {errors.weight && <p className="col-span-4 text-right text-destructive text-sm">{errors.weight.message}</p>}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Pet
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
