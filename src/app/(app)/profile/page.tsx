import { AppHeader } from '@/components/layout/app-header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FilePen } from 'lucide-react';

const measurements = [
  { name: 'Height', value: "5' 11\"" },
  { name: 'Weight', value: '175 lbs' },
  { name: 'Chest', value: '42 in' },
  { name: 'Waist', value: '34 in' },
  { name: 'Inseam', value: '32 in' },
  { name: 'Sleeve', value: '35 in' },
];

const scanHistory = [
  { date: '2023-10-15', accuracy: '99.8%', model: 'v3.2' },
  { date: '2023-06-02', accuracy: '99.5%', model: 'v3.1' },
  { date: '2022-12-20', accuracy: '98.9%', model: 'v2.8' },
];

export default function ProfilePage() {
  return (
    <div className="flex flex-col w-full">
      <AppHeader title="My Profile" />
      <main className="flex-1 p-4 md:p-6 space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="portrait person" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">John Doe</CardTitle>
              <CardDescription>john.doe@example.com</CardDescription>
            </div>
            <Button variant="outline" className="ml-auto">
              <FilePen className="mr-2 h-4 w-4" /> Edit Profile
            </Button>
          </CardHeader>
        </Card>

        <Tabs defaultValue="measurements">
          <TabsList>
            <TabsTrigger value="measurements">Measurements</TabsTrigger>
            <TabsTrigger value="preferences">Style Preferences</TabsTrigger>
            <TabsTrigger value="scan-history">Scan History</TabsTrigger>
            <TabsTrigger value="fit-feedback">Fit Feedback</TabsTrigger>
          </TabsList>
          <TabsContent value="measurements">
            <Card>
              <CardHeader>
                <CardTitle>Body Measurements</CardTitle>
                <CardDescription>
                  Your most recent measurements. For best results, perform a new
                  scan every 6 months.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {measurements.map((m) => (
                    <div
                      key={m.name}
                      className="bg-secondary p-4 rounded-lg"
                    >
                      <p className="text-sm text-muted-foreground">{m.name}</p>
                      <p className="text-xl font-semibold">{m.value}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle>Style Preferences</CardTitle>
                <CardDescription>
                  Your saved style preferences used by our AI stylist.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Content for Style Preferences coming soon.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="scan-history">
            <Card>
              <CardHeader>
                <CardTitle>Scan History</CardTitle>
                <CardDescription>
                  A log of all your previous body scans.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Accuracy</TableHead>
                      <TableHead>Model Version</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {scanHistory.map((scan) => (
                      <TableRow key={scan.date}>
                        <TableCell>{scan.date}</TableCell>
                        <TableCell>{scan.accuracy}</TableCell>
                        <TableCell>{scan.model}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="fit-feedback">
            <Card>
              <CardHeader>
                <CardTitle>Fit Feedback</CardTitle>
                <CardDescription>
                  Your feedback on how purchased items fit.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Content for Fit Feedback coming soon.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
