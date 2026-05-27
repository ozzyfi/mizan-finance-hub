import { createFileRoute } from "@tanstack/react-router";
import { Home, Car, Building2 } from "lucide-react";
import { useTranslation } from "@/i18n/LanguageProvider";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DisclaimerBox } from "@/components/DisclaimerBox";
import { PrimaryActionCards } from "@/components/PrimaryActionCards";

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({
    meta: [{ title: "HelalYol — Ana Sayfa" }],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { t } = useTranslation();

  const roadmaps = [
    { icon: Home, label: t("demoRoadmap1") },
    { icon: Car, label: t("demoRoadmap2") },
    { icon: Building2, label: t("demoRoadmap3") },
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-10">
      <section className="rounded-2xl border bg-gradient-to-br from-secondary/70 to-background p-6 md:p-8 shadow-soft">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
          {t("dashSummary")}
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          {t("brandShortDesc")}
        </p>
      </section>

      <section>
        <PrimaryActionCards />
      </section>

      <section>
        <h2 className="mb-3 text-sm font-medium text-muted-foreground uppercase tracking-wide">
          {t("recentRoadmaps")}
        </h2>
        <div className="grid gap-3">
          {roadmaps.map((r) => (
            <Card key={r.label} className="flex items-center gap-3 p-4 shadow-soft">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                <r.icon className="h-4 w-4" />
              </div>
              <div className="text-sm flex-1">{r.label}</div>
              <Badge variant="outline" className="bg-gold/15 text-foreground border-gold/40 text-[10px]">
                Demo
              </Badge>
            </Card>
          ))}
        </div>
      </section>

      <DisclaimerBox variant="long" />
    </div>
  );
}
