import { createFileRoute } from "@tanstack/react-router";
import { BusinessView } from "@/components/BusinessView";
import { PaywallGate } from "@/components/PaywallGate";

export const Route = createFileRoute("/_app/business/")({
  head: () => ({ meta: [{ title: "HelalYol — KOBİ Finansmanı" }] }),
  component: () => (
    <PaywallGate featureName="KOBİ Finansmanı">
      <BusinessView variant="general" />
    </PaywallGate>
  ),
});
