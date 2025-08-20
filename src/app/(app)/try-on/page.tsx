import { AppHeader } from '@/components/layout/app-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Shirt, ShoppingCart, Sparkles } from 'lucide-react';
import Image from 'next/image';

const clothingItems = [
  {
    name: 'Classic White Tee',
    brand: 'Staple Co.',
    price: '$25.00',
    image: 'https://placehold.co/200x250.png',
    aiHint: 'white t-shirt',
  },
  {
    name: 'Vintage Wash Jeans',
    brand: 'Denim Day',
    price: '$89.00',
    image: 'https://placehold.co/200x250.png',
    aiHint: 'blue jeans',
  },
  {
    name: 'Leather Biker Jacket',
    brand: 'Rebel Wear',
    price: '$250.00',
    image: 'https://placehold.co/200x250.png',
    aiHint: 'leather jacket',
  },
  {
    name: 'Checkered Flannel',
    brand: 'Lumberjack Threads',
    price: '$65.00',
    image: 'https://placehold.co/200x250.png',
    aiHint: 'flannel shirt',
  },
  {
    name: 'Suede Chelsea Boots',
    brand: 'Foot-Forward',
    price: '$120.00',
    image: 'https://placehold.co/200x250.png',
    aiHint: 'brown boots',
  },
  {
    name: 'Linen Trousers',
    brand: 'Breezy Styles',
    price: '$75.00',
    image: 'https://placehold.co/200x250.png',
    aiHint: 'beige trousers',
  },
];

export default function TryOnPage() {
  return (
    <div className="flex flex-col w-full h-screen">
      <AppHeader title="Virtual Try-On" />
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-1 overflow-hidden">
        <div className="lg:col-span-2 bg-secondary flex items-center justify-center p-6">
          <div className="relative">
            <Image
              src="https://placehold.co/500x700.png"
              width={500}
              height={700}
              alt="Avatar with clothes"
              className="rounded-lg shadow-2xl object-cover"
              data-ai-hint="person wearing clothes"
            />
            <Badge className="absolute top-4 left-4" variant="destructive">
              <Sparkles className="mr-2 h-4 w-4" />
              Live Preview
            </Badge>
          </div>
        </div>
        <div className="flex flex-col">
          <Card className="rounded-none border-0 border-l">
            <CardHeader>
              <CardTitle>Your Wardrobe</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[calc(100vh-200px)]">
                <div className="p-4 grid grid-cols-2 gap-4">
                  {clothingItems.map((item) => (
                    <Card key={item.name} className="overflow-hidden">
                      <Image
                        src={item.image}
                        width={200}
                        height={250}
                        alt={item.name}
                        className="object-cover w-full h-40"
                        data-ai-hint={item.aiHint}
                      />
                      <div className="p-2">
                        <p className="font-semibold text-sm truncate">
                          {item.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {item.brand}
                        </p>
                        <p className="font-bold text-sm mt-1">{item.price}</p>
                      </div>
                      <CardFooter className="p-2">
                        <Button variant="outline" size="sm" className="w-full">
                          <Shirt className="mr-2 h-4 w-4" /> Try On
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
            <CardFooter className="p-4 border-t">
              <Button size="lg" className="w-full">
                <ShoppingCart className="mr-2" /> Add to Cart
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
}
