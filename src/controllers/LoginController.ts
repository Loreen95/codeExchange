import { User } from "../models/User";
const userModel: User = new User("", "", "", 0);
import UserInterfaceClass from "../views/interface";
const UI: UserInterfaceClass = new UserInterfaceClass();

export class LoginClass {
    private _errorMessage: string = "";

    public async checkRecords(givenEmail: string, givenPassword: string): Promise<User | undefined> {
        const resultEmailPassword: User | undefined = await userModel.getUserByEmailAndPassword(givenEmail, givenPassword);
        if (!resultEmailPassword) {
            // this._errorMessage = "De gebruiker bestaat niet!";
            this._errorMessage = "Incorrect password";
            return undefined;
        }
        if (resultEmailPassword.getEmail() !== givenEmail) {
            this._errorMessage = "De emailadressen komen niet overeen!";
            return undefined;
        }
        if (resultEmailPassword.getPassword() !== givenPassword) {
            this._errorMessage = "De wachtwoorden komen niet overeen!";
            return undefined;
        }
        return resultEmailPassword; // retourneert het User object als alle checks kloppen
    }

    public async onClickLogin(givenEmail: string, givenPassword: string): Promise<void> {
        try {
            const errorMessage: HTMLParagraphElement = document.querySelector("#errMsg")!;
            errorMessage.innerHTML = "";

            if (!givenEmail) {
                // errorMessage.innerText = "Je moet een e-mailadres opgeven";
                errorMessage.innerText = "you must provide an email";
            }
            else if (!givenEmail.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
                // errorMessage.innerText = "Het opgegeven e-mailadres is ongeldig";
                errorMessage.innerText = "The provided email is invalid";
            }
            else if (!givenPassword) {
                // errorMessage.innerText = "Je moet een wachtwoord opgeven";
                errorMessage.innerText = "you must provide a password";
            }
            else {
                const user: User | undefined = await this.checkRecords(givenEmail, givenPassword);
                if (user) {
                    const userId: number | string = user.getId().toString();
                    // Sla alleen het userId direct op in de sessie zonder extra key
                    sessionStorage.setItem("session", userId);
                    window.location.href = "http://localhost:3000/landingspagina.html";
                    UI.adjustPageToLoginStatus(true);
                }
                else {
                    errorMessage.innerText = this._errorMessage;
                }
            }
        }
        catch (reason) {
            console.error("Fout bij het inloggen.", reason);
        }
    }
}
