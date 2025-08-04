"use client";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { usePathname } from "next/navigation";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showShell = pathname === "/dashboard" || pathname === "/employees";
  return (
    <>
      {showShell && <Sidebar />}
      {showShell && <Navbar />}
      <div className="min-h-screen flex flex-col">
        {children}
      </div>
    </>
  );
}
