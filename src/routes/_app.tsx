import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { TopBar } from "@/components/TopBar";
import { MobileNav } from "@/components/MobileNav";

export const Route = createFileRoute("/_app")({
  beforeLoad: () => {
    if (typeof window !== "undefined") {
      const t = localStorage.getItem("mizan_user_type");
      if (t !== "individual" && t !== "sme") {
        throw redirect({ to: "/onboarding" });
      }
    }
  },
  component: AppLayout,
});

function AppLayout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <SidebarInset className="flex flex-1 flex-col">
          <TopBar />
          <main className="flex-1 p-4 pb-24 md:p-8 md:pb-8">
            <Outlet />
          </main>
          <MobileNav />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
