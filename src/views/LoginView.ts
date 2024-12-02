// this file soully exists for one button
const login: LoginController = new LoginController();
import { LoginController } from "../controllers/LoginController";

// It takes needed credentials
const emailUsernameInput: HTMLInputElement = document.querySelector("#emailOrUsername")!;
const passwordUserInput: HTMLInputElement = document.querySelector("#password")!;

// And ships it off to the login controller
const loginBttn: HTMLButtonElement = document.querySelector(".loginUser")!;
loginBttn.addEventListener("click", async () => {
    await login.onClickLogin(emailUsernameInput.value, passwordUserInput.value);
});
