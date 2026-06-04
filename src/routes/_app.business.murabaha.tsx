import { createFileRoute } from "@tanstack/react-router";
import { BusinessView } from "@/components/BusinessView";
import { PaywallGate } from "@/components/PaywallGate";

export const Route = createFileRoute("/_app/business/murabaha")({
  component: () => (
    <PaywallGate featureName="KOBİ Finansmanı — Murabaha">
      <BusinessView variant="murabaha" />
    </PaywallGate>
  ),
});
