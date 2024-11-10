export interface NonQueryResult {
    affectedRows: number;
}

export interface ApiFailReason {
    reason: string;
}

export interface User {
    id: number;
    email: string;
    password: string;
}
