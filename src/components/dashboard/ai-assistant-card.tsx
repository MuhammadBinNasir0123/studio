'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wand2, BrainCircuit, Loader2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import type { Pet } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { petRecommendationFlow, type PetRecommendationFlowInput } from '@/ai/flows/pet-recommendation-flow';

interface AiAssistantCardProps {
  pets: Pet[];
}

export default function AiAssistantCard({ pets }: AiAssistantCardProps) {
  const [selectedPetId, setSelectedPetId] = useState<string>('');
  const [symptoms, setSymptoms] = useState('');
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGetRecommendation = async () => {
    if (!selectedPetId) {
      toast({
        variant: 'destructive',
        title: 'No Pet Selected',
        description: 'Please select a pet to get recommendations.',
      });
      return;
    }

    const selectedPet = pets.find(p => p.id === selectedPetId);
    if (!selectedPet) return;

    setIsLoading(true);
    setRecommendation(null);

    try {
      const input: PetRecommendationFlowInput = {
        pet: {
          name: selectedPet.name,
          breed: selectedPet.breed,
          age: selectedPet.age,
          weight: selectedPet.weight,
        },
        symptoms: symptoms || undefined,
      };
      const result = await petRecommendationFlow(input);
      setRecommendation(result.recommendation);
    } catch (error) {
      console.error('AI recommendation error:', error);
      toast({
        variant: 'destructive',
        title: 'AI Assistant Error',
        description: 'Could not get a recommendation. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-lg border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <Wand2 className="text-primary" />
          AI Assistant
        </CardTitle>
        <CardDescription>
          Get AI-powered recommendations for your pet's diet, exercise, or check symptoms.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Select value={selectedPetId} onValueChange={setSelectedPetId} disabled={isLoading}>
          <SelectTrigger>
            <SelectValue placeholder="Select a pet..." />
          </SelectTrigger>
          <SelectContent>
            {pets.map(pet => (
              <SelectItem key={pet.id} value={pet.id}>
                {pet.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Textarea
          placeholder="Optional: Describe any symptoms your pet is having (e.g., 'coughing and sneezing')..."
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          className="resize-none"
          rows={3}
          disabled={isLoading}
        />

        <Button onClick={handleGetRecommendation} className="w-full" disabled={isLoading || !selectedPetId}>
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <BrainCircuit className="mr-2 h-4 w-4" />
          )}
          Get AI Recommendation
        </Button>

        {recommendation && (
          <div className="p-4 bg-muted/50 rounded-lg text-sm">
            <p className="font-semibold mb-2">💡 Recommendation:</p>
            <p className="text-muted-foreground whitespace-pre-wrap">{recommendation}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
