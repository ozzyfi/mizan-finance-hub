import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Scale,
  Calculator,
  FileText,
  Building2,
  Globe,
  Shield,
  Check,
} from "lucide-react";
import { useTranslation } from "@/i18n/LanguageProvider";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "@/components/LanguageToggle";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mizan — Faizsiz finansal kararlar için doğru platform" },
      {
        name: "description",
        content:
          "Mizan: Islamic personal and SME finance platform. Compare interest-free options, calculate zakat, analyze contracts. Bilingual TR/EN.",
      },
      { property: "og:title", content: "Mizan — Islamic Finance Platform" },
      {
        property: "og:description",
        content: "Compare interest-free options, calculate zakat, analyze contracts.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  const { t, lang } = useTranslation();

  const features = [
    { icon: Scale, title: t("feat1"), desc: t("feat1D") },
    { icon: Calculator, title: t("feat2"), desc: t("feat2D") },
    { icon: FileText, title: t("feat3"), desc: t("feat3D") },
    { icon: Building2, title: t("feat4"), desc: t("feat4D") },
    { icon: Globe, title: t("feat5"), desc: t("feat5D") },
    { icon: Shield, title: t("feat6"), desc: t("feat6D") },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 flex items-center justify-between border-b bg-background/80 px-6 py-4 backdrop-blur">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-semibold">
            M
          </div>
          <span className="font-semibold">Mizan</span>
        </Link>
        <div className="flex items-center gap-3">
          <LanguageToggle />
          <Button asChild size="sm">
            <Link to="/onboarding">
              {t("startFree")} <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-secondary/60 to-background" />
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-2 md:items-center md:py-28">
          <div>
            <Badge className="mb-4 bg-gold/20 text-foreground border border-gold/40 hover:bg-gold/25">
              {lang === "tr" ? "Bireysel & KOBİ" : "Individual & SME"}
            </Badge>
            <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
              {t("heroHeadline")}
            </h1>
            <p className="mt-5 text-lg text-muted-foreground">{t("heroSub")}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/onboarding">
                  {t("startFree")} <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/onboarding">{t("seeDemo")}</Link>
              </Button>
            </div>
          </div>

          {/* Mock dashboard preview */}
          <div className="rounded-2xl border bg-background p-3 shadow-soft-hover">
            <div className="rounded-xl bg-secondary/60 p-4">
              <div className="mb-3 flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-destructive/70" />
                <div className="h-2 w-2 rounded-full bg-warning/70" />
                <div className="h-2 w-2 rounded-full bg-success/70" />
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="rounded-lg border bg-background p-3 shadow-soft">
                    <div className="flex items-start justify-between">
                      <div className="h-2 w-20 rounded bg-muted" />
                      <Badge className="bg-gold/15 text-foreground border border-gold/40 text-[9px]">
                        {lang === "tr" ? "Uygun" : "Fits"}
                      </Badge>
                    </div>
                    <div className="mt-3 h-1.5 w-full rounded bg-muted" />
                    <div className="mt-2 h-1.5 w-3/4 rounded bg-muted" />
                    <div className="mt-3 grid grid-cols-3 gap-1.5">
                      <div className="h-6 rounded bg-secondary" />
                      <div className="h-6 rounded bg-secondary" />
                      <div className="h-6 rounded bg-secondary" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-semibold tracking-tight">{t("features")}</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {features.map((f) => (
            <Card key={f.title} className="p-6 shadow-soft hover:shadow-soft-hover transition-base">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-secondary text-primary">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold">{f.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{f.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-secondary/40 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-12 text-center text-3xl font-semibold tracking-tight">
            {t("howItWorks")}
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { n: "01", title: t("step1Title"), desc: t("step1Desc") },
              { n: "02", title: t("step2Title"), desc: t("step2Desc") },
              { n: "03", title: t("step3Title"), desc: t("step3Desc") },
            ].map((s) => (
              <div key={s.n} className="rounded-xl border bg-background p-6 shadow-soft">
                <div className="text-3xl font-semibold text-primary">{s.n}</div>
                <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="mb-12 text-center text-3xl font-semibold tracking-tight">{t("pricing")}</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-8 shadow-soft">
            <h3 className="text-xl font-semibold">{t("free")}</h3>
            <p className="mt-2 text-3xl font-semibold">0 ₺</p>
            <p className="mt-3 text-sm text-muted-foreground">{t("freeFeatures")}</p>
            <Button asChild variant="outline" className="mt-6 w-full">
              <Link to="/onboarding">{t("startFree")}</Link>
            </Button>
          </Card>
          <Card className="relative p-8 shadow-soft-hover border-primary/40">
            <Badge className="absolute -top-2 right-6 bg-gold text-foreground border-0">
              Premium
            </Badge>
            <h3 className="text-xl font-semibold">{t("premium")}</h3>
            <p className="mt-2 text-3xl font-semibold">{t("pricePremium")}</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {t("premiumFeatures").split(", ").map((it) => (
                <li key={it} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-success" /> {it}
                </li>
              ))}
            </ul>
            <Button asChild className="mt-6 w-full">
              <Link to="/onboarding">{t("tryFree")}</Link>
            </Button>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-secondary/40 py-10">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground text-sm font-semibold">
                M
              </div>
              <span className="font-semibold">Mizan</span>
            </div>
            <LanguageToggle />
          </div>
          <p className="mt-6 text-xs text-muted-foreground leading-relaxed">
            {t("disclaimerLong")}
          </p>
        </div>
      </footer>
    </div>
  );
}
