import { Link, useRouterState } from "@tanstack/react-router";
import {
  Home,
  Search,
  Calculator,
  FileText,
  TrendingUp,
  Settings as SettingsIcon,
  Car,
  User,
  CreditCard,
  Building2,
  Briefcase,
  Receipt,
  Package,
} from "lucide-react";
import { useTranslation } from "@/i18n/LanguageProvider";
import { useApp } from "@/state/AppContext";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  const { t } = useTranslation();
  const { userType } = useApp();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  const isActive = (p: string) => pathname === p;

  const compareItems =
    userType === "sme"
      ? [
          { to: "/app/business/murabaha", label: t("navMurabaha"), icon: Briefcase },
          { to: "/app/business/ijara", label: t("navIjara"), icon: Package },
          { to: "/app/business/supplier", label: t("navSupplier"), icon: Building2 },
          { to: "/app/business/invoice", label: t("navInvoice"), icon: Receipt },
        ]
      : [
          { to: "/app/compare/home", label: t("navHome"), icon: Home },
          { to: "/app/compare/vehicle", label: t("navVehicle"), icon: Car },
          { to: "/app/compare/personal", label: t("navPersonal"), icon: User },
          { to: "/app/compare/card", label: t("navCard"), icon: CreditCard },
        ];

  const groupLabel = userType === "sme" ? t("navBusiness") : t("navCompare");

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <Link to="/app/dashboard" className="flex items-center gap-2 px-2 py-1.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-semibold">
            M
          </div>
          {!collapsed && (
            <div className="flex flex-col leading-tight">
              <span className="font-semibold text-sidebar-foreground">Mizan</span>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                {userType === "sme" ? "SME" : "Individual"}
              </span>
            </div>
          )}
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/app/dashboard")}>
                  <Link to="/app/dashboard">
                    <Home className="h-4 w-4" />
                    <span>{t("navDashboard")}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Search className="h-4 w-4" />
                  <span>{groupLabel}</span>
                </SidebarMenuButton>
                {!collapsed && (
                  <SidebarMenuSub>
                    {compareItems.map((it) => (
                      <SidebarMenuSubItem key={it.to}>
                        <SidebarMenuSubButton asChild isActive={isActive(it.to)}>
                          <Link to={it.to}>
                            <it.icon className="h-3.5 w-3.5" />
                            <span>{it.label}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                )}
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/app/zakat")}>
                  <Link to="/app/zakat">
                    <Calculator className="h-4 w-4" />
                    <span>{t("navZakat")}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/app/contract")}>
                  <Link to="/app/contract">
                    <FileText className="h-4 w-4" />
                    <span>{t("navContract")}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/app/planner")}>
                  <Link to="/app/planner">
                    <TrendingUp className="h-4 w-4" />
                    <span>{t("navPlanner")}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/app/settings")}>
                  <Link to="/app/settings">
                    <SettingsIcon className="h-4 w-4" />
                    <span>{t("navSettings")}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
