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
  ScanLine,
  Smartphone,
  Camera,
  ArrowRight,
  Loader2,
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
    title: 'Front View Scan',
    instruction: 'Face the camera and align your body with the silhouette. Hold still.',
  },
  {
    key: 'side',
    title: 'Side View Scan',
    instruction: 'Turn 90 degrees to your left. Align with the silhouette and hold still.',
  },
  {
    key: 'back',
    title: 'Back View Scan',
    instruction: 'Face away from the camera. Align your back with the silhouette.',
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
    // Here you would capture the image data
    // For now, we just move to the next step
    if (currentStep === 'front') {
      setCurrentStep('side');
    } else if (currentStep === 'side') {
      setCurrentStep('back');
    } else if (currentStep === 'back') {
      setCurrentStep('processing');
      // Simulate processing and saving new measurements
      setTimeout(() => {
        const newMeasurements = [
            { name: 'Height', value: "6' 0\"" },
            { name: 'Weight', value: '180 lbs' },
            { name: 'Chest', value: '43 in' },
            { name: 'Waist', value: '35 in' },
            { name: 'Inseam', value: '33 in' },
            { name: 'Sleeve', value: '36 in' },
        ];
        localStorage.setItem('userMeasurements', JSON.stringify(newMeasurements));
        localStorage.setItem('lastScanDate', new Date().toLocaleDateString());

        setCurrentStep('complete');
        
        setTimeout(() => {
          router.push('/profile');
        }, 2000);
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
            <CardTitle className="text-2xl">Biometric Body Scan</CardTitle>
            <CardDescription>
              Our advanced AI will create a precise 3D model of your body for perfect-fitting clothes.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 text-center">
            <div className="flex justify-center">
              <Smartphone className="h-24 w-24 text-primary" />
            </div>
            <ul className="text-muted-foreground max-w-md mx-auto list-disc list-inside text-left">
                <li>Find a well-lit, private space.</li>
                <li>Wear minimal, form-fitting clothing.</li>
                <li>Prop your phone on a stable surface.</li>
                <li>Stand 6-8 feet away from the camera.</li>
            </ul>
            <Button size="lg" className="w-full" onClick={handleStartScan}>
              <ScanLine className="mr-2" /> Start Biometric Scan
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
                        {currentStep === 'processing' ? 'Analyzing Biometric Data' : 'Scan Complete!'}
                    </CardTitle>
                    <CardDescription className="mt-2">
                        {currentStep === 'processing' ? 'Our AI is building your 3D model. This may take a moment.' : 'Your new measurements have been saved. Redirecting to your profile...'}
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
          <div className="relative aspect-[9/16] sm:aspect-video w-full max-w-md mx-auto bg-secondary rounded-md overflow-hidden border">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              autoPlay
              muted
              playsInline
            />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <svg viewBox="0 0 200 400" className="w-full h-full opacity-50 text-white" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 40C116.569 40 130 53.4315 130 70C130 86.5685 116.569 100 100 100C83.4315 100 70 86.5685 70 70C70 53.4315 83.4315 40 100 40Z" stroke="currentColor" stroke-width="2"/>
                    <path d="M100 110V120" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    <path d="M60 140H140" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    <path d="M100 120C100 120 70 130 70 180V320H130V180C130 130 100 120 100 120Z" stroke="currentColor" stroke-width="2"/>
                    <path d="M70 250H130" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    <path d="M70 320V360H80" stroke="currentColor" stroke-width="2"/>
                    <path d="M130 320V360H120" stroke="currentColor" stroke-width="2"/>
                </svg>
            </div>
            {hasCameraPermission === false && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 text-white p-4">
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

            <Button onClick={handleCapture} disabled={hasCameraPermission !== true} size="lg">
              Capture
              <ArrowRight className="ml-2" />
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
