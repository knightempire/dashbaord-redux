
"use client";

import React, { useState, useEffect } from "react";
import { EmployeeHeader } from "@/components/EmployeeHeader";
import { EmployeeTabs } from "@/components/EmployeeTabs";
import { SearchAndFilter } from "@/components/SearchAndFilter";
import { EmployeeTable } from "@/components/EmployeeTable";
import { PaginationControls } from "@/components/PaginationControls";
import { CreateEmployeeModal } from "@/components/CreateEmployeeModal"; 
import { EditEmployeeModal } from "@/components/EditEmployeeModal";
import { SuccessToast } from "@/components/SuccessToast";
import { User } from "@/components/types";

// Redux Imports
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/lib/store/store';
import { 
  fetchEmployees, 
  setPage, 
  setDeletedPage,
  addEmployee,
  updateEmployee,
  deleteEmployee
} from '@/lib/store/slices/employeesSlice';

export default function EmployeePage() {
    const dispatch = useDispatch<AppDispatch>();
    
    // Select state from Redux store
    const { users, deletedUsers, total, page, limit, deletedPage, status } = useSelector((state: RootState) => state.employees);
    const loading = status === 'loading';


    const [activeTab, setActiveTab] = useState<'all' | 'deleted'>('all');
    const [searchQuery, setSearchQuery] = useState("");
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [editModalUser, setEditModalUser] = useState<User | null>(null);
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    

    useEffect(() => {
        if (activeTab === 'all' && status === 'idle') {
            dispatch(fetchEmployees({ page, limit }));
        }
    }, [status, page, limit, activeTab, dispatch]);
    
    // Refetch when page number changes
    useEffect(() => {
        dispatch(fetchEmployees({ page, limit }));
    }, [page, dispatch, limit]);


    const handleCreateEmployee = (firstName: string, lastName: string): { success: boolean, error?: string } => {
        if (!firstName || !lastName) return { success: false, error: "Please enter both first and last name." };
        
        const newName = (firstName + lastName).toLowerCase().replace(/\s+/g, "");
        const exists = users.some(emp => ((emp.firstName || "") + (emp.lastName || "")).toLowerCase().replace(/\s+/g, "") === newName);
        if (exists) return { success: false, error: "Employee name already exists." };

        const newUser: User = {
            id: Date.now(), // Use a temporary ID
            firstName,
            lastName,
            email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
            image: "",
            status: true,
            company: { name: "No Team", title: 'New Role', department: 'New Dept', },
            role: '', department: '', teams: '' 
        };
        dispatch(addEmployee(newUser));
        return { success: true };
    };
    
    const handleUpdateEmployee = (updatedEmployee: User): { success: boolean, error?: string } => {
        dispatch(updateEmployee(updatedEmployee));
        return { success: true };
    };

    const handleDeleteEmployee = (employeeToDelete: User) => {
        dispatch(deleteEmployee(employeeToDelete));
    };

    return (
        <div>
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

            <EmployeeTable
                users={users}
                loading={loading}
                activeTab={activeTab}
                searchQuery={searchQuery}
                onEdit={(user) => setEditModalUser(user)}
                onDelete={handleDeleteEmployee}
                deletedUsers={deletedUsers}
                deletedPage={deletedPage}
                deletedLimit={10}
            />

            {activeTab === 'all' ? (
                <PaginationControls
                    currentPage={page}
                    totalItems={total}
                    itemsPerPage={limit}
                    onPageChange={(p) => dispatch(setPage(p))}
                />
            ) : (
                <PaginationControls
                    currentPage={deletedPage}
                    totalItems={deletedUsers.length}
                    itemsPerPage={10}
                    onPageChange={(p) => dispatch(setDeletedPage(p))}
                />
            )}
            
            {/* These modals can now be simpler, as they just call the handlers which dispatch to Redux */}
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
    );
}