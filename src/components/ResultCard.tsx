import { useState } from "react";
import { ChevronDown, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTranslation } from "@/i18n/LanguageProvider";
import { formatTL } from "@/state/AppContext";
import type { Lang } from "@/i18n/translations";

export type Bilingual = { tr: string; en: string };

export type ResultOption = {
  id: string;
  title: Bilingual;
  desc: Bilingual;
  badges: Bilingual[];
  risk: "low" | "medium" | "high";
  durationMonths: number;
  financingNeed: number;
  questions: Bilingual[];
  aiInsight: (inputs: Record<string, number | string>, lang: Lang) => string;
};

const riskClass: Record<string, string> = {
  low: "bg-success/10 text-success border-success/30",
  medium: "bg-warning/10 text-warning border-warning/40",
  high: "bg-destructive/10 text-destructive border-destructive/30",
};

export function ResultCard({
  option,
  inputs,
}: {
  option: ResultOption;
  inputs: Record<string, number | string>;
}) {
  const { lang, t } = useTranslation();
  const [openQ, setOpenQ] = useState(false);
  const [openAI, setOpenAI] = useState(false);
  const [aiText, setAiText] = useState("");

  const startAI = () => {
    setOpenAI(true);
    setAiText("");
    const full = option.aiInsight(inputs, lang);
    let i = 0;
    const id = setInterval(() => {
      i += 2;
      setAiText(full.slice(0, i));
      if (i >= full.length) clearInterval(id);
    }, 18);
  };

  return (
    <Card className="shadow-soft hover:shadow-soft-hover transition-base flex flex-col">
      <CardHeader className="space-y-3">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <CardTitle className="text-base font-semibold leading-tight">
            {option.title[lang]}
          </CardTitle>
          <Badge variant="outline" className={`text-[10px] font-medium ${riskClass[option.risk]}`}>
            {t("risk")}: {t(option.risk as "low" | "medium" | "high")}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{option.desc[lang]}</p>
        <div className="flex flex-wrap gap-1.5">
          {option.badges.map((b, i) => (
            <Badge
              key={i}
              className="bg-gold/15 text-foreground border border-gold/40 hover:bg-gold/20"
              variant="outline"
            >
              {b[lang]}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-4">
        <div className="grid grid-cols-3 gap-2 rounded-lg border bg-muted/30 p-3 text-center">
          <div>
            <div className="text-[10px] uppercase tracking-wide text-muted-foreground">
              {t("financingNeed")}
            </div>
            <div className="mt-1 text-sm font-semibold">{formatTL(option.financingNeed, lang)} ₺</div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wide text-muted-foreground">
              {t("estDuration")}
            </div>
            <div className="mt-1 text-sm font-semibold">
              ~{option.durationMonths} {t("months")}
            </div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wide text-muted-foreground">
              {t("riskLevel")}
            </div>
            <div className="mt-1 text-sm font-semibold capitalize">{t(option.risk)}</div>
          </div>
        </div>

        <Collapsible open={openQ} onOpenChange={setOpenQ}>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full justify-between" size="sm">
              {t("questionsToAsk")}
              <ChevronDown className={`h-4 w-4 transition-base ${openQ ? "rotate-180" : ""}`} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2">
            <ul className="space-y-2 rounded-lg border bg-secondary/40 p-3 text-sm">
              {option.questions.map((q, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-primary font-semibold">{i + 1}.</span>
                  <span>{q[lang]}</span>
                </li>
              ))}
            </ul>
          </CollapsibleContent>
        </Collapsible>

        <Button onClick={startAI} className="w-full" size="sm">
          <Sparkles className="mr-1.5 h-4 w-4" />
          {t("aiInsights")}
        </Button>
      </CardContent>

      <Dialog open={openAI} onOpenChange={setOpenAI}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              {option.title[lang]}
            </DialogTitle>
            <DialogDescription className="text-xs">{t("aiAnalyzing")}</DialogDescription>
          </DialogHeader>
          <div className="rounded-lg border bg-secondary/40 p-4 text-sm leading-relaxed whitespace-pre-wrap min-h-[120px]">
            {aiText}
            <span className="inline-block w-1.5 h-4 ml-0.5 align-middle bg-primary animate-pulse" />
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
