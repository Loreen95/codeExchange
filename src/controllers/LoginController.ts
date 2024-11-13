import { User } from "../models/User";
import { session } from "@hboictcloud/api";
const userModel: User = new User("", "", "", 0);
import UserInterfaceClass from "../views/interface";
const UI: UserInterfaceClass = new UserInterfaceClass();

export class LoginClass {
    private _errorMessage: string = "";

    public async checkRecords(givenEmail: string, givenPassword: string): Promise<number | undefined> {
        try {
            // Haal het ID op via getUserByEmailAndPassword
            const userId: number | undefined = await userModel.getUserByEmailAndPassword(givenEmail, givenPassword);

            if (!userId) {
                this._errorMessage = "De ingevoerde gegevens komen niet overeen.";
                return undefined;
            }
            else {
                return userId; // Retourneer het ID van de gebruiker
            }
        }
        catch (reason) {
            console.error("Error", reason);
            return undefined; // Als er een fout optreedt, retourneer undefined
        }
    }

    public async onClickLogin(givenEmail: string, givenPassword: string): Promise<void> {
        try {
            const errorMessage: HTMLParagraphElement = document.querySelector("#errMsg")!;
            errorMessage.innerHTML = "";

            if (!givenEmail) {
                errorMessage.innerText = "Je moet een emailadres opgeven";
            }
            else if (!givenPassword) {
                errorMessage.innerText = "Voer een wachtwoord in!";
            }
            else if (!await this.checkRecords(givenEmail, givenPassword)) {
                errorMessage.innerText = String(this._errorMessage);
            }
            else {
                const userId: number | undefined = await this.checkRecords(givenEmail, givenPassword);
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
