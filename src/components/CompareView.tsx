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
import { getHomeOptions, getVehicleOptions, getPersonalOptions, type HomeInputs } from "@/data/compareOptions";
import { ArrowRight, RefreshCw } from "lucide-react";

type Variant = "home" | "vehicle" | "personal";

const titles: Record<Variant, { tr: string; en: string }> = {
  home: { tr: "Ev Finansmanı", en: "Home Financing" },
  vehicle: { tr: "Araç Finansmanı", en: "Vehicle Financing" },
  personal: { tr: "Kişisel Finansman", en: "Personal Financing" },
};

export function CompareView({ variant }: { variant: Variant }) {
  const { t, lang } = useTranslation();
  const [inputs, setInputs] = useState<HomeInputs>({
    targetAmount: 0,
    downPayment: 0,
    monthlyCapacity: 0,
    urgency: "612",
    openToBank: "notSure",
    location: "TR",
  });
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const reset = () => setSubmitted(false);

  const options =
    variant === "home"
      ? getHomeOptions(inputs)
      : variant === "vehicle"
        ? getVehicleOptions(inputs)
        : getPersonalOptions(inputs);

  if (submitted) {
    return (
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">{t("resultsTitle")}</h1>
            <p className="text-sm text-muted-foreground">{titles[variant][lang]}</p>
          </div>
          <Button variant="outline" onClick={reset} size="sm">
            <RefreshCw className="mr-1.5 h-4 w-4" />
            {t("newComparison")}
          </Button>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {options.map((o) => (
            <ResultCard key={o.id} option={o} inputs={inputs as unknown as Record<string, number | string>} />
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
          ? "Bilgilerinizi girin, size uygun faizsiz seçenekleri karşılaştıralım."
          : "Enter your details to compare suitable interest-free options."}
      </p>

      <Card className="mt-6 p-6 shadow-soft">
        <form className="grid gap-5 md:grid-cols-2" onSubmit={onSubmit}>
          <Field label={t("targetAmount") + " (₺)"}>
            <NumberInput
              value={inputs.targetAmount}
              onChange={(v) => setInputs({ ...inputs, targetAmount: v })}
            />
          </Field>
          <Field label={t("downPayment") + " (₺)"}>
            <NumberInput
              value={inputs.downPayment}
              onChange={(v) => setInputs({ ...inputs, downPayment: v })}
            />
          </Field>
          <Field label={t("monthlyCapacity") + " (₺)"}>
            <NumberInput
              value={inputs.monthlyCapacity}
              onChange={(v) => setInputs({ ...inputs, monthlyCapacity: v })}
            />
          </Field>
          <Field label={t("location")}>
            <Select value={inputs.location} onValueChange={(v) => setInputs({ ...inputs, location: v as HomeInputs["location"] })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="TR">{t("locTR")}</SelectItem>
                <SelectItem value="DE">{t("locDE")}</SelectItem>
                <SelectItem value="UK">{t("locUK")}</SelectItem>
                <SelectItem value="Other">{t("locOther")}</SelectItem>
              </SelectContent>
            </Select>
          </Field>

          <Field label={t("urgency")} className="md:col-span-2">
            <RadioGroup
              value={inputs.urgency}
              onValueChange={(v) => setInputs({ ...inputs, urgency: v as HomeInputs["urgency"] })}
              className="grid grid-cols-3 gap-2"
            >
              {[
                { v: "now", l: t("urgencyNow") },
                { v: "612", l: t("urgency612") },
                { v: "12+", l: t("urgency12") },
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

          <Field label={t("openToBank")} className="md:col-span-2">
            <RadioGroup
              value={inputs.openToBank}
              onValueChange={(v) => setInputs({ ...inputs, openToBank: v as HomeInputs["openToBank"] })}
              className="grid grid-cols-3 gap-2"
            >
              {[
                { v: "yes", l: t("yes") },
                { v: "notSure", l: t("notSure") },
                { v: "no", l: t("no") },
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

function NumberInput({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  const display = value === 0 ? "" : new Intl.NumberFormat("tr-TR").format(value);
  return (
    <Input
      type="text"
      inputMode="numeric"
      value={display}
      onChange={(e) => {
        const clean = e.target.value.replace(/[^\d]/g, "");
        onChange(clean === "" ? 0 : Number(clean));
      }}
      placeholder="0"
    />
  );
}
