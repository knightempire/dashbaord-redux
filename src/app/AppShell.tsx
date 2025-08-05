"use client";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { usePathname } from "next/navigation";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showShell = pathname === "/dashboard" || pathname === "/employees";
  return (
    <div className="min-h-screen w-full bg-white">
      {showShell ? (
        <div className="flex w-full min-h-screen">
          <div className="h-full" style={{ width: 240, minWidth: 240, maxWidth: 240 }}>
            <Sidebar />
          </div>
          <div className="flex-1 flex flex-col" style={{ minWidth: 0 }}>
            <div className="w-full" style={{ height: 64, position: 'fixed', left: 260, right: 0, top: 0, zIndex: 10 }}>
              <Navbar />
            </div>
            <main className="flex-1 bg-white p-4" style={{ paddingTop: 72, marginLeft: 20 }}>
              {children}
            </main>
          </div>
        </div>
      ) : (
        <main className="min-h-screen w-full bg-white">{children}</main>
      )}
    </div>
  );
}
