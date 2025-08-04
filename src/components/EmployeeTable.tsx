import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// Removed unused Badge import
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

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
    return (
        <div>
            <div className="flex items-center gap-2 mb-4">
                <Input placeholder="Search Employee by name, role, ID or any related keywords" className="w-full" />
                <Button variant="outline">Filter</Button>
            </div>
            <Separator className="mb-4" />
            <div className="border border-gray-200 rounded-lg overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-[#FAFBFB]">
                            <TableHead className="w-8 pl-6">
                                <input type="checkbox" className="accent-gray-500 w-4 h-4" />
                            </TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Employee ID</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Teams</TableHead>
                            <TableHead className="w-8 text-center"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {employees.map((emp, i) => (
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
