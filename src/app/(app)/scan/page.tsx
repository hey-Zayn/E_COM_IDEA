import { AppHeader } from '@/components/layout/app-header';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CheckCircle, Circle, ScanLine, Smartphone, Zap } from 'lucide-react';

const steps = [
  {
    icon: <Smartphone className="h-8 w-8 text-primary" />,
    title: 'Prepare Your Space',
    description:
      'Find a well-lit room with enough space to stand 6-8 feet from your phone. Wear form-fitting clothing.',
    status: 'complete',
  },
  {
    icon: <ScanLine className="h-8 w-8 text-primary" />,
    title: 'Start the Scan',
    description:
      "Prop your phone upright on a stable surface. Follow the on-screen instructions to capture your body from multiple angles.",
    status: 'active',
  },
  {
    icon: <Zap className="h-8 w-8 text-primary" />,
    title: 'Create Your Model',
    description:
      'Our AI will process the images to create your accurate 3D avatar. This may take a few minutes.',
    status: 'pending',
  },
];

export default function ScanPage() {
  return (
    <div className="flex flex-col w-full">
      <AppHeader title="Guided Body Scan" />
      <main className="flex-1 p-4 md:p-6 flex items-center justify-center">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Create Your 3D Avatar</CardTitle>
            <CardDescription>
              Follow these simple steps to get an accurate body model for
              virtual try-ons.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <ul className="space-y-6">
              {steps.map((step, index) => (
                <li key={index} className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-full ${
                        step.status === 'complete'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary'
                      } ${
                        step.status === 'active'
                          ? 'ring-2 ring-primary ring-offset-2'
                          : ''
                      }`}
                    >
                      {step.status === 'complete' ? (
                        <CheckCircle className="h-6 w-6" />
                      ) : (
                        step.icon
                      )}
                    </div>
                    {index < steps.length - 1 && (
                      <div className="h-8 w-px bg-border my-2"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </li>
              ))}
            </ul>
            <Button size="lg" className="w-full">
              <ScanLine className="mr-2" /> Start Scan
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
