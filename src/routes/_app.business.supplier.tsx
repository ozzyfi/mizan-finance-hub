import { createFileRoute } from "@tanstack/react-router";
import { BusinessView } from "@/components/BusinessView";
import { PaywallGate } from "@/components/PaywallGate";

export const Route = createFileRoute("/_app/business/supplier")({
  component: () => (
    <PaywallGate featureName="KOBİ Finansmanı — Tedarikçi">
      <BusinessView variant="supplier" />
    </PaywallGate>
  ),
});
