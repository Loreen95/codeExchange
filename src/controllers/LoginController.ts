import { User } from "../models/User";
import { session } from "@hboictcloud/api";
const userModel: User = new User("", "", "", 0);
import UserInterfaceClass from "../views/interface";
const UI: UserInterfaceClass = new UserInterfaceClass();

export class LoginClass {
    private _errorMessage: string = "";

    public async checkRecords(givenEmail: string, givenPassword: string): Promise<boolean> {
        const resultEmailPassword: User | undefined = await userModel.getUserByEmailAndPassword(givenEmail, givenPassword);
        if (resultEmailPassword?.getEmail() !== givenEmail) {
            this._errorMessage = "De emailadressen komen niet overeen!";
            return false;
        }
        else if (resultEmailPassword.getPassword() !== givenPassword) {
            this._errorMessage = "De wachtwoorden komen niet overeen!";
            return false;
        }
        else if (resultEmailPassword.getEmail() === givenEmail || resultEmailPassword.getPassword() === givenPassword) {
            this._errorMessage = "Dit is een test";
            console.log(resultEmailPassword);
            return true;
        }
        else {
            this._errorMessage = "Er is een fout opgetreden bij het ophalen van de gegevens";
            return false;
        }
    }

    public async onClickLogin(givenEmail: string, givenPassword: string): Promise<void> {
        try {
            const errorMessage: HTMLParagraphElement = document.querySelector("#errMsg")!;
            errorMessage.innerHTML = "";

            if (!givenEmail) {
                errorMessage.innerText = "you must provide an email";
            }
            else if (!givenEmail.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
                errorMessage.innerText = "Provided email is invalid";
            }
            else if (!givenPassword) {
                errorMessage.innerText = "you must provide a password";
            }
            else if (!await this.checkRecords(givenEmail, givenPassword)) {
                errorMessage.innerText = String(this._errorMessage);
            }
            else {
                const userId: number | undefined = userModel.getId();
                errorMessage.innerHTML = "";
                session.set("Logged in User", userId);
                window.location.href = "http://localhost:3000/landingspagina.html";
                UI.adjustPageToLoginStatus(true);
            }
        }
        catch (reason) {
            console.error("Fout bij het inloggen.", reason);
        }
    }
}
