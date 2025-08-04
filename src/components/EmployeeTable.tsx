"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// Removed unused Badge import
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { HelpCircle } from "lucide-react";
import { Download, CircleDashed, Plus } from "lucide-react";

import React, { useState, useEffect } from "react";
import axios from "axios";

export default function EmployeeTable() {
    const [activeTab, setActiveTab] = useState<'all' | 'deleted'>('all');
    const [users, setUsers] = useState<any[]>([]);
    const [deletedUsers, setDeletedUsers] = useState<any[]>([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [loading, setLoading] = useState(false);
    // Modal state
    const [showModal, setShowModal] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [modalError, setModalError] = useState("");
    const [modalSuccess, setModalSuccess] = useState("");
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [editModalError, setEditModalError] = useState("");
    const [actionMenuId, setActionMenuId] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    type EditModalType = {
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        image: string;
        status: boolean;
        company: {
            title: string;
            department: string;
            name: string;
        };
        role: string;
        department: string;
        teams: string;
    };
    const [editModal, setEditModal] = useState<EditModalType | null>(null);
    const [deletedPage, setDeletedPage] = useState(1);
    const deletedLimit = 10;

    useEffect(() => {
        setLoading(true);
        axios.get(`https://dummyjson.com/users?limit=${limit}&skip=${(page-1)*limit}`)
            .then(res => {
                // Add random status to each user
                const usersWithStatus = res.data.users.map((u: any) => ({
                    ...u,
                    status: Math.random() > 0.5 // true = Active, false = Inactive
                }));
                setUsers(usersWithStatus);
                setTotal(res.data.total);
                // Print first 3 users in console for debugging
                console.log("Sample users:", usersWithStatus.slice(0, 3));
            })
            .finally(() => setLoading(false));
    }, [page]);


    // Custom filter icon
function FilterIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
      <rect x="3" y="6" width="16" height="2.2" rx="1.1" fill="#6B7280" />
      <rect x="5" y="10" width="12" height="2.2" rx="1.1" fill="#6B7280" />
      <rect x="7" y="14" width="8" height="2.2" rx="1.1" fill="#6B7280" />
      <rect x="9" y="18" width="4" height="2.2" rx="1.1" fill="#6B7280" />
    </svg>
  );
}


    return (
        <div>
            {/* Header and Tabs */}
            <div className="mb-2">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-[#1a253c]">
                            {activeTab === 'all' ? 'Employees' : 'Deleted Employees'}
                        </span>
                        <HelpCircle size={20} strokeWidth={2} className="text-gray-400 cursor-pointer" />
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#faf7fb] text-[#b71c1c] text-xs font-semibold">
                            {activeTab === 'all' ? total : deletedUsers.length}
                        </span>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" className="flex items-center gap-2 font-medium">
                            <Download size={16} strokeWidth={2} className="text-[#1a253c]" />
                            Export
                        </Button>
                        <Button
                            className="bg-[#1a253c] text-white flex items-center gap-2 font-medium relative"
                            onClick={() => setShowModal(true)}
                        >
                            <span className="relative inline-flex items-center justify-center">
                                <Plus size={22} strokeWidth={2} className="text-white" />
                            </span>
                            New Employee
                        </Button>
                    </div>
                </div>
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
            </div>
            <div className="mb-4">
                <div className="flex items-center gap-2 h-16 border bg-white rounded-lg px-6 py-4 shadow-sm">
                    <div className="relative w-full">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                            <HiMagnifyingGlass className="w-5 h-5" />
                        </span>
                        <Input 
                            placeholder="Search Employee by name, role, ID or any related keywords" 
                            className="w-full h-12 pl-10 border-none shadow-none focus:border-none focus:ring-0 focus:outline-none focus-visible:border-none focus-visible:ring-0 focus-visible:outline-none active:border-none active:ring-0 active:outline-none hover:border-none hover:ring-0 hover:outline-none ring-0 outline-none" 
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <Button variant="outline" className="h-10 flex items-center gap-2">
                        <FilterIcon />
                        Filter
                    </Button>
                </div>
            </div>
 
            <div className="border border-gray-200 rounded-lg overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-[#FAFBFB]">
                            <TableHead className="w-8 pl-6">
                                <input type="checkbox" className="accent-gray-500 w-4 h-4" />
                            </TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Employee ID</TableHead>
                            <TableHead>
                                <span className="flex items-center gap-1">
                                    Role
                                    <HelpCircle size={20} strokeWidth={2} className="text-gray-400 cursor-pointer" />
                                </span>
                            </TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Teams</TableHead>
                            {/* <TableHead className="w-8 text-center">
                                {activeTab === 'deleted' && (
                                    <span className="text-xs text-[#b71c1c] font-semibold">Deleted: {deletedUsers.length}</span>
                                )}
                            </TableHead> */}
                        </TableRow>
                    </TableHeader>
                    {activeTab === 'all' ? (
                        <>
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center py-8">Loading...</TableCell>
                                    </TableRow>
                                ) : users
                                    .filter(emp => {
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
                                    })
                                    .map((emp, i) => (
                                        <TableRow key={emp.id} className="border-b border-gray-200 align-middle [&>td]:py-4">
                                        <TableCell className="w-8 pl-6">
                                            <input type="checkbox" className="accent-gray-500 w-4 h-4" />
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <div className="relative">
                                                    <Avatar>
                                                        <AvatarImage src={emp.image} />
                                                        <AvatarFallback className="bg-[#fff2ea] text-[#93312b] font-bold">{emp.firstName[0]}{emp.lastName[0]}</AvatarFallback>
                                                    </Avatar>
                                                </div>
                                                <div>
                                                    <div className="font-medium">{emp.firstName} {emp.lastName}</div>
                                                    <div className="text-xs text-muted-foreground">{emp.email}</div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <span className="inline-block px-3 py-1 rounded-full bg-gray-100 text-gray-700 font-mono text-sm font-semibold">
                                                {emp.id}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <div>
                                                <div>{emp.company?.title || "Employee"}</div>
                                                <div className="text-xs text-muted-foreground mt-1">
                                                    {emp.company?.department || "General"}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <span
                                                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-medium text-xs ${emp.status === true
                                                        ? "bg-green-50 text-green-700"
                                                        : "bg-red-50 text-red-600"
                                                    }`}
                                            >
                                                <span
                                                    className={`w-2 h-2 rounded-full ${emp.status === true ? "bg-green-500" : "bg-red-500"}`}
                                                ></span>
                                                {emp.status === true ? "Active" : "Inactive"}
                                            </span>
                                        </TableCell>
                                        <TableCell className="flex gap-1 flex-wrap">
                                    {/* Show only first 2 team badges, then a '+N' badge for the rest */}
                                    {emp.company?.name
                                        ? (() => {
                                            const teams = emp.company.name.split(/,| and | - /i).map((team: string) => team.trim()).filter(Boolean);
                                            const shown = teams.slice(0, 2);
                                            const hiddenCount = teams.length - shown.length;
                                            return (
                                                <>
                                                    {shown.map((team, idx) => (
                                                        <span
                                                            key={idx}
                                                            className={`inline-block px-3 py-1 rounded-full text-gray-700 text-xs font-semibold ${idx === 1 ? 'bg-[#f7e8ef]' : 'bg-[#f2f4f7]'}`}
                                                        >
                                                            {team}
                                                        </span>
                                                    ))}
                                                    {hiddenCount > 0 && (
                                                        <span className="inline-block px-3 py-1 rounded-full bg-[#e0e7ff] text-[#3730a3] text-xs font-semibold">
                                                            +{hiddenCount}
                                                        </span>
                                                    )}
                                                </>
                                            );
                                        })()
                                        : <span className="inline-block px-3 py-1 rounded-full bg-[#f2f4f7] text-gray-700 text-xs font-semibold">No Team</span>
                                    }
                                        </TableCell>
                                        <TableCell className="w-8 text-center relative">
                                            {/* 3-dot icon for actions, vertical at far right */}
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-600 mx-auto"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                onClick={() => setActionMenuId(emp.id)}
                                            >
                                                <circle cx="10" cy="4" r="1.5" />
                                                <circle cx="10" cy="10" r="1.5" />
                                                <circle cx="10" cy="16" r="1.5" />
                                            </svg>
                                            {actionMenuId === emp.id && (
                                                <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[120px]">
                                                    <button
                                                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-[#1a253c]"
                                                        onClick={() => {
                                                            setEditModal({
                                                                id: emp.id,
                                                                firstName: emp.firstName,
                                                                lastName: emp.lastName,
                                                                email: emp.email || "",
                                                                image: emp.image || "",
                                                                status: emp.status,
                                                                company: {
                                                                    title: emp.company?.title || "",
                                                                    department: emp.company?.department || "",
                                                                    name: emp.company?.name || ""
                                                                },
                                                                role: emp.company?.title || "",
                                                                department: emp.company?.department || "",
                                                                teams: emp.company?.name || ""
                                                            });
                                                            setActionMenuId(null);
                                                        }}
                                                    >Edit</button>
                                                    <button
                                                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-600"
                                                        onClick={() => {
                                                            setDeletedUsers([emp, ...deletedUsers]);
                                                            setUsers(users.filter(u => u.id !== emp.id));
                                                            setTotal(t => t - 1);
                                                            setActionMenuId(null);
                                                        }}
                                                    >Delete</button>
                                                </div>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </>
                    ) : (
                        <>
                        <TableBody>
                            {deletedUsers.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center py-8">No deleted employees.</TableCell>
                                </TableRow>
                            ) : deletedUsers.slice((deletedPage-1)*deletedLimit, deletedPage*deletedLimit).map((emp, i) => (
                                <TableRow key={emp.id} className="border-b border-gray-200 align-middle [&>td]:py-4">
                                    <TableCell className="w-8 pl-6">
                                        <input type="checkbox" className="accent-gray-500 w-4 h-4" />
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <div className="relative">
                                                <Avatar>
                                                    <AvatarImage src={emp.image} />
                                                    <AvatarFallback className="bg-[#fff2ea] text-[#93312b] font-bold">{emp.firstName[0]}{emp.lastName[0]}</AvatarFallback>
                                                </Avatar>
                                            </div>
                                            <div>
                                                <div className="font-medium">{emp.firstName} {emp.lastName}</div>
                                                <div className="text-xs text-muted-foreground">{emp.email}</div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <span className="inline-block px-3 py-1 rounded-full bg-gray-100 text-gray-700 font-mono text-sm font-semibold">
                                            {emp.id}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <div>
                                            <div>{emp.company?.title || "Employee"}</div>
                                            <div className="text-xs text-muted-foreground mt-1">
                                                {emp.company?.department || "General"}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <span
                                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-medium text-xs ${emp.status === true
                                                    ? "bg-green-50 text-green-700"
                                                    : "bg-red-50 text-red-600"
                                                }`}
                                        >
                                            <span
                                                className={`w-2 h-2 rounded-full ${emp.status === true ? "bg-green-500" : "bg-red-500"}`}
                                            ></span>
                                            {emp.status === true ? "Active" : "Inactive"}
                                        </span>
                                    </TableCell>
                                    <TableCell className="flex gap-1 flex-wrap">
                                        {emp.company?.name
                                            ? (() => {
                                                const teams = emp.company.name.split(/,| and | - /i).map((team: string) => team.trim()).filter(Boolean);
                                                const shown = teams.slice(0, 2);
                                                const hiddenCount = teams.length - shown.length;
                                                return (
                                                    <>
                                                        {shown.map((team, idx) => (
                                                            <span
                                                                key={idx}
                                                                className={`inline-block px-3 py-1 rounded-full text-gray-700 text-xs font-semibold ${idx === 1 ? 'bg-[#f7e8ef]' : 'bg-[#f2f4f7]'}`}
                                                            >
                                                                {team}
                                                            </span>
                                                        ))}
                                                        {hiddenCount > 0 && (
                                                            <span className="inline-block px-3 py-1 rounded-full bg-[#e0e7ff] text-[#3730a3] text-xs font-semibold">
                                                                +{hiddenCount}
                                                            </span>
                                                        )}
                                                    </>
                                                );
                                            })()
                                            : <span className="inline-block px-3 py-1 rounded-full bg-[#f2f4f7] text-gray-700 text-xs font-semibold">No Team</span>
                                        }
                                    </TableCell>
                                    <TableCell className="w-8 text-center relative">
                                        {/* Only show edit icon in deleted employees, open modal directly */}
                                        <button
                                            className="p-2 rounded-full hover:bg-gray-100"
                                            onClick={() => setEditModal({
                                                id: emp.id,
                                                firstName: emp.firstName,
                                                lastName: emp.lastName,
                                                email: emp.email || "",
                                                image: emp.image || "",
                                                status: emp.status,
                                                company: {
                                                    title: emp.company?.title || "",
                                                    department: emp.company?.department || "",
                                                    name: emp.company?.name || ""
                                                },
                                                role: emp.company?.title || "",
                                                department: emp.company?.department || "",
                                                teams: emp.company?.name || ""
                                            })}
                                            aria-label="Edit"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-600 mx-auto"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path d="M15.232 5.232a2.5 2.5 0 0 1 0 3.536l-7.5 7.5a2.5 2.5 0 0 1-1.061.658l-3 1a1 1 0 0 1-1.263-1.263l1-3a2.5 2.5 0 0 1 .658-1.061l7.5-7.5a2.5 2.5 0 0 1 3.536 0z" />
                                            </svg>
                                        </button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        </>
                    )}
                </Table>
            </div>
            {/* Create Employee Modal (inline, no overlay) */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-40">
                    <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8 relative border border-gray-200">
                        <h2 className="text-xl font-bold mb-2">Create Employee</h2>
                        <p className="text-sm text-gray-500 mb-6">You can create a profile here. Click save when you're done.</p>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                            <input
                                type="text"
                                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1a253c]"
                                value={firstName}
                                onChange={e => setFirstName(e.target.value)}
                                placeholder="First Name"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                            <input
                                type="text"
                                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1a253c]"
                                value={lastName}
                                onChange={e => setLastName(e.target.value)}
                                placeholder="Last Name"
                            />
                        </div>
                        <div className="flex flex-col gap-2 mb-2">
                            {modalError && <span className="text-red-600 text-sm font-medium">{modalError}</span>}
                            {modalSuccess && <span className="text-green-600 text-sm font-medium">{modalSuccess}</span>}
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={() => { setShowModal(false); setModalError(""); setModalSuccess(""); }}>Cancel</Button>
                            <Button
                                className="bg-[#1a253c] text-white"
                                onClick={() => {
                                    setModalError("");
                                    setModalSuccess("");
                                    if (!firstName || !lastName) {
                                        setModalError("Please enter both first and last name.");
                                        return;
                                    }
                                    // Combine names, lowercase, remove spaces
                                    const newName = (firstName + lastName).toLowerCase().replace(/\s+/g, "");
                                    const exists = users.some(emp => {
                                        const empName = ((emp.firstName || "") + (emp.lastName || "")).toLowerCase().replace(/\s+/g, "");
                                        return empName === newName;
                                    });
                                    if (exists) {
                                        setModalError("Employee name already exists.");
                                        return;
                                    }
                                    setUsers([
                                        {
                                            id: Date.now(),
                                            firstName,
                                            lastName,
                                            email: "",
                                            image: "",
                                            status: true,
                                            company: { name: "No Team" }
                                        },
                                        ...users
                                    ]);
                                    setShowSuccessToast(true);
                                    setFirstName("");
                                    setLastName("");
                                    setTimeout(() => {
                                        setShowModal(false);
                                        setShowSuccessToast(false);
                                    }, 2000);
                                }}
                            >
                                Save changes
                            </Button>
                        </div>
                        <button
                            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
                            onClick={() => { setShowModal(false); setModalError(""); setModalSuccess(""); }}
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )}
            {showSuccessToast && (
    <div className="fixed bottom-6 right-6 z-[100] flex items-center gap-3 bg-white border border-green-600 shadow-lg rounded-lg px-5 py-3 min-w-[260px] max-w-xs animate-fadein">
        <svg className="w-6 h-6 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="#e6f4ea" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" stroke="green" />
        </svg>
        <span className="text-green-700 font-medium text-base">Employee saved successfully.</span>
    </div>
)}
            {/* Edit Employee Modal */}
            {editModal && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-40">
        <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8 relative border border-gray-200">
            <h2 className="text-xl font-bold mb-2">Edit Employee</h2>
            {editModalError && <div className="mb-2 text-red-600 text-sm font-medium">{editModalError}</div>}
            <div className="mb-4 grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input
                        type="text"
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1a253c]"
                        value={editModal.firstName}
                        onChange={e => setEditModal({...editModal, firstName: e.target.value})}
                        placeholder="First Name"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input
                        type="text"
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1a253c]"
                        value={editModal.lastName}
                        onChange={e => setEditModal({...editModal, lastName: e.target.value})}
                        placeholder="Last Name"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                        type="email"
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1a253c]"
                        value={editModal.email || ""}
                        onChange={e => setEditModal({...editModal, email: e.target.value})}
                        placeholder="Email"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Employee ID</label>
                    <input
                        type="text"
                        className="w-full border rounded-lg px-3 py-2 bg-gray-100 text-gray-500"
                        value={editModal.id}
                        readOnly
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                    <input
                        type="text"
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1a253c]"
                        value={editModal.role || editModal.company?.title || ""}
                        onChange={e => setEditModal({...editModal, role: e.target.value, company: {...(editModal.company || {}), title: e.target.value}})}
                        placeholder="Role"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                    <input
                        type="text"
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1a253c]"
                        value={editModal.department || editModal.company?.department || ""}
                        onChange={e => setEditModal({...editModal, department: e.target.value, company: {...(editModal.company || {}), department: e.target.value}})}
                        placeholder="Department"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1a253c]"
                        value={editModal.status === true ? "active" : "inactive"}
                        onChange={e => setEditModal({...editModal, status: e.target.value === "active"})}
                    >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Teams</label>
                    <input
                        type="text"
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1a253c]"
                        value={editModal.teams || editModal.company?.name || ""}
                        onChange={e => setEditModal({...editModal, teams: e.target.value, company: {...(editModal.company || {}), name: e.target.value}})}
                        placeholder="Teams (comma, and, or hyphen separated)"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                    <input
                        type="text"
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1a253c]"
                        value={editModal.image || ""}
                        onChange={e => setEditModal({...editModal, image: e.target.value})}
                        placeholder="Image URL"
                    />
                </div>
            </div>
            <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => { setEditModal(null); setEditModalError(""); }}>Cancel</Button>
                <Button
                    className="bg-[#1a253c] text-white"
                    onClick={() => {
                        setEditModalError("");
                        if (!editModal.firstName || !editModal.lastName) {
                            setEditModalError("Please enter both first and last name.");
                            return;
                        }
                        // Combine names, lowercase, remove spaces
                        const newName = (editModal.firstName + editModal.lastName).toLowerCase().replace(/\s+/g, "");
                        const exists = users.some(emp => {
                            const empName = ((emp.firstName || "") + (emp.lastName || "")).toLowerCase().replace(/\s+/g, "");
                            return empName === newName && emp.id !== editModal.id;
                        });
                        if (exists) {
                            setEditModalError("Employee name already exists.");
                            return;
                        }
                        setUsers(users.map(u =>
                            u.id === editModal.id
                                ? {
                                    ...u,
                                    firstName: editModal.firstName,
                                    lastName: editModal.lastName,
                                    email: editModal.email,
                                    image: editModal.image,
                                    status: editModal.status,
                                    company: {
                                        ...(u.company || {}),
                                        title: editModal.role || u.company?.title,
                                        department: editModal.department || u.company?.department,
                                        name: editModal.teams || u.company?.name
                                    }
                                }
                                : u
                        ));
                        setShowSuccessToast(true);
                        setTimeout(() => {
                            setEditModal(null);
                            setShowSuccessToast(false);
                        }, 2000);
                    }}
                >
                    Save changes
                </Button>
            </div>
            <button
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
                onClick={() => { setEditModal(null); setEditModalError(""); }}
            >
                &times;
            </button>
        </div>
    </div>
)}
            {/* Pagination controls OUTSIDE the Table for both tabs, and only show for current tab */}
{activeTab === 'all' && (
    <div className="flex justify-between items-center mt-6">
        <Button
            variant="outline"
            className="flex items-center gap-1"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
        >
            <HiChevronLeft className="w-4 h-4" /> Previous
        </Button>
        <div className="flex gap-1 items-center">
            {/* Proper pagination logic */}
            {(() => {
                const totalPages = Math.ceil(total / limit);
                const pages: number[] = [];
                if (totalPages <= 7) {
                    for (let i = 1; i <= totalPages; i++) pages.push(i);
                } else {
                    if (page <= 4) {
                        pages.push(1, 2, 3, 4, 5, -1, totalPages);
                    } else if (page >= totalPages - 3) {
                        pages.push(1, -1, totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
                    } else {
                        pages.push(1, -1, page - 1, page, page + 1, -1, totalPages);
                    }
                }
                return pages.map((n, idx) =>
                    n === -1 ? (
                        <span key={"ellipsis-" + idx} className="px-2 text-gray-400 font-bold">...</span>
                    ) : (
                        <Button
                            key={n}
                            variant={n === page ? undefined : "ghost"}
                            size="sm"
                            className={n === page ? "bg-gray-100 text-gray-800 font-bold border border-gray-300" : ""}
                            onClick={() => setPage(n)}
                        >
                            {n}
                        </Button>
                    )
                );
            })()}
        </div>
        <Button
            variant="outline"
            className="flex items-center gap-1"
            onClick={() => setPage((p) => Math.min(Math.ceil(total / limit), p + 1))}
            disabled={page >= Math.ceil(total / limit)}
        >
            Next <HiChevronRight className="w-4 h-4" />
        </Button>
    </div>
)}
{activeTab === 'deleted' && (
    <div className="flex justify-between items-center mt-6">
        <Button
            variant="outline"
            className="flex items-center gap-1"
            onClick={() => setDeletedPage((p) => Math.max(1, p - 1))}
            disabled={deletedPage === 1}
        >
            <HiChevronLeft className="w-4 h-4" /> Previous
        </Button>
        <div className="flex gap-1 items-center">
            {/* Pagination for deleted employees */}
            {(() => {
                const totalDeletedPages = Math.ceil(deletedUsers.length / deletedLimit);
                const pages = [];
                if (totalDeletedPages <= 7) {
                    for (let i = 1; i <= totalDeletedPages; i++) pages.push(i);
                } else {
                    if (deletedPage <= 4) {
                        pages.push(1, 2, 3, 4, 5, -1, totalDeletedPages);
                    } else if (deletedPage >= totalDeletedPages - 3) {
                        pages.push(1, -1, totalDeletedPages - 4, totalDeletedPages - 3, totalDeletedPages - 2, totalDeletedPages - 1, totalDeletedPages);
                    } else {
                        pages.push(1, -1, deletedPage - 1, deletedPage, deletedPage + 1, -1, totalDeletedPages);
                    }
                }
                return pages.map((n, idx) =>
                    n === -1 ? (
                        <span key={"ellipsis-" + idx} className="px-2 text-gray-400 font-bold">...</span>
                    ) : (
                        <Button
                            key={n}
                            variant={n === deletedPage ? undefined : "ghost"}
                            size="sm"
                            className={n === deletedPage ? "bg-gray-100 text-gray-800 font-bold border border-gray-300" : ""}
                            onClick={() => setDeletedPage(n)}
                        >
                            {n}
                        </Button>
                    )
                );
            })()}
            {/* 43-dot icon for deleted employees */}
            <span className="ml-2 text-gray-400 text-2xl font-bold">&#8230;</span>
        </div>
        <Button
            variant="outline"
            className="flex items-center gap-1"
            onClick={() => setDeletedPage((p) => Math.min(Math.ceil(deletedUsers.length / deletedLimit), p + 1))}
            disabled={deletedPage >= Math.ceil(deletedUsers.length / deletedLimit)}
        >
            Next <HiChevronRight className="w-4 h-4" />
        </Button>
    </div>
)}
        </div>
    );
}
