import { Info } from "lucide-react";
import { useTranslation } from "@/i18n/LanguageProvider";

export function DisclaimerBox({ variant = "short" }: { variant?: "short" | "long" }) {
  const { t } = useTranslation();
  return (
    <div className="flex gap-2 rounded-lg border border-gold/50 bg-gold/10 p-3 text-xs text-foreground/80">
      <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-foreground" />
      <p>{variant === "long" ? t("disclaimerLong") : t("disclaimerShort")}</p>
    </div>
  );
}
