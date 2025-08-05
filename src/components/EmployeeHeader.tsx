
"use client";

import { Button } from "@/components/ui/button";
import { HelpCircle, Download, Plus } from "lucide-react";

type EmployeeHeaderProps = {
    activeTab: 'all' | 'deleted';
    totalCount: number;
    deletedCount: number;
    onNewEmployeeClick: () => void;
};

export function EmployeeHeader({ activeTab, totalCount, deletedCount, onNewEmployeeClick }: EmployeeHeaderProps) {
    return (
        <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-[#1a253c]">
                    {activeTab === 'all' ? 'Employees' : 'Deleted Employees'}
                </span>
                <HelpCircle size={20} strokeWidth={2} className="text-gray-400 cursor-pointer" />
                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#faf7fb] text-[#b71c1c] text-xs font-semibold">
                    {activeTab === 'all' ? totalCount : deletedCount}
                </span>
            </div>
            <div className="flex gap-2">
                <Button variant="outline" className="flex items-center gap-2 font-medium">
                    <Download size={16} strokeWidth={2} className="text-[#1a253c]" />
                    Export
                </Button>
                <Button
                    className="bg-[#1a253c] text-white flex items-center gap-2 font-medium relative"
                    onClick={onNewEmployeeClick}
                >
                    <span className="relative inline-flex items-center justify-center">
                        <Plus size={22} strokeWidth={2} className="text-white" />
                    </span>
                    New Employee
                </Button>
            </div>
        </div>
    );
}