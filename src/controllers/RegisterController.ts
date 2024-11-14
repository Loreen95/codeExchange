// This links this controller to the almightu User Model.
import { User } from "../models/User";
const userModel: User = new User("", "", "", 0);

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
            this._neededInformation = "Note: Use at least 7 caracters";
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
        This here function contains an else if chain that goes through each individual input,
        and spits out an error with some information on the html page if somethings wrong with them
        It also activates the
     * Arguments include the three user inputs: username, password, and email
     * The return value is a void (nothing) because it's just supposed to process and directly display information
    */
    public async onClickRegister(userInputName: string, userInputEmail: string, userInputPassword: string): Promise<void> {
        // This gatheres the needed Html elements to display warnings and information about the provided credentials
        const errorMessage: HTMLParagraphElement = document.querySelector("#errMsg")!;
        const infoMessage: HTMLParagraphElement = document.querySelector("#infoMsg")!;

        // This resets the info fields everytime this method is used
        errorMessage.innerHTML = "";
        infoMessage.innerText = "";

        // Theese assess the received credentials. I trust the error messages themselves are self explanatory
        if (!userInputName) {
            errorMessage.innerText = "You must provide a name";
        }
        else if (!userInputEmail) {
            errorMessage.innerText = "you must provide an email";
        }
        else if (!userInputEmail.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
            errorMessage.innerText = "The email is invalid";
        }
        else if (await userModel.doesUserExistForEmail(userInputEmail)) {
            errorMessage.innerText = "This email is already being used";
        }
        else if (!userInputPassword) {
            errorMessage.innerText = "you must provide a password";
        }
        // This here calls forth the password examination and displays appropreate errors and info when a failure occurs
        else if (!this.passChecker(userInputPassword)) {
            errorMessage.innerText = String(this._whyItIsNotGoodEnough);
            infoMessage.innerText = String(this._neededInformation);
        }
        // And finally when all is checked and double checked and no faults where found. The user will actually be created
        else {
            errorMessage.innerHTML = "";
            infoMessage.innerText = "Success!";
            await userModel.create(userInputName, userInputEmail, userInputPassword);

            // sessionStorage.setItem("session", userId);

            window.location.href = "http://localhost:3000/login.html";
        }
    }
}

export default RegistrationClass;
