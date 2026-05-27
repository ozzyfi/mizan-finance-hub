import { createFileRoute } from "@tanstack/react-router";
import { CompareView } from "@/components/CompareView";

export const Route = createFileRoute("/_app/compare/vehicle")({
  head: () => ({ meta: [{ title: "Mizan — Vehicle Financing" }] }),
  component: () => <CompareView variant="vehicle" />,
});
