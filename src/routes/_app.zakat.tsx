import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslation } from "@/i18n/LanguageProvider";
import { DisclaimerBox } from "@/components/DisclaimerBox";
import { formatTL } from "@/state/AppContext";
import { ExternalLink } from "lucide-react";

export const Route = createFileRoute("/_app/zakat")({
  head: () => ({ meta: [{ title: "Mizan — Zakat Calculator" }] }),
  component: Zakat,
});

type Fields = Record<string, number>;
const initial: Fields = {
  cash: 0,
  participation: 0,
  fx: 0,
  gold: 0,
  silver: 0,
  jewelry: 0,
  stocks: 0,
  funds: 0,
  crypto: 0,
  inventory: 0,
  receivables: 0,
  debts: 0,
  due: 0,
};

const orgs = [
  { name: "İHH İnsani Yardım Vakfı", focus: { tr: "Türkiye odaklı", en: "Turkey focused" }, url: "https://www.ihh.org.tr" },
  { name: "National Zakat Foundation", focus: { tr: "İngiltere odaklı", en: "UK focused" }, url: "https://nzf.org.uk" },
  { name: "Islamic Relief", focus: { tr: "Global", en: "Global" }, url: "https://islamic-relief.org" },
];

function Zakat() {
  const { t, lang } = useTranslation();
  const [nisabType, setNisabType] = useState<"gold" | "silver">("silver");
  const [goldNisabTL, setGoldNisabTL] = useState(310000);
  const [silverNisabTL, setSilverNisabTL] = useState(22000);
  const [goldPriceGram, setGoldPriceGram] = useState(3650);
  const [silverPriceGram, setSilverPriceGram] = useState(37);
  const [f, setF] = useState<Fields>(initial);

  const [familyMembers, setFamily] = useState(4);
  const [fitrePer, setFitrePer] = useState(100);
  const [qurbaniType, setQurbaniType] = useState("smallSheep");
  const [qurbaniCost] = useState({ largeShare: 12000, largeFull: 84000, smallSheep: 9000 });

  const totals = useMemo(() => {
    const cashSec = f.cash + f.participation + f.fx;
    const goldSec = f.gold * goldPriceGram + f.silver * silverPriceGram + f.jewelry;
    const investSec = f.stocks + f.funds + f.crypto;
    const bizSec = f.inventory + f.receivables;
    const assets = cashSec + goldSec + investSec + bizSec;
    const debts = f.debts + f.due;
    const zakatable = Math.max(assets - debts, 0);
    const due = zakatable * 0.025;
    const nisab = nisabType === "gold" ? goldNisabTL : silverNisabTL;
    return { assets, debts, zakatable, due, nisab, above: zakatable >= nisab };
  }, [f, goldPriceGram, silverPriceGram, nisabType, goldNisabTL, silverNisabTL]);

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{t("zakatTitle")}</h1>
      </div>

      {/* Nisab */}
      <Card className="p-6 shadow-soft">
        <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
          {t("nisabTitle")}
        </h2>
        <RadioGroup
          value={nisabType}
          onValueChange={(v) => setNisabType(v as "gold" | "silver")}
          className="mt-3 grid gap-2 md:grid-cols-2"
        >
          {[
            { v: "gold" as const, l: t("goldNisab"), val: goldNisabTL, set: setGoldNisabTL },
            { v: "silver" as const, l: t("silverNisab"), val: silverNisabTL, set: setSilverNisabTL },
          ].map((o) => (
            <label
              key={o.v}
              className="flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-base hover:bg-secondary has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-secondary"
            >
              <RadioGroupItem value={o.v} className="mt-1" />
              <div className="flex-1">
                <div className="text-sm font-medium">{o.l}</div>
                <div className="mt-1 flex items-center gap-2">
                  <Input
                    type="number"
                    value={o.val}
                    onChange={(e) => o.set(Number(e.target.value))}
                    className="h-8 max-w-[140px]"
                  />
                  <span className="text-xs text-muted-foreground">₺</span>
                </div>
                <p className="mt-1 text-[11px] text-muted-foreground">{t("nisabNote")}</p>
              </div>
            </label>
          ))}
        </RadioGroup>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Section title={t("zakatCash")}>
          <Row label={t("cash")} value={f.cash} onChange={(v) => setF({ ...f, cash: v })} />
          <Row label={t("participationAccount")} value={f.participation} onChange={(v) => setF({ ...f, participation: v })} />
          <Row label={t("foreignCurrency")} value={f.fx} onChange={(v) => setF({ ...f, fx: v })} />
        </Section>
        <Section title={t("zakatGold")}>
          <div className="grid grid-cols-2 gap-2 items-end">
            <Row label={t("goldGrams")} value={f.gold} onChange={(v) => setF({ ...f, gold: v })} suffix="g" />
            <div>
              <Label className="text-[10px] uppercase text-muted-foreground">₺/g</Label>
              <Input type="number" value={goldPriceGram} onChange={(e) => setGoldPriceGram(Number(e.target.value))} className="h-9" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 items-end">
            <Row label={t("silverGrams")} value={f.silver} onChange={(v) => setF({ ...f, silver: v })} suffix="g" />
            <div>
              <Label className="text-[10px] uppercase text-muted-foreground">₺/g</Label>
              <Input type="number" value={silverPriceGram} onChange={(e) => setSilverPriceGram(Number(e.target.value))} className="h-9" />
            </div>
          </div>
          <Row label={t("jewelry")} value={f.jewelry} onChange={(v) => setF({ ...f, jewelry: v })} />
        </Section>
        <Section title={t("zakatInvest")}>
          <Row label={t("stocks")} value={f.stocks} onChange={(v) => setF({ ...f, stocks: v })} />
          <Row label={t("funds")} value={f.funds} onChange={(v) => setF({ ...f, funds: v })} />
          <Row label={t("crypto")} value={f.crypto} onChange={(v) => setF({ ...f, crypto: v })} />
        </Section>
        <Section title={t("zakatBiz")}>
          <Row label={t("inventory")} value={f.inventory} onChange={(v) => setF({ ...f, inventory: v })} />
          <Row label={t("receivables")} value={f.receivables} onChange={(v) => setF({ ...f, receivables: v })} />
        </Section>
        <Section title={t("zakatDebt")} className="md:col-span-2">
          <div className="grid gap-3 md:grid-cols-2">
            <Row label={t("shortTermDebt")} value={f.debts} onChange={(v) => setF({ ...f, debts: v })} />
            <Row label={t("duePayments")} value={f.due} onChange={(v) => setF({ ...f, due: v })} />
          </div>
        </Section>
      </div>

      {/* Result */}
      <Card className="border-primary/30 bg-gradient-to-br from-secondary/60 to-background p-6 shadow-soft">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-wide text-muted-foreground">
              {t("zakatableAssets")}
            </div>
            <div className="mt-1 text-xl font-semibold">{formatTL(totals.zakatable, lang)} ₺</div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wide text-muted-foreground">{t("zakatDue")}</div>
            <div className="mt-1 text-3xl font-semibold text-primary">{formatTL(totals.due, lang)} ₺</div>
          </div>
          <Badge
            className={
              totals.above
                ? "bg-success/15 text-success border border-success/30"
                : "bg-destructive/10 text-destructive border border-destructive/30"
            }
            variant="outline"
          >
            {totals.above ? t("aboveNisab") : t("belowNisab")}
          </Badge>
        </div>
      </Card>

      {/* Distribution */}
      <section>
        <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-muted-foreground">
          {t("whereGive")}
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {orgs.map((o) => (
            <Card key={o.name} className="p-5 shadow-soft">
              <div className="text-sm font-semibold">{o.name}</div>
              <div className="mt-1 text-xs text-muted-foreground">{o.focus[lang]}</div>
              <a
                href={o.url}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary"
              >
                {o.url.replace(/https?:\/\//, "")}
                <ExternalLink className="h-3 w-3" />
              </a>
            </Card>
          ))}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">{t("notAffiliated")}</p>
      </section>

      {/* Other obligations */}
      <section>
        <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-muted-foreground">
          {t("otherObligations")}
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="p-5 shadow-soft">
            <h3 className="text-sm font-semibold">{t("fitre")}</h3>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <div>
                <Label className="text-[10px] uppercase text-muted-foreground">{t("familyMembers")}</Label>
                <Input type="number" value={familyMembers} onChange={(e) => setFamily(Number(e.target.value))} className="h-9 mt-1" />
              </div>
              <div>
                <Label className="text-[10px] uppercase text-muted-foreground">{t("fitrePerPerson")}</Label>
                <Input type="number" value={fitrePer} onChange={(e) => setFitrePer(Number(e.target.value))} className="h-9 mt-1" />
              </div>
            </div>
            <div className="mt-4 rounded-lg bg-secondary/60 p-3 text-sm">
              {t("fitreTotal")}: <span className="font-semibold">{formatTL(familyMembers * fitrePer, lang)} ₺</span>
            </div>
          </Card>

          <Card className="p-5 shadow-soft">
            <h3 className="text-sm font-semibold">{t("qurbani")}</h3>
            <div className="mt-3">
              <Label className="text-[10px] uppercase text-muted-foreground">{t("qurbaniType")}</Label>
              <Select value={qurbaniType} onValueChange={setQurbaniType}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="largeShare">{t("largeShare")}</SelectItem>
                  <SelectItem value="largeFull">{t("largeFull")}</SelectItem>
                  <SelectItem value="smallSheep">{t("smallSheep")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="mt-4 rounded-lg bg-secondary/60 p-3 text-sm">
              {lang === "tr" ? "Tahmini maliyet" : "Estimated cost"}:{" "}
              <span className="font-semibold">
                {formatTL(qurbaniCost[qurbaniType as keyof typeof qurbaniCost], lang)} ₺
              </span>
            </div>
          </Card>
        </div>
      </section>

      <DisclaimerBox />
    </div>
  );
}

function Section({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <Card className={`p-5 shadow-soft ${className}`}>
      <h3 className="mb-3 text-sm font-semibold">{title}</h3>
      <div className="space-y-2.5">{children}</div>
    </Card>
  );
}

function Row({
  label,
  value,
  onChange,
  suffix = "₺",
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  suffix?: string;
}) {
  const display = value === 0 ? "" : new Intl.NumberFormat("tr-TR").format(value);
  return (
    <div>
      <Label className="text-[10px] uppercase text-muted-foreground">{label}</Label>
      <div className="mt-1 relative">
        <Input
          type="text"
          inputMode="numeric"
          value={display}
          onChange={(e) => {
            const v = e.target.value.replace(/[^\d.]/g, "");
            onChange(v === "" ? 0 : Number(v));
          }}
          placeholder="0"
          className="h-9 pr-8"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
          {suffix}
        </span>
      </div>
    </div>
  );
}
