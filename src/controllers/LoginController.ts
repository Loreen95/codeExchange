// Collect seperate files and instanciate needed objects.
import { User } from "../models/User";
import UserInterfaceClass from "../views/interface";

export class LoginController {
    private _UI: UserInterfaceClass;
    public constructor() {
        this._UI = new UserInterfaceClass();
    }

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
        const chosenlanguage: string = sessionStorage.getItem("lang")!;
        let resultRecords: User | undefined;
        if (this.isEmail(givenUsernameOrEmail)) {
            console.log("The user used an email address.");
            resultRecords = await User.getUserByEmailAndPassword(givenUsernameOrEmail, givenPassword);
        }
        else {
            console.log("The user used a username.");
            resultRecords = await User.getUserByUsernameAndPassword(givenUsernameOrEmail, givenPassword);
        }
        // This determines if there is a connection to the user from the comibnation of the email and password
        if (!resultRecords) {
            if (chosenlanguage === "en") {
                this._errorMessage = "This user does not exist!";
            }
            else if (chosenlanguage === "nl") {
                this._errorMessage = "Deze gebruiker bestaat niet!";
            }
            return undefined;
        }
        if (this.isEmail(givenUsernameOrEmail)) {
            if (resultRecords.email !== givenUsernameOrEmail) {
                if (chosenlanguage === "en") {
                    this._errorMessage = "The email or password does not match our records!";
                }
                else if (chosenlanguage === "nl") {
                    this._errorMessage = "Het emailadres of wachtwoord staat niet in ons systeem!";
                }
                console.log("Email Check Failed:", resultRecords);
                return undefined;
            }
        }
        else {
            if (resultRecords.userName !== givenUsernameOrEmail) {
                if (chosenlanguage === "en") {
                    this._errorMessage = "The username or email does not match our records!";
                }
                else if (chosenlanguage === "nl") {
                    this._errorMessage = "De gebruikersnaam of wachtwoord staat niet in ons systeem!";
                }
                console.log("Username Check:", resultRecords);
                return undefined;
            }
        }

        if (resultRecords.password !== givenPassword) {
            if (chosenlanguage === "en") {
                this._errorMessage = "The username or email does not match our records!";
            }
            else if (chosenlanguage === "nl") {
                this._errorMessage = "De gebruikersnaam of wachtwoord staat niet in ons systeem!";
            }
            console.log("Wachtwoord Check:", resultRecords);
            return undefined;
        }
        return resultRecords; // retourneert het User object als alle checks kloppen
    }

    /* This function determines if the credentials exist, and are valid before logging you in
    *  It receives all necceseary login credentials as arguments
    *  And promises to return nothing
    */
    public async onClickLogin(givenUsernameOrEmail: string, givenPassword: string): Promise<void> {
        const chosenlanguage: string = sessionStorage.getItem("lang")!;
        try {
            // access error field on html and clear it
            const errorMessage: HTMLParagraphElement = document.querySelector("#errMsg")!;
            const successMessage: HTMLParagraphElement = document.querySelector("#successMsg")!;

            errorMessage.innerHTML = "";
            successMessage.innerHTML = "";
            // These errors should explain what every part does
            if (!givenUsernameOrEmail) {
                if (chosenlanguage === "en") {
                    errorMessage.innerText += "You must provide an email or username\n";
                }
                else if (chosenlanguage === "nl") {
                    errorMessage.innerText += "Voer een gebruikersnaam in\n";
                }
                this._UI.unleashTheErrorPopup(true);
            }
            if (!givenPassword) {
                if (chosenlanguage === "en") {
                    errorMessage.innerText += "You must provide a password\n";
                }
                else if (chosenlanguage === "nl") {
                    errorMessage.innerText += "Voer een wachtwoord in\n";
                }
                this._UI.unleashTheErrorPopup(true);
            }
            // This activates the check reccords function and logs the user in if it succseeds the checks
            else {
                const user: User | undefined = await this.checkRecords(givenUsernameOrEmail, givenPassword);
                if (user) {
                    this._UI.unleashTheErrorPopup(false);
                    const userId: number | string = String(user.userId);
                    sessionStorage.setItem("session", userId);
                    sessionStorage.setItem("lang", "en");
                    if (chosenlanguage === "en") {
                        successMessage.innerText += "You have logged in, redirecting to homepage.";
                    }
                    else if (chosenlanguage === "nl") {
                        successMessage.innerText += "Je bent ingelogd en wordt doorgestuurd naar de homepagina";
                    }
                    this._UI.successMessagePopup(true);
                    setTimeout(() => {
                        window.location.href = "http://localhost:3000/landingspagina.html";
                    }, 1300);
                }
                else {
                    errorMessage.innerText = this._errorMessage;
                    this._UI.unleashTheErrorPopup(true);
                }
            }
        }
        catch (reason) {
            console.error("Fout bij het inloggen.", reason);
        }
    }
}
