// Hellogain individual whose alledgidly a human being, this here file houses stuff every page needs as a default
// This links this file to all other files it needs to interact with. ANd instanciates a few objects(classes).
import { LogoutClass } from "../controllers/LogoutController";
import UserInterfaceClass from "./interface";
import { utils } from "@hboictcloud/api";
import { User } from "../models/User";
const UI: UserInterfaceClass = new UserInterfaceClass();
const userModel: User = new User("", "", "", 0);
const logout: LogoutClass = new LogoutClass();

const isolatedNodelistElement: NodeList = await utils.fetchAndParseHtml("../../default.html");
const stringifiedNodes: string[] = Array.from(isolatedNodelistElement).map(element => (element as HTMLElement).outerHTML);

const strayElements: HTMLDivElement = document.querySelector(".vagabondElements")!;
const headerofpage: HTMLDivElement = document.querySelector(".navigationBar")!;
const footerContent: HTMLDivElement = document.querySelector(".footerFilin")!;
headerofpage.innerHTML = String(stringifiedNodes[1]);
strayElements.innerHTML = String(stringifiedNodes[3]);
footerContent.innerHTML = String(stringifiedNodes[5]);

const logoutBttn: HTMLLinkElement = document.querySelector(".loggingOut")!;
logoutBttn.addEventListener("click", () => {
    logout.logoutFunction();
});

const loggedUser: string | null = sessionStorage.getItem("session");
if (loggedUser) {
    UI.adjustPageToLoginStatus(true);
}
else {
    UI.adjustPageToLoginStatus(false);
}

const userNameOnPage: NodeListOf<HTMLElement> = document.querySelectorAll("#injectUsernameHere");
for (let l: number = 0; l < userNameOnPage.length; l++) {
    const usersName: string | undefined = (await userModel.getUserById(Number(sessionStorage.getItem("session"))))?.getUserName();
    userNameOnPage[l].innerHTML = `${usersName}`;
}

const boLeftButtn: HTMLButtonElement = document.querySelector("#foldoutBttn")!;
boLeftButtn.addEventListener("click", () => {
    UI.shutterSlide();
});

const passwordEyeButton: HTMLElement = document.querySelector(".hideBttn")!;
// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
if (passwordEyeButton) {
    passwordEyeButton.addEventListener("click", () => {
        UI.revealAndHidePass();
    });
}

const passwordEyeButtonAgain: HTMLElement = document.querySelector(".unHideBttn")!;
// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
if (passwordEyeButtonAgain) {
    passwordEyeButtonAgain.addEventListener("click", () => {
        UI.revealAndHidePass();
    });
}
