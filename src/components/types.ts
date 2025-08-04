// /app/employees/components/types.ts

export type User = {
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
    // The following are added for the edit modal state
    role: string;
    department: string;
    teams: string;
};