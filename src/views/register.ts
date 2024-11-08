const Registration: RegistrationClass = new RegistrationClass();
import RegistrationClass from "../controllers/register";

const registerBttn: HTMLButtonElement = document.querySelector(".registerNewUser")!;
registerBttn.addEventListener("click", () => {
    Registration.cough();
});
