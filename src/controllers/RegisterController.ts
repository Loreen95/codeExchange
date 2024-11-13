// hello meat bags. This file contains the functionality of registration (Not the sql for some reason)
import { User } from "../models/User";
const userModel: User = new User("", "", "", 0);

class RegistrationClass {
    private _whyItIsNotGoodEnough: string = ""; // Error messages
    private _neededInformation: string = ""; // Information needed

    private passChecker(givenPassword: string): boolean {
        if (givenPassword.length < 7) {
            this._whyItIsNotGoodEnough = "your password is too short.";
            this._neededInformation = "Note: Use at least 7 caracters";
            return false;
        }
        else if (givenPassword.length > 20) {
            this._whyItIsNotGoodEnough = "Your password is too long.";
            this._neededInformation = "Note: You're not gonna remember all that. Use a maximum of 20 caracters.";
            return false;
        }
        else {
            if (givenPassword.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()]).{8,}$/)) {
                return true;
            }
            else {
                this._whyItIsNotGoodEnough = "Your password is unsafe.";
                this._neededInformation = "Note: You must include the following in your password: ";
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
        const errorMessage: HTMLParagraphElement = document.querySelector("#errMsg")!;
        const infoMessage: HTMLParagraphElement = document.querySelector("#infoMsg")!;

        errorMessage.innerHTML = "";
        infoMessage.innerText = "";

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
        else if (!this.passChecker(userInputPassword)) {
            errorMessage.innerText = String(this._whyItIsNotGoodEnough);
            infoMessage.innerText = String(this._neededInformation);
        }
        else {
            errorMessage.innerHTML = "";
            infoMessage.innerText = "Success!";
            await userModel.create(userInputName, userInputEmail, userInputPassword);
            window.location.href = "http://localhost:3000/login.html";
        }
    }
}

export default RegistrationClass;
