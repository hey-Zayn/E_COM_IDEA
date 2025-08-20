import { AppHeader } from '@/components/layout/app-header';
import { StyleToolForm } from '@/components/style-tool-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Wand2 } from 'lucide-react';

export default function StyleToolPage() {
  return (
    <div className="flex flex-col w-full">
      <AppHeader title="AI Style Tool" />
      <main className="flex-1 p-4 md:p-6">
        <Card className="max-w-4xl mx-auto">
          <CardHeader className="text-center">
            <Wand2 className="mx-auto h-12 w-12 text-primary" />
            <CardTitle className="text-2xl mt-4">
              Your Personal AI Stylist
            </CardTitle>
            <CardDescription>
              Tell us about yourself and your wardrobe, and our AI will suggest
              complete outfits for you.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <StyleToolForm />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
