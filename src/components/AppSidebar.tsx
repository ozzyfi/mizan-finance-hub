import { Link, useRouterState } from "@tanstack/react-router";
import {
  Home,
  Car,
  Building2,
  FileText,
  Calculator,
  TrendingUp,
  Settings as SettingsIcon,
  LayoutDashboard,
  Sparkles,
} from "lucide-react";
import { useTranslation } from "@/i18n/LanguageProvider";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  const { t } = useTranslation();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  const isActive = (p: string) =>
    pathname === p || (p !== "/dashboard" && pathname.startsWith(p));

  const primary = [
    { to: "/dashboard", icon: LayoutDashboard, label: t("navDashboard") },
    { to: "/compare/home", icon: Home, label: t("navHome") },
    { to: "/compare/vehicle", icon: Car, label: t("navVehicle") },
    { to: "/business", icon: Building2, label: t("navSme") },
    { to: "/contract", icon: FileText, label: t("navContract") },
  ];

  const secondary = [
    { to: "/zakat", icon: Calculator, label: t("navZakat") },
    { to: "/planner", icon: TrendingUp, label: t("navPlanner") },
    { to: "/settings", icon: SettingsIcon, label: t("navSettings") },
  ];

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <Link to="/dashboard" className="flex items-center gap-2 px-2 py-1.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-semibold">
            H
          </div>
          {!collapsed && (
            <div className="flex flex-col leading-tight">
              <span className="font-semibold text-sidebar-foreground">HelalYol</span>
              <span className="text-[10px] tracking-wider text-muted-foreground truncate">
                Kredi değil, faizsiz yol.
              </span>
            </div>
          )}
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {primary.map((it) => (
                <SidebarMenuItem key={it.to}>
                  <SidebarMenuButton asChild isActive={isActive(it.to)}>
                    <Link to={it.to}>
                      <it.icon className="h-4 w-4" />
                      <span>{it.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          {!collapsed && <SidebarGroupLabel>{t("navMore")}</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu>
              {secondary.map((it) => (
                <SidebarMenuItem key={it.to}>
                  <SidebarMenuButton asChild isActive={isActive(it.to)}>
                    <Link to={it.to}>
                      <it.icon className="h-4 w-4" />
                      <span>{it.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
