const Login: LoginClass = new LoginClass();
import { LoginClass } from "../controllers/LoginController";

const emailAdressUserInput: HTMLInputElement = document.querySelector("#email")!;
const passwordUserInput: HTMLInputElement = document.querySelector("#password")!;

const loginBttn: HTMLButtonElement = document.querySelector(".loginUser")!;
loginBttn.addEventListener("click", async () => {
    await Login.onClickLogin(emailAdressUserInput.value, passwordUserInput.value);
});
