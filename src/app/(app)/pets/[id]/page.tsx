'use client';

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { samplePets, sampleActivities, sampleHealthRecords } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Edit } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ActivityLog } from '@/components/pets/activity-log';
import { HealthRecords } from '@/components/pets/health-records';
import { StatsView } from '@/components/pets/stats-view';
import { useState } from 'react';
import type { Activity, HealthRecord } from '@/lib/types';


export default function PetDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const pet = samplePets.find(p => p.id === id);
  const [activities, setActivities] = useState<Activity[]>(sampleActivities.filter(a => a.petId === id));
  const [healthRecords, setHealthRecords] = useState<HealthRecord[]>(sampleHealthRecords.filter(hr => hr.petId === id));


  if (!pet) {
    return (
      <div className="p-6 text-center">
        <p className="mb-4">Pet not found.</p>
        <Button onClick={() => router.push('/dashboard')}>
          <ChevronLeft className="mr-2 h-4 w-4" /> Go to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div>
      <header className="p-4 flex items-center gap-4 sticky top-0 bg-background/80 backdrop-blur-sm z-10 border-b">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-xl font-bold font-headline">{pet.name}</h1>
        <Button variant="ghost" size="icon" className="ml-auto">
          <Edit className="h-5 w-5" />
          <span className="sr-only">Edit Pet</span>
        </Button>
      </header>

      <div className="p-4 sm:p-6">
        <Card className="overflow-hidden shadow-lg mb-6">
          <div className="relative h-48 w-full">
            <Image src={pet.photoUrl} alt={pet.name} layout="fill" objectFit="cover" data-ai-hint={pet.photoHint} />
          </div>
          <CardContent className="p-4">
            <div className="flex justify-around text-center">
              <div>
                <p className="text-sm text-muted-foreground">Age</p>
                <p className="font-bold text-lg">{pet.age} yrs</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Weight</p>
                <p className="font-bold text-lg">{pet.weight} kg</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Breed</p>
                <p className="font-bold text-lg">{pet.breed}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="activity" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="health">Health</TabsTrigger>
            <TabsTrigger value="stats">Stats</TabsTrigger>
          </TabsList>
          <TabsContent value="activity">
            <ActivityLog petId={pet.id} initialActivities={activities} setActivities={setActivities} />
          </TabsContent>
          <TabsContent value="health">
            <HealthRecords petId={pet.id} initialRecords={healthRecords} setRecords={setHealthRecords} />
          </TabsContent>
          <TabsContent value="stats">
            <StatsView activities={activities} healthRecords={healthRecords} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
