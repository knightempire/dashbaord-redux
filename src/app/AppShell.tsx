"use client";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { usePathname } from "next/navigation";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <>
      {pathname === "/dashboard" && <Sidebar />}
      {pathname === "/dashboard" && <Navbar />}
      <div className="min-h-screen flex flex-col">
        {children}
      </div>
    </>
  );
}
