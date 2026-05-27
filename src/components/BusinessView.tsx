import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslation } from "@/i18n/LanguageProvider";
import { ResultCard } from "@/components/ResultCard";
import { DisclaimerBox } from "@/components/DisclaimerBox";
import { getSmeOptions, type SmeInputs } from "@/data/smeOptions";
import { ArrowRight, RefreshCw } from "lucide-react";

const titles: Record<string, { tr: string; en: string }> = {
  murabaha: { tr: "Murabaha", en: "Murabaha" },
  ijara: { tr: "İjara / Leasing", en: "Ijara / Leasing" },
  supplier: { tr: "Tedarikçi Finansmanı", en: "Supplier Finance" },
  invoice: { tr: "Fatura Finansmanı", en: "Invoice Finance" },
};

export function BusinessView({ variant }: { variant: keyof typeof titles }) {
  const { t, lang } = useTranslation();
  const [inputs, setInputs] = useState<SmeInputs>({
    businessType: "ltd",
    purpose: "goods",
    amount: 0,
    duration: 24,
    collateral: "unsure",
  });
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    const options = getSmeOptions(variant, inputs);
    return (
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">{titles[variant][lang]}</h1>
            <p className="text-sm text-muted-foreground">
              {lang === "tr" ? "Karşılaştırma sonuçları" : "Comparison results"}
            </p>
          </div>
          <Button variant="outline" onClick={() => setSubmitted(false)} size="sm">
            <RefreshCw className="mr-1.5 h-4 w-4" /> {t("newComparison")}
          </Button>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {options.map((o) => (
            <ResultCard
              key={o.id}
              option={o}
              inputs={inputs as unknown as Record<string, number | string>}
            />
          ))}
        </div>
        <DisclaimerBox variant="long" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-semibold tracking-tight">{titles[variant][lang]}</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {lang === "tr"
          ? "İşletmeniz için bilgilerinizi girin."
          : "Enter your business details."}
      </p>

      <Card className="mt-6 p-6 shadow-soft">
        <form
          className="grid gap-5 md:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
        >
          <Field label={t("businessType")}>
            <Select
              value={inputs.businessType}
              onValueChange={(v) =>
                setInputs({ ...inputs, businessType: v as SmeInputs["businessType"] })
              }
            >
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="sole">{lang === "tr" ? "Şahıs" : "Sole proprietor"}</SelectItem>
                <SelectItem value="ltd">Ltd. Şti.</SelectItem>
                <SelectItem value="as">A.Ş.</SelectItem>
                <SelectItem value="startup">{lang === "tr" ? "Startup / Girişim" : "Startup"}</SelectItem>
              </SelectContent>
            </Select>
          </Field>

          <Field label={t("purpose")}>
            <Select
              value={inputs.purpose}
              onValueChange={(v) => setInputs({ ...inputs, purpose: v as SmeInputs["purpose"] })}
            >
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="goods">{lang === "tr" ? "Mal alımı" : "Goods purchase"}</SelectItem>
                <SelectItem value="equipment">{lang === "tr" ? "Ekipman" : "Equipment"}</SelectItem>
                <SelectItem value="working">{lang === "tr" ? "İşletme sermayesi" : "Working capital"}</SelectItem>
                <SelectItem value="growth">{lang === "tr" ? "Büyüme" : "Growth"}</SelectItem>
                <SelectItem value="realestate">{lang === "tr" ? "Gayrimenkul" : "Real estate"}</SelectItem>
              </SelectContent>
            </Select>
          </Field>

          <Field label={t("amount") + " (₺)"}>
            <Input
              type="text"
              inputMode="numeric"
              value={inputs.amount === 0 ? "" : new Intl.NumberFormat("tr-TR").format(inputs.amount)}
              onChange={(e) => {
                const v = e.target.value.replace(/[^\d]/g, "");
                setInputs({ ...inputs, amount: v === "" ? 0 : Number(v) });
              }}
              placeholder="0"
            />
          </Field>

          <Field label={t("duration")}>
            <Input
              type="number"
              value={inputs.duration || ""}
              onChange={(e) => setInputs({ ...inputs, duration: Number(e.target.value) })}
              min={1}
            />
          </Field>

          <Field label={t("collateral")} className="md:col-span-2">
            <RadioGroup
              value={inputs.collateral}
              onValueChange={(v) => setInputs({ ...inputs, collateral: v as SmeInputs["collateral"] })}
              className="grid grid-cols-3 gap-2"
            >
              {[
                { v: "yes", l: t("collateralYes") },
                { v: "no", l: t("collateralNo") },
                { v: "unsure", l: t("collateralUnsure") },
              ].map((o) => (
                <label
                  key={o.v}
                  className="flex cursor-pointer items-center gap-2 rounded-lg border p-3 text-sm transition-base hover:bg-secondary has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-secondary"
                >
                  <RadioGroupItem value={o.v} />
                  <span>{o.l}</span>
                </label>
              ))}
            </RadioGroup>
          </Field>

          <div className="md:col-span-2 flex justify-end">
            <Button type="submit" size="lg">
              {t("compare")} <ArrowRight className="ml-1.5 h-4 w-4" />
            </Button>
          </div>
        </form>
      </Card>

      <div className="mt-6">
        <DisclaimerBox />
      </div>
    </div>
  );
}

function Field({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}
