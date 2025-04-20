"use client";

import {
  BarChart3,
  Calendar,
  ChefHat,
  ClipboardList,
  Home,
  LineChart,
  Package,
  Settings,
  Users,
  Menu,
  Moon,
  Sun,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

export function RestaurantSidebar() {
  const pathname = usePathname();
  const { toggleSidebar, state } = useSidebar();
  const { theme, setTheme } = useTheme();

  const menuItems = [
    {
      title: "Dashboard Overview",
      icon: Home,
      href: "/",
    },
    {
      title: "Sales Forecasts",
      icon: LineChart,
      href: "/sales-forecasts",
    },
    {
      title: "Category Insights",
      icon: BarChart3,
      href: "/category-insights",
    },
    {
      title: "Item Rankings",
      icon: ClipboardList,
      href: "/item-rankings",
    },
    {
      title: "Inventory Planner",
      icon: Package,
      href: "/inventory-planner",
    },
    {
      title: "Staff Scheduler",
      icon: Calendar,
      href: "/staff-scheduler",
    },
    {
      title: "Settings",
      icon: Settings,
      href: "/settings",
    },
  ];

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader
        className={`flex ${
          state === "collapsed" ? "items-start" : "items-center"
        } flex-row justify-between px-4 py-2`}
      >
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={toggleSidebar}
        >
          <ChefHat className="h-4 w-4" />
          <span
            className={`text-lg font-semibold ${
              state === "collapsed" ? "hidden" : ""
            }`}
          >
            SauceBros
          </span>
        </div>
        {state === "expanded" && (
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10"
            onClick={toggleSidebar}
          >
            <Menu className="h-10 w-10" />
          </Button>
        )}
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={item.title}
                  >
                    <Link href={item.href} className="flex items-center gap-2">
                      <item.icon className="h-10 w-10 flex-shrink-0" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      {state === "expanded" && (
        <SidebarFooter className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-10 w-10" />
              <span className="text-sm">Staff: 12 Active</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? (
                <Sun className="h-10 w-10" />
              ) : (
                <Moon className="h-10 w-10" />
              )}
            </Button>
          </div>
        </SidebarFooter>
      )}
    </Sidebar>
  );
}
