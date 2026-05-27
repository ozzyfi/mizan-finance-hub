import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { UploadCloud, FileText, CheckCircle2, AlertTriangle, XCircle, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/i18n/LanguageProvider";
import { DisclaimerBox } from "@/components/DisclaimerBox";

export const Route = createFileRoute("/_app/contract")({
  head: () => ({ meta: [{ title: "Mizan — Contract Analysis" }] }),
  component: Contract,
});

function Contract() {
  const { t, lang } = useTranslation();
  const [analyzed, setAnalyzed] = useState(false);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);

  const onFile = (file: File) => {
    setFileName(file.name);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setAnalyzed(true);
    }, 1200);
  };

  const findings = [
    {
      level: "green" as const,
      title: { tr: "Toplam maliyet maddesi bulundu ve net", en: "Total cost clause found and clear" },
      detail: { tr: "", en: "" },
    },
    {
      level: "yellow" as const,
      title: { tr: "Gecikme cezası maddesi — kontrol edin", en: "Late payment clause — needs review" },
      detail: {
        tr: "Gecikme durumunda ek ücret uygulanabileceği belirtilmiş.",
        en: "Additional charges may apply in case of delay.",
      },
    },
    {
      level: "red" as const,
      title: { tr: "Erken ödeme şartı belirsiz", en: "Early repayment terms unclear" },
      detail: {
        tr: "Erken ödeme indirimi veya cezası hakkında net bir madde bulunamadı.",
        en: "No clear clause found regarding early repayment discount or penalty.",
      },
    },
    {
      level: "yellow" as const,
      title: { tr: "Teminat/İpotek maddesi mevcut", en: "Collateral/Mortgage clause present" },
      detail: { tr: "", en: "" },
    },
    {
      level: "green" as const,
      title: { tr: "Danışma kurulu onayı mevcut", en: "Sharia board approval present" },
      detail: { tr: "", en: "" },
    },
  ];

  const counts = {
    green: findings.filter((f) => f.level === "green").length,
    yellow: findings.filter((f) => f.level === "yellow").length,
    red: findings.filter((f) => f.level === "red").length,
  };
  const total = findings.length;

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{t("contractTitle")}</h1>
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
          <Card className="p-6 shadow-soft">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-sm font-semibold">{t("analysisResult")}</div>
                  <div className="text-xs text-muted-foreground">{fileName || "demo-contract.pdf"}</div>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={() => { setAnalyzed(false); setFileName(""); }}>
                {lang === "tr" ? "Yeni sözleşme" : "New contract"}
              </Button>
            </div>

            <div className="mt-5 flex h-2 overflow-hidden rounded-full">
              <div className="bg-success" style={{ width: `${(counts.green / total) * 100}%` }} />
              <div className="bg-warning" style={{ width: `${(counts.yellow / total) * 100}%` }} />
              <div className="bg-destructive" style={{ width: `${(counts.red / total) * 100}%` }} />
            </div>
            <div className="mt-2 flex gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-success" /> {counts.green} {t("low")}</span>
              <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-warning" /> {counts.yellow} {t("medium")}</span>
              <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-destructive" /> {counts.red} {t("high")}</span>
            </div>
          </Card>

          <div className="grid gap-3">
            {findings.map((f, i) => {
              const Icon = f.level === "green" ? CheckCircle2 : f.level === "yellow" ? AlertTriangle : XCircle;
              const colorCls =
                f.level === "green"
                  ? "border-success/30 bg-success/5"
                  : f.level === "yellow"
                    ? "border-warning/40 bg-warning/5"
                    : "border-destructive/30 bg-destructive/5";
              const iconCls =
                f.level === "green" ? "text-success" : f.level === "yellow" ? "text-warning" : "text-destructive";
              return (
                <Card key={i} className={`flex gap-3 p-4 shadow-soft ${colorCls}`}>
                  <Icon className={`h-5 w-5 shrink-0 mt-0.5 ${iconCls}`} />
                  <div>
                    <div className="text-sm font-semibold">{f.title[lang]}</div>
                    {f.detail[lang] && (
                      <p className="mt-1 text-xs text-muted-foreground">{f.detail[lang]}</p>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>

          <Card className="border-primary/30 bg-gradient-to-br from-secondary/60 to-background p-6 shadow-soft text-center">
            <p className="text-sm font-medium">{t("upgradeCTA")}</p>
            <Button className="mt-3" disabled>
              {t("upgradeBtn")}
            </Button>
          </Card>
        </>
      )}

      <div className="rounded-lg border border-warning/40 bg-warning/5 p-4 text-xs text-foreground">
        {t("contractDisclaimer")}
      </div>
      <DisclaimerBox />
    </div>
  );
}
