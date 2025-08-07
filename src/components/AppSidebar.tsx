
import { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  Package,
  FileText,
  Settings,
  ChevronDown,
  Activity,
  Target,
  CheckCircle,
  Calendar,
  AlertTriangle,
  MapPin
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
  SidebarHeader
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const navigationItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: BarChart3,
  },
  {
    title: "Forecast",
    icon: TrendingUp,
    items: [
      {
        title: "Baseline Forecast",
        url: "/forecast/baseline",
        icon: Activity,
      },
      {
        title: "Bottom-up Forecast",
        url: "/forecast/bottom-up",
        icon: Target,
      },
      {
        title: "Finalization",
        url: "/forecast/finalization",
        icon: CheckCircle,
      },
    ],
  },
  {
    title: "Inventory",
    icon: Package,
    items: [
      {
        title: "Planning",
        url: "/inventory/planning",
        icon: Calendar,
      },
      {
        title: "Alerts & Signals",
        url: "/inventory/alerts",
        icon: AlertTriangle,
      },
    ],
  },
  {
    title: "Crop GIS",
    icon: MapPin,
    items: [
      {
        title: "Map View",
        url: "/crop-gis",
        icon: MapPin,
      },
    ],
  },
  {
    title: "Reports",
    url: "/reports",
    icon: FileText,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export default function AppSidebar() {
  const { open } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const isGroupActive = (items: any[]) => 
    items?.some((item) => isActive(item.url));

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">A</span>
          </div>
          {open && (
            <div className="animate-fade-in">
              <h2 className="font-space-grotesk font-bold text-lg">ARIS</h2>
              <p className="text-xs text-muted-foreground -mt-1">Agricultural Intelligence</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) =>
                item.items ? (
                  <Collapsible key={item.title} defaultOpen={isGroupActive(item.items)}>
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          className={`w-full ${
                            isGroupActive(item.items) 
                              ? "bg-accent text-accent-foreground font-medium" 
                              : "hover:bg-accent/50"
                          }`}
                        >
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                          <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild>
                                <NavLink
                                  to={subItem.url}
                                  className={({ isActive }) =>
                                    isActive
                                      ? "bg-primary text-primary-foreground font-medium rounded-md"
                                      : "hover:bg-accent/50 rounded-md"
                                  }
                                >
                                  <subItem.icon className="h-4 w-4" />
                                  <span>{subItem.title}</span>
                                </NavLink>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ) : (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        className={({ isActive }) =>
                          isActive
                            ? "bg-primary text-primary-foreground font-medium"
                            : "hover:bg-accent/50"
                        }
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
