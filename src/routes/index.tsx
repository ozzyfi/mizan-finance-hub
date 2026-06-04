import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, FileText } from "lucide-react";
import { useTranslation } from "@/i18n/LanguageProvider";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "@/components/LanguageToggle";
import { Badge } from "@/components/ui/badge";
import { HeroMockCard } from "@/components/HeroMockCard";
import { PrimaryActionCards } from "@/components/PrimaryActionCards";
import { Footer } from "@/components/Footer";
import { Logo } from "@/components/Logo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HelalYol — Kredi değil, faizsiz yol bul." },
      {
        name: "description",
        content:
          "HelalYol; ev, araba ve KOBİ finansmanı için katılım bankası, tasarruf finansmanı, satıcı vadeli satış ve leasing gibi faizsiz seçenekleri karşılaştırır.",
      },
      { property: "og:title", content: "HelalYol — Faizsiz finansman karşılaştırma" },
      {
        property: "og:description",
        content:
          "Ev, araba ve KOBİ finansmanı için faizsiz seçenekleri ve sözleşme risklerini karşılaştır.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  const { t, lang } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 flex items-center justify-between border-b bg-background/85 px-6 py-3.5 backdrop-blur">
        <Link to="/" className="flex items-center" aria-label="HelalYol">
          <Logo variant="horizontal" className="h-7 sm:h-8 max-w-[180px]" />
        </Link>
        <div className="flex items-center gap-2">
          <LanguageToggle />
          <Button asChild size="sm">
            <Link to="/onboarding">
              {lang === "tr" ? "Ücretsiz Kaydol" : "Sign up free"}{" "}
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-secondary/50 to-background" />
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-2 md:items-center md:py-24">
          <div>
            <Badge className="mb-4 bg-primary/10 text-primary border border-primary/30 hover:bg-primary/15">
              {lang === "tr" ? "Bireysel & KOBİ" : "Individual & SME"}
            </Badge>
            <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
              {t("heroHeadline")}
            </h1>
            <p className="mt-5 text-base md:text-lg text-muted-foreground">{t("heroSub")}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/onboarding">
                  {t("ctaRoadmap")} <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/contract">
                  <FileText className="mr-1 h-4 w-4" /> {t("ctaContract")}
                </Link>
              </Button>
            </div>
          </div>

          <HeroMockCard />
        </div>
      </section>

      {/* Main choice */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-semibold tracking-tight">{t("whatToDo")}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{t("brandShortDesc")}</p>
        </div>
        <PrimaryActionCards />
      </section>

      <Footer />
    </div>
  );
}
