// src/app/(app)/dashboard/page.tsx
'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Bot, Shirt, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { AppHeader } from '@/components/layout/app-header';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [lastScan, setLastScan] = useState('2 weeks ago');

  useEffect(() => {
    const lastScanDate = localStorage.getItem('lastScanDate');
    if (lastScanDate) {
      // Basic date diff simulation
      const scanDate = new Date(lastScanDate);
      const today = new Date();
      if (scanDate.toDateString() === today.toDateString()) {
        setLastScan('Today');
      }
    }
  }, []);

  return (
    <div className="flex flex-col w-full">
      <AppHeader title="Dashboard" />
      <main className="flex-1 p-4 md:p-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 shadow-lg">
            <CardHeader>
              <CardTitle>Your Virtual Avatar</CardTitle>
              <CardDescription>
                Here's your personal 3D model. Use it to try on clothes
                virtually.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center items-center p-0">
              <Image
                src="https://placehold.co/600x600.png"
                width={500}
                height={500}
                alt="3D Avatar"
                className="rounded-b-lg object-cover"
                data-ai-hint="fashion avatar"
              />
            </CardContent>
          </Card>
          <div className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Welcome back!</CardTitle>
                <CardDescription>
                  Here's a quick summary of your profile.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Last Scan:</span>
                  <span className="font-medium">{lastScan}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Saved Outfits:</span>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Fit Score:</span>
                  <span className="font-medium text-green-600">98%</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/profile">
                    <User className="mr-2" />
                    View Profile
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="bg-primary text-primary-foreground shadow-lg">
              <CardHeader>
                <CardTitle>Virtual Try-On</CardTitle>
                <CardDescription className="text-primary-foreground/80">
                  Explore new arrivals and see how they fit on you instantly.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  variant="secondary"
                  className="w-full text-primary"
                  asChild
                >
                  <Link href="/try-on">
                    <Shirt className="mr-2" />
                    Start Trying On
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="space-y-1">
              <CardTitle>Need some style inspiration?</CardTitle>
              <CardDescription>
                Let our AI stylist create outfits for you based on your
                wardrobe and preferences.
              </CardDescription>
            </div>
            <Button asChild>
              <Link href="/style-tool">
                <Bot className="mr-2" />
                Try The AI Style Tool
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </CardHeader>
        </Card>
      </main>
    </div>
  );
}
