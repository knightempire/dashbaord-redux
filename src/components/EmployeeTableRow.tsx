
"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from './types';

type EmployeeTableRowProps = {
    employee: User;
    activeTab: 'all' | 'deleted';
    actionMenuId: number | null;
    setActionMenuId: (id: number | null) => void;
    onEdit: (employee: User) => void;
    onDelete: (employee: User) => void;
};

export function EmployeeTableRow({ employee, activeTab, actionMenuId, setActionMenuId, onEdit, onDelete }: EmployeeTableRowProps) {
    return (
        <TableRow className="border-b border-gray-200 align-middle [&>td]:py-4">
            <TableCell className="w-8 pl-6">
                <input type="checkbox" className="accent-gray-500 w-4 h-4" />
            </TableCell>
            <TableCell>
                <div className="flex items-center gap-2">
                    <Avatar>
                        <AvatarImage src={employee.image} />
                        <AvatarFallback className="bg-[#fff2ea] text-[#93312b] font-bold">{employee.firstName[0]}{employee.lastName[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="font-medium">{employee.firstName} {employee.lastName}</div>
                        <div className="text-xs text-muted-foreground">{employee.email}</div>
                    </div>
                </div>
            </TableCell>
            <TableCell>
                <span className="inline-block px-3 py-1 rounded-full bg-gray-100 text-gray-700 font-mono text-sm font-semibold">
                    {employee.id}
                </span>
            </TableCell>
            <TableCell>
                <div>
                    <div>{employee.company?.title || "Employee"}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                        {employee.company?.department || "General"}
                    </div>
                </div>
            </TableCell>
            <TableCell>
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-medium text-xs ${employee.status ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"}`}>
                    <span className={`w-2 h-2 rounded-full ${employee.status ? "bg-green-500" : "bg-red-500"}`}></span>
                    {employee.status ? "Active" : "Inactive"}
                </span>
            </TableCell>
            <TableCell className="flex gap-1 flex-wrap">
                {employee.company?.name ? (() => {
                    const teams = employee.company.name.split(/,| and | - /i).map(team => team.trim()).filter(Boolean);
                    const shown = teams.slice(0, 2);
                    const hiddenCount = teams.length - shown.length;
                    return (
                        <>
                            {shown.map((team, idx) => (
                                <span key={idx} className={`inline-block px-3 py-1 rounded-full text-gray-700 text-xs font-semibold ${idx === 1 ? 'bg-[#f7e8ef]' : 'bg-[#f2f4f7]'}`}>{team}</span>
                            ))}
                            {hiddenCount > 0 && (
                                <span className="inline-block px-3 py-1 rounded-full bg-[#e0e7ff] text-[#3730a3] text-xs font-semibold">+{hiddenCount}</span>
                            )}
                        </>
                    );
                })() : <span className="inline-block px-3 py-1 rounded-full bg-[#f2f4f7] text-gray-700 text-xs font-semibold">No Team</span>}
            </TableCell>
            <TableCell className="w-8 text-center relative">
                {activeTab === 'all' ? (
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-600 mx-auto" viewBox="0 0 20 20" fill="currentColor" onClick={() => setActionMenuId(employee.id)}>
                            <circle cx="10" cy="4" r="1.5" /><circle cx="10" cy="10" r="1.5" /><circle cx="10" cy="16" r="1.5" />
                        </svg>
                        {actionMenuId === employee.id && (
                            <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[120px]">
                                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-[#1a253c]" onClick={() => { onEdit(employee); setActionMenuId(null); }}>Edit</button>
                                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-600" onClick={() => { onDelete(employee); setActionMenuId(null); }}>Delete</button>
                            </div>
                        )}
                    </>
                ) : (
                    <button className="p-2 rounded-full hover:bg-gray-100" onClick={() => onEdit(employee)} aria-label="Edit">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-600 mx-auto" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M15.232 5.232a2.5 2.5 0 0 1 0 3.536l-7.5 7.5a2.5 2.5 0 0 1-1.061.658l-3 1a1 1 0 0 1-1.263-1.263l1-3a2.5 2.5 0 0 1 .658-1.061l7.5-7.5a2.5 2.5 0 0 1 3.536 0z" />
                        </svg>
                    </button>
                )}
            </TableCell>
        </TableRow>
    );
}