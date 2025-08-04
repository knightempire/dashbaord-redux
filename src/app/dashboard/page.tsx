
"use client";
import EmployeeTable from "@/components/EmployeeTable";
import { useEffect } from "react";

export default function Dashboard() {


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/";
    } else {
      console.log("Dashboard token:", token);
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <main className="flex-1 p-8 pt-24 ml-64">
        <EmployeeTable />
      </main>
    </div>
  );
}
