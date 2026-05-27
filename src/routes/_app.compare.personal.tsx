import { createFileRoute } from "@tanstack/react-router";
import { CompareView } from "@/components/CompareView";

export const Route = createFileRoute("/_app/compare/personal")({
  head: () => ({ meta: [{ title: "Mizan — Personal Financing" }] }),
  component: () => <CompareView variant="personal" />,
});
