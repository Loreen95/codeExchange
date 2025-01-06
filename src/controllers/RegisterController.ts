// This links this controller to the almightu User Model.
import { User } from "../models/User";
import { LoginController } from "./LoginController";
import UserInterfaceClass from "../views/interface";
// This is where every mayor process takes place right here in this class.
class RegistrationClass {
    private _userModel: User | undefined;
    private _login: LoginController;
    private _UI: UserInterfaceClass;

    public constructor() {
        this._login = new LoginController();
        this._UI = new UserInterfaceClass();
    }

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
            // This is the final exam that checks the affinity and strength of the password.
            // All it does is see if the password contains uppercase letters, lowercase letters, numbers and at least one special carcter
            if (givenPassword.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()]).{8,}$/)) {
                return true;
            }
            // This is what happens if the password was found wanting and doesn't contain all requirements.
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

    public alterInputFields(whatInput?: string): void {
        const emailAdressUserInput: HTMLInputElement = document.querySelector("#emailInput")!;
        const nameUserInput: HTMLInputElement = document.querySelector("#userName")!;
        const passwordUserInput: HTMLInputElement = document.querySelector(".passPhrase")!;
        const grayBorder: string = "solid rgb(58, 58, 58)";
        const redBorder: string = "solid rgb(168, 32, 32) 3px";
        if (!whatInput) {
            nameUserInput.style.border = grayBorder;
            emailAdressUserInput.style.border = grayBorder;
            passwordUserInput.style.border = grayBorder;
        }
        else if (whatInput === "nameUserInput") {
            nameUserInput.style.border = redBorder;
        }
        else if (whatInput === "emailAdressUserInput") {
            emailAdressUserInput.style.border = redBorder;
        }
        else if (whatInput === "passwordUserInput") {
            passwordUserInput.style.border = redBorder;
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
        this._userModel = new User(0, userInputEmail, userInputName, userInputPassword);
        // This gatheres the needed Html elements to display warnings and information about the provided credentials
        const errorMessage: HTMLParagraphElement = document.querySelector("#errMsg")!;
        const infoMessage: HTMLParagraphElement = document.querySelector("#infoMsg")!;
        const successMessage: HTMLParagraphElement = document.querySelector("#successMsg")!;
        // And this resets the input field styling,
        this.alterInputFields();
        // This resets everything everytime this method is used.
        errorMessage.innerHTML = "";
        infoMessage.innerText = "";
        infoMessage.style.display = "none";

        // and this boolean gets set to false if any error occurs. If it remains true the user will be created
        let allIsInOrder: boolean = true;

        // this list of else if, assesses the received credentials. I trust the error messages themselves are self explanatory
        if (!userInputName) {
            errorMessage.innerText += "You must provide a name.\n";
            this.alterInputFields("nameUserInput");
            allIsInOrder = false;
        }
        else if (String(await User.doesUserExistForUsername(userInputName)) === "true") {
            errorMessage.innerText += "Provided Username is already in use.\n";
            this.alterInputFields("nameUserInput");
            allIsInOrder = false;
        }
        if (!userInputEmail) {
            errorMessage.innerText += "You must provide an email.\n";
            this.alterInputFields("emailAdressUserInput");
            allIsInOrder = false;
        }
        // this regex looks for strings that resemble valid email adresses.
        else if (!userInputEmail.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
            errorMessage.innerText += "The email is invalid.\n";
            this.alterInputFields("emailAdressUserInput");
            allIsInOrder = false;
        }
        else if (await User.doesUserExistForEmail(userInputEmail)) {
            errorMessage.innerText += "This email is already being used.\n";
            this.alterInputFields("emailAdressUserInput");
            allIsInOrder = false;
        }
        if (!userInputPassword) {
            errorMessage.innerText += "You must provide a password.\n";
            this.alterInputFields("passwordUserInput");
            allIsInOrder = false;
        }
        // This here calls forth the password examination and displays appropreate errors and info when a failure occurs
        else if (!this.passChecker(userInputPassword)) {
            infoMessage.style.display = "block";
            errorMessage.innerText += String(this._whyItIsNotGoodEnough);
            infoMessage.innerText += String(this._neededInformation);
            this.alterInputFields("passwordUserInput");
            allIsInOrder = false;
        }

        // And finally when all is checked and double checked and no faults where found. The user will actually be created
        if (allIsInOrder) {
            this._UI.unleashTheErrorPopup(false);
            errorMessage.innerHTML = "";
            infoMessage.innerText = "Success!";
            successMessage.innerText = "";
            try {
                // Gebruiker aanmaken
                const createdUser: User | undefined = await this._userModel.create(userInputName, userInputEmail, userInputPassword);
                console.log("Aangemaakte gebruiker:", createdUser);
                successMessage.innerText += "Account creation was succesful. You will be logged in automatically.";
                this._UI.successMessagePopup(true);
                // 5MS Wachten
                await new Promise(resolve => setTimeout(resolve, 1000));
                // Check of de gebruiker succesvol kan inloggen
                await this._login.onClickLogin(userInputEmail, userInputPassword);
            }
            catch (reason) {
                console.error("Fout tijdens registratie en inloggen:", reason);
                console.log("Detail van de fout:", JSON.stringify(reason, null, 2));
                errorMessage.innerHTML = "An error occurred. Please try again later.";
            }
        }
        else {
            this._UI.unleashTheErrorPopup(true);
        }
    }
}

export default RegistrationClass;
