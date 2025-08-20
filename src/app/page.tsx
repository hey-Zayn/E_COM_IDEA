import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import Image from 'next/image';
import { Bot, Palette, Ruler, Shirt, Star } from 'lucide-react';

const Header = () => (
  <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div className="container flex h-14 items-center">
      <Link href="#" className="mr-6 flex items-center space-x-2">
        <Shirt className="h-6 w-6 text-primary" />
        <span className="font-bold">VirtuFit</span>
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        <Link href="#features">Features</Link>
        <Link href="#testimonials">Testimonials</Link>
      </nav>
      <div className="flex flex-1 items-center justify-end space-x-4">
        <Button variant="ghost" asChild>
          <Link href="/dashboard">Log In</Link>
        </Button>
        <Button asChild>
          <Link href="/dashboard">Get Started</Link>
        </Button>
      </div>
    </div>
  </header>
);

const HeroSection = () => (
  <section className="py-20 sm:py-32">
    <div className="container grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
      <div className="space-y-6">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          The Future of Fitting is Here.
        </h1>
        <p className="text-lg text-muted-foreground">
          VirtuFit offers a revolutionary way to shop for clothes online. Get
          perfectly fitting garments every time with our advanced body scanning
          and virtual try-on technology.
        </p>
        <div className="flex gap-4">
          <Button size="lg" asChild>
            <Link href="/dashboard">Scan Your Body</Link>
          </Button>
          <Button size="lg" variant="outline">
            Learn More
          </Button>
        </div>
      </div>
      <div>
        <Image
          src="https://placehold.co/600x600.png"
          alt="Virtual Try-On"
          width={600}
          height={600}
          className="rounded-xl shadow-2xl"
          data-ai-hint="fashion technology"
        />
      </div>
    </div>
  </section>
);

const features = [
  {
    icon: <Ruler className="h-8 w-8 text-primary" />,
    title: 'Precision Body Scanning',
    description: 'Our guided scan creates a precise 3D model of your body in minutes.',
  },
  {
    icon: <Shirt className="h-8 w-8 text-primary" />,
    title: 'Virtual Try-On',
    description: 'Visualize how clothes will look and fit on your personal avatar before you buy.',
  },
  {
    icon: <Bot className="h-8 w-8 text-primary" />,
    title: 'AI Style Tool',
    description: 'Get personalized outfit suggestions from our AI stylist based on your style.',
  },
  {
    icon: <Palette className="h-8 w-8 text-primary" />,
    title: 'Style Profile',
    description: 'Maintain your measurements, style preferences, and fit feedback all in one place.',
  },
];

const FeaturesSection = () => (
  <section id="features" className="py-20 sm:py-32 bg-secondary">
    <div className="container">
      <div className="text-center space-y-4 mb-16">
        <h2 className="text-3xl font-bold">Why Choose VirtuFit?</h2>
        <p className="text-muted-foreground md:w-1/2 mx-auto">
          We combine cutting-edge technology with a passion for fashion to solve the biggest problem in online shopping: finding the right fit.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <Card key={feature.title} className="text-center">
            <CardHeader>
              <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                {feature.icon}
              </div>
              <CardTitle className="pt-4">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

const testimonials = [
    {
      name: 'Jessica L.',
      title: 'Fashion Blogger',
      image: 'https://placehold.co/100x100.png',
      quote: 'VirtuFit has changed the way I shop online. I can finally buy with confidence knowing everything will fit perfectly. The AI stylist is a game-changer!',
      aiHint: 'portrait person'
    },
    {
      name: 'Mike R.',
      title: 'Software Developer',
      image: 'https://placehold.co/100x100.png',
      quote: "I hate shopping for clothes because nothing ever fits right. VirtuFit's body scan was quick and easy, and now I can see what fits before I order. Genius!",
      aiHint: 'professional man'
    },
    {
      name: 'Samantha G.',
      title: 'Busy Mom',
      image: 'https://placehold.co/100x100.png',
      quote: "I don't have time for returns. VirtuFit saves me so much time and hassle. I've recommended it to all my friends.",
      aiHint: 'smiling woman'
    },
  ];

const TestimonialsSection = () => (
    <section id="testimonials" className="py-20 sm:py-32">
        <div className="container">
            <div className="text-center space-y-4 mb-16">
                <h2 className="text-3xl font-bold">Loved by users worldwide</h2>
                <p className="text-muted-foreground md:w-1/2 mx-auto">
                    Don't just take our word for it. Here's what our users are saying about their VirtuFit experience.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map((testimonial) => (
                    <Card key={testimonial.name} className="flex flex-col">
                        <CardContent className="pt-6 flex-grow">
                            <div className="flex mb-4">
                                {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />)}
                            </div>
                            <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
                        </CardContent>
                        <CardFooter className="mt-4">
                            <Avatar>
                                <AvatarImage src={testimonial.image} alt={testimonial.name} data-ai-hint={testimonial.aiHint} />
                                <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="ml-4">
                                <p className="font-semibold">{testimonial.name}</p>
                                <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    </section>
);


const Footer = () => (
  <footer className="border-t py-8 bg-secondary">
    <div className="container flex flex-col md:flex-row justify-between items-center">
      <div className="flex items-center space-x-2 mb-4 md:mb-0">
        <Shirt className="h-6 w-6 text-primary" />
        <span className="font-bold">VirtuFit</span>
      </div>
      <p className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} VirtuFit. All rights reserved.
      </p>
    </div>
  </footer>
);

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
}
