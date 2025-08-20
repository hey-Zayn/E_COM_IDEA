// src/ai/flows/suggest-outfits.ts
'use server';
/**
 * @fileOverview An AI style tool that suggests outfits based on user measurements, preferences, and wardrobe.
 *
 * - suggestOutfits - A function that suggests outfits.
 * - SuggestOutfitsInput - The input type for the suggestOutfits function.
 * - SuggestOutfitsOutput - The return type for the suggestOutfits function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestOutfitsInputSchema = z.object({
  measurements: z
    .string()
    .describe('The users body measurements (e.g., height, waist, chest).'),
  preferences: z
    .string()
    .describe('The users style preferences (e.g., colors, brands, styles).'),
  wardrobe: z
    .string()
    .describe('A description of the users current wardrobe.'),
});
export type SuggestOutfitsInput = z.infer<typeof SuggestOutfitsInputSchema>;

const SuggestOutfitsOutputSchema = z.object({
  outfits: z
    .array(z.string())
    .describe('A list of suggested outfits based on the input.'),
});
export type SuggestOutfitsOutput = z.infer<typeof SuggestOutfitsOutputSchema>;

export async function suggestOutfits(input: SuggestOutfitsInput): Promise<SuggestOutfitsOutput> {
  return suggestOutfitsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestOutfitsPrompt',
  input: {schema: SuggestOutfitsInputSchema},
  output: {schema: SuggestOutfitsOutputSchema},
  prompt: `You are a personal stylist that suggests outfits based on the user's measurements, preferences, and existing wardrobe.

Measurements: {{{measurements}}}
Preferences: {{{preferences}}}
Wardrobe: {{{wardrobe}}}

Suggest 3 complete outfits that the user can wear. Be creative and specific.`,
});

const suggestOutfitsFlow = ai.defineFlow(
  {
    name: 'suggestOutfitsFlow',
    inputSchema: SuggestOutfitsInputSchema,
    outputSchema: SuggestOutfitsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
