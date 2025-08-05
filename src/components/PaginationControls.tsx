
"use client";

import { Button } from "@/components/ui/button";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

type PaginationControlsProps = {
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
};

export function PaginationControls({ currentPage, totalItems, itemsPerPage, onPageChange }: PaginationControlsProps) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    if (totalPages <= 1) return null;

    const handlePrev = () => onPageChange(Math.max(1, currentPage - 1));
    const handleNext = () => onPageChange(Math.min(totalPages, currentPage + 1));

    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
        for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
        if (currentPage <= 4) {
            pages.push(1, 2, 3, 4, 5, '...', totalPages);
        } else if (currentPage >= totalPages - 3) {
            pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
        } else {
            pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
        }
    }

    return (
        <div className="flex justify-between items-center mt-6">
            <Button variant="outline" className="flex items-center gap-1" onClick={handlePrev} disabled={currentPage === 1}>
                <HiChevronLeft className="w-4 h-4" /> Previous
            </Button>
            <div className="flex gap-1 items-center">
                {pages.map((n, idx) =>
                    n === '...' ? (
                        <span key={`ellipsis-${idx}`} className="px-2 text-gray-400 font-bold">...</span>
                    ) : (
                        <Button
                            key={n}
                            variant={n === currentPage ? undefined : "ghost"}
                            size="sm"
                            className={n === currentPage ? "bg-gray-100 text-gray-800 font-bold border border-gray-300" : ""}
                            onClick={() => onPageChange(n as number)}
                        >
                            {n}
                        </Button>
                    )
                )}
            </div>
            <Button variant="outline" className="flex items-center gap-1" onClick={handleNext} disabled={currentPage >= totalPages}>
                Next <HiChevronRight className="w-4 h-4" />
            </Button>
        </div>
    );
}