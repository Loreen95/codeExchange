import { User } from "../models/User";
const userModel: User = new User("", "", "", 0);

export class LoginClass {
    private _email: string;
    private _username: string;
    private _password: string;

    public constructor(email: string, username: string, password: string) {
        this._email = email;
        this._username = username;
        this._password = password;
    }
    public async checkRecords(): Promise<boolean | undefined> {
        const errorMessage: string = "";
    }
}
