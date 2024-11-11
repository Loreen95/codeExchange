export interface NonQueryResult {
    affectedRows: number;
}

export interface ApiFailReason {
    reason: string;
}

export interface UserInterface {
    id: number;
    username: string;
    email: string;
    password: string;
}
