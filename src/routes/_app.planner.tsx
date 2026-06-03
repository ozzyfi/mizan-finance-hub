import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/i18n/LanguageProvider";
import { DisclaimerBox } from "@/components/DisclaimerBox";
import { AIFloatingButton } from "@/components/AIFloatingButton";
import { formatTL } from "@/state/AppContext";
import { Home, Car, Briefcase, Building2, PiggyBank, Coins } from "lucide-react";

export const Route = createFileRoute("/_app/planner")({
  head: () => ({ meta: [{ title: "Mizan — Financial Plan" }] }),
  component: Planner,
});

const goalDefaults: Record<string, { target: number; icon: typeof Home }> = {
  home: { target: 3000000, icon: Home },
  vehicle: { target: 800000, icon: Car },
  biz: { target: 500000, icon: Briefcase },
  hajj: { target: 250000, icon: Building2 },
  savings: { target: 200000, icon: PiggyBank },
};

function Planner() {
  const { t, lang } = useTranslation();
  const [tab, setTab] = useState("home");
  const [target, setTarget] = useState(goalDefaults.home.target);
  const [current, setCurrent] = useState(0);
  const [monthly, setMonthly] = useState(0);
  const [targetDate, setTargetDate] = useState("");

  const onTab = (v: string) => {
    setTab(v);
    setTarget(goalDefaults[v].target);
    setCurrent(0);
    setMonthly(0);
  };

  const remaining = Math.max(target - current, 0);
  const monthsToGoal = monthly > 0 ? Math.ceil(remaining / monthly) : 0;
  const pct = target > 0 ? Math.min((current / target) * 100, 100) : 0;

  let monthlyNeeded = 0;
  if (targetDate) {
    const months = Math.max(
      Math.round((new Date(targetDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24 * 30)),
      1,
    );
    monthlyNeeded = Math.ceil(remaining / months);
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{t("plannerTitle")}</h1>
      </div>

      <Tabs value={tab} onValueChange={onTab}>
        <TabsList className="grid grid-cols-5 h-auto bg-secondary/50">
          <TabsTrigger value="home" className="text-xs"><Home className="h-3.5 w-3.5 mr-1.5" />{t("goalHome")}</TabsTrigger>
          <TabsTrigger value="vehicle" className="text-xs"><Car className="h-3.5 w-3.5 mr-1.5" />{t("goalVehicle")}</TabsTrigger>
          <TabsTrigger value="biz" className="text-xs"><Briefcase className="h-3.5 w-3.5 mr-1.5" />{t("goalBiz")}</TabsTrigger>
          <TabsTrigger value="hajj" className="text-xs"><Building2 className="h-3.5 w-3.5 mr-1.5" />{t("goalHajj")}</TabsTrigger>
          <TabsTrigger value="savings" className="text-xs"><PiggyBank className="h-3.5 w-3.5 mr-1.5" />{t("goalSavings")}</TabsTrigger>
        </TabsList>

        <TabsContent value={tab} className="mt-5 space-y-5">
          <Card className="p-6 shadow-soft">
            <div className="grid gap-4 md:grid-cols-2">
              <FieldNumber label={t("targetAmount") + " (₺)"} value={target} onChange={setTarget} />
              <FieldNumber label={t("currentSavings") + " (₺)"} value={current} onChange={setCurrent} />
              <FieldNumber label={t("monthlySavings") + " (₺)"} value={monthly} onChange={setMonthly} />
              <div>
                <Label className="text-xs uppercase text-muted-foreground">
                  {t("targetDate")} ({t("optional")})
                </Label>
                <Input type="date" value={targetDate} onChange={(e) => setTargetDate(e.target.value)} className="mt-1" />
              </div>
            </div>
          </Card>

          <Card className="p-6 shadow-soft">
            <div className="flex items-center justify-between">
              <Label className="text-xs uppercase text-muted-foreground">{t("progress")}</Label>
              <span className="text-sm font-semibold">
                {formatTL(current, lang)} / {formatTL(target, lang)} ₺
              </span>
            </div>
            <Progress value={pct} className="mt-2 h-3" />
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {monthly > 0 && (
                <div className="rounded-lg bg-secondary/60 p-3 text-sm">
                  <span className="font-semibold text-primary">{monthsToGoal}</span> {t("reachIn")}
                </div>
              )}
              {targetDate && monthlyNeeded > 0 && (
                <div className="rounded-lg bg-gold/15 p-3 text-sm">
                  {t("monthlyNeeded")}: <span className="font-semibold">{formatTL(monthlyNeeded, lang)} ₺</span>
                </div>
              )}
            </div>

            <div className="mt-5">
              <Label className="text-xs uppercase text-muted-foreground">{t("suggestedVehicle")}</Label>
              <div className="mt-2 flex flex-wrap gap-2">
                <Badge variant="outline" className="border-primary/30 bg-secondary/60 text-foreground">
                  <PiggyBank className="h-3.5 w-3.5 mr-1.5" /> {t("participationSavings")}
                </Badge>
                <Badge variant="outline" className="border-gold/40 bg-gold/15 text-foreground">
                  <Coins className="h-3.5 w-3.5 mr-1.5" /> {t("goldAccum")}
                </Badge>
              </div>
            </div>
          </Card>

          {tab === "hajj" && (
            <Card className="p-5 shadow-soft bg-secondary/40">
              <h3 className="text-sm font-semibold">{lang === "tr" ? "Hac/Umre Referans" : "Hajj/Umrah Reference"}</h3>
              <ul className="mt-2 text-sm text-muted-foreground space-y-1">
                <li>• {lang === "tr" ? "Diyanet Hac tahmini" : "Diyanet Hajj estimate"}: ~250.000 ₺</li>
                <li>• {lang === "tr" ? "Umre tahmini" : "Umrah estimate"}: ~80.000 ₺</li>
              </ul>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      <AIFloatingButton
        lang={lang}
        label={lang === "tr" ? "AI Planım" : "AI Advice"}
        context={
          lang === "tr"
            ? `Kullanıcının finansal planı:
- Hedef türü: ${tab}
- Hedef tutar: ${target.toLocaleString("tr-TR")} ₺
- Mevcut birikim: ${current.toLocaleString("tr-TR")} ₺
- Kalan tutar: ${remaining.toLocaleString("tr-TR")} ₺
- Aylık birikim: ${monthly.toLocaleString("tr-TR")} ₺
- Hedefe tahmini ulaşma süresi: ${monthsToGoal > 0 ? `${monthsToGoal} ay` : "hesaplanamadı"}
${targetDate && monthlyNeeded > 0 ? `- Hedef tarih için gereken aylık birikim: ${monthlyNeeded.toLocaleString("tr-TR")} ₺` : ""}

Faizsiz birikim, bütçe planı ve hedefe ulaşma konusunda kısa ve pratik öneriler ver. Yatırım tavsiyesi verme. Maks 150 kelime.`
            : `User's financial plan:
- Goal type: ${tab}
- Target amount: ${target.toLocaleString()} TL
- Current savings: ${current.toLocaleString()} TL
- Remaining amount: ${remaining.toLocaleString()} TL
- Monthly savings: ${monthly.toLocaleString()} TL
- Estimated time to goal: ${monthsToGoal > 0 ? `${monthsToGoal} months` : "not calculated"}
${targetDate && monthlyNeeded > 0 ? `- Monthly amount needed for target date: ${monthlyNeeded.toLocaleString()} TL` : ""}

Give short and practical guidance on interest-free saving. Do not give investment advice. Max 150 words.`
        }
      />

      <DisclaimerBox />
    </div>
  );
}

function FieldNumber({ label, value, onChange }: { label: string; value: number; onChange: (n: number) => void }) {
  const display = value === 0 ? "" : new Intl.NumberFormat("tr-TR").format(value);
  return (
    <div>
      <Label className="text-xs uppercase text-muted-foreground">{label}</Label>
      <Input
        type="text"
        inputMode="numeric"
        value={display}
        onChange={(e) => {
          const v = e.target.value.replace(/[^\d]/g, "");
          onChange(v === "" ? 0 : Number(v));
        }}
        placeholder="0"
        className="mt-1"
      />
    </div>
  );
}
