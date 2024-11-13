import "../hicConfig";
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
            console.error("Er is een fout met het opzoeken van het emailadres", reason);
            return undefined;
        }
    }

    /**
     * This function determines whether a username exists.
     * @param username requires username for the data-query.
     * @returns true or false based off database data.
     */
    public async doesUserExistForUsername(username: string): Promise<boolean | undefined> {
        try {
            const result: userResult[] = await api.queryDatabase("SELECT username FROM users WHERE username = ?", [username]) as userResult[];
            if (result.length > 0) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (reason) {
            console.error("Er is een fout met het opzoeken van de gebruikersnaam", reason);
            return undefined;
        }
    }

    /**
     * This function will find a user based off their ID.
     * @param id requires the ID to find a match in de database.
     */
    public async getUserById(id: number): Promise<User | undefined> {
        try {
            const result: userResult[] = await api.queryDatabase("SELECT * from users WHERE id = ?", [id]) as userResult[];
            if (result.length > 0) {
                return new User(result[0].username, result[0].email, result[0].password, result[0].id);
            }
            else {
                return undefined;
            }
        }
        catch (reason) {
            console.error("Er is een fout met het opzoeken van de gebruiker", reason);
            return undefined;
        }
    }

    /**
     * This function will return an ID based off the user email and password.
     * @param email requires the email to find a match in the database.
     * @param password requires the password to find a match in the database.
     * @returns the ID of the entry which matches to the parameters above.
     */
    public async getUserByEmailAndPassword(email: string, password: string): Promise<User | undefined> {
        try {
            const result: userResult[] = await api.queryDatabase("SELECT * FROM users WHERE email = ? AND password = ?", email, password) as userResult[];
            if (result.length > 0) {
                return new User(result[0].username, result[0].email, result[0].password);
            }
            else {
                return undefined;
            }
        }
        catch (reason) {
            console.error("Er is een fout met het opzoeken van de gegevens", reason);
            return undefined;
        }
    }

    /**
     * Stores inputted data into the database.
     * @param username requires the username to be put in the database.
     * @param email requires the email to be put in the database.
     * @param password requires the password to be put in the database.
     * @returns true or false based off.
     */
    public async create(username: string, email: string, password: string): Promise<boolean> {
        try {
            const result: userResult[] = await api.queryDatabase(
                "INSERT INTO users (username, email, password) VALUES (?, ?, ?)", username, email, password
            ) as userResult[];

            console.log("Success", result);
            return true;
        }
        catch (reason) {
            console.error("Er is een fout met het aanmaken van gebruikers", reason);
            return false;
        }
    }

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
