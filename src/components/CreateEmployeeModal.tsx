
"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";

type CreateModalProps = {
    show: boolean;
    onClose: () => void;
    onSave: (firstName: string, lastName:string) => { success: boolean, error?: string };
    setToast: (show: boolean) => void;
};

export function CreateEmployeeModal({ show, onClose, onSave, setToast }: CreateModalProps) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [modalError, setModalError] = useState("");

    const handleSave = () => {
        setModalError("");
        const result = onSave(firstName, lastName);

        if (result.success) {
            setToast(true);
            setFirstName("");
            setLastName("");
            setTimeout(() => {
                onClose();
                setToast(false);
            }, 2000);
        } else {
            setModalError(result.error || "An unknown error occurred.");
        }
    };
    
    const handleClose = () => {
        // Reset state on close
        setFirstName("");
        setLastName("");
        setModalError("");
        onClose();
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-40">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8 relative border border-gray-200">
                <h2 className="text-xl font-bold mb-2">Create Employee</h2>
                <p className="text-sm text-gray-500 mb-6">You can create a profile here. Click save when you&apos;re done.</p>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input type="text" className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1a253c]" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="First Name"/>
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input type="text" className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1a253c]" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Last Name"/>
                </div>
                {modalError && <div className="mb-2 text-red-600 text-sm font-medium">{modalError}</div>}
                <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={handleClose}>Cancel</Button>
                    <Button className="bg-[#1a253c] text-white" onClick={handleSave}>Save changes</Button>
                </div>
                <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl" onClick={handleClose}>×</button>
            </div>
        </div>
    );
}