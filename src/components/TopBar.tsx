import { useNavigate } from "@tanstack/react-router";
import { Sparkles, LogOut, Settings as SettingsIcon, User as UserIcon } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { LanguageToggle } from "@/components/LanguageToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useApp } from "@/state/AppContext";
import { useTranslation } from "@/i18n/LanguageProvider";
import { toast } from "sonner";
import { Logo } from "@/components/Logo";

export function TopBar() {
  const { user, plan, signOut, setPlan } = useApp();
  const { lang } = useTranslation();
  const navigate = useNavigate();
  const tr = lang === "tr";

  const meta = (user?.user_metadata ?? {}) as Record<string, unknown>;
  const fullName = (meta.full_name as string) || user?.email?.split("@")[0] || "";
  const avatarUrl = (meta.avatar_url as string) || (meta.picture as string) || undefined;
  const initials = fullName
    .split(" ")
    .map((s) => s[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase() || "H";

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b bg-background/80 px-4 backdrop-blur">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <span className="hidden md:inline text-sm font-semibold text-muted-foreground">HelalYol</span>
      </div>
      <div className="flex items-center gap-3">
        <LanguageToggle />
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <Avatar className="h-8 w-8">
              {avatarUrl && <AvatarImage src={avatarUrl} alt={fullName} />}
              <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
                {initials}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="flex items-center justify-between gap-2">
              <span className="truncate">{fullName}</span>
              <Badge
                variant="outline"
                className={
                  plan === "pro"
                    ? "border-primary/30 bg-primary/10 text-primary"
                    : "border-border bg-secondary text-muted-foreground"
                }
              >
                {plan === "pro" ? "PRO" : tr ? "ÜCRETSİZ" : "FREE"}
              </Badge>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate({ to: "/settings" })}>
              <UserIcon className="mr-2 h-4 w-4" />
              {tr ? "Profil" : "Profile"}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate({ to: "/settings" })}>
              <SettingsIcon className="mr-2 h-4 w-4" />
              {tr ? "Ayarlar" : "Settings"}
            </DropdownMenuItem>
            {plan !== "pro" && (
              <DropdownMenuItem
                onClick={() => {
                  void setPlan("pro");
                  toast.success(tr ? "Pro etkin (demo)" : "Pro enabled (demo)");
                }}
              >
                <Sparkles className="mr-2 h-4 w-4 text-primary" />
                <span className="font-medium text-primary">
                  {tr ? "Pro'ya Geç" : "Upgrade to Pro"}
                </span>
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={async () => {
                await signOut();
                navigate({ to: "/" });
              }}
            >
              <LogOut className="mr-2 h-4 w-4" />
              {tr ? "Çıkış Yap" : "Sign Out"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
