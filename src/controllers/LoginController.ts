import { User } from "../models/User";
const userModel: User = new User("", "", "", 0);

export class LoginClass {
    private _errorMessage: string = "";
    private _email: string;
    private _username: string;
    private _password: string;

    public constructor(username: string, email: string, password: string) {
        this._username = username;
        this._email = email;
        this._password = password;
    }

    public checkRecords(givenEmail: string, givenPassword: string): boolean {
        // const resultEmailPassword: User | undefined = await userModel.getUserByEmailAndPassword(givenEmail, givenPassword);
        if (this._email !== givenEmail) {
            this._errorMessage = "De emailadressen komen niet overeen!";
            return false;
        }
        else if (this._password !== givenPassword) {
            this._errorMessage = "De wachtwoorden komen niet overeen!";
            return false;
        }
        // else if (this._email === givenEmail || this._password === givenPassword) {
        //     this._errorMessage = "Dit is een test";
        //     console.log(resultEmailPassword);
        //     return true;
        // }
        else {
            this._errorMessage = "Er is een fout opgetreden bij het ophalen van de gegevens";
            return false;
        }
    }

    public async verifyCridentials(givenEmail: string, givenPassword: string): Promise<void> {
        const errorMessage: HTMLParagraphElement = document.querySelector("#errMsg")!;
        const infoMessage: HTMLParagraphElement = document.querySelector("#infoMsg")!;

        errorMessage.innerHTML = "";
        infoMessage.innerText = "";

        if (!givenEmail) {
            errorMessage.innerText = "you must provide an email";
        }
        else if (!this.checkRecords(givenEmail, givenPassword)) {
            errorMessage.innerText = String(this._errorMessage);
        }
        else {
            errorMessage.innerHTML = "";
            infoMessage.innerText = "Success!";
            window.location.href = "http://localhost:3000/landingspagina.html";
        }
    }
}
