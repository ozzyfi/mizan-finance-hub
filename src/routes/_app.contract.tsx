import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  ShieldCheck,
  Sparkles,
  ListChecks,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/i18n/LanguageProvider";
import type { TKey } from "@/i18n/translations";
import { DisclaimerBox } from "@/components/DisclaimerBox";
import { ChecklistBox } from "@/components/ChecklistBox";

export const Route = createFileRoute("/_app/contract")({
  head: () => ({ meta: [{ title: "HelalYol — Sözleşme Ne Diyor?" }] }),
  component: Contract,
});

type Finding = {
  icon: typeof CheckCircle2;
  statusKey: TKey;
  tone: "good" | "warn" | "unknown" | "info";
  title: { tr: string; en: string };
  detail: { tr: string; en: string };
};

const findings: Finding[] = [
  {
    icon: CheckCircle2,
    tone: "good",
    statusKey: "stFound",
    title: { tr: "Toplam Maliyet", en: "Total Cost" },
    detail: {
      tr: "Toplam ödeme ve ek masraflar ayrı ayrı kontrol edilmeli.",
      en: "Total payment and extra fees should be reviewed line by line.",
    },
  },
  {
    icon: AlertTriangle,
    tone: "warn",
    statusKey: "stReview",
    title: { tr: "Gecikme Cezası", en: "Late Payment Penalty" },
    detail: {
      tr: "Gecikme halinde alınan bedelin nasıl değerlendirildiği sorulmalı.",
      en: "Ask how the late-payment amount is treated.",
    },
  },
  {
    icon: HelpCircle,
    tone: "unknown",
    statusKey: "stUnclear",
    title: { tr: "Erken Kapama", en: "Early Repayment" },
    detail: {
      tr: "Erken ödeme indirimi veya kapama şartı açık görünmüyor.",
      en: "Early repayment discount or terms appear unclear.",
    },
  },
  {
    icon: ShieldCheck,
    tone: "info",
    statusKey: "stPresent",
    title: { tr: "Teminat / İpotek", en: "Collateral / Mortgage" },
    detail: {
      tr: "Teminatın kapsamı, kaldırılma şartı ve ek yükümlülükler kontrol edilmeli.",
      en: "Scope, release conditions and additional obligations should be reviewed.",
    },
  },
  {
    icon: AlertTriangle,
    tone: "warn",
    statusKey: "stAsk",
    title: { tr: "Danışma Kurulu / Ürün Onayı", en: "Advisory Board / Product Approval" },
    detail: {
      tr: "Ürünün hangi danışma kurulu veya iç uygunluk sürecinden geçtiği sorulmalı.",
      en: "Ask which advisory board or internal compliance approved the product.",
    },
  },
];

const questions: { tr: string; en: string }[] = [
  { tr: "Bu işlem hangi akde dayanıyor?", en: "Which contract type (aqd) does this transaction rely on?" },
  { tr: "Toplam satış bedeli ve tüm ek masraflar baştan sabit mi?", en: "Are total sale price and all extra fees fixed upfront?" },
  { tr: "Gecikme halinde alınan bedel kurum geliri mi oluyor?", en: "Is the late-payment amount treated as institutional revenue?" },
  { tr: "Erken kapama halinde indirim uygulanıyor mu?", en: "Is a discount applied on early repayment?" },
  { tr: "Malın/varlığın alım-satım süreci sözleşmede nasıl geçiyor?", en: "How is the asset's buy-sell process described in the contract?" },
  { tr: "Teminat veya ipotek hangi şartlarda kaldırılıyor?", en: "Under what conditions is collateral or mortgage released?" },
  { tr: "Danışma kurulu görüşünü görebilir miyim?", en: "May I see the advisory board's opinion?" },
];

function Contract() {
  const { t, lang } = useTranslation();
  const [analyzed, setAnalyzed] = useState(false);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [showQs, setShowQs] = useState(false);

  const onFile = (file: File) => {
    setFileName(file.name);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setAnalyzed(true);
    }, 1100);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{t("contractTitle")}</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">{t("contractIntro")}</p>
      </div>

      {!analyzed ? (
        <Card className="p-8 shadow-soft">
          <label className="block">
            <div className="flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-border bg-secondary/40 p-10 text-center transition-base hover:bg-secondary cursor-pointer">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-background text-primary">
                <UploadCloud className="h-7 w-7" />
              </div>
              <div>
                <div className="text-base font-semibold">{t("uploadContract")}</div>
                <div className="mt-1 text-xs text-muted-foreground">{t("uploadSub")}</div>
              </div>
              <div className="text-xs text-primary font-medium">{t("dropOr")}</div>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])}
              />
            </div>
          </label>
          {loading && (
            <p className="mt-4 text-center text-sm text-muted-foreground">
              <Sparkles className="inline h-4 w-4 mr-1 animate-pulse text-primary" />
              {t("analyzing")} {fileName && `(${fileName})`}
            </p>
          )}
        </Card>
      ) : (
        <>
          <Card className="p-5 shadow-soft">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-sm font-semibold">{t("analysisResult")}</div>
                  <div className="text-xs text-muted-foreground">{fileName || "demo-contract.pdf"}</div>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setAnalyzed(false);
                  setFileName("");
                  setShowQs(false);
                }}
              >
                {lang === "tr" ? "Yeni sözleşme" : "New contract"}
              </Button>
            </div>
          </Card>

          <div className="grid gap-3">
            {findings.map((f, i) => {
              const colorCls =
                f.tone === "good"
                  ? "border-success/30 bg-success/5"
                  : f.tone === "warn"
                    ? "border-warning/40 bg-warning/5"
                    : f.tone === "unknown"
                      ? "border-destructive/30 bg-destructive/5"
                      : "border-primary/30 bg-primary/5";
              const iconCls =
                f.tone === "good"
                  ? "text-success"
                  : f.tone === "warn"
                    ? "text-warning"
                    : f.tone === "unknown"
                      ? "text-destructive"
                      : "text-primary";
              const Icon = f.icon;
              return (
                <Card key={i} className={`flex gap-3 p-4 shadow-soft ${colorCls}`}>
                  <Icon className={`h-5 w-5 shrink-0 mt-0.5 ${iconCls}`} />
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="text-sm font-semibold">{f.title[lang]}</div>
                      <Badge variant="outline" className="text-[10px] bg-background">
                        {t(f.statusKey)}
                      </Badge>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{f.detail[lang]}</p>
                  </div>
                </Card>
              );
            })}
          </div>

          <Card className="p-5 shadow-soft border-primary/30">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <ListChecks className="h-4 w-4 text-primary" />
                <div className="text-sm font-semibold">{t("generateQuestions")}</div>
              </div>
              <Button size="sm" onClick={() => setShowQs((s) => !s)}>
                {showQs ? (lang === "tr" ? "Gizle" : "Hide") : t("generateQuestions")}
              </Button>
            </div>
            {showQs && (
              <ul className="mt-4 space-y-2 rounded-lg border bg-secondary/40 p-4 text-sm">
                {questions.map((q, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-primary font-semibold">{i + 1}.</span>
                    <span>{q[lang]}</span>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </>
      )}

      <ChecklistBox />

      <div className="rounded-lg border border-warning/40 bg-warning/5 p-4 text-xs text-foreground">
        {t("contractDisclaimer")}
      </div>
      <DisclaimerBox variant="long" />
    </div>
  );
}
