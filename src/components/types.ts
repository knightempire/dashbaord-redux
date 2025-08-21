

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
    role: string;
    department: string;
    teams: string;
};
