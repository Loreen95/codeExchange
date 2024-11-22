// this links the vieuw to the controller
const Registration: RegistrationClass = new RegistrationClass();
import RegistrationClass from "../controllers/RegisterController";

// This collects all input data to be shipped off to the controller
const emailAdressUserInput: HTMLInputElement = document.querySelector("#emailInput")!;
const nameUserInput: HTMLInputElement = document.querySelector("#userName")!;
const passwordUserInput: HTMLInputElement = document.querySelector("#password")!;

// And this initiates the registration process,
const registerBttn: HTMLButtonElement = document.querySelector(".registerNewUser")!;

registerBttn.addEventListener("click", async () => {
    await Registration.onClickRegister(nameUserInput.value, emailAdressUserInput.value, passwordUserInput.value);
});
