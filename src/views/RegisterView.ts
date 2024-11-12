const Registration: RegistrationClass = new RegistrationClass();
import RegistrationClass from "../controllers/RegisterController";

const emailAdressUserInput: HTMLInputElement = document.querySelector("#emailInput")!;
const nameUserInput: HTMLInputElement = document.querySelector("#userName")!;
const passwordUserInput: HTMLInputElement = document.querySelector("#password")!;

const registerBttn: HTMLButtonElement = document.querySelector(".registerNewUser")!;
registerBttn.addEventListener("click", async () => {
    await Registration.verifyCridentials(nameUserInput.value, emailAdressUserInput.value, passwordUserInput.value);
});
