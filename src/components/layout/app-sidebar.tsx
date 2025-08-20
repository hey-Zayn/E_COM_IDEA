'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  ScanLine,
  Shirt,
  Wand2,
  User,
  Package,
  Settings,
  LogOut,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/scan', label: 'Body Scan', icon: ScanLine },
  { href: '/try-on', label: 'Virtual Try-On', icon: Shirt },
  { href: '/style-tool', label: 'AI Style Tool', icon: Wand2 },
  { href: '/profile', label: 'Profile', icon: User },
  { href: '/orders', label: 'Orders', icon: Package },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="bg-primary/10 text-primary hover:bg-primary/20"
          >
            <Shirt />
          </Button>
          <span className="font-semibold text-lg text-sidebar-foreground">
            VirtuFit
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent className="flex-grow">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href}>
                <SidebarMenuButton
                  isActive={pathname.startsWith(item.href)}
                  tooltip={item.label}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Settings">
              <Settings />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <div className="w-full p-2 group-data-[collapsible=icon]:p-0">
              <div className="flex items-center gap-2 p-2 rounded-md bg-sidebar-accent group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:bg-transparent">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="portrait person" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex flex-col group-data-[collapsible=icon]:hidden">
                  <span className="text-sm font-semibold text-sidebar-accent-foreground">
                    John Doe
                  </span>
                  <span className="text-xs text-muted-foreground">
                    john.doe@example.com
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-auto group-data-[collapsible=icon]:hidden"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
