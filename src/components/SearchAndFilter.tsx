// /app/employees/components/SearchAndFilter.tsx
"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { FilterIcon } from "./icons";

type SearchAndFilterProps = {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
};

export function SearchAndFilter({ searchQuery, setSearchQuery }: SearchAndFilterProps) {
    return (
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
    );
}