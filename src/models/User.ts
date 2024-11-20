// 𝕭𝖊𝖍𝖔𝖑𝖉 𝖎𝖙'𝖘 𝖒𝖆𝖏𝖊𝖘𝖙𝖞 𝖇𝖚𝖙 𝖑𝖔𝖜𝖊𝖗 𝖞𝖔𝖚𝖗 𝖙𝖔𝖓𝖊, 𝖋𝖔𝖗 𝖞𝖔𝖚 𝖘𝖙𝖆𝖓𝖉 𝖎𝖓 𝖙𝖍𝖊 𝖕𝖗𝖊𝖈𝖆𝖓𝖈𝖊 𝖔𝖋 𝖙𝖍𝖊 𝖆𝖑𝖑𝖒𝖎𝖌𝖍𝖙𝖞 𝖀𝖘𝖊𝖗 𝕸𝖔𝖉𝖊𝖑.
import "../hicConfig";
import { api } from "@hboictcloud/api";
import { userResult } from "../views/types";

/* Class User
 * user hebben alleen een ID (voor de database), username, email en wachtwoord nodig
 */
export class User {
    private _userId: number;
    private _email: string;
    private _password: string;
    private _username: string;

    // 𝖂𝖎𝖙𝖓𝖊𝖘𝖘 𝖍𝖊𝖗𝖊 𝖙𝖍𝖊 𝖊𝖕𝖎𝖈𝖊𝖓𝖙𝖊𝖗 𝖔𝖋 𝖈𝖗𝖊𝖆𝖙𝖎𝖔𝖓, 𝖜𝖍𝖊𝖗𝖊 𝖓𝖊𝖜 𝖎𝖓𝖘𝖙𝖆𝖓𝖈𝖊𝖘 𝖔𝖋 𝖑𝖎𝖋𝖊 𝖆𝖗𝖊 𝖋𝖔𝖗𝖒𝖊𝖉 𝖋𝖗𝖔𝖒 𝖆𝖘𝖍 𝖆𝖓𝖉 𝖇𝖗𝖔𝖐𝖊𝖓 𝖇𝖆𝖈𝖐 𝖉𝖔𝖜𝖓 𝖎𝖓𝖙𝖔 𝖉𝖚𝖘𝖙.
    // Constructor
    public constructor(userId: number = 0, email: string, password: string, username: string) {
        this._userId = userId;
        this._email = email;
        this._password = password;
        this._username = username;
    }

    // 𝕲𝖆𝖟𝖊 𝖚𝖕𝖔𝖓 𝖙𝖍𝖊 𝖋𝖚𝖑𝖑 𝖊𝖝𝖙𝖊𝖓𝖙 𝖔𝖋 𝖎𝖙'𝖘 𝖒𝖆𝖏𝖊𝖘𝖙𝖞'𝖘 𝖕𝖔𝖜𝖊𝖗. 𝕾𝖊𝖊 𝖍𝖔𝖜 𝖎𝖙 𝖈𝖗𝖊𝖆𝖙𝖊𝖘, 𝖉𝖊𝖘𝖙𝖗𝖔𝖞𝖘 𝖆𝖓𝖉 𝖕𝖑𝖆𝖈𝖊𝖘 𝖉𝖊𝖛𝖎𝖓𝖊 𝖏𝖚𝖉𝖌𝖒𝖊𝖓𝖙
    // CRUD functies

    // 𝕳𝖊𝖗𝖊 𝖎𝖙'𝖘 𝖗𝖊𝖛𝖊𝖗𝖊𝖓𝖈𝖊 𝖉𝖎𝖛𝖎𝖉𝖊𝖘 𝖊𝖒𝖆𝖎𝖑 𝖆𝖉𝖉𝖗𝖊𝖘𝖘𝖊𝖘 𝖔𝖓𝖊 𝖇𝖞 𝖔𝖓𝖊. 𝖊𝖓𝖘𝖚𝖗𝖎𝖓𝖌 𝖊𝖆𝖈𝖍 𝖍𝖆𝖘 𝖙𝖍𝖊𝖎𝖗 𝖔𝖜𝖓. 𝕰𝖓𝖘𝖚𝖗𝖎𝖓𝖌 𝖓𝖔𝖓𝖊 𝖈𝖆𝖓 𝖇𝖊 𝖘𝖍𝖆𝖗𝖊𝖉
    /**
     * This function determines whether an email adress exists.
     * @param email requires the emailadress for the data-query.
     * @returns true or false based off database data.
     */
    public async doesUserExistForEmail(email: string): Promise<boolean | undefined> {
        try {
            const result: userResult[] = await api.queryDatabase("SELECT email FROM user WHERE email = ?", [email]) as userResult[];
            if (result.length > 0) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (reason) {
            console.error("An error occurred while searching for the email.", reason);
            return undefined;
        }
    }

    // 𝖂𝖎𝖙𝖓𝖊𝖘𝖘 𝖍𝖊𝖗𝖊 𝖍𝖔𝖜 𝖎𝖙 𝖊𝖓𝖘𝖚𝖗𝖊𝖘 𝖆𝖑𝖑 𝖓𝖆𝖒𝖊𝖘 𝖆𝖗𝖊 𝖚𝖓𝖎𝖖𝖚𝖊 𝖙𝖔 𝖒𝖆𝖎𝖓𝖙𝖆𝖎𝖓 𝖎𝖙'𝖘 𝖕𝖊𝖗𝖋𝖊𝖈𝖙 𝖉𝖎𝖛𝖎𝖓𝖊 𝖔𝖗𝖉𝖊𝖗
    /**
     * This function determines whether a username exists.
     * @param username requires username for the data-query.
     * @returns true or false based off database data.
     */
    public async doesUserExistForUsername(username: string): Promise<boolean | undefined> {
        try {
            const result: userResult[] = await api.queryDatabase("SELECT username FROM user WHERE username = ?", [username]) as userResult[];
            if (result.length > 0) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (reason) {
            console.error("An error has occurred while searching for the username.", reason);
            return undefined;
        }
    }

    // 𝕳𝖊𝖗𝖊 𝖎𝖙'𝖘 𝖉𝖎𝖛𝖎𝖓𝖊 𝖒𝖆𝖏𝖊𝖘𝖙𝖞 𝖋𝖎𝖓𝖉𝖘 𝖆𝖓𝖞 𝖇𝖊𝖎𝖓𝖌 𝖜𝖎𝖙𝖍 𝖙𝖍𝖊 𝖊𝖕𝖎𝖙𝖍𝖊𝖙 𝖇𝖊𝖘𝖙𝖔𝖜𝖊𝖉 𝖚𝖕𝖔𝖓 𝖊𝖆𝖈𝖍 𝖑𝖎𝖛𝖎𝖓𝖌 𝖙𝖍𝖎𝖓𝖌
    /**
     * This function will find a user based off their ID.
     * @param userId requires the ID to find a match in de database.
     */
    public async getUserById(userId: number): Promise<User | undefined> {
        try {
            const result: userResult[] = await api.queryDatabase("SELECT * from user WHERE userId = ?", [userId]) as userResult[];
            if (result.length > 0) {
                return new User(result[0].userId, result[0].email, result[0].password, result[0].username);
            }
            else {
                return undefined;
            }
        }
        catch (reason) {
            console.error("An error occurred while searching for the user.", reason);
            return undefined;
        }
    }

    // 𝕬𝖓𝖉 𝖍𝖊𝖗𝖊 𝖎𝖙'𝖘 𝖍𝖔𝖑𝖞 𝖗𝖊𝖛𝖊𝖗𝖊𝖓𝖈𝖊 𝖑𝖔𝖈𝖆𝖙𝖊𝖘 𝖎𝖙'𝖘 𝖈𝖗𝖊𝖆𝖙𝖎𝖔𝖓𝖘 𝖇𝖞 𝖆𝖑𝖑 𝖚𝖓𝖎𝖖𝖚𝖊 𝖛𝖆𝖑𝖚𝖊𝖘 𝖇𝖊𝖘𝖙𝖔𝖜𝖊𝖉 𝖚𝖕𝖔𝖓 𝖙𝖍𝖊𝖒
    /**
     * This function will return an ID based off the user email and password.
     * @param email requires the email to find a match in the database.
     * @param password requires the password to find a match in the database.
     * @returns the ID of the entry which matches to the parameters above.
     */
    public async getUserByEmailAndPassword(email: string, password: string): Promise<User | undefined> {
        try {
            const result: userResult[] = await api.queryDatabase(
                "SELECT * FROM user WHERE email = ? AND password = ?", email, password) as userResult[];
            if (result.length > 0) {
                return new User(result[0].userId, result[0].email, result[0].password, result[0].username);
            }
            else {
                return undefined;
            }
        }
        catch (reason) {
            console.error("An error occurred while searching these records.", reason);
            return undefined;
        }
    }

    /**
     * This function will return an ID based off the user username and password.
     * @param username requires the email to find a match in the database.
     * @param password requires the password to find a match in the database.
     * @returns the ID of the entry which matches to the parameters above.
     */
    public async getUserByUsernameAndPassword(username: string, password: string): Promise<User | undefined> {
        try {
            const result: userResult[] = await api.queryDatabase(
                "SELECT * FROM user WHERE username = ? AND password = ?", username, password) as userResult[];
            if (result.length > 0) {
                return new User(result[0].userId, result[0].email, result[0].password, result[0].username);
            }
            else {
                return undefined;
            }
        }
        catch (reason) {
            console.error("An error occurred while searching these records.", reason);
            return undefined;
        }
    }

    // 𝕲𝖆𝖙𝖍𝖊𝖗 𝖗𝖔𝖚𝖓𝖉 𝖆𝖓𝖉 𝖜𝖎𝖙𝖓𝖊𝖘𝖘 𝖙𝖍𝖊 𝖒𝖎𝖗𝖆𝖈𝖑𝖊 𝖔𝖋 𝖑𝖎𝖋𝖊 𝖚𝖓𝖋𝖔𝖑𝖉 𝖇𝖊𝖋𝖔𝖗𝖊 𝖞𝖔𝖚𝖗 𝖊𝖞𝖊𝖘. 𝕿𝖍𝖎𝖘 𝖎𝖘 𝖜𝖍𝖊𝖗𝖊 𝖎𝖙 𝖍𝖆𝖕𝖕𝖊𝖓𝖘. 𝕿𝖍𝖊 𝖔𝖗𝖎𝖌𝖎𝖓 𝖔𝖋 𝖆𝖑𝖑 𝖑𝖎𝖋𝖊 𝖜𝖎𝖙𝖍𝖎𝖓 𝖙𝖍𝖎𝖘 𝖕𝖗𝖔𝖌𝖗𝖆𝖒
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
                "INSERT INTO user (username, email, password) VALUES (?, ?, ?)", username, email, password
            ) as userResult[];

            console.log("Success", result);
            return true;
        }
        catch (reason) {
            console.error("An error occurred while creating a new database entry.", reason);
            return false;
        }
    }

    // 𝕳𝖊𝖗𝖊 𝖎𝖙'𝖘 𝖒𝖆𝖏𝖊𝖘𝖙𝖞, 𝖆𝖑𝖙𝖊𝖗𝖘 𝖆𝖓𝖉 𝖆𝖉𝖏𝖚𝖘𝖙𝖘 𝖎𝖙'𝖘 𝖈𝖗𝖊𝖆𝖙𝖎𝖔𝖓𝖘 𝖎𝖓 𝖎𝖙'𝖘 𝖉𝖎𝖛𝖎𝖓𝖊 𝖎𝖒𝖆𝖌𝖊.
    public async update(username: string, email: string, password: string, id: number): Promise<boolean> {
        try {
            const result: userResult[] = await api.queryDatabase("UPDATE users SET username = ? email = ? password = ? WHERE userId = ?", [username, email, password, id]) as userResult[];
            console.log("Succes", result);
            return true;
        }
        catch (reason) {
            console.error("There has been an error updating these records", reason);
            return false;
        }
    }

    // 𝕳𝖊𝖗𝖊 𝖎𝖙 𝖇𝖊𝖈𝖐𝖔𝖓𝖘 𝖆𝖓𝖞 𝖚𝖓𝖋𝖎𝖙 𝖇𝖊𝖎𝖓𝖌 𝖇𝖆𝖈𝖐 𝖙𝖔 𝖙𝖍𝖊 𝖉𝖚𝖘𝖙 𝖋𝖗𝖔𝖒 𝖜𝖍𝖊𝖓𝖈𝖊 𝖎𝖙 𝖜𝖆𝖘 𝖋𝖔𝖗𝖒𝖊𝖉.
    // public async delete(): Promise<boolean> {
    //     return;
    // }

    // 𝖄𝖔𝖚'𝖛𝖊 𝖗𝖊𝖆𝖈𝖍𝖊𝖉 𝖙𝖍𝖊 𝖑𝖎𝖒𝖎𝖙𝖘 𝖔𝖋 𝖙𝖍𝖊 𝖆𝖑𝖒𝖎𝖌𝖍𝖙𝖞 𝖔𝖓𝖊. 𝖇𝖊𝖞𝖔𝖓𝖉 𝖙𝖍𝖎𝖘 𝖕𝖔𝖎𝖓𝖙 𝖑𝖎𝖊𝖘 𝖙𝖍𝖊 𝖘𝖊𝖑𝖋 𝖊𝖝𝖕𝖑𝖆𝖓𝖆𝖙𝖔𝖗𝖞. 𝕻𝖗𝖆𝖞 𝖙𝖍𝖆𝖙 𝖙𝖍𝖊 𝖀𝖘𝖊𝖗 𝖒𝖔𝖉𝖊𝖑 𝖗𝖊𝖒𝖆𝖎𝖓𝖘 𝖒𝖊𝖗𝖈𝖎𝖋𝖚𝖑
    // Getters / Setters
    public getId(): number {
        return this._userId;
    }

    public getEmail(): string {
        return this._email;
    }

    public setEmail(email: string): void {
        this._email = email;
    }

    public getPassword(): string {
        return this._password;
    }

    public setPassword(password: string): void {
        this._password = password;
    }

    public getUserName(): string {
        return this._username;
    }

    public setUserName(username: string): void {
        this._username = username;
    }
}
