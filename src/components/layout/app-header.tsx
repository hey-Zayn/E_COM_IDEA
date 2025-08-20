'use client';
import { SidebarTrigger } from '@/components/ui/sidebar';

export function AppHeader({ title }: { title: string }) {
  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-card px-4 sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 sm:py-4">
      <SidebarTrigger className="md:hidden" />
      <div className="flex-1">
        <h1 className="font-semibold text-xl text-foreground">{title}</h1>
      </div>
    </header>
  );
}
