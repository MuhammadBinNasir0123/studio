'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { samplePets } from '@/lib/data';
import type { Pet } from '@/lib/types';
import PetCard from '@/components/dashboard/pet-card';
import AddPetDialog from '@/components/dashboard/add-pet-dialog';

export default function DashboardPage() {
  const { user } = useAuth();
  const [pets, setPets] = useState<Pet[]>(samplePets);
  const [isAddPetDialogOpen, setIsAddPetDialogOpen] = useState(false);

  const handleAddPet = (newPet: Omit<Pet, 'id'>) => {
    const petWithId: Pet = {
      ...newPet,
      id: `pet-${Date.now()}`,
      photoUrl: `https://picsum.photos/seed/${newPet.name}/400/400`,
      photoHint: 'animal',
    };
    setPets(prevPets => [petWithId, ...prevPets]);
  };

  return (
    <div className="p-4 sm:p-6">
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          {user?.photoURL && (
            <Image
              src={user.photoURL}
              alt={user.displayName || 'User'}
              width={40}
              height={40}
              className="rounded-full"
            />
          )}
          <div>
            <p className="text-sm text-muted-foreground">Welcome back,</p>
            <h1 className="text-xl font-bold font-headline">{user?.displayName}</h1>
          </div>
        </div>
        <Button size="icon" variant="ghost" onClick={() => setIsAddPetDialogOpen(true)}>
          <PlusCircle className="h-6 w-6 text-primary" />
          <span className="sr-only">Add Pet</span>
        </Button>
      </header>

      <section>
        <h2 className="text-lg font-semibold font-headline mb-4">Your Pets</h2>
        {pets.length > 0 ? (
          <div className="grid gap-4">
            {pets.map(pet => (
              <PetCard key={pet.id} pet={pet} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border-2 border-dashed rounded-lg">
            <p className="text-muted-foreground mb-4">You haven't added any pets yet.</p>
            <Button onClick={() => setIsAddPetDialogOpen(true)}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Your First Pet
            </Button>
          </div>
        )}
      </section>

      <AddPetDialog
        isOpen={isAddPetDialogOpen}
        setIsOpen={setIsAddPetDialogOpen}
        onPetAdd={handleAddPet}
      />
    </div>
  );
}
