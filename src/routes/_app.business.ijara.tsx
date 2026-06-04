import { createFileRoute } from "@tanstack/react-router";
import { BusinessView } from "@/components/BusinessView";
import { PaywallGate } from "@/components/PaywallGate";

export const Route = createFileRoute("/_app/business/ijara")({
  component: () => (
    <PaywallGate featureName="KOBİ Finansmanı — Ijara">
      <BusinessView variant="ijara" />
    </PaywallGate>
  ),
});
