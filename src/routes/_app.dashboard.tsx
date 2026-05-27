import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Search,
  Calculator,
  FileText,
  TrendingUp,
  GraduationCap,
  Building2,
  CircleDollarSign,
} from "lucide-react";
import { useTranslation } from "@/i18n/LanguageProvider";
import { useApp } from "@/state/AppContext";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DisclaimerBox } from "@/components/DisclaimerBox";

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({
    meta: [
      { title: "Mizan — Dashboard" },
      { name: "description", content: "Mizan personalized dashboard." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { t } = useTranslation();
  const { userType } = useApp();

  const actions = [
    {
      to: userType === "sme" ? "/app/business/murabaha" : "/app/compare/home",
      icon: Search,
      label: t("qaCompare"),
    },
    { to: "/app/zakat", icon: Calculator, label: t("qaZakat") },
    { to: "/app/contract", icon: FileText, label: t("qaContract") },
    { to: "/app/planner", icon: TrendingUp, label: t("qaPlan") },
  ] as const;

  const articles = [
    { title: t("art1Title"), tag: t("art1Tag"), icon: GraduationCap },
    { title: t("art2Title"), tag: t("art2Tag"), icon: Building2 },
    { title: t("art3Title"), tag: t("art3Tag"), icon: CircleDollarSign },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      {/* Welcome banner */}
      <section className="rounded-2xl border bg-gradient-to-br from-secondary/80 to-background p-6 md:p-8 shadow-soft">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">{t("welcomeBanner")}</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{t("disclaimerShort")}</p>
      </section>

      {/* Quick actions */}
      <section>
        <h2 className="mb-3 text-sm font-medium text-muted-foreground uppercase tracking-wide">
          {t("quickActions")}
        </h2>
        <div className="-mx-2 flex gap-3 overflow-x-auto px-2 pb-2 md:grid md:grid-cols-4 md:gap-4 md:overflow-visible md:px-0">
          {actions.map((a) => (
            <Link
              key={a.to}
              to={a.to}
              className="group min-w-[200px] flex-1 rounded-xl border bg-card p-4 shadow-soft transition-base hover:shadow-soft-hover hover:-translate-y-0.5 hover:border-primary/40"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-primary">
                <a.icon className="h-5 w-5" />
              </div>
              <div className="mt-3 text-sm font-semibold">{a.label}</div>
              <div className="mt-2 inline-flex items-center gap-1 text-xs text-primary opacity-0 transition-base group-hover:opacity-100">
                <ArrowRight className="h-3 w-3" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent activity */}
      <section>
        <h2 className="mb-3 text-sm font-medium text-muted-foreground uppercase tracking-wide">
          {t("recentActivity")}
        </h2>
        <Card className="border-dashed bg-muted/20 p-10 text-center shadow-none">
          <p className="text-sm text-muted-foreground">{t("noComparisons")}</p>
        </Card>
      </section>

      {/* Featured */}
      <section>
        <h2 className="mb-3 text-sm font-medium text-muted-foreground uppercase tracking-wide">
          {t("featured")}
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {articles.map((a) => (
            <Card key={a.title} className="overflow-hidden p-5 shadow-soft hover:shadow-soft-hover transition-base">
              <div className="flex h-24 items-center justify-center rounded-lg bg-gradient-to-br from-secondary to-secondary/40">
                <a.icon className="h-10 w-10 text-primary/70" />
              </div>
              <Badge className="mt-4 bg-gold/15 text-foreground border border-gold/40" variant="outline">
                {a.tag}
              </Badge>
              <h3 className="mt-2 text-base font-semibold leading-snug">{a.title}</h3>
            </Card>
          ))}
        </div>
      </section>

      <DisclaimerBox />
    </div>
  );
}
