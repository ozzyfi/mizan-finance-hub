import { createFileRoute } from "@tanstack/react-router";
import { CompareView } from "@/components/CompareView";

export const Route = createFileRoute("/_app/compare/home")({
  head: () => ({ meta: [{ title: "Mizan — Home Financing" }] }),
  component: () => <CompareView variant="home" />,
});
