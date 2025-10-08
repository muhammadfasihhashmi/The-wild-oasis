import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

import { NavUser } from "./nav-user";
import { DarkmodeToggle } from "./my-ui/DarkmodeToggle";

export function SiteHeader() {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-6 "
        />

        <div className="ml-auto flex items-center gap-4 mr-3">
          <DarkmodeToggle />
          <div className="border-l border-gray-200 h-6"></div>
          <NavUser />
        </div>
      </div>
    </header>
  );
}
