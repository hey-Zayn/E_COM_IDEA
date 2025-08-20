// src/app/(app)/scan/page.tsx
'use client';
import { AppHeader } from '@/components/layout/app-header';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  CheckCircle,
  Circle,
  ScanLine,
  Smartphone,
  Zap,
  Camera,
  ArrowRight,
  Loader2,
  Check,
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { useRouter } from 'next/navigation';

type ScanStep = 'front' | 'side' | 'back' | 'processing' | 'complete';

const captureSteps: {
  key: ScanStep;
  title: string;
  instruction: string;
}[] = [
  {
    key: 'front',
    title: 'Front View',
    instruction: 'Stand facing the camera. Make sure your full body is visible. Press "Capture" when ready.',
  },
  {
    key: 'side',
    title: 'Side View',
    instruction: 'Turn 90 degrees to your left or right. Press "Capture" to continue.',
  },
  {
    key: 'back',
    title: 'Back View',
    instruction: 'Now turn so your back is facing the camera. Press "Capture" to finalize.',
  },
];

export default function ScanPage() {
  const [hasCameraPermission, setHasCameraPermission] = useState<
    boolean | undefined
  >(undefined);
  const [isScanning, setIsScanning] = useState(false);
  const [currentStep, setCurrentStep] = useState<ScanStep>('front');
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const getCameraPermission = async () => {
      if (typeof window !== 'undefined' && navigator.mediaDevices) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
          });
          setHasCameraPermission(true);

          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (error) {
          console.error('Error accessing camera:', error);
          setHasCameraPermission(false);
          toast({
            variant: 'destructive',
            title: 'Camera Access Denied',
            description:
              'Please enable camera permissions in your browser settings to use this feature.',
          });
        }
      }
    };

    getCameraPermission();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [toast]);

  const handleStartScan = () => {
    if (hasCameraPermission) {
      setIsScanning(true);
    } else {
      toast({
        variant: 'destructive',
        title: 'Camera Not Available',
        description: 'Please grant camera access to begin the scan.',
      });
    }
  };

  const handleCapture = () => {
    if (currentStep === 'front') {
      setCurrentStep('side');
    } else if (currentStep === 'side') {
      setCurrentStep('back');
    } else if (currentStep === 'back') {
      setCurrentStep('processing');
      // Simulate processing time
      setTimeout(() => {
        setCurrentStep('complete');
        // Simulate redirect after completion
        setTimeout(() => {
          router.push('/profile');
        }, 3000);
      }, 3000);
    }
  };

  const currentStepDetails = captureSteps.find(
    (step) => step.key === currentStep
  );

  const renderContent = () => {
    if (!isScanning) {
      return (
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Create Your 3D Avatar</CardTitle>
            <CardDescription>
              Follow these simple steps to get an accurate body model for
              virtual try-ons.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 text-center">
            <div className="flex justify-center">
              <Smartphone className="h-24 w-24 text-primary" />
            </div>
            <p className="text-muted-foreground max-w-md mx-auto">
              Find a well-lit room and wear form-fitting clothing. Prop your
              phone on a stable surface and stand 6-8 feet away.
            </p>
            <Button size="lg" className="w-full" onClick={handleStartScan}>
              <ScanLine className="mr-2" /> Start Scan
            </Button>
            {hasCameraPermission === false && (
                <Alert variant="destructive" className="text-left">
                    <AlertTitle>Camera Access Required</AlertTitle>
                    <AlertDescription>
                    Please allow camera access in your browser settings to use this feature.
                    </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      );
    }

    if (currentStep === 'processing' || currentStep === 'complete') {
        return (
            <Card className="w-full max-w-2xl text-center">
                <CardHeader>
                    {currentStep === 'processing' ? <Loader2 className="h-16 w-16 animate-spin mx-auto text-primary" /> : <CheckCircle className="h-16 w-16 mx-auto text-green-500" />}
                </CardHeader>
                <CardContent>
                    <CardTitle className="text-2xl">
                        {currentStep === 'processing' ? 'Processing Your Avatar' : 'Scan Complete!'}
                    </CardTitle>
                    <CardDescription className="mt-2">
                        {currentStep === 'processing' ? 'Our AI is creating your 3D model. This might take a moment.' : 'Your new measurements are saved. Redirecting you to your profile...'}
                    </CardDescription>
                </CardContent>
            </Card>
        )
    }

    return (
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle>{currentStepDetails?.title}</CardTitle>
          <CardDescription>{currentStepDetails?.instruction}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative aspect-video w-full bg-secondary rounded-md overflow-hidden border">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              autoPlay
              muted
              playsInline
            />
            {hasCameraPermission === false && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white p-4">
                <Camera className="h-12 w-12 mb-4" />
                <p className="text-lg font-semibold">Camera Access Denied</p>
                <p className="text-sm text-center">
                  Please enable camera permissions to continue.
                </p>
              </div>
            )}
          </div>
          <div className="mt-4 flex justify-between items-center">
             <div className="flex gap-2">
                {captureSteps.map(step => (
                    <div key={step.key} className={`h-2 w-8 rounded-full ${currentStep === step.key || captureSteps.findIndex(s => s.key === currentStep) > captureSteps.findIndex(s => s.key === step.key) ? 'bg-primary' : 'bg-muted'}`}></div>
                ))}
             </div>

            <Button onClick={handleCapture} disabled={hasCameraPermission !== true}>
              Capture <ArrowRight className="ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="flex flex-col w-full">
      <AppHeader title="Guided Body Scan" />
      <main className="flex-1 p-4 md:p-6 flex items-center justify-center">
        {renderContent()}
      </main>
    </div>
  );
}
