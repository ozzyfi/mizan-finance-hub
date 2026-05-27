import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Home, Car, Building2, FileText } from "lucide-react";
import { useTranslation } from "@/i18n/LanguageProvider";

export function MobileNav() {
  const { t } = useTranslation();
  const pathname = useRouterState({ select: (r) => r.location.pathname });

  const items = [
    { to: "/dashboard", icon: LayoutDashboard, label: t("navDashboard") },
    { to: "/compare/home", icon: Home, label: t("navHome") },
    { to: "/compare/vehicle", icon: Car, label: t("navVehicle") },
    { to: "/business", icon: Building2, label: t("navSme") },
    { to: "/contract", icon: FileText, label: t("navContract") },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 grid grid-cols-5 border-t bg-background md:hidden">
      {items.map((it) => {
        const active = pathname === it.to || (it.to !== "/dashboard" && pathname.startsWith(it.to));
        return (
          <Link
            key={it.to}
            to={it.to}
            className={`flex flex-col items-center justify-center gap-0.5 py-2 text-[10px] font-medium transition-base ${
              active ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <it.icon className="h-5 w-5" />
            <span className="truncate px-1">{it.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
