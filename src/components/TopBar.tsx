import { SidebarTrigger } from "@/components/ui/sidebar";
import { LanguageToggle } from "@/components/LanguageToggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function TopBar() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b bg-background/80 px-4 backdrop-blur">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="md:hidden" />
        <SidebarTrigger className="hidden md:inline-flex" />
      </div>
      <div className="flex items-center gap-3">
        <LanguageToggle />
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">M</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
