// The file name should be pretty self explanatory as to the contents of this file.

// Collect seperate files and instanciate needed objects.
import { User } from "../models/User";
const userModel: User = new User("", "", "", 0);
import UserInterfaceClass from "../views/interface";
const UI: UserInterfaceClass = new UserInterfaceClass();

export class LoginClass {
    // Clear error message
    private _errorMessage: string = "";

    /* This assesses given credentials to find out wich use is trying to log in.
    *  It receives an email and password as arguments
    *  And the function promises returns an object with the custom User datatype or nothing at all
    */
    public async checkRecords(givenEmail: string, givenPassword: string): Promise<User | undefined> {
        const resultEmailPassword: User | undefined = await userModel.getUserByEmailAndPassword(givenEmail, givenPassword);

        // This determines if there is a connection to the user from the comibnation of the email and password
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

    /* This function determines if the credentials exist, and are valid before logging you in
    *  It receives all necceseary login credentials as arguments
    *  And promises to return nothing
    */
    public async onClickLogin(givenEmail: string, givenPassword: string): Promise<void> {
        try {
            // access error field on html and clear it
            const errorMessage: HTMLParagraphElement = document.querySelector("#errMsg")!;
            errorMessage.innerHTML = "";

            // These errors should explain what every part does
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
            // This activates the check reccords function and logs the user in if it succseeds the checks
            else {
                const user: User | undefined = await this.checkRecords(givenEmail, givenPassword);
                if (user) {
                    const userId: number | string = user.getId().toString();
                    sessionStorage.setItem("session", userId);
                    sessionStorage.setItem("lang", "en");
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
