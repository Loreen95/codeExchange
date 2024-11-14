// this file soully exists for one button
const Login: LoginClass = new LoginClass();
import { LoginClass } from "../controllers/LoginController";

// It takes needed credentials
const emailAdressUserInput: HTMLInputElement = document.querySelector("#email")!;
const passwordUserInput: HTMLInputElement = document.querySelector("#password")!;

// And ships it off to the login controller
const loginBttn: HTMLButtonElement = document.querySelector(".loginUser")!;
loginBttn.addEventListener("click", async () => {
    await Login.onClickLogin(emailAdressUserInput.value, passwordUserInput.value);
});
