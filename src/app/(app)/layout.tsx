import type { ReactNode } from 'react';
import { AppSidebar } from '@/components/layout/app-sidebar';
import {
  SidebarProvider,
  SidebarInset,
  SidebarRail,
} from '@/components/ui/sidebar';

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AppSidebar />
        <SidebarRail />
        <SidebarInset className="flex-1">{children}</SidebarInset>
      </div>
    </SidebarProvider>
  );
}
