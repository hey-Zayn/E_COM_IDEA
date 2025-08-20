import { AppHeader } from '@/components/layout/app-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Ruler } from 'lucide-react';
import Image from 'next/image';

const orders = [
  {
    id: 'ORD001',
    date: '2023-10-26',
    status: 'Delivered',
    total: '$129.99',
    item: {
      name: 'Classic Denim Jacket',
      image: 'https://placehold.co/64x64.png',
      aiHint: 'denim jacket',
    },
  },
  {
    id: 'ORD002',
    date: '2023-10-24',
    status: 'Delivered',
    total: '$89.50',
    item: {
      name: 'Slim Fit Chinos',
      image: 'https://placehold.co/64x64.png',
      aiHint: 'khaki pants',
    },
  },
  {
    id: 'ORD003',
    date: '2023-10-20',
    status: 'Delivered',
    total: '$250.00',
    item: {
      name: 'Wool Peacoat',
      image: 'https://placehold.co/64x64.png',
      aiHint: 'dark coat',
    },
  },
  {
    id: 'ORD004',
    date: '2023-09-15',
    status: 'Delivered',
    total: '$45.00',
    item: {
      name: 'Graphic T-Shirt',
      image: 'https://placehold.co/64x64.png',
      aiHint: 'white tshirt',
    },
  },
];

export default function OrdersPage() {
  return (
    <div className="flex flex-col w-full">
      <AppHeader title="My Orders" />
      <main className="flex-1 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle>Order History</CardTitle>
            <CardDescription>
              Check the status of recent orders and view your purchase history.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order</TableHead>
                  <TableHead>Item</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-4">
                        <Image
                          src={order.item.image}
                          width={64}
                          height={64}
                          alt={order.item.name}
                          className="rounded-md"
                          data-ai-hint={order.item.aiHint}
                        />
                        <span>{order.item.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">{order.status}</Badge>
                    </TableCell>
                    <TableCell>{order.total}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        <Ruler className="mr-2 h-4 w-4" />
                        View Fit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
