import { createFileRoute } from "@tanstack/react-router";
import { BusinessView } from "@/components/BusinessView";
import { PaywallGate } from "@/components/PaywallGate";

export const Route = createFileRoute("/_app/business/invoice")({
  component: () => (
    <PaywallGate featureName="KOBİ Finansmanı — Fatura">
      <BusinessView variant="invoice" />
    </PaywallGate>
  ),
});
