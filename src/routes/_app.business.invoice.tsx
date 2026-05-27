import { createFileRoute } from "@tanstack/react-router";
import { BusinessView } from "@/components/BusinessView";

export const Route = createFileRoute("/_app/business/invoice")({
  component: () => <BusinessView variant="invoice" />,
});
