import * as React from "react";
import { NavMain } from "@/components/nav-main";
// import { NavUser } from "@/components/nav-user";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Building2,
  CalendarDays,
  Home,
  Settings,
  Upload,
  User2Icon,
} from "lucide-react";
import { Link } from "react-router-dom";

const data = {
  navMain: [
    {
      title: "Home",
      url: "/",
      icon: Home,
    },
    {
      title: "Bookings",
      url: "/bookings",
      icon: CalendarDays,
    },
    {
      title: "Cabins",
      url: "/cabins",
      icon: Building2,
    },
    {
      title: "Users",
      url: "/users",
      icon: User2Icon,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
    {
      title: "Uploader",
      url: "/uploader",
      icon: Upload,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props} className="dark:bg-zinc-900">
      <SidebarHeader className="dark:bg-zinc-900">
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="ml-5">
              <Link to={"/"}>
                <img
                  src="img/logo-light.png"
                  alt="logo"
                  className="h-22 block dark:hidden transition-all duration-300"
                />

                <img
                  src="img/logo-dark.png"
                  alt="logo"
                  className="h-22 hidden dark:block transition-all duration-300"
                />
              </Link>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="dark:bg-zinc-900">
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter className="dark:bg-zinc-900">
        <div className="border-t border-border ml-5 py-3 text-xs text-muted-foreground flex items-center justify-between gap-2">
          <div className="flex flex-col gap-2 ">
            <p className="font-medium text-foreground">Wild Oasis App</p>
            <p className="leading-tight">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
