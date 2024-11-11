import { api } from "@hboictcloud/api";
import { NonQueryResult, ApiFailReason, UserInterface } from "../views/interfaces";
import { TransformStreamDefaultController } from "stream/web";

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
    public async doesUserExistForEmail(email: string): Promise<boolean | undefined> {
        try {
            const result: UserInterface[] | NonQueryResult | ApiFailReason | string = await api.queryDatabase("SELECT * FROM users WHERE email = ?", [email]);
            if (!result) {
                console.log("Dit emailadres is nog niet in gebruik.");
                return false;
            }
            else {
                console.log("User found:", result);
                return true;
            }
        }
        catch (reason) {
            console.error("Er is een fout met het opzoeken van gebruikers", reason);
            return true;
        }
    }
    // public async doesUserExistForUsername(username: string): Promise<boolean | undefined> {
    //     return;
    // }

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
