// /app/employees/components/EmployeeTabs.tsx
"use client";

type EmployeeTabsProps = {
    activeTab: 'all' | 'deleted';
    setActiveTab: (tab: 'all' | 'deleted') => void;
};

export function EmployeeTabs({ activeTab, setActiveTab }: EmployeeTabsProps) {
    return (
        <div className="flex gap-8 text-lg font-medium mb-2 mt-4">
            <button
                className={activeTab === 'all' ? "text-[#1a253c] border-b-2 border-[#1a253c] pb-1" : "text-[#6b7280] pb-1"}
                onClick={() => setActiveTab('all')}
            >
                All Employees
            </button>
            <button
                className={activeTab === 'deleted' ? "text-[#1a253c] border-b-2 border-[#1a253c] pb-1" : "text-[#6b7280] pb-1"}
                onClick={() => setActiveTab('deleted')}
            >
                Deleted Employees
            </button>
        </div>
    );
}