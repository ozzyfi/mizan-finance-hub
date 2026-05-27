import { createFileRoute } from "@tanstack/react-router";
import { BusinessView } from "@/components/BusinessView";

export const Route = createFileRoute("/_app/business/")({
  head: () => ({ meta: [{ title: "HelalYol — KOBİ Finansmanı" }] }),
  component: () => <BusinessView variant="general" />,
});
