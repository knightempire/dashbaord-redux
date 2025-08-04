
import EmployeeTable from "@/components/EmployeeTable";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-white">
      {/* Main content, with left margin to avoid sidebar and top padding for navbar */}
      <main className="flex-1 p-8 pt-24 ml-64">
        <EmployeeTable />
      </main>
    </div>
  );
}
