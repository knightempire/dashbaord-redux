// /app/employees/components/EditEmployeeModal.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { User } from './types'; // Make sure the shared User type is imported

type EditModalProps = {
    employee: User | null;
    onClose: () => void;
    onSave: (updatedEmployee: User) => { success: boolean, error?: string };
    setToast: (show: boolean) => void;
};

export function EditEmployeeModal({ employee, onClose, onSave, setToast }: EditModalProps) {
    const [editData, setEditData] = useState<User | null>(null);
    const [modalError, setModalError] = useState("");

    useEffect(() => {
        // When the employee prop changes, update the local state for the form
        setEditData(employee);
        setModalError(""); // Clear any previous errors
    }, [employee]);

    if (!editData) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setEditData(prev => {
            if (!prev) return null;
            // Handle nested company object
            if (name.startsWith('company.')) {
                const companyField = name.split('.')[1] as keyof User['company'];
                return {
                    ...prev,
                    company: { ...prev.company, [companyField]: value }
                }
            }
            // Handle status boolean conversion
            if (name === 'status') {
                return {...prev, status: value === 'active'};
            }
            return { ...prev, [name]: value };
        });
    };

    const handleSave = () => {
        if (!editData) return;
        setModalError("");
        const result = onSave(editData);
        
        if (result.success) {
            setToast(true);
            setTimeout(() => {
                onClose();
                setToast(false);
            }, 2000);
        } else {
            setModalError(result.error || "An unknown error occurred.");
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8 relative border border-gray-200">
                <h2 className="text-xl font-bold mb-2">Edit Employee</h2>
                 {modalError && <div className="mb-2 text-red-600 text-sm font-medium">{modalError}</div>}
                <div className="mb-4 grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                        <input name="firstName" type="text" className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1a253c]" value={editData.firstName} onChange={handleChange} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                        <input name="lastName" type="text" className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1a253c]" value={editData.lastName} onChange={handleChange} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input name="email" type="email" className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1a253c]" value={editData.email || ""} onChange={handleChange} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Employee ID</label>
                        <input type="text" className="w-full border rounded-lg px-3 py-2 bg-gray-100 text-gray-500" value={editData.id} readOnly />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                        <input name="company.title" type="text" className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1a253c]" value={editData.company?.title || ""} onChange={handleChange} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                        <input name="company.department" type="text" className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1a253c]" value={editData.company?.department || ""} onChange={handleChange} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select name="status" className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1a253c]" value={editData.status ? "active" : "inactive"} onChange={handleChange}>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Teams</label>
                        <input name="company.name" type="text" className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1a253c]" value={editData.company?.name || ""} onChange={handleChange} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                        <input name="image" type="text" className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1a253c]" value={editData.image || ""} onChange={handleChange} />
                    </div>
                </div>
                <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button className="bg-[#1a253c] text-white" onClick={handleSave}>Save changes</Button>
                </div>
                <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl" onClick={onClose}>×</button>
            </div>
        </div>
    );
}