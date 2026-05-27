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
import { ChecklistBox } from "@/components/ChecklistBox";
import { getSmeOptions, type SmeInputs, type SmePurpose } from "@/data/smeOptions";
import { ArrowRight, RefreshCw } from "lucide-react";
import type { TKey } from "@/i18n/translations";

const titles: Record<string, { tr: string; en: string }> = {
  general: { tr: "KOBİ Finansmanı", en: "SME Financing" },
  murabaha: { tr: "Murabaha", en: "Murabaha" },
  ijara: { tr: "İjara / Leasing", en: "Ijara / Leasing" },
  supplier: { tr: "Tedarikçi Finansmanı", en: "Supplier Finance" },
  invoice: { tr: "Fatura Finansmanı", en: "Invoice Finance" },
};

export function BusinessView({ variant = "general" }: { variant?: keyof typeof titles }) {
  const { t, lang } = useTranslation();
  const [inputs, setInputs] = useState<SmeInputs>({
    purpose: "equipment",
    amount: 0,
    equity: 0,
    monthlyCapacity: 0,
    duration: 24,
    documentable: "yes",
    collateral: "partly",
  });
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    const options = getSmeOptions(variant, inputs);
    return (
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">{titles[variant][lang]}</h1>
            <p className="text-sm text-muted-foreground">{t("resultsTitle")}</p>
          </div>
          <Button variant="outline" onClick={() => setSubmitted(false)} size="sm">
            <RefreshCw className="mr-1.5 h-4 w-4" /> {t("newComparison")}
          </Button>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {options.map((o) => (
            <ResultCard key={o.id} option={o} inputs={inputs as unknown as Record<string, number | string>} />
          ))}
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
          ? "İşletmenizin ihtiyacını girin, faizsiz seçenekleri sıralayalım."
          : "Enter your business need to rank interest-free options."}
      </p>

      <Card className="mt-6 p-6 shadow-soft">
        <form
          className="grid gap-5 md:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
        >
          <Field label={t("smePurpose")} className="md:col-span-2">
            <Select
              value={inputs.purpose}
              onValueChange={(v) => setInputs({ ...inputs, purpose: v as SmePurpose })}
            >
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="stock">{t("smePurposeStock")}</SelectItem>
                <SelectItem value="equipment">{t("smePurposeEquipment")}</SelectItem>
                <SelectItem value="vehicle">{t("smePurposeVehicle")}</SelectItem>
                <SelectItem value="invoice">{t("smePurposeInvoice")}</SelectItem>
                <SelectItem value="supplier">{t("smePurposeSupplier")}</SelectItem>
              </SelectContent>
            </Select>
          </Field>

          <Field label={t("smeAmount") + " (₺)"}>
            <NumberInput value={inputs.amount} onChange={(v) => setInputs({ ...inputs, amount: v })} />
          </Field>
          <Field label={t("smeEquity") + " (₺)"}>
            <NumberInput value={inputs.equity} onChange={(v) => setInputs({ ...inputs, equity: v })} />
          </Field>
          <Field label={t("smeCapacity") + " (₺)"}>
            <NumberInput value={inputs.monthlyCapacity} onChange={(v) => setInputs({ ...inputs, monthlyCapacity: v })} />
          </Field>
          <Field label={t("smeDuration")}>
            <Input
              type="number"
              value={inputs.duration || ""}
              onChange={(e) => setInputs({ ...inputs, duration: Number(e.target.value) })}
              min={1}
            />
          </Field>

          <ThreeWay
            label={t("smeDocs")}
            value={inputs.documentable}
            onChange={(v) => setInputs({ ...inputs, documentable: v })}
            t={t}
          />
          <ThreeWay
            label={t("smeCollateral")}
            value={inputs.collateral}
            onChange={(v) => setInputs({ ...inputs, collateral: v })}
            t={t}
          />

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

function ThreeWay({
  label,
  value,
  onChange,
  t,
}: {
  label: string;
  value: "yes" | "partly" | "no";
  onChange: (v: "yes" | "partly" | "no") => void;
  t: (k: TKey) => string;
}) {
  return (
    <Field label={label} className="md:col-span-2">
      <RadioGroup
        value={value}
        onValueChange={(v) => onChange(v as "yes" | "partly" | "no")}
        className="grid grid-cols-3 gap-2"
      >
        {[
          { v: "yes", l: t("yes") },
          { v: "partly", l: t("partly") },
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
