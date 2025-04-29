export interface Login {
    login: string;
    password: string;
}

export interface Register {
    name: string;
    surname?: string;
    username: string;
    email: string;
    phone: string;
    password: string;
}
