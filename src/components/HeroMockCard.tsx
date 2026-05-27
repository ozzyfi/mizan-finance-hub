import { Sparkles, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/i18n/LanguageProvider";

export function HeroMockCard() {
  const { t } = useTranslation();
  const chips = [
    { label: t("mockChip1"), tag: t("tagFit") },
    { label: t("mockChip2"), tag: t("tagAdvantage") },
    { label: t("mockChip3"), tag: t("tagSimple") },
  ];

  return (
    <div className="rounded-2xl border bg-background p-4 shadow-soft-hover">
      <div className="space-y-3">
        {/* User bubble */}
        <div className="flex items-start gap-2">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary text-foreground">
            <User className="h-3.5 w-3.5" />
          </div>
          <div className="flex-1 rounded-2xl rounded-tl-sm bg-secondary/60 p-3 text-sm">
            {t("mockUser")}
          </div>
        </div>
        {/* Bot bubble */}
        <div className="flex items-start gap-2">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Sparkles className="h-3.5 w-3.5" />
          </div>
          <div className="flex-1 rounded-2xl rounded-tl-sm border border-primary/20 bg-primary/5 p-3 text-sm">
            {t("mockBot")}
          </div>
        </div>
        {/* Result chips */}
        <div className="grid gap-2 pt-2 sm:grid-cols-3">
          {chips.map((c) => (
            <div
              key={c.label}
              className="rounded-xl border bg-card p-3 shadow-soft"
            >
              <div className="text-xs font-semibold leading-tight">{c.label}</div>
              <Badge
                variant="outline"
                className="mt-2 bg-gold/15 text-foreground border-gold/40 text-[10px]"
              >
                {c.tag}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
