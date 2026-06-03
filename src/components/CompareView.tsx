import { useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useTranslation } from "@/i18n/LanguageProvider";
import { ResultCard } from "@/components/ResultCard";
import { DisclaimerBox } from "@/components/DisclaimerBox";
import { ChecklistBox } from "@/components/ChecklistBox";
import { AIChatPanel, type AIChatPanelHandle } from "@/components/AIChatPanel";
import {
  getHomeOptions,
  getVehicleOptions,
  getPersonalOptions,
  type HomeInputs,
} from "@/data/compareOptions";
import { ArrowRight, RefreshCw } from "lucide-react";
import type { TKey } from "@/i18n/translations";

type Variant = "home" | "vehicle" | "personal";

const titles: Record<Variant, { tr: string; en: string }> = {
  home: { tr: "Ev Alacağım", en: "Buying a Home" },
  vehicle: { tr: "Araba Alacağım", en: "Buying a Car" },
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
    openToSavings: "notSure",
    openToSeller: "notSure",
    openToLeasing: "notSure",
    carUse: "personal",
    location: "TR",
  });
  const [submitted, setSubmitted] = useState(false);
  const chatRef = useRef<AIChatPanelHandle>(null);

  const priceLabel: TKey =
    variant === "home" ? "homePrice" : variant === "vehicle" ? "carPrice" : "targetAmount";

  const options =
    variant === "home"
      ? getHomeOptions(inputs)
      : variant === "vehicle"
        ? getVehicleOptions(inputs)
        : getPersonalOptions(inputs);

  if (submitted) {
    return (
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">{titles[variant][lang]}</h1>
            <p className="text-sm text-muted-foreground">{t("resultsTitle")}</p>
          </div>
          <Button variant="outline" onClick={() => setSubmitted(false)} size="sm">
            <RefreshCw className="mr-1.5 h-4 w-4" />
            {t("newComparison")}
          </Button>
        </div>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="grid gap-5 sm:grid-cols-2">
            {options.map((o) => (
              <ResultCard
                key={o.id}
                option={o}
                inputs={inputs as unknown as Record<string, number | string>}
                onAskAbout={(title) => chatRef.current?.askAbout(title)}
              />
            ))}
          </div>
          <div className="lg:sticky lg:top-6 lg:self-start">
            <AIChatPanel
              ref={chatRef}
              options={options}
              inputs={inputs as unknown as Record<string, number | string>}
              lang={lang}
              contextTitle={titles[variant][lang]}
            />
          </div>
        </div>
        <ChecklistBox />
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
        <form
          className="grid gap-5 md:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
        >
          <Field label={t(priceLabel) + " (₺)"}>
            <NumberInput value={inputs.targetAmount} onChange={(v) => setInputs({ ...inputs, targetAmount: v })} />
          </Field>
          <Field label={t("downPayment") + " (₺)"}>
            <NumberInput value={inputs.downPayment} onChange={(v) => setInputs({ ...inputs, downPayment: v })} />
          </Field>
          <Field label={t("monthlyCapacity") + " (₺)"} className="md:col-span-2">
            <NumberInput value={inputs.monthlyCapacity} onChange={(v) => setInputs({ ...inputs, monthlyCapacity: v })} />
          </Field>

          {variant === "vehicle" && (
            <Field label={t("carUse")} className="md:col-span-2">
              <RadioGroup
                value={inputs.carUse ?? "personal"}
                onValueChange={(v) => setInputs({ ...inputs, carUse: v as "personal" | "commercial" })}
                className="grid grid-cols-2 gap-2"
              >
                {[
                  { v: "personal", l: t("carPersonal") },
                  { v: "commercial", l: t("carCommercial") },
                ].map((o) => (
                  <Radio key={o.v} value={o.v} label={o.l} />
                ))}
              </RadioGroup>
            </Field>
          )}

          <Field label={t("timelineQ")} className="md:col-span-2">
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
                <Radio key={o.v} value={o.v} label={o.l} />
              ))}
            </RadioGroup>
          </Field>

          <ThreeWay
            label={t("openToBank")}
            value={inputs.openToBank}
            onChange={(v) => setInputs({ ...inputs, openToBank: v })}
            t={t}
          />

          {variant === "home" && (
            <ThreeWay
              label={t("openToSavings")}
              value={inputs.openToSavings ?? "notSure"}
              onChange={(v) => setInputs({ ...inputs, openToSavings: v })}
              t={t}
            />
          )}

          <ThreeWay
            label={t("openToSeller")}
            value={inputs.openToSeller ?? "notSure"}
            onChange={(v) => setInputs({ ...inputs, openToSeller: v })}
            t={t}
            unknownLabel={t("iDontKnow")}
          />

          {variant === "vehicle" && (
            <ThreeWay
              label={t("openToLeasing")}
              value={inputs.openToLeasing ?? "notSure"}
              onChange={(v) => setInputs({ ...inputs, openToLeasing: v })}
              t={t}
            />
          )}

          <div className="md:col-span-2 flex justify-end">
            <Button type="submit" size="lg">
              {t("compare")} <ArrowRight className="ml-1.5 h-4 w-4" />
            </Button>
          </div>
        </form>
      </Card>

      <div className="mt-6 space-y-4">
        <DisclaimerBox />
      </div>
    </div>
  );
}

function ThreeWay({
  label,
  value,
  onChange,
  t,
  unknownLabel,
}: {
  label: string;
  value: "yes" | "no" | "notSure";
  onChange: (v: "yes" | "no" | "notSure") => void;
  t: (k: TKey) => string;
  unknownLabel?: string;
}) {
  return (
    <Field label={label} className="md:col-span-2">
      <RadioGroup
        value={value}
        onValueChange={(v) => onChange(v as "yes" | "no" | "notSure")}
        className="grid grid-cols-3 gap-2"
      >
        <Radio value="yes" label={t("yes")} />
        <Radio value="notSure" label={unknownLabel ?? t("notSure")} />
        <Radio value="no" label={t("no")} />
      </RadioGroup>
    </Field>
  );
}

function Radio({ value, label }: { value: string; label: string }) {
  return (
    <label className="flex cursor-pointer items-center gap-2 rounded-lg border p-3 text-sm transition-base hover:bg-secondary has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-secondary">
      <RadioGroupItem value={value} />
      <span>{label}</span>
    </label>
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
