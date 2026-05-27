import { CheckSquare } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useTranslation } from "@/i18n/LanguageProvider";
import type { TKey } from "@/i18n/translations";

const items: TKey[] = ["cl1", "cl2", "cl3", "cl4", "cl5", "cl6", "cl7", "cl8", "cl9", "cl10"];

export function ChecklistBox() {
  const { t } = useTranslation();
  return (
    <Card className="p-5 shadow-soft border-primary/20 bg-secondary/30">
      <div className="flex items-center gap-2">
        <CheckSquare className="h-4 w-4 text-primary" />
        <h3 className="text-sm font-semibold">{t("checklistTitle")}</h3>
      </div>
      <ul className="mt-3 grid gap-2 md:grid-cols-2">
        {items.map((k, i) => (
          <li key={k} className="flex gap-2 text-xs text-foreground/80">
            <span className="text-primary font-semibold shrink-0">{i + 1}.</span>
            <span>{t(k)}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
