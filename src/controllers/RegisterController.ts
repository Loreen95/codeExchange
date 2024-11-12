// hello meat bags. This file contains the functionality of registration (Not the sql for some reason)
import { User } from "../models/User";
const userModel: User = new User("", "", "", 0);

class RegistrationClass {
    private _whyItIsNotGoodEnough: string = "";
    private _neededInformation: string = "";

    private passChecker(givenPassword: string): boolean {
        console.log("trigger1");
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
                this._neededInformation = "Note: Remember to use uppercase letters, lowercase letters, numbers and special caracters";
                return false;
            }
        }
    }

    public async verifyCridentials(userInputName: string, userInputEmail: string, userInputPassword: string): Promise<void> {
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
            window.location.href = "http://localhost:3000/landingspagina.html";
        }
    }
}

export default RegistrationClass;
