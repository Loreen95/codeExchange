// The file name should be pretty self explanatory as to the contents of this file.

// Collect seperate files and instanciate needed objects.
import { User } from "../models/User";
const userModel: User = new User(0, "", "", "");
import UserInterfaceClass from "../views/interface";
const UI: UserInterfaceClass = new UserInterfaceClass();

export class LoginClass {
    // Clear error message
    private _errorMessage: string = "";

    /**
     * This function determines whether someone put in an email address or a username.
     * @param input It takes the input existing of username or email.
     * @returns True or false based off the reg-ex match. (True for email, false for username);
     */
    public isEmail(input: string): boolean {
        const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        console.log(emailRegex.test(input));
        return emailRegex.test(input);
    }

    /* This assesses given credentials to find out wich use is trying to log in.
    *  It receives an email and password as arguments
    *  And the function promises returns an object with the custom User datatype or nothing at all
    */
    public async checkRecords(givenUsernameOrEmail: string, givenPassword: string): Promise<User | undefined> {
        let resultRecords: User | undefined;
        if (this.isEmail(givenUsernameOrEmail)) {
            console.log("The user used an email address.");
            resultRecords = await userModel.getUserByEmailAndPassword(givenUsernameOrEmail, givenPassword);
        }
        else {
            console.log("The user used a username.");
            resultRecords = await userModel.getUserByUsernameAndPassword(givenUsernameOrEmail, givenPassword);
        }
        // This determines if there is a connection to the user from the comibnation of the email and password
        if (!resultRecords) {
            this._errorMessage = "This user does not exist!";
            return undefined;
        }
        else if (this.isEmail(givenUsernameOrEmail) && resultRecords.getEmail() !== givenUsernameOrEmail) {
            this._errorMessage = "The email does not match our records!";
            return undefined;
        }
        else if (this.isEmail(givenUsernameOrEmail) && resultRecords.getUserName() !== givenUsernameOrEmail) {
            this._errorMessage = "The email or username does not match our records!";
            return undefined;
        }
        else if (resultRecords.getPassword() !== givenPassword) {
            this._errorMessage = "The password does not match our records!";
            return undefined;
        }
        return resultRecords; // retourneert het User object als alle checks kloppen
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
