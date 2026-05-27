import { useTranslation } from "@/i18n/LanguageProvider";
import { LanguageToggle } from "@/components/LanguageToggle";

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="border-t bg-secondary/30 py-10">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground text-sm font-semibold">
              H
            </div>
            <div>
              <div className="font-semibold">HelalYol</div>
              <div className="text-[11px] text-muted-foreground">{t("brandTagline")}</div>
            </div>
          </div>
          <LanguageToggle />
        </div>
        <div className="mt-6 rounded-lg border border-gold/50 bg-gold/10 p-4 text-xs leading-relaxed text-foreground/80">
          {t("disclaimerLong")}
        </div>
      </div>
    </footer>
  );
}
