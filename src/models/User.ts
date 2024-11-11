import { api } from "@hboictcloud/api";

type userResult = {
    id: number;
    username: string;
    email: string;
    password: string;
};

/* Class User
 * Users hebben alleen een ID (voor de database), username, email en wachtwoord nodig
 */
export class User {
    private _id: number;
    private _username: string;
    private _email: string;
    private _password: string;

    // Constructor
    public constructor(username: string, email: string, password: string, id: number = 0) {
        this._id = id;
        this._username = username;
        this._email = email;
        this._password = password;
    }

    // CRUD functies
    /**
     * This function determines whether an email adress exists.
     * @param email requires the emailadress for the data-query.
     * @returns true or false based off database data.
     */
    public async doesUserExistForEmail(email: string): Promise<boolean | undefined> {
        try {
            const result: userResult[] = await api.queryDatabase("SELECT email FROM users WHERE email = ?", [email]) as userResult[];
            if (result.length > 0) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (reason) {
            console.error("Er is een fout met het opzoeken van gebruikers", reason);
            return undefined;
        }
    }
    /**
     * This function determines whether a username exists.
     * @param username requires username for the data-query.
     * @returns true or false based off database data.
     */
    public async doesUserExistForUsername(username: string): Promise<boolean | undefined> {
        
    }

    // public async getUserById(id: number): Promise<User | undefined> {
    //     return;
    // }

    // public async getUserByEmailAndPassword(email: string, password: string): Promise<User | undefined> {
    //     return;
    // }

    // public async create(): Promise<boolean> {
    //     return;
    // }

    // public async update(): Promise<boolean> {
    //     return;
    // }

    // public async delete(): Promise<boolean> {
    //     return;
    // }

    // Getters / Setters
    public getId(): number {
        return this._id;
    }

    public getEmail(): string {
        return this._email;
    }

    public setEmail(email: string): void {
        this._email = email;
    }

    public getUserName(): string {
        return this._username;
    }

    public setUserName(username: string): void {
        this._username = username;
    }

    public getPassword(): string {
        return this._password;
    }

    public setPassword(password: string): void {
        this._password = password;
    }
}
