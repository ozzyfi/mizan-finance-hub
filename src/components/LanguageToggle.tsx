import { useTranslation } from "@/i18n/LanguageProvider";
import { Button } from "@/components/ui/button";

export function LanguageToggle() {
  const { lang, setLang } = useTranslation();
  return (
    <div className="inline-flex items-center rounded-full border bg-muted/40 p-0.5 text-xs font-medium">
      <button
        type="button"
        onClick={() => setLang("tr")}
        className={`rounded-full px-3 py-1 transition-base ${
          lang === "tr" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
        }`}
      >
        TR
      </button>
      <button
        type="button"
        onClick={() => setLang("en")}
        className={`rounded-full px-3 py-1 transition-base ${
          lang === "en" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
        }`}
      >
        EN
      </button>
    </div>
  );
}

export function LanguageToggleButton() {
  const { lang, setLang } = useTranslation();
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setLang(lang === "tr" ? "en" : "tr")}
      className="rounded-full"
    >
      {lang === "tr" ? "EN" : "TR"}
    </Button>
  );
}
