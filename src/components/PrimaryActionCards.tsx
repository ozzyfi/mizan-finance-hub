import { Link } from "@tanstack/react-router";
import { Home, Car, Building2, FileText, ArrowRight } from "lucide-react";
import { useTranslation } from "@/i18n/LanguageProvider";

const actions = [
  { to: "/compare/home", icon: Home, emoji: "🏠", titleKey: "jHomeTitle", descKey: "jHomeDesc" },
  { to: "/compare/vehicle", icon: Car, emoji: "🚗", titleKey: "jCarTitle", descKey: "jCarDesc" },
  { to: "/business", icon: Building2, emoji: "🏢", titleKey: "jSmeTitle", descKey: "jSmeDesc" },
  { to: "/contract", icon: FileText, emoji: "📄", titleKey: "jContractTitle", descKey: "jContractDesc" },
] as const;

export function PrimaryActionCards() {
  const { t } = useTranslation();
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {actions.map((a) => (
        <Link
          key={a.to}
          to={a.to}
          className="group flex flex-col rounded-2xl border bg-card p-6 shadow-soft transition-base hover:shadow-soft-hover hover:-translate-y-0.5 hover:border-primary/40"
        >
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-2xl">
              {a.emoji}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold leading-tight">{t(a.titleKey as never)}</h3>
            </div>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">{t(a.descKey as never)}</p>
          <div className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary">
            {t("start")} <ArrowRight className="h-4 w-4 transition-base group-hover:translate-x-1" />
          </div>
        </Link>
      ))}
    </div>
  );
}
