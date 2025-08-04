// /app/employees/components/SuccessToast.tsx
"use client";

import React from 'react';

type SuccessToastProps = {
    show: boolean;
};

export function SuccessToast({ show }: SuccessToastProps) {
    if (!show) {
        return null;
    }

    return (
        <div className="fixed bottom-6 right-6 z-[100] flex items-center gap-3 bg-white border border-green-600 shadow-lg rounded-lg px-5 py-3 min-w-[260px] max-w-xs animate-fadein">
            <svg className="w-6 h-6 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="#e6f4ea" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" stroke="green" />
            </svg>
            <span className="text-green-700 font-medium text-base">Employee saved successfully.</span>
        </div>
    );
}