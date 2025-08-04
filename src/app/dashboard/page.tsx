// /app/employees/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { EmployeeHeader } from "../../components/EmployeeHeader";
import { EmployeeTabs } from "../../components/EmployeeTabs";
import { SearchAndFilter } from "../../components/SearchAndFilter";
import { EmployeeTable } from "../../components/EmployeeTable";
import { PaginationControls } from "../../components/PaginationControls";
import { User } from "../../components/types";
// Import modals and toast from their files
// For example: import { CreateEmployeeModal } from './components/CreateEmployeeModal';

// NOTE: For this example, Modal/Toast components are defined here.
// In a real project, place them in their own files as described.

// --- CreateEmployeeModal.tsx ---
import { Button } from "@/components/ui/button";

type CreateModalProps = {
    show: boolean;
    onClose: () => void;
    onSave: (firstName: string, lastName: string) => { success: boolean, error?: string };
    setToast: (show: boolean) => void;
};

function CreateEmployeeModal({ show, onClose, onSave, setToast }: CreateModalProps) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [modalError, setModalError] = useState("");

    const handleSave = () => {
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

    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-40">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8 relative border border-gray-200">
                <h2 className="text-xl font-bold mb-2">Create Employee</h2>
                <p className="text-sm text-gray-500 mb-6">You can create a profile here. Click save when you're done.</p>
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
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button className="bg-[#1a253c] text-white" onClick={handleSave}>Save changes</Button>
                </div>
                <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl" onClick={onClose}>×</button>
            </div>
        </div>
    );
}

// --- EditEmployeeModal.tsx ---
type EditModalProps = {
    employee: User | null;
    onClose: () => void;
    onSave: (updatedEmployee: User) => { success: boolean, error?: string };
    setToast: (show: boolean) => void;
};

function EditEmployeeModal({ employee, onClose, onSave, setToast }: EditModalProps) {
    const [editData, setEditData] = useState<User | null>(employee);
    const [modalError, setModalError] = useState("");

    useEffect(() => {
        setEditData(employee);
    }, [employee]);

    if (!editData) return null;

    const handleChange = (field: keyof User | `company.${keyof User['company']}`, value: any) => {
        setEditData(prev => {
            if (!prev) return null;
            if (typeof field === 'string' && field.startsWith('company.')) {
                const subField = field.split('.')[1] as keyof User['company'];
                return {
                    ...prev,
                    company: { ...prev.company, [subField]: value }
                }
            }
            return { ...prev, [field as keyof User]: value };
        });
    };

    const handleSave = () => {
        if (!editData) return;
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
        <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-40">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8 relative border border-gray-200">
                <h2 className="text-xl font-bold mb-2">Edit Employee</h2>
                 {modalError && <div className="mb-2 text-red-600 text-sm font-medium">{modalError}</div>}
                <div className="mb-4 grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                        <input type="text" className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1a253c]" value={editData.firstName} onChange={e => handleChange('firstName', e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                        <input type="text" className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1a253c]" value={editData.lastName} onChange={e => handleChange('lastName', e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input type="email" className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1a253c]" value={editData.email || ""} onChange={e => handleChange('email', e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Employee ID</label>
                        <input type="text" className="w-full border rounded-lg px-3 py-2 bg-gray-100 text-gray-500" value={editData.id} readOnly />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                        <input type="text" className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1a253c]" value={editData.company?.title || ""} onChange={e => handleChange('company.title', e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                        <input type="text" className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1a253c]" value={editData.company?.department || ""} onChange={e => handleChange('company.department', e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1a253c]" value={editData.status ? "active" : "inactive"} onChange={e => handleChange('status', e.target.value === "active")}>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Teams</label>
                        <input type="text" className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1a253c]" value={editData.company?.name || ""} onChange={e => handleChange('company.name', e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                        <input type="text" className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1a253c]" value={editData.image || ""} onChange={e => handleChange('image', e.target.value)} />
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

// --- SuccessToast.tsx ---
function SuccessToast({ show }: { show: boolean }) {
    if (!show) return null;
    return (
        <div className="fixed bottom-6 right-6 z-[100] flex items-center gap-3 bg-white border border-green-600 shadow-lg rounded-lg px-5 py-3 min-w-[260px] max-w-xs animate-fadein">
            <svg className="w-6 h-6 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="#e6f4ea" /><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" stroke="green" />
            </svg>
            <span className="text-green-700 font-medium text-base">Employee saved successfully.</span>
        </div>
    );
}


// --- MAIN PARENT COMPONENT ---
export default function EmployeePage() {
    // State management
    const [activeTab, setActiveTab] = useState<'all' | 'deleted'>('all');
    const [users, setUsers] = useState<User[]>([]);
    const [deletedUsers, setDeletedUsers] = useState<User[]>([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [deletedPage, setDeletedPage] = useState(1);
    const deletedLimit = 10;

    // Modal and Toast State
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [editModalUser, setEditModalUser] = useState<User | null>(null);
    const [showSuccessToast, setShowSuccessToast] = useState(false);

    // Data fetching
    useEffect(() => {
        if (activeTab !== 'all') return;
        setLoading(true);
        axios.get(`https://dummyjson.com/users?limit=${limit}&skip=${(page - 1) * limit}`)
            .then(res => {
                const usersWithStatus = res.data.users.map((u: any) => ({
                    ...u,
                    status: Math.random() > 0.5
                }));
                setUsers(usersWithStatus);
                setTotal(res.data.total);
            })
            .finally(() => setLoading(false));
    }, [page, activeTab, limit]);

    // Handler functions
    const handleCreateEmployee = (firstName: string, lastName: string): { success: boolean, error?: string } => {
        if (!firstName || !lastName) {
            return { success: false, error: "Please enter both first and last name." };
        }
        const newName = (firstName + lastName).toLowerCase().replace(/\s+/g, "");
        const exists = users.some(emp => ((emp.firstName || "") + (emp.lastName || "")).toLowerCase().replace(/\s+/g, "") === newName);

        if (exists) {
            return { success: false, error: "Employee name already exists." };
        }

        const newUser: User = {
            id: Date.now(),
            firstName,
            lastName,
            email: "",
            image: "",
            status: true,
            company: { name: "No Team", title: 'New Role', department: 'New Dept' },
            role: '', department: '', teams: ''
        };
        setUsers([newUser, ...users]);
        setTotal(t => t + 1);
        return { success: true };
    };
    
    const handleUpdateEmployee = (updatedEmployee: User): { success: boolean, error?: string } => {
        const newName = (updatedEmployee.firstName + updatedEmployee.lastName).toLowerCase().replace(/\s+/g, "");
        const exists = users.some(emp => ((emp.firstName || "") + (emp.lastName || "")).toLowerCase().replace(/\s+/g, "") === newName && emp.id !== updatedEmployee.id);
        
        if (exists) {
            return { success: false, error: "Employee name already exists." };
        }

        setUsers(users.map(u => u.id === updatedEmployee.id ? updatedEmployee : u));
        setDeletedUsers(deletedUsers.map(u => u.id === updatedEmployee.id ? updatedEmployee : u));
        return { success: true };
    };

    const handleDeleteEmployee = (employeeToDelete: User) => {
        setDeletedUsers([employeeToDelete, ...deletedUsers]);
        setUsers(users.filter(u => u.id !== employeeToDelete.id));
        setTotal(t => t - 1);
    };

    return (
        <div className="min-h-screen w-full bg-white relative" style={{ boxSizing: 'border-box' }}>
            {/* Prevent overlap with navbar/sidebar by using padding and max-width */}
            <div
                className="flex flex-col pt-[64px] pl-[60px] pr-4 pb-4 min-h-screen"
                style={{ maxWidth: 'calc(100vw - 240px)', marginLeft: '240px', boxSizing: 'border-box' }}
            >
                <div className="mb-2">
                    <EmployeeHeader
                        activeTab={activeTab}
                        totalCount={total}
                        deletedCount={deletedUsers.length}
                        onNewEmployeeClick={() => setShowCreateModal(true)}
                    />
                    <EmployeeTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                </div>

                <SearchAndFilter searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

                <div className="flex-1 flex flex-col overflow-auto">
                    <EmployeeTable
                        users={users}
                        loading={loading}
                        activeTab={activeTab}
                        searchQuery={searchQuery}
                        onEdit={(user) => setEditModalUser(user)}
                        onDelete={handleDeleteEmployee}
                        deletedUsers={deletedUsers}
                        deletedPage={deletedPage}
                        deletedLimit={deletedLimit}
                    />

                    {activeTab === 'all' ? (
                        <PaginationControls
                            currentPage={page}
                            totalItems={total}
                            itemsPerPage={limit}
                            onPageChange={setPage}
                        />
                    ) : (
                        <PaginationControls
                            currentPage={deletedPage}
                            totalItems={deletedUsers.length}
                            itemsPerPage={deletedLimit}
                            onPageChange={setDeletedPage}
                        />
                    )}
                </div>

                <CreateEmployeeModal
                    show={showCreateModal}
                    onClose={() => setShowCreateModal(false)}
                    onSave={handleCreateEmployee}
                    setToast={setShowSuccessToast}
                />

                <EditEmployeeModal
                    employee={editModalUser}
                    onClose={() => setEditModalUser(null)}
                    onSave={handleUpdateEmployee}
                    setToast={setShowSuccessToast}
                />

                <SuccessToast show={showSuccessToast} />
            </div>
        </div>
    );
}