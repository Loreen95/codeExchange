import "../hicConfig";
import { api } from "@hboictcloud/api";
import { postResult, userResult } from "../views/types";

/* Class User
 * This class represents a user
 */
export class User {
    private _userId: number;
    private _email: string;
    private _password: string;
    private _username: string;
    private _bio: string | undefined;
    private _dob: Date | undefined;
    private _yearsExperience: number | undefined;
    private _createdAt: Date | undefined;
    private _expertise: string | undefined;

    public constructor(userId: number, email: string, username: string, password: string) {
        this._userId = userId;
        this._email = email;
        this._username = username;
        this._password = password;
    }

    /**
     * This function determines whether an email adress exists.
     * @param email requires the emailadress for the data-query.
     * @returns true or false based off database data.
     */
    public static async doesUserExistForEmail(email: string): Promise<boolean | undefined> {
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

    /**
     * This function determines whether a username exists.
     * @param username requires username for the data-query.
     * @returns true or false based off database data.
     */
    public static async doesUserExistForUsername(username: string): Promise<boolean | undefined> {
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

    /**
     * This function will find a user based off their ID.
     * @param userId requires the ID to find a match in de database.
     */
    public static async getUserById(userId: number): Promise<User | undefined> {
        try {
            const result: userResult[] = await api.queryDatabase("SELECT * from user WHERE userId = ?", [userId]) as userResult[];
            if (result.length > 0) {
                const user: User = new User(result[0].userId, result[0].email, result[0].username, result[0].password);
                user.bio = result[0].bio;
                user.dob = result[0].dob;
                user.yearsExperience = result[0].yearsExperience;
                user.createdAt = result[0].createdAt;
                user.expertise = result[0].expertise;
                return user;
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

    /**
     * This function will return an ID based off the user email and password.
     * @param email requires the email to find a match in the database.
     * @param password requires the password to find a match in the database.
     * @returns the ID of the entry which matches to the parameters above.
     */
    public static async getUserByEmailAndPassword(email: string, password: string): Promise<User | undefined> {
        try {
            const result: userResult[] = await api.queryDatabase(
                "SELECT * FROM user WHERE email = ? AND password = ?", email, password) as userResult[];
            if (result.length > 0) {
                return new User(result[0].userId, result[0].email, result[0].username, result[0].password);
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
    public static async getUserByUsernameAndPassword(username: string, password: string): Promise<User | undefined> {
        try {
            const result: userResult[] = await api.queryDatabase(
                "SELECT * FROM user WHERE username = ? AND password = ?", username, password) as userResult[];
            if (result.length > 0) {
                return new User(result[0].userId, result[0].email, result[0].username, result[0].password);
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
     * Stores inputted data into the database.
     * @param username requires the username to be put in the database.
     * @param email requires the email to be put in the database.
     * @param password requires the password to be put in the database.
     * @returns boolean.
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

    /**
     * Updates userId with inputted data
     * @param username the username
     * @param email the emailaddress
     * @param dob the dob
     * @param bio the bio
     * @param userId userId
     * @returns boolean based of success
     */
    public async update(username: string, email: string, dob: string, bio: string, yearsExperience: number, expertise: string, userId: number): Promise<boolean> {
        try {
            const result: userResult[] = await api.queryDatabase(
                "UPDATE user SET username = ?, email = ?, dob = ?, bio = ?, yearsExperience = ?, expertise = ? WHERE userId = ?",
                username, email, dob, bio, yearsExperience, expertise, userId
            ) as userResult[];
            console.log("Success:", result);
            return true;
        }
        catch (reason) {
            console.error("There has been an error updating these records", reason);
            return false;
        }
    }

    public static async delete(userId: number): Promise<boolean> {
        try {
            const result: postResult[] = await api.queryDatabase("DELETE FROM user WHERE userId = ?", [userId]) as postResult[];
            console.log("User deleted successfully:", result);
            return true;
        }
        catch (reason) {
            console.error("Error while deleting user:", reason);
            return false;
        }
    }

    public static async countTotalUsers(): Promise<number | undefined> {
        try {
            const result: userResult[] = await api.queryDatabase("SELECT COUNT(*) as count FROM user") as userResult[];
            if (result.length > 0) {
                return result[0].count;
            }
            else {
                console.error("No results found");
                return undefined;
            }
        }
        catch (reason) {
            console.error("Error fetching result", reason);
            return undefined;
        }
    }

    // Getters / Setters
    public get userId(): number {
        return this._userId;
    }

    public get email(): string {
        return this._email;
    }

    public set email(email: string) {
        this._email = email;
    }

    public get password(): string {
        return this._password;
    }

    public set password(password: string) {
        this._password = password;
    }

    public get userName(): string {
        return this._username;
    }

    public set userName(username: string) {
        this._username = username;
    }

    public get bio(): string | undefined {
        return this._bio;
    }

    public set bio(bio: string | undefined) {
        this._bio = bio;
    }

    public get dob(): Date | undefined {
        return this._dob;
    }

    public set dob(dob: Date | undefined) {
        this._dob = dob;
    }

    public get yearsExperience(): number | undefined {
        return this._yearsExperience;
    }

    public set yearsExperience(yearsExperience: number | undefined) {
        this._yearsExperience = yearsExperience;
    }

    public get createdAt(): Date | undefined {
        return this._createdAt;
    }

    public set createdAt(createdAt: Date | undefined) {
        this._createdAt = createdAt;
    }

    public get expertise(): string | undefined {
        return this._expertise;
    }

    public set expertise(expertise: string | undefined) {
        this._expertise = expertise;
    }
}
