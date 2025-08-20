'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  suggestOutfits,
  type SuggestOutfitsOutput,
} from '@/ai/flows/suggest-outfits';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Loader2, Sparkles, Shirt } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  measurements: z
    .string()
    .min(10, 'Please provide detailed measurements for best results.'),
  preferences: z
    .string()
    .min(10, 'Describe your style, favorite colors, brands, etc.'),
  wardrobe: z
    .string()
    .min(
      10,
      'List some key items from your wardrobe (e.g., blue jeans, white sneakers).'
    ),
});

export function StyleToolForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SuggestOutfitsOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      measurements: '',
      preferences: '',
      wardrobe: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const output = await suggestOutfits(values);
      setResult(output);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description:
          'Failed to generate outfit suggestions. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="measurements"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Measurements</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., Height: 5'11\", Waist: 34in, Chest: 42in..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="preferences"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Style Preferences</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., I like minimalist styles, neutral colors like black, gray, and beige. I prefer brands like..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="wardrobe"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Current Wardrobe</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., I have a black leather jacket, several pairs of dark wash jeans, white sneakers, a few button-down shirts..."
                    className="min-h-[120px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Describe the key pieces in your closet.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isLoading} size="lg" className="w-full">
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="mr-2 h-4 w-4" />
            )}
            Generate Outfits
          </Button>
        </form>
      </Form>

      {isLoading && (
        <div className="mt-8 text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
          <p className="mt-2 text-muted-foreground">
            Our AI is styling your outfits...
          </p>
        </div>
      )}

      {result && result.outfits && (
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-center mb-8">
            Your Suggested Outfits
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {result.outfits.map((outfit, index) => (
              <Card key={index} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shirt />
                    Outfit #{index + 1}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground">{outfit}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
