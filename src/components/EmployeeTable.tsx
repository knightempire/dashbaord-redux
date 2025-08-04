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
import React from "react";

const employees = [
    {
        name: "Tanner Fincho",
        email: "tannerfincher@gmail.com",
        id: "#25346GHJY7T6",
        role: "Product Designer",
        status: "Active",
        teams: ["Marketing", "Design"],
        avatar: "",
    },
    {
        name: "Emoto Winner",
        email: "emotewinner@gmail.com",
        id: "#25346GHJY7T6",
        role: "Product Designer",
        status: "Active",
        teams: ["Engineering", "Design", "Product","test","development"],
        avatar: "",
    },
    {
        name: "Tassy Onnah",
        email: "tassyonnah@gmail.com",
        id: "#25346GHJY7T6",
        role: "Product Designer",
        status: "Active",
        teams: ["Product"],
        avatar: "",
    },
    {
        name: "James Muriel",
        email: "jamesmuriel@ahoten.finance",
        id: "#25346GHJY7T6",
        role: "Product Designer",
        status: "Inactive",
        teams: ["Product", "Design","Product"],
        avatar: "",
    },
    {
        name: "Emoto Winner",
        email: "emotewinner@gmail.com",
        id: "#25346GHJY7T6",
        role: "Backend Engineer",
        status: "Active",
        teams: ["Engineering", "Design", "Product","test","development","a","b","c"],
        avatar: "",
    },
    {
        name: "Tassy Onnah",
        email: "tassyonnah@gmail.com",
        id: "#25346GHJY7T6",
        role: "Backend Engineer",
        status: "Active",
        teams: ["Product", "Design"],
        avatar: "",
    },
    {
        name: "James Muriel",
        email: "jamesmuriel@ahoten.finance",
        id: "#25346GHJY7T6",
        role: "Sales specialist",
        status: "Inactive",
           teams: ["Engineering", "Design", "Product","test","development","a",],
        avatar: "",
    },
    {
        name: "Emoto Winner",
        email: "emotewinner@gmail.com",
        id: "#25346GHJY7T6",
        role: "Sales specialist",
        status: "Inactive",
        teams: ["Product"],
        avatar: "",
    },
];

export default function EmployeeTable() {
    const [activeTab, setActiveTab] = React.useState<'all' | 'deleted'>('all');

    // Show same data in both tabs
    const shownEmployees = employees;

    return (
        <div>
            {/* Header and Tabs */}
            <div className="mb-2">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-[#1a253c]">Employees</span>
                        <HelpCircle size={20} strokeWidth={2} className="text-gray-400 cursor-pointer" />
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#faf7fb] text-[#b71c1c] text-xs font-semibold">100</span>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" className="flex items-center gap-2 font-medium">
                            <Download size={16} strokeWidth={2} className="text-[#1a253c]" />
                            Export
                        </Button>
                        <Button className="bg-[#1a253c] text-white flex items-center gap-2 font-medium relative">
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
                            <TableHead className="w-8 text-center"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {shownEmployees.map((emp, i) => (
                            <TableRow key={i} className="border-b border-gray-200 align-middle [&>td]:py-4">
                                <TableCell className="w-8 pl-6">
                                    <input type="checkbox" className="accent-gray-500 w-4 h-4" />
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <div className="relative">
                                            <Avatar>
                                                <AvatarImage src={emp.avatar} />
                                                <AvatarFallback className="bg-[#fff2ea] text-[#93312b] font-bold">{emp.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                                            </Avatar>
                                            {/* Status dot logic can be improved if needed */}
                                            {i === 2 && (
                                                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                                            )}
                                            {i === 1 && (
                                                <span className="absolute bottom-0 right-0 w-3 h-3 bg-red-500 border-2 border-white rounded-full" />
                                            )}
                                        </div>
                                        <div>
                                            <div className="font-medium">{emp.name}</div>
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
                                        <div>{emp.role}</div>
                                        <div className="text-xs text-muted-foreground mt-1">
                                            {/* Example logic: assign type based on index for demo, replace with real data if available */}
                                            {(() => {
                                                const types = ["Full time", "Contract", "Associate", "Part time"];
                                                // You can replace this with emp.type if you have a type property
                                                return types[i % types.length];
                                            })()}
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <span
                                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-medium text-xs ${emp.status === "Active"
                                                ? "bg-green-50 text-green-700"
                                                : "bg-red-50 text-red-600"
                                            }`}
                                    >
                                        <span
                                            className={`w-2 h-2 rounded-full ${emp.status === "Active" ? "bg-green-500" : "bg-red-500"
                                                }`}
                                        ></span>
                                        {emp.status}
                                    </span>
                                </TableCell>
                                <TableCell className="flex gap-1 flex-wrap">
                                    {(() => {
                                        // Team color mapping
                                        const teamColors: Record<string, string> = {
                                            Marketing: "bg-[#f5f6f7] text-gray-700",
                                            Design: "bg-[#f7e8ef] text-pink-700",
                                            Product: "bg-[#f2f4f7] text-gray-700",
                                            Engineering: "bg-[#f2f4f7] text-gray-700",
                                        };
                                        // Show max 2 teams, rest as +N
                                        const maxTeams = 2;
                                        const shownTeams = emp.teams.slice(0, maxTeams);
                                        const extraCount = emp.teams.length - maxTeams;
                                        return (
                                            <>
                                                {shownTeams.map((team, idx) => (
                                                    <span
                                                        key={idx}
                                                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${teamColors[team] || "bg-gray-100 text-gray-700"
                                                            }`}
                                                    >
                                                        {team}
                                                    </span>
                                                ))}
                                                {extraCount > 0 && (
                                                    <span className="inline-block px-3 py-1 rounded-full bg-[#f2f4f7] text-gray-700 text-xs font-semibold">
                                                        +{extraCount}
                                                    </span>
                                                )}
                                            </>
                                        );
                                    })()}
                                </TableCell>
                                <TableCell className="w-8 text-center">
                                    {/* 3-dot icon for actions, vertical at far right */}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-600 mx-auto" viewBox="0 0 20 20" fill="currentColor">
                                        <circle cx="10" cy="4" r="1.5" />
                                        <circle cx="10" cy="10" r="1.5" />
                                        <circle cx="10" cy="16" r="1.5" />
                                    </svg>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            {/* Pagination */}
            <div className="flex justify-between items-center mt-6">
                <Button variant="outline" className="flex items-center gap-1">
                    <HiChevronLeft className="w-4 h-4" /> Previous
                </Button>
            <div className="flex gap-1 items-center">
                {/* Show 1, 2, 3, ..., 8, 9, 10 */}
                {[1, 2, 3].map((n) => {
                    const isCurrent = n === 1; // Set current page to 1 for demo
                    return (
                        <Button
                            key={n}
                            variant={isCurrent ? undefined : "ghost"}
                            size="sm"
                            className={isCurrent ? "bg-gray-100 text-gray-800 font-bold border border-gray-300" : ""}
                        >
                            {n}
                        </Button>
                    );
                })}
                <span className="px-2 text-gray-400 font-bold">...</span>
                {[8, 9, 10].map((n) => (
                    <Button key={n} variant="ghost" size="sm">
                        {n}
                    </Button>
                ))}
            </div>
                <Button variant="outline" className="flex items-center gap-1">
                    Next <HiChevronRight className="w-4 h-4" />
                </Button>
            </div>
        </div>
    );
}
