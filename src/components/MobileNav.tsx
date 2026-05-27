import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Search, Calculator, FileText, TrendingUp } from "lucide-react";
import { useTranslation } from "@/i18n/LanguageProvider";
import { useApp } from "@/state/AppContext";

export function MobileNav() {
  const { t } = useTranslation();
  const { userType } = useApp();
  const pathname = useRouterState({ select: (r) => r.location.pathname });

  const items = [
    { to: "/dashboard", icon: Home, label: t("navDashboard") },
    {
      to: userType === "sme" ? "/business/murabaha" : "/compare/home",
      icon: Search,
      label: t("navCompare"),
    },
    { to: "/zakat", icon: Calculator, label: t("navZakat") },
    { to: "/contract", icon: FileText, label: t("navContract") },
    { to: "/planner", icon: TrendingUp, label: t("navPlanner") },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 grid grid-cols-5 border-t bg-background md:hidden">
      {items.map((it) => {
        const active = pathname === it.to || (it.to !== "/dashboard" && pathname.startsWith(it.to.split("/").slice(0, 3).join("/")));
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
