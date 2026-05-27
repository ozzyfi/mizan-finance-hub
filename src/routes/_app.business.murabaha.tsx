import { createFileRoute } from "@tanstack/react-router";
import { BusinessView } from "@/components/BusinessView";

export const Route = createFileRoute("/_app/business/murabaha")({
  component: () => <BusinessView variant="murabaha" />,
});
