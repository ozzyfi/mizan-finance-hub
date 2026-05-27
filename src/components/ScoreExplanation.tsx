import { useState } from "react";
import { ChevronDown, ThumbsUp, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useTranslation } from "@/i18n/LanguageProvider";
import type { Bilingual } from "@/components/ResultCard";

export type WhyScore = {
  positives: Bilingual[];
  checks: Bilingual[];
};

export function ScoreExplanation({ why }: { why?: WhyScore }) {
  const { t, lang } = useTranslation();
  const [open, setOpen] = useState(false);
  if (!why) return null;

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger asChild>
        <Button variant="outline" size="sm" className="w-full justify-between">
          {t("whyTag")}
          <ChevronDown className={`h-4 w-4 transition-base ${open ? "rotate-180" : ""}`} />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-2 space-y-3 rounded-lg border bg-background p-3 text-sm">
        <div>
          <div className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-success">
            <ThumbsUp className="h-3.5 w-3.5" /> {t("positives")}
          </div>
          <ul className="space-y-1.5">
            {why.positives.map((p, i) => (
              <li key={i} className="flex gap-2 text-xs text-foreground/80">
                <span className="text-success">•</span>
                <span>{p[lang]}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-warning">
            <AlertCircle className="h-3.5 w-3.5" /> {t("thingsToCheck")}
          </div>
          <ul className="space-y-1.5">
            {why.checks.map((c, i) => (
              <li key={i} className="flex gap-2 text-xs text-foreground/80">
                <span className="text-warning">•</span>
                <span>{c[lang]}</span>
              </li>
            ))}
          </ul>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
