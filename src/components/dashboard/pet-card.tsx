'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { Pet } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';

interface PetCardProps {
  pet: Pet;
}

export default function PetCard({ pet }: PetCardProps) {
  return (
    <Link href={`/pets/${pet.id}`} className="block group">
      <Card className="hover:border-primary transition-all duration-200 shadow-sm hover:shadow-md">
        <div className="flex items-center p-4">
          <Image
            src={pet.photoUrl}
            alt={pet.name}
            width={80}
            height={80}
            data-ai-hint={pet.photoHint}
            className="rounded-lg object-cover mr-4"
          />
          <div className="flex-1">
            <CardHeader className="p-0">
              <CardTitle className="font-headline text-lg">{pet.name}</CardTitle>
              <CardDescription>{pet.breed}</CardDescription>
            </CardHeader>
            <CardContent className="p-0 mt-2 text-sm text-muted-foreground flex gap-4">
              <span>{pet.age} years</span>
              <span>{pet.weight} kg</span>
            </CardContent>
          </div>
          <ChevronRight className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>
      </Card>
    </Link>
  );
}
