import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useTranslation } from "@/i18n/LanguageProvider";
import { useApp } from "@/state/AppContext";
import { LanguageToggle } from "@/components/LanguageToggle";
import { DisclaimerBox } from "@/components/DisclaimerBox";

export const Route = createFileRoute("/_app/settings")({
  head: () => ({ meta: [{ title: "Mizan — Settings" }] }),
  component: Settings,
});

function Settings() {
  const { t, lang } = useTranslation();
  const { userType, setUserType } = useApp();
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">{t("settingsTitle")}</h1>

      <Card className="p-6 shadow-soft">
        <Label className="text-xs uppercase text-muted-foreground">{t("language")}</Label>
        <div className="mt-2">
          <LanguageToggle />
        </div>
      </Card>

      <Card className="p-6 shadow-soft">
        <Label className="text-xs uppercase text-muted-foreground">{t("profileType")}</Label>
        <p className="mt-2 text-sm">
          {userType === "sme" ? t("sme") : t("individual")}{" "}
          <span className="text-muted-foreground text-xs">({lang === "tr" ? "aktif" : "active"})</span>
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setUserType(null);
              navigate({ to: "/onboarding" });
            }}
          >
            {t("switchProfile")}
          </Button>
        </div>
      </Card>

      <DisclaimerBox variant="long" />
    </div>
  );
}
