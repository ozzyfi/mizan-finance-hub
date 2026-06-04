import { type ReactNode } from "react";
import { Lock, Sparkles, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useApp } from "@/state/AppContext";
import { useTranslation } from "@/i18n/LanguageProvider";
import { toast } from "sonner";

type Props = {
  featureName: string;
  featureDescription?: string;
  children: ReactNode;
};

export function PaywallGate({ featureName, featureDescription, children }: Props) {
  const { plan, setPlan } = useApp();
  const { lang } = useTranslation();

  if (plan === "pro") return <>{children}</>;

  const t = lang === "tr"
    ? {
        badge: "PRO",
        title: `${featureName} — HelalYol Pro özelliği`,
        desc:
          featureDescription ??
          "Bu özellik HelalYol Pro abonelerine açıktır.",
        upgrade: "HelalYol Pro'ya Geç",
        price: "₺149/ay",
        note: "Faizsiz hizmet, abonelik istediğiniz zaman iptal edilebilir.",
        includes: "Pro abonelik ile:",
        items: [
          "AI Danışman — sınırsız soru",
          "Sözleşme / teklif analizi",
          "Finansal planlama aracı",
          "KOBİ finansman araçları (ijara, murabaha, fatura, tedarikçi)",
        ],
        comingSoon: "Ödeme sistemi yakında aktif olacak. Demo için aktif edildi.",
        demoUnlock: "Demo: Pro'yu aç",
      }
    : {
        badge: "PRO",
        title: `${featureName} — HelalYol Pro feature`,
        desc:
          featureDescription ??
          "This feature is available to HelalYol Pro subscribers.",
        upgrade: "Upgrade to HelalYol Pro",
        price: "₺149/month",
        note: "Interest-free service, cancel anytime.",
        includes: "With Pro you get:",
        items: [
          "AI Advisor — unlimited questions",
          "Contract / offer analysis",
          "Financial planner",
          "SME finance tools (ijara, murabaha, invoice, supplier)",
        ],
        comingSoon: "Payments coming soon. Enabled for demo.",
        demoUnlock: "Demo: enable Pro",
      };

  return (
    <div className="mx-auto max-w-2xl">
      <Card className="overflow-hidden p-0 shadow-soft">
        <div className="flex items-center gap-3 bg-gradient-to-r from-primary to-primary/80 px-6 py-5 text-primary-foreground">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
            <Lock className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <Badge className="mb-1 border-white/30 bg-white/15 text-primary-foreground hover:bg-white/20">
              {t.badge}
            </Badge>
            <h2 className="text-lg font-semibold leading-tight">{t.title}</h2>
          </div>
        </div>
        <div className="space-y-5 p-6">
          <p className="text-sm text-muted-foreground">{t.desc}</p>

          <div className="rounded-xl border bg-secondary/40 p-4">
            <div className="mb-2 flex items-center gap-2 text-sm font-medium">
              <Sparkles className="h-4 w-4 text-primary" />
              {t.includes}
            </div>
            <ul className="space-y-1.5">
              {t.items.map((it) => (
                <li key={it} className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-2xl font-semibold text-foreground">{t.price}</div>
              <div className="text-xs text-muted-foreground">{t.note}</div>
            </div>
            <Button
              size="lg"
              onClick={() => toast.info(t.comingSoon)}
              className="w-full sm:w-auto"
            >
              {t.upgrade}
            </Button>
          </div>

          <button
            type="button"
            onClick={() => {
              void setPlan("pro");
              toast.success(lang === "tr" ? "Pro etkin (demo)" : "Pro enabled (demo)");
            }}
            className="text-xs text-muted-foreground underline-offset-2 hover:underline"
          >
            {t.demoUnlock}
          </button>
        </div>
      </Card>
    </div>
  );
}
