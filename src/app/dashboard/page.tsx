
"use client";
import EmployeeTable from "@/components/EmployeeTable";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-white">
    
      <main className="flex-1 p-8 pt-24 ml-64">
        <EmployeeTable />
      </main>
    </div>
  );
}
