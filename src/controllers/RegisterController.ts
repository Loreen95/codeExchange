// This links this controller to the almightu User Model.
import { User } from "../models/User";
const userModel: User = new User(0, "", "", "");
import { LoginClass } from "./LoginController";
const login: LoginClass = new LoginClass();
import UserInterfaceClass from "../views/interface";
const UI: UserInterfaceClass = new UserInterfaceClass();
// This is where every mayor process takes place right here in this class.
class RegistrationClass {
    // this resets the popup information (error and info tab)
    private _whyItIsNotGoodEnough: string = ""; // Error messages
    private _neededInformation: string = ""; // Information needed

    /* This function evaluates a password for it's strength and provides needed information if it's too weak to survive
     *  The only argument it receives is the provided password.
     *  And the return value is a boolean as a failing or passing grade.
    */
    private passChecker(givenPassword: string): boolean {
        // This returns a failing grade if the password is too small and pitifull
        if (givenPassword.length < 7) {
            this._whyItIsNotGoodEnough = "your password is too short.";
            this._neededInformation = "Note: Use at least 7 caracters.";
            return false;
        }
        // This returns a failing grade if the password is too large. (we don't have an infinite amount of storage).
        else if (givenPassword.length > 20) {
            this._whyItIsNotGoodEnough = "Your password is too long.";
            this._neededInformation = "Note: You're not gonna remember all that. Use a maximum of 20 caracters.";
            return false;
        }
        else {
            // This is the final exam that checks the afinnity and strength of the password.
            if (givenPassword.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()]).{8,}$/)) {
                return true;
            }
            // And this is what happens if the pasword was found wanting.
            else {
                this._whyItIsNotGoodEnough = "Your password is unsafe.";
                this._neededInformation = "Note: You must include the following in your password: ";
                // This figures out the reason why the password is so pathetic and displays it to the user.
                if (!givenPassword.match(/[a-z]/)) {
                    this._neededInformation += "-lowercase letters ";
                }
                if (!givenPassword.match(/[A-Z]/)) {
                    this._neededInformation += "-uppercase letters ";
                }
                if (!givenPassword.match(/[0-9]/)) {
                    this._neededInformation += "-numbers ";
                }
                if (!givenPassword.match(/[!@#$%^&*()]/)) {
                    this._neededInformation += "-special caracters ";
                }
                return false;
            }
        }
    }

    /**
     * This here function contains an else if chain that goes through each individual input,
     * and spits out an error with some information on the html page if somethings wrong with them
     * It also activates the
     * Arguments include the three user inputs: username, password, and email
     * The return value is a void (nothing) because it's just supposed to process and directly display information
    */
    public async onClickRegister(userInputName: string, userInputEmail: string, userInputPassword: string): Promise<void> {
        // This gatheres the needed Html elements to display warnings and information about the provided credentials
        const errorMessage: HTMLParagraphElement = document.querySelector("#errMsg")!;
        const infoMessage: HTMLParagraphElement = document.querySelector("#infoMsg")!;
        const successMessage: HTMLParagraphElement = document.querySelector("#successMsg")!;
        // And this calls in the input fields so I can make them red later.
        const emailAdressUserInput: HTMLInputElement = document.querySelector("#emailInput")!;
        const nameUserInput: HTMLInputElement = document.querySelector("#userName")!;
        const passwordUserInput: HTMLInputElement = document.querySelector(".passPhrase")!;

        // This resets everything everytime this method is used.
        errorMessage.innerHTML = "";
        infoMessage.innerText = "";
        nameUserInput.style.border = "solid rgb(58, 58, 58)";
        emailAdressUserInput.style.border = "solid rgb(58, 58, 58)";
        passwordUserInput.style.border = "solid rgb(58, 58, 58)";
        infoMessage.style.display = "none";

        // and this boolean gets set to false if any error occurs. If it remains true the user will be created
        let allIsInOrder: boolean = true;

        // this list of else if, assesses the received credentials. I trust the error messages themselves are self explanatory
        if (!userInputName) {
            errorMessage.innerText += "You must provide a name.\n";
            nameUserInput.style.border = "solid rgb(168, 32, 32) 3px";
            allIsInOrder = false;
        }
        else if (String(await userModel.doesUserExistForUsername(userInputName)) === "true") {
            errorMessage.innerText += "Provided Username is already in use.\n";
            nameUserInput.style.border = "solid rgb(168, 32, 32) 3px";
            allIsInOrder = false;
        }
        if (!userInputEmail) {
            errorMessage.innerText += "You must provide an email.\n";
            emailAdressUserInput.style.border = "solid rgb(168, 32, 32) 3px";
            allIsInOrder = false;
        }
        else if (!userInputEmail.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
            errorMessage.innerText += "The email is invalid.\n";
            emailAdressUserInput.style.border = "solid rgb(168, 32, 32) 3px";
            allIsInOrder = false;
        }
        else if (await userModel.doesUserExistForEmail(userInputEmail)) {
            errorMessage.innerText += "This email is already being used.\n";
            emailAdressUserInput.style.border = "solid rgb(168, 32, 32) 3px";
            allIsInOrder = false;
        }
        if (!userInputPassword) {
            errorMessage.innerText += "You must provide a password.\n";
            passwordUserInput.style.border = "solid rgb(168, 32, 32) 3px";
            allIsInOrder = false;
        }
        // This here calls forth the password examination and displays appropreate errors and info when a failure occurs
        else if (!this.passChecker(userInputPassword)) {
            infoMessage.style.display = "block";
            errorMessage.innerText += String(this._whyItIsNotGoodEnough);
            infoMessage.innerText += String(this._neededInformation);
            passwordUserInput.style.border = "solid rgb(168, 32, 32) 2px";
            allIsInOrder = false;
        }

        // And finally when all is checked and double checked and no faults where found. The user will actually be created
        if (allIsInOrder) {
            UI.unleashTheErrorPopup(false);
            errorMessage.innerHTML = "";
            infoMessage.innerText = "Success!";
            successMessage.innerText = "";
            try {
                // Gebruiker aanmaken
                const createdUser: boolean = await userModel.create(userInputName, userInputEmail, userInputPassword);
                console.log("Aangemaakte gebruiker:", createdUser);
                successMessage.innerText += "Account creation was succesful. You will be logged in automatically.";
                UI.successMessagePopup(true);
                // 5MS Wachten
                await new Promise(resolve => setTimeout(resolve, 1000));
                // Check of de gebruiker succesvol kan inloggen
                await login.onClickLogin(userInputEmail, userInputPassword);
            }
            catch (reason) {
                console.error("Fout tijdens registratie en inloggen:", reason);
                console.log("Detail van de fout:", JSON.stringify(reason, null, 2));
                errorMessage.innerHTML = "An error occurred. Please try again later.";
            }
        }
        else {
            UI.unleashTheErrorPopup(true);
        }
    }
}

export default RegistrationClass;
