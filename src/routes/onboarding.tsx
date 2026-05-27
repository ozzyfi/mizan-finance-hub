import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { User, Building2, ArrowRight } from "lucide-react";
import { useTranslation } from "@/i18n/LanguageProvider";
import { useApp } from "@/state/AppContext";
import { LanguageToggle } from "@/components/LanguageToggle";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [{ title: "HelalYol — Profilinizi seçin" }],
  }),
  component: Onboarding,
});

function Onboarding() {
  const { t } = useTranslation();
  const { setUserType } = useApp();
  const navigate = useNavigate();

  const pick = (type: "individual" | "sme") => {
    setUserType(type);
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="min-h-screen bg-secondary/40">
      <header className="flex items-center justify-between border-b bg-background/80 px-6 py-4 backdrop-blur">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-semibold">
            H
          </div>
          <span className="font-semibold">HelalYol</span>
        </Link>
        <LanguageToggle />
      </header>

      <div className="mx-auto flex max-w-5xl flex-col items-center px-6 py-16">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-center">
          {t("onboardTitle")}
        </h1>
        <p className="mt-3 text-muted-foreground text-center">{t("onboardSubtitle")}</p>

        <div className="mt-12 grid w-full gap-6 md:grid-cols-2">
          {[
            { type: "individual" as const, icon: User, title: t("individual"), desc: t("individualDesc") },
            { type: "sme" as const, icon: Building2, title: t("sme"), desc: t("smeDesc") },
          ].map((c) => (
            <button
              key={c.type}
              onClick={() => pick(c.type)}
              className="group relative flex flex-col items-start gap-4 rounded-2xl border bg-background p-8 text-left shadow-soft transition-base hover:shadow-soft-hover hover:-translate-y-0.5 hover:border-primary/40"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-secondary text-primary">
                <c.icon className="h-7 w-7" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">{c.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{c.desc}</p>
              </div>
              <div className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-primary">
                {t("continue")} <ArrowRight className="h-4 w-4 transition-base group-hover:translate-x-1" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
