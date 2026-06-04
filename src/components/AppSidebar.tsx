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
import { useApp } from "@/state/AppContext";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/Logo";
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
  const { plan } = useApp();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  const isActive = (p: string) =>
    pathname === p || (p !== "/dashboard" && pathname.startsWith(p));

  const showProBadge = plan !== "pro";

  const primary: Array<{
    to: string;
    icon: typeof Home;
    label: string;
    pro?: boolean;
  }> = [
    { to: "/dashboard", icon: LayoutDashboard, label: t("navDashboard") },
    { to: "/compare/home", icon: Home, label: t("navHome") },
    { to: "/compare/vehicle", icon: Car, label: t("navVehicle") },
    { to: "/business", icon: Building2, label: t("navSme"), pro: true },
    { to: "/contract", icon: FileText, label: t("navContract"), pro: true },
    { to: "/advisor", icon: Sparkles, label: t("navAdvisor"), pro: true },
  ];

  const secondary: Array<{
    to: string;
    icon: typeof Home;
    label: string;
    pro?: boolean;
  }> = [
    { to: "/zakat", icon: Calculator, label: t("navZakat") },
    { to: "/planner", icon: TrendingUp, label: t("navPlanner"), pro: true },
    { to: "/settings", icon: SettingsIcon, label: t("navSettings") },
  ];

  const renderItem = (it: { to: string; icon: typeof Home; label: string; pro?: boolean }) => (
    <SidebarMenuItem key={it.to}>
      <SidebarMenuButton asChild isActive={isActive(it.to)}>
        <Link to={it.to}>
          <it.icon className="h-4 w-4" />
          <span className="flex-1">{it.label}</span>
          {it.pro && showProBadge && !collapsed && (
            <Badge
              variant="outline"
              className="ml-auto h-4 border-primary/30 bg-primary/10 px-1.5 text-[9px] font-semibold text-primary"
            >
              PRO
            </Badge>
          )}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <Link to="/dashboard" className="flex items-center gap-2 px-2 py-1.5">
          {collapsed ? (
            <Logo variant="icon" className="h-6 w-6" />
          ) : (
            <Logo variant="horizontal" className="h-6 max-w-[140px]" />
          )}
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>{primary.map(renderItem)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          {!collapsed && <SidebarGroupLabel>{t("navMore")}</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu>{secondary.map(renderItem)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
