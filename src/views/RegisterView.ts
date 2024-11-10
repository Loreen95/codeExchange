const Registration: RegistrationClass = new RegistrationClass();
import RegistrationClass from "../controllers/RegisterController";

const EmailAdressUserInput: HTMLInputElement = document.querySelector("#emailInput")!;
const errorMessage: HTMLParagraphElement = document.querySelector("#errMsg")!;

const registerBttn: HTMLButtonElement = document.querySelector(".registerNewUser")!;
registerBttn.addEventListener("click", () => {
    Registration.cough();
    errorMessage.innerText = "";
    Registration.emailVerify(EmailAdressUserInput.value);
});
