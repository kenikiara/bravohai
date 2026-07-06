import { Sidebar } from "@/components/dashboard/Sidebar";
import { MobileBar } from "@/components/dashboard/MobileBar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row bg-ink">
      <MobileBar />
      <Sidebar />
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
}
