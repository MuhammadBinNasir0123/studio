'use server';
/**
 * @fileOverview A pet recommendation AI agent.
 *
 * - petRecommendationFlow - A function that handles the pet recommendation process.
 * - PetRecommendationFlowInput - The input type for the petRecommendationFlow function.
 * - PetRecommendationFlowOutput - The return type for the petRecommendationFlow function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const PetSchema = z.object({
  name: z.string().describe('The name of the pet.'),
  breed: z.string().describe('The breed of the pet.'),
  age: z.number().describe('The age of the pet in years.'),
  weight: z.number().describe('The weight of the pet in kilograms.'),
});

const PetRecommendationFlowInputSchema = z.object({
  pet: PetSchema,
  symptoms: z.string().optional().describe('Any symptoms the pet is experiencing. This is optional.'),
});
export type PetRecommendationFlowInput = z.infer<typeof PetRecommendationFlowInputSchema>;

const PetRecommendationFlowOutputSchema = z.object({
  recommendation: z.string().describe('The generated recommendation for the pet.'),
});
export type PetRecommendationFlowOutput = z.infer<typeof PetRecommendationFlowOutputSchema>;

const recommendationPrompt = ai.definePrompt({
  name: 'petRecommendationPrompt',
  input: { schema: PetRecommendationFlowInputSchema },
  output: { schema: PetRecommendationFlowOutputSchema },
  prompt: `
    You are an AI assistant for a pet care app called MyPetcare app. Your goal is to provide helpful, safe, and informative recommendations for pet owners.

    Pet Details:
    - Name: {{pet.name}}
    - Breed: {{pet.breed}}
    - Age: {{pet.age}} years
    - Weight: {{pet.weight}} kg

    {{#if symptoms}}
    The user has reported the following symptoms:
    "{{symptoms}}"

    Based on these symptoms, provide a simple, clear, and cautious informational suggestion.
    - Analyze the symptoms and suggest potential general causes (e.g., "Coughing could be a sign of kennel cough or other respiratory issues.").
    - Strongly recommend consulting a veterinarian for a proper diagnosis and treatment.
    - DO NOT provide a diagnosis.
    - Provide 2-3 general care tips that might help alleviate discomfort, such as ensuring the pet has fresh water and a comfortable resting place.
    - Keep the language easy to understand.
    - Start the recommendation with "Based on the symptoms you've described...".
    {{else}}
    The user has not reported any symptoms.
    
    Based on the pet's breed, age, and weight, provide a concise recommendation covering:
    1.  **Diet:** Suggest a type of food (e.g., "high-quality kibble for active adult dogs") and a general daily portion size. Mention that the owner should check the food packaging for exact amounts.
    2.  **Exercise:** Recommend a suitable amount of daily exercise (e.g., "at least 60 minutes of activity, including walks and playtime").
    
    Keep the recommendation positive and encouraging. Start with a friendly opening like "Here are a couple of suggestions for {{pet.name}}!".
    {{/if}}

    IMPORTANT: Always include a disclaimer at the end: "This is an AI suggestion and not a substitute for professional veterinary advice."
  `,
});

const flow = ai.defineFlow(
  {
    name: 'petRecommendationFlow',
    inputSchema: PetRecommendationFlowInputSchema,
    outputSchema: PetRecommendationFlowOutputSchema,
  },
  async (input) => {
    const { output } = await recommendationPrompt(input);
    return output!;
  }
);

export async function petRecommendationFlow(input: PetRecommendationFlowInput): Promise<PetRecommendationFlowOutput> {
  return flow(input);
}
