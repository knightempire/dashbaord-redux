
"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { HelpCircle } from "lucide-react";
import { EmployeeTableRow } from "./EmployeeTableRow";
import { User } from './types';
import { useState } from "react";

type EmployeeTableProps = {
    users: User[];
    loading: boolean;
    activeTab: 'all' | 'deleted';
    searchQuery: string;
    onEdit: (employee: User) => void;
    onDelete: (employee: User) => void;
    deletedUsers: User[];
    deletedPage: number;
    deletedLimit: number;
};

export function EmployeeTable({ users, loading, activeTab, searchQuery, onEdit, onDelete, deletedUsers, deletedPage, deletedLimit }: EmployeeTableProps) {
    const [actionMenuId, setActionMenuId] = useState<number | null>(null);

    const filteredUsers = users.filter(emp => {
        if (!searchQuery.trim()) return true;
        const q = searchQuery.trim().toLowerCase();
        return (
            (emp.firstName && emp.firstName.toLowerCase().includes(q)) ||
            (emp.lastName && emp.lastName.toLowerCase().includes(q)) ||
            (emp.email && emp.email.toLowerCase().includes(q)) ||
            (emp.id && String(emp.id).toLowerCase().includes(q)) ||
            (emp.company?.title && emp.company.title.toLowerCase().includes(q)) ||
            (emp.company?.department && emp.company.department.toLowerCase().includes(q)) ||
            (emp.company?.name && emp.company.name.toLowerCase().includes(q))
        );
    });

    return (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow className="bg-[#FAFBFB]">
                        <TableHead className="w-8 pl-6"><input type="checkbox" className="accent-gray-500 w-4 h-4" /></TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Employee ID</TableHead>
                        <TableHead><span className="flex items-center gap-1">Role<HelpCircle size={20} strokeWidth={2} className="text-gray-400 cursor-pointer" /></span></TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Teams</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {activeTab === 'all' ? (
                        loading ? (
                            <TableRow><TableCell colSpan={7} className="text-center py-8">Loading...</TableCell></TableRow>
                        ) : (
                            filteredUsers.map((emp) => (
                                <EmployeeTableRow key={emp.id} employee={emp} activeTab={activeTab} actionMenuId={actionMenuId} setActionMenuId={setActionMenuId} onEdit={onEdit} onDelete={onDelete} />
                            ))
                        )
                    ) : (
                        deletedUsers.length === 0 ? (
                            <TableRow><TableCell colSpan={7} className="text-center py-8">No deleted employees.</TableCell></TableRow>
                        ) : (
                            deletedUsers.slice((deletedPage - 1) * deletedLimit, deletedPage * deletedLimit).map((emp) => (
                                <EmployeeTableRow key={emp.id} employee={emp} activeTab={activeTab} actionMenuId={actionMenuId} setActionMenuId={setActionMenuId} onEdit={onEdit} onDelete={onDelete} />
                            ))
                        )
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
